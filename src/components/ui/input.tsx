import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary/60 focus:ring-4 focus:ring-primary/10",
        className,
      )}
      {...props}
    />
  );
}
