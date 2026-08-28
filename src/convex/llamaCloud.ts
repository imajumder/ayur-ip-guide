/**
 * LlamaCloud Convex actions for IP-SAKTI Sahayak.
 * Provides document parsing, extraction, classification, and pipeline retrieval.
 */
"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { getLlamaCloudClient } from "./llamaCloudClient";

/**
 * Parse a document URL using LlamaCloud's agentic OCR.
 * Returns markdown and text content from the parsed document.
 */
export const parseDocument = action({
  args: {
    sourceUrl: v.string(),
    tier: v.optional(
      v.union(
        v.literal("fast"),
        v.literal("cost_effective"),
        v.literal("agentic"),
        v.literal("agentic_plus")
      )
    ),
  },
  handler: async (_ctx, args) => {
    const client = getLlamaCloudClient();

    try {
      const result = await client.parsing.parse(
        {
          source_url: args.sourceUrl,
          tier: args.tier ?? "cost_effective",
          version: "latest",
          expand: ["markdown", "text"],
        },
        { timeout: 120_000 }
      );

      const markdown = result.markdown?.pages
        ?.filter(
          (
            p
          ): p is { page_number: number; success: true; markdown: string } =>
            p.success
        )
        .map((p) => p.markdown)
        .join("\n\n---\n\n");

      const text = result.text?.pages
        ?.map((p) => p.text)
        .join("\n\n");

      return {
        jobId: result.job.id,
        status: result.job.status,
        markdown: markdown ?? "",
        text: text ?? "",
        pageCount: result.markdown?.pages?.length ?? 0,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Document parsing failed: ${message}`);
    }
  },
});

/**
 * Classify a document URL into IP-SAKTI domain categories.
 * Uses LlamaCloud's classifier to determine the document's domain.
 */
export const classifyDocument = action({
  args: {
    sourceUrl: v.string(),
    customRules: v.optional(
      v.array(
        v.object({
          type: v.string(),
          description: v.string(),
        })
      )
    ),
  },
  handler: async (_ctx, args) => {
    const client = getLlamaCloudClient();

    const defaultRules = [
      {
        type: "patents",
        description:
          "Documents about patent law, patent applications, patentability, novelty, inventive step, or patent prosecution",
      },
      {
        type: "trademarks",
        description:
          "Documents about trademark law, brand protection, trademark registration, or trade marks",
      },
      {
        type: "geographical_indications",
        description:
          "Documents about geographical indications, GI registration, or regional product protection",
      },
      {
        type: "copyright",
        description:
          "Documents about copyright law, original works, or creative expression protection",
      },
      {
        type: "designs",
        description:
          "Documents about industrial designs, product appearance, or ornamental features",
      },
      {
        type: "plant_variety_protection",
        description:
          "Documents about plant variety rights, cultivars, or plant breeders' rights",
      },
      {
        type: "traditional_knowledge",
        description:
          "Documents about traditional knowledge, TKDL, prior art related to traditional practices, or community knowledge",
      },
      {
        type: "abs",
        description:
          "Documents about access and benefit sharing, biological diversity, Nagoya Protocol, or CBD",
      },
      {
        type: "ayush_regulation",
        description:
          "Documents about AYUSH regulation, Ayurvedic medicine classification, drug regulation, or pharmacopoeial standards",
      },
      {
        type: "food_regulation",
        description:
          "Documents about food regulation, FSSAI, nutraceuticals, or Ayurveda-Aahar products",
      },
      {
        type: "cosmetics",
        description:
          "Documents about cosmetics regulation, cosmetic product classification, or cosmetic labelling",
      },
      {
        type: "international_ip",
        description:
          "Documents about international IP treaties, TRIPS, PCT, Madrid System, or WIPO frameworks",
      },
    ];

    const rules = args.customRules ?? defaultRules;

    try {
      // Use parsing.parse to parse the document from URL, then classify
      const parsed = await client.parsing.parse({
        source_url: args.sourceUrl,
        tier: "fast",
        version: "latest",
        expand: ["text"],
      });

      const jobId = parsed.job.id;

      // Create classification job using the classifier
      const classifyResult = await client.classifier.classify({
        file_ids: [jobId],
        rules,
        mode: "FAST",
      });

      const items = (classifyResult as unknown as { items?: Array<{ result?: { type: string; confidence: number } | null }> }).items ?? [];
      const classifications = items
        .filter(
          (item): item is { result: { type: string; confidence: number } } =>
            item.result !== null && item.result !== undefined
        )
        .map((item) => ({
          type: item.result!.type,
          confidence: item.result!.confidence,
        }));

      return {
        classifications,
        topCategory:
          classifications.length > 0 ? classifications[0].type : "other",
        topConfidence:
          classifications.length > 0 ? classifications[0].confidence : 0,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Document classification failed: ${message}`);
    }
  },
});

/**
 * Retrieve relevant content from a LlamaCloud pipeline for a given query.
 * This is the primary RAG retrieval action.
 */
export const retrieveFromPipeline = action({
  args: {
    query: v.string(),
    pipelineName: v.optional(v.string()),
    topK: v.optional(v.number()),
  },
  handler: async (_ctx, args) => {
    const client = getLlamaCloudClient();

    try {
      const pipelineName = args.pipelineName ?? "ipsakti-knowledge";

      // First list pipelines to find the ID by name
      const pipelines = await client.pipelines.list({
        pipeline_name: pipelineName,
      });

      const pipelineList = pipelines as unknown as Array<{ id: string; name: string }>;
      if (pipelineList.length === 0) {
        throw new Error(
          `Pipeline "${pipelineName}" not found. Create it in the LlamaCloud dashboard first.`
        );
      }

      const pipelineId = pipelineList[0].id;

      const result = await client.pipelines.retrieve(pipelineId, {
        query: args.query,
        dense_similarity_top_k: args.topK ?? 5,
      });

      const nodes = result.retrieval_nodes ?? [];

      return {
        query: args.query,
        results: nodes.map((n) => ({
          text: n.node.text ?? "",
          score: n.score ?? 0,
          metadata: (n.node.extra_info as Record<string, unknown>) ?? {},
        })),
        totalResults: nodes.length,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Pipeline retrieval failed: ${message}`);
    }
  },
});

/**
 * Extract structured metadata from a document using LlamaCloud's extract API.
 * Useful for pulling section numbers, issuing authorities, and effective dates
 * from legal/regulatory documents.
 */
export const extractDocumentMetadata = action({
  args: {
    sourceUrl: v.string(),
    schema: v.optional(v.any()),
  },
  handler: async (_ctx, args) => {
    const client = getLlamaCloudClient();

    // Default schema for legal/regulatory document metadata
    const defaultSchema = {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Title of the document or act",
        },
        document_type: {
          type: "string",
          description:
            "Type of document: act, rule, regulation, treaty, guideline, notification, or other",
        },
        issuing_authority: {
          type: "string",
          description:
            "Government body or authority that issued the document",
        },
        effective_date: {
          type: "string",
          description: "Date the document came into effect (if mentioned)",
        },
        section_numbers: {
          type: "array",
          items: { type: "string" },
          description: "Key section or article numbers referenced",
        },
        jurisdiction: {
          type: "string",
          description: "Applicable jurisdiction: india, international, or both",
        },
        domain: {
          type: "string",
          description:
            "Primary domain: patents, traditional_knowledge, abs, ayush_regulation, etc.",
        },
        summary: {
          type: "string",
          description: "Brief summary of the document's key provisions",
        },
      },
      required: ["title"],
    };

    const dataSchema = args.schema ?? defaultSchema;

    try {
      // Parse the document first to get a file reference
      const parsed = await client.parsing.parse({
        source_url: args.sourceUrl,
        tier: "fast",
        version: "latest",
      });
      const fileId = parsed.job.id;

      // Run extraction
      const job = await client.extract.run({
        file_input: fileId,
        configuration: {
          data_schema: dataSchema,
          tier: "cost_effective",
        },
      });

      return {
        jobId: job.id,
        status: job.status,
        metadata: job.extract_result ?? null,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Document extraction failed: ${message}`);
    }
  },
});

/**
 * List available LlamaCloud pipelines for the project.
 */
export const listPipelines = action({
  args: {},
  handler: async () => {
    const client = getLlamaCloudClient();

    try {
      const pipelineList = await client.pipelines.list() as unknown as Array<{
        id: string;
        name: string;
        pipeline_type?: string;
        status?: string;
      }>;

      return {
        pipelines: pipelineList.map(
          (p) => ({
            id: p.id,
            name: p.name,
            type: p.pipeline_type ?? "unknown",
            status: p.status ?? "unknown",
          })
        ),
        total: pipelineList.length,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to list pipelines: ${message}`);
    }
  },
});
