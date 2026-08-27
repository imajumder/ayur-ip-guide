import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AshokaEmblem } from "@/components/AshokaEmblem";
import {
  Globe,
  Menu,
  X,
  ChevronRight,
  LogIn,
  LogOut,
  Search,
  HelpCircle,
  Map,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "IP-SAKTI Sahayak", href: "/chat" },
  { label: "IP & Legal", href: "/ip-legal" },
  { label: "Traditional Knowledge", href: "/traditional-knowledge" },
  { label: "ABS", href: "/abs" },
  { label: "Documents", href: "/documents" },
  { label: "Notifications", href: "/notifications" },
  { label: "FAQ", href: "/faq" },
];

const FOOTER_SECTIONS = [
  {
    title: "IP Services",
    links: [
      { label: "Patents", href: "/patents" },
      { label: "Trademarks", href: "/trademarks" },
      { label: "Geographical Indications", href: "/geographical-indications" },
      { label: "Copyright", href: "/copyright" },
      { label: "Designs", href: "/designs" },
      { label: "Plant Variety Protection", href: "/plant-variety-protection" },
    ],
  },
  {
    title: "Traditional Knowledge",
    links: [
      { label: "TK Overview", href: "/traditional-knowledge" },
      { label: "TKDL Resources", href: "/tkdl" },
      { label: "Prior Art", href: "/prior-art" },
      { label: "Community Knowledge", href: "/community-knowledge" },
      { label: "International TK Frameworks", href: "/traditional-knowledge" },
    ],
  },
  {
    title: "Regulatory",
    links: [
      { label: "ABS Information", href: "/abs" },
      { label: "AYUSH Regulation", href: "/ayush-regulation" },
      { label: "Food / Ayurveda-Aahar", href: "/food-regulation" },
      { label: "Cosmetics", href: "/cosmetics" },
      { label: "Advertising", href: "/advertising" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documents & Publications", href: "/documents" },
      { label: "Notifications & Updates", href: "/notifications" },
      { label: "Frequently Asked Questions", href: "/faq" },
      { label: "International IP", href: "/international-ip" },
      { label: "IP-SAKTI Sahayak", href: "/chat" },
      { label: "About This Portal", href: "/" },
    ],
  },
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
  const [directoryOpen, setDirectoryOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Tricolor stripe */}
      <div className="gov-tricolor" />

      {/* Utility bar */}
      <div className="bg-secondary text-secondary-foreground text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            <span className="font-medium">भारत सरकार | Government of India</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/faq" className="hover:text-primary-foreground transition-colors flex items-center gap-1">
              <HelpCircle className="size-3" />
              Help
            </Link>
            <Link to="/" className="hover:text-primary-foreground transition-colors flex items-center gap-1">
              <Map className="size-3" />
              Site Map
            </Link>
            <button className="hover:text-primary-foreground transition-colors flex items-center gap-1">
              <Globe className="size-3" />
              हिन्दी
            </button>
          </div>
        </div>
      </div>

      {/* Main header with emblem */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4 py-3">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <AshokaEmblem className="size-14 text-primary" />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight leading-tight text-primary font-[family-name:var(--font-serif)]">
                IP-SAKTI Sahayak
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">
                Intellectual Property &amp; Ayurveda Information Portal
              </span>
            </div>
          </Link>

          {/* Directory filter */}
          <div className="ml-auto hidden md:block relative">
            <button
              onClick={() => setDirectoryOpen(!directoryOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-muted border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
            >
              <Search className="size-3.5" />
              Browse Directory
            </button>
            {directoryOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDirectoryOpen(false)} />
                <div className="absolute right-0 top-full mt-1 z-50 w-80 bg-card border border-border rounded shadow-lg animate-in fade-in-0 zoom-in-95">
                  <div className="p-3 border-b border-border">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Portal Directory
                    </p>
                  </div>
                  <div className="p-2 max-h-80 overflow-y-auto">
                    {[
                      {
                        category: "IP & Legal",
                        items: [
                          { label: "IP & Legal Domains", href: "/ip-legal" },
                          { label: "Patents", href: "/patents" },
                          { label: "Trademarks", href: "/trademarks" },
                          { label: "Geographical Indications", href: "/geographical-indications" },
                          { label: "Copyright", href: "/copyright" },
                          { label: "Designs", href: "/designs" },
                          { label: "Plant Variety Protection", href: "/plant-variety-protection" },
                        ],
                      },
                      {
                        category: "Traditional Knowledge",
                        items: [
                          { label: "Traditional Knowledge", href: "/traditional-knowledge" },
                          { label: "TKDL Resources", href: "/tkdl" },
                          { label: "Prior Art", href: "/prior-art" },
                          { label: "Community Knowledge", href: "/community-knowledge" },
                        ],
                      },
                      {
                        category: "Regulatory",
                        items: [
                          { label: "ABS", href: "/abs" },
                          { label: "AYUSH Regulation", href: "/ayush-regulation" },
                          { label: "Food & Nutraceuticals", href: "/food-regulation" },
                          { label: "Cosmetics", href: "/cosmetics" },
                          { label: "Advertising", href: "/advertising" },
                        ],
                      },
                      {
                        category: "Resources",
                        items: [
                          { label: "Documents", href: "/documents" },
                          { label: "Notifications", href: "/notifications" },
                          { label: "FAQ", href: "/faq" },
                          { label: "International IP", href: "/international-ip" },
                          { label: "IP-SAKTI Sahayak", href: "/chat" },
                        ],
                      },
                    ].map((section) => (
                      <div key={section.category} className="mb-2">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-primary px-2 py-1">
                          {section.category}
                        </p>
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setDirectoryOpen(false)}
                            className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                          >
                            <ChevronRight className="size-3 shrink-0 opacity-40" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-2 shrink-0">
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {user?.name || "User"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="gap-1 text-muted-foreground h-7 text-xs"
                >
                  <LogOut className="size-3" />
                  Sign out
                </Button>
              </div>
            ) : (
              <Link to="/auth" className="hidden sm:block">
                <Button variant="outline" size="sm" className="gap-1 h-7 text-xs">
                  <LogIn className="size-3" />
                  Sign in
                </Button>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation bar */}
      <nav className="bg-primary text-primary-foreground border-b border-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Desktop nav */}
          <div className="hidden lg:flex items-stretch">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "px-4 py-2.5 text-xs font-medium transition-colors border-r border-primary-foreground/10 last:border-r-0",
                    isActive
                      ? "bg-primary-foreground/15"
                      : "hover:bg-primary-foreground/10"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-primary-foreground/20">
            <div className="px-4 py-2 space-y-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded text-xs font-medium transition-colors",
                      isActive
                        ? "bg-primary-foreground/15"
                        : "hover:bg-primary-foreground/10"
                    )}
                  >
                    {item.label}
                    <ChevronRight className="size-3 ml-auto opacity-40" />
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-primary-foreground/20 mt-2">
                {isAuthenticated ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="w-full justify-start gap-2 text-primary-foreground/80 h-8 text-xs"
                  >
                    <LogOut className="size-3" />
                    Sign out
                  </Button>
                ) : (
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full gap-1 h-8 text-xs text-primary-foreground border-primary-foreground/30">
                      <LogIn className="size-3" />
                      Sign in
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Breadcrumbs */}
      {showBreadcrumbs && breadcrumbs.length > 0 && (
        <div className="bg-muted border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5">
            <nav className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  <ChevronRight className="size-3" />
                  {crumb.href ? (
                    <Link to={crumb.href} className="hover:text-foreground transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">{crumb.label}</span>
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
      <footer className="bg-secondary text-secondary-foreground mt-auto border-t-2 border-primary">
        <div className="gov-tricolor-thin" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Footer grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-primary-foreground/90">
                  {section.title}
                </h4>
                <div className="space-y-1.5">
                  {section.links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block text-[11px] text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="pt-4 border-t border-secondary-foreground/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AshokaEmblem className="size-8 text-secondary-foreground/60" />
                <div>
                  <p className="text-[10px] font-medium text-secondary-foreground/80">
                    IP-SAKTI Sahayak
                  </p>
                  <p className="text-[9px] text-secondary-foreground/50">
                    Intellectual Property &amp; Ayurveda Information Portal
                  </p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-[10px] text-secondary-foreground/60">
                  Information provided is for educational purposes and should be verified against
                  the latest authoritative sources. It does not constitute legal advice.
                </p>
                <p className="text-[10px] text-secondary-foreground/50 mt-1">
                  © {new Date().getFullYear()} IP-SAKTI Sahayak. Built for the AYUSH &amp; Ayurveda ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
