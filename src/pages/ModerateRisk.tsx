import { useMemo, useState } from "react";
import { FundCard } from "@/components/FundCard";
import { FutureValueCalculator } from "@/components/Calculator";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { StockCard } from "@/components/StockCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAsyncData } from "@/hooks/useAsyncData";
import { marketApi } from "@/services/api";
import { Activity, Search } from "lucide-react";
import { NewsFooter } from "@/components/NewsFooter";

export function ModerateRisk() {
  const [query, setQuery] = useState("");
  const { data: fundData, loading: fundsLoading } = useAsyncData(() => marketApi.funds(), []);
  const { data: stockData, loading: stocksLoading } = useAsyncData(() => marketApi.stocks(), []);
  const { data: sectorData } = useAsyncData(() => marketApi.sectors(), []);

  const filteredStocks = useMemo(() => {
    const items = stockData ?? [];
    return items.filter(
      (stock) =>
        stock.name.toLowerCase().includes(query.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, stockData]);

  return (
    <PageTransition>
      <SectionHeader
        eyebrow="Moderate Risk"
        title="Build long-term conviction with cleaner research"
        description="Compare ETFs, mutual funds, and stock ideas with a balanced investing mindset."
        action={
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Search stocks by name or symbol..." 
              className="pl-12 h-12 rounded-2xl bg-white/50 dark:bg-slate-900/50" 
            />
          </div>
        }
      />

      <div className="space-y-24">
        <section>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">ETFs & Mutual Funds</h3>
              <p className="text-sm text-muted-foreground mt-1">Diversified products with return and risk context</p>
            </div>
            <span className="rounded-full bg-primary/10 px-4 py-1.5 text-[10px] font-bold text-primary uppercase border border-primary/10">3 Suggestions</span>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide px-1">
            {fundsLoading
              ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-72 min-w-[340px] rounded-[32px]" />)
              : fundData?.map((fund) => (
                  <div key={fund.id} className="min-w-[340px] max-w-sm flex-none">
                    <FundCard fund={fund} />
                  </div>
                ))}
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Conviction Stocks</h3>
                <p className="text-sm text-muted-foreground mt-1">Actionable levels and valuation snapshot</p>
              </div>
              <Activity className="h-6 w-6 text-muted-foreground opacity-50" />
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {stocksLoading
                ? Array.from({ length: 2 }).map((_, index) => <Skeleton key={index} className="h-80 rounded-[32px]" />)
                : filteredStocks.map((stock) => <StockCard key={stock.id} stock={stock} />)}
            </div>
          </div>
          
          <div className="space-y-12">
            <FutureValueCalculator />
            
            <Card className="rounded-[40px] border-white/40 bg-white/50 p-8 shadow-panel backdrop-blur-md dark:bg-slate-900/50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold tracking-tight">Sector Heatmap</h3>
                <span className="rounded-full bg-secondary/10 px-3 py-1 text-[10px] font-bold text-secondary uppercase border border-secondary/10">ML Integrated</span>
              </div>
              <div className="space-y-6">
                {sectorData?.map((sector) => (
                  <div key={sector.name} className="relative group p-6 rounded-3xl bg-white/80 border border-border/50 transition-all hover:bg-white dark:bg-slate-800/80">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold">{sector.name}</h4>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{sector.sentiment}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${sector.performance >= 0 ? "text-secondary" : "text-destructive"}`}>
                          {sector.performance >= 0 ? "+" : ""}{sector.performance}%
                        </p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{sector.performance >= 0 ? "Leading" : "Lagging"}</p>
                      </div>
                    </div>
                    <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${sector.performance >= 0 ? "bg-secondary" : "bg-destructive"}`}
                        style={{ width: `${Math.abs(sector.performance) * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <NewsFooter category="Stocks" />
      </div>
    </PageTransition>
  );
}
