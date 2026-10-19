import React, { useState, useRef } from 'react';
import { TourLeaderProfile, DocumentAttachment, DocumentCategory } from '../../types';
import {
  FileText,
  Upload,
  CheckCircle2,
  Trash2,
  Eye,
  X,
  Download,
  AlertCircle,
  ExternalLink,
  FileCheck2,
  Plus,
  ShieldAlert
} from 'lucide-react';

interface Props {
  data: TourLeaderProfile;
  updateData: (fields: Partial<TourLeaderProfile>) => void;
}

interface VisaOptionItem {
  id: string;
  name: string;
  countryGroup: string;
  subtitle: string;
  tag: string;
  flagEmoji: string;
}

const VISA_OPTIONS: VisaOptionItem[] = [
  {
    id: 'Visa Schengen',
    name: 'Visa Schengen (Uni Eropa)',
    countryGroup: 'Eropa Barat, Tengah & Nordik',
    subtitle: 'Multiple entry ke 27 negara anggota Schengen (Prancis, Italia, Swiss, Jerman, dll.)',
    tag: 'Eropa',
    flagEmoji: '🇪🇺'
  },
  {
    id: 'Visa USA (B1/B2)',
    name: 'Visa Amerika Serikat (B1/B2)',
    countryGroup: 'United States',
    subtitle: 'Visa turis & bisnis B1/B2 aktif (validitas 5 hingga 10 tahun)',
    tag: 'Amerika',
    flagEmoji: '🇺🇸'
  },
  {
    id: 'Visa Jepang',
    name: 'Visa Jepang (Multiple / eVisa)',
    countryGroup: 'East Asia',
    subtitle: 'Visa stiker multiple entry atau registrasi bebas visa e-paspor aktif',
    tag: 'Jepang',
    flagEmoji: '🇯🇵'
  },
  {
    id: 'Visa Australia',
    name: 'Visa Australia (Subclass 600)',
    countryGroup: 'Oceania',
    subtitle: 'e-Visitor atau Tourist Stream Subclass 600 untuk penugasan tur Sydney/Melbourne',
    tag: 'Australia',
    flagEmoji: '🇦🇺'
  },
  {
    id: 'Visa UK',
    name: 'Visa Inggris / UK Standard Visitor',
    countryGroup: 'United Kingdom',
    subtitle: 'Standard Visitor Visa akses ke Inggris, Skotlandia, Wales & Irlandia Utara',
    tag: 'UK',
    flagEmoji: '🇬🇧'
  },
  {
    id: 'Visa Korea Selatan',
    name: 'Visa Korea Selatan (C-3-9)',
    countryGroup: 'East Asia',
    subtitle: 'Single atau multiple entry turis Korea Selatan',
    tag: 'Korea',
    flagEmoji: '🇰🇷'
  },
  {
    id: 'Visa China',
    name: 'Visa China (L / Tourist)',
    countryGroup: 'East Asia',
    subtitle: 'Visa turis daratan Tiongkok (Beijing, Shanghai, Zhangjiajie, dll.)',
    tag: 'China',
    flagEmoji: '🇨🇳'
  },
  {
    id: 'Visa Lainnya',
    name: 'Visa Negara Lainnya (Kanada, NZ, dll.)',
    countryGroup: 'Internasional Lainnya',
    subtitle: 'Selandia Baru (NZeTA), Kanada (eTA/Visa), Dubai/UAE, atau visa lainnya',
    tag: 'Lainnya',
    flagEmoji: '🌐'
  }
];

export const StepVisa: React.FC<Props> = ({ data, updateData }) => {
  const [previewDoc, setPreviewDoc] = useState<DocumentAttachment | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeDragVisa, setActiveDragVisa] = useState<string | null>(null);

  // Hidden file input refs for each visa
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const activeVisas = data.activeVisas || [];
  const documents = data.documents || [];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleToggleVisa = (visaId: string) => {
    const isSelected = activeVisas.includes(visaId);
    let nextVisas: string[];

    if (isSelected) {
      nextVisas = activeVisas.filter(v => v !== visaId);
    } else {
      nextVisas = [...activeVisas, visaId];
    }
    updateData({ activeVisas: nextVisas });
  };

  const handleClearAllVisas = () => {
    updateData({ activeVisas: [] });
  };

  const processUploadedFile = (
    file: File,
    visaName?: string,
    category: DocumentCategory = 'Visa'
  ) => {
    setUploadError(null);
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const maxSizeBytes = 10 * 1024 * 1024; // 10 MB

    const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
    const isAllowed = allowedTypes.includes(file.type) || isPdf;

    if (!isAllowed) {
      setUploadError(`Format "${file.name}" tidak didukung. Mohon gunakan file PDF (.pdf) atau gambar scan (JPG/PNG).`);
      return;
    }

    if (file.size > maxSizeBytes) {
      setUploadError(`Ukuran file "${file.name}" melebihi batas 10 MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target?.result as string;
      const newDoc: DocumentAttachment = {
        id: 'doc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        name: file.name,
        size: file.size,
        type: isPdf ? 'application/pdf' : file.type,
        category,
        visaName: visaName || undefined,
        fileData: base64Data,
        uploadedAt: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      // If replacing a document for the same visa, remove the old one first
      let updatedDocs = [...documents];
      if (visaName) {
        updatedDocs = updatedDocs.filter(d => d.visaName !== visaName);
      }
      updatedDocs.push(newDoc);
      updateData({ documents: updatedDocs });
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveDoc = (docId: string) => {
    const updated = documents.filter(d => d.id !== docId);
    updateData({ documents: updated });
    if (previewDoc?.id === docId) {
      setPreviewDoc(null);
    }
  };

  const getDocForVisa = (visaId: string): DocumentAttachment | undefined => {
    return documents.find(d => d.visaName === visaId || (d.category === 'Visa' && d.name.toLowerCase().includes(visaId.toLowerCase())));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-4 rounded-2xl border border-orange-200/60">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-primary-500" />
          <span className="text-[11px] font-bold text-primary-700 uppercase tracking-wider">Step 3 dari 5</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Kepemilikan Visa & Dokumen Visa</h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
          Pilih visa aktif yang Anda miliki. Mengunggah salinan dokumen visa dalam format PDF/Gambar mempercepat proses verifikasi dan penugasan tur luar negeri.
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
              Perhatian & Disclaimer Keamanan Dokumen
            </span>
            <span className="text-[10px] font-extrabold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Dokumen Rawan
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-amber-900 leading-relaxed">
            Dokumen visa dan identitas perjalanan merupakan berkas yang <strong>bersifat rawan dan rahasia</strong>. Mohon pastikan dokumen yang Anda unggah adalah sah. <strong>Kami tidak bertanggung jawab jika terjadi sesuatu hal atau masalah dengan dokumen tersebut di kemudian hari.</strong>
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

      {/* Quick Option: Belum punya visa */}
      <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <div className="text-xs font-bold text-gray-800">
            {activeVisas.length === 0 ? 'Belum Memiliki Visa Aktif' : `${activeVisas.length} Visa Dipilih`}
          </div>
          <div className="text-[11px] text-gray-500">
            {activeVisas.length === 0
              ? 'Jika Anda fokus pada rute tur domestik saat ini, Anda dapat langsung melanjutkan.'
              : 'Lampirkan file PDF dokumen visa di bawah untuk visa yang telah dicentang.'}
          </div>
        </div>
        {activeVisas.length > 0 && (
          <button
            type="button"
            onClick={handleClearAllVisas}
            className="text-[11px] font-bold text-gray-500 hover:text-red-600 px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-red-50 transition-colors"
          >
            Reset Pilihan
          </button>
        )}
      </div>

      {/* Visa List */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
          Daftar Visa Aktif & Upload Dokumen PDF
        </label>

        {VISA_OPTIONS.map((visa) => {
          const isSelected = activeVisas.includes(visa.id);
          const attachedDoc = getDocForVisa(visa.id);

          return (
            <div
              key={visa.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isSelected
                  ? 'bg-orange-50/30 border-primary-400 shadow-sm'
                  : 'bg-white border-gray-200/80 hover:border-orange-200 shadow-xs'
              }`}
            >
              {/* Visa Header / Click to Select */}
              <div
                onClick={() => handleToggleVisa(visa.id)}
                className="p-3.5 sm:p-4 flex items-start gap-3 cursor-pointer select-none"
              >
                {/* Custom Checkbox */}
                <div
                  className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center transition-all flex-shrink-0 ${
                    isSelected
                      ? 'bg-primary-500 text-white shadow-xs'
                      : 'border-2 border-gray-300 bg-white'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-white stroke-[2.5]" />}
                </div>

                {/* Info Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="text-base leading-none">{visa.flagEmoji}</span>
                    <span className="font-bold text-sm text-gray-900">{visa.name}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100/80 text-primary-700">
                      {visa.tag}
                    </span>

                    {/* PDF Badge if already uploaded */}
                    {attachedDoc && (
                      <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                        <FileCheck2 className="w-3 h-3 text-emerald-600" />
                        PDF Terlampir
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-snug">{visa.subtitle}</p>
                </div>
              </div>

              {/* Dynamic Upload Feature (Appears When Checked) */}
              {isSelected && (
                <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-1 animate-fade-in border-t border-orange-100 bg-white/60">
                  <input
                    type="file"
                    ref={(el) => (fileInputRefs.current[visa.id] = el)}
                    accept=".pdf,application/pdf,image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        processUploadedFile(e.target.files[0], visa.id, 'Visa');
                        e.target.value = '';
                      }
                    }}
                  />

                  {attachedDoc ? (
                    /* Document Attached Card */
                    <div className="space-y-1.5">
                      <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-xs flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0 border border-red-100">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-xs text-gray-900 truncate" title={attachedDoc.name}>
                              {attachedDoc.name}
                            </div>
                            <div className="text-[10px] text-gray-500 flex items-center gap-2">
                              <span>{formatFileSize(attachedDoc.size)}</span>
                              <span>•</span>
                              <span className="text-emerald-600 font-semibold">Tersimpan ({attachedDoc.uploadedAt})</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => setPreviewDoc(attachedDoc)}
                            className="p-1.5 text-gray-600 hover:text-primary-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Lihat Pratinjau Dokumen"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => fileInputRefs.current[visa.id]?.click()}
                            className="p-1.5 text-gray-600 hover:text-primary-600 hover:bg-orange-50 rounded-lg transition-colors text-[11px] font-semibold"
                            title="Ganti File"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveDoc(attachedDoc.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus Dokumen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Warning Note */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 rounded-xl border border-amber-200 text-[10px] text-amber-800 font-medium">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span>Catatan: Dokumen visa bersifat rawan. Kami tidak bertanggung jawab jika terjadi sesuatu dengan dokumen ini.</span>
                      </div>
                    </div>
                  ) : (
                    /* Upload Dropzone for Checked Visa */
                    <div className="space-y-1.5">
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setActiveDragVisa(visa.id);
                        }}
                        onDragLeave={() => setActiveDragVisa(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setActiveDragVisa(null);
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            processUploadedFile(e.dataTransfer.files[0], visa.id, 'Visa');
                          }
                        }}
                        onClick={() => fileInputRefs.current[visa.id]?.click()}
                        className={`p-3.5 rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-center sm:text-left ${
                          activeDragVisa === visa.id
                            ? 'border-primary-500 bg-orange-100/50 scale-[1.01]'
                            : 'border-orange-300/80 hover:border-primary-500 bg-white/80 hover:bg-orange-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 text-primary-600 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                            <Upload className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-gray-800">
                              Unggah Dokumen {visa.name} (.PDF)
                            </div>
                            <div className="text-[10px] text-gray-500">
                              Klik untuk pilih file PDF atau scan gambar (Maks. 10 MB). Opsional jika file belum siap.
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs rounded-xl transition-all shadow-xs self-center sm:self-auto flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Pilih PDF
                        </button>
                      </div>

                      {/* Warning Note */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50/90 rounded-xl border border-amber-200 text-[10px] text-amber-800 font-medium">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span>Catatan: Dokumen visa bersifat rawan. Kami tidak bertanggung jawab jika terjadi sesuatu dengan dokumen ini.</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
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
                    {previewDoc.category} {previewDoc.visaName ? `(${previewDoc.visaName})` : ''} • {formatFileSize(previewDoc.size)}
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
