import React from 'react';
import { SurveyData } from '../../types';
import { StarRating } from '../ui/StarRating';

interface Props {
  data: SurveyData;
  updateData: (fields: Partial<SurveyData>) => void;
}

export const Step2: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Perjalanan Anda</h2>
        <p className="text-gray-500 text-sm">Fasilitas dan pengalaman selama tour</p>
      </div>

      <StarRating 
        label="Obyek wisata yang dikunjungi"
        value={data.trip_attractions}
        onChange={(v) => updateData({ trip_attractions: v })}
        required
      />

      <StarRating 
        label="Lokasi Hotel"
        value={data.trip_hotel_loc}
        onChange={(v) => updateData({ trip_hotel_loc: v })}
        required
      />

      <StarRating 
        label="Kualitas sarapan pagi di hotel"
        value={data.trip_breakfast}
        onChange={(v) => updateData({ trip_breakfast: v })}
        required
      />

      <StarRating 
        label="Kualitas dan variasi makanan selama perjalanan"
        value={data.trip_food}
        onChange={(v) => updateData({ trip_food: v })}
        required
      />

      <StarRating 
        label="Transportasi Darat"
        value={data.trip_transport}
        onChange={(v) => updateData({ trip_transport: v })}
        required
      />

      <div className="mt-8 pt-4 border-t border-gray-100 animate-slide-up">
        <label className="block text-base font-bold text-gray-800 mb-4 leading-tight">
            Apakah perjalanan ini sesuai dengan harapan Anda? <span className="text-primary-500">*</span>
        </label>
        <textarea
            value={data.trip_expectations}
            onChange={(e) => updateData({ trip_expectations: e.target.value })}
            className="w-full p-4 bg-white rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all shadow-sm text-gray-800 placeholder-gray-400 resize-none h-32"
            placeholder="Mohon jelaskan..."
        />
      </div>
    </div>
  );
};