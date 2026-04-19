import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Bot, TrendingDown, TrendingUp } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAsyncData } from "@/hooks/useAsyncData";
import { marketApi } from "@/services/api";
import { useAppStore } from "@/store/useStore";

declare global {
  interface Window {
    TradingView: any;
  }
}

export function StockDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: stock, loading } = useAsyncData(() => marketApi.stockById(id!), [id]);
  const { openChatWithPrompt } = useAppStore();
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stock && container.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.type = "text/javascript";
      script.onload = () => {
        if (window.TradingView) {
          new window.TradingView.MediumWidget({
            symbols: [[stock.symbol, stock.symbol]],
            chartOnly: false,
            width: "100%",
            height: 400,
            locale: "en",
            colorTheme: "light",
            gridLineColor: "rgba(240, 243, 250, 0)",
            fontColor: "#787b86",
            isTransparent: true,
            autosize: true,
            container_id: container.current?.id,
          });
        }
      };
      document.head.appendChild(script);
    }
  }, [stock]);

  if (loading || !stock) {
    return (
      <div className="p-8">
        <Skeleton className="h-12 w-48 mb-6" />
        <Skeleton className="h-[400px] w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-16">
        <SectionHeader
          eyebrow="Stock Intelligence"
          title={stock.name}
          description={stock.summary}
          action={
            <Button onClick={() => openChatWithPrompt(`Analyze ${stock.name} (${stock.symbol}) and tell me its risk-reward ratio.`)} className="rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-6 h-11">
              <Bot className="mr-2 h-5 w-5" />
              ASK BOT X
            </Button>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-12">
          <Card className="overflow-hidden rounded-[32px] border-white/40 bg-white/50 p-0 shadow-panel backdrop-blur-md dark:bg-slate-900/50">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <h3 className="font-bold tracking-tight">Price Action (Simulated)</h3>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Live Feed</span>
              </div>
            </div>
            <div id="tv-chart" ref={container} className="h-[400px] w-full" />
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-[32px] p-6 border-white/40 bg-white/50 shadow-sm backdrop-blur-md dark:bg-slate-900/50">
              <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">Valuation Metrics</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">P/E Ratio</span>
                  <span className="font-mono font-bold">{stock.peRatio}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-bold">{stock.marketCap}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sector</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary uppercase">{stock.sector}</span>
                </div>
              </div>
            </Card>

            <Card className="rounded-[32px] p-6 border-white/40 bg-white/50 shadow-sm backdrop-blur-md dark:bg-slate-900/50">
              <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">52W Range</h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-destructive">L: ₹{stock.low52w}</span>
                  <span className="text-secondary">H: ₹{stock.high52w}</span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-destructive via-amber-400 to-secondary"
                    style={{ 
                      left: 0, 
                      right: 0,
                    }} 
                  />
                  <div 
                    className="absolute top-0 h-full w-1 bg-white shadow-lg z-10"
                    style={{ left: '65%' }}
                  />
                </div>
                <p className="text-[10px] text-center text-muted-foreground italic">Currently trading near 65th percentile of 52W range.</p>
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[32px] p-6 bg-slate-900 text-white dark:bg-slate-800">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Proprietary Insight</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Buy Signal</p>
                  <p className="font-bold text-lg">Conviction: 82%</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our ML model identifies a clear accumulation pattern near the ₹{stock.buyLevel} support zone. Relative strength is decoupling from the sector.
              </p>
              <div className="pt-4 border-t border-slate-700">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-400 uppercase">Target</span>
                  <span className="text-emerald-400 font-mono">₹{stock.sellLevel}</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400 uppercase">Stop Loss</span>
                  <span className="text-rose-400 font-mono">₹{stock.buyLevel - 50}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-[32px] p-6 border-white/40 bg-white/50 shadow-sm backdrop-blur-md dark:bg-slate-900/50">
            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Sentiment</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden flex">
                <div className="h-full bg-emerald-500" style={{ width: '70%' }} />
                <div className="h-full bg-rose-500" style={{ width: '30%' }} />
              </div>
              <span className="text-xs font-bold text-emerald-600">70% Bullish</span>
            </div>
          </Card>
        </div>
      </div>
      </div>
    </PageTransition>
  );
}
