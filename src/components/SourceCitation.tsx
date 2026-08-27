import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Source {
  id: string;
  title: string;
  section?: string;
  issuingAuthority?: string;
  status: "current" | "historical" | "pending";
  effectiveDate?: string;
  url?: string;
  type: "statute" | "rule" | "regulation" | "treaty" | "guideline" | "notification" | "standard" | "database";
}

interface SourceCitationProps {
  sources: Source[];
  className?: string;
}

const STATUS_STYLES: Record<string, string> = {
  current: "bg-emerald-100 text-emerald-800 border-emerald-200",
  historical: "bg-amber-100 text-amber-800 border-amber-200",
  pending: "bg-blue-100 text-blue-800 border-blue-200",
};

const TYPE_LABELS: Record<string, string> = {
  statute: "Act / Statute",
  rule: "Rule",
  regulation: "Regulation",
  treaty: "Treaty",
  guideline: "Guideline",
  notification: "Notification",
  standard: "Standard",
  database: "Database",
};

export function SourceCitation({ sources, className }: SourceCitationProps) {
  if (sources.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Authoritative Sources
      </h4>
      {sources.map((source) => (
        <div
          key={source.id}
          className="source-citation bg-muted/50 rounded p-3 hover:bg-muted/80 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">{source.title}</span>
                {source.section && (
                  <span className="text-xs text-muted-foreground font-mono">
                    § {source.section}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {TYPE_LABELS[source.type]}
                </span>
                {source.issuingAuthority && (
                  <span className="text-xs text-muted-foreground">
                    — {source.issuingAuthority}
                  </span>
                )}
              </div>
              {source.effectiveDate && (
                <p className="text-xs text-muted-foreground mt-1">
                  Effective: {source.effectiveDate}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={cn(
                  "text-[10px] font-semibold px-2 py-0.5 rounded border",
                  STATUS_STYLES[source.status]
                )}
              >
                {source.status.toUpperCase()}
              </span>
              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="size-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
