import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info, Send } from "lucide-react";
import { motion } from "framer-motion";
import type { Ipo } from "@/types";

interface IpoCardProps {
  ipo: Ipo;
}

export function IpoCard({ ipo }: IpoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="min-w-[340px] max-w-sm flex-none"
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />
        
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{ipo.sector}</p>
            <h4 className="mt-1 text-2xl font-bold tracking-tight">{ipo.company}</h4>
          </div>
          <div className="flex flex-col items-end">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              +{ipo.expectedProfit}% Est.
            </span>
            <p className="mt-1 text-[10px] text-muted-foreground">GMP potential</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-white/50 p-4 dark:bg-slate-800/50">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Lot Size</p>
            <p className="mt-1 font-bold">{ipo.lotSize} Shares</p>
          </div>
          <div className="rounded-2xl bg-white/50 p-4 dark:bg-slate-800/50">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Min Invest</p>
            <p className="mt-1 font-bold text-primary">₹{ipo.minInvestment.toLocaleString("en-IN")}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button className="group relative overflow-hidden rounded-2xl bg-emerald-600 hover:bg-emerald-700">
            <Send className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            Apply Now
          </Button>
          
          <IpoDetailsDrawer ipo={ipo} />
        </div>
      </div>
    </motion.div>
  );
}

function IpoDetailsDrawer({ ipo }: { ipo: Ipo }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-2xl border-white/50 bg-white/20 backdrop-blur hover:bg-white/40 dark:border-white/10 dark:bg-white/5">
          <Info className="mr-2 h-4 w-4" />
          Know More
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl rounded-[40px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-2xl">{ipo.company} Details</DialogTitle>
              <DialogDescription>{ipo.sector} • {ipo.revenue} Revenue</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h5 className="font-bold text-primary">IPO Timelines</h5>
            <div className="grid gap-3">
              {[
                { label: "Opens", value: ipo.openDate },
                { label: "Closes", value: ipo.closeDate },
                { label: "Listing", value: ipo.listingDate },
              ].map((item) => (
                <div key={item.label} className="flex justify-between rounded-xl bg-muted/50 p-3 text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-bold text-primary">Financial Snapshot</h5>
            <div className="grid gap-3">
              <div className="rounded-xl bg-emerald-500/5 p-4 border border-emerald-500/10">
                <p className="text-xs text-muted-foreground uppercase">Revenue (Annual)</p>
                <p className="text-xl font-bold text-emerald-600">{ipo.revenue}</p>
              </div>
              <div className="rounded-xl bg-blue-500/5 p-4 border border-blue-500/10">
                <p className="text-xs text-muted-foreground uppercase">Net Profit</p>
                <p className="text-xl font-bold text-blue-600">{ipo.profit}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h5 className="font-bold text-primary mb-3">Company Overview</h5>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {ipo.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {ipo.strengths?.map((strength) => (
              <span key={strength} className="rounded-full bg-primary/5 px-3 py-1 text-[10px] font-bold text-primary border border-primary/10">
                ✓ {strength}
              </span>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
