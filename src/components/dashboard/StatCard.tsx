import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: 'up' | 'down';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor = 'text-primary-600',
  trend,
}) => {
  return (
    <Card hover className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1"
          >
            {value}
          </motion.p>
          {(change !== undefined || changeLabel) && (
            <div className="flex items-center gap-1 mt-2">
              {trend && (
                trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )
              )}
              {change !== undefined && (
                <span
                  className={`text-sm font-medium ${
                    change >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {change >= 0 ? '+' : ''}
                  {change}%
                </span>
              )}
              {changeLabel && (
                <span className="text-xs text-gray-400">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className={`w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center ${iconColor}`}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
      </div>
      {/* Decorative gradient */}
      <div
        className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10 ${
          iconColor === 'text-primary-600' ? 'bg-primary-500' :
          iconColor === 'text-green-600' ? 'bg-green-500' :
          iconColor === 'text-amber-600' ? 'bg-amber-500' :
          iconColor === 'text-blue-600' ? 'bg-blue-500' :
          'bg-gray-500'
        }`}
      />
    </Card>
  );
};
