import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Building2,
  MapPin,
  DollarSign,
} from 'lucide-react';
import { Card, Button, Input, Avatar, Badge } from '@/components/ui';
import { useAppStore } from '@/stores/appStore';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  recommendations?: {
    title: string;
    price: number;
    address: string;
    type: string;
  }[];
}

const initialMessages: Message[] = [
  {
    id: '0',
    role: 'assistant',
    content: 'Привіт! Я AI-асистент агентства ViVaT. Я можу допомогти вам:\n\n• Підібрати ідеальну нерухомість\n• Відповісти на питання про об\'єкти\n• Надати консультацію з питань оренди/купівлі\n• Порівняти різні варіанти\n\nЯк я можу вам допомогти?',
    timestamp: new Date(),
  },
];

const suggestedQuestions = [
  'Знайдіть 3-кімнатну квартиру в центрі до $100,000',
  'Які варіанти оренди офісу є в наявності?',
  'Порівняйте ціни на будинки в Конча-Заспі',
  'Документи для оформлення купівлі квартири',
];

export const AIAssistantPage: React.FC = () => {
  const { language } = useAppStore();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses: Record<string, Message> = {
        apartment: {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Я знайшов для вас кілька чудових варіантів 3-кімнатних квартир в центрі Києва в межах вашого бюджету:',
          timestamp: new Date(),
          recommendations: [
            {
              title: '3-кімнатна квартира на Хрещатику',
              price: 95000,
              address: 'вул. Хрещатик, 22',
              type: 'apartment',
            },
            {
              title: 'Просторий пентхаус на Андіївському',
              price: 85000,
              address: 'Андріївський узвіз, 15',
              type: 'apartment',
            },
            {
              title: 'Елітна квартира у Печерську',
              price: 99000,
              address: 'вул. Івана Мазепи, 3',
              type: 'apartment',
            },
          ],
        },
        office: {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Зараз у нас є такі варіанти оренди офісних приміщень:\n\n1. **Бізнес-центр "Преміум"**\n   - Площа: 120 м²\n   - Ціна: $3,500/міс\n   - Поверх: 15\n\n2. **БЦ "Скай-Тауер"**\n   - Площа: 85 м²\n   - Ціна: $2,200/міс\n   - Поверх: 8',
          timestamp: new Date(),
        },
        default: {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Дякую за ваше питання! Я проаналізував ваш запит і можу надати наступну інформацію:\n\nДля отримання більш детальної консультації, рекомендую зв\'язатися з нашим менеджером, який зможе індивідуально підібрати найкращі варіанти під ваші потреби.\n\nЧи є у вас інші питання?',
          timestamp: new Date(),
        },
      };

      const responseKey = input.toLowerCase().includes('квартир') || input.toLowerCase().includes('apartment')
        ? 'apartment'
        : input.toLowerCase().includes('офіс') || input.toLowerCase().includes('office')
        ? 'office'
        : 'default';

      setMessages((prev) => [...prev, aiResponses[responseKey]]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-8rem)] flex flex-col"
    >
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary-600" />
          {language === 'uk' ? 'AI Асистент' : 'AI Assistant'}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {language === 'uk'
            ? 'Розумний помічник для підбору нерухомості'
            : 'Intelligent property matching assistant'}
        </p>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Chat Area */}
        <Card className="flex-1 flex flex-col" padding="none">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <Avatar
                    name={message.role === 'user' ? 'User' : 'ViVaT AI'}
                    size="sm"
                    className={message.role === 'assistant' ? 'bg-gradient-to-br from-primary-500 to-accent-500' : ''}
                  />
                  <div
                    className={`max-w-[70%] ${
                      message.role === 'user'
                        ? 'bg-primary-600 text-white rounded-2xl rounded-tr-sm'
                        : 'bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-sm'
                    } p-4`}
                  >
                    <div className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </div>
                    {message.recommendations && (
                      <div className="mt-3 space-y-2">
                        {message.recommendations.map((rec, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-3 space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {rec.title}
                              </span>
                              <Badge variant="success">${rec.price.toLocaleString()}</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <MapPin className="w-3 h-3" />
                              <span>{rec.address}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-primary-200' : 'text-gray-400'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <Avatar name="ViVaT AI" size="sm" />
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-sm p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 dark:border-gray-700 p-4">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'uk' ? 'Напишіть ваше питання...' : 'Type your question...'}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim()}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Sidebar - Suggestions */}
        <Card className="w-80 hidden lg:block" padding="md">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {language === 'uk' ? 'Популярні запити' : 'Popular Questions'}
          </h3>
          <div className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInput(question)}
                className="w-full text-left p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
              {language === 'uk' ? 'Можливості AI' : 'AI Capabilities'}
            </h4>
            <div className="space-y-2">
              {[
                { icon: Building2, label: language === 'uk' ? 'Підбір нерухомості' : 'Property matching' },
                { icon: DollarSign, label: language === 'uk' ? 'Аналіз цін' : 'Price analysis' },
                { icon: MapPin, label: language === 'uk' ? 'Порівняння районів' : 'Area comparison' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
