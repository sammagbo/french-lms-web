"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
      Home,
      BookOpen,
      PlusCircle,
      Inbox,
      Users,
      Settings,
      LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
      { label: 'Início', href: '/dashboard', icon: Home },
      { label: 'Cursos', href: '/teacher/courses', icon: BookOpen },
      { label: '+ Novo Curso', href: '/teacher/courses/new', icon: PlusCircle, highlight: true },
      { label: 'Mensagens', href: '/teacher/inbox', icon: Inbox },
      { label: 'Comunidade', href: '/dashboard/community', icon: Users },
      { label: 'Configurações', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
      const pathname = usePathname();

      return (
            <aside className="hidden w-64 flex-col border-r bg-white/80 backdrop-blur-md md:flex h-full transition-all duration-300">
                  <div className="flex h-16 items-center justify-center border-b px-6">
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                              French LMS
                        </span>
                  </div>

                  <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
                        {navItems.map((item) => {
                              const isActive = pathname === item.href;
                              const Icon = item.icon;

                              return (
                                    <Link
                                          key={item.href}
                                          href={item.href}
                                          className={cn(
                                                "group flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                                                isActive
                                                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600",
                                                item.highlight && !isActive && "text-blue-600 bg-blue-50 font-semibold"
                                          )}
                                    >
                                          <Icon className={cn(
                                                "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                                                isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600"
                                          )} />
                                          {item.label}
                                    </Link>
                              );
                        })}
                  </nav>

                  <div className="p-4 border-t border-gray-100">
                        <button
                              onClick={() => {
                                    localStorage.removeItem('token');
                                    window.location.href = '/login';
                              }}
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group"
                        >
                              <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-600 transition-transform duration-200 group-hover:-translate-x-1" />
                              Sair
                        </button>
                  </div>
            </aside>
      );
}
