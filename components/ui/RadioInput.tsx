import React, { useRef, useEffect } from 'react';

export interface Option {
  label: string;
  value: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
}

interface RadioInputProps {
  label: string;
  options: Option[];
  value: string;
  otherValue?: string;
  onChange: (value: string, otherValue?: string) => void;
  required?: boolean;
  hasOther?: boolean;
  otherPlaceholder?: string;
  columns?: 1 | 2 | 3 | 5;
  layout?: 'card' | 'compact-pill';
}

export const RadioInput: React.FC<RadioInputProps> = ({
  label,
  options,
  value,
  otherValue,
  onChange,
  required,
  hasOther,
  otherPlaceholder = 'Mohon sebutkan...',
  columns = 1,
  layout = 'card',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value === 'Lainnya' && hasOther && inputRef.current) {
      inputRef.current.focus();
    }
  }, [value, hasOther]);

  if (layout === 'compact-pill') {
    return (
      <div className="w-full">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          {label} {required && <span className="text-primary-500">*</span>}
        </label>
        <div className={`grid gap-2 ${columns === 5 ? 'grid-cols-5' : columns === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {options.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(opt.value, '')}
                className={`py-3 px-2 rounded-xl border-2 font-semibold text-xs text-center transition-all duration-150 active:scale-95 flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'border-primary-500 bg-primary-500 text-white shadow-md shadow-primary-500/25'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-orange-50/30'
                }`}
              >
                {opt.icon}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
        {label} {required && <span className="text-primary-500">*</span>}
      </label>

      <div className={`grid gap-2.5 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value, '')}
              className={`relative w-full text-left p-3.5 rounded-xl border-2 transition-all duration-200 flex items-center group active:scale-[0.99] ${
                isSelected
                  ? 'border-primary-500 bg-gradient-to-r from-primary-50/90 to-orange-50/60 shadow-sm z-10'
                  : 'border-gray-200/90 bg-white shadow-sm hover:border-primary-200 hover:bg-orange-50/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mr-3.5 transition-colors ${
                  isSelected ? 'border-primary-500 bg-white' : 'border-gray-300 group-hover:border-primary-300'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full bg-primary-500 transition-transform duration-200 ${
                    isSelected ? 'scale-100' : 'scale-0'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs sm:text-sm ${
                      isSelected ? 'font-bold text-primary-950' : 'font-medium text-gray-700 group-hover:text-gray-900'
                    }`}
                  >
                    {option.label}
                  </span>
                  {option.badge && (
                    <span className="text-[10px] font-semibold bg-orange-100 text-primary-700 px-1.5 py-0.2 rounded">
                      {option.badge}
                    </span>
                  )}
                </div>
                {option.subtitle && (
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{option.subtitle}</p>
                )}
              </div>
              {option.icon && (
                <div className="text-gray-400 group-hover:text-primary-500 flex-shrink-0">
                  {option.icon}
                </div>
              )}
            </button>
          );
        })}

        {hasOther && value === 'Lainnya' && (
          <div className="mt-1 animate-fade-in">
            <input
              ref={inputRef}
              type="text"
              placeholder={otherPlaceholder}
              value={otherValue || ''}
              onChange={(e) => onChange('Lainnya', e.target.value)}
              className="w-full p-3.5 text-xs sm:text-sm bg-white border-2 border-primary-300 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all shadow-sm text-gray-800 placeholder-gray-400"
            />
          </div>
        )}
      </div>
    </div>
  );
};
