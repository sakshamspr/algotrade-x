import { Briefcase, Gavel, LineChart } from "lucide-react";
import { holdings, orders, positions } from "@/data/mock";
import { useAppStore } from "@/store/useStore";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tabConfig = {
  holdings,
  positions,
  orders,
};

const icons = {
  holdings: Briefcase,
  positions: LineChart,
  orders: Gavel,
};

export function PortfolioTabs() {
  const { portfolioTab, setPortfolioTab } = useAppStore();
  const rows = tabConfig[portfolioTab];

  return (
    <Card className="mb-8 overflow-hidden rounded-[32px] border-white/40 bg-white/50 p-0 shadow-panel backdrop-blur-md dark:bg-slate-900/50">
      <div className="flex flex-wrap items-center justify-between border-b border-border/50 bg-muted/30 px-6 py-4">
        <h3 className="font-semibold tracking-tight">Portfolio Overview</h3>
        <div className="flex gap-1 rounded-full bg-muted/80 p-1">
          {(["holdings", "positions", "orders"] as const).map((tab) => {
            const Icon = icons[tab];
            const isActive = portfolioTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setPortfolioTab(tab)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium capitalize transition-all duration-300",
                  isActive
                    ? "bg-white text-primary shadow-sm dark:bg-slate-800"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto p-6">
        <table className="min-w-full text-left text-sm">
          <thead className="text-[10px] uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="pb-4 font-semibold">Instrument</th>
              <th className="pb-4 font-semibold">Quantity</th>
              <th className="pb-4 font-semibold">Value / P&L</th>
              <th className="pb-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {rows.map((row) => (
              <tr key={row.id} className="group transition-colors hover:bg-muted/30">
                <td className="py-4 font-semibold">{row.instrument}</td>
                <td className="py-4 text-muted-foreground">{row.quantity}</td>
                <td className="py-4 font-mono font-bold tracking-tight">{row.value}</td>
                <td className="py-4">
                  <span className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                    row.status.toLowerCase().includes("executed") || row.status.toLowerCase().includes("core")
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-primary/10 text-primary"
                  )}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
