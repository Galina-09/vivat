import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Card, CardHeader, Badge, Avatar } from '@/components/ui';
import { format } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';
import { useAppStore } from '@/stores/appStore';

interface Meeting {
  id: string;
  title: string;
  client: string;
  property: string;
  time: string;
  duration: number;
  location?: string;
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Property Viewing',
    client: 'Ivan Petrenko',
    property: '2-room apartment, Shevchenka 45',
    time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    duration: 60,
    location: 'Office',
  },
  {
    id: '2',
    title: 'Contract Signing',
    client: 'Maria Kovalchuk',
    property: 'Commercial space, Business Center',
    time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    duration: 90,
    location: 'Main Office',
  },
  {
    id: '3',
    title: 'Consultation',
    client: 'Oleh Sydorenko',
    property: 'Looking for office space',
    time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    duration: 45,
  },
];

export const UpcomingMeetings: React.FC = () => {
  const { language } = useAppStore();
  const locale = language === 'uk' ? uk : enUS;

  return (
    <Card>
      <CardHeader
        title={language === 'uk' ? 'Майбутні зустрічі' : 'Upcoming Meetings'}
        action={
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            {language === 'uk' ? 'Календар' : 'Calendar'}
          </button>
        }
      />
      <div className="space-y-3">
        {mockMeetings.map((meeting, index) => (
          <motion.div
            key={meeting.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                {meeting.title}
              </h4>
              <Badge variant="info" size="sm">
                {meeting.duration} min
              </Badge>
            </div>
            <div className="space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{meeting.client}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{meeting.property}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {format(new Date(meeting.time), 'HH:mm')}
                  {' - '}
                  {format(new Date(meeting.time), 'd MMM', { locale })}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
