import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InteractiveCard } from "@/components/Card";
import type { Fund } from "@/types";

export function FundCard({ fund }: { fund: Fund }) {
  return (
    <InteractiveCard className="h-full">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{fund.type}</p>
          <h3 className="text-xl font-semibold">{fund.name}</h3>
        </div>
        <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
          {fund.risk}
        </span>
      </div>
      <div className="mt-5 grid gap-3 text-sm">
        <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
          <span className="text-muted-foreground">1Y Return</span>
          <span className="font-semibold text-secondary">{fund.oneYearReturn}%</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
          <span className="text-muted-foreground">Category</span>
          <span className="font-medium">{fund.category}</span>
        </div>
      </div>
      <Button asChild variant="outline" className="mt-6 w-full">
        <Link to={`/funds/${fund.id}`}>Explore Fund</Link>
      </Button>
    </InteractiveCard>
  );
}
