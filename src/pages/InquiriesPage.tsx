import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
} from 'lucide-react';
import { Card, Button, Input, Badge, Avatar, Modal, Textarea, Select, Tabs } from '@/components/ui';
import { useAppStore } from '@/stores/appStore';
import { formatDistanceToNow } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';

interface Inquiry {
  id: string;
  subject: string;
  client_name: string;
  client_email: string;
  status: 'open' | 'in_progress' | 'waiting_client' | 'resolved' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  category: string;
  assigned_to: string | null;
  created_at: string;
  last_message: string;
  messages_count: number;
}

const mockInquiries: Inquiry[] = [
  {
    id: '1',
    subject: 'Питання про іпотечне кредитування',
    client_name: 'Олена Петренко',
    client_email: 'olena@email.com',
    status: 'open',
    priority: 'high',
    category: 'Financing',
    assigned_to: null,
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    last_message: 'Добрий день! Цікавить можливість оформлення іпотеки на квартиру...',
    messages_count: 3,
  },
  {
    id: '2',
    subject: 'Затримка з підписанням договору',
    client_name: 'Іван Сидоренко',
    client_email: 'ivan@email.com',
    status: 'in_progress',
    priority: 'urgent',
    category: 'Legal',
    assigned_to: 'Марія Коваленко',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    last_message: 'Коли можна підписати договір купівлі-продажу?',
    messages_count: 5,
  },
  {
    id: '3',
    subject: 'Запит на перегляд нерухомості',
    client_name: 'Петро Михайленко',
    client_email: 'petro@email.com',
    status: 'waiting_client',
    priority: 'normal',
    category: 'Viewing',
    assigned_to: 'Андрій Шевченко',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    last_message: 'Підберіть зручний час для перегляду квартири',
    messages_count: 2,
  },
  {
    id: '4',
    subject: 'Дякуємо за допомогу!',
    client_name: 'ТОВ "ПромТорг"',
    client_email: 'office@promtorg.ua',
    status: 'resolved',
    priority: 'low',
    category: 'General',
    assigned_to: 'Олена Коваленко',
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    last_message: 'Дякуємо за професійну допомогу в підборі офісу!',
    messages_count: 8,
  },
];

const statusLabels = {
  open: { uk: 'Відкрито', en: 'Open' },
  in_progress: { uk: 'В опрацюванні', en: 'In Progress' },
  waiting_client: { uk: 'Очікує клієнта', en: 'Waiting Client' },
  resolved: { uk: 'Вирішено', en: 'Resolved' },
  closed: { uk: 'Закрито', en: 'Closed' },
};

const priorityLabels = {
  low: { uk: 'Низький', en: 'Low' },
  normal: { uk: 'Звичайний', en: 'Normal' },
  high: { uk: 'Високий', en: 'High' },
  urgent: { uk: 'Терміновий', en: 'Urgent' },
};

const statusVariants = {
  open: 'warning',
  in_progress: 'info',
  waiting_client: 'default',
  resolved: 'success',
  closed: 'default',
} as const;

const priorityColors = {
  low: 'text-gray-500',
  normal: 'text-blue-500',
  high: 'text-orange-500',
  urgent: 'text-red-500',
};

export const InquiriesPage: React.FC = () => {
  const { language } = useAppStore();
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const locale = language === 'uk' ? uk : enUS;

  const tabs = [
    { id: 'all', label: language === 'uk' ? 'Усі' : 'All', badge: inquiries.length },
    { id: 'open', label: statusLabels.open[language], badge: inquiries.filter((i) => i.status === 'open').length },
    { id: 'in_progress', label: statusLabels.in_progress[language], badge: inquiries.filter((i) => i.status === 'in_progress').length },
    { id: 'urgent', label: priorityLabels.urgent[language], badge: inquiries.filter((i) => i.priority === 'urgent').length },
  ];

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.client_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'open' && inquiry.status === 'open') ||
      (activeTab === 'in_progress' && inquiry.status === 'in_progress') ||
      (activeTab === 'urgent' && inquiry.priority === 'urgent');
    return matchesSearch && matchesTab;
  });

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
            {language === 'uk' ? 'Заявки клієнтів' : 'Client Inquiries'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredInquiries.length} {language === 'uk' ? 'заявок' : 'inquiries'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Search */}
      <Card padding="sm">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === 'uk' ? 'Пошук за темою або клієнтом...' : 'Search by subject or client...'}
          leftIcon={<Search className="w-4 h-4" />}
        />
      </Card>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.map((inquiry, index) => (
          <motion.div
            key={inquiry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              hover
              onClick={() => setSelectedInquiry(inquiry)}
              className="cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <Avatar name={inquiry.client_name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {inquiry.subject}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <User className="w-4 h-4" />
                        <span>{inquiry.client_name}</span>
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                        <span>{inquiry.client_email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={statusVariants[inquiry.status]}>
                        {statusLabels[inquiry.status][language]}
                      </Badge>
                      <span className={`text-xs font-medium ${priorityColors[inquiry.priority]}`}>
                        {priorityLabels[inquiry.priority][language]}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-1">
                    {inquiry.last_message}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {formatDistanceToNow(new Date(inquiry.created_at), {
                          addSuffix: true,
                          locale,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{inquiry.messages_count}</span>
                    </div>
                    {inquiry.assigned_to && (
                      <div className="flex items-center gap-1">
                        <Avatar name={inquiry.assigned_to} size="xs" />
                        <span>{inquiry.assigned_to}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        title={selectedInquiry?.subject}
        size="lg"
      >
        {selectedInquiry && (
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <Avatar name={selectedInquiry.client_name} size="lg" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {selectedInquiry.client_name}
                </h3>
                <p className="text-sm text-gray-500">{selectedInquiry.client_email}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Badge variant={statusVariants[selectedInquiry.status]}>
                  {statusLabels[selectedInquiry.status][language]}
                </Badge>
              </div>
            </div>

            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              <div className="flex gap-3">
                <Avatar name={selectedInquiry.client_name} size="sm" />
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-sm p-4">
                  <p className="text-sm">{selectedInquiry.last_message}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
              <Textarea
                placeholder={language === 'uk' ? 'Напишіть відповідь...' : 'Type your response...'}
                rows={3}
              />
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="secondary">
                  {language === 'uk' ? 'AI відповідь' : 'AI Response'}
                </Button>
                <Button>
                  {language === 'uk' ? 'Надіслати' : 'Send'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};
