/**
 * Configuration Verification Script for Qdrant Cloud & LlamaIndex Integration
 * Run this script to verify that all required environment variables and APIs are configured correctly.
 * 
 * Usage: npx ts-node verify-integration.ts
 */

import fetch from "node-fetch";

interface VerificationResult {
  name: string;
  status: "✅" | "❌" | "⚠️";
  message: string;
  details?: string;
}

const results: VerificationResult[] = [];

async function verifyEnv() {
  console.log("\n📋 Checking Environment Variables...\n");

  const required = [
    "QDRANT_URL",
    "QDRANT_API_KEY",
    "LLAMA_CLOUD_API_KEY",
    "OPENAI_API_KEY",
  ];

  for (const envVar of required) {
    const value = process.env[envVar];
    if (!value) {
      results.push({
        name: `Environment: ${envVar}`,
        status: "❌",
        message: `${envVar} is not set`,
        details: "Add this to your .env file and Convex deployment settings",
      });
    } else {
      const masked = value.substring(0, 5) + "..." + value.substring(value.length - 3);
      results.push({
        name: `Environment: ${envVar}`,
        status: "✅",
        message: `${envVar} is set (${masked})`,
      });
    }
  }
}

async function verifyQdrant() {
  console.log("\n🔍 Verifying Qdrant Cloud Connection...\n");

  const qdrantUrl = process.env.QDRANT_URL;
  const qdrantApiKey = process.env.QDRANT_API_KEY;

  if (!qdrantUrl || !qdrantApiKey) {
    results.push({
      name: "Qdrant: Connection",
      status: "❌",
      message: "QDRANT_URL or QDRANT_API_KEY not set",
      details: "Cannot verify connection without credentials",
    });
    return;
  }

  try {
    const response = await fetch(`${qdrantUrl}/health`, {
      method: "GET",
      headers: {
        "api-key": qdrantApiKey,
      },
    });

    if (response.ok) {
      results.push({
        name: "Qdrant: Connection",
        status: "✅",
        message: "Successfully connected to Qdrant Cloud",
        details: `URL: ${qdrantUrl}`,
      });
    } else {
      results.push({
        name: "Qdrant: Connection",
        status: "❌",
        message: `Connection failed with status ${response.status}`,
        details: `URL: ${qdrantUrl}`,
      });
    }
  } catch (error) {
    results.push({
      name: "Qdrant: Connection",
      status: "❌",
      message: `Connection error: ${error instanceof Error ? error.message : String(error)}`,
      details: `URL: ${qdrantUrl}`,
    });
  }

  // Check if collection exists
  if (qdrantUrl && qdrantApiKey) {
    try {
      const collectionName = process.env.QDRANT_COLLECTION || "ipsakti_knowledge";
      const response = await fetch(`${qdrantUrl}/collections/${collectionName}`, {
        method: "GET",
        headers: {
          "api-key": qdrantApiKey,
        },
      });

      if (response.ok) {
        results.push({
          name: `Qdrant: Collection '${collectionName}'`,
          status: "✅",
          message: `Collection exists and is accessible`,
        });
      } else if (response.status === 404) {
        results.push({
          name: `Qdrant: Collection '${collectionName}'`,
          status: "⚠️",
          message: `Collection does not exist`,
          details: `Run 'initCollection' Convex action to create it`,
        });
      } else {
        results.push({
          name: `Qdrant: Collection '${collectionName}'`,
          status: "❌",
          message: `Status check failed with status ${response.status}`,
        });
      }
    } catch (error) {
      results.push({
        name: `Qdrant: Collection Check`,
        status: "❌",
        message: `Error checking collection: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  }
}

async function verifyLlamaCloud() {
  console.log("\n📖 Verifying LlamaCloud...\n");

  const apiKey = process.env.LLAMA_CLOUD_API_KEY;

  if (!apiKey) {
    results.push({
      name: "LlamaCloud: API Key",
      status: "❌",
      message: "LLAMA_CLOUD_API_KEY not set",
      details: "Get it from https://cloud.llamaindex.ai/settings/api-keys",
    });
    return;
  }

  try {
    // Test LlamaCloud API by fetching pipeline list
    const response = await fetch(
      "https://api.cloud.llamaindex.ai/api/v1/pipelines",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      results.push({
        name: "LlamaCloud: API Connection",
        status: "✅",
        message: "Successfully authenticated with LlamaCloud",
      });
    } else if (response.status === 401) {
      results.push({
        name: "LlamaCloud: API Connection",
        status: "❌",
        message: "Authentication failed - invalid API key",
        details: "Check your LLAMA_CLOUD_API_KEY",
      });
    } else {
      results.push({
        name: "LlamaCloud: API Connection",
        status: "⚠️",
        message: `API responded with status ${response.status}`,
        details: "Try again later or check LlamaCloud status",
      });
    }
  } catch (error) {
    results.push({
      name: "LlamaCloud: API Connection",
      status: "⚠️",
      message: `Network error: ${error instanceof Error ? error.message : String(error)}`,
      details: "This might be a network issue or API downtime",
    });
  }
}

async function verifyOpenAI() {
  console.log("\n🤖 Verifying OpenAI...\n");

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    results.push({
      name: "OpenAI: API Key",
      status: "❌",
      message: "OPENAI_API_KEY not set",
      details: "Get it from https://platform.openai.com/api-keys",
    });
    return;
  }

  try {
    // Test OpenAI API with a simple embedding request
    const response = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: "test",
      }),
    });

    if (response.ok) {
      const data = (await response.json()) as {
        data?: Array<{ embedding: number[] }>;
      };
      const dims = data.data?.[0]?.embedding?.length || 0;

      results.push({
        name: "OpenAI: API Connection",
        status: "✅",
        message: "Successfully authenticated with OpenAI",
        details: `Embedding model returns ${dims}-dimensional vectors`,
      });

      if (dims !== 1536) {
        results.push({
          name: "OpenAI: Embedding Model",
          status: "⚠️",
          message: `Expected 1536 dimensions, got ${dims}`,
          details: "Ensure you're using text-embedding-3-small model",
        });
      } else {
        results.push({
          name: "OpenAI: Embedding Model",
          status: "✅",
          message: "text-embedding-3-small model returns correct 1536 dimensions",
        });
      }
    } else if (response.status === 401) {
      results.push({
        name: "OpenAI: API Connection",
        status: "❌",
        message: "Authentication failed - invalid API key",
        details: "Check your OPENAI_API_KEY",
      });
    } else {
      results.push({
        name: "OpenAI: API Connection",
        status: "⚠️",
        message: `API responded with status ${response.status}`,
        details: "Check your API key and account status",
      });
    }
  } catch (error) {
    results.push({
      name: "OpenAI: API Connection",
      status: "⚠️",
      message: `Network error: ${error instanceof Error ? error.message : String(error)}`,
      details: "This might be a network issue or API downtime",
    });
  }
}

async function printResults() {
  console.log("\n" + "=".repeat(60));
  console.log("  INTEGRATION VERIFICATION RESULTS");
  console.log("=".repeat(60) + "\n");

  const categories: Record<string, VerificationResult[]> = {};

  for (const result of results) {
    const category = result.name.split(":")[0];
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(result);
  }

  for (const [category, items] of Object.entries(categories)) {
    console.log(`\n${category}`);
    console.log("-".repeat(60));

    for (const result of items) {
      console.log(`${result.status} ${result.name.split(":")[1]?.trim()}`);
      console.log(`   ${result.message}`);
      if (result.details) {
        console.log(`   ℹ️  ${result.details}`);
      }
    }
  }

  console.log("\n" + "=".repeat(60));

  const passed = results.filter((r) => r.status === "✅").length;
  const failed = results.filter((r) => r.status === "❌").length;
  const warnings = results.filter((r) => r.status === "⚠️").length;

  console.log(
    `\nSummary: ✅ ${passed} passed | ❌ ${failed} failed | ⚠️ ${warnings} warnings\n`
  );

  if (failed > 0) {
    console.log("🔴 CRITICAL ISSUES - Fix these before proceeding:");
    for (const result of results.filter((r) => r.status === "❌")) {
      console.log(`  • ${result.name}: ${result.details || result.message}`);
    }
  }

  if (warnings > 0) {
    console.log("\n🟡 WARNINGS - These should be addressed:");
    for (const result of results.filter((r) => r.status === "⚠️")) {
      console.log(`  • ${result.name}: ${result.details || result.message}`);
    }
  }

  if (failed === 0 && warnings === 0) {
    console.log("✅ All critical checks passed! Integration is ready to use.");
  } else if (failed === 0) {
    console.log(
      "\n⚠️  Please address the warnings before production deployment."
    );
  }

  console.log("\n");
}

async function main() {
  console.log(
    "🚀 IP-SAKTI Sahayak: Integration Verification\n"
  );

  await verifyEnv();
  await verifyQdrant();
  await verifyLlamaCloud();
  await verifyOpenAI();
  await printResults();
}

main().catch(console.error);
