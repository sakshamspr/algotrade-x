import { ArrowRight, Bot, Building2, Landmark, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { InteractiveCard } from "@/components/Card";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { useAppStore } from "@/store/useStore";

const choices = [
  {
    title: "Low Risk",
    subtitle: "IPOs, Buybacks",
    icon: Landmark,
    route: "/low-risk",
    description: "Structured opportunities for patient investors who prefer calculated upside.",
    points: ["Fresh IPO pipeline", "Buyback analyzer"],
    mode: "low" as const,
    color: "from-emerald-500/20 to-emerald-500/0",
    hoverColor: "group-hover:border-emerald-500/50",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    title: "Moderate Risk [Investing]",
    subtitle: "Equity Market",
    icon: Building2,
    route: "/moderate-risk",
    description: "ETFs, mutual funds, and stock ideas with a long-term wealth lens.",
    points: ["ETFs & Mutual Funds", "Stocks", "Sector Insight"],
    mode: "moderate" as const,
    color: "from-amber-500/20 to-amber-500/0",
    hoverColor: "group-hover:border-amber-500/50",
    glowColor: "rgba(245, 158, 11, 0.15)",
  },
  {
    title: "High Risk [Trading]",
    subtitle: "Intraday, FnO",
    icon: Zap,
    route: "/high-risk",
    description: "Action-oriented intraday and FnO workbench with clear risk prompts.",
    points: ["Intraday (Stocks)", "FnO (Nifty 50)", "Position Risk"],
    mode: "high" as const,
    color: "from-rose-500/20 to-rose-500/0",
    hoverColor: "group-hover:border-rose-500/50",
    glowColor: "rgba(244, 63, 94, 0.15)",
  },
];

export function Choice() {
  const navigate = useNavigate();
  const { setMode } = useAppStore();

  return (
    <PageTransition>
      <SectionHeader
        eyebrow="Core Entry"
        title="What’s on your Mind Today?"
        description="Choose a lane based on your intent and risk appetite. The experience adapts with you."
      />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 flex items-center gap-6 rounded-[32px] border border-primary/20 bg-primary/5 p-6"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
          <Bot className="h-7 w-7" />
        </div>
        <div>
          <p className="text-sm font-bold text-primary uppercase tracking-widest">Bot X Concierge</p>
          <p className="mt-1 text-lg font-medium text-slate-700 dark:text-slate-300">
            Good afternoon! Markets are trending 0.8% higher. I recommend the <span className="font-bold text-emerald-500">Low Risk</span> path for today's volatility profile.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        {choices.map((choice) => {
          const Icon = choice.icon;

          return (
            <button
              key={choice.title}
              onClick={() => {
                setMode(choice.mode);
                navigate(choice.route);
              }}
              className="group relative text-left"
            >
              <div
                className="absolute -inset-0.5 rounded-[34px] opacity-0 blur transition duration-500 group-hover:opacity-100"
                style={{ backgroundColor: choice.glowColor }}
              />
              <InteractiveCard className={`relative h-full overflow-hidden border-2 border-transparent transition-all duration-300 ${choice.hoverColor} bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950`}>
                <div className={`absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br ${choice.color} blur-3xl`} />
                
                <div className="flex items-center justify-between">
                  <div className="rounded-3xl bg-primary/10 p-4 text-primary group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-8">
                  <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">{choice.subtitle}</p>
                  <h3 className="mt-3 text-3xl font-bold tracking-tight">{choice.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{choice.description}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {choice.points.map((point) => (
                    <span key={point} className="rounded-full bg-muted/80 px-3 py-1 text-xs font-medium backdrop-blur-sm border border-white/10">
                      {point}
                    </span>
                  ))}
                </div>
              </InteractiveCard>
            </button>
          );
        })}
      </div>
    </PageTransition>
  );
}
