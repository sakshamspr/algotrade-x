import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TickerItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

const initialItems: TickerItem[] = [
  { symbol: "NIFTY50", name: "Nifty 50", price: 22147.45, change: 0.84 },
  { symbol: "SENSEX", name: "Sensex", price: 73088.33, change: 0.76 },
  { symbol: "BANKNIFTY", name: "Bank Nifty", price: 46594.1, change: -0.12 },
  { symbol: "RELIANCE", name: "Reliance", price: 2984.5, change: 1.25 },
  { symbol: "TCS", name: "TCS", price: 4120.3, change: -0.45 },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1450.75, change: 0.22 },
  { symbol: "INFY", name: "Infosys", price: 1680.4, change: 0.55 },
  { symbol: "ZOMATO", name: "Zomato", price: 158.3, change: 3.42 },
];

export function Ticker() {
  const [items, setItems] = useState<TickerItem[]>(initialItems);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) => {
          const changePercent = (Math.random() - 0.5) * 0.05; // -0.025% to +0.025%
          const newPrice = item.price * (1 + changePercent);
          const newChange = item.change + (Math.random() - 0.5) * 0.1;
          return {
            ...item,
            price: newPrice,
            change: Number(newChange.toFixed(2)),
          };
        }),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="mb-6 overflow-hidden rounded-[28px] border-primary/10 bg-gradient-to-r from-primary/5 via-white to-secondary/5 p-0 dark:from-primary/10 dark:via-slate-900 dark:to-secondary/10">
      <div className="flex items-center justify-between border-b border-border/50 px-5 py-3">
        <p className="text-sm font-medium text-muted-foreground">Live Market Ticker</p>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Simulated Live</span>
        </div>
      </div>
      <div className="flex overflow-hidden py-4">
        <div className="flex min-w-max animate-marquee gap-4 px-4">
          {[...items, ...items, ...items].map((item, index) => {
            const positive = item.change >= 0;
            return (
              <div
                key={`${item.symbol}-${index}`}
                className="group flex items-center gap-3 rounded-full border border-border/60 bg-background/80 px-4 py-2 shadow-sm transition-all hover:border-primary/30"
              >
                {positive ? (
                  <TrendingUp className={`h-4 w-4 transition-colors ${positive ? "text-secondary" : "text-destructive"}`} />
                ) : (
                  <TrendingDown className={`h-4 w-4 transition-colors ${positive ? "text-secondary" : "text-destructive"}`} />
                )}
                <div className="min-w-[80px]">
                  <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">{item.name}</p>
                  <p className="font-mono text-sm font-bold tabular-nums transition-all">
                    {item.price.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <span className={`text-xs font-bold tabular-nums ${positive ? "text-secondary" : "text-destructive"}`}>
                  {positive ? "+" : ""}
                  {item.change}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
