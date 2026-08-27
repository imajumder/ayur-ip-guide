import { Link } from "react-router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, ArrowRight, AlertTriangle } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  breadcrumbs?: { label: string; href?: string }[];
  relatedLinks?: { label: string; href: string }[];
}

export default function PlaceholderPage({
  title,
  description,
  breadcrumbs = [],
  relatedLinks = [],
}: PlaceholderPageProps) {
  return (
    <Layout
      showBreadcrumbs
      breadcrumbs={[{ label: title }, ...breadcrumbs]}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="mb-8">
          <div className="gov-section-heading">
            <h1 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-serif)]">
              {title}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            {description}
          </p>
        </div>

        {/* Placeholder content */}
        <div className="gov-panel rounded max-w-3xl">
          <div className="gov-panel-header flex items-center gap-2">
            <FileText className="size-3.5" />
            Page Under Development
          </div>
          <div className="p-6 text-center">
            <div className="size-12 rounded bg-muted flex items-center justify-center mx-auto mb-4">
              <FileText className="size-6 text-muted-foreground/50" />
            </div>
            <h3 className="text-base font-semibold mb-2">
              This section is being developed
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
              Authoritative information for this section will be populated from
              official government sources once data integration is complete.
              In the meantime, you can use IP-SAKTI Sahayak to ask questions
              about this topic.
            </p>
            <Link to="/chat">
              <Button size="sm" className="gap-1.5 h-8 text-xs">
                <MessageSquare className="size-3" />
                Ask Sahayak about {title}
                <ArrowRight className="size-3" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Related links */}
        {relatedLinks.length > 0 && (
          <div className="mt-8 max-w-3xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Related Sections
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="gov-panel rounded p-3 hover:border-primary/30 transition-colors group flex items-center justify-between"
                >
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {link.label}
                  </span>
                  <ArrowRight className="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 gov-info-box rounded max-w-3xl">
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            This page will contain information sourced from authoritative government
            publications. Verify against the latest official sources.
          </p>
        </div>
      </div>
    </Layout>
  );
}
