import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  required?: boolean;
}

const RATINGS = [
  { value: 1, label: 'Sangat Tidak Memuaskan' },
  { value: 2, label: 'Kurang Memuaskan' },
  { value: 3, label: 'Memuaskan' },
  { value: 4, label: 'Sangat Memuaskan' },
];

export const StarRating: React.FC<StarRatingProps> = ({ label, value, onChange, required }) => {
  return (
    <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-white/50 animate-slide-up">
      <label className="block text-base font-bold text-gray-800 mb-4 leading-snug text-center">
        {label} {required && <span className="text-primary-500">*</span>}
      </label>
      
      <div className="flex flex-col items-center gap-3">
        <div className="flex justify-center items-center gap-1 sm:gap-3">
            {RATINGS.map((rating) => (
              <button
                key={rating.value}
                type="button"
                onClick={() => onChange(rating.value)}
                className="group relative flex flex-col items-center justify-center focus:outline-none"
              >
                <div className={`p-3 rounded-full transition-all duration-300 ${
                  value >= rating.value ? 'bg-primary-50 scale-105' : 'bg-transparent hover:bg-gray-50'
                }`}>
                    <Star 
                    strokeWidth={1.5}
                    className={`w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 ${
                        value >= rating.value 
                        ? 'fill-primary-500 text-primary-500 drop-shadow-sm' 
                        : 'text-gray-300 group-hover:text-primary-300'
                    }`} 
                    />
                </div>
              </button>
            ))}
        </div>
        <div className="h-6 flex items-center justify-center">
            {value > 0 ? (
                <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full animate-fade-in">
                    {RATINGS.find(r => r.value === value)?.label}
                </span>
            ) : (
                <span className="text-xs text-gray-300 italic">Ketuk bintang untuk menilai</span>
            )}
        </div>
      </div>
    </div>
  );
};