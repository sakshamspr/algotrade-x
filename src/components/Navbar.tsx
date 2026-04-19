import { LogIn, MessageSquareMore, Moon, Sun, UserCircle2 } from "lucide-react";
import { useTheme } from "next-themes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogoMark } from "@/components/LogoMark";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useStore";
import type { Mode } from "@/types";

const modeConfig: Array<{ key: Mode; label: string; route: string }> = [
  { key: "low", label: "Low", route: "/low-risk" },
  { key: "moderate", label: "Moderate", route: "/moderate-risk" },
  { key: "high", label: "High", route: "/high-risk" },
];

const navLinks = [
  { label: "Dashboard", to: "/choice" },
  { label: "Low Risk", to: "/low-risk" },
  { label: "Investing", to: "/moderate-risk" },
  { label: "Trading", to: "/high-risk" },
  { label: "Our Team", to: "/team" },
];

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resolvedTheme, setTheme } = useTheme();
  const { mode, setMode } = useAppStore();

  const handleMode = (nextMode: Mode, route: string) => {
    setMode(nextMode);
    navigate(route);
  };

  return (
    <Card className="sticky top-4 z-40 mb-5 rounded-[28px] border-white/50 bg-background/70 p-3 shadow-panel backdrop-blur-xl">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <button className="flex items-center gap-3 text-left group" onClick={() => navigate("/")}>
          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-border/50 bg-white/50 p-1 group-hover:scale-110 transition-transform duration-300">
            <img src="/logo.png" alt="Algotrade X Logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">Fintech Intelligence</p>
            <h1 className="text-xl font-bold tracking-tight">Algotrade X</h1>
          </div>
        </button>

        <nav className="flex flex-wrap items-center gap-1 rounded-full bg-muted/70 p-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                location.pathname === link.to
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-2 rounded-full border border-border/40 bg-muted/80 p-1">
          {modeConfig.map((item) => {
            const isActive = mode === item.key || location.pathname === item.route;
            const accentClass = 
              item.key === "low" ? "bg-emerald-500 text-white" :
              item.key === "moderate" ? "bg-amber-500 text-white" :
              "bg-rose-500 text-white";

            return (
              <button
                key={item.key}
                onClick={() => handleMode(item.key, item.route)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                  isActive
                    ? `${accentClass} shadow-[0_0_12px_rgba(0,0,0,0.1)]`
                    : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="icon">
            <Link to="/chat">
              <MessageSquareMore className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="outline" className="hidden md:inline-flex">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
          <Button variant="outline" size="icon">
            <UserCircle2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
