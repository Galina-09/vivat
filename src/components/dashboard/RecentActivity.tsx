import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Home, Users, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import { Card, CardHeader, Avatar } from '@/components/ui';
import { formatDistanceToNow } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';
import { useAppStore } from '@/stores/appStore';

interface Activity {
  id: string;
  type: 'property' | 'client' | 'meeting' | 'inquiry' | 'deal';
  action: string;
  description: string;
  user: { name: string; avatar?: string };
  timestamp: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'property',
    action: 'Added new property',
    description: '3-room apartment in Kyiv center',
    user: { name: 'Olena Koval' },
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'client',
    action: 'New client registered',
    description: 'Ivan Petrenko - Looking for office space',
    user: { name: 'Andriy Shevchenko' },
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'meeting',
    action: 'Meeting scheduled',
    description: 'Property viewing at Lvivska 15',
    user: { name: 'Maria Bondar' },
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    type: 'inquiry',
    action: 'New inquiry received',
    description: 'Question about pricing for commercial space',
    user: { name: 'System' },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    type: 'deal',
    action: 'Deal closed',
    description: 'Apartment sold for $85,000',
    user: { name: 'Olena Koval' },
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
];

const activityIcons = {
  property: Home,
  client: Users,
  meeting: Calendar,
  inquiry: MessageSquare,
  deal: TrendingUp,
};

const activityColors = {
  property: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
  client: 'text-green-500 bg-green-100 dark:bg-green-900/30',
  meeting: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30',
  inquiry: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30',
  deal: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30',
};

export const RecentActivity: React.FC = () => {
  const { language } = useAppStore();

  return (
    <Card>
      <CardHeader
        title={language === 'uk' ? 'Остання активність' : 'Recent Activity'}
        action={
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            {language === 'uk' ? 'Переглянути всі' : 'View all'}
          </button>
        }
      />
      <div className="space-y-4">
        {mockActivities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activityColors[activity.type]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {activity.action}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar name={activity.user.name} size="xs" />
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(activity.timestamp), {
                      addSuffix: true,
                      locale: language === 'uk' ? uk : enUS,
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};
