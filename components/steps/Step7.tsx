import React from 'react';
import { SurveyData } from '../../types';
import { PenLine } from 'lucide-react';

interface Props {
  data: SurveyData;
  updateData: (fields: Partial<SurveyData>) => void;
}

export const Step7: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-4 animate-fade-in h-full flex flex-col">
      <div className="mb-6">
         <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mb-4 text-primary-600">
            <PenLine className="w-6 h-6" />
         </div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Share Experience</h2>
        <p className="text-gray-500 text-sm">Bagikan cerita seru Anda bersama kami!</p>
      </div>

      <div className="flex-1 flex flex-col">
        <label className="block text-base font-bold text-gray-800 mb-4">
          Ceritakan pengalaman menarik Anda selama perjalanan
        </label>
        <div className="relative flex-1 min-h-[200px]">
            <textarea 
                value={data.experience_story}
                onChange={(e) => updateData({ experience_story: e.target.value })}
                className="w-full h-full p-5 bg-white rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none resize-none transition-all shadow-sm text-gray-700 leading-relaxed"
                placeholder="Contoh: Saya sangat suka ketika mengunjungi..."
            />
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-2 py-1 rounded-md text-xs font-medium text-gray-400 border border-gray-100">
                {data.experience_story.length} chars
            </div>
        </div>
      </div>
    </div>
  );
};