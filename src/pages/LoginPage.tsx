import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, Lock, ArrowRight, UserPlus, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import { Button, Input, Card } from '@/components/ui';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const { language } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'admin' | 'manager' | 'agent' | 'support'>('agent');

  // Quick setup function - creates demo users directly
  const handleQuickSetup = async () => {
    try {
      const demoUsers = [
        { email: 'admin@vivat.ua', password: 'demo123', fullName: 'Адміністратор ViVaT', role: 'admin' },
        { email: 'manager@vivat.ua', password: 'demo123', fullName: 'Марія Менеджер', role: 'manager' },
        { email: 'agent@vivat.ua', password: 'demo123', fullName: 'Олена Агент', role: 'agent' },
      ];

      for (const user of demoUsers) {
        // Try to sign up
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: user.email,
          password: user.password,
        });

        if (data.user && !signUpError) {
          // Create profile
          await supabase.from('profiles').insert({
            id: data.user.id,
            email: user.email,
            full_name: user.fullName,
            role: user.role as 'admin' | 'manager' | 'agent' | 'support',
            branch_id: '11111111-1111-1111-1111-111111111111',
          });
        }
      }

      toast.success(language === 'uk' ? 'Демо акаунти створено! Тепер можете увійти.' : 'Demo accounts created! You can now login.');
    } catch (err) {
      console.error('Quick setup error:', err);
      toast.error(language === 'uk' ? 'Помилка створення демо акаунтів' : 'Error creating demo accounts');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      if (isRegister) {
        // Register new user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (authError) throw authError;

        if (authData.user) {
          // Create profile
          const { error: profileError } = await supabase.from('profiles').insert({
            id: authData.user.id,
            email,
            full_name: fullName,
            role: role,
            branch_id: '11111111-1111-1111-1111-111111111111',
          });

          if (profileError) throw profileError;

          toast.success(language === 'uk' ? 'Реєстрація успішна!' : 'Registration successful!');
          navigate('/dashboard');
        }
      } else {
        // Login
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) throw authError;

        if (authData.user) {
          // Fetch profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*, branch:branches(*)')
            .eq('id', authData.user.id)
            .maybeSingle();

          useAuthStore.setState({
            user: authData.user as any,
            profile: profileData,
            isAuthenticated: true,
            isLoading: false,
          });

          toast.success(language === 'uk' ? 'Вхід успішний!' : 'Login successful!');
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      const errorMessage = err?.message || (language === 'uk' ? 'Помилка авторизації' : 'Authentication failed');

      // Handle specific errors
      if (errorMessage.includes('Invalid login credentials')) {
        toast.error(language === 'uk' ? 'Невірний email або пароль' : 'Invalid email or password');
      } else if (errorMessage.includes('already registered')) {
        toast.error(language === 'uk' ? 'Користувач вже існує' : 'User already exists');
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4"
            >
              <Building2 className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ViVaT {language === 'uk' ? 'Агенція нерухомості' : 'Real Estate'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {language === 'uk' ? 'Інформаційна система керування' : 'Property Management System'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <>
                <Input
                  label={language === 'uk' ? "Повне ім'я" : 'Full Name'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={language === 'uk' ? "Введіть ваше ім'я" : 'Enter your name'}
                  leftIcon={<UserPlus className="w-4 h-4" />}
                  required
                />
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {language === 'uk' ? 'Роль' : 'Role'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['admin', 'manager', 'agent', 'support'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`px-3 py-2 text-sm rounded-xl border transition-colors ${
                          role === r
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {r === 'admin' ? (language === 'uk' ? 'Адміністратор' : 'Administrator') :
                         r === 'manager' ? (language === 'uk' ? 'Менеджер' : 'Manager') :
                         r === 'agent' ? (language === 'uk' ? 'Агент' : 'Agent') :
                         (language === 'uk' ? 'Підтримка' : 'Support')}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@vivat.ua"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />
            <Input
              label={language === 'uk' ? 'Пароль' : 'Password'}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isRegister
                ? language === 'uk'
                  ? 'Зареєструватися'
                  : 'Register'
                : language === 'uk'
                ? 'Увійти'
                : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {isRegister
                ? language === 'uk'
                  ? 'Вже є акаунт? Увійти'
                  : 'Already have an account? Sign in'
                : language === 'uk'
                ? 'Немає акаунта? Зареєструватися'
                : "Don't have an account? Register"}
            </button>
          </div>

          {/* Quick Setup Button */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
              {language === 'uk'
                ? 'Швидке налаштування демо акаунтів'
                : 'Quick setup for demo accounts'}
            </p>
            <Button
              variant="secondary"
              onClick={handleQuickSetup}
              leftIcon={<Sparkles className="w-4 h-4" />}
              className="w-full"
            >
              {language === 'uk' ? 'Створити демо акаунти' : 'Create Demo Accounts'}
            </Button>

            <div className="mt-6 space-y-2">
              <p className="text-xs text-gray-400 text-center">
                {language === 'uk' ? 'Після створення використовуйте:' : 'After creation, use:'}
              </p>
              {[
                { email: 'admin@vivat.ua', pwd: 'demo123' },
                { email: 'manager@vivat.ua', pwd: 'demo123' },
                { email: 'agent@vivat.ua', pwd: 'demo123' },
              ].map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => {
                    setEmail(acc.email);
                    setPassword(acc.pwd);
                    setIsRegister(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  <span className="font-medium text-gray-700 dark:text-gray-200">{acc.email}</span>
                  <span className="text-gray-400 ml-2">/ {acc.pwd}</span>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
