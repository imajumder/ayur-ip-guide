/**
 * Convex mutations for tracking LlamaCloud document processing status.
 * Stores parsing, classification, and extraction results in the database.
 */
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Record a completed document parsing job.
 */
export const recordParseJob = mutation({
  args: {
    jobId: v.string(),
    sourceUrl: v.string(),
    title: v.optional(v.string()),
    status: v.string(),
    markdown: v.string(),
    text: v.string(),
    pageCount: v.number(),
    tier: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("llamaCloudJobs", {
      jobId: args.jobId,
      type: "parse",
      sourceUrl: args.sourceUrl,
      title: args.title,
      status: args.status as "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED",
      result: {
        markdown: args.markdown,
        text: args.text,
        pageCount: args.pageCount,
      },
      tier: args.tier,
      createdAt: now,
      updatedAt: now,
    });
  },
});

/**
 * Record a completed document classification job.
 */
export const recordClassificationJob = mutation({
  args: {
    jobId: v.string(),
    sourceUrl: v.string(),
    status: v.string(),
    topCategory: v.string(),
    topConfidence: v.number(),
    classifications: v.array(
      v.object({
        type: v.string(),
        confidence: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("llamaCloudJobs", {
      jobId: args.jobId,
      type: "classify",
      sourceUrl: args.sourceUrl,
      status: args.status as "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED",
      result: {
        topCategory: args.topCategory,
        topConfidence: args.topConfidence,
        classifications: args.classifications,
      },
      createdAt: now,
      updatedAt: now,
    });
  },
});

/**
 * Update a job's status (e.g., when polling for async completion).
 */
export const updateJobStatus = mutation({
  args: {
    jobId: v.string(),
    status: v.string(),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("llamaCloudJobs")
      .filter((q) => q.eq(q.field("jobId"), args.jobId))
      .first();

    if (!existing) return null;

    await ctx.db.patch(existing._id, {
      status: args.status as "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED",
      error: args.error,
      updatedAt: Date.now(),
    });

    return existing._id;
  },
});

/**
 * List all LlamaCloud jobs, optionally filtered by type.
 */
export const listJobs = query({
  args: {
    type: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("llamaCloudJobs").order("desc");

    if (args.type) {
      q = q.filter((q) => q.eq(q.field("type"), args.type));
    }

    return await q.take(args.limit ?? 20);
  },
});

/**
 * Get a specific job by its LlamaCloud job ID.
 */
export const getJob = query({
  args: { jobId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("llamaCloudJobs")
      .filter((q) => q.eq(q.field("jobId"), args.jobId))
      .first();
  },
});
