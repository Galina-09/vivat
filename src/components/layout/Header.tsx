import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  Sun,
  Moon,
  Globe,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { Avatar, Button, Input } from '@/components/ui';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, language, setLanguage } = useAppStore();
  const { profile } = useAuthStore();
  const { notifications, unreadCount } = useNotificationStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const recentNotifications = notifications.slice(0, 5);

  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-700 z-30">
      <div className="h-full flex items-center justify-between px-4 lg:px-6" style={{ marginLeft: '260px' }}>
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'uk' ? 'Пошук нерухомості...' : 'Search properties...'}
            leftIcon={<Search className="w-4 h-4" />}
            className="w-full"
          />
        </form>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2.5"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>

          {/* Language */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="p-2.5"
            >
              <Globe className="w-5 h-5" />
            </Button>
            <AnimatePresence>
              {showLanguageMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowLanguageMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-20"
                  >
                    <button
                      onClick={() => {
                        setLanguage('uk');
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        language === 'uk' ? 'text-primary-600' : ''
                      }`}
                    >
                      Ukrainian
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        language === 'en' ? 'text-primary-600' : ''
                      }`}
                    >
                      English
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Button>
            <AnimatePresence>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-20"
                  >
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {language === 'uk' ? 'Сповіщення' : 'Notifications'}
                      </h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {recentNotifications.length > 0 ? (
                        recentNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                              !notification.is_read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                            }`}
                          >
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {notification.title}
                            </p>
                            {notification.message && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                          {language === 'uk' ? 'Немає сповіщень' : 'No notifications'}
                        </div>
                      )}
                    </div>
                    <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                      <Button variant="ghost" size="sm" className="w-full">
                        {language === 'uk' ? 'Переглянути всі' : 'View all'}
                      </Button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Profile menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Avatar name={profile?.full_name || 'User'} size="sm" online />
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-20"
                  >
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {profile?.full_name || 'User'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {profile?.email}
                      </p>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={() => {
                          navigate('/settings/profile');
                          setShowProfileMenu(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
                      >
                        <User className="w-4 h-4" />
                        {language === 'uk' ? 'Профіль' : 'Profile'}
                      </button>
                      <button
                        onClick={() => {
                          navigate('/settings');
                          setShowProfileMenu(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
                      >
                        <Settings className="w-4 h-4" />
                        {language === 'uk' ? 'Налаштування' : 'Settings'}
                      </button>
                      <button
                        onClick={() => {
                          useAuthStore.getState().logout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        {language === 'uk' ? 'Вийти' : 'Logout'}
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};
