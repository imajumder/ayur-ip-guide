import { Link } from "react-router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  MessageSquare,
  Scale,
  BookOpen,
  Leaf,
  LogOut,
  ArrowRight,
  Globe,
  FileText,
} from "lucide-react";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <Layout
      showBreadcrumbs
      breadcrumbs={[{ label: "Dashboard" }]}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Authenticated workspace
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome{user?.name ? `, ${user.name}` : ""}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Access IP-SAKTI Sahayak and domain resources
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer gap-2 self-start"
            onClick={async () => {
              await signOut();
              window.location.href = "/";
            }}
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </header>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          <Link to="/chat" className="block">
            <div className="gov-panel rounded hover:border-primary/30 transition-colors group">
              <div className="p-4 flex items-start gap-3">
                <div className="size-8 rounded bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                  <MessageSquare className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                    Ask IP-SAKTI Sahayak
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Source-cited guidance on IP, Ayurveda, TK, ABS, and regulation.
                  </p>
                </div>
                <ArrowRight className="size-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
              </div>
            </div>
          </Link>

          <Link to="/ip-legal" className="block">
            <div className="gov-panel rounded hover:border-primary/30 transition-colors group">
              <div className="p-4 flex items-start gap-3">
                <div className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Scale className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                    IP &amp; Legal Domains
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Patents, trademarks, GIs, copyright, designs, plant variety protection.
                  </p>
                </div>
                <ArrowRight className="size-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
              </div>
            </div>
          </Link>

          <Link to="/traditional-knowledge" className="block">
            <div className="gov-panel rounded hover:border-primary/30 transition-colors group">
              <div className="p-4 flex items-start gap-3">
                <div className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <BookOpen className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                    Traditional Knowledge
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    TKDL, prior art, community knowledge, international frameworks.
                  </p>
                </div>
                <ArrowRight className="size-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
              </div>
            </div>
          </Link>

          <Link to="/abs" className="block">
            <div className="gov-panel rounded hover:border-primary/30 transition-colors group">
              <div className="p-4 flex items-start gap-3">
                <div className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Leaf className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                    Access &amp; Benefit Sharing
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Biological resources, associated knowledge, ABS obligations.
                  </p>
                </div>
                <ArrowRight className="size-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
              </div>
            </div>
          </Link>

          <Link to="/documents" className="block">
            <div className="gov-panel rounded hover:border-primary/30 transition-colors group">
              <div className="p-4 flex items-start gap-3">
                <div className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FileText className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                    Documents &amp; Publications
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Legislation, rules, treaties, and guidelines.
                  </p>
                </div>
                <ArrowRight className="size-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
              </div>
            </div>
          </Link>

          <Link to="/faq" className="block">
            <div className="gov-panel rounded hover:border-primary/30 transition-colors group">
              <div className="p-4 flex items-start gap-3">
                <div className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Globe className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                    FAQ
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Frequently asked questions across all domains.
                  </p>
                </div>
                <ArrowRight className="size-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
              </div>
            </div>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="gov-info-box rounded">
          <p className="text-[10px] text-muted-foreground">
            Information provided is for educational purposes and should be
            verified against the latest authoritative sources. It does not
            constitute legal advice.
          </p>
        </div>
      </div>
    </Layout>
  );
}
