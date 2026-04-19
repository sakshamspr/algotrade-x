import { AlertTriangle, Bot, Rocket } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAsyncData } from "@/hooks/useAsyncData";
import { marketApi } from "@/services/api";
import { useAppStore } from "@/store/useStore";

export function HighRisk() {
  const { data } = useAsyncData(() => marketApi.trades(), []);
  const intradayTrades = (data ?? []).filter((trade) => trade.type === "Intraday");
  const fnoTrades = (data ?? []).filter((trade) => trade.type === "FnO");
  const { riskPerTrade, setRiskPerTrade, toggleChat } = useAppStore();

  return (
    <PageTransition>
      <Card className="mb-8 border-destructive/20 bg-destructive/5 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />
          <div>
            <p className="font-semibold text-destructive">
              9 out of 10 traders lose money in FnO. Trade responsibly.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Use this section as a disciplined planning console, not as a substitute for risk management.
            </p>
          </div>
        </div>
      </Card>

      <SectionHeader
        eyebrow="High Risk"
        title="Short-term trading workspace"
        description="Structure every setup with position sizing, stop-loss discipline, and a pre-defined response plan."
        action={
          <div className="w-full md:w-72">
            <label className="mb-2 block text-sm text-muted-foreground">Risk per trade</label>
            <Input
              type="number"
              value={riskPerTrade}
              onChange={(event) => setRiskPerTrade(Number(event.target.value))}
            />
          </div>
        }
      />

      <section className="mb-10">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Intraday</h3>
          <Button variant="outline" onClick={toggleChat}>
            <Bot className="mr-2 h-4 w-4" />
            Ask setup question
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {intradayTrades.map((trade) => (
            <Card key={trade.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Intraday</p>
                  <h4 className="text-2xl font-semibold">{trade.symbol}</h4>
                </div>
                <span className={trade.pnl >= 0 ? "text-lg font-semibold text-secondary" : "text-lg font-semibold text-destructive"}>
                  {trade.pnl >= 0 ? "+" : ""}Rs {trade.pnl}
                </span>
              </div>
              <div className="mt-5 grid gap-3 text-sm">
                <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
                  <span className="text-muted-foreground">Entry</span>
                  <span className="font-medium">{trade.entry}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
                  <span className="text-muted-foreground">SL</span>
                  <span className="font-medium">{trade.stopLoss}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
                  <span className="text-muted-foreground">Target</span>
                  <span className="font-medium">{trade.target}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">FnO</h3>
          <p className="text-sm text-muted-foreground">Mock deployment controls for automation-ready trade ideas</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {fnoTrades.map((trade) => (
            <Card key={trade.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">FnO Trade</p>
                  <h4 className="text-2xl font-semibold">{trade.symbol}</h4>
                </div>
                <span className={trade.pnl >= 0 ? "text-lg font-semibold text-secondary" : "text-lg font-semibold text-destructive"}>
                  {trade.pnl >= 0 ? "+" : ""}Rs {trade.pnl}
                </span>
              </div>
              <div className="mt-5 grid gap-3 text-sm md:grid-cols-3">
                <div className="rounded-2xl bg-muted/60 p-4">
                  <p className="text-muted-foreground">Entry</p>
                  <p className="mt-1 font-medium">{trade.entry}</p>
                </div>
                <div className="rounded-2xl bg-muted/60 p-4">
                  <p className="text-muted-foreground">SL</p>
                  <p className="mt-1 font-medium">{trade.stopLoss}</p>
                </div>
                <div className="rounded-2xl bg-muted/60 p-4">
                  <p className="text-muted-foreground">Target</p>
                  <p className="mt-1 font-medium">{trade.target}</p>
                </div>
              </div>
              <Button className="mt-6 w-full">
                <Rocket className="mr-2 h-4 w-4" />
                Deploy
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
