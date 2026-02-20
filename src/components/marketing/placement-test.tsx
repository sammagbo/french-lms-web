"use client";

import { useState } from "react";
import { RegisterForm } from "@/features/auth/components/register-form";
import { CheckCircle2, ChevronRight, Trophy, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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
            text: "Qual destas frases significa 'Eu sou brasileiro(a)'?",
            options: [
                  { label: "J'ai brésilien", isCorrect: false },
                  { label: "Je parle brésilien", isCorrect: false },
                  { label: "Je m'appelle brésilien", isCorrect: false },
                  { label: "Je suis brésilien(ne)", isCorrect: true },
            ],
      },
      {
            id: 3,
            text: "Complete a frase: 'Je ___ parler français.' (Eu quero falar francês)",
            options: [
                  { label: "peux (posso)", isCorrect: false },
                  { label: "dois (devo)", isCorrect: false },
                  { label: "veux (quero)", isCorrect: true },
                  { label: "sais (sei)", isCorrect: false },
            ],
      },
];

export function PlacementTest() {
      const [currentStep, setCurrentStep] = useState(0);
      const [score, setScore] = useState(0);
      const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
      const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

      const isQuizFinished = currentStep >= QUIZ_QUESTIONS.length;

      const handleSelectAnswer = (index: number) => {
            if (isAnswerRevealed) return;
            setSelectedAnswer(index);
            setIsAnswerRevealed(true);

            if (QUIZ_QUESTIONS[currentStep].options[index].isCorrect) {
                  setScore((prev) => prev + 1);
            }
      };

      const handleNextStep = () => {
            setCurrentStep((prev) => prev + 1);
            setSelectedAnswer(null);
            setIsAnswerRevealed(false);
      };

      return (
            <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white">
                        <h3 className="text-2xl font-bold mb-2">Teste de Nivelamento Rápido</h3>
                        <p className="text-blue-100">Descubra o seu nível e ganhe acesso imediato ao conteúdo ideal.</p>
                  </div>

                  <div className="p-8">
                        {!isQuizFinished ? (
                              // QUIZ ACTIVE STATE
                              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {/* Progress Bar */}
                                    <div className="flex items-center justify-between text-sm font-medium text-gray-500 mb-2">
                                          <span>Pergunta {currentStep + 1} de {QUIZ_QUESTIONS.length}</span>
                                          <span>{Math.round(((currentStep) / QUIZ_QUESTIONS.length) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 mb-8 overflow-hidden">
                                          <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                                                style={{ width: `${((currentStep) / QUIZ_QUESTIONS.length) * 100}%` }}
                                          />
                                    </div>

                                    <h4 className="text-xl font-bold text-gray-900 mb-6">
                                          {QUIZ_QUESTIONS[currentStep].text}
                                    </h4>

                                    <div className="space-y-3">
                                          {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => {
                                                const isSelected = selectedAnswer === idx;
                                                const isCorrect = option.isCorrect;

                                                let buttonStyle = "border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700";

                                                if (isAnswerRevealed) {
                                                      if (isSelected && isCorrect) buttonStyle = "border-green-500 bg-green-50 text-green-700 font-medium";
                                                      else if (isSelected && !isCorrect) buttonStyle = "border-red-400 bg-red-50 text-red-700";
                                                      else if (!isSelected && isCorrect) buttonStyle = "border-green-500 bg-green-50 text-green-700 opacity-70";
                                                      else buttonStyle = "border-gray-200 opacity-50";
                                                }

                                                return (
                                                      <button
                                                            key={idx}
                                                            onClick={() => handleSelectAnswer(idx)}
                                                            disabled={isAnswerRevealed}
                                                            className={cn(
                                                                  "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center",
                                                                  buttonStyle
                                                            )}
                                                      >
                                                            <span>{option.label}</span>
                                                            {isAnswerRevealed && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                                                            {isAnswerRevealed && isSelected && !isCorrect && <AlertCircle className="w-5 h-5 text-red-500" />}
                                                      </button>
                                                );
                                          })}
                                    </div>

                                    {isAnswerRevealed && (
                                          <div className="pt-6 animate-in fade-in zoom-in-95 duration-300">
                                                <button
                                                      onClick={handleNextStep}
                                                      className="w-full sm:w-auto ml-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                                                >
                                                      Continuar <ChevronRight className="w-5 h-5" />
                                                </button>
                                          </div>
                                    )}
                              </div>
                        ) : (
                              // QUIZ FINISHED - LEAD MAGNET STATE
                              <div className="animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center">
                                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                                          <Trophy className="w-10 h-10 text-amber-500" />
                                    </div>

                                    <h4 className="text-3xl font-extrabold text-gray-900 mb-3 text-center">
                                          Você acertou {score} de {QUIZ_QUESTIONS.length}!
                                    </h4>

                                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 text-center max-w-xl">
                                          <p className="text-blue-800 font-medium text-lg mb-2">
                                                Recomendamos o curso: <strong>Francês Essencial (Nível A1)</strong>
                                          </p>
                                          <p className="text-blue-600/80 text-sm">
                                                Crie sua conta agora mesmo e todo esse conteúdo estará disponível no seu painel de aulas instantaneamente. Sem cartão de crédito!
                                          </p>
                                    </div>

                                    {/* Injetando o Form de Registro Diretamente */}
                                    <div className="w-full flex justify-center border-t border-gray-100 pt-8">
                                          <RegisterForm />
                                    </div>
                              </div>
                        )}
                  </div>
            </div>
      );
}
