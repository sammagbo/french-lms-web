"use client";

import { useQuery } from '@tanstack/react-query';
import { classroomService } from '@/services/classroom.service';
import { AssignmentCard } from '@/features/classroom/components/assignment-card';
import { Loader2, Inbox } from 'lucide-react';

export default function AssignmentsPage() {
      const { data: assignments, isLoading, isError } = useQuery({
            queryKey: ['assignments'],
            queryFn: classroomService.getMyAssignments,
      });

      if (isLoading) {
            return (
                  <div className="flex h-[50vh] w-full items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
            );
      }

      if (isError) {
            return (
                  <div className="flex h-[50vh] w-full items-center justify-center text-red-500">
                        Erro ao carregar tarefas.
                  </div>
            );
      }

      const pending = assignments?.filter(a => a.status === 'PENDING') || [];
      const completed = assignments?.filter(a => a.status !== 'PENDING') || [];

      return (
            <div className="space-y-8 max-w-5xl mx-auto">
                  <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Minhas Tarefas</h1>
                        <p className="text-gray-500">Gerencie suas atividades e prazos.</p>
                  </div>

                  {assignments?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                              <Inbox className="h-12 w-12 text-gray-300 mb-4" />
                              <h3 className="text-lg font-medium text-gray-900">Tudo em dia!</h3>
                              <p className="text-gray-500">Você não tem tarefas pendentes no momento.</p>
                        </div>
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
                                          <p className="text-sm text-gray-500 italic">Nenhuma tarefa pendente.</p>
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
