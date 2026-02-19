import { AuthGuard } from '@/components/auth-guard';
import { Sidebar } from '@/components/sidebar';
import { Menu } from 'lucide-react';

export default function DashboardLayout({
      children,
}: {
      children: React.ReactNode;
}) {
      return (
            <AuthGuard>
                  <div className="flex h-screen overflow-hidden bg-gray-100">
                        <Sidebar />

                        {/* Main Content Area */}
                        <div className="flex flex-1 flex-col overflow-hidden">
                              {/* Header */}
                              <header className="flex h-16 items-center justify-between border-b bg-white/80 backdrop-blur-md px-6 shadow-sm z-10">
                                    <button className="text-gray-500 hover:text-gray-700 md:hidden transition-colors">
                                          <Menu className="h-6 w-6" />
                                    </button>
                                    <div className="flex items-center space-x-4">
                                          {/* User Profile / Notifications */}
                                          <div className="flex items-center gap-2 group cursor-pointer">
                                                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold transition-transform group-hover:scale-110 shadow-md">
                                                      PS
                                                </div>
                                                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Professor</span>
                                          </div>
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
