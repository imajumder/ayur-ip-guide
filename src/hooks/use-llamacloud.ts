/**
 * React hooks for LlamaCloud integration in IP-SAKTI Sahayak.
 * Provides document parsing, classification, and pipeline retrieval.
 */
import { useState, useCallback } from "react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";

/** Result from document parsing */
export interface ParseResult {
  jobId: string;
  status: string;
  markdown: string;
  text: string;
  pageCount: number;
}

/** Result from document classification */
export interface ClassificationResult {
  classifications: Array<{ type: string; confidence: number }>;
  topCategory: string;
  topConfidence: number;
}

/** Result from pipeline retrieval */
export interface RetrievalResult {
  query: string;
  results: Array<{
    text: string;
    score: number;
    metadata: Record<string, unknown>;
  }>;
  totalResults: number;
}

/**
 * Hook for parsing documents using LlamaCloud.
 */
export function useDocumentParsing() {
  const parseDocument = useAction(api.llamaCloud.parseDocument);
  const [result, setResult] = useState<ParseResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parse = useCallback(
    async (
      sourceUrl: string,
      tier?: "fast" | "cost_effective" | "agentic" | "agentic_plus"
    ) => {
      setLoading(true);
      setError(null);
      try {
        const res = await parseDocument({ sourceUrl, tier });
        setResult(res);
        return res;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [parseDocument]
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { parse, result, loading, error, reset };
}

/**
 * Hook for classifying documents using LlamaCloud.
 */
export function useDocumentClassification() {
  const classifyDocument = useAction(api.llamaCloud.classifyDocument);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const classify = useCallback(
    async (
      sourceUrl: string,
      customRules?: Array<{ type: string; description: string }>
    ) => {
      setLoading(true);
      setError(null);
      try {
        const res = await classifyDocument({ sourceUrl, customRules });
        setResult(res);
        return res;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [classifyDocument]
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { classify, result, loading, error, reset };
}

/**
 * Hook for retrieving content from a LlamaCloud pipeline.
 */
export function usePipelineRetrieval() {
  const retrieveFromPipeline = useAction(api.llamaCloud.retrieveFromPipeline);
  const [result, setResult] = useState<RetrievalResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const retrieve = useCallback(
    async (query: string, pipelineName?: string, topK?: number) => {
      setLoading(true);
      setError(null);
      try {
        const res = await retrieveFromPipeline({ query, pipelineName, topK });
        setResult(res);
        return res;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [retrieveFromPipeline]
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { retrieve, result, loading, error, reset };
}

/**
 * Hook for extracting structured metadata from documents.
 */
export function useDocumentExtraction() {
  const extractMetadata = useAction(api.llamaCloud.extractDocumentMetadata);
  const [result, setResult] = useState<{
    jobId: string;
    status: string;
    metadata: unknown;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extract = useCallback(
    async (sourceUrl: string, schema?: unknown) => {
      setLoading(true);
      setError(null);
      try {
        const res = await extractMetadata({ sourceUrl, schema });
        setResult(res);
        return res;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [extractMetadata]
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { extract, result, loading, error, reset };
}

/** Domain label mapping for display */
export const DOMAIN_LABELS: Record<string, string> = {
  patents: "Patents",
  trademarks: "Trademarks",
  geographical_indications: "Geographical Indications",
  copyright: "Copyright",
  designs: "Designs",
  plant_variety_protection: "Plant Variety Protection",
  traditional_knowledge: "Traditional Knowledge",
  tkdl: "TKDL",
  abs: "Access & Benefit Sharing",
  biological_diversity: "Biological Diversity",
  ayush_regulation: "AYUSH Regulation",
  food_regulation: "Food Regulation",
  cosmetics: "Cosmetics",
  advertising: "Advertising",
  international_ip: "International IP",
  other: "Other",
};
