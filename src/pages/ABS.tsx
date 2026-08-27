import { Link } from "react-router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Leaf,
  Sprout,
  Globe,
  FileText,
  Scale,
  MessageSquare,
  ChevronRight,
  AlertTriangle,
  Users,
  MapPin,
  Briefcase,
} from "lucide-react";

const ABS_JOURNEY = [
  {
    icon: Sprout,
    step: "What resource are you using?",
    description: "Identify the biological resource involved.",
  },
  {
    icon: MapPin,
    step: "Where did it come from?",
    description: "Determine the geographic origin of the resource.",
  },
  {
    icon: Leaf,
    step: "Is it a biological resource?",
    description: "Assess whether the resource falls under biological diversity frameworks.",
  },
  {
    icon: Users,
    step: "Is associated traditional knowledge involved?",
    description: "Determine whether TK is associated with the resource.",
  },
  {
    icon: Briefcase,
    step: "What is the purpose?",
    description: "Research, commercialisation, or other use.",
  },
  {
    icon: Globe,
    step: "Which jurisdiction applies?",
    description: "Identify the applicable national or international framework.",
  },
  {
    icon: Scale,
    step: "Identify ABS requirements",
    description: "Determine the applicable access and benefit-sharing obligations.",
  },
  {
    icon: FileText,
    step: "Show authoritative sources",
    description: "Direct to relevant legislation, rules, and guidance.",
  },
];

const ABS_FRAMEWORKS = [
  {
    title: "Biological Diversity Act, 2002",
    type: "Indian Legislation",
    status: "current",
    description:
      "Primary legislation governing conservation, sustainable use, and access to biological resources in India.",
  },
  {
    title: "Biological Diversity Rules, 2004",
    type: "Indian Rules",
    status: "current",
    description:
      "Rules implementing the Biological Diversity Act, including ABS requirements and procedures.",
  },
  {
    title: "Convention on Biological Diversity (CBD)",
    type: "International Treaty",
    status: "current",
    description:
      "International treaty establishing sovereign rights over biological resources and ABS principles.",
  },
  {
    title: "Nagoya Protocol on ABS",
    type: "International Treaty",
    status: "current",
    description:
      "International framework for access to genetic resources and fair sharing of benefits.",
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

export default function ABS() {
  return (
    <Layout
      showBreadcrumbs
      breadcrumbs={[{ label: "Access & Benefit Sharing" }]}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-600/10 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
            <Leaf className="size-3.5" />
            ACCESS &amp; BENEFIT SHARING
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Access &amp; Benefit Sharing
          </h1>
          <p className="mt-2 text-muted-foreground text-sm max-w-xl mx-auto">
            Understanding the framework governing access to biological resources
            and associated traditional knowledge, and the sharing of benefits
            from their utilisation.
          </p>
        </div>

        {/* ABS Journey */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-lg font-bold mb-6 text-center">
            ABS Decision Journey
          </h2>
          <div className="space-y-3">
            {ABS_JOURNEY.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-20px" }}
                  variants={fadeUp}
                >
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border/60">
                    <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="size-4 text-primary" />
                        <h3 className="font-semibold text-sm">{item.step}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ABS Frameworks */}
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="text-lg font-bold mb-6 text-center">
            Applicable Frameworks
          </h2>
          <div className="space-y-3">
            {ABS_FRAMEWORKS.map((fw) => (
              <Card key={fw.title} className="border-border/60">
                <CardContent className="pt-4 pb-4 px-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-sm">{fw.title}</h3>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                          {fw.type}
                        </span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200">
                          CURRENT
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        {fw.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/chat?prefill=abs">
            <Button size="lg" className="gap-2">
              <MessageSquare className="size-4" />
              Ask about ABS
            </Button>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 flex items-start gap-2 max-w-2xl mx-auto p-3 rounded-lg bg-muted/50">
          <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            ABS information is provided for guidance purposes. Do not rely on
            this as a compliance determination. Verify against the latest
            authoritative sources and consult a qualified professional.
          </p>
        </div>
      </div>
    </Layout>
  );
}
