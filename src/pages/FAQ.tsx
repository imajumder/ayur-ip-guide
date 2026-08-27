import { useState } from "react";
import { Link } from "react-router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Scale,
  BookOpen,
  Leaf,
  Stethoscope,
  Globe,
  MessageSquare,
  ChevronDown,
  Search,
  AlertTriangle,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  items: FAQItem[];
}

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "ip",
    icon: Scale,
    title: "Intellectual Property",
    description: "Patents, trademarks, GIs, copyrights, and designs",
    items: [
      {
        question: "Can an Ayurvedic formulation be patented?",
        answer:
          "Patentability of an Ayurvedic formulation depends on several factors including novelty, inventive step, and patentable subject matter. Traditional knowledge documented in resources like the TKDL may constitute prior art. The answer depends on whether the formulation is classical (derived from authoritative texts) or genuinely novel. Consult the applicable patent legislation and a qualified professional for specific guidance.",
      },
      {
        question: "What is the difference between patent and trademark protection?",
        answer:
          "A patent protects an invention — a new and inventive product, process, or formulation. A trademark protects a brand identity — a name, logo, or mark that distinguishes goods or services. For an Ayurvedic product, both may apply: a patent for the formulation and a trademark for the brand.",
      },
      {
        question: "Can traditional knowledge be copyrighted?",
        answer:
          "Copyright protects original literary, artistic, and creative expression — not ideas, practices, or traditional knowledge itself. A specific written compilation or artistic representation of traditional knowledge may attract copyright protection, but the underlying traditional knowledge generally does not.",
      },
    ],
  },
  {
    id: "tk",
    icon: BookOpen,
    title: "Traditional Knowledge",
    description: "TK protection, TKDL, prior art, and community knowledge",
    items: [
      {
        question: "What is traditional knowledge?",
        answer:
          "Traditional knowledge refers to knowledge, innovations, and practices of indigenous and local communities, often developed over generations. In the Ayurveda context, this includes codified knowledge from classical texts, community-held knowledge, therapeutic practices, and traditional formulations.",
      },
      {
        question: "How can prior traditional knowledge affect patentability?",
        answer:
          "Traditional knowledge documented in authoritative sources — particularly the TKDL — may constitute prior art. If an invention is based on or anticipated by existing traditional knowledge, this may affect the novelty and inventive step requirements for patentability.",
      },
      {
        question: "What is TKDL?",
        answer:
          "The Traditional Knowledge Digital Library (TKDL) is a joint initiative of CSIR and DPIIT (Government of India). It digitises traditional knowledge from classical Ayurvedic texts to prevent erroneous patents based on existing traditional knowledge.",
      },
    ],
  },
  {
    id: "abs",
    icon: Leaf,
    title: "Access & Benefit Sharing",
    description: "Biological resources, associated knowledge, and benefit-sharing",
    items: [
      {
        question: "What is Access and Benefit Sharing?",
        answer:
          "Access and Benefit Sharing (ABS) refers to the framework governing how biological resources and associated traditional knowledge are accessed, and how the benefits arising from their utilisation are shared — particularly with local communities and the country of origin.",
      },
      {
        question: "When can biological-resource rules become relevant?",
        answer:
          "Biological-resource rules may become relevant when a product or research involves biological resources (medicinal plants, microbial resources, animal-derived materials), associated traditional knowledge, or cross-border transfer of such resources.",
      },
      {
        question: "What information should users check regarding ABS?",
        answer:
          "Users should check: (1) whether the resource is a biological resource, (2) its geographic origin, (3) whether associated traditional knowledge is involved, (4) the intended purpose (research/commercial), and (5) which jurisdiction applies. Consult the Biological Diversity Act and relevant international frameworks.",
      },
    ],
  },
  {
    id: "regulation",
    icon: Stethoscope,
    title: "Regulation",
    description: "Drug classification, AYUSH regulation, food and cosmetics",
    items: [
      {
        question: "What is the difference between a classical and proprietary medicine?",
        answer:
          "Classical medicines are derived from authoritative Ayurvedic texts and have established pharmacopoeial standards. Proprietary medicines involve formulations developed by manufacturers that may not be directly from classical sources. The classification affects regulatory requirements, documentation, and compliance obligations.",
      },
      {
        question: "How does product classification affect regulatory requirements?",
        answer:
          "The regulatory classification of an Ayurvedic product — whether it is a classical medicine, proprietary medicine, new drug, phytopharmaceutical, food/nutraceutical, or cosmetic — materially affects the applicable regulatory framework, registration requirements, labelling, advertising restrictions, and documentation.",
      },
      {
        question: "How are food and cosmetic products treated differently?",
        answer:
          "Food products (including Ayurveda-Aahar) fall under FSSAI regulations, while cosmetics fall under cosmetics-specific regulations. Both differ from therapeutic-drug regulation. The classification depends on the product's intended purpose, claims, and composition.",
      },
    ],
  },
  {
    id: "international",
    icon: Globe,
    title: "International",
    description: "PCT, Madrid, international treaties, and market access",
    items: [
      {
        question: "How does international patent filing differ from national protection?",
        answer:
          "National patent protection is limited to the granting country. International patent filing through the PCT (Patent Cooperation Treaty) provides a unified procedure for seeking protection in multiple countries, but each national/regional office still conducts its own examination. International treaties do not automatically create a single global IP registration system.",
      },
      {
        question: "What does the PCT do?",
        answer:
          "The Patent Cooperation Treaty (PCT) streamlines the process of filing patent applications internationally. It provides a unified filing procedure and preliminary examination, but does not grant international patents — national patent offices still make the final grant decision.",
      },
      {
        question: "How does international trademark registration work?",
        answer:
          "The Madrid System allows trademark holders to register their mark in multiple countries through a single application filed with their national trademark office. However, each designated country may still examine and potentially refuse the mark under its own laws.",
      },
    ],
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("ip");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const activeCat = FAQ_CATEGORIES.find((c) => c.id === activeCategory);

  const filteredItems =
    searchQuery.trim()
      ? FAQ_CATEGORIES.flatMap((cat) =>
          cat.items
            .filter(
              (item) =>
                item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item) => ({ ...item, categoryTitle: cat.title }))
        )
      : null;

  return (
    <Layout
      showBreadcrumbs
      breadcrumbs={[{ label: "FAQ" }]}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-muted-foreground text-sm max-w-xl mx-auto">
            Answers organised by domain. Use the search or browse categories.
          </p>

          {/* Search */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        {filteredItems ? (
          /* Search results */
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground mb-4">
              {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""} found
            </p>
            <div className="space-y-3">
              {filteredItems.map((item, i) => (
                <Card key={`${item.categoryTitle}-${i}`} className="border-border/60">
                  <CardContent className="pt-4 pb-4 px-5">
                    <p className="text-[10px] text-primary font-semibold uppercase tracking-wider mb-1">
                      {item.categoryTitle}
                    </p>
                    <h3 className="font-semibold text-sm mb-2">
                      {item.question}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Category view */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar categories */}
            <div className="lg:col-span-1">
              <div className="space-y-1 sticky top-4">
                {FAQ_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = cat.id === activeCategory;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className="truncate">{cat.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FAQ items */}
            <div className="lg:col-span-3">
              {activeCat && (
                <div>
                  <div className="mb-4">
                    <h2 className="text-lg font-bold">{activeCat.title}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {activeCat.description}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {activeCat.items.map((item, i) => {
                      const key = `${activeCat.id}-${i}`;
                      const isOpen = openItems.has(key);
                      return (
                        <Card
                          key={key}
                          className="border-border/60 overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(key)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left"
                          >
                            <span className="font-medium text-sm pr-4">
                              {item.question}
                            </span>
                            <ChevronDown
                              className={cn(
                                "size-4 shrink-0 text-muted-foreground transition-transform",
                                isOpen && "rotate-180"
                              )}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-4 pt-0">
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Card className="inline-block border-primary/20 bg-primary/5">
            <CardContent className="py-6 px-8">
              <p className="text-sm font-medium mb-2">
                Still have questions?
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Ask IP-SAKTI Sahayak for source-cited guidance.
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

        {/* Disclaimer */}
        <div className="mt-8 flex items-start gap-2 max-w-2xl mx-auto p-3 rounded-lg bg-muted/50">
          <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Answers are provided for informational and educational purposes and
            should be verified against the latest authoritative sources. They do
            not constitute legal advice.
          </p>
        </div>
      </div>
    </Layout>
  );
}
