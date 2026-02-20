"use client";

import { KPICards } from "@/features/analytics/components/kpi-cards";
import {
      SubmissionsChart,
      NewStudentsChart,
} from "@/features/analytics/components/activity-chart";
import { BarChart3, Sparkles } from "lucide-react";

export default function TeacherDashboardPage() {
      return (
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {/* Header */}
                  <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-200">
                                    <BarChart3 className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                          Painel do Professor
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                          Visão geral da sua plataforma de ensino
                                    </p>
                              </div>
                        </div>
                  </div>

                  {/* KPI Cards */}
                  <section>
                        <div className="flex items-center gap-2 mb-4">
                              <Sparkles className="h-4 w-4 text-amber-500" />
                              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                    Indicadores Principais
                              </h2>
                              <div className="h-px flex-1 bg-gray-100" />
                        </div>
                        <KPICards />
                  </section>

                  {/* Charts */}
                  <section>
                        <div className="flex items-center gap-2 mb-4">
                              <BarChart3 className="h-4 w-4 text-blue-500" />
                              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                    Atividade Recente
                              </h2>
                              <div className="h-px flex-1 bg-gray-100" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <SubmissionsChart />
                              <NewStudentsChart />
                        </div>
                  </section>
            </div>
      );
}
