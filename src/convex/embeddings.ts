import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * Generate embeddings for a text input using OpenAI's text-embedding-3-small model.
 * This is used to create vectors for semantic search in Qdrant.
 */
export const generateEmbedding = action({
  args: {
    text: v.string(),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY environment variable is not set. " +
          "Please add it in the Keys/API keys tab."
      );
    }

    try {
      const response = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "text-embedding-3-small",
          input: args.text,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`OpenAI API error (${response.status}): ${errorBody}`);
      }

      const data = await response.json();
      const embedding = data.data[0].embedding;

      return {
        embedding,
        model: "text-embedding-3-small",
        dimensions: embedding.length,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Embedding generation failed: ${message}`);
    }
  },
});

/**
 * Generate embeddings for multiple texts in a batch.
 * More efficient for indexing multiple documents at once.
 */
export const generateBatchEmbeddings = action({
  args: {
    texts: v.array(v.string()),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY environment variable is not set. " +
          "Please add it in the Keys/API keys tab."
      );
    }

    if (args.texts.length === 0) {
      return { embeddings: [] };
    }

    try {
      const response = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "text-embedding-3-small",
          input: args.texts,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`OpenAI API error (${response.status}): ${errorBody}`);
      }

      const data = await response.json();

      // Sort by index to maintain order
      const sorted = data.data.sort(
        (a: { index: number }, b: { index: number }) => a.index - b.index
      );

      return {
        embeddings: sorted.map((item: { embedding: number[] }) => item.embedding),
        model: "text-embedding-3-small",
        count: sorted.length,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Batch embedding generation failed: ${message}`);
    }
  },
});
