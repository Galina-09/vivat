import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  error,
  className = '',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-2.5 bg-white dark:bg-gray-800
          border ${error ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}
          rounded-xl text-left text-gray-900 dark:text-gray-100
          focus:ring-2 focus:ring-primary-500 focus:border-transparent
          outline-none transition-all duration-200
          flex items-center justify-between
        `}
      >
        <span className={!selectedOption ? 'text-gray-400' : ''}>
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700
                  flex items-center justify-between transition-colors
                  ${option.value === value ? 'bg-primary-50 dark:bg-primary-900/20' : ''}
                `}
              >
                <span className="text-gray-900 dark:text-gray-100">{option.label}</span>
                {option.value === value && (
                  <Check className="w-4 h-4 text-primary-600" />
                )}
              </button>
            ))}
          </motion.div>
        </>
      )}

      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
};
