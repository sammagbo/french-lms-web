"use client";

import { AuthGuard } from '@/components/auth-guard';
import { Sidebar } from '@/components/sidebar';
import { Menu, LogOut } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

const roleLabels: Record<string, string> = {
      STUDENT: 'Aluno',
      TEACHER: 'Professor',
      ADMIN: 'Administrador',
};

export default function DashboardLayout({
      children,
}: {
      children: React.ReactNode;
}) {
      const router = useRouter();

      const { data: user } = useQuery({
            queryKey: ['me'],
            queryFn: authService.getProfile,
            retry: false,
            staleTime: 5 * 60 * 1000,
      });

      const initials = user?.email?.substring(0, 2).toUpperCase() || '??';
      const roleLabel = user?.role ? roleLabels[user.role] || user.role : '...';

      return (
            <AuthGuard>
                  <div className="flex h-screen overflow-hidden bg-opal-lesson">
                        <Sidebar />

                        {/* Main Content Area */}
                        <div className="flex flex-1 flex-col overflow-hidden">
                              {/* Header */}
                              <header className="flex h-16 items-center justify-between border-b border-gray-200/50 bg-white/40 backdrop-blur-md px-6 z-10">
                                    <button className="text-gray-500 hover:text-gray-700 md:hidden transition-colors">
                                          <Menu className="h-6 w-6" />
                                    </button>
                                    <div className="flex items-center space-x-6">
                                          {/* User Profile */}
                                          <div className="flex items-center gap-2 group">
                                                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                                                      {initials}
                                                </div>
                                                <span className="text-sm font-semibold text-gray-700 hidden sm:block">{roleLabel}</span>
                                          </div>

                                          {/* Logout Button */}
                                          <button
                                                onClick={() => {
                                                      localStorage.removeItem('token');
                                                      localStorage.removeItem('user');
                                                      window.location.href = '/login';
                                                }}
                                                className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-gray-100 font-medium text-sm"
                                          >
                                                <LogOut className="h-4 w-4" />
                                                <span className="hidden sm:inline">Sair</span>
                                          </button>
                                    </div>
                              </header>

                              {/* Page Content */}
                              <main className="flex-1 overflow-y-auto p-6">
                                    {children}
                              </main>
                        </div>
                  </div>
            </AuthGuard>
      );
}

