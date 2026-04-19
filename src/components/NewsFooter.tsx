import { newsItems } from "@/data/mock";
import { Card } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import { motion } from "framer-motion";

interface NewsFooterProps {
  category?: string;
}

export function NewsFooter({ category }: NewsFooterProps) {
  const filteredNews = category 
    ? newsItems.filter(item => item.category === category)
    : newsItems;

  return (
    <section className="mt-16 pb-12 border-t border-border/50 pt-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <Newspaper className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight">Market Intelligence</h3>
          <p className="text-sm text-muted-foreground">Latest {category || "Market"} updates curated for this section</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {filteredNews.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full group relative overflow-hidden rounded-[28px] border-white/40 bg-white/50 p-6 shadow-sm transition-all hover:bg-white dark:bg-slate-900/50">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {item.source}
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground">{item.time}</span>
                </div>
                <h4 className="font-bold leading-tight group-hover:text-primary transition-colors flex-1">
                  {item.title}
                </h4>
                <div className="mt-4 flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest cursor-pointer">
                  Read Full Story
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
