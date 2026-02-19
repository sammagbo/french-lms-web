"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CourseDetails } from "@/services/academy.service";
import {
      Accordion,
      AccordionContent,
      AccordionItem,
      AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { PlayCircle, CheckCircle } from "lucide-react";

interface CourseSidebarProps {
      course: CourseDetails;
}

export function CourseSidebar({ course }: CourseSidebarProps) {
      const pathname = usePathname();

      return (
            <div className="h-full border-r bg-gray-50/40">
                  <div className="p-6">
                        <h2 className="text-lg font-semibold tracking-tight">{course.title}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                              {course.modules.length} Módulos • {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Aulas
                        </p>
                  </div>
                  <div className="px-4 pb-4">
                        <Accordion type="multiple" defaultValue={course.modules.map(m => m.id)} className="w-full">
                              {course.modules.map((module, index) => (
                                    <AccordionItem key={module.id} value={module.id} className="border-b-0 mb-2">
                                          <AccordionTrigger className="hover:no-underline hover:bg-gray-100 rounded-md px-2 py-3">
                                                <span className="text-sm font-medium text-left">
                                                      Módulo {index + 1}: {module.title}
                                                </span>
                                          </AccordionTrigger>
                                          <AccordionContent className="pt-1 pb-2">
                                                <div className="flex flex-col space-y-1">
                                                      {module.lessons.map((lesson) => {
                                                            const isActive = pathname?.includes(`/lessons/${lesson.id}`);
                                                            return (
                                                                  <Link
                                                                        key={lesson.id}
                                                                        href={`/courses/${course.id}/lessons/${lesson.id}`}
                                                                        className={cn(
                                                                              "flex items-center gap-x-2 text-sm pl-4 pr-2 py-2 rounded-md transition-colors",
                                                                              isActive
                                                                                    ? "bg-blue-100 text-blue-700 font-medium"
                                                                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                                                        )}
                                                                  >
                                                                        <PlayCircle className={cn("h-4 w-4", isActive ? "text-blue-600" : "text-gray-400")} />
                                                                        <span className="truncate">{lesson.title}</span>
                                                                  </Link>
                                                            );
                                                      })}
                                                </div>
                                          </AccordionContent>
                                    </AccordionItem>
                              ))}
                        </Accordion>
                  </div>
            </div>
      );
}
