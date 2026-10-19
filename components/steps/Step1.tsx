import React from 'react';
import { TourLeaderProfile } from '../../types';
import { RadioInput, Option } from '../ui/RadioInput';
import { ChipSelect } from '../ui/ChipSelect';
import { Compass, Plane, Users, CheckCircle } from 'lucide-react';

interface Props {
  data: TourLeaderProfile;
  updateData: (fields: Partial<TourLeaderProfile>) => void;
}

export const Step1: React.FC<Props> = ({ data, updateData }) => {
  const yearsOptions: Option[] = [
    { label: '< 1 Tahun', value: '< 1 Tahun', subtitle: 'Fresh Leader / Junior' },
    { label: '1 - 3 Tahun', value: '1 - 3 Tahun', subtitle: 'Intermediate Leader' },
    { label: '3 - 5 Tahun', value: '3 - 5 Tahun', subtitle: 'Experienced Leader' },
    { label: '> 5 Tahun', value: '> 5 Tahun', subtitle: 'Senior / Veteran Leader', badge: 'Expert' },
  ];

  const tripsOptions: Option[] = [
    { label: '< 10 Trip', value: '< 10 Trip' },
    { label: '10 - 25 Trip', value: '10 - 25 Trip' },
    { label: '26 - 50 Trip', value: '26 - 50 Trip' },
    { label: '> 50 Trip', value: '> 50 Trip', badge: 'High Flying' },
  ];

  const domesticOptions = [
    { label: 'Bali & Nusa Penida', value: 'Bali & Nusa Penida', subtitle: 'Pantai, Budaya & Cafe' },
    { label: 'Labuan Bajo & Komodo', value: 'Labuan Bajo & Komodo', subtitle: 'Liveaboard & Trekking', badge: 'Favorit' },
    { label: 'Yogyakarta, Solo & Semarang', value: 'Yogyakarta, Solo & Semarang', subtitle: 'Heritage & Kuliner' },
    { label: 'Raja Ampat & Papua Barat', value: 'Raja Ampat & Papua Barat', subtitle: 'Bahari & Diving' },
    { label: 'Bromo, Malang & Ijen', value: 'Bromo, Malang & Ijen', subtitle: 'Sunrise & Alam Terbuka' },
    { label: 'Danau Toba & Berastagi', value: 'Danau Toba & Berastagi', subtitle: 'Geopark & Budaya Batak' },
    { label: 'Belitung & Tanjung Pandan', value: 'Belitung & Tanjung Pandan', subtitle: 'Pantai Granit & Island Hopping' },
    { label: 'Derawan & Maratua', value: 'Derawan & Maratua', subtitle: 'Penyu & Jellyfish Lake' },
  ];

  const internationalOptions = [
    { label: 'Asia Timur (Jepang & Korea Selatan)', value: 'Asia Timur (Jepang & Korea)', subtitle: 'Musim Semi/Dingin & Kota Metropolitan', badge: 'High Demand' },
    { label: 'Asia Tenggara (SG, MY, TH, VN)', value: 'Asia Tenggara (SG, MY, TH, VN)', subtitle: 'City Tour, Shopping & Street Food' },
    { label: 'Eropa Barat & Tengah', value: 'Eropa Barat & Tengah', subtitle: 'Swiss, Paris, Italia, Belanda, dll.' },
    { label: 'Timur Tengah, Turki & Umrah Plus', value: 'Timur Tengah, Turki & Umrah', subtitle: 'Kappadokia, Istanbul, Madinah & Makkah' },
    { label: 'Australia & New Zealand', value: 'Australia & New Zealand', subtitle: 'Nature, City Life & Road Trip' },
    { label: 'Amerika Serikat & Kanada', value: 'Amerika Serikat & Kanada', subtitle: 'West/East Coast & National Parks' },
    { label: 'China & Taiwan', value: 'China & Taiwan', subtitle: 'Ancient Heritage & Modern Metros' },
  ];

  const groupTypeOptions = [
    { label: 'Keluarga & Lansia', value: 'Keluarga & Lansia', subtitle: 'Tempo santai & perhatian ekstra' },
    { label: 'Corporate Gathering & MICE', value: 'Corporate Gathering & MICE', subtitle: 'Grup besar, schedule ketat & games' },
    { label: 'Incentive VIP & Luxury Travelers', value: 'Incentive VIP & Luxury Travelers', subtitle: 'Layanan eksklusif bintang 5' },
    { label: 'Anak Muda / Gen Z & Adventure', value: 'Anak Muda / Gen Z & Adventure', subtitle: 'Dinamis, konten foto & petualangan' },
    { label: 'School & Study Tour', value: 'School & Study Tour', subtitle: 'Edukasi, ketertiban siswa & fun facts' },
    { label: 'Private Tour & Honeymoon', value: 'Private Tour & Honeymoon', subtitle: 'Intim, fleksibel & momen spesial' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-4 rounded-2xl border border-orange-200/60">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-primary-500" />
          <span className="text-[11px] font-bold text-primary-700 uppercase tracking-wider">Step 1 dari 5</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Pengalaman & Rute Destinasi</h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
          Tentukan jam terbang dan peta wilayah yang menjadi keahlian utama Anda.
        </p>
      </div>

      {/* Years & Trips */}
      <div className="space-y-4">
        <RadioInput
          label="Lama Pengalaman Memimpin Tur"
          options={yearsOptions}
          value={data.yearsExperience}
          onChange={val => updateData({ yearsExperience: val })}
          required
        />

        <RadioInput
          label="Estimasi Total Rombongan / Trip yang Pernah Dipandu"
          options={tripsOptions}
          value={data.totalTripsCount}
          onChange={val => updateData({ totalTripsCount: val })}
          required
        />
      </div>

      {/* Domestic Destinations */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-2">
          <Compass className="w-4 h-4 text-primary-600" />
          <h3 className="text-sm font-bold text-gray-900">Spesialisasi Destinasi Domestik</h3>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          Pilih rute-rute wisata di Indonesia yang paling Anda kuasai (bisa pilih lebih dari satu).
        </p>
        <ChipSelect
          options={domesticOptions}
          selectedValues={data.domesticDestinations || []}
          onChange={selected => updateData({ domesticDestinations: selected })}
        />
      </div>

      {/* International Destinations */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-2">
          <Plane className="w-4 h-4 text-primary-600" />
          <h3 className="text-sm font-bold text-gray-900">Rute Internasional / Outbound (Opsional)</h3>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          Wilayah luar negeri yang pernah Anda dampingi atau siap Anda pimpin:
        </p>
        <ChipSelect
          options={internationalOptions}
          selectedValues={data.internationalDestinations || []}
          onChange={selected => updateData({ internationalDestinations: selected })}
        />
      </div>

      {/* Group Type Preferences */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-primary-600" />
          <h3 className="text-sm font-bold text-gray-900">Preferensi Tipe Wisatawan</h3>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          Karakter grup tamu yang paling sesuai dengan gaya penanganan Anda:
        </p>
        <ChipSelect
          options={groupTypeOptions}
          selectedValues={data.preferredGroupType || []}
          onChange={selected => updateData({ preferredGroupType: selected })}
        />
      </div>
    </div>
  );
};
