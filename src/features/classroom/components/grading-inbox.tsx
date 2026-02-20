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
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 w-full max-w-lg relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                        <h3 className="text-2xl font-bold mb-4 text-slate-800 tracking-tight">Corrigir Atividade</h3>
                        <p className="text-lg text-slate-600 mb-6 font-medium">{submission.activity.title}</p>
                        <p className="text-sm text-slate-500 mb-2">Aluno: <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-md">{submission.student.name || submission.student.email}</span></p>

                        <div className="bg-slate-50 p-5 rounded-2xl mb-6 border border-slate-200 shadow-inner">
                              <h4 className="text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Resposta do Aluno</h4>
                              <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">{submission.content}</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                              <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nota (0-10)</label>
                                    <input type="number" step="0.1" {...register("grade")} disabled={gradeMutation.isPending} className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 disabled:opacity-50 disabled:bg-slate-100 shadow-sm text-lg font-medium" autoFocus placeholder="0.0" />
                                    {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>}
                              </div>

                              <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Feedback Detalhado</label>
                                    <textarea {...register("feedback")} disabled={gradeMutation.isPending} className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 disabled:opacity-50 disabled:bg-slate-100 shadow-sm resize-none" rows={4} placeholder="Excelente trabalho! Continue assim..." />
                                    {errors.feedback && <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>}
                              </div>

                              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                                    <button type="button" onClick={onClose} disabled={gradeMutation.isPending} className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Cancelar</button>
                                    <button
                                          type="submit"
                                          disabled={gradeMutation.isPending}
                                          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2.5 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
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
            <div className="space-y-6">
                  <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                              <div className="bg-orange-100 p-2 rounded-xl">
                                    <Clock className="w-6 h-6 text-orange-600" />
                              </div>
                              Aguardando Correção
                              <span className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full">{submissions?.length || 0}</span>
                        </h2>
                  </div>

                  {submissions?.length === 0 ? (
                        <div className="p-12 text-center bg-emerald-50/50 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-sm">
                              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                              </div>
                              <h3 className="text-2xl font-bold text-emerald-800 mb-2">Tudo limpo!</h3>
                              <p className="text-emerald-600 text-lg">Nenhuma atividade pendente de correção no momento.</p>
                        </div>
                  ) : (
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-200">
                              <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-slate-200">
                                          <thead className="bg-slate-50/80">
                                                <tr>
                                                      <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Aluno</th>
                                                      <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Atividade</th>
                                                      <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Enviado em</th>
                                                      <th className="px-8 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Ação</th>
                                                </tr>
                                          </thead>
                                          <tbody className="bg-white/40 divide-y divide-slate-100">
                                                {submissions?.map((sub) => (
                                                      <tr key={sub.id} className="hover:bg-blue-50/50 transition-colors">
                                                            <td className="px-8 py-5 whitespace-nowrap">
                                                                  <div className="text-sm font-bold text-slate-900">{sub.student.name || "Sem nome"}</div>
                                                                  <div className="text-sm text-slate-500 font-medium">{sub.student.email}</div>
                                                            </td>
                                                            <td className="px-8 py-5 whitespace-nowrap">
                                                                  <div className="text-sm font-medium text-slate-800 bg-slate-100 inline-block px-3 py-1 rounded-lg">{sub.activity.title}</div>
                                                            </td>
                                                            <td className="px-8 py-5 whitespace-nowrap text-sm text-slate-600 font-medium">
                                                                  {new Date(sub.submittedAt).toLocaleDateString('pt-BR')}
                                                            </td>
                                                            <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                                                                  <button
                                                                        onClick={() => setSelectedSubmission(sub)}
                                                                        className="bg-blue-100 hover:bg-blue-600 text-blue-700 hover:text-white px-4 py-2 rounded-xl transition-all shadow-sm"
                                                                  >
                                                                        Corrigir
                                                                  </button>
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
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
