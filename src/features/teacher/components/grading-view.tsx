"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Play, Pause, CheckCircle, FileText, Mic } from "lucide-react";
import { teacherService, PendingSubmission } from "@/services/teacher.service";
import { cn } from "@/lib/utils";

// --- Form Schema ---
const gradingSchema = z.object({
      grade: z.coerce.number().min(0, "A nota deve ser no mínimo 0").max(10, "A nota deve ser no máximo 10"),
      feedback: z.string().min(5, "O feedback deve ter pelo menos 5 caracteres"),
});

type GradingForm = z.infer<typeof gradingSchema>;

interface GradingViewProps {
      submission: PendingSubmission;
      onClose: () => void;
}

export function GradingView({ submission, onClose }: GradingViewProps) {
      const queryClient = useQueryClient();
      const [isPlaying, setIsPlaying] = useState(false); // Mock for audio player state

      const { register, handleSubmit, formState: { errors } } = useForm<GradingForm>({
            resolver: zodResolver(gradingSchema) as any,
            defaultValues: { grade: 0.0 }
      });

      const gradeMutation = useMutation({
            mutationFn: (data: GradingForm) => teacherService.gradeSubmission({
                  submissionId: submission.id,
                  grade: data.grade,
                  feedback: data.feedback,
            }),
            onSuccess: () => {
                  // Invalidate the list query to remove the item from the pending list
                  queryClient.invalidateQueries({ queryKey: ['teacher-inbox'] });
                  alert("Avaliação salva com sucesso!");
                  onClose();
            },
            onError: (e) => alert("Erro ao salvar avaliação: " + e)
      });

      const onSubmit = (data: GradingForm) => {
            gradeMutation.mutate(data);
      };

      const isAudio = submission.content.startsWith("http") && (submission.content.endsWith(".mp3") || submission.content.endsWith(".wav") || submission.content.includes("audio"));
      // Simple heuristic for audio - in real app, type would be explicit from backend

      return (
            <div className="flex flex-col md:flex-row h-full gap-6 p-6 bg-white rounded-lg shadow-sm border h-[calc(100vh-100px)]">

                  {/* Left Column: Student Work */}
                  <div className="flex-1 overflow-y-auto border-r pr-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Trabalho do Aluno</h3>

                        <div className="mb-6">
                              <h4 className="text-sm font-semibold text-gray-500 mb-1">Aluno</h4>
                              <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                          {submission.student.name?.charAt(0) || "A"}
                                    </div>
                                    <div>
                                          <p className="font-medium">{submission.student.name || "Sem Nome"}</p>
                                          <p className="text-sm text-gray-400">{submission.student.email}</p>
                                    </div>
                              </div>
                        </div>

                        <div className="mb-6">
                              <h4 className="text-sm font-semibold text-gray-500 mb-1">Atividade</h4>
                              <p className="text-lg font-medium">{submission.activity.title}</p>
                              <p className="text-sm text-gray-400">Enviado em: {new Date(submission.submittedAt).toLocaleDateString()}</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border">
                              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                                    Resposta Enviada
                              </h4>

                              {isAudio ? (
                                    <div className="flex flex-col items-center justify-center p-8 bg-white border rounded shadow-sm">
                                          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                                <button
                                                      onClick={() => setIsPlaying(!isPlaying)}
                                                      className="text-blue-600 hover:text-blue-800 transition-colors"
                                                >
                                                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                                                </button>
                                          </div>
                                          <p className="text-sm font-medium mb-2">Áudio da Apresentação</p>
                                          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                                <div className={cn("h-full bg-blue-500 transition-all duration-300", isPlaying ? "w-2/3" : "w-0")}></div>
                                          </div>
                                          <p className="text-xs text-gray-400 mt-2">{submission.content}</p> {/* Show URL for debug */}
                                          {/* Real implementation would use an <audio> tag */}
                                          <audio src={submission.content} controls className="mt-4 w-full" />
                                    </div>
                              ) : (
                                    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap font-serif leading-relaxed">
                                          {submission.content}
                                    </div>
                              )}
                        </div>
                  </div>

                  {/* Right Column: Teacher Feedback */}
                  <div className="w-full md:w-1/3 flex flex-col">
                        <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Seu Feedback</h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-4">
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nota (0 - 10)</label>
                                    <div className="relative">
                                          <input
                                                type="number"
                                                step="0.1"
                                                {...register("grade")}
                                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-bold"
                                                placeholder="0.0"
                                          />
                                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">/ 10</span>
                                    </div>
                                    {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>}
                              </div>

                              <div className="flex-1 flex flex-col">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Comentários e Correções</label>
                                    <textarea
                                          {...register("feedback")}
                                          className="flex-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                          placeholder="Escreva aqui seu feedback detalhado para o aluno..."
                                    ></textarea>
                                    {errors.feedback && <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>}
                              </div>

                              <div className="mt-auto pt-4 border-t flex gap-3">
                                    <button
                                          type="button"
                                          onClick={onClose}
                                          className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                                    >
                                          Cancelar
                                    </button>
                                    <button
                                          type="submit"
                                          disabled={gradeMutation.isPending}
                                          className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium shadow-sm flex items-center justify-center gap-2 transition-colors"
                                    >
                                          {gradeMutation.isPending && <Loader2 className="animate-spin w-5 h-5" />}
                                          Enviar Correção
                                    </button>
                              </div>
                        </form>
                  </div>

            </div>
      );
}
