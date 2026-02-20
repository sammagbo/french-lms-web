"use client";

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { academyService } from '@/services/academy.service';
import { Loader2, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CourseOverviewPage() {
      const params = useParams();
      const courseId = params.courseId as string;

      const { data: course, isLoading } = useQuery({
            queryKey: ['course', courseId],
            queryFn: () => academyService.getCourseById(courseId),
            enabled: !!courseId,
      });

      if (isLoading) {
            return (
                  <div className="flex w-full h-full min-h-[50vh] items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  </div>
            );
      }

      if (!course) {
            return (
                  <div className="flex w-full h-full min-h-[50vh] items-center justify-center p-8">
                        <div className="text-center">
                              <h2 className="text-2xl font-bold text-gray-800">Curso não encontrado.</h2>
                        </div>
                  </div>
            );
      }

      return (
            <div className="p-8 md:p-12 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center">
                  <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                        <BookOpen className="w-12 h-12 text-blue-600" />
                  </div>
                  <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Bem-vindo(a) ao <span className="text-blue-600">{course.title}</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                        {course.description || "Prepare-se para embarcar numa jornada incrível de aprendizado."}
                  </p>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
                        <h3 className="font-semibold text-gray-800 mb-2">Como começar?</h3>
                        <p className="text-gray-600 text-sm">
                              Utilize o menu lateral para navegar entre os módulos e aulas disponíveis.
                              O seu progresso será salvo automaticamente.
                        </p>
                  </div>
            </div>
      );
}
