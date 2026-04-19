import { newsItems } from "@/data/mock";
import { Card } from "@/components/ui/card";

export function MarketNews() {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-primary">Top News</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Market Brief</h2>
        </div>
        <p className="text-sm text-muted-foreground">Real-time feel with API-ready placeholders</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {newsItems.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {item.category}
              </span>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold leading-7">{item.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{item.source}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
