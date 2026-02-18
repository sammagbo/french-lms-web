import { Menu } from 'lucide-react';

export default function DashboardLayout({
      children,
}: {
      children: React.ReactNode;
}) {
      return (
            <div className="flex h-screen overflow-hidden bg-gray-100">
                  {/* Sidebar (Hidden on mobile by default, handled via state/css in real implementation) */}
                  <aside className="hidden w-64 flex-col border-r bg-white md:flex">
                        <div className="flex h-16 items-center justify-center border-b px-4">
                              <span className="text-xl font-bold text-blue-600">LMS French</span>
                        </div>
                        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                              {/* Navigation Items would go here */}
                              <div className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">Dashboard</div>
                              <div className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">Courses</div>
                              <div className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">Community</div>
                              <div className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">Settings</div>
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
      );
}
