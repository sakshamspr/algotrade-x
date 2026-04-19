import { Calendar, Info, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { IpoCard } from "@/components/IpoCard";
import { BuybackCalculator } from "@/components/Calculator";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAsyncData } from "@/hooks/useAsyncData";
import { marketApi } from "@/services/api";
import { NewsFooter } from "@/components/NewsFooter";

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

      <div className="space-y-24">
        <section>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Open IPOs</h3>
              <p className="text-sm text-muted-foreground mt-1">Horizontal discovery cards with GMP insights</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">3 Active Now</span>
            </div>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide px-1">
            {iposLoading
              ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-[340px] min-w-[360px] rounded-[32px]" />)
              : ipoData?.map((ipo) => (
                  <IpoCard key={ipo.id} ipo={ipo} />
                ))}
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Active Buybacks</h3>
                <p className="text-sm text-muted-foreground mt-1">Corporate action timeline and generic info</p>
              </div>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="grid gap-6">
              {buybackLoading
                ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-32 rounded-[28px]" />)
                : buybackData?.map((item) => (
                    <Card key={item.id} className="group relative overflow-hidden rounded-[32px] border-white/40 bg-white/50 p-8 shadow-sm transition-all hover:bg-white dark:bg-slate-900/50">
                      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-5">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                            <span className="text-lg font-bold">{item.company[0]}</span>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{item.size}</p>
                            <h4 className="text-2xl font-bold">{item.company}</h4>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-8 text-center border-l border-border/50 pl-8">
                          <div>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground">Price</p>
                            <p className="mt-1 font-mono font-bold text-primary text-lg">₹{item.price}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground">Window</p>
                            <p className="mt-1 text-sm font-semibold">{item.openDate.split(' ')[0]} - {item.closeDate.split(' ')[0]}</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="h-10 w-10 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors cursor-pointer">
                              <Info className="h-5 w-5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
            </div>
          </div>

          <BuybackCalculator />
        </section>

        <NewsFooter category="IPO" />
      </div>
    </PageTransition>
  );
}
