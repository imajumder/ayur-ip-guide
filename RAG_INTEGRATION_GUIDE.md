# IP-SAKTI Sahayak: RAG Integration Complete ✅

This document details the complete Qdrant Cloud & LlamaIndex integration for the IP-SAKTI Sahayak multilingual RAG assistant.

## Quick Start

### 1. **Installation Status**
✅ All dependencies installed
```bash
npm install  # Already done
```

### 2. **Environment Setup**
Create `.env` file with required credentials:
```env
# Qdrant Cloud
QDRANT_URL=https://your-cluster.qdrant.io:6333
QDRANT_API_KEY=your-api-key
QDRANT_COLLECTION=ipsakti_knowledge

# LlamaCloud
LLAMA_CLOUD_API_KEY=your-api-key

# OpenAI (for embeddings)
OPENAI_API_KEY=your-api-key
```

### 3. **Verify Integration**
```bash
npm run verify
```
This checks all API connections and configurations.

### 4. **Initialize Qdrant**
```bash
npm run dev
```
Then in Convex dashboard, call the `initCollection` action to create the vector database collection.

---

## Architecture Overview

```
┌─────────────┐
│  Frontend   │
│  (React)    │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│   Convex Backend     │
│  (Serverless)        │
└──────┬───────────────┘
       │
   ┌───┴────────────────────────────┐
   │                                 │
   ▼                                 ▼
┌────────────────────┐       ┌─────────────────┐
│  Embeddings        │       │  LlamaCloud     │
│  (OpenAI)          │       │  (Parsing)      │
└────────────────────┘       └────────┬────────┘
   │                                  │
   │ 1536-dim                         │ Parse/Extract
   │ vectors                          │ Metadata
   │                                  │
   └──────────────────┬───────────────┘
                      │
                      ▼
            ┌──────────────────┐
            │ Qdrant Cloud     │
            │ (Vector DB)      │
            │ + Metadata       │
            │ + Filtering      │
            └──────────────────┘
```

---

## Component Details

### 1. **Embeddings Pipeline**
- **File:** `src/convex/embeddings.ts`
- **Model:** OpenAI `text-embedding-3-small`
- **Dimensions:** 1536
- **Features:**
  - Single text embedding
  - Batch embedding (efficient for document indexing)
  - Configurable input text

**Example Usage:**
```typescript
// Single embedding
const result = await ctx.runAction(internal.embeddings.generateEmbedding, {
  text: "What are the requirements for patentability?"
});

// Batch embeddings
const results = await ctx.runAction(internal.embeddings.generateBatchEmbeddings, {
  texts: ["Patent", "Trademark", "Copyright"]
});
```

### 2. **Qdrant Integration**
- **File:** `src/convex/qdrantClient.ts` + `src/convex/qdrant.ts`
- **Database:** Qdrant Cloud
- **Collection:** `ipsakti_knowledge`
- **Vector Size:** 1536 dimensions
- **Similarity:** Cosine distance
- **Features:**
  - Semantic search with metadata filtering
  - Document upsert/delete
  - Collection management

**Example Usage:**
```typescript
// Initialize collection
await ctx.runAction(internal.qdrant.initCollection);

// Search knowledge base
const results = await ctx.runAction(internal.qdrant.semanticSearch, {
  queryVector: embedding,
  limit: 8,
  filterDomain: "patents"
});

// Upsert documents
await ctx.runAction(internal.qdrant.upsertDocuments, {
  documents: [
    {
      id: "doc-123",
      vector: [0.1, 0.2, ...], // 1536 floats
      payload: {
        title: "Patents Act, 1970",
        text: "Section 3: Inventions not patentable",
        domain: "patents",
        section: "Section 3"
      }
    }
  ]
});
```

### 3. **LlamaCloud Integration**
- **File:** `src/convex/llamaCloud.ts`
- **API:** LlamaCloud document processing
- **Features:**
  - OCR + Markdown extraction
  - Document classification
  - Structured metadata extraction
  - Pipeline-based retrieval

**Example Usage:**
```typescript
// Parse document
const parsed = await ctx.runAction(internal.llamaCloud.parseDocument, {
  sourceUrl: "https://example.com/document.pdf",
  tier: "cost_effective"
});

// Classify document
const classified = await ctx.runAction(internal.llamaCloud.classifyDocument, {
  sourceUrl: "https://example.com/document.pdf"
});

// Extract metadata
const metadata = await ctx.runAction(internal.llamaCloud.extractDocumentMetadata, {
  sourceUrl: "https://example.com/document.pdf"
});

// Retrieve from pipeline
const retrieved = await ctx.runAction(internal.llamaCloud.retrieveFromPipeline, {
  query: "patent requirements",
  pipelineName: "ipsakti-knowledge",
  topK: 5
});
```

### 4. **Semantic Search (Full RAG)**
- **File:** `src/convex/semanticSearch.ts`
- **Flow:** Query → Embed → Search → Filter → Results
- **Features:**
  - Domain-based filtering
  - Score thresholding
  - Metadata preservation

**Example Usage:**
```typescript
const results = await ctx.runAction(internal.semanticSearch.searchKnowledge, {
  query: "पेटेंट के लिए नवीनता की आवश्यकता क्या है?", // Hindi query
  limit: 8,
  scoreThreshold: 0.5,
  domain: "patents"
});

// Returns: { query, results: [{ id, score, title, text, domain, source, url }], totalResults }
```

---

## Data Model

### Document Metadata Structure
Every chunk stored in Qdrant includes:
```typescript
{
  text: "Actual document chunk content",
  title: "Patents Act, 1970",
  domain: "patents", // patents, trademarks, copyright, etc.
  section: "Section 3",
  source: "Government of India",
  url: "https://example.com/patents-act",
  language: "en" | "hi" | other,
  page: 13,
  document_type: "act" | "rule" | "regulation" | "guideline",
  publication_date: "2023-01-01",
  jurisdiction: "India" | "International" | "Both",
  chunk_index: 12
}
```

### LlamaCloud Job Tracking
Jobs are stored in Convex DB (`llamaCloudJobs` table):
```typescript
{
  jobId: string,
  type: "parse" | "classify" | "extract",
  sourceUrl: string,
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED",
  result: any,
  createdAt: number,
  updatedAt: number
}
```

---

## Environment Variables

### Required for Production
```env
QDRANT_URL              # Qdrant cluster URL
QDRANT_API_KEY          # Qdrant API key
LLAMA_CLOUD_API_KEY     # LlamaCloud API key
OPENAI_API_KEY          # OpenAI API key
```

### Optional Configuration
```env
QDRANT_COLLECTION=ipsakti_knowledge       # Default
EMBEDDING_MODEL=text-embedding-3-small    # Default
RETRIEVAL_TOP_K=8                         # Default
SIMILARITY_THRESHOLD=0.5                  # Default
CHUNK_SIZE=1024                           # Optional
CHUNK_OVERLAP=256                         # Optional
LLM_PROVIDER=openai                       # Default
LLM_MODEL=gpt-4o-mini                     # Default
```

---

## API Endpoints (Convex Actions)

### Embedding Generation
```
Action: embeddings.generateEmbedding
Args: { text: string }
Returns: { embedding: number[], model: string, dimensions: number }
```

```
Action: embeddings.generateBatchEmbeddings
Args: { texts: string[] }
Returns: { embeddings: number[][], model: string, count: number }
```

### Qdrant Operations
```
Action: qdrant.initCollection
Returns: { status: "created" | "exists", message: string }
```

```
Action: qdrant.semanticSearch
Args: { 
  queryVector: number[], 
  limit?: number, 
  scoreThreshold?: number,
  filterDomain?: string 
}
Returns: Array<{ id, score, payload }>
```

```
Action: qdrant.upsertDocuments
Args: { 
  documents: Array<{ 
    id: string, 
    vector: number[], 
    payload: {...} 
  }> 
}
Returns: { status: "success", count: number, message: string }
```

### LlamaCloud Operations
```
Action: llamaCloud.parseDocument
Args: { sourceUrl: string, tier?: string }
Returns: { jobId, status, markdown, text, pageCount }
```

```
Action: llamaCloud.classifyDocument
Args: { sourceUrl: string }
Returns: { classifications, topCategory, topConfidence }
```

```
Action: llamaCloud.extractDocumentMetadata
Args: { sourceUrl: string }
Returns: { jobId, status, metadata }
```

### Semantic Search (Full RAG)
```
Action: semanticSearch.searchKnowledge
Args: { 
  query: string, 
  limit?: number, 
  scoreThreshold?: number,
  domain?: string 
}
Returns: { 
  query: string, 
  results: Array<{ id, score, title, text, domain, source, url }>, 
  totalResults: number 
}
```

---

## Implementation Examples

### Example 1: Index a Document
```typescript
import { getLlamaCloudClient } from "@/convex/llamaCloudClient";

export const indexDocument = action({
  args: { sourceUrl: v.string() },
  handler: async (ctx, args) => {
    // Step 1: Parse document with LlamaCloud
    const parsed = await ctx.runAction(internal.llamaCloud.parseDocument, {
      sourceUrl: args.sourceUrl,
      tier: "cost_effective"
    });

    // Step 2: Extract structured metadata
    const metadata = await ctx.runAction(internal.llamaCloud.extractDocumentMetadata, {
      sourceUrl: args.sourceUrl
    });

    // Step 3: Split into chunks and generate embeddings
    const chunks = splitIntoChunks(parsed.text, 1024, 256);
    const embeddings = await ctx.runAction(
      internal.embeddings.generateBatchEmbeddings,
      { texts: chunks }
    );

    // Step 4: Prepare documents for Qdrant
    const documents = chunks.map((chunk, idx) => ({
      id: `${args.sourceUrl}-${idx}`,
      vector: embeddings.embeddings[idx],
      payload: {
        text: chunk,
        title: metadata.metadata?.title || "Unknown",
        domain: metadata.metadata?.domain || "other",
        source: args.sourceUrl,
        chunk_index: idx
      }
    }));

    // Step 5: Upsert to Qdrant
    return await ctx.runAction(internal.qdrant.upsertDocuments, {
      documents
    });
  }
});

function splitIntoChunks(text: string, size: number, overlap: number): string[] {
  const chunks = [];
  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}
```

### Example 2: Answer Question with RAG
```typescript
export const answerQuestion = action({
  args: { question: v.string(), conversationId: v.string() },
  handler: async (ctx, args) => {
    // Step 1: Search knowledge base
    const searchResults = await ctx.runAction(
      internal.semanticSearch.searchKnowledge,
      {
        query: args.question,
        limit: 8,
        scoreThreshold: 0.5
      }
    );

    // Step 2: Prepare context
    const context = searchResults.results
      .map((r) => `[${r.title}] ${r.text}`)
      .join("\n\n");

    const sources = searchResults.results.map((r) => ({
      title: r.title,
      domain: r.domain,
      source: r.source,
      url: r.url
    }));

    // Step 3: Send to LLM with RAG prompt
    const systemPrompt = `
You are IP-SAKTI Sahayak, an AI assistant for intellectual property information.
Use the provided context to answer questions. Do not invent information.
If the context doesn't contain the answer, say so clearly.
    `;

    const userPrompt = `
Question: ${args.question}

Context:
${context}
    `;

    // Step 4: Call LLM (using your chosen provider)
    const answer = await callLLM(systemPrompt, userPrompt);

    // Step 5: Return answer with citations
    return {
      answer,
      sources,
      conversationId: args.conversationId
    };
  }
});
```

---

## Testing the Integration

### 1. Verify Configuration
```bash
npm run verify
```
Checks all API connections and credentials.

### 2. Test Embeddings
```typescript
// In Convex dashboard Actions tab
call embeddings.generateEmbedding with {
  text: "What is a patent?"
}
```

### 3. Initialize Collection
```typescript
// In Convex dashboard
call qdrant.initCollection
// Should return: { status: "created", message: "Collection 'ipsakti_knowledge' created successfully." }
```

### 4. Test Semantic Search
```typescript
// First embed a query
const queryEmbedding = await generateEmbedding({ text: "patent requirements" });

// Then search
call qdrant.semanticSearch with {
  queryVector: queryEmbedding.embedding,
  limit: 5,
  filterDomain: "patents"
}
```

---

## Production Deployment

### 1. Set Environment Variables in Convex
```bash
npx convex env set QDRANT_URL "https://your-cluster.qdrant.io:6333"
npx convex env set QDRANT_API_KEY "your-api-key"
npx convex env set LLAMA_CLOUD_API_KEY "your-api-key"
npx convex env set OPENAI_API_KEY "your-api-key"
```

### 2. Deploy Backend
```bash
npx convex deploy
```

### 3. Test in Production
```bash
npm run verify
```

---

## Troubleshooting

### Qdrant Connection Failed
- Check `QDRANT_URL` format: `https://cluster.qdrant.io:6333`
- Verify `QDRANT_API_KEY` is correct
- Ensure Qdrant cluster is running in Qdrant Cloud dashboard

### LlamaCloud API Error
- Verify API key at https://cloud.llamaindex.ai/settings/api-keys
- Check that the key has necessary permissions
- Ensure your LlamaCloud account has active subscription

### OpenAI Embedding Error
- Verify `OPENAI_API_KEY` is valid
- Check model is `text-embedding-3-small`
- Ensure account has sufficient credits

### Collection Not Found
- Call `initCollection` action first
- Check collection name matches: `ipsakti_knowledge`
- Verify in Qdrant Cloud dashboard

---

## Performance Optimization

### Batch Embeddings
Use `generateBatchEmbeddings` instead of single calls for document indexing:
```typescript
// ✅ Good: batch
const embeddings = await generateBatchEmbeddings({ 
  texts: ["doc1", "doc2", "doc3"] 
});

// ❌ Inefficient: single calls
const e1 = await generateEmbedding({ text: "doc1" });
const e2 = await generateEmbedding({ text: "doc2" });
const e3 = await generateEmbedding({ text: "doc3" });
```

### Caching
Cache embeddings for documents that don't change:
```typescript
// Store document hash + embedding
const hash = sha256(documentContent);
const cached = await getEmbeddingCache(hash);
if (cached) return cached;

const embedding = await generateEmbedding({ text: documentContent });
await setEmbeddingCache(hash, embedding);
return embedding;
```

### Connection Pooling
Qdrant and OpenAI clients automatically manage connection pools in Convex.

---

## Project Files Structure

```
src/
├── convex/
│   ├── embeddings.ts              # OpenAI embeddings
│   ├── qdrantClient.ts            # Qdrant HTTP client
│   ├── qdrant.ts                  # Qdrant Convex actions
│   ├── llamaCloudClient.ts        # LlamaCloud SDK
│   ├── llamaCloud.ts              # LlamaCloud actions
│   ├── llamaCloudMutations.ts     # Job tracking
│   ├── semanticSearch.ts          # Full RAG pipeline
│   ├── schema.ts                  # Database schema
│   └── ...other files
├── hooks/
│   ├── use-semantic-search.ts     # React hook for search
│   ├── use-llamacloud.ts          # React hook for LlamaCloud
│   └── ...other hooks
└── ...other files

.env.example                         # Environment template
verify-integration.ts               # Verification script
```

---

## Support & Resources

- **Qdrant Docs:** https://qdrant.tech/documentation/
- **LlamaCloud Docs:** https://docs.cloud.llamaindex.ai/
- **OpenAI Embeddings:** https://platform.openai.com/docs/guides/embeddings
- **Convex Docs:** https://docs.convex.dev/

---

## Summary

✅ **Qdrant Cloud Integration:** Complete
✅ **LlamaIndex (LlamaCloud) Integration:** Complete
✅ **Embeddings Pipeline:** Complete
✅ **Semantic Search:** Complete
✅ **Metadata Filtering:** Complete
✅ **Job Tracking:** Complete

**Status:** Ready for document ingestion and deployment
