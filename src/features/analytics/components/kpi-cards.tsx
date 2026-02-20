"use client";

import { useQuery } from "@tanstack/react-query";
import { analyticsService, KPIData } from "@/services/analytics.service";
import {
      Users,
      BookOpen,
      ClipboardCheck,
      Clock,
      BarChart3,
      TrendingUp,
      Loader2,
} from "lucide-react";

interface KPICardProps {
      title: string;
      value: string | number;
      subtitle?: string;
      icon: React.ReactNode;
      gradient: string;
      iconBg: string;
}

function KPICard({ title, value, subtitle, icon, gradient, iconBg }: KPICardProps) {
      return (
            <div
                  className={`
                        relative overflow-hidden rounded-2xl border border-white/20 bg-white p-6
                        shadow-sm hover:shadow-lg hover:-translate-y-0.5
                        transition-all duration-300 ease-out group cursor-default
                  `}
            >
                  {/* Gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${gradient}`} />

                  <div className="flex items-start justify-between">
                        <div className="flex-1">
                              <p className="text-sm font-medium text-gray-500 mb-1">
                                    {title}
                              </p>
                              <p className="text-3xl font-bold text-gray-900 tracking-tight">
                                    {value}
                              </p>
                              {subtitle && (
                                    <p className="text-xs text-gray-400 mt-1.5">{subtitle}</p>
                              )}
                        </div>
                        <div
                              className={`
                                    flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}
                                    transition-transform duration-300 group-hover:scale-110
                              `}
                        >
                              {icon}
                        </div>
                  </div>
            </div>
      );
}

function KPICardSkeleton() {
      return (
            <div className="rounded-2xl border bg-white p-6 shadow-sm animate-pulse">
                  <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                              <div className="h-4 w-24 bg-gray-200 rounded" />
                              <div className="h-8 w-16 bg-gray-200 rounded" />
                              <div className="h-3 w-32 bg-gray-100 rounded" />
                        </div>
                        <div className="h-12 w-12 bg-gray-200 rounded-xl" />
                  </div>
            </div>
      );
}

export function KPICards() {
      const { data: kpis, isLoading, isError } = useQuery({
            queryKey: ["analytics-kpis"],
            queryFn: analyticsService.getKPIs,
            refetchInterval: 60_000, // Auto-refresh a cada 60s
      });

      if (isLoading) {
            return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                              <KPICardSkeleton key={i} />
                        ))}
                  </div>
            );
      }

      if (isError || !kpis) {
            return (
                  <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
                        <p className="text-red-600 font-medium">Erro ao carregar KPIs</p>
                        <p className="text-sm text-red-400 mt-1">Verifique a conexão com o servidor.</p>
                  </div>
            );
      }

      const cards: KPICardProps[] = [
            {
                  title: "Total de Alunos",
                  value: kpis.totalStudents,
                  subtitle: "Alunos registados na plataforma",
                  icon: <Users className="h-6 w-6 text-blue-600" />,
                  gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
                  iconBg: "bg-blue-50",
            },
            {
                  title: "Pendentes de Correção",
                  value: kpis.pendingSubmissions,
                  subtitle: "Submissões aguardando feedback",
                  icon: <Clock className="h-6 w-6 text-amber-600" />,
                  gradient: "bg-gradient-to-r from-amber-400 to-amber-500",
                  iconBg: "bg-amber-50",
            },
            {
                  title: "Total de Cursos",
                  value: kpis.totalCourses,
                  subtitle: "Cursos disponíveis",
                  icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
                  gradient: "bg-gradient-to-r from-indigo-500 to-indigo-600",
                  iconBg: "bg-indigo-50",
            },
            {
                  title: "Total de Atividades",
                  value: kpis.totalActivities,
                  subtitle: "Exercícios e tarefas criados",
                  icon: <ClipboardCheck className="h-6 w-6 text-emerald-600" />,
                  gradient: "bg-gradient-to-r from-emerald-400 to-emerald-500",
                  iconBg: "bg-emerald-50",
            },
            {
                  title: "Submissões Corrigidas",
                  value: kpis.gradedSubmissions,
                  subtitle: "Tarefas com feedback completo",
                  icon: <BarChart3 className="h-6 w-6 text-violet-600" />,
                  gradient: "bg-gradient-to-r from-violet-400 to-violet-500",
                  iconBg: "bg-violet-50",
            },
            {
                  title: "Taxa de Correção",
                  value: `${kpis.gradingRate}%`,
                  subtitle: "Percentagem de tarefas avaliadas",
                  icon: <TrendingUp className="h-6 w-6 text-rose-600" />,
                  gradient: "bg-gradient-to-r from-rose-400 to-rose-500",
                  iconBg: "bg-rose-50",
            },
      ];

      return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cards.map((card) => (
                        <KPICard key={card.title} {...card} />
                  ))}
            </div>
      );
}
