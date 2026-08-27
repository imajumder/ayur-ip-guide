import { SourceCitation, type Source } from "@/components/SourceCitation";
import { cn } from "@/lib/utils";
import { Shield, User, AlertTriangle } from "lucide-react";

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  confidence?: "strong" | "available" | "limited" | "unavailable";
  followUp?: string[];
  disclaimer?: string;
  timestamp: Date;
}

const CONFIDENCE_STYLES: Record<string, { label: string; color: string }> = {
  strong: {
    label: "Strong source support",
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  available: {
    label: "Source support available",
    color: "text-blue-700 bg-blue-50 border-blue-200",
  },
  limited: {
    label: "Limited source support",
    color: "text-amber-700 bg-amber-50 border-amber-200",
  },
  unavailable: {
    label: "Unable to verify",
    color: "text-red-700 bg-red-50 border-red-200",
  },
};

interface ChatMessageProps {
  message: ChatMessageData;
  onFollowUp?: (text: string) => void;
}

export function ChatMessage({ message, onFollowUp }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "animate-message-in flex gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="size-8 rounded-lg bg-primary flex items-center justify-center shrink-0 mt-1">
          <Shield className="size-4 text-primary-foreground" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[85%] rounded-xl px-4 py-3",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-card border border-border rounded-tl-sm shadow-sm"
        )}
      >
        {/* Confidence badge (assistant only) */}
        {!isUser && message.confidence && (
          <div className="mb-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded border",
                CONFIDENCE_STYLES[message.confidence].color
              )}
            >
              {message.confidence === "unavailable" && (
                <AlertTriangle className="size-2.5" />
              )}
              {CONFIDENCE_STYLES[message.confidence].label}
            </span>
          </div>
        )}

        {/* Message content */}
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>

        {/* Disclaimer */}
        {!isUser && message.disclaimer && (
          <div className="mt-3 pt-2 border-t border-border/50">
            <p className="text-[10px] text-muted-foreground italic">
              {message.disclaimer}
            </p>
          </div>
        )}

        {/* Sources */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <SourceCitation sources={message.sources} />
          </div>
        )}

        {/* Follow-up suggestions */}
        {!isUser && message.followUp && message.followUp.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {message.followUp.map((text) => (
              <button
                key={text}
                onClick={() => onFollowUp?.(text)}
                className="text-xs bg-primary/10 text-primary hover:bg-primary/20 px-2.5 py-1 rounded-full transition-colors font-medium"
              >
                {text}
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <div
          className={cn(
            "text-[10px] mt-2",
            isUser ? "text-primary-foreground/60" : "text-muted-foreground/60"
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {isUser && (
        <div className="size-8 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center shrink-0 mt-1">
          <User className="size-4" />
        </div>
      )}
    </div>
  );
}
