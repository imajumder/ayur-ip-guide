/**
 * LlamaCloud SDK client utility for IP-SAKTI Sahayak.
 * Provides document parsing, extraction, classification, and pipeline retrieval.
 */

import LlamaCloud from "@llamaindex/llama-cloud";

function getLlamaCloudClient(): LlamaCloud {
  const apiKey = process.env.LLAMA_CLOUD_API_KEY;
  if (!apiKey) {
    throw new Error(
      "LLAMA_CLOUD_API_KEY is not set. Please add it in the Keys/API keys tab."
    );
  }
  return new LlamaCloud({ apiKey });
}

export { getLlamaCloudClient };

/** Supported document categories for IP-SAKTI domain classification */
export const DOMAIN_CATEGORIES = [
  "patents",
  "trademarks",
  "geographical_indications",
  "copyright",
  "designs",
  "plant_variety_protection",
  "traditional_knowledge",
  "tkdl",
  "abs",
  "biological_diversity",
  "ayush_regulation",
  "food_regulation",
  "cosmetics",
  "advertising",
  "international_ip",
  "other",
] as const;

export type DomainCategory = (typeof DOMAIN_CATEGORIES)[number];

/** Metadata stored with each parsed document */
export interface DocumentMetadata {
  title: string;
  domain: DomainCategory;
  jurisdiction: "india" | "international" | "both";
  issuingAuthority: string;
  effectiveDate?: string;
  status: "current" | "historical" | "superseded";
  documentType:
    | "act"
    | "rule"
    | "regulation"
    | "treaty"
    | "guideline"
    | "notification"
    | "form"
    | "registry_record"
    | "standard"
    | "other";
  url?: string;
  sourceId: string;
}
