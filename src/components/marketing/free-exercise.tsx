"use client";

import { useState } from "react";
import { RegisterForm } from "@/features/auth/components/register-form";
import { CheckCircle2, ChevronRight, AlertCircle, Edit3, MessageCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type ExerciseQuestion = {
      id: number;
      text: string;
      context: string;
      options: { label: string; isCorrect: boolean }[];
};

const EXERCISE_QUESTIONS: ExerciseQuestion[] = [
      {
            id: 1,
            context: "Você chega em uma padaria em Paris às 9h da manhã.",
            text: "O que você diz ao padeiro(a)?",
            options: [
                  { label: "Bonne nuit!", isCorrect: false },
                  { label: "Bonjour!", isCorrect: true },
                  { label: "Bonsoir!", isCorrect: false },
            ],
      },
      {
            id: 2,
            context: "Agora são 19h e você está entrando em um restaurante.",
            text: "Qual é o cumprimento ideal?",
            options: [
                  { label: "Bonjour!", isCorrect: false },
                  { label: "Salut!", isCorrect: false },
                  { label: "Bonsoir!", isCorrect: true },
            ],
      },
];

export function FreeExercise() {
      const [currentStep, setCurrentStep] = useState(0);
      const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
      const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

      const isExerciseFinished = currentStep >= EXERCISE_QUESTIONS.length;

      const handleSelectAnswer = (index: number) => {
            if (isAnswerRevealed) return;
            setSelectedAnswer(index);
            setIsAnswerRevealed(true);
      };

      const handleNextStep = () => {
            setCurrentStep((prev) => prev + 1);
            setSelectedAnswer(null);
            setIsAnswerRevealed(false);
      };

      return (
            <div className="w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 flex flex-col lg:flex-row">
                  {/* Info / Title Side */}
                  <div className="lg:w-1/3 bg-slate-900/40 p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                        <div className="w-12 h-12 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center shadow-sm mb-6 text-indigo-400">
                              <Edit3 className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Exercício Rápido</h3>
                        <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                              Teste na prática o que você aprenderia nas primeiras aulas de francês. Complete o cenário e veja a explicação!
                        </p>
                        <div className="space-y-4">
                              <div className="flex items-center gap-3 text-sm text-slate-200 font-medium bg-white/5 border border-white/10 p-3 rounded-lg">
                                    <MessageCircle className="w-4 h-4 text-indigo-400" /> Situações Reais
                              </div>
                              <div className="flex items-center gap-3 text-sm text-slate-200 font-medium bg-white/5 border border-white/10 p-3 rounded-lg">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Feedback Automático
                              </div>
                        </div>
                  </div>

                  {/* Interactive Side */}
                  <div className="lg:w-2/3 p-8 lg:p-10 relative">
                        {!isExerciseFinished ? (
                              <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-lg mx-auto relative z-10">
                                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                                          <span>Pergunta {currentStep + 1} de {EXERCISE_QUESTIONS.length}</span>
                                    </div>

                                    <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                                          <p className="text-sm font-medium text-slate-400 mb-1">Cenário:</p>
                                          <p className="text-white italic">"{EXERCISE_QUESTIONS[currentStep].context}"</p>
                                    </div>

                                    <h4 className="text-xl font-bold text-white mb-6">
                                          {EXERCISE_QUESTIONS[currentStep].text}
                                    </h4>

                                    <div className="space-y-3">
                                          {EXERCISE_QUESTIONS[currentStep].options.map((option, idx) => {
                                                const isSelected = selectedAnswer === idx;
                                                const isCorrect = option.isCorrect;

                                                let buttonStyle = "border-white/10 hover:border-indigo-400/50 hover:bg-white/10 text-slate-200 group-hover:text-white";

                                                if (isAnswerRevealed) {
                                                      if (isSelected && isCorrect) buttonStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-medium shadow-sm shadow-emerald-500/10";
                                                      else if (isSelected && !isCorrect) buttonStyle = "border-red-500/50 bg-red-500/20 text-red-300 shadow-sm shadow-red-500/10";
                                                      else if (!isSelected && isCorrect) buttonStyle = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 opacity-60";
                                                      else buttonStyle = "border-white/10 opacity-40 text-slate-400";
                                                }

                                                return (
                                                      <button
                                                            key={idx}
                                                            onClick={() => handleSelectAnswer(idx)}
                                                            disabled={isAnswerRevealed}
                                                            className={cn(
                                                                  "w-full text-left p-4 rounded-xl border transition-all duration-200 flex justify-between items-center group bg-white/5",
                                                                  buttonStyle
                                                            )}
                                                      >
                                                            <span className={cn("transition-transform group-hover:translate-x-1", isAnswerRevealed && "translate-x-0")}>
                                                                  {option.label}
                                                            </span>
                                                            {isAnswerRevealed && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-in zoom-in" />}
                                                            {isAnswerRevealed && isSelected && !isCorrect && <AlertCircle className="w-5 h-5 text-red-400 animate-in zoom-in" />}
                                                      </button>
                                                );
                                          })}
                                    </div>

                                    {isAnswerRevealed && (
                                          <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                <div className="mb-6 p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                                                      <p className="text-sm text-indigo-300 font-medium flex items-center gap-2 mb-1">
                                                            <Lock className="w-4 h-4" /> Explicação Detalhada
                                                      </p>
                                                      <p className="text-sm text-indigo-200/60 blur-[3px] select-none">
                                                            A resposta correta é escolhida porque em francês usamos este termo específico neste período do dia. Existem exceções divertidas que você aprenderá...
                                                      </p>
                                                </div>

                                                <button
                                                      onClick={handleNextStep}
                                                      className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-500/25"
                                                >
                                                      {currentStep === EXERCISE_QUESTIONS.length - 1 ? "Ver Minha Pontuação" : "Próxima Pergunta"} <ChevronRight className="w-5 h-5" />
                                                </button>
                                          </div>
                                    )}
                              </div>
                        ) : (
                              <div className="animate-in fade-in zoom-in-95 duration-700 flex flex-col justify-center h-full max-w-md mx-auto relative z-10">
                                    <div className="text-center mb-8">
                                          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4">
                                                <CheckCircle2 className="w-8 h-8" />
                                          </div>
                                          <h4 className="text-2xl font-bold text-white mb-2">Excelente prática!</h4>
                                          <p className="text-slate-300 text-sm">
                                                Quer desbloquear as explicações detalhadas das suas respostas e ter acesso a exercícios ilimitados?
                                          </p>
                                    </div>

                                    <div className="bg-slate-900/80 p-6 rounded-2xl border border-white/10 shadow-sm relative z-20">
                                          <RegisterForm />
                                    </div>
                              </div>
                        )}
                  </div>
            </div>
      );
}
