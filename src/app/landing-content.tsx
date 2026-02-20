"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
      Headphones,
      Users,
      Clock,
      BookOpen,
      ArrowRight,
      Star,
      CheckCircle2,
      Sparkles,
      MessageCircle,
      Globe,
      Play,
      Quote,
} from "lucide-react";

import { PlacementTest } from "@/components/marketing/placement-test";
import { FreeLesson } from "@/components/marketing/free-lesson";
import { FreeExercise } from "@/components/marketing/free-exercise";

gsap.registerPlugin(ScrollTrigger);

export default function LandingContent() {
      const heroRef = useRef<HTMLElement>(null);
      const featuresRef = useRef<HTMLElement>(null);
      const stepsRef = useRef<HTMLElement>(null);
      const testimonialsRef = useRef<HTMLElement>(null);
      const coursesRef = useRef<HTMLElement>(null);
      const ctaRef = useRef<HTMLElement>(null);

      useEffect(() => {
            const ctx = gsap.context(() => {
                  // ── HERO ANIMATIONS ──
                  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
                  heroTl
                        .from("[data-hero-badge]", { y: 30, opacity: 0, duration: 0.8 })
                        .from("[data-hero-title] > *", { y: 60, opacity: 0, duration: 1, stagger: 0.15 }, "-=0.4")
                        .from("[data-hero-subtitle]", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
                        .from("[data-hero-buttons] > *", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
                        .from("[data-hero-stats] > *", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3");

                  // ── DIFERENCIAIS: Stagger from bottom ──
                  gsap.from("[data-feature-card]", {
                        scrollTrigger: {
                              trigger: featuresRef.current,
                              start: "top 80%",
                              toggleActions: "play none none none",
                        },
                        y: 80,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                  });

                  gsap.from("[data-features-header] > *", {
                        scrollTrigger: {
                              trigger: featuresRef.current,
                              start: "top 85%",
                        },
                        y: 40,
                        opacity: 0,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: "power3.out",
                  });

                  // ── COMO FUNCIONA: Cascade ──
                  gsap.from("[data-step-card]", {
                        scrollTrigger: {
                              trigger: stepsRef.current,
                              start: "top 80%",
                        },
                        y: 60,
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.7,
                        stagger: 0.2,
                        ease: "back.out(1.4)",
                  });

                  gsap.from("[data-steps-header] > *", {
                        scrollTrigger: {
                              trigger: stepsRef.current,
                              start: "top 85%",
                        },
                        y: 40,
                        opacity: 0,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: "power3.out",
                  });

                  // ── DEPOIMENTOS: Slide-in from sides ──
                  gsap.from("[data-testimonial-card]", {
                        scrollTrigger: {
                              trigger: testimonialsRef.current,
                              start: "top 80%",
                        },
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power3.out",
                  });

                  gsap.from("[data-testimonials-header] > *", {
                        scrollTrigger: {
                              trigger: testimonialsRef.current,
                              start: "top 85%",
                        },
                        y: 40,
                        opacity: 0,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: "power3.out",
                  });

                  // ── CURSOS: Pop effect ──
                  gsap.from("[data-course-card]", {
                        scrollTrigger: {
                              trigger: coursesRef.current,
                              start: "top 80%",
                        },
                        y: 80,
                        opacity: 0,
                        scale: 0.85,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "back.out(1.2)",
                  });

                  gsap.from("[data-courses-header] > *", {
                        scrollTrigger: {
                              trigger: coursesRef.current,
                              start: "top 85%",
                        },
                        y: 40,
                        opacity: 0,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: "power3.out",
                  });

                  // ── CTA: Zoom in ──
                  gsap.from("[data-cta-box]", {
                        scrollTrigger: {
                              trigger: ctaRef.current,
                              start: "top 85%",
                        },
                        y: 60,
                        opacity: 0,
                        scale: 0.92,
                        duration: 1,
                        ease: "power3.out",
                  });

                  gsap.from("[data-cta-content] > *", {
                        scrollTrigger: {
                              trigger: ctaRef.current,
                              start: "top 80%",
                        },
                        y: 30,
                        opacity: 0,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: "power3.out",
                  });

                  // ── PARALLAX on hero video overlay ──
                  gsap.to("[data-hero-overlay]", {
                        scrollTrigger: {
                              trigger: heroRef.current,
                              start: "top top",
                              end: "bottom top",
                              scrub: true,
                        },
                        opacity: 0.9,
                  });
            });

            return () => ctx.revert();
      }, []);

      return (
            <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
                  {/* ─── NAVBAR PÚBLICA ─── */}
                  <header className="fixed top-0 w-full z-50 bg-black/25 backdrop-blur-lg border-b border-white/10">
                        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                              <Link href="/" className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                          <Globe className="w-4.5 h-4.5 text-white" />
                                    </div>
                                    <span className="text-lg font-bold text-white tracking-tight">
                                          French<span className="text-blue-300">LMS</span>
                                    </span>
                              </Link>

                              <nav className="hidden md:flex items-center gap-1">
                                    <a href="#diferenciais" className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5">Diferenciais</a>
                                    <a href="#depoimentos" className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5">Depoimentos</a>
                                    <a href="#preco" className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5">Planos</a>
                                    <div className="w-px h-6 bg-white/20 mx-2" />
                                    <Link href="/login" className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors">
                                          Entrar
                                    </Link>
                                    <Link
                                          href="/register"
                                          className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-full transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                                    >
                                          Começar Agora
                                    </Link>
                              </nav>
                        </div>
                  </header>

                  <main>
                        {/* ─── HERO SECTION ─── */}
                        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
                              <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    poster="/paris-hero.png"
                                    className="absolute inset-0 w-full h-full object-cover scale-105"
                              >
                                    <source
                                          src="https://videos.pexels.com/video-files/2519660/2519660-uhd_2560_1440_24fps.mp4"
                                          type="video/mp4"
                                    />
                              </video>

                              <div data-hero-overlay className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

                              <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-16">
                                    <div data-hero-badge className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium px-5 py-2 rounded-full border border-white/15 mb-8">
                                          <Sparkles className="w-4 h-4 text-amber-400" />
                                          Para brasileiros que querem dominar o francês
                                    </div>

                                    <div data-hero-title>
                                          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
                                                <span className="block">Aprenda Francês</span>
                                                <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                                                      de Verdade
                                                </span>
                                                <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-white/80 mt-2">
                                                      com Feedback Individual
                                                </span>
                                          </h1>
                                    </div>

                                    <p data-hero-subtitle className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
                                          Aulas estruturadas, correção de áudio por nativos e uma comunidade
                                          que te acompanha do zero ao avançado. No seu ritmo, de qualquer lugar.
                                    </p>

                                    <div data-hero-buttons className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                          <Link
                                                href="/login"
                                                className="inline-flex items-center justify-center gap-2 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-1"
                                          >
                                                Ver Cursos <ArrowRight className="w-5 h-5" />
                                          </Link>
                                          <Link
                                                href="/login"
                                                className="inline-flex items-center justify-center gap-2 text-lg font-medium text-white bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                                          >
                                                <Play className="w-5 h-5" /> Entrar
                                          </Link>
                                    </div>

                                    <div data-hero-stats className="flex flex-wrap items-center justify-center gap-8">
                                          <div className="text-center">
                                                <p className="text-3xl font-bold text-white">500+</p>
                                                <p className="text-sm text-white/50">Alunos Ativos</p>
                                          </div>
                                          <div className="hidden sm:block w-px h-10 bg-white/15" />
                                          <div className="text-center">
                                                <p className="text-3xl font-bold text-white">50+</p>
                                                <p className="text-sm text-white/50">Aulas Disponíveis</p>
                                          </div>
                                          <div className="hidden sm:block w-px h-10 bg-white/15" />
                                          <div className="text-center flex flex-col items-center">
                                                <div className="flex gap-0.5 mb-1">
                                                      {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                      ))}
                                                </div>
                                                <p className="text-sm text-white/50">4.9 de Avaliação</p>
                                          </div>
                                    </div>
                              </div>

                              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                                    <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
                                          <div className="w-1 h-2 bg-white/50 rounded-full" />
                                    </div>
                              </div>
                        </section>

                        {/* ─── DIFERENCIAIS ─── */}
                        <section ref={featuresRef} id="diferenciais" className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
                              <div className="max-w-6xl mx-auto">
                                    <div data-features-header className="text-center mb-16 space-y-3">
                                          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                                                Por que somos diferentes
                                          </p>
                                          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                                Tudo que você precisa para falar francês com confiança
                                          </h2>
                                          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                                Combinamos tecnologia, didática e acompanhamento humano para
                                                acelerar o seu aprendizado.
                                          </p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                          {[
                                                {
                                                      icon: Headphones,
                                                      title: "Correção de Áudio Nativa",
                                                      desc: "Envie gravações da sua pronúncia e receba feedback detalhado de professores francófonos.",
                                                      gradient: "from-blue-500 to-blue-600",
                                                },
                                                {
                                                      icon: Users,
                                                      title: "Comunidade Ativa",
                                                      desc: "Fóruns, grupos de estudo e eventos ao vivo para praticar com outros alunos brasileiros.",
                                                      gradient: "from-indigo-500 to-indigo-600",
                                                },
                                                {
                                                      icon: Clock,
                                                      title: "No Seu Ritmo",
                                                      desc: "Aulas disponíveis 24h. Estude quando e onde quiser, do celular ou computador.",
                                                      gradient: "from-violet-500 to-violet-600",
                                                },
                                                {
                                                      icon: MessageCircle,
                                                      title: "Feedback Individual",
                                                      desc: "Cada exercício é corrigido pessoalmente. Nada de respostas automáticas genéricas.",
                                                      gradient: "from-purple-500 to-purple-600",
                                                },
                                          ].map((f, i) => (
                                                <div
                                                      key={i}
                                                      data-feature-card
                                                      className="group relative p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1"
                                                >
                                                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform`}>
                                                            <f.icon className="w-6 h-6 text-white" />
                                                      </div>
                                                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                                                      <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </section>

                        {/* ─── COMO FUNCIONA ─── */}
                        <section ref={stepsRef} className="py-24 px-6 bg-white">
                              <div className="max-w-5xl mx-auto">
                                    <div data-steps-header className="text-center mb-16 space-y-3">
                                          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                                                Simples e direto
                                          </p>
                                          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                                Como funciona
                                          </h2>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-8">
                                          {[
                                                { step: "01", title: "Crie sua conta", desc: "Cadastre-se gratuitamente e acesse a plataforma em menos de 1 minuto." },
                                                { step: "02", title: "Escolha seu curso", desc: "Do iniciante ao avançado: escolha o nível ideal e comece imediatamente." },
                                                { step: "03", title: "Evolua com feedback", desc: "Assista às aulas, faça exercícios e receba correções personalizadas." },
                                          ].map((s, i) => (
                                                <div key={i} data-step-card className="text-center space-y-4">
                                                      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 text-xl font-bold flex items-center justify-center mx-auto">
                                                            {s.step}
                                                      </div>
                                                      <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
                                                      <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </section>

                        {/* ─── DEPOIMENTOS ─── */}
                        <section ref={testimonialsRef} id="depoimentos" className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
                              <div className="max-w-6xl mx-auto">
                                    <div data-testimonials-header className="text-center mb-16 space-y-3">
                                          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                                                Depoimentos
                                          </p>
                                          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                                O que nossos alunos dizem
                                          </h2>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6">
                                          {[
                                                {
                                                      name: "Ana Carolina",
                                                      role: "Estudante de Relações Internacionais",
                                                      text: "Em 3 meses eu já estava conseguindo entender podcasts em francês. A correção de áudio fez toda a diferença na minha pronúncia!",
                                                      stars: 5,
                                                },
                                                {
                                                      name: "Felipe Santos",
                                                      role: "Engenheiro — mudando para a França",
                                                      text: "Precisava do francês para o visto de trabalho. O método é muito prático e o suporte dos professores é incrível. Recomendo demais!",
                                                      stars: 5,
                                                },
                                                {
                                                      name: "Mariana Lima",
                                                      role: "Professora de Línguas",
                                                      text: "Como professora, reconheço a qualidade do conteúdo. As aulas são bem estruturadas e o feedback é realmente personalizado.",
                                                      stars: 5,
                                                },
                                          ].map((t, i) => (
                                                <div
                                                      key={i}
                                                      data-testimonial-card
                                                      className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
                                                >
                                                      <Quote className="w-8 h-8 text-blue-100 mb-4" />
                                                      <p className="text-sm text-gray-600 leading-relaxed mb-6 italic">
                                                            &ldquo;{t.text}&rdquo;
                                                      </p>
                                                      <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                                                  {t.name[0]}
                                                            </div>
                                                            <div>
                                                                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                                                                  <p className="text-xs text-gray-400">{t.role}</p>
                                                            </div>
                                                      </div>
                                                      <div className="flex gap-0.5 mt-3">
                                                            {[...Array(t.stars)].map((_, j) => (
                                                                  <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                                            ))}
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </section>

                        {/* ─── HUB DE APRENDIZADO GRATUITO (LEAD MAGNETS) ─── */}
                        <section className="py-24 px-6 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
                              {/* Background elements */}
                              <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                              <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                              <div className="max-w-6xl mx-auto relative z-10 space-y-32">
                                    {/* SEÇÃO 1: AULA GRATUITA */}
                                    <div>
                                          <div className="text-center mb-12 space-y-3">
                                                <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
                                                      Degustação
                                                </p>
                                                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                                                      Assista a uma aula completa
                                                </h2>
                                                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                                      Veja como é a nossa metodologia com esta aula essencial sobre cumprimentos em francês.
                                                </p>
                                          </div>
                                          <div className="max-w-5xl mx-auto">
                                                <FreeLesson />
                                          </div>
                                    </div>

                                    {/* SEÇÃO 2: EXERCÍCIO PRÁTICO */}
                                    <div>
                                          <div className="text-center mb-12 space-y-3">
                                                <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
                                                      Prática
                                                </p>
                                                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                                                      Teste o que você aprendeu
                                                </h2>
                                                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                                      Aplique o vocabulário da aula em situações reais e veja o feedback imediato.
                                                </p>
                                          </div>
                                          <div className="max-w-4xl mx-auto">
                                                <FreeExercise />
                                          </div>
                                    </div>

                                    {/* SEÇÃO 3: TESTE DE NÍVEL */}
                                    <div>
                                          <div className="text-center mb-12 space-y-3">
                                                <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
                                                      Nivelamento
                                                </p>
                                                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                                                      Já tem conhecimento prévio?
                                                </h2>
                                                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                                      Faça nosso teste rápido. Ao final, você pode criar sua conta gratuita para acessar o material ideal.
                                                </p>
                                          </div>
                                          <div className="max-w-3xl mx-auto">
                                                <PlacementTest />
                                          </div>
                                    </div>
                              </div>
                        </section>

                        {/* ─── CURSOS EM DESTAQUE ─── */}
                        <section ref={coursesRef} className="py-24 px-6 bg-white">
                              <div className="max-w-6xl mx-auto">
                                    <div data-courses-header className="text-center mb-16 space-y-3">
                                          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                                                Nossos cursos
                                          </p>
                                          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                                Escolha o curso ideal para você
                                          </h2>
                                    </div>

                                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                          {[
                                                { title: "Francês para Iniciantes", desc: "Fundamentos do idioma com foco em comunicação básica.", price: "R$ 29,90", level: "Iniciante", color: "from-blue-500 to-blue-600" },
                                                { title: "Francês Intermediário", desc: "Gramática avançada e compreensão auditiva aprofundada.", price: "R$ 49,90", level: "Intermediário", color: "from-indigo-500 to-indigo-600" },
                                                { title: "Conversação", desc: "Prática de situações do dia-a-dia e expressões idiomáticas.", price: "R$ 39,90", level: "Todos os Níveis", color: "from-violet-500 to-violet-600", popular: true },
                                                { title: "Francês para Negócios", desc: "Vocabulário e etiqueta para o mundo corporativo francófono.", price: "R$ 59,90", level: "Avançado", color: "from-purple-500 to-purple-600" },
                                          ].map((c, i) => (
                                                <div
                                                      key={i}
                                                      data-course-card
                                                      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                                >
                                                      {c.popular && (
                                                            <div className="absolute top-3 right-3 z-10 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full">
                                                                  Popular
                                                            </div>
                                                      )}
                                                      <div className={`h-28 bg-gradient-to-br ${c.color} flex items-center justify-center`}>
                                                            <BookOpen className="w-10 h-10 text-white/70" />
                                                      </div>
                                                      <div className="p-5 space-y-3">
                                                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                                                                  {c.level}
                                                            </span>
                                                            <h3 className="text-base font-bold text-gray-900">{c.title}</h3>
                                                            <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
                                                            <div className="flex items-center justify-between pt-1">
                                                                  <span className="text-xl font-bold text-blue-600">{c.price}</span>
                                                                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                                            </div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </section>

                        {/* ─── CTA FINAL ─── */}
                        <section ref={ctaRef} id="preco" className="py-24 px-6">
                              <div className="max-w-4xl mx-auto relative">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[2rem] blur-2xl opacity-20" />

                                    <div data-cta-box className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
                                          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[size:24px_24px]" />

                                          <div data-cta-content className="relative space-y-6">
                                                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20">
                                                      <Sparkles className="w-4 h-4 text-amber-300" />
                                                      Oferta especial de lançamento
                                                </div>
                                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                                      Comece sua jornada no francês
                                                      <br />
                                                      <span className="text-blue-200">hoje mesmo</span>
                                                </h2>
                                                <p className="text-lg text-blue-100/80 max-w-xl mx-auto">
                                                      Junte-se a mais de 500 brasileiros que já estão transformando
                                                      suas carreiras e experiências com o francês.
                                                </p>
                                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                                                      <Link
                                                            href="/register"
                                                            className="inline-flex items-center justify-center gap-2 text-lg font-bold bg-white text-blue-600 px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1"
                                                      >
                                                            Criar Minha Conta Grátis <ArrowRight className="w-5 h-5" />
                                                      </Link>
                                                </div>
                                                <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-blue-200/70">
                                                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Sem cartão de crédito</span>
                                                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Cancele a qualquer momento</span>
                                                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Acesso imediato</span>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </section>
                  </main>

                  {/* ─── FOOTER ─── */}
                  <footer className="py-12 px-6 bg-slate-950 text-white">
                        <div className="max-w-7xl mx-auto">
                              <div className="grid md:grid-cols-3 gap-8 mb-8">
                                    <div className="space-y-3">
                                          <Link href="/" className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                                      <Globe className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="font-bold">French<span className="text-blue-400">LMS</span></span>
                                          </Link>
                                          <p className="text-sm text-gray-400 leading-relaxed">
                                                Plataforma de ensino de francês feita especialmente para brasileiros.
                                          </p>
                                    </div>
                                    <div className="space-y-3">
                                          <h4 className="text-sm font-semibold text-white">Navegação</h4>
                                          <div className="flex flex-col gap-2">
                                                <a href="#diferenciais" className="text-sm text-gray-400 hover:text-white transition-colors">Diferenciais</a>
                                                <a href="#depoimentos" className="text-sm text-gray-400 hover:text-white transition-colors">Depoimentos</a>
                                                <a href="#preco" className="text-sm text-gray-400 hover:text-white transition-colors">Planos</a>
                                          </div>
                                    </div>
                                    <div className="space-y-3">
                                          <h4 className="text-sm font-semibold text-white">Acesso</h4>
                                          <div className="flex flex-col gap-2">
                                                <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">Entrar</Link>
                                                <Link href="/register" className="text-sm text-gray-400 hover:text-white transition-colors">Criar Conta</Link>
                                          </div>
                                    </div>
                              </div>
                              <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <p className="text-sm text-gray-500">
                                          © 2026 FrenchLMS. Todos os direitos reservados.
                                    </p>
                                    <div className="flex gap-6">
                                          <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Termos</a>
                                          <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacidade</a>
                                    </div>
                              </div>
                        </div>
                  </footer>
            </div>
      );
}
