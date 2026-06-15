import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  Building2,
  Calendar,
  MoreVertical,
  UserPlus,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { Card, Button, Input, Badge, Avatar, Modal, Textarea, Select } from '@/components/ui';
import { useAppStore } from '@/stores/appStore';
import { format } from 'date-fns';

interface Client {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  status: 'lead' | 'active' | 'closed' | 'blocked';
  source: string | null;
  budget_min: number | null;
  budget_max: number | null;
  preferred_property_type: string | null;
  preferred_city: string | null;
  notes: string | null;
  assigned_manager_id: string | null;
  last_contact: string | null;
  created_at: string;
  manager?: { name: string };
}

const mockClients: Client[] = [
  {
    id: '1',
    full_name: 'Олена Петренко',
    email: 'olena@email.com',
    phone: '+380501112233',
    status: 'active',
    source: 'Website',
    budget_min: 50000,
    budget_max: 80000,
    preferred_property_type: 'apartment',
    preferred_city: 'Вінниця',
    notes: 'Looking for 2-3 room apartment in center',
    assigned_manager_id: '1',
    last_contact: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    manager: { name: 'Марія Коваленко' },
  },
  {
    id: '2',
    full_name: 'Іван Сидоренко',
    email: 'ivan@email.com',
    phone: '+380671112233',
    status: 'lead',
    source: 'Referral',
    budget_min: 200000,
    budget_max: 300000,
    preferred_property_type: 'house',
    preferred_city: 'Вінниця',
    notes: 'Interested in house with garden',
    assigned_manager_id: null,
    last_contact: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    full_name: 'ТОВ "Бізнес Груп"',
    email: 'office@bgroup.ua',
    phone: '+380441112233',
    status: 'active',
    source: 'Cold call',
    budget_min: 3000,
    budget_max: 5000,
    preferred_property_type: 'office',
    preferred_city: 'Київ',
    notes: 'Looking for office space 100-150 sqm',
    assigned_manager_id: '1',
    last_contact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    manager: { name: 'Андрій Шевченко' },
  },
  {
    id: '4',
    full_name: 'Марія Бондар',
    email: 'maria.b@email.com',
    phone: '+380931112233',
    status: 'closed',
    source: 'Website',
    budget_min: null,
    budget_max: null,
    preferred_property_type: null,
    preferred_city: null,
    notes: 'Purchased apartment in Lviv',
    assigned_manager_id: '1',
    last_contact: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const statusLabels = {
  lead: { uk: 'Лід', en: 'Lead' },
  active: { uk: 'Активний', en: 'Active' },
  closed: { uk: 'Закритий', en: 'Closed' },
  blocked: { uk: 'Заблокований', en: 'Blocked' },
};

const statusVariants = {
  lead: 'info' as const,
  active: 'success' as const,
  closed: 'default' as const,
  blocked: 'danger' as const,
};

export const ClientsPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useAppStore();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({
    full_name: '',
    email: '',
    phone: '',
    source: '',
    notes: '',
  });

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery);
    const matchesStatus = !selectedStatus || client.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddClient = () => {
    const client: Client = {
      id: Date.now().toString(),
      full_name: newClient.full_name,
      email: newClient.email || null,
      phone: newClient.phone,
      status: 'lead',
      source: newClient.source || null,
      budget_min: null,
      budget_max: null,
      preferred_property_type: null,
      preferred_city: null,
      notes: newClient.notes || null,
      assigned_manager_id: null,
      last_contact: null,
      created_at: new Date().toISOString(),
    };
    setClients([client, ...clients]);
    setShowAddModal(false);
    setNewClient({ full_name: '', email: '', phone: '', source: '', notes: '' });
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
            {language === 'uk' ? 'Клієнти' : 'Clients'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredClients.length} {language === 'uk' ? 'клієнтів' : 'clients'}
          </p>
        </div>
        <Button
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setShowAddModal(true)}
        >
          {language === 'uk' ? 'Додати клієнта' : 'Add Client'}
        </Button>
      </div>

      {/* Search & Filters */}
      <Card padding="sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'uk' ? 'Пошук клієнта...' : 'Search clients...'}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <Select
            options={[
              { value: '', label: language === 'uk' ? 'Усі статуси' : 'All statuses' },
              { value: 'lead', label: statusLabels.lead[language] },
              { value: 'active', label: statusLabels.active[language] },
              { value: 'closed', label: statusLabels.closed[language] },
              { value: 'blocked', label: statusLabels.blocked[language] },
            ]}
            value={selectedStatus}
            onChange={setSelectedStatus}
            className="w-48"
          />
        </div>
      </Card>

      {/* Clients List */}
      <div className="space-y-4">
        {filteredClients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card hover className="p-4">
              <div className="flex items-start gap-4">
                <Avatar name={client.full_name} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {client.full_name}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {client.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <span>{client.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span>{client.phone}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={statusVariants[client.status]}>
                      {statusLabels[client.status][language]}
                    </Badge>
                  </div>

                  {client.notes && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-1">
                      {client.notes}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-400">
                    {client.budget_min && client.budget_max && (
                      <span>
                        ${client.budget_min.toLocaleString()} - ${client.budget_max.toLocaleString()}
                      </span>
                    )}
                    {client.preferred_city && (
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{client.preferred_city}</span>
                      </div>
                    )}
                    {client.last_contact && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {language === 'uk' ? 'Останній контакт' : 'Last contact'}:{' '}
                          {format(new Date(client.last_contact), 'dd.MM.yyyy')}
                        </span>
                      </div>
                    )}
                    {client.manager && (
                      <div className="flex items-center gap-1">
                        <Avatar name={client.manager.name} size="xs" />
                        <span>{client.manager.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button variant="ghost" size="sm" leftIcon={<MessageSquare className="w-4 h-4" />}>
                    {language === 'uk' ? 'Написати' : 'Message'}
                  </Button>
                  <Button variant="ghost" size="sm" leftIcon={<Calendar className="w-4 h-4" />}>
                    {language === 'uk' ? 'Зустріч' : 'Meeting'}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Client Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={language === 'uk' ? 'Новий клієнт' : 'New Client'}
        size="md"
      >
        <div className="p-6 space-y-4">
          <Input
            label={language === 'uk' ? 'Повне ім\'я' : 'Full Name'}
            value={newClient.full_name}
            onChange={(e) => setNewClient({ ...newClient, full_name: e.target.value })}
            placeholder={language === 'uk' ? 'Введіть ім\'я' : 'Enter name'}
            required
          />
          <Input
            label="Email"
            type="email"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            placeholder="email@example.com"
          />
          <Input
            label={language === 'uk' ? 'Телефон' : 'Phone'}
            value={newClient.phone}
            onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
            placeholder="+380..."
            required
          />
          <Input
            label={language === 'uk' ? 'Джерело' : 'Source'}
            value={newClient.source}
            onChange={(e) => setNewClient({ ...newClient, source: e.target.value })}
            placeholder={language === 'uk' ? 'Веб-сайт, рекомендація...' : 'Website, referral...'}
          />
          <Textarea
            label={language === 'uk' ? 'Нотатки' : 'Notes'}
            value={newClient.notes}
            onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
            placeholder={language === 'uk' ? 'Додаткова інформація...' : 'Additional information...'}
            rows={3}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              {language === 'uk' ? 'Скасувати' : 'Cancel'}
            </Button>
            <Button onClick={handleAddClient}>
              {language === 'uk' ? 'Додати' : 'Add'}
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};
