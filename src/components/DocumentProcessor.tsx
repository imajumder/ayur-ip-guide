/**
 * Document Processor component for IP-SAKTI Sahayak.
 * Allows users to parse and classify documents using LlamaCloud.
 */
import { useState } from "react";
import {
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Upload,
  Tag,
  ChevronRight,
} from "lucide-react";
import { useDocumentParsing, useDocumentClassification, DOMAIN_LABELS } from "@/hooks/use-llamacloud";

interface DocumentProcessorProps {
  onParseComplete?: (markdown: string, text: string) => void;
  onClassifyComplete?: (category: string, confidence: number) => void;
}

export function DocumentProcessor({
  onParseComplete,
  onClassifyComplete,
}: DocumentProcessorProps) {
  const [url, setUrl] = useState("");
  const { parse, result: parseResult, loading: parsing, error: parseError, reset: resetParse } =
    useDocumentParsing();
  const { classify, result: classifyResult, loading: classifying, error: classifyError, reset: resetClassify } =
    useDocumentClassification();

  const handleParse = async () => {
    if (!url.trim()) return;
    resetParse();
    resetClassify();
    const result = await parse(url.trim());
    if (result) {
      onParseComplete?.(result.markdown, result.text);
    }
  };

  const handleClassify = async () => {
    if (!url.trim()) return;
    resetClassify();
    const result = await classify(url.trim());
    if (result) {
      onClassifyComplete?.(result.topCategory, result.topConfidence);
    }
  };

  const handleReset = () => {
    setUrl("");
    resetParse();
    resetClassify();
  };

  return (
    <div className="space-y-4">
      {/* URL Input */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <div className="flex items-center gap-2">
            <Upload className="size-3.5" />
            <span>Document Processing — LlamaCloud</span>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1.5 text-muted-foreground">
              Document URL (PDF, DOCX, or public URL)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/document.pdf"
                className="flex-1 px-3 py-2 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary/30"
                disabled={parsing || classifying}
              />
              <button
                onClick={handleReset}
                className="px-3 py-2 text-xs border border-border rounded hover:bg-muted transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleParse}
              disabled={!url.trim() || parsing || classifying}
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {parsing ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                <FileText className="size-3" />
              )}
              Parse Document
            </button>
            <button
              onClick={handleClassify}
              disabled={!url.trim() || parsing || classifying}
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium border border-border rounded hover:bg-muted transition-colors disabled:opacity-50"
            >
              {classifying ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                <Tag className="size-3" />
              )}
              Classify Domain
            </button>
          </div>
        </div>
      </div>

      {/* Parse Error */}
      {parseError && (
        <div className="gov-panel border-destructive/50">
          <div className="p-3 flex items-start gap-2 text-xs">
            <AlertCircle className="size-3.5 text-destructive mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-destructive">Parsing Failed</p>
              <p className="text-muted-foreground mt-1">{parseError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Classify Error */}
      {classifyError && (
        <div className="gov-panel border-destructive/50">
          <div className="p-3 flex items-start gap-2 text-xs">
            <AlertCircle className="size-3.5 text-destructive mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-destructive">Classification Failed</p>
              <p className="text-muted-foreground mt-1">{classifyError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Parse Result */}
      {parseResult && !parseError && (
        <div className="gov-panel">
          <div className="gov-panel-header flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-600" />
            <span>Parsing Complete</span>
            <span className="ml-auto text-[10px] text-muted-foreground">
              {parseResult.pageCount} page{parseResult.pageCount !== 1 ? "s" : ""} • {parseResult.status}
            </span>
          </div>
          <div className="p-4">
            <div className="text-xs text-muted-foreground mb-2">
              Job ID: <code className="bg-muted px-1 rounded">{parseResult.jobId}</code>
            </div>
            {parseResult.markdown && (
              <div className="mt-2">
                <p className="text-xs font-medium mb-1">Markdown Preview (first 500 chars):</p>
                <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-40 whitespace-pre-wrap">
                  {parseResult.markdown.slice(0, 500)}
                  {parseResult.markdown.length > 500 ? "\n..." : ""}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Classify Result */}
      {classifyResult && !classifyError && (
        <div className="gov-panel">
          <div className="gov-panel-header flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-600" />
            <span>Classification Complete</span>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Top Category:</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
                {DOMAIN_LABELS[classifyResult.topCategory] ?? classifyResult.topCategory}
              </span>
              <span className="text-[10px] text-muted-foreground">
                ({Math.round(classifyResult.topConfidence * 100)}% confidence)
              </span>
            </div>
            {classifyResult.classifications.length > 1 && (
              <div className="space-y-1 mt-2">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  All Classifications
                </p>
                {classifyResult.classifications.map((c) => (
                  <div
                    key={c.type}
                    className="flex items-center gap-2 text-xs"
                  >
                    <ChevronRight className="size-3 text-muted-foreground" />
                    <span>{DOMAIN_LABELS[c.type] ?? c.type}</span>
                    <div className="flex-1 h-1 bg-muted rounded overflow-hidden">
                      <div
                        className="h-full bg-primary/60 rounded"
                        style={{ width: `${Math.round(c.confidence * 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground w-8 text-right">
                      {Math.round(c.confidence * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="gov-info-box">
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Document processing is powered by LlamaCloud. Parsing uses agentic OCR to convert
          documents into LLM-ready text. Classification automatically categorizes documents
          into IP-SAKTI domain categories. Results should be verified against the latest
          authoritative sources.
        </p>
      </div>
    </div>
  );
}
