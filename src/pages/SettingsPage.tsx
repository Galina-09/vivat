import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Building2,
  Save,
  Camera,
} from 'lucide-react';
import { Card, CardHeader, Button, Input, Select, Textarea, Avatar, Tabs } from '@/components/ui';
import { useAppStore } from '@/stores/appStore';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage } = useAppStore();
  const { profile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    notifications_email: true,
    notifications_push: true,
    notifications_meetings: true,
  });

  const tabs = [
    { id: 'profile', label: language === 'uk' ? 'Профіль' : 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'notifications', label: language === 'uk' ? 'Сповіщення' : 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'security', label: language === 'uk' ? 'Безпека' : 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'appearance', label: language === 'uk' ? 'Оформлення' : 'Appearance', icon: <Sun className="w-4 h-4" /> },
  ];

  const handleSave = () => {
    toast.success(language === 'uk' ? 'Налаштування збережено!' : 'Settings saved!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {language === 'uk' ? 'Налаштування' : 'Settings'}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {language === 'uk'
            ? 'Керуйте вашим акаунтом та налаштуваннями'
            : 'Manage your account and preferences'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <Card className="lg:w-64" padding="sm">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            className="flex-col"
          />
        </Card>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader
                title={language === 'uk' ? 'Профіль користувача' : 'User Profile'}
                subtitle={language === 'uk' ? 'Ваші особисті дані' : 'Your personal information'}
              />
              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar name={formData.full_name} size="xl" />
                  <div>
                    <Button variant="secondary" size="sm" leftIcon={<Camera className="w-4 h-4" />}>
                      {language === 'uk' ? 'Змінити фото' : 'Change photo'}
                    </Button>
                    <p className="text-xs text-gray-400 mt-1">
                      {language === 'uk' ? 'JPG, PNG. Max 2MB' : 'JPG, PNG. Max 2MB'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label={language === 'uk' ? 'Повне ім\'я' : 'Full Name'}
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    label={language === 'uk' ? 'Телефон' : 'Phone'}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Input
                    label={language === 'uk' ? 'Роль' : 'Role'}
                    value={profile?.role || ''}
                    disabled
                  />
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
                  <Button onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
                    {language === 'uk' ? 'Зберегти' : 'Save'}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader
                title={language === 'uk' ? 'Налаштування сповіщень' : 'Notification Settings'}
                subtitle={language === 'uk' ? 'Керуйте як отримувати сповіщення' : 'Manage how you receive notifications'}
              />
              <div className="space-y-4">
                {[
                  { key: 'notifications_email', label: language === 'uk' ? 'Email сповіщення' : 'Email notifications' },
                  { key: 'notifications_push', label: language === 'uk' ? 'Push-сповіщення' : 'Push notifications' },
                  { key: 'notifications_meetings', label: language === 'uk' ? 'Нагадування про зустрічі' : 'Meeting reminders' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData[item.key as keyof typeof formData] as boolean}
                        onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader
                title={language === 'uk' ? 'Безпека акаунта' : 'Account Security'}
                subtitle={language === 'uk' ? 'Змініть пароль та налаштування безпеки' : 'Update your password and security settings'}
              />
              <div className="space-y-4">
                <Input
                  label={language === 'uk' ? 'Поточний пароль' : 'Current Password'}
                  type="password"
                  placeholder="••••••••"
                />
                <Input
                  label={language === 'uk' ? 'Новий пароль' : 'New Password'}
                  type="password"
                  placeholder="••••••••"
                />
                <Input
                  label={language === 'uk' ? 'Підтвердіть пароль' : 'Confirm Password'}
                  type="password"
                  placeholder="••••••••"
                />
                <Button className="mt-4">
                  {language === 'uk' ? 'Змінити пароль' : 'Update Password'}
                </Button>
              </div>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card>
              <CardHeader
                title={language === 'uk' ? 'Оформлення інтерфейсу' : 'Interface Appearance'}
                subtitle={language === 'uk' ? 'Налаштуйте вигляд додатку' : 'Customize how the app looks'}
              />
              <div className="space-y-6">
                {/* Theme */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {language === 'uk' ? 'Тема' : 'Theme'}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => theme === 'dark' && toggleTheme()}
                      className={`p-4 rounded-xl border-2 ${
                        theme === 'light'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <Sun className="w-6 h-6 mx-auto mb-2 text-amber-500" />
                      <span className="text-sm font-medium">{language === 'uk' ? 'Світла' : 'Light'}</span>
                    </button>
                    <button
                      onClick={() => theme === 'light' && toggleTheme()}
                      className={`p-4 rounded-xl border-2 ${
                        theme === 'dark'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <Moon className="w-6 h-6 mx-auto mb-2 text-primary-500" />
                      <span className="text-sm font-medium">{language === 'uk' ? 'Темна' : 'Dark'}</span>
                    </button>
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {language === 'uk' ? 'Мова інтерфейсу' : 'Interface Language'}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setLanguage('uk')}
                      className={`p-4 rounded-xl border-2 ${
                        language === 'uk'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">🇺🇦</span>
                      <span className="text-sm font-medium">Українська</span>
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`p-4 rounded-xl border-2 ${
                        language === 'en'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">🇬🇧</span>
                      <span className="text-sm font-medium">English</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
};
