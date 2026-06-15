import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { Card, CardHeader, Badge, Tabs } from '@/components/ui';
import { LineChart, BarChart, PieChart } from '@/components/charts';
import { StatCard } from '@/components/dashboard';
import { useAppStore } from '@/stores/appStore';

const monthlyData = [
  { name: 'Січ', sales: 12, rentals: 8 },
  { name: 'Лют', sales: 15, rentals: 10 },
  { name: 'Бер', sales: 18, rentals: 12 },
  { name: 'Кві', sales: 14, rentals: 15 },
  { name: 'Тра', sales: 22, rentals: 18 },
  { name: 'Чер', sales: 28, rentals: 20 },
];

const propertyTypeData = [
  { name: 'Квартири', value: 145, color: '#3b82f6' },
  { name: 'Будинки', value: 89, color: '#10b981' },
  { name: 'Офіси', value: 52, color: '#f59e0b' },
  { name: 'Комерція', value: 34, color: '#8b5cf6' },
];

const conversionData = [
  { name: 'Ліди', value: 450 },
  { name: 'Кваліфіковані', value: 280 },
  { name: 'Зустрічі', value: 150 },
  { name: 'Угоди', value: 45 },
];

export const AnalyticsPage: React.FC = () => {
  const { language } = useAppStore();
  const [activeTab, setActiveTab] = React.useState('overview');

  const tabs = [
    { id: 'overview', label: language === 'uk' ? 'Огляд' : 'Overview' },
    { id: 'sales', label: language === 'uk' ? 'Продажі' : 'Sales' },
    { id: 'clients', label: language === 'uk' ? 'Клієнти' : 'Clients' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {language === 'uk' ? 'Аналітика' : 'Analytics'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {language === 'uk'
              ? 'Статистика та аналітичні дані'
              : 'Statistics and analytical data'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="info">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            {language === 'uk' ? 'Останні 6 місяців' : 'Last 6 months'}
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={language === 'uk' ? 'Всього продажів' : 'Total Sales'}
          value="109"
          change={24}
          changeLabel={language === 'uk' ? 'за квартал' : 'this quarter'}
          icon={TrendingUp}
          iconColor="text-green-600"
        />
        <StatCard
          title={language === 'uk' ? 'Всього оренди' : 'Total Rentals'}
          value="83"
          change={15}
          changeLabel={language === 'uk' ? 'за квартал' : 'this quarter'}
          icon={Building2}
          iconColor="text-amber-600"
        />
        <StatCard
          title={language === 'uk' ? 'Конверсія' : 'Conversion Rate'}
          value="10%"
          change={2.5}
          icon={Users}
          iconColor="text-purple-600"
        />
        <StatCard
          title={language === 'uk' ? 'Середній чек' : 'Avg. Deal Value'}
          value="$67K"
          change={8}
          icon={DollarSign}
          iconColor="text-blue-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader
            title={language === 'uk' ? 'Динаміка продажів та оренди' : 'Sales & Rentals Trend'}
          />
          <LineChart data={monthlyData} dataKey="sales" xAxisKey="name" color="#3b82f6" area />
        </Card>

        <Card>
          <CardHeader
            title={language === 'uk' ? 'Розподіл за типом нерухомості' : 'Distribution by Property Type'}
          />
          <PieChart data={propertyTypeData} innerRadius={60} outerRadius={90} height={300} />
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader
          title={language === 'uk' ? 'Воронка продажів' : 'Sales Funnel'}
          subtitle={language === 'uk' ? 'Конверсія клієнтів' : 'Client conversion'}
        />
        <div className="flex items-end justify-between gap-4 pt-4">
          {conversionData.map((item, index) => {
            const width = 100 - index * 15;
            const percentage = index === 0 ? 100 : Math.round((item.value / conversionData[index - 1].value) * 100);
            return (
              <div key={item.name} className="flex flex-col items-center flex-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full flex justify-center"
                >
                  <div
                    className="bg-primary-100 dark:bg-primary-900/30 rounded-t-lg flex flex-col items-center justify-center py-4"
                    style={{ width: `${width}%` }}
                  >
                    <span className="text-2xl font-bold text-primary-700 dark:text-primary-400">
                      {item.value}
                    </span>
                    <span className="text-xs text-primary-600 dark:text-primary-400">{item.name}</span>
                    {index > 0 && (
                      <span className="text-xs text-gray-400 mt-1">{percentage}%</span>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Team Performance */}
      <Card>
        <CardHeader
          title={language === 'uk' ? 'Продуктивність команди' : 'Team Performance'}
        />
        <div className="space-y-4">
          {[
            { name: 'Олена Коваленко', deals: 12, revenue: '$145,000' },
            { name: 'Андрій Шевченко', deals: 10, revenue: '$120,000' },
            { name: 'Марія Бондар', deals: 9, revenue: '$98,000' },
            { name: 'Іван Петренко', deals: 8, revenue: '$85,000' },
          ].map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100">{member.name}</p>
                <p className="text-sm text-gray-500">{member.deals} {language === 'uk' ? 'угод' : 'deals'}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary-600">{member.revenue}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
