import { Link } from "react-router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Scale,
  Landmark,
  Shield,
  FileText,
  Briefcase,
  Sprout,
  MessageSquare,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const IP_DOMAINS = [
  {
    icon: Scale,
    title: "Patents",
    description:
      "Protect inventions involving novel formulations, extraction methods, therapeutic applications, and technical innovations in Ayurveda.",
    topics: [
      "Novelty & inventive step",
      "Patentable subject matter",
      "Traditional knowledge exclusions",
      "Prior art & TKDL",
      "Biological resource disclosure",
      "Patent procedures",
    ],
    color: "bg-blue-600/10 text-blue-700",
  },
  {
    icon: Landmark,
    title: "Geographical Indications",
    description:
      "Protect regional Ayurvedic products and community-associated goods with geographical reputation.",
    topics: [
      "Geographical identity",
      "Traditional regional products",
      "Community-associated products",
      "GI registration",
      "Commercialisation",
    ],
    color: "bg-emerald-600/10 text-emerald-700",
  },
  {
    icon: Shield,
    title: "Trade Marks",
    description:
      "Protect brand names, logos, and marks associated with Ayurvedic products and services.",
    topics: [
      "Product & brand names",
      "Logos & visual marks",
      "Classification",
      "Registration",
      "Ayurvedic branding",
    ],
    color: "bg-violet-600/10 text-violet-700",
  },
  {
    icon: FileText,
    title: "Copyright",
    description:
      "Protect original literary, artistic, and creative expression — distinguishing expression from underlying traditional knowledge.",
    topics: [
      "Original expression",
      "Documentation & manuals",
      "Software & databases",
      "Packaging content",
      "TK vs expression",
    ],
    color: "bg-amber-600/10 text-amber-700",
  },
  {
    icon: Briefcase,
    title: "Designs",
    description:
      "Protect the visual appearance of products, packaging, containers, and ornamental features.",
    topics: [
      "Product appearance",
      "Packaging design",
      "Visual & ornamental features",
      "Registration",
    ],
    color: "bg-rose-600/10 text-rose-700",
  },
  {
    icon: Sprout,
    title: "Plant Variety Protection",
    description:
      "Protect new plant varieties including medicinal plants, cultivars, and breeders' rights.",
    topics: [
      "Plant varieties & cultivars",
      "Breeders' rights",
      "Farmers' rights",
      "Medicinal plants",
      "Traditional varieties",
    ],
    color: "bg-teal-600/10 text-teal-700",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function IPLegal() {
  return (
    <Layout
      showBreadcrumbs
      breadcrumbs={[{ label: "IP & Legal Domains" }]}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            IP &amp; Legal Domains
          </h1>
          <p className="mt-2 text-muted-foreground text-sm max-w-xl mx-auto">
            One Ayurvedic innovation can involve multiple legal, regulatory,
            and knowledge systems. Understand how they connect.
          </p>
        </div>

        {/* Domain cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {IP_DOMAINS.map((domain, i) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
              >
                <Card className="h-full border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-200">
                  <CardContent className="pt-5 pb-5 px-5">
                    <div
                      className={`size-10 rounded-lg ${domain.color} flex items-center justify-center mb-3`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-semibold mb-1">{domain.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {domain.description}
                    </p>
                    <div className="space-y-1">
                      {domain.topics.map((topic) => (
                        <div
                          key={topic}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground"
                        >
                          <div className="size-1 rounded-full bg-primary/40 shrink-0" />
                          {topic}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Card className="inline-block border-primary/20 bg-primary/5">
            <CardContent className="py-6 px-8">
              <p className="text-sm font-medium mb-2">
                Have a specific IP question?
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Ask IP-SAKTI Sahayak for source-cited guidance on any IP
                domain.
              </p>
              <Link to="/chat">
                <Button size="sm" className="gap-1.5">
                  <MessageSquare className="size-3.5" />
                  Ask Sahayak
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
