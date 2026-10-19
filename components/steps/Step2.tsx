import React, { useState, useRef } from 'react';
import { TourLeaderProfile, DocumentAttachment, DocumentCategory } from '../../types';
import { RadioInput, Option } from '../ui/RadioInput';
import { Input } from '../ui/Input';
import {
  FileCheck,
  Award,
  HeartHandshake,
  FileText,
  Upload,
  CheckCircle2,
  Trash2,
  Eye,
  X,
  Download,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  ShieldAlert
} from 'lucide-react';

interface Props {
  data: TourLeaderProfile;
  updateData: (fields: Partial<TourLeaderProfile>) => void;
}

export const Step2: React.FC<Props> = ({ data, updateData }) => {
  const [previewDoc, setPreviewDoc] = useState<DocumentAttachment | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeDragCategory, setActiveDragCategory] = useState<string | null>(null);

  // Hidden file inputs for each category
  const bnspInputRef = useRef<HTMLInputElement | null>(null);
  const passportInputRef = useRef<HTMLInputElement | null>(null);
  const firstAidInputRef = useRef<HTMLInputElement | null>(null);

  const documents = data.documents || [];

  const bnspOptions: Option[] = [
    {
      label: 'Bersertifikat Resmi BNSP Tour Leader',
      value: 'Bersertifikat Resmi BNSP',
      subtitle: 'Memiliki sertifikat kompetensi LSP Pariwisata aktif',
      badge: 'Prioritas'
    },
    {
      label: 'Sedang Proses Sertifikasi',
      value: 'Sedang Proses',
      subtitle: 'Sudah mendaftar / menunggu jadwal asesmen'
    },
    {
      label: 'Belum Memiliki Sertifikat BNSP',
      value: 'Belum Memiliki',
      subtitle: 'Mengandalkan pengalaman lapangan'
    }
  ];

  const passportOptions: Option[] = [
    {
      label: 'Paspor Aktif (> 1 Tahun)',
      value: 'Aktif (> 1 Tahun)',
      subtitle: 'Aman untuk semua penugasan internasional',
      badge: 'Ready'
    },
    {
      label: 'Paspor Aktif (< 6 Bulan)',
      value: 'Aktif (< 6 Bulan)',
      subtitle: 'Segera memerlukan perpanjangan masa berlaku'
    },
    {
      label: 'Belum Ada / Paspor Kadaluarsa',
      value: 'Belum Ada / Expired',
      subtitle: 'Khusus penugasan tur domestik saja saat ini'
    }
  ];

  const firstAidOptions: Option[] = [
    {
      label: 'Ya, Bersertifikat Resmi (CPR & First Aid)',
      value: 'Bersertifikat CPR / P3K',
      subtitle: 'Palang Merah Indonesia / Medic / Institusi Resmi',
      badge: 'Plus'
    },
    {
      label: 'Pernah Mengikuti Pelatihan P3K Dasar',
      value: 'Pernah Pelatihan P3K',
      subtitle: 'Paham dasar penanganan luka & pertolongan pertama'
    },
    {
      label: 'Belum Pernah Mengikuti Pelatihan',
      value: 'Belum Pernah',
      subtitle: 'Bersedia mengikuti briefing safety dari perusahaan'
    }
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const processUploadedFile = (file: File, category: DocumentCategory) => {
    // Validate file size (10 MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError(`Ukuran file "${file.name}" melebihi batas 10 MB.`);
      return;
    }

    setUploadError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target?.result as string;
      const newDoc: DocumentAttachment = {
        id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: file.name,
        size: file.size,
        type: file.type || (file.name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream'),
        category: category,
        fileData: base64Data,
        uploadedAt: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      // Replace previous document of the same category
      const filtered = documents.filter((d) => d.category !== category);
      updateData({ documents: [...filtered, newDoc] });
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveDoc = (docId: string) => {
    const updated = documents.filter((d) => d.id !== docId);
    updateData({ documents: updated });
    if (previewDoc?.id === docId) {
      setPreviewDoc(null);
    }
  };

  const getDocByCategory = (category: DocumentCategory): DocumentAttachment | undefined => {
    return documents.find((d) => d.category === category);
  };

  const bnspDoc = getDocByCategory('Sertifikat BNSP');
  const passportDoc = getDocByCategory('Paspor');
  const firstAidDoc = getDocByCategory('Sertifikat First Aid / CPR');

  // Reusable inline document upload component
  const renderDocumentUploader = (
    category: DocumentCategory,
    attachedDoc: DocumentAttachment | undefined,
    inputRef: React.RefObject<HTMLInputElement | null>,
    title: string,
    description: string,
    inputLabelBtn: string
  ) => {
    const isDragActive = activeDragCategory === category;

    return (
      <div className="space-y-2 mt-2">
        <input
          type="file"
          ref={inputRef}
          accept=".pdf,application/pdf,image/png,image/jpeg,image/jpg"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              processUploadedFile(e.target.files[0], category);
              e.target.value = '';
            }
          }}
        />

        {attachedDoc ? (
          // File Attached Card
          <div className="bg-white rounded-xl border border-primary-300 p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-gray-900 truncate max-w-[190px] sm:max-w-xs">
                      {attachedDoc.name}
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Terlampir
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {formatFileSize(attachedDoc.size)} • Diunggah {attachedDoc.uploadedAt}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setPreviewDoc(attachedDoc)}
                  className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-orange-50 rounded-lg transition-colors"
                  title="Lihat Pratinjau Dokumen"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-orange-50 rounded-lg transition-colors"
                  title="Ganti File"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveDoc(attachedDoc.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus File"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[10px] text-gray-500">
              <span className="text-gray-400">{title}</span>
              <button
                type="button"
                onClick={() => setPreviewDoc(attachedDoc)}
                className="font-bold text-primary-600 hover:text-primary-700"
              >
                Pratinjau File &rarr;
              </button>
            </div>
          </div>
        ) : (
          // Dropzone / Select Card
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setActiveDragCategory(category);
            }}
            onDragLeave={() => setActiveDragCategory(null)}
            onDrop={(e) => {
              e.preventDefault();
              setActiveDragCategory(null);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                processUploadedFile(e.dataTransfer.files[0], category);
              }
            }}
            onClick={() => inputRef.current?.click()}
            className={`p-3.5 sm:p-4 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer text-center flex flex-col items-center justify-center gap-1.5 ${
              isDragActive
                ? 'border-primary-500 bg-orange-100/50 scale-[0.99]'
                : 'border-orange-300 hover:border-primary-500 bg-orange-50/30 hover:bg-orange-50/60'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-orange-100 text-primary-600 flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-800">{title}</div>
              <div className="text-[11px] text-gray-500">{description}</div>
            </div>
            <button
              type="button"
              className="mt-1 px-3 py-1 bg-white hover:bg-orange-50 text-primary-600 border border-orange-200 text-[11px] font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1"
            >
              <Upload className="w-3 h-3" />
              {inputLabelBtn}
            </button>
          </div>
        )}

        {/* Safety Note & Disclaimer */}
        <div className="flex items-start gap-2 p-2.5 bg-amber-50/90 rounded-xl border border-amber-200/80 text-[10px] text-amber-900 leading-relaxed">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Catatan Keamanan: </span>
            Dokumen ini bersifat rawan dan sensitif. Kami tidak bertanggung jawab jika terjadi sesuatu dengan dokumen yang diunggah.
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-4 rounded-2xl border border-orange-200/60">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-primary-500" />
          <span className="text-[11px] font-bold text-primary-700 uppercase tracking-wider">Step 2 dari 5</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Sertifikasi & Dokumen Paspor</h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
          Verifikasi sertifikasi profesi pariwisata, masa berlaku dokumen paspor, dan upload dokumen pendukung langsung di bawah pilihan Anda.
        </p>
      </div>

      {/* Note & Disclaimer Dokumen Rawan */}
      <div className="p-3.5 bg-amber-50/95 border border-amber-300/90 rounded-2xl flex items-start gap-3 text-xs shadow-2xs">
        <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-200">
          <ShieldAlert className="w-4 h-4 text-amber-700" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-amber-950 text-xs sm:text-sm">
              Perhatian & Disclaimer Dokumen Unggahan
            </span>
            <span className="text-[10px] font-extrabold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Dokumen Rawan
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed">
            Dokumen sertifikasi dan paspor merupakan berkas yang <strong>bersifat rawan dan rahasia</strong>. Pengunggahan dokumen dilakukan atas kesadaran pribadi, dan <strong>pihak kami tidak bertanggung jawab jika terjadi sesuatu atau kendala di kemudian hari terkait dokumen tersebut</strong>.
          </p>
        </div>
      </div>

      {/* Global Error Banner */}
      {uploadError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span className="flex-1 font-medium">{uploadError}</span>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-red-400 hover:text-red-600 p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. BNSP Section */}
      <div className="space-y-3">
        <RadioInput
          label="Status Sertifikasi Profesi BNSP Tour Leader"
          options={bnspOptions}
          value={data.bnspStatus}
          onChange={(val) => updateData({ bnspStatus: val })}
          required
        />

        {/* Muncul langsung di bawah opsi bersertifikat BNSP */}
        {data.bnspStatus === 'Bersertifikat Resmi BNSP' && (
          <div className="animate-fade-in pl-3 border-l-2 border-primary-500 space-y-3">
            <Input
              label="Nomor Registrasi Sertifikat BNSP (Opsional)"
              placeholder="e.g. REG.PAR.002.00012.2023"
              value={data.bnspNumber || ''}
              onChange={(e) => updateData({ bnspNumber: e.target.value })}
              icon={<Award className="w-4 h-4" />}
            />

            {renderDocumentUploader(
              'Sertifikat BNSP',
              bnspDoc,
              bnspInputRef,
              'Unggah Salinan Sertifikat BNSP (.PDF / Gambar)',
              'Format PDF atau scan foto sertifikat kompetensi LSP (Maks. 10 MB)',
              'Pilih File BNSP'
            )}
          </div>
        )}
      </div>

      {/* 2. Passport Status Section */}
      <div className="space-y-3">
        <RadioInput
          label="Status Dokumen Paspor"
          options={passportOptions}
          value={data.passportStatus}
          onChange={(val) => updateData({ passportStatus: val })}
          required
        />

        {/* Muncul langsung di bawah opsi Paspor Aktif */}
        {data.passportStatus.includes('Aktif') && (
          <div className="animate-fade-in pl-3 border-l-2 border-primary-500 space-y-3">
            <Input
              label="Masa Berlaku Paspor Hingga (Bulan / Tahun)"
              placeholder="e.g. 11/2028"
              value={data.passportExpiry || ''}
              onChange={(e) => updateData({ passportExpiry: e.target.value })}
              icon={<FileCheck className="w-4 h-4" />}
            />

            {renderDocumentUploader(
              'Paspor',
              passportDoc,
              passportInputRef,
              'Unggah Scan / Foto Halaman Paspor (.PDF / Gambar)',
              'Pastikan halaman identitas paspor terlihat jelas dan tidak buram (Maks. 10 MB)',
              'Pilih File Paspor'
            )}
          </div>
        )}
      </div>

      {/* 3. First Aid & CPR Section */}
      <div className="space-y-3">
        <RadioInput
          label="Keahlian Pertolongan Pertama (First Aid & CPR)"
          options={firstAidOptions}
          value={data.firstAidCertified}
          onChange={(val) => updateData({ firstAidCertified: val })}
          required
        />

        {/* Muncul langsung di bawah opsi Ya, Bersertifikat CPR/P3K */}
        {data.firstAidCertified === 'Bersertifikat CPR / P3K' && (
          <div className="animate-fade-in pl-3 border-l-2 border-primary-500">
            {renderDocumentUploader(
              'Sertifikat First Aid / CPR',
              firstAidDoc,
              firstAidInputRef,
              'Unggah Dokumen Sertifikat First Aid / CPR (.PDF / Gambar)',
              'Sertifikat PMI, St. John Ambulance, Medic, atau institusi resmi (Maks. 10 MB)',
              'Pilih File Sertifikat P3K'
            )}
          </div>
        )}
      </div>

      {/* Document In-App Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-4 py-3 bg-gray-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate max-w-xs">{previewDoc.name}</div>
                  <div className="text-[10px] text-gray-400">
                    {previewDoc.category} • {formatFileSize(previewDoc.size)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {previewDoc.fileData && (
                  <a
                    href={previewDoc.fileData}
                    download={previewDoc.name}
                    className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                    title="Unduh File"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-gray-100 flex items-center justify-center min-h-[300px]">
              {previewDoc.fileData ? (
                previewDoc.type === 'application/pdf' ? (
                  <div className="w-full h-[400px] flex flex-col items-center justify-center bg-white rounded-xl p-6 border border-gray-200 text-center">
                    <FileText className="w-16 h-16 text-red-500 mb-3 animate-pulse" />
                    <h4 className="font-bold text-sm text-gray-900 mb-1">{previewDoc.name}</h4>
                    <p className="text-xs text-gray-500 mb-4 max-w-xs">
                      Dokumen PDF tersimpan aman di profil Anda ({formatFileSize(previewDoc.size)}).
                    </p>
                    <div className="flex gap-2">
                      <a
                        href={previewDoc.fileData}
                        download={previewDoc.name}
                        className="px-4 py-2 bg-primary-600 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 hover:bg-primary-700"
                      >
                        <Download className="w-4 h-4" /> Unduh PDF
                      </a>
                      <a
                        href={previewDoc.fileData}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-gray-300"
                      >
                        <ExternalLink className="w-4 h-4" /> Buka Tab Baru
                      </a>
                    </div>
                  </div>
                ) : (
                  <img
                    src={previewDoc.fileData}
                    alt={previewDoc.name}
                    className="max-h-[420px] max-w-full rounded-lg object-contain shadow-md"
                  />
                )
              ) : (
                <div className="text-center p-6 text-gray-500">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs">File simulasi tersimpan tanpa data biner langsung.</p>
                </div>
              )}
            </div>

            <div className="p-3 bg-white border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
