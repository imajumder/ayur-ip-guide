import { Link } from "react-router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Search,
  Globe,
  Users,
  Shield,
  FileText,
  MessageSquare,
  ChevronRight,
  AlertTriangle,
  Scale,
  Leaf,
} from "lucide-react";

const TK_SECTIONS = [
  {
    icon: BookOpen,
    title: "Codified Traditional Knowledge",
    description:
      "Knowledge documented in authoritative Ayurvedic texts such as the Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya.",
    details: [
      "Recognised pharmacopoeial standards",
      "Classical formulation references",
      "Documented therapeutic practices",
    ],
  },
  {
    icon: Users,
    title: "Community-Held Knowledge",
    description:
      "Traditional knowledge held and transmitted within communities, including unwritten and orally transmitted knowledge.",
    details: [
      "Oral traditions",
      "Community practices",
      "Regional knowledge systems",
    ],
  },
  {
    icon: Search,
    title: "TKDL & Prior Art",
    description:
      "The Traditional Knowledge Digital Library and its role in preventing erroneous patents based on existing traditional knowledge.",
    details: [
      "TKDL digitisation initiative",
      "Prior art searches",
      "Defensive patent protection",
    ],
  },
  {
    icon: Globe,
    title: "International TK Frameworks",
    description:
      "International treaties and frameworks addressing traditional knowledge, including WIPO, CBD, and the Nagoya Protocol.",
    details: [
      "WIPO Intellectual Property Framework",
      "Convention on Biological Diversity",
      "Nagoya Protocol on ABS",
      "WIPO Treaty on Genetic Resources and Associated TK",
    ],
  },
  {
    icon: Scale,
    title: "TK & Patentability",
    description:
      "How traditional knowledge affects patent applications, novelty assessments, and inventive step analysis.",
    details: [
      "Patent exclusions for TK-based inventions",
      "Prior art considerations",
      "Disclosure requirements",
    ],
  },
  {
    icon: Leaf,
    title: "TK & Biological Resources",
    description:
      "The intersection of traditional knowledge with biological resource access, ABS obligations, and community rights.",
    details: [
      "Associated traditional knowledge",
      "Benefit-sharing obligations",
      "Community consent requirements",
    ],
  },
];



export default function TraditionalKnowledge() {
  return (
    <Layout
      showBreadcrumbs
      breadcrumbs={[{ label: "Traditional Knowledge" }]}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
            <BookOpen className="size-3.5" />
            TRADITIONAL KNOWLEDGE
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Traditional Knowledge
          </h1>
          <p className="mt-2 text-muted-foreground text-sm max-w-xl mx-auto">
            Treated as a first-class domain — not merely an IP category.
            Traditional knowledge affects patentability, prior art, biological
            resource compliance, ABS obligations, and commercialisation.
          </p>
        </div>

        {/* TK Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TK_SECTIONS.map((section, i) => {
            const Icon = section.icon;
            return (              <div key={section.title}>
                <div className="gov-panel rounded h-full hover:border-primary/30 transition-colors">
                  <div className="p-4">
                    <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">
                      {section.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {section.description}
                    </p>
                    <div className="space-y-1">
                      {section.details.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground"
                        >
                          <ChevronRight className="size-3 text-primary shrink-0" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* TKDL Workflow */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="gov-panel rounded">
            <div className="p-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Search className="size-5 text-primary" />
                TKDL / Prior-Art Workflow
              </h2>
              <div className="space-y-3">
                {[
                  "User describes invention",
                  "Identify Ayurvedic / TK elements",
                  "Check whether knowledge is already documented",
                  "Identify relevant prior-art material",
                  "Explain potential patentability implications",
                  "Direct user to authoritative sources",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground italic">
                  "This information may indicate that traditional knowledge or
                  existing prior art could be relevant to patentability. Review
                  the cited authority and seek professional advice where
                  necessary."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link to="/chat?prefill=tk">
            <Button size="lg" className="gap-2">
              <MessageSquare className="size-4" />
              Ask about Traditional Knowledge
            </Button>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 flex items-start gap-2 max-w-2xl mx-auto p-3 rounded-lg bg-muted/50">
          <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Traditional knowledge information is provided for guidance purposes
            and should be verified against the latest authoritative sources.
            This does not constitute legal advice.
          </p>
        </div>
      </div>
    </Layout>
  );
}
