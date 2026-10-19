import React from 'react';
import { Check } from 'lucide-react';

interface ChipOption {
  label: string;
  value: string;
  subtitle?: string;
  badge?: string;
}

interface ChipSelectProps {
  label?: string;
  options: ChipOption[];
  selectedValues?: string[];
  selected?: string[];
  onChange: (values: string[]) => void;
  required?: boolean;
  helperText?: string;
  columns?: 1 | 2;
}

export const ChipSelect: React.FC<ChipSelectProps> = ({
  label,
  options,
  selectedValues,
  selected,
  onChange,
  required,
  helperText,
  columns = 1,
}) => {
  const currentSelected = selectedValues || selected || [];

  const toggleOption = (val: string) => {
    if (currentSelected.includes(val)) {
      onChange(currentSelected.filter(item => item !== val));
    } else {
      onChange([...currentSelected, val]);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            {label} {required && <span className="text-primary-500">*</span>}
          </label>
          {currentSelected.length > 0 && (
            <span className="text-[11px] font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">
              {currentSelected.length} dipilih
            </span>
          )}
        </div>
      )}
      {helperText && (
        <p className="text-xs text-gray-400 mb-3">{helperText}</p>
      )}

      <div className={`grid gap-2.5 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {options.map((opt) => {
          const isSelected = currentSelected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleOption(opt.value)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 group active:scale-[0.99] ${
                isSelected
                  ? 'bg-orange-50/70 border-primary-500 ring-1 ring-primary-500 shadow-xs'
                  : 'bg-white border-gray-200/90 hover:border-orange-200 hover:bg-orange-50/30'
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-primary-950' : 'text-gray-900'}`}>
                    {opt.label}
                  </span>
                  {opt.badge && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-primary-100 text-primary-800 tracking-wider">
                      {opt.badge}
                    </span>
                  )}
                </div>
                {opt.subtitle && (
                  <p className="text-[11px] text-gray-500 leading-tight line-clamp-1">
                    {opt.subtitle}
                  </p>
                )}
              </div>

              <div
                className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all mt-0.5 flex-shrink-0 ${
                  isSelected
                    ? 'bg-primary-500 border-primary-500 text-white shadow-2xs'
                    : 'border-gray-300 bg-white group-hover:border-primary-400'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
