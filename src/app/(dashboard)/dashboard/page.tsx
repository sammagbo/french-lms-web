"use client";

import { useQuery } from '@tanstack/react-query';
import { academyService } from '@/services/academy.service';
import { CourseCard } from '@/features/academy/components/course-card';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
      const { data: courses, isLoading, isError } = useQuery({
            queryKey: ['courses'],
            queryFn: academyService.getCourses,
      });

      if (isLoading) {
            return (
                  <div className="flex h-[50vh] w-full items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
            );
      }

      if (isError) {
            return (
                  <div className="flex h-[50vh] w-full items-center justify-center text-red-500">
                        Erro ao carregar cursos. Tente novamente mais tarde.
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
                              <div className="rounded-3xl border border-dashed border-gray-300 p-12 text-center bg-gray-50/50">
                                    <p className="text-gray-500">Nenhum curso encontrado no momento. Volte em breve!</p>
                              </div>
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
