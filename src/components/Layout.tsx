import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Shield,
  BookOpen,
  Scale,
  Leaf,
  Globe,
  FileText,
  HelpCircle,
  Bell,
  Menu,
  X,
  ChevronRight,
  LogIn,
  LogOut,
  MessageSquare,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Sahayak", href: "/chat", icon: MessageSquare },
  { label: "IP & Legal", href: "/ip-legal", icon: Scale },
  { label: "Traditional Knowledge", href: "/traditional-knowledge", icon: BookOpen },
  { label: "ABS", href: "/abs", icon: Leaf },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
];

interface LayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

export default function Layout({
  children,
  showBreadcrumbs = false,
  breadcrumbs = [],
  className,
}: LayoutProps) {
  const { isAuthenticated, user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Tricolor top stripe */}
      <div className="gov-tricolor" />

      {/* Utility bar */}
      <div className="bg-secondary text-secondary-foreground text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            <span className="font-medium">IP-SAKTI Sahayak</span>
            <span className="hidden sm:inline opacity-70">
              Intellectual Property &amp; Ayurveda Information Portal
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline opacity-70">
              भारत सरकार | Government of India
            </span>
            <Globe className="size-3 opacity-70" />
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <Shield className="size-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-none text-foreground">
                IP-SAKTI
              </span>
              <span className="text-[10px] font-medium tracking-wider text-primary uppercase leading-none mt-0.5">
                Sahayak
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth + Mobile Toggle */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {user?.name || "User"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="gap-1.5 text-muted-foreground"
                >
                  <LogOut className="size-3.5" />
                  Sign out
                </Button>
              </div>
            ) : (
              <Link to="/auth" className="hidden sm:block">
                <Button variant="default" size="sm" className="gap-1.5">
                  <LogIn className="size-3.5" />
                  Sign in
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                    <ChevronRight className="size-3 ml-auto opacity-40" />
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-border mt-2">
                {isAuthenticated ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="w-full justify-start gap-2 text-muted-foreground"
                  >
                    <LogOut className="size-3.5" />
                    Sign out
                  </Button>
                ) : (
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="default" size="sm" className="w-full gap-1.5">
                      <LogIn className="size-3.5" />
                      Sign in
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Breadcrumbs */}
      {showBreadcrumbs && breadcrumbs.length > 0 && (
        <div className="bg-muted/50 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
            <nav className="flex items-center gap-1 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  <ChevronRight className="size-3" />
                  {crumb.href ? (
                    <Link
                      to={crumb.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">
                      {crumb.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className={cn("flex-1", className)}>{children}</main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground border-t border-border mt-auto">
        <div className="gov-tricolor-thin" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-8 rounded-md bg-primary flex items-center justify-center">
                  <Shield className="size-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-sm">IP-SAKTI Sahayak</span>
              </div>
              <p className="text-xs leading-relaxed opacity-80">
                An intelligent information and navigation assistant for Ayurveda,
                Intellectual Property, Traditional Knowledge, and related
                regulatory frameworks.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
              <div className="space-y-1.5">
                {NAV_ITEMS.slice(0, 5).map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block text-xs opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Disclaimer</h4>
              <p className="text-xs leading-relaxed opacity-80">
                Information provided by IP-SAKTI Sahayak is for informational
                and educational purposes and should be verified against the
                latest authoritative sources. It does not constitute legal advice.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-secondary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs opacity-60">
              © {new Date().getFullYear()} IP-SAKTI Sahayak. All rights reserved.
            </p>
            <p className="text-xs opacity-60">
              Built for the AYUSH &amp; Ayurveda ecosystem
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
