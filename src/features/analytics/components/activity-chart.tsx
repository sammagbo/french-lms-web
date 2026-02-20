"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/services/analytics.service";
import { Loader2, BarChart3, Calendar } from "lucide-react";
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
      const [days, setDays] = useState<number>(7);

      const { data, isLoading, isError, isFetching } = useQuery({
            queryKey: ["analytics-submissions-by-day", days],
            queryFn: () => analyticsService.getSubmissionsByDay(days),
            refetchInterval: 60_000,
      });

      // Show skeleton only on first load, not on background refetches
      if (isLoading && !data) return <ChartSkeleton />;

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
            <div className={`rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative ${isFetching ? 'opacity-80' : ''} transition-opacity`}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                        <div>
                              <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-bold text-gray-900">
                                          Submissões
                                    </h3>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
                                          <Calendar className="w-3 h-3 text-gray-400 mr-1.5" />
                                          <select
                                                value={days}
                                                onChange={(e) => setDays(Number(e.target.value))}
                                                className="text-xs font-medium text-gray-600 bg-transparent border-none outline-none cursor-pointer pr-1"
                                          >
                                                <option value={7}>Últimos 7 dias</option>
                                                <option value={15}>Últimos 15 dias</option>
                                                <option value={30}>Últimos 30 dias</option>
                                          </select>
                                    </div>
                              </div>
                              <p className="text-sm text-gray-400 mt-1">
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
      const [days, setDays] = useState<number>(7);

      const { data, isLoading, isError, isFetching } = useQuery({
            queryKey: ["analytics-new-students-by-day", days],
            queryFn: () => analyticsService.getNewStudentsByDay(days),
            refetchInterval: 60_000,
      });

      if (isLoading && !data) return <ChartSkeleton />;

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
            <div className={`rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative ${isFetching ? 'opacity-80' : ''} transition-opacity`}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                        <div>
                              <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-bold text-gray-900">
                                          Novos Alunos
                                    </h3>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
                                          <Calendar className="w-3 h-3 text-gray-400 mr-1.5" />
                                          <select
                                                value={days}
                                                onChange={(e) => setDays(Number(e.target.value))}
                                                className="text-xs font-medium text-gray-600 bg-transparent border-none outline-none cursor-pointer pr-1"
                                          >
                                                <option value={7}>Últimos 7 dias</option>
                                                <option value={15}>Últimos 15 dias</option>
                                                <option value={30}>Últimos 30 dias</option>
                                          </select>
                                    </div>
                              </div>
                              <p className="text-sm text-gray-400 mt-1">
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
