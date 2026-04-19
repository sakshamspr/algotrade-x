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
        action={<Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search stocks" className="w-full md:w-72" />}
      />

      <section className="mb-10">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">ETFs & Mutual Funds</h3>
          <p className="text-sm text-muted-foreground">Diversified products with return and risk context</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {fundsLoading
            ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-72" />)
            : fundData?.map((fund) => <FundCard key={fund.id} fund={fund} />)}
        </div>
      </section>

      <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Stocks</h3>
            <p className="text-sm text-muted-foreground">Actionable levels and valuation snapshot</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {stocksLoading
              ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-80" />)
              : filteredStocks.map((stock) => <StockCard key={stock.id} stock={stock} />)}
          </div>
        </div>
        <FutureValueCalculator />
      </section>

      <section>
        <div className="mb-5">
          <h3 className="text-2xl font-semibold">Sector Insights</h3>
          <p className="mt-2 text-sm text-muted-foreground">A quick pulse check on leadership and laggards</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {sectorData?.map((sector) => (
            <Card key={sector.name} className="p-6">
              <p className="text-sm text-muted-foreground">
                {sector.performance >= 0 ? "Top gaining sector" : "Worst performing sector"}
              </p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <h4 className="text-2xl font-semibold">{sector.name}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{sector.sentiment}</p>
                </div>
                <span className={sector.performance >= 0 ? "text-3xl font-bold text-secondary" : "text-3xl font-bold text-destructive"}>
                  {sector.performance >= 0 ? "+" : ""}
                  {sector.performance}%
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
