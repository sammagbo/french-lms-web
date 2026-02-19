"use client";

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { academyService } from '@/services/academy.service';
import { CourseSidebar } from '@/features/academy/components/course-sidebar';
import { Loader2, Menu } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function CourseLayout({
      children,
}: {
      children: React.ReactNode;
}) {
      const params = useParams();
      const courseId = params.courseId as string;
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);

      const { data: course, isLoading, isError } = useQuery({
            queryKey: ['course', courseId],
            queryFn: () => academyService.getCourseById(courseId),
            enabled: !!courseId,
      });

      if (isLoading) {
            return (
                  <div className="flex h-screen w-full items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
            );
      }

      if (isError || !course) {
            return (
                  <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
                        <p className="text-red-500">Erro ao carregar o curso.</p>
                        <Link href="/dashboard" className="text-blue-600 hover:underline">
                              Voltar ao Dashboard
                        </Link>
                  </div>
            );
      }

      return (
            <div className="flex h-screen overflow-hidden">
                  {/* Mobile Header */}
                  <div className="md:hidden fixed top-0 w-full h-14 border-b bg-white flex items-center justify-between px-4 z-40">
                        <span className="font-semibold truncate max-w-[200px]">{course.title}</span>
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                              <Menu className="h-6 w-6" />
                        </button>
                  </div>

                  {/* Sidebar (Desktop + Mobile Drawer Logic) */}
                  <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 transform bg-white transition-transform duration-200 ease-in-out md:relative md:translate-x-0 border-r
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                        <CourseSidebar course={course} />
                  </aside>

                  {/* Overlay for mobile sidebar */}
                  {isSidebarOpen && (
                        <div
                              className="fixed inset-0 z-40 bg-black/50 md:hidden"
                              onClick={() => setIsSidebarOpen(false)}
                        />
                  )}

                  {/* Main Content */}
                  <main className="flex-1 overflow-y-auto pt-14 md:pt-0 bg-white">
                        {children}
                  </main>
            </div>
      );
}
