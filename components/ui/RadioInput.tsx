import React, { useRef, useEffect } from 'react';

interface Option {
  label: string;
  value: string;
}

interface RadioInputProps {
  label: string;
  options: Option[];
  value: string;
  otherValue?: string;
  onChange: (value: string, otherValue?: string) => void;
  required?: boolean;
  hasOther?: boolean;
}

export const RadioInput: React.FC<RadioInputProps> = ({
  label,
  options,
  value,
  otherValue,
  onChange,
  required,
  hasOther
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value === 'Lainnya' && hasOther && inputRef.current) {
      inputRef.current.focus();
    }
  }, [value, hasOther]);

  return (
    <div className="mb-8 animate-slide-up">
      <label className="block text-base font-bold text-gray-800 mb-4 leading-tight">
        {label} {required && <span className="text-primary-500">*</span>}
      </label>
      
      <div className="grid grid-cols-1 gap-3">
        {options.map((option) => {
            const isSelected = value === option.value;
            return (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(option.value, '')}
                    className={`relative w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 flex items-center group ${
                        isSelected 
                        ? 'border-primary-500 bg-primary-50/50 shadow-sm z-10' 
                        : 'border-transparent bg-white shadow-sm hover:border-primary-200 hover:bg-gray-50'
                    }`}
                >
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mr-4 transition-colors ${
                        isSelected ? 'border-primary-500' : 'border-gray-300 group-hover:border-primary-300'
                    }`}>
                        <div className={`w-2.5 h-2.5 rounded-full bg-primary-500 transition-transform duration-200 ${
                            isSelected ? 'scale-100' : 'scale-0'
                        }`} />
                    </div>
                    <span className={`text-sm sm:text-base ${isSelected ? 'font-semibold text-primary-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {option.label}
                    </span>
                </button>
            )
        })}

        {hasOther && value === 'Lainnya' && (
          <div className="animate-fade-in mt-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Mohon sebutkan..."
              value={otherValue || ''}
              onChange={(e) => onChange('Lainnya', e.target.value)}
              className="w-full p-4 text-sm bg-white border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all shadow-sm text-gray-800 placeholder-gray-400"
            />
          </div>
        )}
      </div>
    </div>
  );
};