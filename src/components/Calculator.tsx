import { LineChart } from "lucide-react";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export function BuybackCalculator() {
  const [investment, setInvestment] = useState(50000);
  const [sellPrice, setSellPrice] = useState([10]); // Gain % for remaining shares

  const scenarios = [
    { label: "High Acceptance", ratio: 80 },
    { label: "Likely", ratio: 50 },
    { label: "Conservative", ratio: 25 },
    { label: "Extreme", ratio: 10 },
  ];

  const calculateScenario = (ratio: number) => {
    const acceptedValue = investment * (ratio / 100);
    const acceptedProfit = acceptedValue * 0.15; // Assume 15% buyback premium for simplicity
    const remainingValue = investment - acceptedValue;
    const remainingProfit = remainingValue * (sellPrice[0] / 100);
    return Math.round(acceptedProfit + remainingProfit);
  };

  return (
    <Card className="rounded-[32px] border-white/40 bg-white/50 p-6 shadow-panel backdrop-blur-md dark:bg-slate-900/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
          <LineChart className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold">Buyback Arbitrage Calc</h3>
      </div>
      
      <div className="grid gap-6">
        <div>
          <label className="mb-2 block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Investment Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">₹</span>
            <Input
              type="number"
              className="pl-8 rounded-2xl bg-white/50 dark:bg-slate-800/50"
              value={investment}
              onChange={(event) => setInvestment(Number(event.target.value))}
            />
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between text-sm">
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Remaining Shares Exit Gain</label>
            <span className="font-bold text-secondary">{sellPrice[0]}%</span>
          </div>
          <Slider value={sellPrice} onValueChange={setSellPrice} max={30} step={1} />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          {scenarios.map((scenario) => (
            <div key={scenario.label} className="rounded-2xl bg-white/80 p-4 border border-border/50 dark:bg-slate-800/80">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">{scenario.ratio}% Acceptance</p>
              <p className="mt-1 text-lg font-bold text-secondary">₹{calculateScenario(scenario.ratio).toLocaleString("en-IN")}</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">{scenario.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function FutureValueCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(5);

  const futureValue = useMemo(() => {
    return Math.round(principal * (1 + rate / 100) ** years);
  }, [principal, rate, years]);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold">Future Value Calculator</h3>
      <p className="mt-2 text-sm text-muted-foreground">FV = P x (1 + r)^t</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm text-muted-foreground">Principal</label>
          <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted-foreground">Annual Return %</label>
          <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted-foreground">Years</label>
          <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
        </div>
      </div>
      <div className="mt-6 rounded-3xl bg-primary/10 p-5">
        <p className="text-sm text-muted-foreground">Projected Value</p>
        <p className="mt-1 text-3xl font-bold text-primary">
          Rs {futureValue.toLocaleString("en-IN")}
        </p>
      </div>
    </Card>
  );
}
