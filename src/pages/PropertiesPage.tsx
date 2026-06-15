import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  BedDouble,
  Bath,
  Square,
  Heart,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';
import { Card, Button, Input, Badge, Select, Modal, Tabs } from '@/components/ui';
import { useAppStore } from '@/stores/appStore';
import { supabase } from '@/lib/supabase';
import type { Property } from '@/types';

// Mock data for demo
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Сучасна 3-кімнатна квартира в центрі',
    description: 'Простора квартира з панорамними вікнами',
    property_type: 'apartment',
    status: 'available',
    transaction_type: 'sale',
    price: 85000,
    area: 95,
    rooms: 3,
    floor: 8,
    total_floors: 12,
    address: 'вул. Соборна, 22',
    city: 'Вінниця',
    district: 'Центр',
    coordinates: { lat: 50.4477, lng: 30.5238 },
    features: { has_parking: true, has_balcony: true, is_furnished: false },
    owner_name: 'Петренко І.О.',
    owner_phone: '+380501234567',
    owner_email: 'petrenko@email.com',
    branch_id: null,
    created_by: null,
    views_count: 234,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Затишний будинок з садом',
    description: 'Приватний будинок у елітному районі',
    property_type: 'house',
    status: 'available',
    transaction_type: 'sale',
    price: 245000,
    area: 280,
    rooms: 5,
    floor: 2,
    total_floors: 2,
    address: 'вул. Келецька, 15',
    city: 'Київ',
    district: 'Вишенька',
    coordinates: { lat: 50.3821, lng: 30.6234 },
    features: { has_parking: true, has_garden: true, has_pool: true },
    owner_name: 'Коваленко М.С.',
    owner_phone: '+380671234567',
    owner_email: 'kovalenko@email.com',
    branch_id: null,
    created_by: null,
    views_count: 156,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Офісний простір в бізнес-центрі',
    description: 'Сучасний офіс з усім необхідним',
    property_type: 'office',
    status: 'rented',
    transaction_type: 'rent',
    price: 3500,
    area: 120,
    rooms: 4,
    floor: 15,
    total_floors: 25,
    address: 'п-р Коцюбинського, 42',
    city: 'Вінниця',
    district: 'Центр',
    coordinates: { lat: 50.4412, lng: 30.4982 },
    features: { has_air_conditioning: true, has_meeting_rooms: true },
    owner_name: 'BC Premium',
    owner_phone: '+380441234567',
    owner_email: 'office@bcpremium.ua',
    branch_id: null,
    created_by: null,
    views_count: 89,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Торгове приміщення біля метро',
    description: 'Вигідне розташування з високим трафіком',
    property_type: 'commercial',
    status: 'available',
    transaction_type: 'rent',
    price: 2500,
    area: 85,
    rooms: 1,
    floor: 1,
    total_floors: 5,
    address: 'пр-т Перемоги, 65',
    city: 'Вінниця',
    district: 'Центр',
    coordinates: { lat: 50.4295, lng: 30.4483 },
    features: { has_storage: true, high_traffic: true },
    owner_name: 'ТОВ "ТоргСервіс"',
    owner_phone: '+380443211234',
    owner_email: 'office@torgservice.ua',
    branch_id: null,
    created_by: null,
    views_count: 312,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const statusLabels = {
  available: { uk: 'Доступно', en: 'Available' },
  sold: { uk: 'Продано', en: 'Sold' },
  rented: { uk: 'Оренда', en: 'Rented' },
  pending: { uk: 'Очікує', en: 'Pending' },
};

const typeLabels = {
  apartment: { uk: 'Квартира', en: 'Apartment' },
  house: { uk: 'Будинок', en: 'House' },
  office: { uk: 'Офіс', en: 'Office' },
  commercial: { uk: 'Комерція', en: 'Commercial' },
};

const statusVariants = {
  available: 'success',
  sold: 'info',
  rented: 'warning',
  pending: 'default',
} as const;

export const PropertiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useAppStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const propertyImages: Record<string, string> = {
    '2': 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    '3': 'https://images.pexels.com/photos/3807698/pexels-photo-3807698.jpeg?auto=compress&cs=tinysrgb&w=800',
    '4': 'https://images.pexels.com/photos/3057963/pexels-photo-3057963.jpeg?auto=compress&cs=tinysrgb&w=800',
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || property.property_type === selectedType;
    const matchesStatus = !selectedStatus || property.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatPrice = (price: number, type: 'sale' | 'rent') => {
    const formatted = new Intl.NumberFormat(language === 'uk' ? 'uk-UA' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
    return type === 'rent' ? `${formatted}/${language === 'uk' ? 'міс' : 'mo'}` : formatted;
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
            {language === 'uk' ? 'Нерухомість' : 'Properties'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredProperties.length}{' '}
            {language === 'uk' ? 'об\'єктів знайдено' : 'properties found'}
          </p>
        </div>
        <Button
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate('/properties/new')}
        >
          {language === 'uk' ? 'Додати об\'єкт' : 'Add Property'}
        </Button>
      </div>

      {/* Search & Filters */}
      <Card padding="sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'uk' ? 'Пошук за назвою, адресою...' : 'Search by name, address...'}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={showFilters ? 'primary' : 'secondary'}
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="w-4 h-4" />}
            >
              {language === 'uk' ? 'Фільтри' : 'Filters'}
            </Button>
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-600 shadow-sm'
                    : ''
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-600 shadow-sm'
                    : ''
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700 mt-4">
                <Select
                  label={language === 'uk' ? 'Тип нерухомості' : 'Property Type'}
                  options={[
                    { value: '', label: language === 'uk' ? 'Усі типи' : 'All types' },
                    { value: 'apartment', label: typeLabels.apartment[language] },
                    { value: 'house', label: typeLabels.house[language] },
                    { value: 'office', label: typeLabels.office[language] },
                    { value: 'commercial', label: typeLabels.commercial[language] },
                  ]}
                  value={selectedType}
                  onChange={setSelectedType}
                />
                <Select
                  label={language === 'uk' ? 'Статус' : 'Status'}
                  options={[
                    { value: '', label: language === 'uk' ? 'Усі статуси' : 'All statuses' },
                    { value: 'available', label: statusLabels.available[language] },
                    { value: 'sold', label: statusLabels.sold[language] },
                    { value: 'rented', label: statusLabels.rented[language] },
                    { value: 'pending', label: statusLabels.pending[language] },
                  ]}
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                />
                <div className="flex items-end gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedType('');
                      setSelectedStatus('');
                      setSearchQuery('');
                    }}
                    className="flex-1"
                  >
                    {language === 'uk' ? 'Скинути' : 'Reset'}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Properties Grid */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        {filteredProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {viewMode === 'grid' ? (
              <PropertyCard
                property={property}
                imageUrl={propertyImages[property.id]}
                language={language}
              />
            ) : (
              <PropertyListItem
                property={property}
                imageUrl={propertyImages[property.id]}
                language={language}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

interface PropertyCardProps {
  property: Property;
  imageUrl?: string;
  language: 'uk' | 'en';
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, imageUrl, language }) => {
  const navigate = useNavigate();
  const statusLabels = {
    available: { uk: 'Доступно', en: 'Available' },
    sold: { uk: 'Продано', en: 'Sold' },
    rented: { uk: 'Оренда', en: 'Rented' },
    pending: { uk: 'Очікує', en: 'Pending' },
  };

  const formatPrice = (price: number, type: 'sale' | 'rent') => {
    const formatted = new Intl.NumberFormat(language === 'uk' ? 'uk-UA' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
    return type === 'rent' ? `${formatted}/${language === 'uk' ? 'міс' : 'mo'}` : formatted;
  };

  return (
    <Card
      hover
      padding="none"
      onClick={() => navigate(`/properties/${property.id}`)}
      className="overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={statusVariants[property.status]}>
            {statusLabels[property.status][language]}
          </Badge>
          {property.is_featured && (
            <Badge variant="warning">
              {language === 'uk' ? 'Рекомендуємо' : 'Featured'}
            </Badge>
          )}
        </div>
        <button
          className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="line-clamp-1">{property.address}</span>
            </div>
          </div>
          <Badge variant="default" size="sm">
            {typeLabels[property.property_type][language]}
          </Badge>
        </div>

        <p className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-3">
          {formatPrice(property.price, property.transaction_type)}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{property.area} m²</span>
          </div>
          {property.rooms && (
            <div className="flex items-center gap-1">
              <BedDouble className="w-4 h-4" />
              <span>{property.rooms}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Eye className="w-3.5 h-3.5" />
            <span>{property.views_count}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/properties/${property.id}/edit`);
              }}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const PropertyListItem: React.FC<PropertyCardProps> = ({ property, imageUrl, language }) => {
  const navigate = useNavigate();

  return (
    <Card
      hover
      onClick={() => navigate(`/properties/${property.id}`)}
      className="flex gap-4"
    >
      <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={imageUrl || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {property.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{property.address}</span>
            </div>
          </div>
          <Badge variant={statusVariants[property.status]}>
            {statusLabels[property.status][language]}
          </Badge>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-lg font-bold text-primary-600">
            ${property.price.toLocaleString()}
            {property.transaction_type === 'rent' && `/${language === 'uk' ? 'міс' : 'mo'}`}
          </span>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{property.area} m²</span>
            {property.rooms && <span>{property.rooms} {language === 'uk' ? 'кім.' : 'rooms'}</span>}
          </div>
        </div>
      </div>
    </Card>
  );
};
