import { useState } from "react";
import { Link } from "react-router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
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
  Building2,
  Sprout,
  Briefcase,
  ChevronRight,
  Search,
  Landmark,
  ExternalLink,
  HelpCircle,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";

const EXPLORE_BY_NEED = [
  {
    icon: FlaskConical,
    title: "I have an Ayurvedic product",
    description:
      "Explore classification, regulatory requirements and IP options.",
    href: "/chat?prefill=product",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Scale,
    title: "I have developed a new formulation",
    description:
      "Explore patentability, prior art, regulatory classification and ABS.",
    href: "/chat?prefill=formulation",
    color: "bg-blue-600/10 text-blue-700",
  },
  {
    icon: BookOpen,
    title: "I want to protect traditional knowledge",
    description:
      "Explore TK, prior-art and relevant protection mechanisms.",
    href: "/chat?prefill=tk",
    color: "bg-emerald-600/10 text-emerald-700",
  },
  {
    icon: Briefcase,
    title: "I want to commercialise my product",
    description:
      "Explore IP, regulatory and market-access considerations.",
    href: "/chat?prefill=commercialise",
    color: "bg-amber-600/10 text-amber-700",
  },
  {
    icon: Globe,
    title: "I want to export an Ayurvedic product",
    description:
      "Explore international IP and destination-market requirements.",
    href: "/chat?prefill=export",
    color: "bg-violet-600/10 text-violet-700",
  },
  {
    icon: Leaf,
    title: "I need to understand ABS",
    description:
      "Explore biological resources, associated knowledge and benefit-sharing.",
    href: "/chat?prefill=abs",
    color: "bg-teal-600/10 text-teal-700",
  },
];

const IP_DOMAINS = [
  {
    icon: Scale,
    title: "Patents",
    description: "Novelty, inventive step, patentable subject matter, TK-related exclusions",
  },
  {
    icon: Landmark,
    title: "Geographical Indications",
    description: "Regional products, community-associated goods, GI registration",
  },
  {
    icon: Shield,
    title: "Trade Marks",
    description: "Brand names, logos, product marks, Ayurvedic branding",
  },
  {
    icon: FileText,
    title: "Copyright",
    description: "Original expression, documentation, software, creative works",
  },
  {
    icon: Briefcase,
    title: "Designs",
    description: "Product appearance, packaging, visual design, ornamental features",
  },
  {
    icon: Sprout,
    title: "Plant Variety Protection",
    description: "Cultivars, breeders, farmers' rights, medicinal plants",
  },
];

const AYURVEDA_RESOURCES = [
  {
    icon: Stethoscope,
    title: "Classical & Proprietary Medicines",
    description: "Regulatory classification, pharmacopoeial standards, licensing",
  },
  {
    icon: FlaskConical,
    title: "Phytopharmaceuticals",
    description: "Plant-based pharmaceutical regulatory pathway",
  },
  {
    icon: HelpCircle,
    title: "Ayurveda-Aahar / Nutraceuticals",
    description: "Food regulatory pathway, FSSAI requirements",
  },
  {
    icon: AlertTriangle,
    title: "Advertising Restrictions",
    description: "Drugs and Magic Remedies, advertising rules compliance",
  },
];

const QUICK_LINKS = [
  { label: "Patents", icon: Scale },
  { label: "Trademarks", icon: Shield },
  { label: "GIs", icon: Landmark },
  { label: "Traditional Knowledge", icon: BookOpen },
  { label: "TKDL", icon: Search },
  { label: "ABS", icon: Leaf },
  { label: "AYUSH Regulation", icon: Stethoscope },
  { label: "International IP", icon: Globe },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary/95 to-primary/10 text-secondary-foreground overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium mb-6">
                <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
                  IP-SAKTI
                </span>
                <span>Intellectual Property &amp; Ayurveda Portal</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Navigate the intersection of{" "}
                <span className="text-primary">Ayurveda</span>,{" "}
                <span className="text-primary">Intellectual Property</span>, and{" "}
                <span className="text-primary">Regulatory Frameworks</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg opacity-80 leading-relaxed max-w-2xl">
                IP-SAKTI Sahayak is an intelligent, source-cited information
                assistant designed for Ayurveda practitioners, researchers,
                startups, and innovators navigating IP protection, traditional
                knowledge, biological resources, and product regulation.
              </p>
            </motion.div>

            {/* Quick Search / AI Entry */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8"
            >
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ask Sahayak anything about IP, Ayurveda, TK..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/chat?q=${encodeURIComponent(searchQuery.trim())}`;
                    }
                  }}
                  className="w-full pl-12 pr-32 py-3.5 rounded-lg bg-card text-foreground border border-border shadow-sm text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <Link
                  to={searchQuery.trim() ? `/chat?q=${encodeURIComponent(searchQuery.trim())}` : "/chat"}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Button size="sm" className="gap-1.5">
                    <MessageSquare className="size-3.5" />
                    Ask Sahayak
                  </Button>
                </Link>
              </div>
              <p className="mt-2 text-xs opacity-60">
                Source-cited guidance • Jurisdiction-aware • Safe abstention
              </p>
            </motion.div>

            {/* Jurisdiction indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-6 flex items-center gap-3"
            >
              <div className="jurisdiction-india px-3 py-1 rounded text-xs font-semibold tracking-wide">
                INDIA
              </div>
              <div className="jurisdiction-international px-3 py-1 rounded text-xs font-semibold tracking-wide">
                INTERNATIONAL
              </div>
              <span className="text-xs opacity-50 ml-1">
                — Clear jurisdictional separation
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Domain Overview Band */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
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
                <span key={item.label} className="flex items-center gap-1.5">
                  <Icon className="size-4 text-primary" />
                  <span className="font-medium">{item.label}</span>
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore By Need */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Explore by Need
            </h2>
            <p className="mt-2 text-muted-foreground text-sm max-w-xl mx-auto">
              Tell us what you are working with and we will guide you through
              the applicable IP, regulatory, and knowledge frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPLORE_BY_NEED.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                >
                  <Link to={item.href} className="block h-full">
                    <Card className="h-full border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer group">
                      <CardContent className="pt-5 pb-5 px-5">
                        <div
                          className={`size-10 rounded-lg ${item.color} flex items-center justify-center mb-3`}
                        >
                          <Icon className="size-5" />
                        </div>
                        <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Ask Sahayak
                          <ArrowRight className="size-3" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IP-SAKTI Sahayak CTA */}
      <section className="bg-gradient-to-br from-primary/5 via-card to-primary/5 border-y border-border py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
                <MessageSquare className="size-3.5" />
                IP-SAKTI SAHAYAK
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Your intelligent guide through IP, Ayurveda &amp; regulation
              </h2>
              <p className="mt-3 text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
                Ask questions in plain language. Sahayak understands product
                classification, routes across IP domains, identifies regulatory
                pathways, and provides source-cited answers — with clear
                jurisdictional separation between India and international
                frameworks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link to="/chat">
                <Button size="lg" className="gap-2 px-8">
                  <MessageSquare className="size-4" />
                  Ask IP-SAKTI Sahayak
                </Button>
              </Link>
              <Link to="/faq">
                <Button variant="outline" size="lg" className="gap-2 px-8">
                  <HelpCircle className="size-4" />
                  Browse FAQs
                </Button>
              </Link>
            </motion.div>

            {/* Feature badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                "Source-cited answers",
                "Jurisdiction-aware",
                "Product classification",
                "Safe abstention",
                "Government resources",
              ].map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1 text-xs text-muted-foreground"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IP & Legal Domains */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              IP &amp; Legal Domains
            </h2>
            <p className="mt-2 text-muted-foreground text-sm max-w-xl mx-auto">
              One Ayurvedic innovation can involve multiple legal, regulatory,
              and knowledge systems. Sahayak helps you understand how they
              connect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {IP_DOMAINS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                >
                  <Card className="border-border/60 hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                    <CardContent className="pt-5 pb-5 px-5">
                      <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ayurveda & Regulatory Resources */}
      <section className="bg-card border-y border-border py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ayurveda &amp; Regulatory Resources
            </h2>
            <p className="mt-2 text-muted-foreground text-sm max-w-xl mx-auto">
              The regulatory identity of an Ayurvedic product can materially
              affect its IP and compliance pathway.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AYURVEDA_RESOURCES.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                >
                  <Card className="border-border/60 hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                    <CardContent className="pt-5 pb-5 px-5">
                      <div className="size-10 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center mb-3">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Traditional Knowledge */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6 sm:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <BookOpen className="size-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    Traditional Knowledge
                  </h2>
                  <p className="mt-1 text-muted-foreground text-sm">
                    Treated as a first-class domain, not merely an IP category
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    title: "Codified TK",
                    desc: "Knowledge documented in authoritative Ayurvedic texts",
                  },
                  {
                    title: "Community-held TK",
                    desc: "Traditional knowledge held by communities",
                  },
                  {
                    title: "TKDL & Prior Art",
                    desc: "Traditional Knowledge Digital Library resources",
                  },
                  {
                    title: "International TK Frameworks",
                    desc: "WIPO, CBD, Nagoya Protocol, and related frameworks",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <ChevronRight className="size-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/chat?prefill=tk">
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="size-3.5" />
                  Ask about Traditional Knowledge
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-muted/30 border-y border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-sm font-semibold text-center mb-6 text-muted-foreground uppercase tracking-wider">
            Quick Links
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  to="/chat"
                  className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                >
                  <Icon className="size-3" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-muted/50 border-y border-border py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 text-amber-700 mb-2">
            <AlertTriangle className="size-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Legal Disclaimer
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Information provided by IP-SAKTI Sahayak is for informational and
            educational purposes and should be verified against the latest
            authoritative sources. It does not constitute legal advice.
          </p>
        </div>
      </section>
    </Layout>
  );
}
