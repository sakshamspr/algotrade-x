import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InteractiveCard } from "@/components/Card";
import type { Stock } from "@/types";

export function StockCard({ stock }: { stock: Stock }) {
  return (
    <InteractiveCard className="h-full">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{stock.symbol}</p>
          <h3 className="text-xl font-semibold">{stock.name}</h3>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          PE {stock.peRatio}
        </span>
      </div>
      <div className="grid gap-4 text-sm md:grid-cols-2">
        <div className="rounded-2xl bg-muted/60 p-4">
          <p className="text-muted-foreground">Buy Level</p>
          <p className="mt-1 text-lg font-semibold">Rs {stock.buyLevel}</p>
        </div>
        <div className="rounded-2xl bg-muted/60 p-4">
          <p className="text-muted-foreground">Sell Level</p>
          <p className="mt-1 text-lg font-semibold">Rs {stock.sellLevel}</p>
        </div>
      </div>
      <p className="mt-5 text-sm text-muted-foreground">{stock.summary}</p>
      <Button asChild className="mt-6 w-full justify-between">
        <Link to={`/stocks/${stock.id}`}>
          View Detail
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </InteractiveCard>
  );
}
