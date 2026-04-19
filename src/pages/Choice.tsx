import { ArrowRight, Building2, Landmark, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InteractiveCard } from "@/components/Card";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { useAppStore } from "@/store/useStore";

const choices = [
  {
    title: "Low Risk",
    subtitle: "IPOs and Buybacks",
    icon: Landmark,
    route: "/low-risk",
    description: "Structured opportunities for patient investors who prefer calculated upside.",
    points: ["Fresh IPO pipeline", "Buyback analyzer"],
    mode: "low" as const,
  },
  {
    title: "Moderate Risk",
    subtitle: "Investing",
    icon: Building2,
    route: "/moderate-risk",
    description: "ETFs, mutual funds, and stock ideas with a long-term wealth lens.",
    points: ["Fund comparison", "Stock research", "Sector insight"],
    mode: "moderate" as const,
  },
  {
    title: "High Risk",
    subtitle: "Trading",
    icon: Zap,
    route: "/high-risk",
    description: "Action-oriented intraday and FnO workbench with clear risk prompts.",
    points: ["Intraday cards", "FnO deployment", "Position risk"],
    mode: "high" as const,
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

      <div className="grid gap-5 lg:grid-cols-3">
        {choices.map((choice) => {
          const Icon = choice.icon;

          return (
            <button
              key={choice.title}
              onClick={() => {
                setMode(choice.mode);
                navigate(choice.route);
              }}
              className="text-left"
            >
              <InteractiveCard className="h-full overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
                <div className="flex items-center justify-between">
                  <div className="rounded-3xl bg-primary/10 p-4 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="mt-8">
                  <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">{choice.subtitle}</p>
                  <h3 className="mt-3 text-3xl font-bold tracking-tight">{choice.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{choice.description}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {choice.points.map((point) => (
                    <span key={point} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
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
