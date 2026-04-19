import { holdings, orders, positions } from "@/data/mock";
import { useAppStore } from "@/store/useStore";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tabConfig = {
  holdings,
  positions,
  orders,
};

export function PortfolioTabs() {
  const { portfolioTab, setPortfolioTab } = useAppStore();
  const rows = tabConfig[portfolioTab];

  return (
    <Card className="mb-8 p-5">
      <div className="flex flex-wrap gap-2 rounded-full bg-muted p-1">
        {(["holdings", "positions", "orders"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setPortfolioTab(tab)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium capitalize transition",
              portfolioTab === tab
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-muted-foreground">
            <tr>
              <th className="pb-3">Instrument</th>
              <th className="pb-3">Qty</th>
              <th className="pb-3">Value</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-border/60">
                <td className="py-4 font-medium">{row.instrument}</td>
                <td className="py-4 text-muted-foreground">{row.quantity}</td>
                <td className="py-4">{row.value}</td>
                <td className="py-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
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
