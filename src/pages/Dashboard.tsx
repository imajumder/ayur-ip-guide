import { Link } from "react-router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import {
  MessageSquare,
  Shield,
  Scale,
  BookOpen,
  Leaf,
  LogOut,
  ArrowRight,
  FlaskConical,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <Link to="/chat" className="block">
            <Card className="h-full border-primary/20 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="pt-5 pb-5 px-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="size-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <MessageSquare className="size-5" />
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                  Ask IP-SAKTI Sahayak
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Source-cited guidance on IP, Ayurveda, TK, ABS, and
                  regulation.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/ip-legal" className="block">
            <Card className="h-full border-border/60 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group">
              <CardContent className="pt-5 pb-5 px-5">
                <div className="size-10 rounded-lg bg-blue-600/10 text-blue-700 flex items-center justify-center mb-3">
                  <Scale className="size-5" />
                </div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                  IP &amp; Legal Domains
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Patents, trademarks, GIs, copyright, designs, plant variety
                  protection.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/traditional-knowledge" className="block">
            <Card className="h-full border-border/60 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group">
              <CardContent className="pt-5 pb-5 px-5">
                <div className="size-10 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center mb-3">
                  <BookOpen className="size-5" />
                </div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                  Traditional Knowledge
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  TKDL, prior art, community knowledge, international
                  frameworks.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/abs" className="block">
            <Card className="h-full border-border/60 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group">
              <CardContent className="pt-5 pb-5 px-5">
                <div className="size-10 rounded-lg bg-teal-600/10 text-teal-700 flex items-center justify-center mb-3">
                  <Leaf className="size-5" />
                </div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                  Access &amp; Benefit Sharing
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Biological resources, associated knowledge, ABS
                  obligations.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/documents" className="block">
            <Card className="h-full border-border/60 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group">
              <CardContent className="pt-5 pb-5 px-5">
                <div className="size-10 rounded-lg bg-amber-600/10 text-amber-700 flex items-center justify-center mb-3">
                  <FileText className="size-5" />
                </div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                  Documents &amp; Publications
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Legislation, rules, treaties, and guidelines.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/faq" className="block">
            <Card className="h-full border-border/60 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group">
              <CardContent className="pt-5 pb-5 px-5">
                <div className="size-10 rounded-lg bg-violet-600/10 text-violet-700 flex items-center justify-center mb-3">
                  <Globe className="size-5" />
                </div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                  FAQ
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Frequently asked questions across all domains.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="text-center">
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
