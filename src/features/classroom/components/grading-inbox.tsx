"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { teacherService, PendingSubmission } from "@/services/teacher.service";
import { Loader2, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

// --- Grading Form Schema ---
const gradingSchema = z.object({
      grade: z.coerce.number().min(0, "Nota mínima é 0").max(10, "Nota máxima é 10"),
      feedback: z.string().min(5, "Feedback deve ter pelo menos 5 caracteres"),
});

type GradingForm = z.infer<typeof gradingSchema>;

// --- Components ---

function GradingModal({ submission, onClose, onGraded }: { submission: PendingSubmission, onClose: () => void, onGraded: () => void }) {
      const { register, handleSubmit, formState: { errors } } = useForm<GradingForm>({
            resolver: zodResolver(gradingSchema) as any,
      });

      const gradeMutation = useMutation({
            mutationFn: (data: GradingForm) => teacherService.gradeSubmission({
                  submissionId: submission.id,
                  grade: data.grade,
                  feedback: data.feedback,
            }),
            onSuccess: () => {
                  alert("Atividade corrigida com sucesso!");
                  onGraded();
                  onClose();
            },
            onError: (e) => alert("Erro ao corrigir: " + e),
      });

      const onSubmit = (data: GradingForm) => {
            gradeMutation.mutate(data);
      };

      return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                        <h3 className="text-xl font-bold mb-4">Corrigir Atividade: {submission.activity.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">Aluno: <span className="font-medium text-gray-700">{submission.student.name || submission.student.email}</span></p>

                        <div className="bg-gray-50 p-4 rounded mb-4 border">
                              <h4 className="text-sm font-semibold mb-1">Resposta do Aluno:</h4>
                              <p className="text-gray-700 whitespace-pre-wrap">{submission.content}</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                              <div>
                                    <label className="block text-sm font-medium mb-1">Nota (0-10)</label>
                                    <input type="number" step="0.1" {...register("grade")} disabled={gradeMutation.isPending} className="w-full p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed" autoFocus />
                                    {errors.grade && <p className="text-red-500 text-sm">{errors.grade.message}</p>}
                              </div>

                              <div>
                                    <label className="block text-sm font-medium mb-1">Feedback</label>
                                    <textarea {...register("feedback")} disabled={gradeMutation.isPending} className="w-full p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed" rows={3} placeholder="Escreva seu feedback aqui..." />
                                    {errors.feedback && <p className="text-red-500 text-sm">{errors.feedback.message}</p>}
                              </div>

                              <div className="flex justify-end gap-2 mt-6">
                                    <button type="button" onClick={onClose} disabled={gradeMutation.isPending} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed">Cancelar</button>
                                    <button
                                          type="submit"
                                          disabled={gradeMutation.isPending}
                                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                                    >
                                          {gradeMutation.isPending && <Loader2 className="animate-spin w-4 h-4" />}
                                          {gradeMutation.isPending ? 'Salvando...' : 'Enviar Correção'}
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
}

export function GradingInbox() {
      const [selectedSubmission, setSelectedSubmission] = useState<PendingSubmission | null>(null);

      const { data: submissions, isLoading, refetch } = useQuery({
            queryKey: ['teacher-inbox'],
            queryFn: teacherService.getPendingSubmissions,
      });

      if (isLoading) return <div className="flex items-center justify-center p-8"><Loader2 className="animate-spin w-8 h-8 text-blue-600" /></div>;

      return (
            <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-500" />
                        Aguardando Correção ({submissions?.length || 0})
                  </h2>

                  {submissions?.length === 0 ? (
                        <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed">
                              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                              <p className="text-gray-600">Tudo limpo! Nenhuma atividade pendente.</p>
                        </div>
                  ) : (
                        <div className="bg-white rounded-lg shadow overflow-hidden border">
                              <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                          <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aluno</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atividade</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enviado em</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                                          </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                          {submissions?.map((sub) => (
                                                <tr key={sub.id} className="hover:bg-gray-50">
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">{sub.student.name || "Sem nome"}</div>
                                                            <div className="text-sm text-gray-500">{sub.student.email}</div>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{sub.activity.title}</div>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(sub.submittedAt).toLocaleDateString('pt-BR')}
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button
                                                                  onClick={() => setSelectedSubmission(sub)}
                                                                  className="text-blue-600 hover:text-blue-900 font-semibold"
                                                            >
                                                                  Corrigir
                                                            </button>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  )}

                  {selectedSubmission && (
                        <GradingModal
                              submission={selectedSubmission}
                              onClose={() => setSelectedSubmission(null)}
                              onGraded={() => {
                                    refetch();
                                    setSelectedSubmission(null);
                              }}
                        />
                  )}
            </div>
      );
}
