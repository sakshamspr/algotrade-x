import { AlertTriangle, Bot, Rocket, ShieldAlert, Zap, Activity } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAsyncData } from "@/hooks/useAsyncData";
import { marketApi } from "@/services/api";
import { useAppStore } from "@/store/useStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NewsFooter } from "@/components/NewsFooter";

export function HighRisk() {
  const { data } = useAsyncData(() => marketApi.trades(), []);
  const intradayTrades = (data ?? []).filter((trade) => trade.type === "Intraday");
  const fnoTrades = (data ?? []).filter((trade) => trade.type === "FnO");
  const { riskPerTrade, setRiskPerTrade, toggleChat } = useAppStore();
  const [deploying, setDeploying] = useState<string | null>(null);

  const handleDeploy = (id: string) => {
    setDeploying(id);
    setTimeout(() => setDeploying(null), 3000);
  };

  return (
    <PageTransition>
      <div className="space-y-12 mb-12">
        <motion.div
          animate={{ 
            borderColor: ["rgba(239, 68, 68, 0.2)", "rgba(239, 68, 68, 0.5)", "rgba(239, 68, 68, 0.2)"],
            backgroundColor: ["rgba(239, 68, 68, 0.05)", "rgba(239, 68, 68, 0.08)", "rgba(239, 68, 68, 0.05)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-[32px] border-2 p-8 shadow-sm"
        >
          <div className="flex items-start gap-6">
            <div className="rounded-2xl bg-destructive/10 p-4">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <p className="text-xl font-bold text-destructive">
                SEBI Statutory Warning
              </p>
              <p className="mt-2 text-base font-medium text-muted-foreground leading-relaxed">
                9 out of 10 individual traders in equity Cash and FnO segment incurred net losses. 
                On average, loss makers registered net loss of ₹50,000 per person.
              </p>
            </div>
          </div>
        </motion.div>

        <SectionHeader
          eyebrow="High Risk"
          title="Short-term trading workspace"
          description="Structure every setup with position sizing, stop-loss discipline, and a pre-defined response plan."
          action={
            <div className="w-full md:w-80">
              <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Risk per trade (INR)</label>
              <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">₹</span>
                <Input
                  type="number"
                  className="pl-8 h-12 rounded-2xl bg-white/50 dark:bg-slate-900/50"
                  value={riskPerTrade}
                  onChange={(event) => setRiskPerTrade(Number(event.target.value))}
                />
              </div>
            </div>
          }
        />
      </div>

      <div className="space-y-24">
        <section>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Intraday (Stocks)</h3>
              <p className="text-sm text-muted-foreground mt-1">Algorithmic trade setups with 5X leverage</p>
            </div>
            <Button variant="outline" onClick={toggleChat} className="h-11 rounded-2xl px-6 border-white/50 bg-white/50 backdrop-blur">
              <Bot className="mr-2 h-5 w-5" />
              Ask AI about Setup
            </Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {intradayTrades.map((trade) => (
              <Card key={trade.id} className="relative overflow-hidden group rounded-[40px] border-white/40 bg-white/50 p-8 shadow-sm backdrop-blur-md dark:bg-slate-900/50">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-secondary/5 blur-2xl group-hover:bg-secondary/10 transition-colors" />
                
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-[10px] font-bold text-secondary uppercase border border-secondary/10">5X Margin</span>
                      <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold text-muted-foreground uppercase">Intraday</span>
                    </div>
                    <h4 className="text-3xl font-bold tracking-tight">{trade.symbol}</h4>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${trade.pnl >= 0 ? "text-secondary" : "text-destructive"}`}>
                      {trade.pnl >= 0 ? "+" : ""}₹{trade.pnl}
                    </p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Live P&L</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center mb-8">
                  <div className="rounded-2xl bg-white/80 p-4 border border-border/50 dark:bg-slate-800/80">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Entry</p>
                    <p className="font-bold text-base">₹{trade.entry}</p>
                  </div>
                  <div className="rounded-2xl bg-rose-500/5 p-4 border border-rose-500/10 dark:bg-rose-500/10">
                    <p className="text-[10px] font-bold text-rose-600 uppercase mb-1">Stop Loss</p>
                    <p className="font-bold text-base text-rose-600">₹{trade.stopLoss}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-500/5 p-4 border border-emerald-500/10 dark:bg-emerald-500/10">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Target</p>
                    <p className="font-bold text-base text-emerald-600">₹{trade.target}</p>
                  </div>
                </div>

                <Button className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-bold">
                  Execute Order
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">FnO (Nifty 50)</h3>
              <p className="text-sm text-muted-foreground mt-1">Automated deployment for delta-neutral setups</p>
            </div>
            <Zap className="h-6 w-6 text-amber-500 fill-amber-500" />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {fnoTrades.map((trade) => (
              <Card key={trade.id} className="relative overflow-hidden group rounded-[40px] border-white/40 bg-white/50 p-8 shadow-sm backdrop-blur-md dark:bg-slate-900/50">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary uppercase border border-primary/10">Premium setup</span>
                      <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold text-muted-foreground uppercase">Derivatives</span>
                    </div>
                    <h4 className="text-3xl font-bold tracking-tight">{trade.symbol}</h4>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${trade.pnl >= 0 ? "text-secondary" : "text-destructive"}`}>
                      {trade.pnl >= 0 ? "+" : ""}₹{trade.pnl}
                    </p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Live P&L</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-center mb-8">
                  <div className="rounded-2xl bg-white/80 p-5 border border-border/50 dark:bg-slate-800/80">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Entry</p>
                    <p className="font-bold text-lg">₹{trade.entry}</p>
                  </div>
                  <div className="rounded-2xl bg-rose-500/5 p-5 border border-rose-500/10">
                    <p className="text-[10px] font-bold text-rose-600 uppercase mb-1">Stop Loss</p>
                    <p className="font-bold text-lg text-rose-600">₹{trade.stopLoss}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-500/5 p-5 border border-emerald-500/10">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Target</p>
                    <p className="font-bold text-lg text-emerald-600">₹{trade.target}</p>
                  </div>
                </div>

                <Button 
                  onClick={() => handleDeploy(trade.id)}
                  disabled={deploying === trade.id}
                  className={`w-full h-14 rounded-2xl transition-all duration-500 font-bold text-lg ${
                    deploying === trade.id ? "bg-secondary text-white" : "bg-primary hover:bg-primary/90"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {deploying === trade.id ? (
                      <motion.div
                        key="active"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center"
                      >
                        <Activity className="mr-3 h-5 w-5 animate-spin" />
                        System Active...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center"
                      >
                        <Rocket className="mr-3 h-5 w-5" />
                        Deploy Algorithm
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <NewsFooter category="Markets" />
      </div>
    </PageTransition>
  );
}
