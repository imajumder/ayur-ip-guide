import { Link } from "react-router";
import Layout from "@/components/Layout";
import {
  ChevronRight,
  MessageSquare,
  Shield,
  Scale,
  BookOpen,
  Leaf,
  Landmark,
  FileText,
  Globe,
  Stethoscope,
  HelpCircle,
  Bell,
} from "lucide-react";

const SECTIONS = [
  {
    title: "Home",
    href: "/",
    icon: Shield,
    children: [
      { title: "IP-SAKTI Sahayak (AI Chat)", href: "/chat", icon: MessageSquare },
      { title: "IP & Legal Domains", href: "/ip-legal", icon: Scale },
      { title: "Traditional Knowledge", href: "/traditional-knowledge", icon: BookOpen },
      { title: "Access & Benefit Sharing", href: "/abs", icon: Leaf },
    ],
  },
  {
    title: "IP & Legal",
    href: "/ip-legal",
    icon: Scale,
    children: [
      { title: "Patents", href: "/patents", icon: Scale },
      { title: "Trademarks", href: "/trademarks", icon: Shield },
      { title: "Geographical Indications", href: "/geographical-indications", icon: Landmark },
      { title: "Copyright", href: "/copyright", icon: FileText },
      { title: "Designs", href: "/designs", icon: FileText },
      { title: "Plant Variety Protection", href: "/plant-variety-protection", icon: Leaf },
    ],
  },
  {
    title: "Traditional Knowledge",
    href: "/traditional-knowledge",
    icon: BookOpen,
    children: [
      { title: "TKDL Resources", href: "/tkdl", icon: BookOpen },
      { title: "Prior Art", href: "/prior-art", icon: BookOpen },
      { title: "Community Knowledge", href: "/community-knowledge", icon: BookOpen },
    ],
  },
  {
    title: "Regulatory",
    href: "/abs",
    icon: Leaf,
    children: [
      { title: "ABS Information", href: "/abs", icon: Leaf },
      { title: "AYUSH Regulation", href: "/ayush-regulation", icon: Stethoscope },
      { title: "Food & Nutraceuticals", href: "/food-regulation", icon: Stethoscope },
      { title: "Cosmetics", href: "/cosmetics", icon: Stethoscope },
      { title: "Advertising", href: "/advertising", icon: Stethoscope },
    ],
  },
  {
    title: "Resources",
    href: "/documents",
    icon: FileText,
    children: [
      { title: "Documents & Publications", href: "/documents", icon: FileText },
      { title: "Notifications & Updates", href: "/notifications", icon: Bell },
      { title: "Frequently Asked Questions", href: "/faq", icon: HelpCircle },
      { title: "International IP", href: "/international-ip", icon: Globe },
    ],
  },
];

export default function SiteMap() {
  return (
    <Layout showBreadcrumbs breadcrumbs={[{ label: "Site Map" }]}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="mb-8">
          <div className="gov-section-heading">
            <h1 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-serif)]">
              Site Map
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            Complete overview of the IP-SAKTI Sahayak portal structure and all
            available sections.
          </p>
        </div>

        {/* Flowchart */}
        <div className="relative">
          {/* Root node */}
          <div className="flex justify-center mb-6">
            <Link
              to="/"
              className="gov-panel rounded px-6 py-3 hover:border-primary/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded bg-primary text-primary-foreground flex items-center justify-center">
                  <Shield className="size-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold group-hover:text-primary transition-colors">
                    IP-SAKTI Sahayak
                  </h2>
                  <p className="text-[10px] text-muted-foreground">
                    Home &amp; Landing Page
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Connector line */}
          <div className="flex justify-center mb-4">
            <div className="w-px h-8 bg-border" />
          </div>

          {/* Main sections grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="relative">
                  {/* Connector dot */}
                  <div className="absolute -top-3 left-8 w-2 h-2 rounded-full bg-primary" />

                  <div className="gov-panel rounded overflow-hidden">
                    {/* Section header */}
                    <Link
                      to={section.href}
                      className="flex items-center gap-2.5 px-4 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                    >
                      <Icon className="size-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {section.title}
                      </span>
                      <ChevronRight className="size-3 ml-auto opacity-50" />
                    </Link>

                    {/* Children */}
                    <div className="p-2 space-y-0.5">
                      {section.children.map((child) => {
                        const ChildIcon = child.icon;
                        return (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="flex items-center gap-2 px-3 py-2 rounded text-xs hover:bg-primary/5 transition-colors group"
                          >
                            <ChildIcon className="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                              {child.title}
                            </span>
                            <ChevronRight className="size-2.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Assistant callout */}
          <div className="mt-10 flex justify-center">
            <div className="relative">
              <div className="flex justify-center mb-4">
                <div className="w-px h-6 bg-border" />
              </div>
              <Link
                to="/chat"
                className="gov-panel rounded px-6 py-4 hover:border-primary/40 hover:shadow-md transition-all group block"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded bg-primary text-primary-foreground flex items-center justify-center">
                    <MessageSquare className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold group-hover:text-primary transition-colors">
                      IP-SAKTI Sahayak
                    </h3>
                    <p className="text-[10px] text-muted-foreground">
                      AI-powered guidance — connects all sections
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
