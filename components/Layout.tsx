
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Box, 
  ClipboardList, 
  AlertTriangle, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  Languages
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: 'VN' | 'EN';
  toggleLanguage: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, language, toggleLanguage }) => {
  const t = {
    VN: {
      dashboard: 'Bảng điều khiển',
      users: 'Người dùng',
      elevators: 'Thang máy',
      logs: 'Nhật ký truy cập',
      alerts: 'Cảnh báo & Sự cố',
      settings: 'Hệ thống',
      logout: 'Đăng xuất',
      admin: 'Quản trị viên'
    },
    EN: {
      dashboard: 'Dashboard',
      users: 'Users',
      elevators: 'Elevators',
      logs: 'Access Logs',
      alerts: 'Alerts & Incidents',
      settings: 'System Settings',
      logout: 'Logout',
      admin: 'System Admin'
    }
  }[language];

  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: t.dashboard },
    { id: 'users', icon: <Users size={20} />, label: t.users },
    { id: 'elevators', icon: <Box size={20} />, label: t.elevators },
    { id: 'logs', icon: <ClipboardList size={20} />, label: t.logs },
    { id: 'alerts', icon: <AlertTriangle size={20} />, label: t.alerts },
    { id: 'settings', icon: <Settings size={20} />, label: t.settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Box className="text-white" size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight">EAMS Pro</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center space-x-4">
            <button className="md:hidden text-gray-500">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find(m => m.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 text-gray-600 transition-colors"
            >
              <Languages size={16} />
              <span>{language}</span>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">{t.admin}</p>
              </div>
              <img 
                src="https://picsum.photos/seed/admin/40/40" 
                alt="Profile" 
                className="w-10 h-10 rounded-full ring-2 ring-gray-100"
              />
            </div>
          </div>
        </header>

        {/* Viewport */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
