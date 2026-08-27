import { Link } from "react-router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home, MessageSquare } from "lucide-react";

export default function NotFound() {
  return (
    <Layout showBreadcrumbs breadcrumbs={[{ label: "Page Not Found" }]}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-md mx-auto text-center">
          <div className="gov-panel rounded">
            <div className="p-8">
              <div className="text-5xl font-bold text-primary mb-4 font-[family-name:var(--font-serif)]">
                404
              </div>
              <h1 className="text-xl font-bold mb-2 font-[family-name:var(--font-serif)]">
                Page Not Found
              </h1>
              <p className="text-sm text-muted-foreground mb-6">
                The page you are looking for does not exist or has been moved.
                Please check the URL or use the navigation above.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/">
                  <Button size="sm" className="gap-1.5 h-8 text-xs active:scale-95 transition-transform">
                    <Home className="size-3" />
                    Go to Home
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs active:scale-95 transition-transform">
                    <MessageSquare className="size-3" />
                    Ask Sahayak
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
