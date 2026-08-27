import { cn } from "@/lib/utils";
import { Globe, MapPin } from "lucide-react";

type Jurisdiction = "india" | "international";

interface JurisdictionSwitchProps {
  value: Jurisdiction;
  onChange: (value: Jurisdiction) => void;
  className?: string;
}

export function JurisdictionSwitch({
  value,
  onChange,
  className,
}: JurisdictionSwitchProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded border border-border bg-card p-0.5",
        className
      )}
    >
      <button
        onClick={() => onChange("india")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all",
          value === "india"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <MapPin className="size-3" />
        INDIA
      </button>
      <button
        onClick={() => onChange("international")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all",
          value === "international"
            ? "bg-secondary text-secondary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Globe className="size-3" />
        INTERNATIONAL
      </button>
    </div>
  );
}
