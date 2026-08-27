import { action } from "./_generated/server";
import { v } from "convex/values";
import {
  createCollection,
  collectionExists,
  searchPoints,
  upsertPoints,
  deletePoints,
  getCollectionInfo,
  COLLECTION_NAME,
} from "./qdrantClient";

/**
 * Initialize the Qdrant collection for IP-SAKTI knowledge base.
 */
export const initCollection = action({
  args: {},
  handler: async () => {
    try {
      const exists = await collectionExists();

      if (exists) {
        return { status: "exists", message: `Collection "${COLLECTION_NAME}" already exists.` };
      }

      await createCollection();

      return {
        status: "created",
        message: `Collection "${COLLECTION_NAME}" created successfully.`,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to initialize collection: ${message}`);
    }
  },
});

/**
 * Search the Qdrant knowledge base with a query vector.
 */
export const semanticSearch = action({
  args: {
    queryVector: v.array(v.float64()),
    limit: v.optional(v.number()),
    scoreThreshold: v.optional(v.number()),
    filterDomain: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    try {
      const filter = args.filterDomain
        ? {
            must: [
              {
                key: "domain",
                match: {
                  value: args.filterDomain,
                },
              },
            ],
          }
        : undefined;

      const result = (await searchPoints({
        vector: args.queryVector,
        limit: args.limit ?? 5,
        score_threshold: args.scoreThreshold,
        filter,
      })) as { result: Array<{ id: string | number; score: number; payload?: Record<string, unknown> }> };

      return (result.result ?? []).map(
        (point) => ({
          id: point.id,
          score: point.score,
          payload: point.payload,
        })
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Search failed: ${message}`);
    }
  },
});

/**
 * Upsert documents into the Qdrant knowledge base.
 */
export const upsertDocuments = action({
  args: {
    documents: v.array(
      v.object({
        id: v.string(),
        vector: v.array(v.float64()),
        payload: v.object({
          title: v.string(),
          text: v.string(),
          domain: v.string(),
          source: v.optional(v.string()),
          section: v.optional(v.string()),
          url: v.optional(v.string()),
        }),
      })
    ),
  },
  handler: async (_ctx, args) => {
    try {
      await upsertPoints(
        args.documents.map((doc) => ({
          id: doc.id,
          vector: doc.vector,
          payload: doc.payload,
        }))
      );

      return {
        status: "success",
        count: args.documents.length,
        message: `${args.documents.length} documents upserted successfully.`,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Upsert failed: ${message}`);
    }
  },
});

/**
 * Delete documents from the Qdrant knowledge base by IDs.
 */
export const deleteDocuments = action({
  args: {
    ids: v.array(v.string()),
  },
  handler: async (_ctx, args) => {
    try {
      await deletePoints(args.ids);

      return {
        status: "success",
        count: args.ids.length,
        message: `${args.ids.length} documents deleted.`,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Delete failed: ${message}`);
    }
  },
});

/**
 * Get collection information.
 */
export const getCollectionInfoAction = action({
  args: {},
  handler: async () => {
    try {
      const info = await getCollectionInfo();
      return info;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to get collection info: ${message}`);
    }
  },
});
