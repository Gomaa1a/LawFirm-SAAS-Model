import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Files, 
  FileEdit, 
  Settings, 
  LogOut, 
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Document Intake', href: '/document-intake', icon: FileText },
    { name: 'Legal Assistant', href: '/chat', icon: MessageSquare },
    { name: 'Documents', href: '/documents', icon: Files },
    { name: 'Templates', href: '/templates', icon: FileEdit },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white';
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-slate-900 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <ShieldCheck className="h-8 w-8 text-blue-500 mr-2" />
            <div>
              <h1 className="text-xl font-bold text-white">Seekers</h1>
              <p className="text-xs text-slate-400">Legal Automation</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col px-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${isActive(item.href)} group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150`}
              >
                <item.icon className="mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />
                {item.name}
              </Link>
            ))}
          </div>
          {/* User Profile Section Removed */}
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 w-full z-20 bg-slate-900 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <ShieldCheck className="h-6 w-6 text-blue-500 mr-2" />
          <span className="text-white font-bold">Seekers</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-10 bg-slate-900 pt-20 px-4 md:hidden">
           <div className="flex flex-col space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`${isActive(item.href)} flex items-center px-4 py-3 text-base font-medium rounded-md`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden md:mt-0 mt-16">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;