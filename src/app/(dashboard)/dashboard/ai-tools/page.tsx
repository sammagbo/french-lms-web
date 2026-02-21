"use client";

import { useState } from 'react';
import {
      Wand2,
      MessageSquare,
      Image as ImageIcon,
      FileQuestion,
      CheckCircle,
      Users,
      BookA,
      Video,
      ListTodo,
      ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Definição das ferramentas do Opal
const tools = [
      {
            id: 'dialogue-generator',
            title: 'Gerador de Diálogos',
            description: 'Crie conversas em francês com áudio gerado por IA para qualquer tema e nível.',
            icon: MessageSquare,
            category: 'Para Professores',
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
            link: 'https://opal.google/app/1E3JLWgKoRsHKBlFvT1W6t5m2Ws7XxkCd', // Link do Opal atualizado
      },
      {
            id: 'flashcards-factory',
            title: 'Fábrica de Flashcards',
            description: 'Gere ilustrações e frases de exemplo para vocabulário novo.',
            icon: ImageIcon,
            category: 'Para Professores',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            link: 'https://opal.google/app/18op-79nFefxk75-t7UX9vWXAH2otH9ya', // Link do Opal atualizado
      },
      {
            id: 'quiz-generator',
            title: 'Gerador Rápido de Quizzes',
            description: 'Transforme textos em perguntas de múltipla escolha.',
            icon: FileQuestion,
            category: 'Para Professores',
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100',
            link: 'https://opal.google/app/19J3I37R_YW5S3D9UMOtBB6FMdarCeYoS', // Link do Opal atualizado
      },
      {
            id: 'grammar-checker',
            title: 'Corretor de Redação',
            description: 'Cole seu texto e receba correções e dicas amigáveis de gramática.',
            icon: CheckCircle,
            category: 'Para Alunos',
            color: 'text-rose-600',
            bgColor: 'bg-rose-100',
            link: '#', // Link do Opal aqui
      },
      {
            id: 'roleplay-simulator',
            title: 'Simulador de Cenários',
            description: 'Treine conversação com roteiros práticos do dia a dia.',
            icon: Users,
            category: 'Para Alunos',
            color: 'text-amber-600',
            bgColor: 'bg-amber-100',
            link: 'https://opal.google/app/1PZgkE1H70CSWjumW6vI60Uzlp1QT2m9k', // Link do Opal atualizado
      },
      {
            id: 'vocabulary-expander',
            title: 'Expansor de Vocabulário',
            description: 'Consulte conjugações, sinônimos e exemplos com facilidade.',
            icon: BookA,
            category: 'Para Alunos',
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100',
            link: 'https://opal.google/app/1Aqh5uCciFme_Wf7yipvlk-8zJ5s_9k3f', // Link do Opal atualizado
      },
      {
            id: 'social-media-generator',
            title: 'Scripts para Redes',
            description: 'Crie roteiros de vídeos curtos sobre gramática e vocabulário.',
            icon: Video,
            category: 'Para Professores',
            color: 'text-pink-600',
            bgColor: 'bg-pink-100',
            link: 'https://opal.google/app/1R1L32IKiFQZF8FXY7hMtXnlIx4vdZ47E', // Link do Opal atualizado
      },
      {
            id: 'level-test-creator',
            title: 'Criador de Testes',
            description: 'Gere testes dinâmicos de nivelamento para captar leads.',
            icon: ListTodo,
            category: 'Para Professores',
            color: 'text-cyan-600',
            bgColor: 'bg-cyan-100',
            link: 'https://opal.google/app/1VNswMtAxcvwKQiLqIAkxxDyGQ3FQhCdP', // Link do Opal atualizado
      }
];

export default function AIToolsPage() {
      const [filter, setFilter] = useState<string | null>(null);

      const categories = Array.from(new Set(tools.map(t => t.category)));

      const filteredTools = filter
            ? tools.filter(t => t.category === filter)
            : tools;

      return (
            <div className="p-8 max-w-7xl mx-auto space-y-8">
                  {/* Cabeçalho */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-4">
                              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold shadow-sm">
                                    <Wand2 className="w-4 h-4" />
                                    <span>Ferramentas Experimentais Opal</span>
                              </div>
                              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 ds-heading-1">
                                    Laboratório de IA
                              </h1>
                              <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
                                    Acelere seus estudos e a criação de material com nossa suíte de mini-aplicativos super inteligentes e rápidos.
                              </p>
                        </div>
                  </div>

                  {/* Filtros */}
                  <div className="flex flex-wrap gap-3 pb-4 border-b border-gray-100">
                        <button
                              onClick={() => setFilter(null)}
                              className={cn(
                                    "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform active:scale-95",
                                    filter === null
                                          ? "bg-gray-900 text-white shadow-lg shadow-gray-200/50"
                                          : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300"
                              )}
                        >
                              Todos os Apps
                        </button>
                        {categories.map(category => (
                              <button
                                    key={category}
                                    onClick={() => setFilter(category)}
                                    className={cn(
                                          "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform active:scale-95",
                                          filter === category
                                                ? "bg-gray-900 text-white shadow-lg shadow-gray-200/50"
                                                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300"
                                    )}
                              >
                                    {category}
                              </button>
                        ))}
                  </div>

                  {/* Grid de Ferramentas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
                        {filteredTools.map((tool) => {
                              const Icon = tool.icon;
                              return (
                                    <div
                                          key={tool.id}
                                          className="group relative bg-white border border-gray-100 rounded-3xl p-6 transition-all duration-400 hover:shadow-2xl hover:shadow-gray-200/40 hover:-translate-y-1.5 flex flex-col h-full overflow-hidden"
                                    >
                                          {/* Efeito de brilho de fundo no hover */}
                                          <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500", tool.bgColor)} />

                                          {/* Cabeçalho do Card */}
                                          <div className="flex items-start justify-between mb-6 relative z-10">
                                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm", tool.bgColor, tool.color)}>
                                                      <Icon className="w-7 h-7" />
                                                </div>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-50 text-gray-500 border border-gray-100">
                                                      {tool.category}
                                                </span>
                                          </div>

                                          {/* Informações */}
                                          <div className="flex-1 space-y-3 mb-8 relative z-10">
                                                <h3 className="text-xl font-bold text-gray-900 font-display group-hover:text-blue-600 transition-colors">
                                                      {tool.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 leading-relaxed">
                                                      {tool.description}
                                                </p>
                                          </div>

                                          {/* Botão Acessar */}
                                          <Link
                                                href={tool.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full relative z-10 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-gray-50 text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:shadow-md active:scale-[0.98]"
                                          >
                                                <span>Abrir App</span>
                                                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                          </Link>
                                    </div>
                              );
                        })}
                  </div>
            </div>
      );
}
