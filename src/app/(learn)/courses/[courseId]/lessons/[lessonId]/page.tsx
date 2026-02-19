"use client";

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { academyService } from '@/services/academy.service';
import { classroomService, SubmissionStatus } from '@/services/classroom.service';
import { Loader2, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SubmissionForm } from '@/features/classroom/components/submission-form';
import { FeedbackView } from '@/features/classroom/components/feedback-view';

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
            <div className="flex flex-col min-h-full">
                  {/* Main Video Area */}
                  <div className="w-full bg-black">
                        <div className="mx-auto max-w-5xl aspect-video w-full">
                              {currentLesson.videoUrl ? (
                                    <iframe
                                          src={currentLesson.videoUrl}
                                          className="w-full h-full"
                                          allowFullScreen
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                          title={currentLesson.title}
                                    />
                              ) : (
                                    <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-900 text-white">
                                          <PlayCircle className="h-16 w-16 mb-4 opacity-50" />
                                          <p>Vídeo indisponível</p>
                                    </div>
                              )}
                        </div>
                  </div>

                  {/* Content Area */}
                  <div className="mx-auto w-full max-w-4xl p-6 md:p-10 space-y-8">
                        <div>
                              <h1 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h1>
                        </div>

                        {/* Lesson Content (Text/HTML) */}
                        <div className="prose prose-blue max-w-none">
                              {currentLesson.content ? (
                                    <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                              ) : (
                                    <p className="text-gray-500 italic">Sem conteúdo em texto para esta aula.</p>
                              )}
                        </div>

                        {/* Activity Area */}
                        {assignment && (
                              <div className="mt-12 border-t pt-8 space-y-6">
                                    <h2 className="text-xl font-bold text-gray-800">Atividade da Aula</h2>

                                    {/* Show Feedback if Graded/Returned/Submitted with feedback, otherwise Form */}
                                    <FeedbackView submission={assignment} />

                                    {/* Show Form only if not graded (or returned) */}
                                    {assignment.status !== SubmissionStatus.GRADED && (
                                          <SubmissionForm
                                                activityId={assignment.activity.id}
                                                currentStatus={assignment.status}
                                                lessonId={lessonId}
                                          />
                                    )}
                              </div>
                        )}


                        {/* Navigation Footer */}
                        <div className="flex items-center justify-between border-t pt-8 mt-8">
                              {prevLesson ? (
                                    <Link
                                          href={`/courses/${courseId}/lessons/${prevLesson.id}`}
                                          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                          <ChevronLeft className="h-4 w-4" />
                                          <div className="flex flex-col items-start">
                                                <span className="text-xs text-gray-400">Aula Anterior</span>
                                                <span>{prevLesson.title}</span>
                                          </div>
                                    </Link>
                              ) : (
                                    <div /> /* Spacer */
                              )}

                              {nextLesson ? (
                                    <Link
                                          href={`/courses/${courseId}/lessons/${nextLesson.id}`}
                                          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                          <div className="flex flex-col items-end">
                                                <span className="text-xs text-gray-400">Próxima Aula</span>
                                                <span>{nextLesson.title}</span>
                                          </div>
                                          <ChevronRight className="h-4 w-4" />
                                    </Link>
                              ) : (
                                    <button
                                          disabled
                                          className="flex items-center gap-2 text-sm font-medium text-gray-300 cursor-not-allowed"
                                    >
                                          <div className="flex flex-col items-end">
                                                <span className="text-xs">Final do Curso</span>
                                          </div>
                                          <ChevronRight className="h-4 w-4" />
                                    </button>
                              )}
                        </div>
                  </div>
            </div>
      );
}
