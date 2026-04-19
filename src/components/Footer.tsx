import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { LogoMark } from "@/components/LogoMark";

const quickLinks = [
  { label: "Dashboard", to: "/choice" },
  { label: "Low Risk", to: "/low-risk" },
  { label: "Investing", to: "/moderate-risk" },
  { label: "Trading", to: "/high-risk" },
  { label: "Our Team", to: "/team" },
  { label: "Chat", to: "/chat" },
];

const socials = [Twitter, Linkedin, Instagram, Facebook];

export function Footer() {
  return (
    <footer className="mt-10 pb-6">
      <Card className="overflow-hidden rounded-[32px] border-border/70 bg-gradient-to-br from-slate-950 to-slate-900 p-8 text-white">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.8fr_0.9fr]">
          <div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1">
                <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Modern investing workspace</p>
                <h3 className="text-xl font-semibold">Algotrade X</h3>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              A premium frontend-first investment and trading platform designed to feel calm, data-aware,
              and execution-ready across low-risk investing, portfolio research, and trading workflows.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Quick Links</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-200">
              {quickLinks.map((link) => (
                <Link key={link.to} to={link.to} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Contact</p>
            <div className="mt-4 grid gap-4 text-sm text-slate-200">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@algotradex.app</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 99999 99999</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>New Delhi, India</span>
              </div>
              <div className="mt-2 flex gap-3">
                {socials.map((Icon, index) => (
                  <button
                    key={index}
                    className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
          All investments and trading strategies involve risk. The information provided on this platform is for
          educational and informational purposes only and should not be considered financial advice.
        </div>
      </Card>
    </footer>
  );
}
