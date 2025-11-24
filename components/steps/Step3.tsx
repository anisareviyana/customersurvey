import React from 'react';
import { SurveyData } from '../../types';
import { StarRating } from '../ui/StarRating';

interface Props {
  data: SurveyData;
  updateData: (fields: Partial<SurveyData>) => void;
}

export const Step3: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Layanan Tour Leader</h2>
        <p className="text-gray-500 text-sm">Bagaimana kinerja pemimpin tour Anda?</p>
      </div>

      <StarRating 
        label="Dapat mengatur waktu dan jadwal perjalanan"
        value={data.tl_schedule}
        onChange={(v) => updateData({ tl_schedule: v })}
        required
      />

      <StarRating 
        label="Helpful dan bertanggung jawab"
        value={data.tl_helpful}
        onChange={(v) => updateData({ tl_helpful: v })}
        required
      />

      <StarRating 
        label="Informatif dan komunikatif"
        value={data.tl_informative}
        onChange={(v) => updateData({ tl_informative: v })}
        required
      />

      <StarRating 
        label="Menghidupkan suasana selama perjalanan"
        value={data.tl_atmosphere}
        onChange={(v) => updateData({ tl_atmosphere: v })}
        required
      />

      <StarRating 
        label="Ramah, sopan, dan perhatian"
        value={data.tl_polite}
        onChange={(v) => updateData({ tl_polite: v })}
        required
      />

      <div className="mt-8 pt-4 border-t border-gray-100 animate-slide-up">
        <label className="block text-base font-bold text-gray-800 mb-4 leading-tight">
            Apakah tour leader kami sesuai harapan Anda? <span className="text-primary-500">*</span>
        </label>
        <textarea
            value={data.tl_expectations}
            onChange={(e) => updateData({ tl_expectations: e.target.value })}
            className="w-full p-4 bg-white rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all shadow-sm text-gray-800 placeholder-gray-400 resize-none h-32"
            placeholder="Mohon jelaskan..."
        />
      </div>
    </div>
  );
};