import { Bot } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StockChart } from "@/components/StockChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { useAsyncData } from "@/hooks/useAsyncData";
import { marketApi } from "@/services/api";
import { useAppStore } from "@/store/useStore";

const timeframes = ["1D", "1W", "1M", "1Y"] as const;

export function StockDetail() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<(typeof timeframes)[number]>("1M");
  const { data } = useAsyncData(() => marketApi.stockById(id), [id]);
  const { data: history } = useAsyncData(
    () => (data ? marketApi.stockHistory(data.symbol, timeframe) : Promise.resolve([])),
    [data?.symbol, timeframe],
  );
  const { openChatWithPrompt } = useAppStore();

  if (!data) {
    return <div className="rounded-3xl bg-muted p-8">Stock details not found.</div>;
  }

  return (
    <PageTransition>
      <SectionHeader
        eyebrow={data.symbol}
        title={data.name}
        description={data.summary}
        action={
          <Button
            onClick={() => {
              openChatWithPrompt(
                `Analyze ${data.name} stock. Give pros, cons, and risk level in a balanced format.`,
              );
              navigate("/chat");
            }}
          >
            <Bot className="mr-2 h-4 w-4" />
            ASK BOT X
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Price Action</p>
              <h3 className="text-2xl font-semibold">Interactive Chart</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {timeframes.map((item) => (
                <button
                  key={item}
                  onClick={() => setTimeframe(item)}
                  className={
                    timeframe === item
                      ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-white"
                      : "rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-5 rounded-3xl bg-muted/60 p-4 text-sm text-muted-foreground">
            History endpoint placeholder:
            <span className="ml-2 rounded-full bg-background px-3 py-1 font-medium text-foreground">
              GET /api/stocks/{data.symbol}/history
            </span>
            <p className="mt-3">
              Plug in Alpha Vantage, Twelve Data, or Polygon for production-grade historical candles.
            </p>
          </div>
          <div className="h-[320px]">
            <StockChart data={history ?? []} />
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">52W High / Low</p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High</p>
                <p className="text-2xl font-bold text-secondary">Rs {data.high52w}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Low</p>
                <p className="text-2xl font-bold text-destructive">Rs {data.low52w}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Financial Snapshot</p>
            <div className="mt-4 grid gap-4">
              <div className="rounded-2xl bg-muted/60 p-4">
                <p className="text-sm text-muted-foreground">Sector</p>
                <p className="mt-1 font-semibold">{data.sector}</p>
              </div>
              <div className="rounded-2xl bg-muted/60 p-4">
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p className="mt-1 font-semibold">{data.marketCap}</p>
              </div>
              <div className="rounded-2xl bg-muted/60 p-4">
                <p className="text-sm text-muted-foreground">PE Ratio</p>
                <p className="mt-1 font-semibold">{data.peRatio}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
