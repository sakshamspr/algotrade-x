import { ArrowUpRight, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InteractiveCard } from "@/components/Card";
import type { Stock } from "@/types";

export function StockCard({ stock }: { stock: Stock }) {
  return (
    <InteractiveCard className="relative overflow-hidden group">
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors" />
      
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stock.symbol}</p>
          <h3 className="text-xl font-bold tracking-tight">{stock.name}</h3>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/10">
            PE {stock.peRatio}
          </span>
          <p className="text-[9px] text-muted-foreground font-medium">{stock.peRatio > 25 ? "Premium Value" : "Value Buy"}</p>
        </div>
      </div>

      <div className="grid gap-3 text-sm grid-cols-2">
        <div className="rounded-2xl bg-emerald-500/5 p-4 border border-emerald-500/10 transition-colors group-hover:bg-emerald-500/10">
          <p className="text-[10px] font-bold uppercase tracking-tight text-emerald-600">Buy Zone</p>
          <p className="mt-1 text-lg font-bold">₹{stock.buyLevel}</p>
        </div>
        <div className="rounded-2xl bg-rose-500/5 p-4 border border-rose-500/10 transition-colors group-hover:bg-rose-500/10">
          <p className="text-[10px] font-bold uppercase tracking-tight text-rose-600">Sell Target</p>
          <p className="mt-1 text-lg font-bold">₹{stock.sellLevel}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button className="flex-1 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
          Buy Now
        </Button>
        <Button asChild variant="outline" size="icon" className="rounded-2xl border-white/50 bg-white/20 backdrop-blur hover:bg-white/40 dark:border-white/10 dark:bg-white/5">
          <Link to={`/stocks/${stock.id}`}>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </InteractiveCard>
  );
}
