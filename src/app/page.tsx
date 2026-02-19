import Link from "next/link";
import { BookOpen, GraduationCap, Globe, Users, ArrowRight, Play, Star, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation — Transparent over hero */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">🗼</span>
            </div>
            <span className="text-lg font-bold text-white tracking-wide">
              French Language Learning
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-white/80 hover:text-white transition-colors">Home</Link>
            <Link href="/login" className="text-sm text-white/80 hover:text-white transition-colors">Courses</Link>
            <a href="#contact" className="text-sm text-white/80 hover:text-white transition-colors">Contact</a>
            <a href="#about" className="text-sm text-white/80 hover:text-white transition-colors">Blog</a>
            <a href="#about" className="text-sm text-white/80 hover:text-white transition-colors">About Us</a>
            <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">More</a>
            <Link
              href="/login"
              className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section — Paris Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/paris-hero.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/2519660/2519660-uhd_2560_1440_24fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-emerald-400 leading-tight tracking-tight drop-shadow-2xl">
            MASTER FRENCH
            <br />
            EASILY <Sparkles className="inline-block w-12 h-12 md:w-16 md:h-16 text-emerald-400" />
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Learn French online with interactive lessons, expert tutors, and
            a vibrant community. Improve step by step at your own pace.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              Explore Courses
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-lg font-semibold text-white bg-transparent px-8 py-4 rounded-xl border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              Why Choose{" "}
              <span className="text-blue-600">French LMS</span>?
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              A complete platform to master French, from beginner to advanced.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Structured Lessons",
                desc: "Content organized in progressive modules with practical exercises.",
                gradient: "from-blue-500 to-blue-600",
              },
              {
                icon: GraduationCap,
                title: "Native Teachers",
                desc: "Learn from experienced and certified French-speaking teachers.",
                gradient: "from-indigo-500 to-indigo-600",
              },
              {
                icon: Users,
                title: "Active Community",
                desc: "Join forums, study groups, and live events.",
                gradient: "from-violet-500 to-violet-600",
              },
              {
                icon: Globe,
                title: "100% Online",
                desc: "Study at your own pace, anywhere, anytime.",
                gradient: "from-purple-500 to-purple-600",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-blue-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
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
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">Featured Courses</h2>
            <p className="text-lg text-gray-500">
              Choose the ideal course for your level
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "French for Beginners", desc: "Language fundamentals", price: "R$ 29,90", level: "Beginner", color: "from-blue-500 to-blue-600" },
              { title: "Intermediate French", desc: "Advanced grammar", price: "R$ 49,90", level: "Intermediate", color: "from-indigo-500 to-indigo-600" },
              { title: "Conversation", desc: "Daily life practice", price: "R$ 39,90", level: "All Levels", color: "from-violet-500 to-violet-600" },
              { title: "Business French", desc: "Corporate world", price: "R$ 59,90", level: "Advanced", color: "from-purple-500 to-purple-600" },
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
      <section className="py-20 px-6 bg-white" id="contact">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 lg:p-16 shadow-2xl shadow-blue-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
          <div className="relative space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to start your journey?
            </h2>
            <p className="text-lg text-blue-100 max-w-xl mx-auto">
              Join more than 500 students who are already transforming their careers with French.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-lg font-semibold bg-white text-blue-600 px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Create My Account <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50" id="about">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">About Us</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            French Language Learning is a modern platform designed to help Brazilian students
            master the French language. Founded by passionate educators and language enthusiasts,
            we combine technology with proven teaching methods to deliver an immersive learning experience.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗼</span>
            <span className="text-sm font-bold">French Language Learning</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2026 French Language Learning. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
