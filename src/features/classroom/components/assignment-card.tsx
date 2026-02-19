import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { StudentActivity, SubmissionStatus } from '@/services/classroom.service';
import Link from 'next/link';
import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssignmentCardProps {
      assignment: StudentActivity;
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
      const { activity, status } = assignment;

      const statusColors = {
            [SubmissionStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            [SubmissionStatus.SUBMITTED]: 'bg-blue-100 text-blue-800 border-blue-200',
            [SubmissionStatus.GRADED]: 'bg-green-100 text-green-800 border-green-200',
            [SubmissionStatus.RETURNED]: 'bg-red-100 text-red-800 border-red-200',
      };

      const statusLabels = {
            [SubmissionStatus.PENDING]: 'Pendente',
            [SubmissionStatus.SUBMITTED]: 'Enviado',
            [SubmissionStatus.GRADED]: 'Avaliado',
            [SubmissionStatus.RETURNED]: 'Devolvido',
      };

      const isOverdue = activity.dueDate && new Date(activity.dueDate) < new Date() && status === SubmissionStatus.PENDING;

      // Assuming we can link back to the lesson. If we don't have courseId in activity, we need it.
      // For now, let's assume we pass lesson link or activity link. 
      // Let's assume URL structure: /courses/[courseId]/lessons/[lessonId]?activity=[activityId]
      // Backend needs to return courseId for robust linking. 
      // Fallback: Link to specific activity page /assignments/[id] (To be implemented)
      const href = `/courses/${activity.courseId || 'unknown'}/lessons/${activity.lessonId}`;

      return (
            <div className={cn(
                  "flex flex-col rounded-lg border bg-white p-5 shadow-sm transition-all hover:shadow-md",
                  isOverdue && "border-red-200 bg-red-50"
            )}>
                  <div className="flex items-start justify-between">
                        <div className="space-y-1">
                              <h3 className="font-semibold text-gray-900 line-clamp-1">{activity.title}</h3>
                              <p className="text-sm text-gray-500 line-clamp-2">{activity.description || 'Sem descrição.'}</p>
                        </div>
                        <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border", statusColors[status])}>
                              {statusLabels[status]}
                        </span>
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                        {activity.dueDate && (
                              <div className={cn("flex items-center gap-1", isOverdue ? "text-red-600 font-medium" : "")}>
                                    <Calendar className="h-4 w-4" />
                                    <span>{format(new Date(activity.dueDate), "dd 'de' MMM", { locale: ptBR })}</span>
                              </div>
                        )}
                        {isOverdue && (
                              <div className="flex items-center gap-1 text-red-600">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>Atrasado</span>
                              </div>
                        )}
                  </div>

                  <div className="mt-5 pt-4 border-t flex items-center justify-between">
                        <div className="text-xs text-gray-400">
                              {status === SubmissionStatus.GRADED && assignment.grade !== null && (
                                    <span className="font-bold text-green-700 text-base">{assignment.grade}/10</span>
                              )}
                        </div>
                        <Link
                              href={href}
                              className={cn(
                                    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                                    "bg-blue-600 text-white shadow hover:bg-blue-700 h-9 px-4 py-2",
                                    status !== SubmissionStatus.PENDING && "bg-gray-100 text-gray-900 shadow-none hover:bg-gray-200"
                              )}
                        >
                              {status === SubmissionStatus.PENDING ? 'Fazer Agora' : 'Ver Detalhes'}
                        </Link>
                  </div>
            </div>
      );
}
