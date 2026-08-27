import { useState, useCallback } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

export interface SearchResult {
  id: string | number;
  score: number;
  title: string;
  text: string;
  domain: string;
  source: string;
  section: string;
  url: string;
}

export interface SemanticSearchState {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  totalResults: number;
}

/**
 * Hook for performing semantic search against the Qdrant knowledge base.
 * Integrates with the IP-SAKTI Sahayak chat interface.
 */
export function useSemanticSearch() {
  const [state, setState] = useState<SemanticSearchState>({
    results: [],
    isLoading: false,
    error: null,
    totalResults: 0,
  });

  const searchKnowledge = useAction(api.semanticSearch.searchKnowledge);

  const search = useCallback(
    async (
      query: string,
      options?: {
        limit?: number;
        scoreThreshold?: number;
        domain?: string;
      }
    ) => {
      if (!query.trim()) {
        setState({
          results: [],
          isLoading: false,
          error: null,
          totalResults: 0,
        });
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const result = await searchKnowledge({
          query: query.trim(),
          limit: options?.limit ?? 5,
          scoreThreshold: options?.scoreThreshold ?? 0.5,
          domain: options?.domain,
        });

        setState({
          results: result.results,
          isLoading: false,
          error: null,
          totalResults: result.totalResults,
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Search failed";
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: message,
        }));
      }
    },
    [searchKnowledge]
  );

  const clearResults = useCallback(() => {
    setState({
      results: [],
      isLoading: false,
      error: null,
      totalResults: 0,
    });
  }, []);

  return {
    ...state,
    search,
    clearResults,
  };
}
