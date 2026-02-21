import { cn } from "@/lib/utils";
import { Info, Lightbulb, AlertTriangle, AlertOctagon, XOctagon } from "lucide-react";
import React from "react";

/**
 * RichText acts as a wrapper to apply Tailwind Typography (prose) 
 * to its children, ensuring beautiful, readable text layout.
 */
export function RichText({
      children,
      className
}: {
      children: React.ReactNode;
      className?: string;
}) {
      return (
            <div className={cn(
                  "prose prose-slate dark:prose-invert max-w-none",
                  "prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-500",
                  "prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800",
                  "prose-img:rounded-xl prose-img:shadow-md",
                  className
            )}>
                  {children}
            </div>
      );
}

/**
 * Github-style Alerts replicated for React
 */
type AlertVariant = "note" | "tip" | "warning" | "important" | "caution";

interface AlertProps {
      variant: AlertVariant;
      children: React.ReactNode;
      title?: string;
      className?: string;
}

const alertConfig = {
      note: {
            icon: Info,
            colors: "bg-blue-50/50 border-blue-500/20 text-blue-800 dark:bg-blue-900/10 dark:border-blue-500/30 dark:text-blue-200",
            iconColor: "text-blue-500 dark:text-blue-400",
            defaultTitle: "Note",
      },
      tip: {
            icon: Lightbulb,
            colors: "bg-green-50/50 border-green-500/20 text-green-800 dark:bg-green-900/10 dark:border-green-500/30 dark:text-green-200",
            iconColor: "text-green-500 dark:text-green-400",
            defaultTitle: "Tip",
      },
      warning: {
            icon: AlertTriangle,
            colors: "bg-amber-50/50 border-amber-500/20 text-amber-800 dark:bg-amber-900/10 dark:border-amber-500/30 dark:text-amber-200",
            iconColor: "text-amber-500 dark:text-amber-400",
            defaultTitle: "Warning",
      },
      important: {
            icon: AlertOctagon,
            colors: "bg-purple-50/50 border-purple-500/20 text-purple-800 dark:bg-purple-900/10 dark:border-purple-500/30 dark:text-purple-200",
            iconColor: "text-purple-500 dark:text-purple-400",
            defaultTitle: "Important",
      },
      caution: {
            icon: XOctagon,
            colors: "bg-red-50/50 border-red-500/20 text-red-800 dark:bg-red-900/10 dark:border-red-500/30 dark:text-red-200",
            iconColor: "text-red-500 dark:text-red-400",
            defaultTitle: "Caution",
      },
};

export function DocumentAlert({ variant, children, title, className }: AlertProps) {
      const config = alertConfig[variant];
      const Icon = config.icon;

      return (
            <div className={cn("my-6 border-l-4 p-4 rounded-r-lg", config.colors, className)}>
                  <div className="flex items-center gap-2 mb-2 font-semibold">
                        <Icon className={cn("w-5 h-5", config.iconColor)} />
                        <span>{title || config.defaultTitle}</span>
                  </div>
                  <div className="text-sm leading-relaxed opacity-90 not-prose">
                        {children}
                  </div>
            </div>
      );
}
