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
            <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
                  {/* Info / Title Side */}
                  <div className="lg:w-1/3 bg-gradient-to-br from-indigo-50 to-blue-50 p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-indigo-600">
                              <Edit3 className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Exercício Rápido</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                              Teste na prática o que você aprenderia nas primeiras aulas de francês. Complete o cenário e veja a explicação!
                        </p>
                        <div className="space-y-4">
                              <div className="flex items-center gap-3 text-sm text-gray-700 font-medium bg-white/60 p-3 rounded-lg">
                                    <MessageCircle className="w-4 h-4 text-blue-500" /> Situações Reais
                              </div>
                              <div className="flex items-center gap-3 text-sm text-gray-700 font-medium bg-white/60 p-3 rounded-lg">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Feedback Automático
                              </div>
                        </div>
                  </div>

                  {/* Interactive Side */}
                  <div className="lg:w-2/3 p-8 lg:p-10 relative">
                        {!isExerciseFinished ? (
                              <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-lg mx-auto">
                                    <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 border-b pb-4">
                                          <span>Pergunta {currentStep + 1} de {EXERCISE_QUESTIONS.length}</span>
                                    </div>

                                    <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                          <p className="text-sm font-medium text-gray-500 mb-1">Cenário:</p>
                                          <p className="text-gray-800 italic">"{EXERCISE_QUESTIONS[currentStep].context}"</p>
                                    </div>

                                    <h4 className="text-xl font-bold text-gray-900 mb-6">
                                          {EXERCISE_QUESTIONS[currentStep].text}
                                    </h4>

                                    <div className="space-y-3">
                                          {EXERCISE_QUESTIONS[currentStep].options.map((option, idx) => {
                                                const isSelected = selectedAnswer === idx;
                                                const isCorrect = option.isCorrect;

                                                let buttonStyle = "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700";

                                                if (isAnswerRevealed) {
                                                      if (isSelected && isCorrect) buttonStyle = "border-green-500 bg-green-50 text-green-700 font-medium shadow-sm shadow-green-100";
                                                      else if (isSelected && !isCorrect) buttonStyle = "border-red-400 bg-red-50 text-red-700 shadow-sm shadow-red-100";
                                                      else if (!isSelected && isCorrect) buttonStyle = "border-green-500 bg-green-50 text-green-700 opacity-60";
                                                      else buttonStyle = "border-gray-200 opacity-40";
                                                }

                                                return (
                                                      <button
                                                            key={idx}
                                                            onClick={() => handleSelectAnswer(idx)}
                                                            disabled={isAnswerRevealed}
                                                            className={cn(
                                                                  "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center group",
                                                                  buttonStyle
                                                            )}
                                                      >
                                                            <span className={cn("transition-transform group-hover:translate-x-1", isAnswerRevealed && "translate-x-0")}>
                                                                  {option.label}
                                                            </span>
                                                            {isAnswerRevealed && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 animate-in zoom-in" />}
                                                            {isAnswerRevealed && isSelected && !isCorrect && <AlertCircle className="w-5 h-5 text-red-500 animate-in zoom-in" />}
                                                      </button>
                                                );
                                          })}
                                    </div>

                                    {isAnswerRevealed && (
                                          <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                <div className="mb-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                                      <p className="text-sm text-blue-800 font-medium flex items-center gap-2 mb-1">
                                                            <Lock className="w-4 h-4" /> Explicação Detalhada
                                                      </p>
                                                      <p className="text-sm text-blue-700/80 blur-[3px] select-none">
                                                            A resposta correta é escolhida porque em francês usamos este termo específico neste período do dia. Existem exceções divertidas que você aprenderá...
                                                      </p>
                                                </div>

                                                <button
                                                      onClick={handleNextStep}
                                                      className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
                                                >
                                                      {currentStep === EXERCISE_QUESTIONS.length - 1 ? "Ver Minha Pontuação" : "Próxima Pergunta"} <ChevronRight className="w-5 h-5" />
                                                </button>
                                          </div>
                                    )}
                              </div>
                        ) : (
                              <div className="animate-in fade-in zoom-in-95 duration-700 flex flex-col justify-center h-full max-w-md mx-auto relative z-10">
                                    <div className="text-center mb-8">
                                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                                                <CheckCircle2 className="w-8 h-8" />
                                          </div>
                                          <h4 className="text-2xl font-bold text-gray-900 mb-2">Excelente prática!</h4>
                                          <p className="text-gray-500 text-sm">
                                                Quer desbloquear as explicações detalhadas das suas respostas e ter acesso a exercícios ilimitados?
                                          </p>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl border shadow-sm">
                                          <RegisterForm />
                                    </div>
                              </div>
                        )}

                        {/* Decorational background when form is visible */}
                        {isExerciseFinished && (
                              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-white pointer-events-none rounded-r-3xl" />
                        )}
                  </div>
            </div>
      );
}
