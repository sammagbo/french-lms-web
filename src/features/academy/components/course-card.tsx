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
                  className="group relative flex flex-col overflow-hidden rounded-[32px] border border-slate-200/50 bg-white shadow-opal transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
                  <div className="relative aspect-video w-full bg-slate-50 overflow-hidden">
                        <div className="flex h-full w-full items-center justify-center text-slate-200 transition-transform duration-700 group-hover:scale-110">
                              <BookOpen className="h-16 w-16" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 space-y-3">
                        <h3 className="line-clamp-2 text-xl font-black text-slate-900 leading-tight transition-colors group-hover:text-blue-600">
                              {course.title}
                        </h3>
                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">
                              {course.description || 'Comece sua jornada no idioma francês hoje mesmo com este curso estruturado.'}
                        </p>
                        <div className="pt-4 flex items-center justify-between mt-auto">
                              <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Investimento</span>
                                    <span className="text-2xl font-black text-blue-600 tracking-tight">
                                          {formatPrice(course.price)}
                                    </span>
                              </div>
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100 transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-12">
                                    <ArrowRight className="h-6 w-6" />
                              </div>
                        </div>
                  </div>
            </Link>
      );
}
