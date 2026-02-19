import Link from 'next/link';
import { Course } from '@/services/academy.service';
import { BookOpen, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';

interface CourseCardProps {
      course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
      return (
            <Link
                  href={`/courses/${course.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-100"
            >
                  <div className="relative aspect-video w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                        <div className="flex h-full w-full items-center justify-center text-gray-300 transition-transform duration-500 group-hover:scale-110">
                              <BookOpen className="h-12 w-12" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                        <h3 className="line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                              {course.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
                              {course.description || 'Comece sua jornada no idioma francês hoje mesmo com este curso estruturado.'}
                        </p>
                        <div className="mt-auto pt-5 flex items-center justify-between">
                              <div className="flex flex-col">
                                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Investimento</span>
                                    <span className="text-xl font-extrabold text-blue-600">
                                          {formatPrice(course.price)}
                                    </span>
                              </div>
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white">
                                    <ArrowRight className="h-5 w-5" />
                              </div>
                        </div>
                  </div>
            </Link>
      );
}
