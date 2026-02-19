"use client";

import { useQuery } from '@tanstack/react-query';
import { academyService } from '@/services/academy.service';
import { CourseCard } from '@/features/academy/components/course-card';
import { EmptyState } from '@/components/ui/empty-state';
import { DashboardSkeleton } from '@/components/ui/skeleton';
import { BookOpen, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
      const { data: courses, isLoading, isError } = useQuery({
            queryKey: ['courses'],
            queryFn: academyService.getCourses,
      });

      if (isLoading) {
            return <DashboardSkeleton />;
      }

      if (isError) {
            return (
                  <div className="max-w-7xl mx-auto">
                        <EmptyState
                              icon={<AlertTriangle className="h-8 w-8" />}
                              title="Erro ao carregar cursos"
                              description="Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente."
                              action={
                                    <button
                                          onClick={() => window.location.reload()}
                                          className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
                                    >
                                          Tentar Novamente
                                    </button>
                              }
                        />
                  </div>
            );
      }

      return (
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex flex-col gap-1">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                              Bem-vindo, <span className="text-blue-600">Alumni</span>
                        </h1>
                        <p className="text-lg text-gray-500 max-w-2xl">
                              Continue sua jornada de aprendizado ou explore novos horizontes na língua francesa.
                        </p>
                  </div>

                  <div className="space-y-4">
                        <div className="flex items-center justify-between">
                              <h2 className="text-xl font-bold text-gray-800">Cursos em Destaque</h2>
                              <div className="h-1 flex-1 mx-4 bg-gray-100 rounded-full hidden sm:block" />
                        </div>

                        {courses?.length === 0 ? (
                              <EmptyState
                                    icon={<BookOpen className="h-8 w-8" />}
                                    title="Nenhum curso disponível"
                                    description="Novos cursos estão sendo preparados pelos nossos professores. Volte em breve para conferir!"
                                    action={
                                          <Link
                                                href="/"
                                                className="px-5 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                                          >
                                                Voltar ao Início
                                          </Link>
                                    }
                              />
                        ) : (
                              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {courses?.map((course) => (
                                          <CourseCard key={course.id} course={course} />
                                    ))}
                              </div>
                        )}
                  </div>
            </div>
      );
}
