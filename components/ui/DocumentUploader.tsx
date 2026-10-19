import React, { useState, useRef } from 'react';
import { DocumentAttachment, DocumentCategory } from '../../types';
import {
  Upload,
  FileText,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  X,
  ExternalLink,
  Download,
  ShieldCheck,
  Globe,
  ShieldAlert
} from 'lucide-react';

interface DocumentUploaderProps {
  documents: DocumentAttachment[];
  onChange: (docs: DocumentAttachment[]) => void;
  title?: string;
  subtitle?: string;
}

const CATEGORY_OPTIONS: { label: string; value: DocumentCategory; desc: string; icon: string }[] = [
  { label: 'Dokumen Visa (Rekomendasi)', value: 'Visa', desc: 'Scan Visa Schengen, USA, Jepang, Australia, dll.', icon: '🛂' },
  { label: 'Sertifikat BNSP', value: 'Sertifikat BNSP', desc: 'Sertifikat Kompetensi Tour Leader', icon: '📜' },
  { label: 'Scan Paspor', value: 'Paspor', desc: 'Halaman identitas paspor aktif', icon: '📘' },
  { label: 'Sertifikat First Aid / CPR', value: 'Sertifikat First Aid / CPR', desc: 'Bukti pelatihan medis / P3K', icon: '🩹' },
  { label: 'Dokumen Lainnya', value: 'Dokumen Lainnya', desc: 'Sertifikat bahasa, vaksin, dll.', icon: '📁' },
];

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  documents = [],
  onChange,
  title = 'Unggah Dokumen Legalitas & Visa',
  subtitle = 'Unggah dokumen dalam format PDF (.pdf) untuk verifikasi visa perjalanan dan sertifikasi resmi Anda.'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('Visa');
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<DocumentAttachment | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMsg(null);

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const maxSizeBytes = 10 * 1024 * 1024; // 10 MB

    const newDocs: DocumentAttachment[] = [];

    Array.from(files).forEach((file) => {
      // Check file type
      const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
      const isAllowed = allowedTypes.includes(file.type) || isPdf;

      if (!isAllowed) {
        setErrorMsg(`Format "${file.name}" tidak didukung. Mohon gunakan file PDF (.pdf) atau gambar (JPG/PNG).`);
        return;
      }

      if (file.size > maxSizeBytes) {
        setErrorMsg(`Ukuran file "${file.name}" melebihi batas 10 MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target?.result as string;
        const newAttachment: DocumentAttachment = {
          id: 'doc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
          name: file.name,
          size: file.size,
          type: isPdf ? 'application/pdf' : file.type,
          category: selectedCategory,
          fileData: base64Data,
          uploadedAt: new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };

        newDocs.push(newAttachment);
        if (newDocs.length === files.length) {
          onChange([...documents, ...newDocs]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeDoc = (id: string) => {
    onChange(documents.filter((doc) => doc.id !== id));
  };

  const updateDocCategory = (id: string, newCat: DocumentCategory) => {
    onChange(
      documents.map((doc) => (doc.id === id ? { ...doc, category: newCat } : doc))
    );
  };

  const visaCount = documents.filter((d) => d.category === 'Visa').length;

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
      {/* Title & Description */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <span className="p-1 rounded-lg bg-orange-100 text-primary-600">
              <FileCheck2 className="w-4 h-4" />
            </span>
            {title}
          </label>
          {documents.length > 0 && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-primary-700">
              {documents.length} Dokumen Terlampir
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">{subtitle}</p>
      </div>

      {/* Safety Note & Disclaimer */}
      <div className="p-3 bg-amber-50/95 border border-amber-300/80 rounded-xl flex items-start gap-2.5 text-xs">
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed text-amber-900">
          <span className="font-bold text-amber-950 block">Pemberitahuan & Disclaimer Keamanan Dokumen:</span>
          Dokumen ini bersifat rawan dan sensitif. Kami mengingatkan bahwa pihak kami tidak bertanggung jawab jika terjadi sesuatu atau risiko terkait dokumen yang diunggah.
        </div>
      </div>

      {/* Target Category Selector */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
          Kategori Dokumen yang Diunggah:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {CATEGORY_OPTIONS.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            const isVisa = cat.value === 'Visa';
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`text-left p-2.5 rounded-xl border text-xs transition-all relative ${
                  isSelected
                    ? 'border-primary-500 bg-orange-50/90 text-primary-950 shadow-2xs font-semibold ring-1 ring-primary-500'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 text-gray-700 bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{cat.icon}</span>
                  <span className="truncate">{cat.label}</span>
                </div>
                {isVisa && (
                  <span className="inline-block mt-1 text-[9px] font-bold bg-amber-200/80 text-amber-900 px-1.5 py-0.2 rounded">
                    Khusus Visa
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-primary-500 bg-orange-100/50 scale-[0.99]'
            : 'border-orange-200/90 hover:border-primary-400 bg-gradient-to-b from-orange-50/30 to-white'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf,image/png,image/jpeg,image/jpg"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="w-12 h-12 mx-auto mb-2.5 rounded-2xl bg-orange-100/80 text-primary-600 flex items-center justify-center shadow-2xs">
          <Upload className="w-6 h-6 animate-pulse" />
        </div>

        <p className="text-xs sm:text-sm font-bold text-gray-800">
          Klik untuk memilih file atau seret file ke sini
        </p>

        <p className="text-[11px] text-gray-500 mt-1 max-w-sm mx-auto">
          Mendukung format utama <span className="font-bold text-primary-700">PDF (.pdf)</span>, serta scan JPG/PNG (Maks. 10 MB per file)
        </p>

        <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-[10px] font-bold bg-white border border-orange-200 text-gray-600 shadow-2xs">
          <span>Kategori Aktif:</span>
          <span className="text-primary-600 underline font-extrabold">{selectedCategory}</span>
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span>{errorMsg}</span>
          <button
            type="button"
            onClick={() => setErrorMsg(null)}
            className="ml-auto text-red-400 hover:text-red-700"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Uploaded Documents List */}
      {documents.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-gray-800 flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
              Daftar Dokumen yang Telah Diunggah ({documents.length})
            </span>
            {visaCount > 0 && (
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {visaCount} Visa Terlampir
              </span>
            )}
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {documents.map((doc) => {
              const isPdf = doc.type.includes('pdf') || doc.name.toLowerCase().endsWith('.pdf');
              return (
                <div
                  key={doc.id}
                  className="p-3 rounded-xl border border-gray-200 bg-white hover:border-orange-200 hover:shadow-2xs transition-all flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {/* File Type Icon */}
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-[10px] ${
                        isPdf
                          ? 'bg-red-50 text-red-600 border border-red-200'
                          : 'bg-blue-50 text-blue-600 border border-blue-200'
                      }`}
                    >
                      {isPdf ? 'PDF' : 'IMG'}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-gray-900 truncate" title={doc.name}>
                        {doc.name}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                        <span className="font-semibold text-primary-700 bg-orange-50 px-1.5 py-0.2 rounded border border-orange-200">
                          {doc.category}
                        </span>
                        <span>•</span>
                        <span>{formatFileSize(doc.size)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    {doc.fileData && (
                      <button
                        type="button"
                        onClick={() => setPreviewDoc(doc)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-orange-50 transition-colors"
                        title="Lihat / Pratinjau Dokumen"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => removeDoc(doc.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Hapus Dokumen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-orange-50/50">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 truncate">{previewDoc.name}</h4>
                  <p className="text-[10px] text-gray-500">
                    Kategori: {previewDoc.category} • {formatFileSize(previewDoc.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 overflow-y-auto flex-1 flex flex-col items-center justify-center min-h-[250px] bg-gray-50/50">
              {previewDoc.type.includes('pdf') || previewDoc.name.toLowerCase().endsWith('.pdf') ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shadow-xs">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-900">{previewDoc.name}</h5>
                    <p className="text-xs text-gray-500 mt-1">Dokumen PDF Terverifikasi</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {previewDoc.fileData && (
                      <a
                        href={previewDoc.fileData}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold shadow-md shadow-primary-500/20 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Buka PDF di Tab Baru
                      </a>
                    )}
                    {previewDoc.fileData && (
                      <a
                        href={previewDoc.fileData}
                        download={previewDoc.name}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Unduh File
                      </a>
                    )}
                  </div>
                </div>
              ) : previewDoc.fileData ? (
                <div className="max-w-full max-h-[60vh] overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={previewDoc.fileData}
                    alt={previewDoc.name}
                    className="w-full h-auto object-contain max-h-[55vh]"
                  />
                </div>
              ) : (
                <p className="text-xs text-gray-500">Pratinjau tidak tersedia.</p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-gray-100 bg-white flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
