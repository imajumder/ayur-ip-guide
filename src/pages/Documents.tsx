import { useState } from "react";
import { Link } from "react-router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FileText,
  Scale,
  BookOpen,
  Leaf,
  Stethoscope,
  Globe,
  Shield,
  ExternalLink,
  MessageSquare,
  Filter,
  AlertTriangle,
} from "lucide-react";

const DOMAINS = [
  { id: "all", label: "All", icon: FileText },
  { id: "patents", label: "Patents", icon: Scale },
  { id: "tk", label: "Traditional Knowledge", icon: BookOpen },
  { id: "abs", label: "ABS / Biodiversity", icon: Leaf },
  { id: "ayush", label: "AYUSH Regulation", icon: Stethoscope },
  { id: "international", label: "International", icon: Globe },
  { id: "other", label: "Other", icon: Shield },
];

interface DocumentItem {
  title: string;
  domain: string;
  type: string;
  status: "current" | "historical" | "pending";
  date?: string;
  authority: string;
  description: string;
  url?: string;
}

const DOCUMENTS: DocumentItem[] = [
  {
    title: "Patents Act, 1970",
    domain: "patents",
    type: "Act",
    status: "current",
    date: "2005 (amended)",
    authority: "Legislature of India",
    description:
      "Primary legislation governing patents in India, including provisions relevant to traditional knowledge and biological resources.",
    url: "https://www.ipindia.gov.in",
  },
  {
    title: "Patents Rules, 2003",
    domain: "patents",
    type: "Rule",
    status: "current",
    authority: "Controller General of Patents, Designs & Trade Marks",
    description: "Rules implementing the Patents Act, including application procedures and examination guidelines.",
    url: "https://www.ipindia.gov.in",
  },
  {
    title: "Trade Marks Act, 1999",
    domain: "patents",
    type: "Act",
    status: "current",
    authority: "Legislature of India",
    description: "Primary legislation governing trade marks in India.",
    url: "https://www.ipindia.gov.in",
  },
  {
    title: "Geographical Indications of Goods Act, 1999",
    domain: "patents",
    type: "Act",
    status: "current",
    authority: "Legislature of India",
    description: "Legislation governing geographical indications registration and protection in India.",
    url: "https://www.ipindia.gov.in",
  },
  {
    title: "Biological Diversity Act, 2002",
    domain: "abs",
    type: "Act",
    status: "current",
    authority: "Legislature of India",
    description:
      "Primary legislation governing conservation, sustainable use, and access to biological resources in India.",
    url: "https://nbaindia.org",
  },
  {
    title: "Biological Diversity Rules, 2004",
    domain: "abs",
    type: "Rule",
    status: "current",
    authority: "Ministry of Environment, Forest and Climate Change",
    description: "Rules implementing the Biological Diversity Act, including ABS requirements.",
    url: "https://nbaindia.org",
  },
  {
    title: "Drugs and Cosmetics Act, 1940",
    domain: "ayush",
    type: "Act",
    status: "current",
    date: "Amended periodically",
    authority: "Legislature of India",
    description: "Primary legislation governing drugs and cosmetics regulation, including Ayurvedic medicines.",
  },
  {
    title: "Drugs and Cosmetics Rules, 1945",
    domain: "ayush",
    type: "Rule",
    status: "current",
    authority: "Central Drugs Standard Control Organisation",
    description: "Rules governing drug and cosmetic regulation, including Ayurvedic and Siddha medicine provisions.",
  },
  {
    title: "Convention on Biological Diversity (CBD)",
    domain: "international",
    type: "Treaty",
    status: "current",
    date: "1993",
    authority: "United Nations",
    description: "International treaty on biological diversity, sovereign rights over biological resources, and ABS principles.",
    url: "https://www.cbd.int",
  },
  {
    title: "Nagoya Protocol on Access and Benefit Sharing",
    domain: "international",
    type: "Treaty",
    status: "current",
    date: "2014",
    authority: "CBD Secretariat",
    description: "International framework for access to genetic resources and fair sharing of benefits.",
    url: "https://www.cbd.int/abs",
  },
  {
    title: "TRIPS Agreement",
    domain: "international",
    type: "Treaty",
    status: "current",
    authority: "World Trade Organization",
    description: "Agreement on Trade-Related Aspects of Intellectual Property Rights.",
    url: "https://www.wto.org/english/docs_e/legal_e/27-trips.pdf",
  },
  {
    title: "Patent Cooperation Treaty (PCT)",
    domain: "international",
    type: "Treaty",
    status: "current",
    authority: "WIPO",
    description: "International treaty providing a unified procedure for filing patent applications internationally.",
    url: "https://www.wipo.int/pct/en/",
  },
];

export default function Documents() {
  const [activeDomain, setActiveDomain] = useState("all");

  const filtered =
    activeDomain === "all"
      ? DOCUMENTS
      : DOCUMENTS.filter((d) => d.domain === activeDomain);

  return (
    <Layout
      showBreadcrumbs
      breadcrumbs={[{ label: "Documents" }]}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Documents &amp; Publications
          </h1>
          <p className="mt-2 text-muted-foreground text-sm max-w-xl">
            Authoritative legislation, rules, treaties, and guidelines relevant
            to IP, Ayurveda, TK, and ABS.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar filters */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="size-3.5 text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Filter by Domain
              </span>
            </div>
            <div className="space-y-1">
              {DOMAINS.map((domain) => {
                const Icon = domain.icon;
                const isActive = domain.id === activeDomain;
                const count =
                  domain.id === "all"
                    ? DOCUMENTS.length
                    : DOCUMENTS.filter((d) => d.domain === domain.id).length;
                return (
                  <button
                    key={domain.id}
                    onClick={() => setActiveDomain(domain.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="size-3.5" />
                      {domain.label}
                    </span>
                    <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Document list */}
          <div className="lg:col-span-3">
            <div className="space-y-3">
              {filtered.map((doc) => (
                <div key={doc.title} className="gov-panel rounded hover:border-primary/20 transition-colors">
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-sm">
                            {doc.title}
                          </h3>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                            {doc.type}
                          </span>
                          <span
                            className={cn(
                              "text-[10px] font-semibold px-1.5 py-0.5 rounded",
                              doc.status === "current"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            )}
                          >
                            {doc.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {doc.authority}
                          {doc.date && ` • ${doc.date}`}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          {doc.description}
                        </p>
                      </div>
                      {doc.url && (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="size-8 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">
                    No documents in this category yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 gov-panel rounded">
          <div className="p-6 text-center">
            <p className="text-sm font-semibold mb-1">
              Need help understanding a document?
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Ask IP-SAKTI Sahayak to explain any regulatory document.
            </p>
            <Link to="/chat">
              <Button size="sm" className="gap-1.5 h-8 text-xs">
                <MessageSquare className="size-3" />
                Ask Sahayak
              </Button>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 gov-info-box rounded">
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Document information is provided for reference purposes. Always
            consult the latest official sources for current legal requirements.
          </p>
        </div>
      </div>
    </Layout>
  );
}
