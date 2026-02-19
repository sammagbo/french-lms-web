import { Menu } from 'lucide-react';
import Link from 'next/link';
import { AuthGuard } from '@/components/auth-guard';

export default function DashboardLayout({
      children,
}: {
      children: React.ReactNode;
}) {
      return (
            <AuthGuard>
                  <div className="flex h-screen overflow-hidden bg-gray-100">
                        {/* Sidebar (Hidden on mobile by default, handled via state/css in real implementation) */}
                        <aside className="hidden w-64 flex-col border-r bg-white md:flex">
                              <div className="flex h-16 items-center justify-center border-b px-4">
                                    <span className="text-xl font-bold text-blue-600">LMS French</span>
                              </div>
                              <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                                    {/* Navigation Items would go here */}
                                    <Link href="/dashboard" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Início</Link>
                                    <Link href="/teacher/courses" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Cursos</Link>
                                    <Link href="/teacher/courses/new" className="block px-4 py-2 text-blue-600 bg-blue-50 font-medium rounded-md">+ Novo Curso</Link>
                                    <Link href="/teacher/inbox" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Mensagens</Link>
                                    <div className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">Comunidade</div>
                                    <div className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">Configurações</div>
                              </nav>
                        </aside>

                        {/* Main Content Area */}
                        <div className="flex flex-1 flex-col overflow-hidden">
                              {/* Header */}
                              <header className="flex h-16 items-center justify-between border-b bg-white px-6">
                                    <button className="text-gray-500 hover:text-gray-700 md:hidden">
                                          <Menu className="h-6 w-6" />
                                    </button>
                                    <div className="flex items-center space-x-4">
                                          {/* User Profile / Notifications */}
                                          <span className="text-sm font-medium text-gray-700">User Profile</span>
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
