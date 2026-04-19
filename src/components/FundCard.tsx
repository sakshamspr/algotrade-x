import { Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InteractiveCard } from "@/components/Card";
import type { Fund } from "@/types";

export function FundCard({ fund }: { fund: Fund }) {
  const riskStars = fund.risk === "Low" ? 1 : fund.risk === "Moderate" ? 3 : 5;

  return (
    <InteractiveCard className="relative group">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary uppercase border border-primary/10">
              {fund.type}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-bold text-muted-foreground uppercase">
              {fund.category}
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight">{fund.name}</h3>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < riskStars ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
            ))}
          </div>
          <p className="mt-1 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Risk Rating</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl bg-secondary/5 p-4 border border-secondary/10">
          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">CAGR History</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-bold text-secondary">{fund.oneYearReturn}%</p>
              <p className="text-[9px] text-muted-foreground">1-Year CAGR</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">{fund.cagr.threeYear}%</p>
              <p className="text-[9px] text-muted-foreground">3-Year</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">{fund.cagr.fiveYear}%</p>
              <p className="text-[9px] text-muted-foreground">5-Year</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button className="flex-1 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
          Buy Now
        </Button>
        <Button asChild variant="outline" className="flex-1 rounded-2xl border-white/50 bg-white/20 backdrop-blur hover:bg-white/40 dark:border-white/10 dark:bg-white/5">
          <Link to={`/funds/${fund.id}`}>Know More</Link>
        </Button>
      </div>
    </InteractiveCard>
  );
}
