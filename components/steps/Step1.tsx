import React from 'react';
import { TourLeaderProfile } from '../../types';
import { RadioInput, Option } from '../ui/RadioInput';
import { ChipSelect } from '../ui/ChipSelect';
import { Input } from '../ui/Input';
import { Compass, Plane, Users, MapPin, Heart } from 'lucide-react';

interface Props {
  data: TourLeaderProfile;
  updateData: (fields: Partial<TourLeaderProfile>) => void;
}

export const Step1: React.FC<Props> = ({ data, updateData }) => {
  const domicileOptions: Option[] = [
    { label: 'Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)', value: 'Jabodetabek' },
    { label: 'Bandung & Jawa Barat', value: 'Bandung & Jawa Barat' },
    { label: 'Surabaya & Jawa Timur', value: 'Surabaya & Jawa Timur' },
    { label: 'Semarang, Solo & D.I. Yogyakarta', value: 'Semarang, Solo & D.I. Yogyakarta' },
    { label: 'Bali & Nusa Tenggara', value: 'Bali & Nusa Tenggara' },
    { label: 'Medan & Sumatera Utara', value: 'Medan & Sumatera Utara' },
    { label: 'Batam & Kepulauan Riau', value: 'Batam & Kepulauan Riau' },
    { label: 'Makassar & Sulawesi Selatan', value: 'Makassar & Sulawesi Selatan' },
    { label: 'Balikpapan & Kalimantan Timur', value: 'Balikpapan & Kalimantan Timur' },
    { label: 'Kota / Daerah Lainnya', value: 'Lainnya' },
  ];

  const religionOptions: Option[] = [
    { label: 'Islam', value: 'Islam' },
    { label: 'Kristen Protestan', value: 'Kristen Protestan' },
    { label: 'Katolik', value: 'Katolik' },
    { label: 'Hindu', value: 'Hindu' },
    { label: 'Buddha', value: 'Buddha' },
    { label: 'Konghucu', value: 'Konghucu' },
    { label: 'Lainnya', value: 'Lainnya' },
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

  // Updated group type options matching team feedback:
  // - Keluarga & Lansia dipisah
  // - Incentive VIP -> cukup VIP aja
  // - Gen Z & Adventure dipisah
  // - Cukup Private Tour aja, gak perlu Honeymoon
  // - Tambah Usia Produktif terkait liburan musim cuti
  const groupTypeOptions = [
    { label: 'Keluarga (Family Tour)', value: 'Keluarga (Family Tour)', subtitle: 'Keluarga multi-generasi & ramah anak-anak' },
    { label: 'Wisatawan Lansia / Senior', value: 'Wisatawan Lansia / Senior', subtitle: 'Tempo santai, perhatian ekstra & kenyamanan maksimal' },
    { label: 'VIP', value: 'VIP', subtitle: 'Layanan eksklusif bintang 5, privasi & protokol khusus' },
    { label: 'Gen Z & Anak Muda', value: 'Gen Z & Anak Muda', subtitle: 'Dinamis, spot tren viral & ramah konten medsos' },
    { label: 'Adventure & Outdoor', value: 'Adventure & Outdoor', subtitle: 'Trekking, alam bebas & wisata petualangan aktif' },
    { label: 'Private Tour', value: 'Private Tour', subtitle: 'Rombongan privat, fleksibel & custom itinerary' },
    { label: 'Usia Produktif (Liburan Musim Cuti)', value: 'Usia Produktif (Liburan Musim Cuti)', subtitle: 'Karyawan & profesional yang berlibur saat musim cuti kerja' },
    { label: 'Corporate Gathering & MICE', value: 'Corporate Gathering & MICE', subtitle: 'Grup korporat besar, company outing & MICE' },
    { label: 'School & Study Tour', value: 'School & Study Tour', subtitle: 'Edukasi pelajar, kedisiplinan & edukasi budaya' },
  ];

  const currentDomicile = data.domicile || data.city || '';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-4 rounded-2xl border border-orange-200/60">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-primary-500" />
          <span className="text-[11px] font-bold text-primary-700 uppercase tracking-wider">Step 1 dari 5</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Domisili & Preferensi Destinasi</h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
          Lengkapi data domisili, agama, serta peta wilayah dan karakter rombongan yang menjadi keahlian Anda.
        </p>
      </div>

      {/* Profil Diri Ringkas (Tersinkronisasi) */}
      <div className="bg-orange-50/40 rounded-2xl p-3 sm:p-3.5 border border-orange-200/70 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={data.avatarUrl}
            alt={data.fullName}
            className="w-10 h-10 rounded-full object-cover border-2 border-primary-500 flex-shrink-0"
          />
          <div className="min-w-0">
            <div className="font-bold text-gray-900 truncate text-xs sm:text-sm">{data.fullName}</div>
            <div className="text-[10px] text-gray-500 truncate">{data.phone} • {data.email}</div>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-orange-100 text-primary-700 font-bold text-[9px] flex-shrink-0">
          Akun Terhubung
        </span>
      </div>

      {/* 1. Domisili Tempat Tinggal */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary-600" />
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Domisili (Kota Tempat Tinggal Saat Ini) <span className="text-primary-500">*</span>
          </label>
        </div>
        <p className="text-[11px] text-gray-500">
          Menentukan penugasan kota keberangkatan tur (home-base keberangkatan terdekat).
        </p>

        <RadioInput
          options={domicileOptions}
          value={currentDomicile}
          onChange={(val) => {
            updateData({ domicile: val, city: val });
          }}
          columns={1}
          required
        />

        {currentDomicile === 'Lainnya' && (
          <div className="pl-3 border-l-2 border-primary-500 pt-1 animate-fade-in">
            <Input
              label="Tuliskan Nama Kota / Kabupaten Domisili Anda"
              placeholder="e.g. Cirebon, Purwokerto, Manado, dll."
              value={data.domicileOther || data.cityOther || ''}
              onChange={(e) => updateData({ domicileOther: e.target.value, cityOther: e.target.value })}
              required
            />
          </div>
        )}
      </div>

      {/* 2. Agama */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-primary-600" />
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Agama <span className="text-primary-500">*</span>
          </label>
        </div>
        <p className="text-[11px] text-gray-500">
          Informasi ini digunakan untuk penyesuaian penugasan tur khusus (misal: Umrah Plus, Holyland, preferensi makanan, serta ketersediaan waktu ibadah di perjalanan).
        </p>

        <RadioInput
          options={religionOptions}
          value={data.religion}
          onChange={(val) => updateData({ religion: val })}
          columns={2}
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
