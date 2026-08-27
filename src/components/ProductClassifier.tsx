import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRight, ArrowLeft, FlaskConical, Info } from "lucide-react";

interface ProductClassifierProps {
  onComplete: (result: ClassificationResult) => void;
  onCancel: () => void;
}

export interface ClassificationResult {
  purpose: string;
  classicalBased: string;
  novelFormulation: string;
  category: string;
  explanation: string;
}

const STEPS = [
  {
    key: "purpose",
    question: "What is the primary purpose of the product?",
    options: [
      { value: "therapeutic", label: "Therapeutic / medicinal" },
      { value: "food", label: "Food / nutritional" },
      { value: "cosmetic", label: "Cosmetic" },
      { value: "unsure", label: "Unsure" },
    ],
  },
  {
    key: "classicalBased",
    question: "Is the formulation based on a classical Ayurvedic text?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "unsure", label: "Unsure" },
    ],
  },
  {
    key: "novelFormulation",
    question:
      "Does the product contain a new formulation or substantially new therapeutic approach?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "unsure", label: "Unsure" },
    ],
  },
];

function classify(answers: Record<string, string>): {
  category: string;
  explanation: string;
} {
  const { purpose, classicalBased, novelFormulation } = answers;

  if (purpose === "food") {
    return {
      category: "Ayurveda-Aahar / Nutraceutical",
      explanation:
        "Based on your responses, this product likely falls under the food / nutraceutical regulatory framework. FSSAI requirements may apply. Consult the latest FSSAI guidance for Ayurveda-Aahar products.",
    };
  }

  if (purpose === "cosmetic") {
    return {
      category: "Cosmetic",
      explanation:
        "Based on your responses, this product likely falls under the cosmetics regulatory framework rather than therapeutic-drug regulation. Consult the latest cosmetics regulatory requirements.",
    };
  }

  if (classicalBased === "yes" && novelFormulation === "no") {
    return {
      category: "Classical / Generic Medicine",
      explanation:
        "This formulation may be derived from an authoritative traditional source. Classical medicines have established pharmacopoeial standards. Traditional knowledge may create limitations on patentability — review TKDL and prior-art resources.",
    };
  }

  if (classicalBased === "no" && novelFormulation === "yes") {
    return {
      category: "New / Non-Classical Drug",
      explanation:
        "This product involves a novel formulation or therapeutic approach. It may require additional evidence concerning safety, efficacy, and regulatory approval. Patent considerations, prior art, and ABS should be evaluated.",
    };
  }

  if (purpose === "therapeutic" || purpose === "unsure") {
    if (novelFormulation === "yes") {
      return {
        category: "Patent / Proprietary Medicine",
        explanation:
          "This product appears to involve a proprietary formulation. Patentability, regulatory classification, and ABS considerations should all be evaluated. The exact classification should be confirmed against current regulatory requirements.",
      };
    }
    return {
      category: "Proprietary Medicine",
      explanation:
        "This product appears to be a proprietary Ayurvedic formulation. Regulatory classification, IP protection options, and ABS requirements should be evaluated. Confirm the classification against the latest regulatory requirements.",
    };
  }

  return {
    category: "Classification Pending",
    explanation:
      "Based on the information provided, a definitive classification cannot be determined. Sahayak can help identify the likely classification — confirm against the latest authoritative regulatory requirements.",
  };
}

export function ProductClassifier({
  onComplete,
  onCancel,
}: ProductClassifierProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentStep = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [currentStep.key]: value };
    setAnswers(newAnswers);

    if (isLastStep) {
      const result = classify(newAnswers);
      onComplete({
        purpose: newAnswers.purpose || "",
        classicalBased: newAnswers.classicalBased || "",
        novelFormulation: newAnswers.novelFormulation || "",
        ...result,
      });
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  return (
    <Card className="border-primary/20 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <FlaskConical className="size-4" />
            </div>
            <div>
              <CardTitle className="text-sm">
                Classify Your Ayurvedic Product
              </CardTitle>
              <p className="text-[10px] text-muted-foreground">
                Step {stepIndex + 1} of {STEPS.length}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-xs text-muted-foreground"
          >
            Cancel
          </Button>
        </div>
        {/* Progress bar */}
        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${((stepIndex + 1) / STEPS.length) * 100}%`,
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm font-medium mb-4">{currentStep.question}</p>
        <div className="space-y-2">
          {currentStep.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all",
                answers[currentStep.key] === option.value
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/30 hover:bg-muted/50 text-foreground"
              )}
            >
              <div className="flex items-center justify-between">
                {option.label}
                <ChevronRight className="size-3.5 opacity-40" />
              </div>
            </button>
          ))}
        </div>
        {stepIndex > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="mt-3 gap-1 text-xs text-muted-foreground"
          >
            <ArrowLeft className="size-3" />
            Back
          </Button>
        )}
        <div className="mt-4 flex items-start gap-2 p-2.5 rounded-lg bg-muted/50">
          <Info className="size-3.5 text-primary mt-0.5 shrink-0" />
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            This is an informational guidance tool. Classification should be
            confirmed against the latest authoritative regulatory requirements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
