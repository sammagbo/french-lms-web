"use client";

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { classroomService, SubmissionStatus } from '@/services/classroom.service';
import { Loader2, Send, CheckCircle, FileText, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';

interface SubmissionFormProps {
      activityId: string;
      currentStatus: SubmissionStatus;
      lessonId?: string; // For invalidation purposes if needed
}

interface SubmissionFormData {
      textContent: string;
      attachmentUrl: string;
}

export function SubmissionForm({ activityId, currentStatus, lessonId }: SubmissionFormProps) {
      const queryClient = useQueryClient();
      const [isExpanded, setIsExpanded] = useState(false);

      // Status Check: Only show form if PENDING or RETURNED
      const canSubmit = currentStatus === SubmissionStatus.PENDING || currentStatus === SubmissionStatus.RETURNED;

      const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
      } = useForm<SubmissionFormData>();

      const submitMutation = useMutation({
            mutationFn: (data: SubmissionFormData) => classroomService.submitActivity({
                  activityId,
                  textContent: data.textContent,
                  attachmentUrl: data.attachmentUrl,
            }),
            onSuccess: () => {
                  alert('Atividade enviada com sucesso!');
                  reset();
                  setIsExpanded(false);
                  // Invalidate queries to refresh status
                  queryClient.invalidateQueries({ queryKey: ['assignments'] });
                  // If we had a query for specific lesson activities, invalidate it too
                  if (lessonId) {
                        queryClient.invalidateQueries({ queryKey: ['course'] }); // Or specific lesson keys
                  }
                  // Force page refresh or optimized update could be here
                  window.location.reload();
            },
            onError: (error: any) => {
                  const message = error.response?.data?.message || 'Erro ao enviar atividade';
                  alert(message);
            },
      });

      const onSubmit = (data: SubmissionFormData) => {
            submitMutation.mutate(data);
      };

      const isLoading = submitMutation.isPending;

      if (!canSubmit) {
            return (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                        <div className="flex items-center gap-3 text-green-800">
                              <CheckCircle className="h-6 w-6" />
                              <div>
                                    <h3 className="font-semibold">Atividade Enviada</h3>
                                    <p className="text-sm">Sua tarefa foi enviada e está aguardando correção/avaliação.</p>
                              </div>
                        </div>
                  </div>
            );
      }

      return (
            <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
                  <div
                        className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => setIsExpanded(!isExpanded)}
                  >
                        <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <h3 className="font-semibold text-gray-800">Sua Resposta</h3>
                        </div>
                        <span className="text-xs text-blue-600 font-medium">
                              {isExpanded ? 'Recolher' : 'Expandir para responder'}
                        </span>
                  </div>

                  {isExpanded && (
                        <div className="p-6">
                              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                          <label htmlFor="textContent" className="block text-sm font-medium text-gray-700 mb-1">
                                                Sua Resposta
                                          </label>
                                          <textarea
                                                id="textContent"
                                                rows={4}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                                placeholder="Escreva sua resposta ou cole o link aqui..."
                                                disabled={isLoading}
                                                {...register('textContent', { required: 'Digite uma resposta para enviar.' })}
                                          />
                                          {errors.textContent && (
                                                <p className="mt-1 text-sm text-red-600">{errors.textContent.message}</p>
                                          )}
                                    </div>

                                    <div>
                                          <label htmlFor="attachmentUrl" className="block text-sm font-medium text-gray-700 mb-1">
                                                Link do Arquivo ou Áudio (Opcional)
                                          </label>
                                          <div className="relative rounded-md shadow-sm">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                      <LinkIcon className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input
                                                      type="url"
                                                      id="attachmentUrl"
                                                      className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                                      placeholder="https://..."
                                                      disabled={isLoading}
                                                      {...register('attachmentUrl')}
                                                />
                                          </div>
                                    </div>

                                    <div className="pt-2">
                                          <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                                          >
                                                {isLoading ? (
                                                      <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Enviando...
                                                      </>
                                                ) : (
                                                      <>
                                                            <Send className="mr-2 h-4 w-4" />
                                                            Enviar Tarefa
                                                      </>
                                                )}
                                          </button>
                                    </div>
                              </form>
                        </div>
                  )}
            </div>
      );
}
