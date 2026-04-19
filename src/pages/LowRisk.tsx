import { Info, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { InteractiveCard } from "@/components/Card";
import { BuybackCalculator } from "@/components/Calculator";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAsyncData } from "@/hooks/useAsyncData";
import { marketApi } from "@/services/api";

export function LowRisk() {
  const { data: ipoData, loading: iposLoading } = useAsyncData(() => marketApi.ipos(), []);
  const { data: buybackData, loading: buybackLoading } = useAsyncData(() => marketApi.buybacks(), []);

  return (
    <PageTransition>
      <SectionHeader
        eyebrow="Low Risk"
        title="Primary market and corporate action ideas"
        description="A calmer investment lane built around upcoming IPOs and buyback opportunities."
      />

      <section className="mb-10">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Upcoming IPOs</h3>
          <p className="text-sm text-muted-foreground">Horizontal discovery cards with issue highlights</p>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-2">
          {iposLoading
            ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-72 min-w-[320px]" />)
            : ipoData?.map((ipo) => (
                <InteractiveCard key={ipo.id} className="min-w-[320px] max-w-sm flex-none">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{ipo.sector}</p>
                      <h4 className="mt-1 text-2xl font-semibold">{ipo.company}</h4>
                    </div>
                    <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                      +{ipo.expectedProfit}%
                    </span>
                  </div>
                  <div className="mt-6 grid gap-3 text-sm">
                    <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
                      <span className="text-muted-foreground">Lot Size</span>
                      <span className="font-medium">{ipo.lotSize}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
                      <span className="text-muted-foreground">Min Investment</span>
                      <span className="font-medium">Rs {ipo.minInvestment.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Apply Now
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/ipos/${ipo.id}`}>
                        <Info className="mr-2 h-4 w-4" />
                        Know More
                      </Link>
                    </Button>
                  </div>
                </InteractiveCard>
              ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Buybacks</h3>
            <p className="text-sm text-muted-foreground">Track dates, prices, and opportunity size</p>
          </div>
          <div className="grid gap-4">
            {buybackLoading
              ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-32" />)
              : buybackData?.map((item) => (
                  <Card key={item.id} className="p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{item.size}</p>
                        <h4 className="text-xl font-semibold">{item.company}</h4>
                      </div>
                      <div className="grid gap-3 text-sm md:grid-cols-3">
                        <div>
                          <p className="text-muted-foreground">Open</p>
                          <p className="font-medium">{item.openDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Close</p>
                          <p className="font-medium">{item.closeDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Price</p>
                          <p className="font-medium">Rs {item.price}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
          </div>
        </div>

        <BuybackCalculator />
      </section>
    </PageTransition>
  );
}
