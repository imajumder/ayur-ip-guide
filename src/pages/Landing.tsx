import { useState } from "react";
import { Link } from "react-router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Scale,
  BookOpen,
  Leaf,
  Globe,
  FileText,
  MessageSquare,
  ArrowRight,
  FlaskConical,
  Sprout,
  Briefcase,
  ChevronRight,
  Search,
  Landmark,
  HelpCircle,
  AlertTriangle,
  Stethoscope,
  ExternalLink,
  Phone,
  Users,
  Building2,
} from "lucide-react";

const EXPLORE_BY_NEED = [
  {
    icon: FlaskConical,
    title: "I have an Ayurvedic product",
    description: "Explore classification, regulatory requirements and IP options.",
    href: "/chat?prefill=product",
  },
  {
    icon: Scale,
    title: "I have developed a new formulation",
    description: "Explore patentability, prior art, regulatory classification and ABS.",
    href: "/chat?prefill=formulation",
  },
  {
    icon: BookOpen,
    title: "I want to protect traditional knowledge",
    description: "Explore TK, prior-art and relevant protection mechanisms.",
    href: "/chat?prefill=tk",
  },
  {
    icon: Briefcase,
    title: "I want to commercialise my product",
    description: "Explore IP, regulatory and market-access considerations.",
    href: "/chat?prefill=commercialise",
  },
  {
    icon: Globe,
    title: "I want to export an Ayurvedic product",
    description: "Explore international IP and destination-market requirements.",
    href: "/chat?prefill=export",
  },
  {
    icon: Leaf,
    title: "I need to understand ABS",
    description: "Explore biological resources, associated knowledge and benefit-sharing.",
    href: "/chat?prefill=abs",
  },
];

const IP_DOMAINS = [
  { icon: Scale, title: "Patents", description: "Novelty, inventive step, patentable subject matter, TK-related exclusions" },
  { icon: Landmark, title: "Geographical Indications", description: "Regional products, community-associated goods, GI registration" },
  { icon: Shield, title: "Trade Marks", description: "Brand names, logos, product marks, Ayurvedic branding" },
  { icon: FileText, title: "Copyright", description: "Original expression, documentation, software, creative works" },
  { icon: Briefcase, title: "Designs", description: "Product appearance, packaging, visual design, ornamental features" },
  { icon: Sprout, title: "Plant Variety Protection", description: "Cultivars, breeders, farmers' rights, medicinal plants" },
];

const AYURVEDA_RESOURCES = [
  { icon: Stethoscope, title: "Classical & Proprietary Medicines", description: "Regulatory classification, pharmacopoeial standards, licensing" },
  { icon: FlaskConical, title: "Phytopharmaceuticals", description: "Plant-based pharmaceutical regulatory pathway" },
  { icon: HelpCircle, title: "Ayurveda-Aahar / Nutraceuticals", description: "Food regulatory pathway, FSSAI requirements" },
  { icon: AlertTriangle, title: "Advertising Restrictions", description: "Drugs and Magic Remedies, advertising rules compliance" },
];

const QUICK_LINKS = [
  "Patents", "Trademarks", "GIs", "Traditional Knowledge", "TKDL",
  "ABS", "AYUSH Regulation", "International IP", "Documents", "Notifications", "FAQ",
];

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      {/* ── Hero banner ─────────────────────────────────────────────── */}
      <section className="bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left — Title + search */}
            <div className="lg:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-secondary-foreground/60 mb-2">
                Ministry of Ayush &amp; Department for Promotion of Industry and Internal Trade
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight font-[family-name:var(--font-serif)]">
                IP-SAKTI Sahayak
              </h1>
              <p className="mt-1 text-sm text-secondary-foreground/70 max-w-xl">
                Intellectual Property &amp; Ayurveda Information Portal
              </p>
              <p className="mt-4 text-sm leading-relaxed text-secondary-foreground/80 max-w-2xl">
                An intelligent, source-cited information assistant designed for Ayurveda practitioners,
                researchers, startups, and innovators navigating IP protection, traditional knowledge,
                biological resources, and product regulation.
              </p>

              {/* Search */}
              <div className="mt-6 relative max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ask Sahayak — e.g. &quot;Can I patent my Ayurvedic formulation?&quot;"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/chat?q=${encodeURIComponent(searchQuery.trim())}`;
                    }
                  }}
                  className="w-full pl-10 pr-32 py-2.5 rounded bg-card text-foreground border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
                <Link
                  to={searchQuery.trim() ? `/chat?q=${encodeURIComponent(searchQuery.trim())}` : "/chat"}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2"
                >
                  <Button size="sm" className="gap-1 h-8 text-xs">
                    <MessageSquare className="size-3" />
                    Ask Sahayak
                  </Button>
                </Link>
              </div>

              {/* Jurisdiction badges */}
              <div className="mt-4 flex items-center gap-2">
                <span className="jurisdiction-india px-2 py-0.5 rounded text-[10px] font-bold tracking-wide">
                  INDIA
                </span>
                <span className="jurisdiction-international px-2 py-0.5 rounded text-[10px] font-bold tracking-wide">
                  INTERNATIONAL
                </span>
                <span className="text-[10px] text-secondary-foreground/50">
                  — Clear jurisdictional separation
                </span>
              </div>
            </div>

            {/* Right — Domain overview panel */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded overflow-hidden">
                <div className="bg-primary text-primary-foreground px-4 py-2">
                  <span className="text-xs font-bold">Domain Overview</span>
                </div>
                <div className="p-4 space-y-2.5">
                  {[
                    { icon: Scale, label: "IPR" },
                    { icon: FlaskConical, label: "Ayurveda" },
                    { icon: BookOpen, label: "Traditional Knowledge" },
                    { icon: Leaf, label: "Biological Resources" },
                    { icon: Landmark, label: "ABS" },
                    { icon: Stethoscope, label: "Regulation" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-2.5 text-sm">
                        <div className="size-6 rounded bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="size-3.5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's New ticker ────────────────────────────────────────── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-3">
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
            What&apos;s New
          </span>
          <div className="overflow-hidden text-xs text-muted-foreground">
            <span className="inline-block animate-[marquee_30s_linear_infinite]">
              IP-SAKTI Sahayak is now available for source-cited guidance on IP, Ayurveda, TK &amp; ABS &nbsp;|&nbsp;
              WIPO Treaty on Genetic Resources and Associated Traditional Knowledge — Stay informed &nbsp;|&nbsp;
              Product Classification Wizard now available in the chat interface
            </span>
          </div>
        </div>
      </section>

      {/* ── Explore By Need ──────────────────────────────────────────── */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="gov-section-heading">
            <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-serif)]">
              Explore by Need
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-6 max-w-2xl">
            Select your situation to receive guided assistance through the applicable IP, regulatory,
            and knowledge frameworks.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EXPLORE_BY_NEED.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} to={item.href} className="block h-full">
                  <div className="gov-panel rounded h-full hover:border-primary/30 hover:shadow-sm transition-all duration-150 group cursor-pointer">
                    <div className="p-4 flex items-start gap-3">
                      <div className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <ArrowRight className="size-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── IP-SAKTI Sahayak CTA ─────────────────────────────────────── */}
      <section className="bg-card border-y border-border py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="gov-panel rounded">
            <div className="gov-panel-header flex items-center gap-2">
              <MessageSquare className="size-3.5" />
              IP-SAKTI Sahayak — Intelligent Information Assistant
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-base font-bold font-[family-name:var(--font-serif)] mb-2">
                    Your guide through IP, Ayurveda &amp; regulation
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Ask questions in plain language. Sahayak understands product classification,
                    routes across IP domains, identifies regulatory pathways, and provides
                    source-cited answers — with clear jurisdictional separation between India
                    and international frameworks.
                  </p>
                  <div className="flex flex-wrap gap-4 text-[10px] text-muted-foreground mb-4">
                    {[
                      "Source-cited answers",
                      "Jurisdiction-aware",
                      "Product classification",
                      "Safe abstention",
                      "Government resources",
                    ].map((f) => (
                      <span key={f} className="flex items-center gap-1">
                        <span className="size-1 rounded-full bg-primary" />
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link to="/chat">
                      <Button size="sm" className="gap-1.5 h-8 text-xs active:scale-95 transition-transform">
                        <MessageSquare className="size-3" />
                        Ask IP-SAKTI Sahayak
                      </Button>
                    </Link>
                    <Link to="/faq">
                      <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs active:scale-95 transition-transform">
                        <HelpCircle className="size-3" />
                        Browse FAQs
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Quick Links panel */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Quick Links
                  </div>
                  <div className="space-y-1">
                    {QUICK_LINKS.map((link) => (
                      <Link
                        key={link}
                        to="/chat"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ChevronRight className="size-3 shrink-0" />
                        {link}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IP & Legal Domains ───────────────────────────────────────── */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="gov-section-heading">
            <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-serif)]">
              IP &amp; Legal Domains
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-6 max-w-2xl">
            One Ayurvedic innovation can involve multiple legal, regulatory, and knowledge systems.
            Sahayak helps you understand how they connect.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {IP_DOMAINS.map((item) => {
              const Icon = item.icon;
              const slug = item.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z-]/g, "");
              return (
                <Link key={item.title} to={`/${slug}`} className="block h-full">
                  <div className="gov-panel rounded h-full hover:border-primary/30 hover:shadow-sm transition-all duration-150 group cursor-pointer">
                    <div className="p-4 flex items-start gap-3">
                      <div className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Ayurveda & Regulatory Resources ──────────────────────────── */}
      <section className="bg-card border-y border-border py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="gov-section-heading">
            <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-serif)]">
              Ayurveda &amp; Regulatory Resources
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-6 max-w-2xl">
            The regulatory identity of an Ayurvedic product can materially affect its IP and compliance pathway.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {AYURVEDA_RESOURCES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="gov-panel rounded hover:border-primary/30 hover:shadow-sm transition-all duration-150 cursor-pointer group">
                  <div className="p-4">
                    <div className="size-8 rounded bg-emerald-600/10 text-emerald-700 flex items-center justify-center mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="size-4" />
                    </div>
                    <h3 className="text-sm font-semibold mb-0.5 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Traditional Knowledge ────────────────────────────────────── */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="gov-panel rounded">
            <div className="gov-panel-header flex items-center gap-2">
              <BookOpen className="size-3.5" />
              Traditional Knowledge — First-Class Domain
            </div>
            <div className="p-6">
              <p className="text-xs text-muted-foreground mb-4 max-w-2xl">
                Traditional Knowledge is treated as a first-class domain, not merely an IP category.
                It affects patentability, prior art, biological-resource compliance, ABS obligations,
                and commercialisation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {[
                  { title: "Codified TK", desc: "Knowledge documented in authoritative Ayurvedic texts" },
                  { title: "Community-held TK", desc: "Traditional knowledge held by communities" },
                  { title: "TKDL & Prior Art", desc: "Traditional Knowledge Digital Library resources" },
                  { title: "International TK Frameworks", desc: "WIPO, CBD, Nagoya Protocol, and related frameworks" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-2 p-3 rounded bg-muted/50">
                    <ChevronRight className="size-3 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold">{item.title}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/chat?prefill=tk">
                <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs active:scale-95 transition-transform">
                  <MessageSquare className="size-3" />
                  Ask about Traditional Knowledge
                  <ArrowRight className="size-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Need Human Assistance ───────────────────────────────────── */}
      <section className="bg-card border-y border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="gov-info-box rounded">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <Phone className="size-4 text-primary" />
                <span className="text-sm font-semibold">Need Human Assistance?</span>
              </div>
              <p className="text-xs text-muted-foreground flex-1">
                This information may not be sufficient for your specific situation.
                Find an IP Facilitator, contact support, or explore government resources.
              </p>
              <div className="flex gap-2 shrink-0">
                <Link to="/faq">
                  <Button variant="outline" size="sm" className="h-8 text-xs gap-1 active:scale-95 transition-transform">
                    <Users className="size-3" />
                    IP Facilitator
                  </Button>
                </Link>
                <Link to="/documents">
                  <Button variant="outline" size="sm" className="h-8 text-xs gap-1 active:scale-95 transition-transform">
                    <Building2 className="size-3" />
                    Government Resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ──────────────────────────────────────────────── */}
      <section className="py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="gov-info-box rounded">
            <div className="flex items-start gap-2">
              <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1">
                  Legal Disclaimer
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Information provided by IP-SAKTI Sahayak is for informational and educational
                  purposes and should be verified against the latest authoritative sources.
                  It does not constitute legal advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
