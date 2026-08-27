import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router";
import Layout from "@/components/Layout";
import { ChatMessage, type ChatMessageData } from "@/components/ChatMessage";
import { JurisdictionSwitch } from "@/components/JurisdictionSwitch";
import {
  ProductClassifier,
  type ClassificationResult,
} from "@/components/ProductClassifier";
import type { Source } from "@/components/SourceCitation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Send,
  Loader2,
  FlaskConical,
  BookOpen,
  Shield,
  Scale,
  Leaf,
  AlertTriangle,
} from "lucide-react";

type Jurisdiction = "india" | "international";

const SAMPLE_RESPONSES: Record<string, {
  content: string;
  sources: Source[];
  confidence: "strong" | "available" | "limited" | "unavailable";
  followUp: string[];
}> = {
  default: {
    content:
      "Thank you for your question. IP-SAKTI Sahayak is designed to help with Intellectual Property, Ayurveda, traditional knowledge, and related regulatory information.\n\nTo provide you with the most accurate guidance, I may need some additional information:\n\n1. What type of Ayurvedic product or formulation are you working with?\n2. Which jurisdiction are you interested in — India or international?\n3. Are you seeking IP protection, regulatory guidance, or both?\n\nPlease provide more details and I will help identify the applicable frameworks and authoritative sources.",
    sources: [],
    confidence: "limited",
    followUp: [
      "Classify my product",
      "Patent questions",
      "Traditional knowledge",
      "ABS requirements",
    ],
  },
  patent: {
    content:
      "Patent considerations for Ayurvedic formulations involve several important dimensions:\n\nFORMULATION CLASSIFICATION\nThe regulatory identity of your product may materially affect its IP pathway. A classical formulation derived from authoritative Ayurvedic texts may face patentability limitations due to traditional knowledge prior art.\n\nPATENTABILITY CONSIDERATIONS\n• Novelty — Is the formulation genuinely new?\n• Inventive step — Is there a non-obvious technical contribution?\n• Patentable subject matter — Some traditional knowledge-based inventions may face exclusions\n• Prior art — Traditional knowledge documented in resources like TKDL may constitute prior art\n\nTRADITIONAL KNOWLEDGE LAYER\nTraditional knowledge is treated as a first-class domain. If your formulation is based on existing traditional knowledge, this may significantly affect patentability analysis.\n\nWHAT TO CHECK NEXT\n• Review the applicable patent legislation for your jurisdiction\n• Search the TKDL for related traditional knowledge\n• Consider the product classification pathway\n• Consult a qualified patent professional\n\nNote: This information is for guidance only and should be verified against the latest authoritative sources.",
    sources: [
      {
        id: "patents-act",
        title: "Patents Act, 1970",
        section: "Sections 2(1), 3(p), 25",
        issuingAuthority: "Legislature of India",
        status: "current",
        effectiveDate: "2005 (amended)",
        url: "https://www.ipindia.gov.in",
        type: "statute",
      },
      {
        id: "patent-rules",
        title: "Patents Rules, 2003",
        issuingAuthority: "Controller General of Patents",
        status: "current",
        url: "https://www.ipindia.gov.in",
        type: "rule",
      },
      {
        id: "tkdl",
        title: "Traditional Knowledge Digital Library",
        issuingAuthority: "CSIR & DPIIT",
        status: "current",
        url: "https://tkdl.res.in",
        type: "database",
      },
    ],
    confidence: "available",
    followUp: [
      "Learn about TKDL",
      "Product classification",
      "ABS requirements",
      "Regulatory pathway",
    ],
  },
  tk: {
    content:
      "Traditional Knowledge (TK) in the context of Ayurveda and IP involves several interconnected considerations:\n\nTYPES OF TRADITIONAL KNOWLEDGE\n• Codified TK — Knowledge documented in authoritative Ayurvedic texts (Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, etc.)\n• Community-held TK — Traditional knowledge held and transmitted by communities\n• Publicly documented TK — Knowledge available in published literature\n• Confidential TK — Proprietary traditional knowledge not publicly disclosed\n\nHOW TK AFFECTS IP\n• Patentability — Documented TK may constitute prior art, potentially affecting novelty and inventive step assessments\n• TKDL — The Traditional Knowledge Digital Library serves as a defensive resource against erroneous patents based on traditional knowledge\n• Prior art analysis — TK-related prior art must be considered in patent examination\n\nTK PROTECTION MECHANISMS\n• Sui generis protection frameworks\n• Defensive protection through documentation (TKDL)\n• Community-level protection mechanisms\n• International frameworks (WIPO, CBD)\n\nIMPORTANT NOTE\nTraditional knowledge may affect patentability, biological-resource compliance, ABS obligations, and commercialisation. Always verify against the latest authoritative sources.",
    sources: [
      {
        id: "tkdl-info",
        title: "Traditional Knowledge Digital Library (TKDL)",
        issuingAuthority: "CSIR & DPIIT, Government of India",
        status: "current",
        url: "https://tkdl.res.in",
        type: "database",
      },
      {
        id: "cbd",
        title: "Convention on Biological Diversity",
        issuingAuthority: "United Nations",
        status: "current",
        effectiveDate: "1993",
        url: "https://www.cbd.int",
        type: "treaty",
      },
      {
        id: "nagoya",
        title: "Nagoya Protocol on Access and Benefit Sharing",
        issuingAuthority: "CBD Secretariat",
        status: "current",
        effectiveDate: "2014",
        url: "https://www.cbd.int/abs",
        type: "treaty",
      },
    ],
    confidence: "available",
    followUp: [
      "Patent considerations",
      "ABS requirements",
      "Export requirements",
      "Product classification",
    ],
  },
  abs: {
    content:
      "Access and Benefit Sharing (ABS) is a critical framework when working with biological resources and associated traditional knowledge.\n\nWHAT IS ABS?\nABS refers to the framework governing how biological resources and associated knowledge are accessed, and how the benefits from their use are shared — particularly with local communities and the country of origin.\n\nWHEN DOES ABS APPLY?\n• When your product uses biological resources (medicinal plants, microbial resources, animal-derived resources)\n• When associated traditional knowledge is involved\n• When research or commercialisation is the purpose\n\nKEY CONSIDERATIONS\n• Biological Diversity Act, 2002 (India)\n• National Biodiversity Authority requirements\n• Prior informed consent requirements\n• Benefit-sharing obligations\n• Material Transfer Agreements\n\nINTERNATIONAL FRAMEWORK\n• Convention on Biological Diversity (CBD)\n• Nagoya Protocol on ABS\n• National implementations vary by country\n\nWHAT TO CHECK\n1. Is the resource a biological resource?\n2. Where did it originate?\n3. Is associated traditional knowledge involved?\n4. What is the purpose — research or commercial?\n5. Which jurisdiction applies?\n\nDo not provide definitive compliance determinations where the facts are insufficient. Verify against the latest authoritative sources.",
    sources: [
      {
        id: "biodiversity-act",
        title: "Biological Diversity Act, 2002",
        issuingAuthority: "Legislature of India",
        status: "current",
        url: "https://nbaindia.org",
        type: "statute",
      },
      {
        id: "biodiversity-rules",
        title: "Biological Diversity Rules, 2004",
        issuingAuthority: "Ministry of Environment",
        status: "current",
        url: "https://nbaindia.org",
        type: "rule",
      },
      {
        id: "nagoya-abs",
        title: "Nagoya Protocol on Access and Benefit Sharing",
        issuingAuthority: "CBD Secretariat",
        status: "current",
        effectiveDate: "2014",
        url: "https://www.cbd.int/abs",
        type: "treaty",
      },
    ],
    confidence: "available",
    followUp: [
      "Biological resources",
      "Patent implications",
      "Traditional knowledge",
      "Regulatory pathway",
    ],
  },
  classification: {
    content:
      "Let me help you identify the likely regulatory pathway for your Ayurvedic product.\n\nThe regulatory identity of an Ayurvedic product can materially affect its IP and compliance pathway. Sahayak can help identify the likely classification based on the information provided.\n\nIMPORTANT: Confirm the applicable classification against the latest authoritative regulatory requirements.\n\nI will guide you through the minimum necessary clarifying questions to help determine the product classification.\n\nUse the product classifier below to begin, or describe your product and I will help determine the appropriate pathway.",
    sources: [],
    confidence: "limited",
    followUp: [
      "Start product classifier",
      "Classical medicine",
      "Proprietary medicine",
      "Food / Nutraceutical",
    ],
  },
};

function getResponseForQuery(query: string): typeof SAMPLE_RESPONSES.default {
  const lower = query.toLowerCase();

  if (
    lower.includes("patent") ||
    lower.includes("invention") ||
    lower.includes("novelty") ||
    lower.includes("inventive")
  ) {
    return SAMPLE_RESPONSES.patent;
  }

  if (
    lower.includes("traditional knowledge") ||
    lower.includes("tkdl") ||
    lower.includes("prior art") ||
    lower.includes("tk ")
  ) {
    return SAMPLE_RESPONSES.tk;
  }

  if (
    lower.includes("abs") ||
    lower.includes("benefit sharing") ||
    lower.includes("biological resource") ||
    lower.includes("biodiversity")
  ) {
    return SAMPLE_RESPONSES.abs;
  }

  if (
    lower.includes("classify") ||
    lower.includes("classification") ||
    lower.includes("regulatory") ||
    lower.includes("category") ||
    lower.includes("product type")
  ) {
    return SAMPLE_RESPONSES.classification;
  }

  return SAMPLE_RESPONSES.default;
}

const WELCOME_MESSAGE: ChatMessageData = {
  id: "welcome",
  role: "assistant",
  content:
    "Welcome to IP-SAKTI Sahayak — your intelligent guide through Intellectual Property, Ayurveda, Traditional Knowledge, and related regulatory frameworks.\n\nI can help you with:\n• Patent and IP considerations for Ayurvedic products\n• Product and formulation classification\n• Traditional knowledge and prior-art analysis\n• Access and Benefit Sharing (ABS) guidance\n• Regulatory pathway identification\n• Government resource navigation\n\nPlease describe your question or situation, and I will guide you through the applicable frameworks with source-cited information.\n\n⚠️ Information provided is for guidance only and should be verified against the latest authoritative sources.",
  confidence: "available",
  disclaimer:
    "This is an informational guidance tool and does not constitute legal advice. Always verify against the latest authoritative regulatory and legal sources.",
  followUp: [
    "Can I patent my Ayurvedic formulation?",
    "Help classify my product",
    "What is TKDL?",
    "ABS requirements",
  ],
  timestamp: new Date(),
};

export default function Chat() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const prefill = searchParams.get("prefill") || "";

  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("india");
  const [showClassifier, setShowClassifier] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!hasInitialized) {
      const initial: ChatMessageData[] = [WELCOME_MESSAGE];

      if (initialQuery) {
        initial.push({
          id: `user-init-${Date.now()}`,
          role: "user",
          content: initialQuery,
          timestamp: new Date(),
        });

        const response = getResponseForQuery(initialQuery);
        initial.push({
          id: `assistant-init-${Date.now()}`,
          role: "assistant",
          ...response,
          timestamp: new Date(),
        });
      }

      if (prefill === "product" || prefill === "formulation") {
        setShowClassifier(true);
      }

      setMessages(initial);
      setHasInitialized(true);
    }
  }, [initialQuery, prefill, hasInitialized]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [inputValue]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessageData = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response with delay
    setTimeout(() => {
      const response = getResponseForQuery(text);
      const assistantMsg: ChatMessageData = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        ...response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleClassifierComplete = (result: ClassificationResult) => {
    setShowClassifier(false);
    const text = `I've classified my product. Category: ${result.category}. ${result.explanation}`;
    sendMessage(text);
  };

  return (
    <Layout
      showBreadcrumbs
      breadcrumbs={[{ label: "IP-SAKTI Sahayak" }]}
      className="flex flex-col h-[calc(100vh-4rem)]"
    >
      {/* Chat toolbar */}
      <div className="border-b border-border bg-card px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-primary flex items-center justify-center">
              <Shield className="size-3.5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-none">IP-SAKTI Sahayak</h1>
              <p className="text-[10px] text-muted-foreground">
                Source-cited guidance
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowClassifier(!showClassifier)}
            className="gap-1.5 text-xs hidden sm:flex"
          >
            <FlaskConical className="size-3.5" />
            Classify Product
          </Button>
          <JurisdictionSwitch
            value={jurisdiction}
            onChange={setJurisdiction}
          />
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onFollowUp={(text) => sendMessage(text)}
            />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-message-in">
              <div className="size-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <Shield className="size-4 text-primary-foreground" />
              </div>
              <div className="bg-card border border-border rounded-xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <div className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
                  <div className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
                  <div className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          {/* Product Classifier */}
          {showClassifier && (
            <ProductClassifier
              onComplete={handleClassifierComplete}
              onCancel={() => setShowClassifier(false)}
            />
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-border bg-card px-4 sm:px-6 py-3 shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(inputValue);
                  }
                }}
                placeholder="Ask about IP, Ayurveda, traditional knowledge, ABS, regulation..."
                className="min-h-[42px] max-h-[120px] resize-none text-sm pr-4"
                rows={1}
              />
            </div>
            <Button
              size="icon"
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="shrink-0"
            >
              {isTyping ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </Button>
          </div>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-muted-foreground">
              Press Enter to send • Shift+Enter for new line
            </span>
            <span className="text-[10px] text-muted-foreground">•</span>
            <div className="jurisdiction-india text-[9px] px-1.5 py-0.5 rounded font-semibold">
              {jurisdiction === "india" ? "INDIA" : "INTL"}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
