import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Calendar,
  MessageSquare,
  Home,
} from 'lucide-react';
import { Card, CardHeader, Badge } from '@/components/ui';
import { StatCard, RecentActivity, UpcomingMeetings } from '@/components/dashboard';
import { LineChart, BarChart, PieChart } from '@/components/charts';
import { useAppStore } from '@/stores/appStore';

const salesData = [
  { name: 'Січ', value: 45 },
  { name: 'Лют', value: 52 },
  { name: 'Бер', value: 61 },
  { name: 'Кві', value: 58 },
  { name: 'Тра', value: 72 },
  { name: 'Чер', value: 85 },
];

const rentData = [
  { name: 'Квартири', value: 145 },
  { name: 'Будинки', value: 89 },
  { name: 'Офіси', value: 52 },
  { name: 'Комерція', value: 34 },
];

const statusData = [
  { name: 'Доступно', value: 234, color: '#10b981' },
  { name: 'Продано', value: 89, color: '#3b82f6' },
  { name: 'Оренда', value: 156, color: '#f59e0b' },
  { name: 'Очікує', value: 12, color: '#94a3b8' },
];

export const DashboardPage: React.FC = () => {
  const { language } = useAppStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {language === 'uk' ? 'Головна панель' : 'Dashboard'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {language === 'uk'
              ? 'Огляд активності вашого агентства'
              : 'Overview of your agency activity'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse" />
            {language === 'uk' ? 'Система онлайн' : 'System online'}
          </Badge>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          title={language === 'uk' ? 'Всього об\'єктів' : 'Total Properties'}
          value="491"
          change={12}
          changeLabel={language === 'uk' ? 'за місяць' : 'this month'}
          icon={Building2}
          iconColor="text-primary-600"
          trend="up"
        />
        <StatCard
          title={language === 'uk' ? 'Активних клієнтів' : 'Active Clients'}
          value="384"
          change={8}
          changeLabel={language === 'uk' ? 'за місяць' : 'this month'}
          icon={Users}
          iconColor="text-green-600"
          trend="up"
        />
        <StatCard
          title={language === 'uk' ? 'Дохід (місяць)' : 'Monthly Revenue'}
          value="$125K"
          change={15}
          changeLabel={language === 'uk' ? 'зростання' : 'growth'}
          icon={DollarSign}
          iconColor="text-amber-600"
          trend="up"
        />
        <StatCard
          title={language === 'uk' ? 'Відкриті заявки' : 'Open Inquiries'}
          value="24"
          change={-5}
          changeLabel={language === 'uk' ? 'з минулого тижня' : 'from last week'}
          icon={MessageSquare}
          iconColor="text-blue-600"
          trend="down"
        />
      </motion.div>

      {/* Secondary Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <StatCard
          title={language === 'uk' ? 'Переглядів за день' : 'Daily Views'}
          value="1,423"
          icon={Eye}
          iconColor="text-purple-600"
        />
        <StatCard
          title={language === 'uk' ? 'Зустрічі на тиждень' : 'Meetings This Week'}
          value="18"
          icon={Calendar}
          iconColor="text-cyan-600"
        />
        <StatCard
          title={language === 'uk' ? 'Угод цього місяця' : 'Deals This Month'}
          value="32"
          change={23}
          icon={Home}
          iconColor="text-emerald-600"
        />
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader
            title={language === 'uk' ? 'Динаміка продажів' : 'Sales Performance'}
            subtitle={language === 'uk' ? 'Останні 6 місяців' : 'Last 6 months'}
          />
          <LineChart data={salesData} color="#3b82f6" area />
        </Card>
        <Card>
          <CardHeader
            title={language === 'uk' ? 'Розподіл оренди' : 'Rent Distribution'}
            subtitle={language === 'uk' ? 'За типом нерухомості' : 'By property type'}
          />
          <BarChart data={rentData} color="#10b981" />
        </Card>
      </motion.div>

      {/* Bottom Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader
            title={language === 'uk' ? 'Статус об\'єктів' : 'Property Status'}
          />
          <PieChart
            data={statusData}
            innerRadius={50}
            outerRadius={80}
            height={250}
          />
        </Card>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
        <div className="lg:col-span-1">
          <UpcomingMeetings />
        </div>
      </motion.div>
    </motion.div>
  );
};
