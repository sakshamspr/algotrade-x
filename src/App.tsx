import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AppShell } from "@/components/AppShell";

const Landing = lazy(() => import("@/pages/Landing").then((module) => ({ default: module.Landing })));
const Choice = lazy(() => import("@/pages/Choice").then((module) => ({ default: module.Choice })));
const LowRisk = lazy(() => import("@/pages/LowRisk").then((module) => ({ default: module.LowRisk })));
const ModerateRisk = lazy(() =>
  import("@/pages/ModerateRisk").then((module) => ({ default: module.ModerateRisk })),
);
const HighRisk = lazy(() => import("@/pages/HighRisk").then((module) => ({ default: module.HighRisk })));
const StockDetail = lazy(() =>
  import("@/pages/StockDetail").then((module) => ({ default: module.StockDetail })),
);
const FundDetail = lazy(() =>
  import("@/pages/FundDetail").then((module) => ({ default: module.FundDetail })),
);
const IpoDetail = lazy(() => import("@/pages/IpoDetail").then((module) => ({ default: module.IpoDetail })));
const Chat = lazy(() => import("@/pages/Chat").then((module) => ({ default: module.Chat })));
const Team = lazy(() => import("@/pages/Team").then((module) => ({ default: module.Team })));

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route element={<AppShell />}>
            <Route path="/choice" element={<Choice />} />
            <Route path="/low-risk" element={<LowRisk />} />
            <Route path="/moderate-risk" element={<ModerateRisk />} />
            <Route path="/high-risk" element={<HighRisk />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/team" element={<Team />} />
            <Route path="/stocks/:id" element={<StockDetail />} />
            <Route path="/funds/:id" element={<FundDetail />} />
            <Route path="/ipos/:id" element={<IpoDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
