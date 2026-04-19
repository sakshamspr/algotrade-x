import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function InteractiveCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.22 }}>
      <div
        className={cn(
          "rounded-3xl border border-border/60 bg-card p-6 shadow-panel transition-shadow hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]",
          className,
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
