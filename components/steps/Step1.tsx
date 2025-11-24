import React from 'react';
import { SurveyData } from '../../types';
import { RadioInput } from '../ui/RadioInput';

interface Props {
  data: SurveyData;
  updateData: (fields: Partial<SurveyData>) => void;
}

export const Step1: React.FC<Props> = ({ data, updateData }) => {
  
  const companionOptions = [
    { label: 'Keluarga', value: 'Keluarga' },
    { label: 'Teman atau Kerabat', value: 'Teman atau Kerabat' },
    { label: 'Sendiri', value: 'Sendiri' },
    { label: 'Lainnya', value: 'Lainnya' },
  ];

  const frequencyOptions = [
    { label: 'Ini pertama kali', value: 'Ini pertama kali' },
    { label: '2 - 5 kali', value: '2 - 5 kali' },
    { label: 'Lebih dari 5 kali', value: 'Lebih dari 5 kali' },
  ];

  return (
    <div className="space-y-2 animate-fade-in">
        <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-tight">Informasi Dasar</h2>
            <p className="text-gray-500 text-sm">Mohon lengkapi data perjalanan Anda</p>
        </div>

        <div className="space-y-6">
          <RadioInput 
            label="Dengan siapa Anda mengikuti tour ini?"
            value={data.companions}
            otherValue={data.companions_other}
            options={companionOptions}
            onChange={(val, other) => updateData({ companions: val, companions_other: other })}
            required
            hasOther
          />

          <div className="w-full h-px bg-gray-100 my-6" />

          <RadioInput 
            label="Berapa kali Anda mengikuti tour di Panorama JTB?"
            value={data.tourFrequency}
            options={frequencyOptions}
            onChange={(val) => updateData({ tourFrequency: val })}
            required
          />
        </div>
    </div>
  );
};