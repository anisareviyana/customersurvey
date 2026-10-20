import React from 'react';
import { TourLeaderProfile } from '../../types';
import { RadioInput, Option } from '../ui/RadioInput';
import { Input } from '../ui/Input';
import { PhoneCall, FileCheck2, FileText, ShieldAlert } from 'lucide-react';

interface Props {
  data: TourLeaderProfile;
  updateData: (fields: Partial<TourLeaderProfile>) => void;
}

export const Step4: React.FC<Props> = ({ data, updateData }) => {
  const availabilityOptions: Option[] = [
    {
      label: 'Siap Kapan Saja (Full-Time Freelance)',
      value: 'Siap Kapan Saja',
      subtitle: 'Tersedia untuk tugas mendadak maupun terjadwal',
      badge: 'Fleksibel'
    },
    {
      label: 'Fleksibel (Pemberitahuan Min. 2 Minggu)',
      value: 'Fleksibel 2 Minggu',
      subtitle: 'Memerlukan koordinasi jadwal cuti / waktu luang'
    },
    {
      label: 'Hanya Akhir Pekan & Libur Nasional',
      value: 'Hanya Weekend & Libur',
      subtitle: 'Fokus short trip / weekend getaway'
    },
    {
      label: 'Musim Liburan Sekolah & Lebaran/Nataru',
      value: 'Musim Tertentu (High Season)',
      subtitle: 'Tersedia saat periode puncak liburan'
    }
  ];

  const scopeOptions: Option[] = [
    { label: 'Siap Domestik & Internasional', value: 'Siap Domestik & Internasional' },
    { label: 'Fokus Domestik Saja', value: 'Khusus Domestik' },
    { label: 'Fokus Internasional Saja', value: 'Khusus Internasional' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-4 rounded-2xl border border-orange-200/60">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-primary-500" />
          <span className="text-[11px] font-bold text-primary-700 uppercase tracking-wider">Step 5 dari 5</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Kesiapan & Final Review</h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
          Tentukan kesiapan tugas dan tinjau tampilan Kartu Profil Digital Tour Leader Anda.
        </p>
      </div>

      {/* Availability & Scope */}
      <div className="space-y-4">
        <RadioInput
          label="Status Ketersediaan Penugasan"
          options={availabilityOptions}
          value={data.availabilityStatus}
          onChange={(val) => updateData({ availabilityStatus: val })}
          required
        />

        <RadioInput
          label="Cakupan Rute Penugasan"
          options={scopeOptions}
          value={data.assignmentScope}
          onChange={(val) => updateData({ assignmentScope: val })}
          columns={1}
          required
        />
      </div>

      {/* Emergency Contact */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
          <PhoneCall className="w-4 h-4 text-primary-500" />
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
            Kontak Darurat (Emergency Contact)
          </h3>
        </div>

        <Input
          label="Nama Lengkap Kontak Darurat"
          placeholder="e.g. Siti Rahmawati"
          value={data.emergencyContactName}
          onChange={(e) => updateData({ emergencyContactName: e.target.value })}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Hubungan Kerabat"
            placeholder="e.g. Istri / Suami / Orang Tua / Saudara"
            value={data.emergencyContactRelation}
            onChange={(e) => updateData({ emergencyContactRelation: e.target.value })}
            required
          />

          <Input
            label="Nomor Telepon Darurat"
            type="tel"
            placeholder="0813-xxxx-xxxx"
            value={data.emergencyContactPhone}
            onChange={(e) => updateData({ emergencyContactPhone: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Dokumen Terlampir Review */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-primary-500" />
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              Dokumen Terlampir (Visa & Legalitas)
            </h3>
          </div>
          <span className="text-[11px] font-bold text-primary-700 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
            {data.documents?.length || 0} File
          </span>
        </div>

        {data.documents && data.documents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {data.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-2 p-2 rounded-xl bg-orange-50/40 border border-orange-100 text-xs"
                >
                  <div className="w-6 h-6 rounded bg-red-100 text-red-600 flex items-center justify-center font-bold text-[9px] flex-shrink-0">
                    {doc.type.includes('pdf') || doc.name.toLowerCase().endsWith('.pdf') ? 'PDF' : 'DOC'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-800 truncate text-[11px]">{doc.name}</p>
                    <p className="text-[10px] text-gray-500">{doc.visaName ? `${doc.category} (${doc.visaName})` : doc.category}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer Dokumen Rawan */}
            <div className="flex items-start gap-2 p-2.5 bg-amber-50/90 rounded-xl border border-amber-200/80 text-[10px] text-amber-900 leading-tight">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Disclaimer Dokumen: </span>
                Dokumen yang dilampirkan bersifat rawan dan rahasia. Pihak kami tidak bertanggung jawab jika terjadi sesuatu atau risiko terkait dokumen tersebut.
              </div>
            </div>
          </>
        ) : (
          <p className="text-xs text-gray-400 italic">
            Belum ada lampiran file PDF atau visa dokumen. (Bisa ditambahkan pada Step 2 jika diperlukan).
          </p>
        )}
      </div>


      {/* Consent Checkbox */}
      <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200/80">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={data.dataConsent}
            onChange={(e) => updateData({ dataConsent: e.target.checked })}
            className="w-5 h-5 mt-0.5 rounded-lg border-2 border-primary-400 text-primary-600 focus:ring-primary-500 cursor-pointer accent-primary-500"
          />
          <div className="text-xs text-gray-700 leading-relaxed font-medium">
            <span className="font-bold text-gray-900 block mb-0.5">
              Pernyataan Kebenaran Data & Disclaimer Dokumen <span className="text-primary-500">*</span>
            </span>
            Saya menyatakan bahwa data profiling yang saya berikan adalah benar. Saya memahami bahwa seluruh berkas dokumen yang diunggah bersifat rawan, dan pihak perusahaan/penyelenggara tidak bertanggung jawab jika terjadi sesuatu terkait dokumen tersebut.
          </div>
        </label>
      </div>
    </div>
  );
};
