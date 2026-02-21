"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { registerSchema, RegisterSchema } from "@/features/auth/auth.schema";
import { authService } from "@/services/auth.service";

type Question = {
      id: number;
      text: string;
      options: { label: string; isCorrect: boolean }[];
};

const QUIZ_QUESTIONS: Question[] = [
      {
            id: 1,
            text: "Como se diz 'Bom dia' em francês?",
            options: [
                  { label: "Bonsoir", isCorrect: false },
                  { label: "Bonjour", isCorrect: true },
                  { label: "Salut", isCorrect: false },
                  { label: "Merci", isCorrect: false },
            ],
      },
      {
            id: 2,
            text: "Complete a frase: Je ___ brésilien(ne).",
            options: [
                  { label: "est", isCorrect: false },
                  { label: "avoir", isCorrect: false },
                  { label: "suis", isCorrect: true },
                  { label: "aller", isCorrect: false },
            ],
      },
      {
            id: 3,
            text: "Qual verbo significa 'Falar'?",
            options: [
                  { label: "Parler", isCorrect: true },
                  { label: "Manger", isCorrect: false },
                  { label: "Écouter", isCorrect: false },
                  { label: "Regarder", isCorrect: false },
            ],
      },
];

export function PlacementTest() {
      const [step, setStep] = useState(0);
      const [score, setScore] = useState(0);
      const [isSuccess, setIsSuccess] = useState(false);
      const router = useRouter();

      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm<RegisterSchema>({
            resolver: zodResolver(registerSchema),
      });

      const registerMutation = useMutation({
            mutationFn: authService.register,
            onSuccess: () => {
                  setIsSuccess(true);
                  setTimeout(() => {
                        router.push('/dashboard');
                  }, 1500);
            },
            onError: (error: any) => {
                  const message = error.response?.data?.message || 'Erro ao criar conta';
                  alert(message);
            },
      });

      const isLoading = registerMutation.isPending;

      const handleAnswer = (selectedIndex: number) => {
            const isCorrect = QUIZ_QUESTIONS[step - 1].options[selectedIndex].isCorrect;
            if (isCorrect) {
                  setScore((prev) => prev + 1);
            }
            setTimeout(() => {
                  setStep((prev) => prev + 1);
            }, 300);
      };

      const onSubmit = (data: RegisterSchema) => {
            registerMutation.mutate(data);
      };

      return (
            <div className="w-full flex justify-center perspective-1000">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl max-w-md w-full relative">

                        {step === 0 && (
                              <div className="text-center relative z-10 animate-in fade-in duration-500">
                                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
                                          Descubra o seu nível grátis
                                    </span>
                                    <h3 className="text-2xl font-bold mb-3 text-white">Teste Rápido de Francês</h3>
                                    <p className="text-slate-300 mb-8 text-sm leading-relaxed">
                                          Responda a {QUIZ_QUESTIONS.length} perguntas simples para avaliarmos o seu nível atual e recomendarmos o módulo ideal.
                                    </p>
                                    <button
                                          onClick={() => setStep(1)}
                                          className="w-full py-4 px-4 bg-white text-indigo-900 font-bold rounded-xl hover:bg-slate-100 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10"
                                    >
                                          Começar o Teste
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                    </button>
                              </div>
                        )}

                        {step > 0 && step <= QUIZ_QUESTIONS.length && (
                              <div className="relative z-10 animate-in slide-in-from-right-4 duration-300">
                                    <div className="flex justify-between items-center mb-6 text-sm text-slate-300 font-medium">
                                          <span>Pergunta {step} de {QUIZ_QUESTIONS.length}</span>
                                          <div className="flex gap-1.5">
                                                {QUIZ_QUESTIONS.map((_, idx) => (
                                                      <div key={idx} className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${idx < step ? 'bg-indigo-400' : 'bg-white/10'}`} />
                                                ))}
                                          </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-6 text-white leading-relaxed">{QUIZ_QUESTIONS[step - 1].text}</h3>
                                    <div className="space-y-3">
                                          {QUIZ_QUESTIONS[step - 1].options.map((option, idx) => (
                                                <button
                                                      key={idx}
                                                      onClick={() => handleAnswer(idx)}
                                                      className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/20 transition-all flex items-center justify-between group cursor-pointer"
                                                >
                                                      <span className="font-medium text-slate-200 group-hover:text-white">{option.label}</span>
                                                      <svg width="18" height="18" className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                                                </button>
                                          ))}
                                    </div>
                              </div>
                        )}

                        {step > QUIZ_QUESTIONS.length && !isSuccess && (
                              <div className="text-center relative z-10 animate-in fade-in zoom-in duration-500">
                                    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-white">Excelente!</h3>
                                    <p className="text-slate-300 mb-6 text-sm">
                                          Acertou {score} de {QUIZ_QUESTIONS.length} perguntas. O seu nível estimado é <strong className="text-white">A1 (Iniciante)</strong>.
                                    </p>

                                    <div className="bg-slate-900/50 p-5 rounded-xl border border-white/10 mb-2 text-left">
                                          <p className="text-sm font-semibold mb-4 text-center text-slate-200">Crie a sua conta para guardar o resultado e aceder à 1ª aula!</p>
                                          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                                                <div>
                                                      <input
                                                            type="text"
                                                            placeholder="O seu Nome Completo"
                                                            {...register('fullName')}
                                                            disabled={isLoading}
                                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                                      />
                                                      {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>}
                                                </div>
                                                <div>
                                                      <input
                                                            type="email"
                                                            placeholder="O seu E-mail"
                                                            {...register('email')}
                                                            disabled={isLoading}
                                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                                      />
                                                      {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                                                </div>
                                                <div>
                                                      <input
                                                            type="password"
                                                            placeholder="Criar Senha"
                                                            {...register('password')}
                                                            disabled={isLoading}
                                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                                      />
                                                      {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
                                                </div>
                                                <button
                                                      type="submit"
                                                      disabled={isLoading}
                                                      className="w-full py-3.5 mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
                                                >
                                                      {isLoading ? (
                                                            <>
                                                                  <Loader2 className="w-5 h-5 animate-spin" />
                                                                  A criar conta...
                                                            </>
                                                      ) : (
                                                            <>
                                                                  Começar a Aprender
                                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                                            </>
                                                      )}
                                                </button>
                                          </form>
                                    </div>
                              </div>
                        )}

                        {isSuccess && (
                              <div className="text-center relative z-10 animate-in fade-in zoom-in duration-500 py-8">
                                    <svg width="64" height="64" className="text-emerald-400 mx-auto mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                    <h3 className="text-3xl font-bold mb-2 text-white">Conta Criada!</h3>
                                    <p className="text-slate-300">A redirecionar para o seu Dashboard de aprendizagem...</p>
                              </div>
                        )}
                  </div>
            </div>
      );
}
