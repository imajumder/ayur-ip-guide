import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";
import {
  Bell,
  Scale,
  Leaf,
  Stethoscope,
  Globe,
  AlertTriangle,
  Clock,
  MessageSquare,
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  isImportant: boolean;
}

const CATEGORIES = [
  { id: "patents", label: "Patent Updates", icon: Scale, color: "text-blue-600" },
  { id: "biodiversity", label: "Biodiversity Updates", icon: Leaf, color: "text-emerald-600" },
  { id: "ayush", label: "AYUSH Regulatory Updates", icon: Stethoscope, color: "text-amber-600" },
  { id: "international", label: "International Treaty Developments", icon: Globe, color: "text-violet-600" },
];

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "placeholder-1",
    title: "Notifications will appear here",
    category: "patents",
    date: "Coming soon",
    description:
      "Actual notifications, circulars, and regulatory updates will be populated from authoritative government sources once data integration is complete.",
    isImportant: false,
  },
];

export default function Notifications() {
  return (
    <Layout
      showBreadcrumbs
      breadcrumbs={[{ label: "Notifications" }]}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Notifications &amp; Updates
          </h1>
          <p className="mt-2 text-muted-foreground text-sm max-w-xl">
            Stay informed about changes to IP, regulatory, and treaty
            frameworks relevant to Ayurveda and traditional knowledge.
          </p>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <span
                key={cat.id}
                className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <Icon className={cn("size-3", cat.color)} />
                {cat.label}
              </span>
            );
          })}
        </div>

        {/* Notifications list */}
        <div className="space-y-3 max-w-3xl">
          {NOTIFICATIONS.map((item) => (
            <div
              key={item.id}
              className={cn(
                "gov-panel rounded",
                item.isImportant && "border-l-2 border-l-primary"
              )}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="size-2.5" />
                        {item.date}
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info card */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="gov-panel rounded">
            <div className="p-5 text-center">
              <Clock className="size-6 text-primary mx-auto mb-3" />
              <p className="text-sm font-medium mb-1">
                Notifications are coming soon
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Once authoritative data sources are integrated, this section will
                display current notifications, circulars, regulatory changes, and
                treaty developments relevant to IP, Ayurveda, TK, and ABS.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 flex items-start gap-2 max-w-2xl mx-auto p-3 rounded-lg bg-muted/50">
          <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Notification content will be sourced from official government
            publications and authoritative bodies. Verify against the latest
            official sources.
          </p>
        </div>
      </div>
    </Layout>
  );
}
