import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  MessageSquare,
  Calendar,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { useAuthStore } from '@/stores/authStore';

const menuItems = [
  { path: '/dashboard', label: { uk: 'Головна', en: 'Dashboard' }, icon: LayoutDashboard },
  { path: '/properties', label: { uk: 'Нерухомість', en: 'Properties' }, icon: Building2 },
  { path: '/clients', label: { uk: 'Клієнти', en: 'Clients' }, icon: Users },
  { path: '/inquiries', label: { uk: 'Заявки', en: 'Inquiries' }, icon: MessageSquare },
  { path: '/meetings', label: { uk: 'Зустрічі', en: 'Meetings' }, icon: Calendar },
  { path: '/analytics', label: { uk: 'Аналітика', en: 'Analytics' }, icon: BarChart3 },
  { path: '/ai-assistant', label: { uk: 'AI Асистент', en: 'AI Assistant' }, icon: HelpCircle },
  { path: '/settings', label: { uk: 'Налаштування', en: 'Settings' }, icon: Settings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar, language } = useAppStore();
  const { logout } = useAuthStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 260 }}
      className="fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-700">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-gray-900 dark:text-gray-100"
            >
              ViVaT
            </motion.span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-600 dark:text-primary-400' : ''}`} />
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm"
                    >
                      {item.label[language]}
                    </motion.span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!sidebarCollapsed && (
            <span className="text-sm">{language === 'uk' ? 'Вийти' : 'Logout'}</span>
          )}
        </button>
      </div>

      {/* Collapse button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        )}
      </button>
    </motion.aside>
  );
};
