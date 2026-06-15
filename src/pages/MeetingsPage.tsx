import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Card, CardHeader, Button, Badge, Avatar } from '@/components/ui';
import { useAppStore } from '@/stores/appStore';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';

interface Meeting {
  id: string;
  title: string;
  client: string;
  property: string;
  time: string;
  date: string;
  duration: number;
  type: 'viewing' | 'consultation' | 'signing';
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Перегляд квартири',
    client: 'Олена Петренко',
    property: 'Хрещатик 22, кв. 45',
    time: '10:00',
    date: format(new Date(), 'yyyy-MM-dd'),
    duration: 60,
    type: 'viewing',
  },
  {
    id: '2',
    title: 'Підписання договору',
    client: 'Іван Сидоренко',
    property: 'Офіс, БЦ Паркус',
    time: '14:00',
    date: format(new Date(), 'yyyy-MM-dd'),
    duration: 45,
    type: 'signing',
  },
  {
    id: '3',
    title: 'Консультація',
    client: 'Марія Бондар',
    property: 'Головний офіс',
    time: '16:30',
    date: format(new Date(), 'yyyy-MM-dd'),
    duration: 30,
    type: 'consultation',
  },
];

const typeColors = {
  viewing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  consultation: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  signing: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const typeLabels = {
  viewing: { uk: 'Перегляд', en: 'Viewing' },
  consultation: { uk: 'Консультація', en: 'Consultation' },
  signing: { uk: 'Підписання', en: 'Signing' },
};

export const MeetingsPage: React.FC = () => {
  const { language } = useAppStore();
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const locale = language === 'uk' ? uk : enUS;

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = language === 'uk'
    ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getMeetingsForDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return mockMeetings.filter((m) => m.date === dateStr);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {language === 'uk' ? 'Розклад зустрічей' : 'Meeting Schedule'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {language === 'uk'
              ? 'Календар вашої активності'
              : 'Your activity calendar'}
          </p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>
          {language === 'uk' ? 'Додати зустріч' : 'Add Meeting'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {format(currentDate, 'LLLL yyyy', { locale })}
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                {language === 'uk' ? 'Сьогодні' : 'Today'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: (monthStart.getDay() + 6) % 7 }).map((_, i) => (
              <div key={`empty-${i}`} className="h-24" />
            ))}
            {days.map((day) => {
              const dayMeetings = getMeetingsForDay(day);
              const isCurrentDay = isToday(day);

              return (
                <div
                  key={day.toISOString()}
                  className={`h-24 p-1 border border-gray-100 dark:border-gray-700 rounded-lg ${
                    isCurrentDay ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                  }`}
                >
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isCurrentDay
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-0.5">
                    {dayMeetings.slice(0, 2).map((meeting) => (
                      <div
                        key={meeting.id}
                        className={`text-xs px-1 py-0.5 rounded truncate ${typeColors[meeting.type]}`}
                      >
                        {meeting.time} {meeting.title}
                      </div>
                    ))}
                    {dayMeetings.length > 2 && (
                      <div className="text-xs text-gray-400 px-1">
                        +{dayMeetings.length - 2} {language === 'uk' ? 'ще' : 'more'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Today's meetings */}
        <Card>
          <CardHeader
            title={language === 'uk' ? 'Сьогоднішні зустрічі' : "Today's Meetings"}
          />
          <div className="space-y-3">
            {mockMeetings.length > 0 ? (
              mockMeetings.map((meeting) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {meeting.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Clock className="w-4 h-4" />
                        <span>{meeting.time}</span>
                        <span className="text-gray-300">|</span>
                        <span>{meeting.duration} min</span>
                      </div>
                    </div>
                    <Badge
                      variant="default"
                      className={typeColors[meeting.type]}
                    >
                      {typeLabels[meeting.type][language]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <Users className="w-4 h-4" />
                    <span>{meeting.client}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{meeting.property}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {language === 'uk' ? 'Немає зустрічей на сьогодні' : 'No meetings today'}
              </div>
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
