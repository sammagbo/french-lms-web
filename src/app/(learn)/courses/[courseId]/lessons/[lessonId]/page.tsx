"use client";

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { academyService } from '@/services/academy.service';
import { classroomService, SubmissionStatus } from '@/services/classroom.service';
import { Loader2, ChevronLeft, ChevronRight, PlayCircle, BookOpen, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SubmissionForm } from '@/features/classroom/components/submission-form';
import { FeedbackView } from '@/features/classroom/components/feedback-view';
import Markdown from 'markdown-to-jsx';
import { RichText, DocumentAlert } from '@/components/ui/rich-text';

export default function LessonPage() {
      const params = useParams();
      const courseId = params.courseId as string;
      const lessonId = params.lessonId as string;
      const router = useRouter();

      // Retrieve course data
      const { data: course, isLoading: isLoadingCourse } = useQuery({
            queryKey: ['course', courseId],
            queryFn: () => academyService.getCourseById(courseId),
            enabled: !!courseId,
      });

      // Retrieve submission status for this lesson (Mocking/Assuming endpoint exists or filtering from all pending/assignments)
      // Ideally: GET /classroom/lessons/{lessonId}/submission OR filter from my-assignments
      // For now, let's fetch all assignments and find the one matching this lessonId. 
      // This is not efficient for production but works for now given the current service methods.
      const { data: assignments, isLoading: isLoadingAssignments } = useQuery({
            queryKey: ['assignments'],
            queryFn: classroomService.getMyAssignments,
      });

      const assignment = assignments?.find(a => a.activity.lessonId === lessonId);

      if (isLoadingCourse || !course || isLoadingAssignments) {
            return (
                  <div className="flex h-full w-full items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
            );
      }

      // Find current lesson and navigation
      const flatLessons = course.modules.flatMap(m => m.lessons);
      const currentLessonIndex = flatLessons.findIndex(l => l.id === lessonId);
      const currentLesson = flatLessons[currentLessonIndex];

      const prevLesson = flatLessons[currentLessonIndex - 1];
      const nextLesson = flatLessons[currentLessonIndex + 1];

      if (!currentLesson) {
            return <div className="p-8 text-center text-gray-500">Aula não encontrada.</div>;
      }

      return (
            <div className="flex flex-col min-h-full bg-gray-50/50">
                  {/* Main Video Area with Ambient Glow */}
                  <div className="w-full bg-zinc-950 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-600/5 blur-3xl transition-opacity group-hover:opacity-20" />
                        <div className="mx-auto max-w-5xl aspect-video w-full relative z-10 shadow-2xl">
                              {currentLesson.videoUrl ? (
                                    <iframe
                                          src={currentLesson.videoUrl}
                                          className="w-full h-full"
                                          allowFullScreen
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                          title={currentLesson.title}
                                    />
                              ) : (
                                    <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-900/50 text-white backdrop-blur-sm">
                                          <PlayCircle className="h-20 w-20 mb-4 text-blue-500/50 animate-pulse" />
                                          <p className="text-zinc-400 font-medium tracking-wide">Vídeo indisponível</p>
                                    </div>
                              )}
                        </div>
                  </div>

                  {/* Content Area with Glass Effect */}
                  <div className="mx-auto w-full max-w-4xl p-6 md:p-12 space-y-10">
                        <div className="space-y-2">
                              <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em]">Aula Atual</span>
                              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{currentLesson.title}</h1>
                        </div>

                        {/* Lesson Content (Rich Document) */}
                        <div className="bg-white/60 p-8 rounded-3xl border border-white/80 shadow-sm backdrop-blur-[4px]">
                              {currentLesson.content ? (
                                    <RichText className="prose-lg text-gray-800 leading-relaxed">
                                          <Markdown options={{
                                                overrides: {
                                                      DocumentAlert: {
                                                            component: DocumentAlert
                                                      }
                                                }
                                          }}>
                                                {currentLesson.content}
                                          </Markdown>
                                    </RichText>
                              ) : (
                                    <p className="text-zinc-400 italic flex items-center gap-2">
                                          <BookOpen className="h-5 w-5 opacity-50" />
                                          Explore o conteúdo desta aula através do vídeo acima.
                                    </p>
                              )}
                        </div>

                        {/* Activity Area - Premium Card */}
                        {assignment && (
                              <div className="mt-16 bg-white rounded-3xl p-8 shadow-xl shadow-blue-900/5 border border-blue-50 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5">
                                          <PlusCircle className="h-24 w-24 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                                          <span className="h-8 w-1.5 bg-blue-600 rounded-full" />
                                          Atividade Prática
                                    </h2>

                                    <div className="relative z-10">
                                          <FeedbackView submission={assignment} />
                                          {assignment.status !== SubmissionStatus.GRADED && (
                                                <div className="mt-8">
                                                      <SubmissionForm
                                                            activityId={assignment.activity.id}
                                                            currentStatus={assignment.status}
                                                            lessonId={lessonId}
                                                      />
                                                </div>
                                          )}
                                    </div>
                              </div>
                        )}

                        {/* Navigation Footer - Glass Navigation */}
                        <div className="flex items-center justify-between border-t border-gray-100 pt-10 mt-10">
                              {prevLesson ? (
                                    <Link
                                          href={`/courses/${courseId}/lessons/${prevLesson.id}`}
                                          className="group flex items-center gap-4 text-sm font-medium p-4 pr-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all"
                                    >
                                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                <ChevronLeft className="h-5 w-5" />
                                          </div>
                                          <div className="flex flex-col items-start">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Anterior</span>
                                                <span className="text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{prevLesson.title}</span>
                                          </div>
                                    </Link>
                              ) : (
                                    <div />
                              )}

                              {nextLesson ? (
                                    <Link
                                          href={`/courses/${courseId}/lessons/${nextLesson.id}`}
                                          className="group flex flex-row-reverse items-center gap-4 text-sm font-medium p-4 pl-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all"
                                    >
                                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <ChevronRight className="h-5 w-5" />
                                          </div>
                                          <div className="flex flex-col items-end">
                                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-0.5">Próxima Aula</span>
                                                <span className="text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{nextLesson.title}</span>
                                          </div>
                                    </Link>
                              ) : (
                                    <div className="flex flex-row-reverse items-center gap-4 text-sm font-medium p-4 pl-6 rounded-2xl bg-gray-50 border border-gray-100 opacity-60">
                                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                                                <ChevronRight className="h-5 w-5" />
                                          </div>
                                          <div className="flex flex-col items-end">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Fim da Jornada</span>
                                                <span className="text-gray-400">Curso Concluído</span>
                                          </div>
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      );
}
