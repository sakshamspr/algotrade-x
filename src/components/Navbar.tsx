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
        <button className="flex items-center gap-3 text-left" onClick={() => navigate("/")}>
          <LogoMark />
          <div>
            <p className="text-sm text-muted-foreground">Fintech Intelligence</p>
            <h1 className="text-lg font-semibold tracking-tight">Algotrade X</h1>
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

        <div className="flex flex-wrap items-center gap-2 rounded-full bg-muted/80 p-1">
          {modeConfig.map((item) => (
            <button
              key={item.key}
              onClick={() => handleMode(item.key, item.route)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                mode === item.key || location.pathname === item.route
                  ? "bg-white text-slate-950 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
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
