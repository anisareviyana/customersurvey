import React from 'react';
import { SurveyData } from '../../types';
import { RadioInput } from '../ui/RadioInput';

interface Props {
  data: SurveyData;
  updateData: (fields: Partial<SurveyData>) => void;
}

export const Step5: React.FC<Props> = ({ data, updateData }) => {
  
  const sourceOptions = [
    { label: 'Email blast', value: 'Email blast' },
    { label: 'Whats App blast', value: 'Whats App blast' },
    { label: 'Instagram', value: 'Instagram' },
    { label: 'Kantor cabang', value: 'Kantor cabang' },
    { label: 'Teman atau Kerabat', value: 'Teman atau Kerabat' },
    { label: 'Lainnya', value: 'Lainnya' },
  ];

  const contactOptions = [
    { label: 'WhatsApp Staf', value: 'WhatsApp Staf' },
    { label: 'WhatsApp Patsy 081510305555', value: 'WhatsApp Patsy' },
    { label: 'Email', value: 'Email' },
    { label: 'Telepon', value: 'Telepon' },
    { label: 'Datang ke kantor cabang', value: 'Datang ke kantor cabang' },
    { label: 'Direct Message Instagram', value: 'Direct Message Instagram' },
    { label: 'Lainnya', value: 'Lainnya' },
  ];

  return (
    <div className="space-y-2 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Sumber Informasi</h2>
        <p className="text-gray-500 text-sm">Bantu kami mengenal Anda lebih baik</p>
      </div>

      <RadioInput 
          label="Darimana Anda mengetahui produk tour ini?"
          value={data.source_knowledge}
          otherValue={data.source_knowledge_other}
          options={sourceOptions}
          onChange={(val, other) => updateData({ source_knowledge: val, source_knowledge_other: other })}
          required
          hasOther
      />

      <div className="w-full h-px bg-gray-100 my-6" />

      <RadioInput 
          label="Media komunikasi apa yang Anda gunakan ketika pertama kali menghubungi kami?"
          value={data.source_contact}
          otherValue={data.source_contact_other}
          options={contactOptions}
          onChange={(val, other) => updateData({ source_contact: val, source_contact_other: other })}
          required
          hasOther
      />
    </div>
  );
};