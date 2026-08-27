import { action } from "./_generated/server";
import { v } from "convex/values";
import { searchPoints, COLLECTION_NAME } from "./qdrantClient";

/**
 * Perform semantic search: takes a text query, generates an embedding,
 * and searches the Qdrant knowledge base for similar content.
 */
export const searchKnowledge = action({
  args: {
    query: v.string(),
    limit: v.optional(v.number()),
    scoreThreshold: v.optional(v.number()),
    domain: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      throw new Error(
        "OPENAI_API_KEY is not set. Please add it in the Keys/API keys tab."
      );
    }

    const qdrantUrl = process.env.QDRANT_URL;
    if (!qdrantUrl) {
      throw new Error(
        "QDRANT_URL is not set. Please add it in the Keys/API keys tab."
      );
    }

    // Step 1: Generate embedding for the query
    const embeddingResponse = await fetch(
      "https://api.openai.com/v1/embeddings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: "text-embedding-3-small",
          input: args.query,
        }),
      }
    );

    if (!embeddingResponse.ok) {
      const errorBody = await embeddingResponse.text();
      throw new Error(
        `Embedding generation failed (${embeddingResponse.status}): ${errorBody}`
      );
    }

    const embeddingData = await embeddingResponse.json();
    const queryVector: number[] = embeddingData.data[0].embedding;

    // Step 2: Search Qdrant with the generated vector
    try {
      const filter = args.domain
        ? {
            must: [
              {
                key: "domain",
                match: {
                  value: args.domain,
                },
              },
            ],
          }
        : undefined;

      const result = (await searchPoints({
        vector: queryVector,
        limit: args.limit ?? 5,
        score_threshold: args.scoreThreshold,
        filter,
      })) as {
        result: Array<{
          id: string | number;
          score: number;
          payload?: Record<string, unknown>;
        }>;
      };

      return {
        query: args.query,
        results: (result.result ?? []).map((point) => ({
          id: point.id,
          score: point.score,
          title: (point.payload?.title as string) ?? "",
          text: (point.payload?.text as string) ?? "",
          domain: (point.payload?.domain as string) ?? "",
          source: (point.payload?.source as string) ?? "",
          section: (point.payload?.section as string) ?? "",
          url: (point.payload?.url as string) ?? "",
        })),
        totalResults: (result.result ?? []).length,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Qdrant search failed: ${message}`);
    }
  },
});
