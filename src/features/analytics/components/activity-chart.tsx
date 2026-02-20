"use client";

import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/services/analytics.service";
import { Loader2, BarChart3 } from "lucide-react";
import {
      BarChart,
      Bar,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      ResponsiveContainer,
      LineChart,
      Line,
      Area,
      AreaChart,
} from "recharts";

// ─── Formatador de data ───
function formatDayLabel(dateStr: string): string {
      const date = new Date(dateStr + "T12:00:00"); // Evita problemas de timezone
      const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
      const day = days[date.getDay()];
      const num = date.getDate().toString().padStart(2, "0");
      return `${day} ${num}`;
}

// ─── Tooltip Customizado ───
function CustomTooltip({ active, payload, label }: any) {
      if (!active || !payload?.length) return null;
      return (
            <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg px-4 py-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
                  <p className="text-lg font-bold text-gray-900">
                        {payload[0].value}{" "}
                        <span className="text-sm font-normal text-gray-500">
                              {payload[0].value === 1 ? "tarefa entregue" : "tarefas entregues"}
                        </span>
                  </p>
            </div>
      );
}

function CustomTooltipStudents({ active, payload, label }: any) {
      if (!active || !payload?.length) return null;
      return (
            <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg px-4 py-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
                  <p className="text-lg font-bold text-gray-900">
                        {payload[0].value}{" "}
                        <span className="text-sm font-normal text-gray-500">
                              {payload[0].value === 1 ? "novo aluno" : "novos alunos"}
                        </span>
                  </p>
            </div>
      );
}

// ─── Skeleton ───
function ChartSkeleton() {
      return (
            <div className="rounded-2xl border bg-white p-6 shadow-sm animate-pulse">
                  <div className="h-5 w-48 bg-gray-200 rounded mb-6" />
                  <div className="h-64 bg-gray-100 rounded-xl" />
            </div>
      );
}

// ─── Gráfico de Submissões (Barras) ───
export function SubmissionsChart() {
      const { data, isLoading, isError } = useQuery({
            queryKey: ["analytics-submissions-by-day"],
            queryFn: analyticsService.getSubmissionsByDay,
            refetchInterval: 60_000,
      });

      if (isLoading) return <ChartSkeleton />;

      if (isError || !data) {
            return (
                  <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
                        <p className="text-red-600 font-medium">Erro ao carregar gráfico</p>
                  </div>
            );
      }

      const chartData = data.map((d) => ({
            ...d,
            label: formatDayLabel(d.date),
      }));

      return (
            <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                        <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                    Submissões — Últimos 7 Dias
                              </h3>
                              <p className="text-sm text-gray-400 mt-0.5">
                                    Tarefas entregues pelos alunos
                              </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                              <BarChart3 className="h-5 w-5 text-blue-600" />
                        </div>
                  </div>

                  {/* Chart */}
                  <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={chartData} barCategoryGap="25%">
                              <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f1f5f9"
                                    vertical={false}
                              />
                              <XAxis
                                    dataKey="label"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                                    dy={8}
                              />
                              <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                                    allowDecimals={false}
                                    dx={-8}
                              />
                              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f1f5f9" }} />
                              <Bar
                                    dataKey="count"
                                    fill="url(#barGradient)"
                                    radius={[8, 8, 0, 0]}
                                    maxBarSize={48}
                              />
                              <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="0%" stopColor="#3b82f6" />
                                          <stop offset="100%" stopColor="#6366f1" />
                                    </linearGradient>
                              </defs>
                        </BarChart>
                  </ResponsiveContainer>
            </div>
      );
}

// ─── Gráfico de Novos Alunos (Área) ───
export function NewStudentsChart() {
      const { data, isLoading, isError } = useQuery({
            queryKey: ["analytics-new-students-by-day"],
            queryFn: analyticsService.getNewStudentsByDay,
            refetchInterval: 60_000,
      });

      if (isLoading) return <ChartSkeleton />;

      if (isError || !data) {
            return (
                  <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
                        <p className="text-red-600 font-medium">Erro ao carregar gráfico</p>
                  </div>
            );
      }

      const chartData = data.map((d) => ({
            ...d,
            label: formatDayLabel(d.date),
      }));

      return (
            <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                        <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                    Novos Alunos — Últimos 7 Dias
                              </h3>
                              <p className="text-sm text-gray-400 mt-0.5">
                                    Registos diários na plataforma
                              </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                              <BarChart3 className="h-5 w-5 text-emerald-600" />
                        </div>
                  </div>

                  {/* Chart */}
                  <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={chartData}>
                              <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f1f5f9"
                                    vertical={false}
                              />
                              <XAxis
                                    dataKey="label"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                                    dy={8}
                              />
                              <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                                    allowDecimals={false}
                                    dx={-8}
                              />
                              <Tooltip content={<CustomTooltipStudents />} />
                              <defs>
                                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                                          <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                                    </linearGradient>
                              </defs>
                              <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#10b981"
                                    strokeWidth={2.5}
                                    fill="url(#areaGradient)"
                                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, strokeWidth: 2, fill: "#fff", stroke: "#10b981" }}
                              />
                        </AreaChart>
                  </ResponsiveContainer>
            </div>
      );
}
