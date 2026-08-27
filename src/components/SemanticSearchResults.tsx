import { ExternalLink, BookOpen, Scale, Leaf, FileText } from "lucide-react";
import type { SearchResult } from "@/hooks/use-semantic-search";
import { cn } from "@/lib/utils";

interface SemanticSearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  className?: string;
}

const DOMAIN_ICONS: Record<string, React.ElementType> = {
  ip: Scale,
  patent: Scale,
  trademark: Scale,
  gi: Scale,
  copyright: Scale,
  design: Scale,
  tk: BookOpen,
  traditional: BookOpen,
  abs: Leaf,
  biodiversity: Leaf,
  regulation: FileText,
};

function getDomainIcon(domain: string): React.ElementType {
  const lower = domain.toLowerCase();
  for (const [key, Icon] of Object.entries(DOMAIN_ICONS)) {
    if (lower.includes(key)) return Icon;
  }
  return FileText;
}

export function SemanticSearchResults({
  results,
  isLoading,
  error,
  className,
}: SemanticSearchResultsProps) {
  if (isLoading) {
    return (
      <div className={cn("gov-panel rounded", className)}>
        <div className="gov-panel-header flex items-center gap-2">
          <BookOpen className="size-3.5" />
          Searching Knowledge Base...
        </div>
        <div className="p-4">
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="size-6 rounded bg-muted shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-muted rounded w-3/4" />
                  <div className="h-2 bg-muted rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("gov-panel rounded border-destructive/30", className)}>
        <div className="p-4">
          <p className="text-xs text-destructive">
            Search error: {error}
          </p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className={cn("gov-panel rounded", className)}>
      <div className="gov-panel-header flex items-center gap-2">
        <BookOpen className="size-3.5" />
        Knowledge Base Results
        <span className="text-[10px] opacity-60 ml-auto">
          {results.length} result{results.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="p-3 space-y-2">
        {results.map((result) => {
          const Icon = getDomainIcon(result.domain);
          return (
            <div
              key={result.id}
              className="flex gap-3 p-2.5 rounded bg-muted/30 hover:bg-muted/60 transition-colors"
            >
              <div className="size-6 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="size-3 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-semibold leading-tight">
                    {result.title}
                  </h4>
                  {result.url && (
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
                  {result.text.substring(0, 200)}
                  {result.text.length > 200 ? "..." : ""}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  {result.domain && (
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      {result.domain}
                    </span>
                  )}
                  {result.source && (
                    <span className="text-[9px] text-muted-foreground">
                      Source: {result.source}
                    </span>
                  )}
                  {result.section && (
                    <span className="text-[9px] text-muted-foreground font-mono">
                      § {result.section}
                    </span>
                  )}
                  <span className="text-[9px] text-muted-foreground ml-auto">
                    Score: {(result.score * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
