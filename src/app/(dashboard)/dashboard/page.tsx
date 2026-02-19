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
            <div className="space-y-6">
                  <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Cursos Disponíveis</h1>
                        <p className="text-gray-500">Explore nossa biblioteca de cursos de francês.</p>
                  </div>

                  {courses?.length === 0 ? (
                        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
                              Nenhum curso encontrado.
                        </div>
                  ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                              {courses?.map((course) => (
                                    <CourseCard key={course.id} course={course} />
                              ))}
                        </div>
                  )}
            </div>
      );
}
