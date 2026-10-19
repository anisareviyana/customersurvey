import React, { useState } from 'react';
import { TourLeaderProfile, LanguageSkill } from '../../types';
import { RadioInput, Option } from '../ui/RadioInput';
import { ChipSelect } from '../ui/ChipSelect';
import { Textarea } from '../ui/Input';
import { Globe, Plus, Trash2 } from 'lucide-react';

interface Props {
  data: TourLeaderProfile;
  updateData: (fields: Partial<TourLeaderProfile>) => void;
}

const COMMON_LANGUAGES = [
  'Bahasa Indonesia',
  'Bahasa Inggris',
  'Bahasa Mandarin',
  'Bahasa Jepang',
  'Bahasa Korea',
  'Bahasa Arab',
  'Bahasa Prancis',
  'Bahasa Jerman'
];

export const Step3: React.FC<Props> = ({ data, updateData }) => {
  const [newLang, setNewLang] = useState('');

  const guidingStyleOptions: Option[] = [
    {
      label: 'Energetik & Humoris (Mood Maker)',
      value: 'Energetik & Humoris',
      subtitle: 'Membuat suasana bus & rombongan selalu ceria dan penuh tawa',
      badge: 'Populer'
    },
    {
      label: 'Kalem, Informatif & Kaya Wawasan',
      value: 'Kalem & Berwawasan',
      subtitle: 'Penceritaan sejarah, etika lokal, dan penjelasan destinasi mendalam'
    },
    {
      label: 'Perhatian, Ramah & Sabar (Family Caretaker)',
      value: 'Perhatian & Sabar',
      subtitle: 'Sangat telaten merawat kebutuhan anak-anak, lansia & rombongan keluarga'
    },
    {
      label: 'Sigap, Taktis & Problem Solver',
      value: 'Sigap & Problem Solver',
      subtitle: 'Cepat mengambil keputusan saat kendala lapangan, delay pesawat, atau cuaca'
    },
    {
      label: 'Terstruktur & Rapi (Timekeeper Presisi)',
      value: 'Terstruktur & Presisi',
      subtitle: 'Disiplin rundown waktu, alur tiket, dan efisiensi rute perjalanan'
    }
  ];

  const skillOptions = [
    { label: 'Mobile Photography & Reels Creator', value: 'Fotografi & Video Reels', subtitle: 'Bisa foto estetik untuk tamu & konten medsos' },
    { label: 'Ice Breaking, Games & MC Rombongan', value: 'Ice Breaking & MC', subtitle: 'Ahli menghidupkan perjalanan panjang di bus' },
    { label: 'First Aid & Tanggap Medis Darurat', value: 'P3K & Medis Lapangan', subtitle: 'Pertolongan pertama mabuk darat, luka, atau fainting' },
    { label: 'Rekomendasi Kuliner Otentik & Oleh-oleh', value: 'Kuliner & Street Food', subtitle: 'Paham tempat makan halal, enak, dan hemat' },
    { label: 'Negosiasi Vendor & Handling Komplain', value: 'Negosiasi & Crisis Handling', subtitle: 'Penyelesaian damai masalah hotel/transport' },
  ];

  const updateLanguageLevel = (index: number, level: LanguageSkill['level']) => {
    const next = [...data.languages];
    next[index].level = level;
    updateData({ languages: next });
  };

  const removeLanguage = (index: number) => {
    const next = data.languages.filter((_, i) => i !== index);
    updateData({ languages: next });
  };

  const addLanguage = (langName: string) => {
    if (!langName) return;
    if (data.languages.some(l => l.language.toLowerCase() === langName.toLowerCase())) return;
    updateData({
      languages: [...data.languages, { language: langName, level: 'Menengah' }]
    });
    setNewLang('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-4 rounded-2xl border border-orange-200/60">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-primary-500" />
          <span className="text-[11px] font-bold text-primary-700 uppercase tracking-wider">Step 4 dari 5</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Bahasa & Gaya Memandu</h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
          Tunjukkan keahlian komunikasi, bahasa, serta kepribadian unik Anda di depan tamu.
        </p>
      </div>

      {/* Language Proficiency Section */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-primary-500" />
            Kemampuan Bahasa Asing & Level Kemahiran <span className="text-primary-500">*</span>
          </label>
        </div>

        {/* Existing Languages List */}
        <div className="space-y-2.5 mb-4">
          {data.languages.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-orange-50/40 rounded-xl border border-orange-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
            >
              <div className="font-bold text-xs sm:text-sm text-gray-900">
                {item.language}
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-center">
                {(['Dasar', 'Menengah', 'Fasih (Fluent)'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => updateLanguageLevel(idx, lvl)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all ${
                      item.level === lvl
                        ? 'bg-primary-500 text-white shadow-xs'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
                {data.languages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLanguage(idx)}
                    className="p-1 text-gray-400 hover:text-red-500 ml-1"
                    title="Hapus bahasa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add more language quick chips */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 font-medium mb-2">Tambah bahasa lainnya:</p>
          <div className="flex flex-wrap gap-1.5">
            {COMMON_LANGUAGES.filter(l => !data.languages.some(dl => dl.language === l)).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => addLanguage(lang)}
                className="text-[11px] font-medium bg-gray-50 hover:bg-orange-100 text-gray-700 hover:text-primary-800 border border-gray-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3 text-primary-500" />
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guiding Style */}
      <RadioInput
        label="Gaya Memandu / Guiding Persona Utama"
        options={guidingStyleOptions}
        value={data.guidingStyle}
        onChange={(val) => updateData({ guidingStyle: val })}
        required
      />

      {/* Special Skills */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
        <ChipSelect
          label="Keahlian Tambahan / Soft Skills Nilai Tambah"
          helperText="Nilai lebih yang membuat pengalaman tamu semakin berkesan."
          options={skillOptions}
          selectedValues={data.specialSkills}
          onChange={(vals) => updateData({ specialSkills: vals })}
        />
      </div>

      {/* Personal Bio / Service Motto */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
        <Textarea
          label="Motto Pelayanan / Bio Singkat Tour Leader"
          placeholder="e.g. Menghadirkan keceriaan, kenyamanan, dan keselamatan tamu adalah prioritas utama saya di setiap perjalanan."
          helperText="Tuliskan 1-3 kalimat yang menggambarkan dedikasi Anda."
          value={data.personalBio}
          onChange={(e) => updateData({ personalBio: e.target.value })}
          rows={3}
          required
        />
      </div>
    </div>
  );
};
