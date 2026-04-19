import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Ticker } from "@/components/Ticker";
import { Chatbot } from "@/components/Chatbot";
import { PortfolioTabs } from "@/components/PortfolioTabs";
import { Footer } from "@/components/Footer";
import { MarketNews } from "@/components/MarketNews";

export function AppShell() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Navbar />
        <Ticker />
        <MarketNews />
        <PortfolioTabs />
        <Outlet />
        <Footer />
      </div>
      <Chatbot />
    </div>
  );
}
