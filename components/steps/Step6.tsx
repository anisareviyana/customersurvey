import React from 'react';
import { SurveyData } from '../../types';
import { RadioInput } from '../ui/RadioInput';
import { AtSign } from 'lucide-react';

interface Props {
  data: SurveyData;
  updateData: (fields: Partial<SurveyData>) => void;
}

export const Step6: React.FC<Props> = ({ data, updateData }) => {

  const destinations = [
    { label: 'West Europe', value: 'West Europe' },
    { label: 'East Europe', value: 'East Europe' },
    { label: 'Japan', value: 'Japan' },
    { label: 'Korea', value: 'Korea' },
    { label: 'Australia', value: 'Australia' },
    { label: 'Amerika', value: 'Amerika' },
    { label: 'New Zealand', value: 'New Zealand' },
    { label: 'Lainnya', value: 'Lainnya' },
  ];

  return (
    <div className="space-y-2 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Minat & Rekomendasi</h2>
        <p className="text-gray-500 text-sm">Masa depan perjalanan Anda</p>
      </div>

      {/* Destination */}
      <RadioInput 
          label="Apa destinasi impian anda?"
          value={data.dream_destination}
          otherValue={data.dream_destination_other}
          options={destinations}
          onChange={(val, other) => updateData({ dream_destination: val, dream_destination_other: other })}
          required
          hasOther
      />

      <div className="w-full h-px bg-gray-100 my-8" />

      {/* NPS */}
      <div className="mb-8 animate-slide-up">
        <label className="block text-base font-bold text-gray-800 mb-4 leading-tight">
          Seberapa besar kemungkinan Anda merekomendasikan Panorama JTB kepada teman atau kolega Anda? <span className="text-primary-500">*</span>
        </label>
        
        <div className="flex flex-col gap-3">
            <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-inner overflow-hidden">
                <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-1.5 p-1">
                {Array.from({ length: 11 }, (_, i) => i).map((num) => (
                    <button
                    key={num}
                    onClick={() => updateData({ nps_score: num })}
                    className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 ${
                        data.nps_score === num
                        ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                        : 'bg-gray-50 text-gray-400 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                    >
                    {num}
                    </button>
                ))}
                </div>
            </div>
            <div className="flex justify-between text-xs font-medium text-gray-400 px-2">
                <span>Tidak Mungkin</span>
                <span>Pasti</span>
            </div>
        </div>
      </div>

      {/* Social Media Intent */}
      <RadioInput 
          label="Apakah akan menceritakan pengalaman Tour bersama Panorama JTB ke sosial media?"
          value={data.social_share || ''}
          options={[{ label: 'Ya', value: 'Ya' }, { label: 'Tidak', value: 'Tidak' }]}
          onChange={(val) => updateData({ social_share: val as 'Ya' | 'Tidak' })}
          required
      />

      {/* Instagram Handle */}
      <div className="mb-8 animate-slide-up">
        <label className="block text-base font-bold text-gray-800 mb-4">
          Instagram Anda
        </label>
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors">
                <AtSign className="w-5 h-5" />
            </div>
            <input 
                type="text"
                value={data.instagram_handle}
                onChange={(e) => updateData({ instagram_handle: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all shadow-sm"
                placeholder="username"
            />
        </div>
      </div>

    </div>
  );
};