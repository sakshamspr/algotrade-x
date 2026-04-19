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
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col gap-8">
        <Navbar />
        <div className="flex flex-col gap-4">
          <Ticker />
          <MarketNews />
        </div>
        <PortfolioTabs />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Chatbot />
    </div>
  );
}
