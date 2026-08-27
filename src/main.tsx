import '@vly-ai/integrations';
import { Toaster } from "@/components/ui/sonner";
import { RequireAuth } from "@/components/RequireAuth";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import React, { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "./index.css";

// Lazy load route components for better code splitting
const Landing = lazy(() => import("./pages/Landing.tsx"));
const AuthPage = lazy(() => import("./pages/Auth.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const ChatPage = lazy(() => import("./pages/Chat.tsx"));
const FAQPage = lazy(() => import("./pages/FAQ.tsx"));
const DocumentsPage = lazy(() => import("./pages/Documents.tsx"));
const NotificationsPage = lazy(() => import("./pages/Notifications.tsx"));
const IPLegalPage = lazy(() => import("./pages/IPLegal.tsx"));
const TKPage = lazy(() => import("./pages/TraditionalKnowledge.tsx"));
const ABSPage = lazy(() => import("./pages/ABS.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const PlaceholderPage = lazy(() => import("./pages/PlaceholderPage.tsx"));

// Helper to create placeholder pages with proper props
function makePlaceholder(title: string, description: string, related: { label: string; href: string }[] = []) {
  return function Placeholder() {
    return <PlaceholderPage title={title} description={description} relatedLinks={related} />;
  };
}

const PatentsPage = makePlaceholder("Patents", "Information about patent protection for Ayurvedic formulations, inventions, and traditional knowledge-related innovations.", [
  { label: "IP & Legal Domains", href: "/ip-legal" },
  { label: "Traditional Knowledge & Patents", href: "/traditional-knowledge" },
  { label: "Ask Sahayak", href: "/chat" },
]);
const TrademarksPage = makePlaceholder("Trade Marks", "Information about trade mark protection for Ayurvedic product brands, logos, and marks.", [
  { label: "IP & Legal Domains", href: "/ip-legal" },
  { label: "Ask Sahayak", href: "/chat" },
]);
const GIPage = makePlaceholder("Geographical Indications", "Information about GI protection for regional Ayurvedic products and community-associated goods.", [
  { label: "IP & Legal Domains", href: "/ip-legal" },
  { label: "Ask Sahayak", href: "/chat" },
]);
const CopyrightPage = makePlaceholder("Copyright", "Information about copyright protection for original expression, documentation, and creative works.", [
  { label: "IP & Legal Domains", href: "/ip-legal" },
  { label: "Ask Sahayak", href: "/chat" },
]);
const DesignsPage = makePlaceholder("Designs", "Information about design protection for product appearance, packaging, and ornamental features.", [
  { label: "IP & Legal Domains", href: "/ip-legal" },
  { label: "Ask Sahayak", href: "/chat" },
]);
const PlantVarietyPage = makePlaceholder("Plant Variety Protection", "Information about plant variety protection for medicinal plants, cultivars, and breeders' rights.", [
  { label: "IP & Legal Domains", href: "/ip-legal" },
  { label: "Ask Sahayak", href: "/chat" },
]);
const TKDLPage = makePlaceholder("TKDL Resources", "Information about the Traditional Knowledge Digital Library and its role in preventing erroneous patents.", [
  { label: "Traditional Knowledge", href: "/traditional-knowledge" },
  { label: "Ask Sahayak", href: "/chat" },
]);
const PriorArtPage = makePlaceholder("Prior Art", "Information about prior art analysis in the context of traditional knowledge and Ayurvedic innovations.", [
  { label: "Traditional Knowledge", href: "/traditional-knowledge" },
  { label: "Ask Sahayak", href: "/chat" },
]);
const CommunityKnowledgePage = makePlaceholder("Community Knowledge", "Information about community-held traditional knowledge and related protections.", [
  { label: "Traditional Knowledge", href: "/traditional-knowledge" },
  { label: "Ask Sahayak", href: "/chat" },
]);
const AYUSHRegulationPage = makePlaceholder("AYUSH Regulation", "Information about regulatory requirements for Ayurvedic medicines, including classical and proprietary classifications.", [
  { label: "ABS", href: "/abs" },
  { label: "Documents", href: "/documents" },
  { label: "Ask Sahayak", href: "/chat" },
]);
const FoodRegulationPage = makePlaceholder("Food & Nutraceutical Regulation", "Information about FSSAI requirements and food regulatory pathway for Ayurveda-Aahar products.", [
  { label: "ABS", href: "/abs" },
  { label: "Documents", href: "/documents" },
  { label: "Ask Sahayak", href: "/chat" },
]);
const CosmeticsPage = makePlaceholder("Cosmetics Regulation", "Information about cosmetics classification and regulatory requirements for Ayurvedic cosmetic products.", [
  { label: "ABS", href: "/abs" },
  { label: "Documents", href: "/documents" },
  { label: "Ask Sahayak", href: "/chat" },
]);
const AdvertisingPage = makePlaceholder("Advertising Restrictions", "Information about advertising restrictions and compliance requirements for Ayurvedic products.", [
  { label: "ABS", href: "/abs" },
  { label: "Documents", href: "/documents" },
  { label: "Ask Sahayak", href: "/chat" },
]);
const InternationalIPPage = makePlaceholder("International IP", "Information about international IP systems including PCT, Madrid, Hague, and related frameworks.", [
  { label: "IP & Legal Domains", href: "/ip-legal" },
  { label: "Documents", href: "/documents" },
  { label: "Ask Sahayak", href: "/chat" },
]);

// Simple loading fallback for route transitions
function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

/** Silent error boundary — if VlyToolbar crashes it renders nothing instead of
 *  crashing the whole app (e.g. hook errors in WebContainer environment). */
class ToolbarErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error) {
    console.warn("[VlyToolbar] Caught error, toolbar disabled:", err.message);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

/** Hard guard so runtime errors never leave the preview as a blank page. */
class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string; stack: string }
> {
  state = { hasError: false, message: "", stack: "" };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      message: error.message || "Unknown runtime error",
      stack: error.stack || "",
    };
  }
  componentDidCatch(err: Error) {
    console.error("[WebContainer preview] Root crash:", err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <div className="max-w-lg text-center">
            <p className="text-sm font-semibold">Preview runtime error</p>
            <p className="mt-2 text-xs text-muted-foreground break-words">
              {this.state.message}
            </p>
            {this.state.stack && (
              <pre className="mt-3 text-left text-[10px] leading-4 text-muted-foreground/80 max-h-40 overflow-auto rounded border border-border/60 p-2">
                {this.state.stack}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);



function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <ToolbarErrorBoundary>
        <VlyToolbar />
      </ToolbarErrorBoundary>
      <ConvexAuthProvider client={convex}>
        <BrowserRouter>
          <RouteSyncer />
          <Suspense fallback={<RouteLoading />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/auth"
                element={<AuthPage redirectAfterAuth="/chat" />}
              />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/ip-legal" element={<IPLegalPage />} />
              <Route path="/traditional-knowledge" element={<TKPage />} />
              <Route path="/abs" element={<ABSPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route path="/patents" element={<PatentsPage />} />
              <Route path="/trademarks" element={<TrademarksPage />} />
              <Route path="/geographical-indications" element={<GIPage />} />
              <Route path="/copyright" element={<CopyrightPage />} />
              <Route path="/designs" element={<DesignsPage />} />
              <Route path="/plant-variety-protection" element={<PlantVarietyPage />} />
              <Route path="/tkdl" element={<TKDLPage />} />
              <Route path="/prior-art" element={<PriorArtPage />} />
              <Route path="/community-knowledge" element={<CommunityKnowledgePage />} />
              <Route path="/ayush-regulation" element={<AYUSHRegulationPage />} />
              <Route path="/food-regulation" element={<FoodRegulationPage />} />
              <Route path="/cosmetics" element={<CosmeticsPage />} />
              <Route path="/advertising" element={<AdvertisingPage />} />
              <Route path="/international-ip" element={<InternationalIPPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster />
      </ConvexAuthProvider>
    </RootErrorBoundary>
  </StrictMode>,
);
