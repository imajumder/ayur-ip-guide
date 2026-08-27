/**
 * Qdrant HTTP client for IP-SAKTI Sahayak.
 * Uses the REST API directly for maximum compatibility.
 */

function getQdrantConfig() {
  const url = process.env.QDRANT_URL;
  const apiKey = process.env.QDRANT_API_KEY;

  if (!url) {
    throw new Error(
      "QDRANT_URL environment variable is not set. " +
        "Please add it in the Keys/API keys tab."
    );
  }

  return { url: url.replace(/\/$/, ""), apiKey: apiKey || "" };
}

/**
 * Make an authenticated request to the Qdrant REST API.
 */
async function qdrantFetch(
  path: string,
  options: {
    method?: string;
    body?: unknown;
  } = {}
): Promise<unknown> {
  const { url, apiKey } = getQdrantConfig();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["api-key"] = apiKey;
  }

  const response = await fetch(`${url}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Qdrant API error (${response.status}): ${errorBody}`
    );
  }

  return response.json();
}

/**
 * Collection name used for IP-SAKTI Sahayak knowledge base.
 */
export const COLLECTION_NAME = "ipsakti_knowledge";

/**
 * Vector dimensions for the embedding model.
 * OpenAI text-embedding-3-small uses 1536 dimensions.
 */
export const VECTOR_DIMENSIONS = 1536;

/**
 * Create a collection in Qdrant.
 */
export async function createCollection() {
  return qdrantFetch(`/collections/${COLLECTION_NAME}`, {
    method: "PUT",
    body: {
      vectors: {
        size: VECTOR_DIMENSIONS,
        distance: "Cosine",
      },
      optimizers_config: {
        indexing_threshold: 20000,
      },
    },
  });
}

/**
 * Check if a collection exists.
 */
export async function collectionExists(): Promise<boolean> {
  try {
    await qdrantFetch(`/collections/${COLLECTION_NAME}`);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get collection information.
 */
export async function getCollectionInfo() {
  return qdrantFetch(`/collections/${COLLECTION_NAME}`);
}

/**
 * Search for similar vectors in Qdrant.
 */
export async function searchPoints(params: {
  vector: number[];
  limit?: number;
  score_threshold?: number;
  filter?: Record<string, unknown>;
}) {
  const body: Record<string, unknown> = {
    vector: params.vector,
    limit: params.limit ?? 5,
  };

  if (params.score_threshold !== undefined) {
    body.score_threshold = params.score_threshold;
  }

  if (params.filter) {
    body.filter = params.filter;
  }

  return qdrantFetch(`/collections/${COLLECTION_NAME}/points/search`, {
    method: "POST",
    body,
  });
}

/**
 * Upsert points into Qdrant.
 */
export async function upsertPoints(
  points: Array<{
    id: string;
    vector: number[];
    payload: Record<string, unknown>;
  }>
) {
  return qdrantFetch(`/collections/${COLLECTION_NAME}/points`, {
    method: "PUT",
    body: { points },
  });
}

/**
 * Delete points from Qdrant by IDs.
 */
export async function deletePoints(ids: string[]) {
  return qdrantFetch(`/collections/${COLLECTION_NAME}/points/delete`, {
    method: "POST",
    body: { points: ids },
  });
}
