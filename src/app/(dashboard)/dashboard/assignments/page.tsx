"use client";

import { useQuery } from '@tanstack/react-query';
import { classroomService } from '@/services/classroom.service';
import { AssignmentCard } from '@/features/classroom/components/assignment-card';
import { EmptyState } from '@/components/ui/empty-state';
import { AssignmentsSkeleton } from '@/components/ui/skeleton';
import { Inbox, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AssignmentsPage() {
      const { data: assignments, isLoading, isError } = useQuery({
            queryKey: ['assignments'],
            queryFn: classroomService.getMyAssignments,
      });

      if (isLoading) {
            return <AssignmentsSkeleton />;
      }

      if (isError) {
            return (
                  <div className="max-w-5xl mx-auto">
                        <EmptyState
                              icon={<AlertTriangle className="h-8 w-8" />}
                              title="Erro ao carregar tarefas"
                              description="Não foi possível buscar suas tarefas. Verifique sua conexão e tente novamente."
                              action={
                                    <button
                                          onClick={() => window.location.reload()}
                                          className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
                                    >
                                          Tentar Novamente
                                    </button>
                              }
                        />
                  </div>
            );
      }

      const pending = assignments?.filter(a => a.status === 'PENDING') || [];
      const completed = assignments?.filter(a => a.status !== 'PENDING') || [];

      return (
            <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Minhas Tarefas</h1>
                        <p className="text-gray-500">Gerencie suas atividades e prazos.</p>
                  </div>

                  {assignments?.length === 0 ? (
                        <EmptyState
                              icon={<CheckCircle className="h-8 w-8" />}
                              title="Tudo em dia! 🎉"
                              description="Você não tem tarefas pendentes no momento. Bom trabalho! Continue assim."
                        />
                  ) : (
                        <>
                              {/* Pending Section */}
                              <section>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                          Pendentes
                                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">{pending.length}</span>
                                    </h2>
                                    {pending.length > 0 ? (
                                          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                {pending.map((assignment) => (
                                                      <AssignmentCard key={assignment.id} assignment={assignment} />
                                                ))}
                                          </div>
                                    ) : (
                                          <EmptyState
                                                icon={<Inbox className="h-8 w-8" />}
                                                title="Nenhuma tarefa pendente"
                                                description="Todas as suas tarefas foram concluídas. Parabéns!"
                                          />
                                    )}
                              </section>

                              {/* Completed Section */}
                              {completed.length > 0 && (
                                    <section>
                                          <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-8 flex items-center gap-2">
                                                Concluídas
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">{completed.length}</span>
                                          </h2>
                                          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                {completed.map((assignment) => (
                                                      <AssignmentCard key={assignment.id} assignment={assignment} />
                                                ))}
                                          </div>
                                    </section>
                              )}
                        </>
                  )}
            </div>
      );
}
