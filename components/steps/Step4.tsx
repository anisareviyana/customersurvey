import React from 'react';
import { SurveyData } from '../../types';
import { StarRating } from '../ui/StarRating';
import { RadioInput } from '../ui/RadioInput';

interface Props {
  data: SurveyData;
  updateData: (fields: Partial<SurveyData>) => void;
}

export const Step4: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-4 animate-fade-in">
       <div className="mb-6">
         <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Layanan Local Guide</h2>
         <p className="text-gray-500 text-sm">Tentang pemandu lokal di destinasi</p>
       </div>

      <RadioInput 
          label="Apakah group Anda didampingi tour guide lokal?"
          value={data.hasLocalGuide || ''}
          options={[{ label: 'Ya', value: 'Ya' }, { label: 'Tidak', value: 'Tidak' }]}
          onChange={(val) => updateData({ hasLocalGuide: val as 'Ya' | 'Tidak' })}
          required
      />

      {data.hasLocalGuide === 'Ya' && (
        <div className="space-y-4 animate-slide-up pt-4 border-t border-gray-100">
           <div className="p-4 bg-primary-50 border border-primary-100 rounded-xl mb-6 flex items-center gap-3">
             <div className="w-1.5 h-10 bg-primary-400 rounded-full" />
             <p className="text-sm text-primary-800 font-medium">
                Silahkan beri nilai untuk Local Guide
             </p>
           </div>
           
           <StarRating 
            label="Dapat mengatur waktu dan jadwal perjalanan"
            value={data.lg_schedule || 0}
            onChange={(v) => updateData({ lg_schedule: v })}
            required
          />

          <StarRating 
            label="Helpful dan bertanggung jawab"
            value={data.lg_helpful || 0}
            onChange={(v) => updateData({ lg_helpful: v })}
            required
          />

          <StarRating 
            label="Informatif dan komunikatif"
            value={data.lg_informative || 0}
            onChange={(v) => updateData({ lg_informative: v })}
            required
          />

          <StarRating 
            label="Menghidupkan suasana selama perjalanan"
            value={data.lg_atmosphere || 0}
            onChange={(v) => updateData({ lg_atmosphere: v })}
            required
          />

          <StarRating 
            label="Ramah, sopan, dan perhatian"
            value={data.lg_polite || 0}
            onChange={(v) => updateData({ lg_polite: v })}
            required
          />

          <div className="mt-8 pt-4 border-t border-gray-100 animate-slide-up">
            <label className="block text-base font-bold text-gray-800 mb-4 leading-tight">
                Apakah local guide kami sesuai harapan Anda? <span className="text-primary-500">*</span>
            </label>
            <textarea
                value={data.lg_expectations || ''}
                onChange={(e) => updateData({ lg_expectations: e.target.value })}
                className="w-full p-4 bg-white rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all shadow-sm text-gray-800 placeholder-gray-400 resize-none h-32"
                placeholder="Mohon jelaskan..."
            />
          </div>
        </div>
      )}
    </div>
  );
};