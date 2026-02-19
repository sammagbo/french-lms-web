import Link from "next/link";
import Image from "next/image";
import { BookOpen, GraduationCap, Globe, Users, ArrowRight, Play, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation — Transparent over hero */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              French LMS
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/login"
              className="text-sm font-semibold text-blue-700 bg-white px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-white/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Começar Agora
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section — Paris Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/paris-hero.png"
          alt="Paris skyline at sunset"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20">
            <Star className="w-4 h-4 text-yellow-400" />
            Plataforma #1 de Francês no Brasil
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-lg">
            Aprenda{" "}
            <span className="text-blue-400">
              Francês
            </span>{" "}
            de Forma Inteligente
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Aulas interativas, professores qualificados e uma comunidade ativa.
            Do iniciante ao avançado, sua jornada começa aqui.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              Começar Grátis <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="inline-flex items-center gap-2 text-lg font-semibold text-white bg-white/15 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-300">
              <Play className="w-5 h-5" /> Ver Demo
            </button>
          </div>
          <div className="flex items-center gap-8 pt-4 justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-sm text-white/60">Alunos Ativos</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-sm text-white/60">Aulas Disponíveis</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">4.9</p>
              <p className="text-sm text-white/60">Avaliação ⭐</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              Por que escolher o{" "}
              <span className="text-blue-600">French LMS</span>?
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Uma plataforma completa para dominar o francês, do básico ao avançado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Aulas Estruturadas",
                desc: "Conteúdo organizado em módulos progressivos com exercícios práticos.",
                color: "blue",
              },
              {
                icon: GraduationCap,
                title: "Professores Nativos",
                desc: "Aprenda com professores francófonos experientes e certificados.",
                color: "indigo",
              },
              {
                icon: Users,
                title: "Comunidade Ativa",
                desc: "Participe de fóruns, grupos de estudo e eventos ao vivo.",
                color: "violet",
              },
              {
                icon: Globe,
                title: "100% Online",
                desc: "Estude no seu ritmo, de qualquer lugar, a qualquer hora.",
                color: "purple",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-blue-100"
              >
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">Cursos em Destaque</h2>
            <p className="text-lg text-gray-500">
              Escolha o curso ideal para o seu nível
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Francês para Iniciantes", desc: "Fundamentos do idioma", price: "R$ 29,90", level: "Iniciante", color: "from-blue-500 to-blue-600" },
              { title: "Francês Intermediário", desc: "Gramática avançada", price: "R$ 49,90", level: "Intermediário", color: "from-indigo-500 to-indigo-600" },
              { title: "Conversação", desc: "Prática do dia-a-dia", price: "R$ 39,90", level: "Todos os Níveis", color: "from-violet-500 to-violet-600" },
              { title: "Francês para Negócios", desc: "Mundo corporativo", price: "R$ 59,90", level: "Avançado", color: "from-purple-500 to-purple-600" },
            ].map((course, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-32 bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                  <BookOpen className="w-12 h-12 text-white/80" />
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {course.level}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.desc}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-blue-600">{course.price}</span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 lg:p-16 shadow-2xl shadow-blue-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
          <div className="relative space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-lg text-blue-100 max-w-xl mx-auto">
              Junte-se a mais de 500 alunos que já estão transformando suas carreiras com o francês.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-lg font-semibold bg-white text-blue-600 px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Criar Minha Conta <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-800">French LMS</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2026 French LMS. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Entrar
            </Link>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Termos
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Privacidade
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
