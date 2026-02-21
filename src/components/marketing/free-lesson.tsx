"use client";

import { PlayCircle, BookOpen, Clock, Presentation } from "lucide-react";
import Link from "next/link";

export function FreeLesson() {
      return (
            <div className="w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 flex flex-col md:flex-row">
                  {/* Video Side */}
                  <div className="md:w-1/2 relative bg-slate-900/50 group">
                        <div className="aspect-video w-full h-full min-h-[300px] relative overflow-hidden">
                              <iframe
                                    className="absolute inset-0 w-full h-full object-cover"
                                    src="https://www.youtube.com/embed/FjH30SCA1H0?modestbranding=1&rel=0"
                                    title="Aula Gratuita - Saudações em Francês"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                              ></iframe>
                        </div>
                  </div>

                  {/* Content Side */}
                  <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Aula Demonstrativa
                              </span>
                              <span className="flex items-center gap-1 text-sm text-slate-400 font-medium">
                                    <Clock className="w-4 h-4" /> 5 min
                              </span>
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-3">
                              Cumprimentos Essenciais
                        </h3>

                        <p className="text-slate-300 mb-6 leading-relaxed">
                              Dê o primeiro passo no aprendizado do francês! Nesta aula curta, você vai aprender a diferença entre "Bonjour" e "Bonsoir", quando usá-los, e como soar como um nativo nas suas primeiras interações.
                        </p>

                        <div className="space-y-3 mb-8">
                              <div className="flex items-start gap-3">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                                          <Presentation className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <p className="text-sm text-slate-300">Explicação clara da teoria básica do idioma.</p>
                              </div>
                              <div className="flex items-start gap-3">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                                          <PlayCircle className="w-3.5 h-3.5 text-indigo-400" />
                                    </div>
                                    <p className="text-sm text-slate-300">Pronúncia nativa para você repetir junto.</p>
                              </div>
                        </div>

                        <Link
                              href="/register"
                              className="inline-flex items-center justify-center gap-2 w-full text-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5"
                        >
                              <BookOpen className="w-5 h-5" />
                              Criar Conta para Ver Mais Aulas
                        </Link>
                  </div>
            </div>
      );
}
