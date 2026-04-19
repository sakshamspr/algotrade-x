import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export function BuybackCalculator() {
  const [investment, setInvestment] = useState(50000);
  const [acceptance, setAcceptance] = useState([55]);
  const [sellPrice, setSellPrice] = useState([12]);

  const profit = useMemo(() => {
    return Math.round(investment * (acceptance[0] / 100) * (sellPrice[0] / 100));
  }, [acceptance, investment, sellPrice]);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold">Buyback Profit Calculator</h3>
      <div className="mt-5 grid gap-5">
        <div>
          <label className="mb-2 block text-sm text-muted-foreground">Investment Amount</label>
          <Input
            type="number"
            value={investment}
            onChange={(event) => setInvestment(Number(event.target.value))}
          />
        </div>
        <div>
          <div className="mb-3 flex items-center justify-between text-sm">
            <label className="text-muted-foreground">Acceptance Ratio</label>
            <span className="font-medium">{acceptance[0]}%</span>
          </div>
          <Slider value={acceptance} onValueChange={setAcceptance} max={100} step={1} />
        </div>
        <div>
          <div className="mb-3 flex items-center justify-between text-sm">
            <label className="text-muted-foreground">Selling Price Gain</label>
            <span className="font-medium">{sellPrice[0]}%</span>
          </div>
          <Slider value={sellPrice} onValueChange={setSellPrice} max={25} step={1} />
        </div>
      </div>
      <div className="mt-6 rounded-3xl bg-secondary/10 p-5">
        <p className="text-sm text-muted-foreground">Expected Profit</p>
        <p className="mt-1 text-3xl font-bold text-secondary">
          Rs {profit.toLocaleString("en-IN")}
        </p>
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
