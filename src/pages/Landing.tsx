import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LogoMark } from "@/components/LogoMark";
import { PageTransition } from "@/components/PageTransition";

export function Landing() {
  return (
    <PageTransition>
      <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(22,163,74,0.12),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] px-4 py-6 dark:bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.20),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(22,163,74,0.14),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]">
        <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
          <div className="flex items-center justify-between rounded-[28px] border border-white/50 bg-background/75 px-5 py-4 shadow-panel backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-lg border border-border/50 bg-white/50 p-1">
                <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">Algotrade X</p>
                <h1 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Invest Smart. Invest Safe.</h1>
              </div>
            </div>
            <div className="flex gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Login</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Welcome Back</DialogTitle>
                    <DialogDescription>Access your trading workbench with Bot X intelligence.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="name@example.com" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Password</label>
                      <Input type="password" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button asChild className="w-full">
                      <Link to="/choice">Sign In</Link>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Signup</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Account</DialogTitle>
                    <DialogDescription>Join the future of disciplined, algorithm-driven investing.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input placeholder="John Doe" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="name@example.com" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Create Password</label>
                      <Input type="password" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button asChild className="w-full">
                      <Link to="/choice">Create Account</Link>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-4 text-sm uppercase tracking-[0.28em] text-primary">Premium Investing Console</p>
              <h2 className="animate-text-gradient max-w-3xl bg-gradient-to-r from-slate-950 via-primary to-slate-950 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-white dark:via-primary dark:to-white md:text-7xl">
                Trade with clarity, build wealth with discipline.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Algotrade X combines low-risk investing, conviction-based portfolios, and high-risk trading workflows
                inside a calm, modern fintech experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/choice">
                    Start Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/moderate-risk">Explore Dashboard</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="grid gap-4"
            >
              <Card className="rounded-[32px] border-primary/20 bg-white/80 p-6 backdrop-blur dark:bg-slate-900/80">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Portfolio Health</p>
                    <h3 className="mt-2 text-3xl font-bold">82 / 100</h3>
                  </div>
                  <div className="rounded-3xl bg-secondary/10 p-4 text-secondary">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                </div>
                <div className="mt-6 h-3 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-primary to-secondary" />
                </div>
              </Card>
              <Card className="rounded-[32px] bg-slate-950 p-6 text-white dark:bg-slate-800">
                <p className="text-sm text-slate-300">Today&apos;s Edge</p>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-4xl font-bold">+2.84%</h3>
                    <p className="mt-2 text-sm text-slate-300">Capital Goods is leading the tape.</p>
                  </div>
                  <TrendingUp className="h-10 w-10 text-secondary" />
                </div>
              </Card>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="rounded-[28px] p-5">
                  <p className="text-sm text-muted-foreground">Low Risk</p>
                  <p className="mt-2 text-2xl font-semibold">IPOs and buybacks</p>
                </Card>
                <Card className="rounded-[28px] p-5">
                  <p className="text-sm text-muted-foreground">High Risk</p>
                  <p className="mt-2 text-2xl font-semibold">Intraday and FnO</p>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
