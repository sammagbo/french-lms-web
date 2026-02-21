import { cn } from "@/lib/utils";
import { Info, Lightbulb, AlertTriangle, AlertOctagon, XOctagon, MessageSquare } from "lucide-react";
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

/**
 * Opal-inspired Vocabulary Card
 */
export function VocabularyCard({ word, translation, pronunciation }: {
      word: string;
      translation: string;
      pronunciation?: string;
}) {
      return (
            <div className="my-12 text-center space-y-4 not-prose">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest border border-blue-100 mb-2">
                        Étude de Vocabulaire
                  </div>
                  <h2 className="text-6xl font-black text-slate-900 tracking-tight mb-0">
                        {word}
                  </h2>
                  <div className="flex items-center justify-center gap-4 text-blue-400">
                        <div className="h-px w-8 bg-blue-100" />
                        <span className="text-xl font-medium uppercase tracking-widest">{translation}</span>
                        <div className="h-px w-8 bg-blue-100" />
                  </div>
                  {pronunciation && (
                        <p className="text-sm text-slate-400 italic">[{pronunciation}]</p>
                  )}
            </div>
      );
}

/**
 * Opal-inspired French Example Card
 */
export function FrenchExample({ french, portuguese }: {
      french: string;
      portuguese: string;
}) {
      return (
            <div className="my-4 bg-slate-50/50 border-l-4 border-blue-600 rounded-r-2xl p-6 transition-all hover:bg-slate-50 shadow-sm relative overflow-hidden group not-prose">
                  <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12 group-hover:scale-175 transition-transform duration-500">
                        <MessageSquare className="w-12 h-12 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-900 mb-1 leading-tight">
                        {french}
                  </p>
                  <p className="text-sm text-slate-500 italic">
                        {portuguese}
                  </p>
            </div>
      );
}

