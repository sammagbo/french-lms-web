import Link from 'next/link';
import { Course } from '@/services/academy.service';
import { BookOpen } from 'lucide-react';

interface CourseCardProps {
      course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
      return (
            <Link href={`/courses/${course.id}`} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
                  <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                        {/* Placeholder image logic since we don't have real images yet */}
                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                              <BookOpen className="h-12 w-12" />
                        </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                        <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                              {course.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                              {course.description || 'Sem descrição.'}
                        </p>
                        <div className="mt-auto pt-4 flex items-center justify-between">
                              <span className="text-lg font-bold text-gray-900">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(course.price)}
                              </span>
                              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                                    {course.isPublished ? 'Disponível' : 'Em breve'}
                              </span>
                        </div>
                  </div>
            </Link>
      );
}
