import { TrendingDown, TrendingUp } from "lucide-react";
import { useAsyncData } from "@/hooks/useAsyncData";
import { marketApi } from "@/services/api";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function Ticker() {
  const { data, loading } = useAsyncData(() => marketApi.ticker(), []);

  return (
    <Card className="mb-6 overflow-hidden rounded-[28px] border-primary/10 bg-gradient-to-r from-primary/5 via-white to-secondary/5 p-0 dark:from-primary/10 dark:via-slate-900 dark:to-secondary/10">
      <div className="border-b border-border/50 px-5 py-3">
        <p className="text-sm font-medium text-muted-foreground">Live Market Ticker</p>
      </div>
      {loading ? (
        <div className="grid gap-3 px-5 py-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-14" />
          ))}
        </div>
      ) : (
        <div className="flex overflow-hidden py-4">
          <div className="flex min-w-max animate-marquee gap-4 px-4">
            {[...(data ?? []), ...(data ?? [])].map((item, index) => {
              const positive = item.change >= 0;
              return (
                <div
                  key={`${item.symbol}-${index}`}
                  className="flex items-center gap-3 rounded-full border border-border/60 bg-background/80 px-4 py-2 shadow-sm"
                >
                  {positive ? (
                    <TrendingUp className="h-4 w-4 text-secondary" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">{item.name}</p>
                    <p className="font-medium">
                      {item.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <span className={positive ? "text-secondary" : "text-destructive"}>
                    {positive ? "+" : ""}
                    {item.change}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
