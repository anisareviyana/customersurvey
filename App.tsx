import React, { useState } from 'react';
import { INITIAL_PROFILE, TourLeaderProfile } from './types';
import { WelcomePage } from './components/WelcomePage';
import { Step1 } from './components/steps/Step1';
import { Step2 } from './components/steps/Step2';
import { StepVisa } from './components/steps/StepVisa';
import { Step3 } from './components/steps/Step3';
import { Step4 } from './components/steps/Step4';
import { Button } from './components/ui/Button';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Zap,
  Wifi,
  BatteryMedium,
  Signal,
  X
} from 'lucide-react';
import tourLeaderSuccessImg from './src/assets/images/tour_leader_success_1792465141256.jpg';

const SAMPLE_PROFILING_DATA: TourLeaderProfile = {
  fullName: 'Arif Wibisono, S.Par',
  nickname: 'Arif',
  gender: 'Pria',
  phone: '0812-8899-7721',
  email: 'arif.wibisono@panoramatours.id',
  city: 'Jabodetabek',
  cityOther: '',
  domicile: 'Jabodetabek',
  domicileOther: '',
  religion: 'Islam',
  uniformSize: 'L',
  instagram: '@arif.adventure',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',

  domesticDestinations: ['Bali & Nusa Penida', 'Labuan Bajo & Komodo', 'Yogyakarta, Solo & Semarang', 'Bromo, Malang & Ijen'],
  internationalDestinations: ['Asia Timur (Jepang & Korea)', 'Asia Tenggara (SG, MY, TH, VN)', 'Eropa Barat & Tengah'],
  preferredGroupType: ['Corporate Gathering & MICE', 'VIP', 'Keluarga (Family Tour)', 'Usia Produktif (Liburan Musim Cuti)'],

  bnspStatus: 'Bersertifikat Resmi BNSP',
  bnspNumber: 'REG.PAR.042.00192.2024',
  passportStatus: 'Aktif (> 1 Tahun)',
  passportExpiry: '08/2029',
  activeVisas: ['Visa Schengen', 'Visa Jepang', 'Visa Australia'],
  firstAidCertified: 'Bersertifikat CPR / P3K',
  documents: [
    {
      id: 'doc_sample_1',
      name: 'Scan_Visa_Schengen_Multiple_2026.pdf',
      size: 1420000,
      type: 'application/pdf',
      category: 'Visa',
      visaName: 'Visa Schengen',
      uploadedAt: '12 Okt 2026, 14:30'
    },
    {
      id: 'doc_sample_2',
      name: 'Sertifikat_Kompetensi_BNSP_Tour_Leader.pdf',
      size: 2150000,
      type: 'application/pdf',
      category: 'Sertifikat BNSP',
      uploadedAt: '12 Okt 2026, 14:32'
    }
  ],

  languages: [
    { language: 'Bahasa Indonesia', level: 'Fasih (Fluent)' },
    { language: 'Bahasa Inggris', level: 'Fasih (Fluent)' },
    { language: 'Bahasa Jepang', level: 'Menengah' }
  ],
  specialSkills: ['Fotografi & Video Reels', 'Ice Breaking & MC', 'P3K & Medis Lapangan', 'Kuliner & Street Food'],
  personalBio: 'Berkomitmen menyajikan pengalaman liburan yang aman, penuh kehangatan, dokumentasi estetik, dan kenangan tak terlupakan bagi setiap tamu.',

  availabilityStatus: 'Siap Kapan Saja',
  assignmentScope: 'Siap Domestik & Internasional',
  emergencyContactName: 'Dewi Anggraini',
  emergencyContactRelation: 'Istri',
  emergencyContactPhone: '0813-7722-1100',
  dataConsent: true,
};

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TourLeaderProfile>(INITIAL_PROFILE);
  const [isCompleted, setIsCompleted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const totalSteps = 5;

  const updateData = (fields: Partial<TourLeaderProfile>) => {
    setFormData(prev => ({ ...prev, ...fields }));
    if (validationError) setValidationError(null);
  };

  const loadSampleData = () => {
    setFormData(SAMPLE_PROFILING_DATA);
    setValidationError(null);
    if (!isStarted) {
      setIsStarted(true);
    }
  };

  const validateStep = (step: number): { valid: boolean; error?: string } => {
    switch (step) {
      case 1:
        if (!formData.domicile && !formData.city) {
          return { valid: false, error: 'Mohon tentukan Kota Domisili tempat tinggal Anda.' };
        }
        if (!formData.religion) {
          return { valid: false, error: 'Mohon pilih Agama Anda untuk penyesuaian penugasan.' };
        }
        if (!formData.domesticDestinations || formData.domesticDestinations.length === 0) {
          return { valid: false, error: 'Pilih minimal satu Destinasi Domestik yang Anda kuasai.' };
        }
        if (!formData.preferredGroupType || formData.preferredGroupType.length === 0) {
          return { valid: false, error: 'Pilih minimal satu Kategori Wisatawan yang nyaman Anda pandu.' };
        }
        return { valid: true };

      case 2:
        if (!formData.bnspStatus) return { valid: false, error: 'Mohon pilih Status Sertifikasi Profesi BNSP Anda.' };
        if (!formData.passportStatus) return { valid: false, error: 'Mohon tentukan Status Dokumen Paspor Anda.' };
        if (!formData.firstAidCertified) return { valid: false, error: 'Mohon pilih Keahlian Pertolongan Pertama (First Aid).' };
        return { valid: true };

      case 3:
        // Visa Step: Opsional / verifikasi dokumen visa
        return { valid: true };

      case 4:
        if (!formData.languages || formData.languages.length === 0) return { valid: false, error: 'Cantumkan minimal satu kemampuan bahasa.' };
        if (!formData.personalBio.trim()) return { valid: false, error: 'Tuliskan Bio / Motto Pelayanan singkat Anda.' };
        return { valid: true };

      case 5:
        if (!formData.availabilityStatus) return { valid: false, error: 'Mohon tentukan Status Ketersediaan Penugasan Anda.' };
        if (!formData.assignmentScope) return { valid: false, error: 'Pilih Cakupan Rute Penugasan Anda.' };
        if (!formData.emergencyContactName.trim()) return { valid: false, error: 'Mohon isi Nama Kontak Darurat.' };
        if (!formData.emergencyContactPhone.trim()) return { valid: false, error: 'Mohon isi Nomor Telepon Kontak Darurat.' };
        if (!formData.dataConsent) return { valid: false, error: 'Anda harus menyetujui Pernyataan Kebenaran Data sebelum mengirim profil.' };
        return { valid: true };

      default:
        return { valid: true };
    }
  };

  const handleNext = () => {
    const result = validateStep(currentStep);
    if (result.valid) {
      setValidationError(null);
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
        const scrollElem = document.getElementById('step-scroll-area');
        if (scrollElem) scrollElem.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleSubmit();
      }
    } else {
      setValidationError(result.error || 'Mohon lengkapi data yang bertanda bintang (*)');
    }
  };

  const handleBack = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      const scrollElem = document.getElementById('step-scroll-area');
      if (scrollElem) scrollElem.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Back from step 1 returns to Welcome Page
      setIsStarted(false);
    }
  };

  const handleSubmit = () => {
    setIsCompleted(true);
  };

  // View when profiling completed
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100/50 via-[#FAF7F2] to-amber-50/60 font-sans flex flex-col items-center justify-start p-2 sm:p-6 relative select-none selection:bg-primary-100 selection:text-primary-900">
        {/* Decorative Warm Ambient Elements */}
        <div className="fixed top-[-10%] left-[-10%] w-[550px] h-[550px] bg-primary-200/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[550px] h-[550px] bg-orange-300/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Utility Bar (Consistent with Mobile App Header) */}
        <header className="w-full max-w-[390px] mb-2 flex items-center justify-between px-2 sm:px-1 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-primary-500/20">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-black text-primary-600 block leading-none">
                PANORAMA JTB
              </span>
              <span className="text-xs font-bold text-gray-800 leading-tight">
                Tour Leader Profiling
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setFormData(INITIAL_PROFILE);
              setCurrentStep(1);
              setIsCompleted(false);
              setIsStarted(false);
            }}
            className="text-[11px] font-bold bg-white/90 hover:bg-gray-100 text-gray-700 border border-gray-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 shadow-2xs active:scale-95"
            title="Tutup dan kembali ke halaman awal"
          >
            <X className="w-3.5 h-3.5 text-gray-600" />
            <span>Close</span>
          </button>
        </header>

        {/* Mobile Smartphone Frame Container */}
        <div className="w-full max-w-[390px] h-[844px] max-h-[92vh] bg-white sm:rounded-[3rem] sm:border-[8px] sm:border-gray-900 sm:shadow-2xl sm:shadow-orange-950/20 my-1 sm:my-2 flex flex-col justify-between overflow-hidden relative border border-gray-100 backdrop-blur-md animate-fade-in">
          {/* Realistic Mobile Status Bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1 text-gray-800 select-none z-50 bg-white">
            <span className="text-xs font-bold tracking-tight">9:46</span>
            
            {/* Front Camera Punch-hole */}
            <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center -ml-1">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
            </div>

            <div className="flex items-center gap-1.5 text-gray-800">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3.5 h-3.5" />
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>

          {/* Top In-App Header */}
          <div className="px-4 py-2.5 flex items-center justify-between border-b border-orange-100/70 bg-white/95">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-800">Status Profiling</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setFormData(INITIAL_PROFILE);
                setCurrentStep(1);
                setIsCompleted(false);
                setIsStarted(false);
              }}
              className="text-xs font-bold text-gray-500 hover:text-red-600 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Screen Content */}
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-5 py-3 text-center">
            {/* Supportive Image Replacing Copy Button */}
            <div className="relative mx-auto my-2 w-48 h-48 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-md shadow-orange-900/10 border-2 border-orange-200 bg-orange-50/60 flex items-center justify-center group">
              <img
                src={tourLeaderSuccessImg}
                alt="Tour Leader Siap Bertugas"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full shadow-md">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Tersimpan di Sistem Panorama
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-1">
              Profil Berhasil Disimpan!
            </h2>
            <p className="text-gray-500 text-xs mb-2 leading-relaxed">
              Data profiling Anda telah berhasil tercatat dalam sistem Tour Leader Panorama. Terima kasih atas kelengkapan informasi yang telah Anda berikan.
            </p>

            {/* Quick Profile Summary Badges */}
            <div className="flex items-center justify-center gap-2 mb-3.5 flex-wrap">
              <span className="px-2.5 py-1 rounded-full bg-orange-100/90 text-primary-800 text-[10.5px] font-bold">
                📍 Domisili: {formData.domicile || formData.city || 'Jabodetabek'}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-100/90 text-amber-900 text-[10.5px] font-bold">
                🙏 Agama: {formData.religion || 'Islam'}
              </span>
            </div>

            {/* Uploaded Documents Notification Box */}
            {formData.documents && formData.documents.length > 0 && (
              <div className="mb-4 p-3 bg-orange-50/80 rounded-2xl border border-orange-200/80 text-left text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-gray-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Dokumen Legalitas & Visa ({formData.documents.length})
                  </span>
                  <span className="text-[10px] font-bold text-primary-700 bg-white px-2 py-0.5 rounded-full border border-orange-200">
                    Tersimpan
                  </span>
                </div>
                <div className="space-y-1">
                  {formData.documents.map((d) => (
                    <div key={d.id} className="flex items-center gap-1.5 text-[11px] text-gray-600 truncate">
                      <span className="font-bold text-red-600 bg-red-100/80 px-1 py-0.2 rounded text-[9px]">
                        {d.type.includes('pdf') || d.name.endsWith('.pdf') ? 'PDF' : 'FILE'}
                      </span>
                      <span className="font-medium truncate">{d.name}</span>
                      <span className="text-gray-400">({d.category})</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-orange-200/60 text-[10px] text-amber-900 flex items-start gap-1.5 bg-amber-100/60 p-2 rounded-xl leading-relaxed">
                  <span className="font-bold flex-shrink-0">Disclaimer:</span>
                  <span>Dokumen bersifat rawan dan kami tidak bertanggung jawab jika terjadi sesuatu dengan berkas dokumen tersebut.</span>
                </div>
              </div>
            )}

            <p className="text-[10.5px] text-gray-400 mt-2 mb-2">
              Data diri diambil secara otomatis dari Menu Profil Anda. Tim Operasional akan memvalidasi dokumen untuk penugasan trip.
            </p>
          </div>

          {/* Bottom Action Footer with Edit Data and Close Buttons */}
          <div className="p-4 bg-white border-t border-orange-100">
            <div className="grid grid-cols-2 gap-2.5">
              <Button
                variant="secondary"
                onClick={() => setIsCompleted(false)}
                className="flex items-center justify-center gap-1.5 text-xs sm:text-sm py-3 font-bold"
              >
                <ChevronLeft className="w-4 h-4" /> Edit Data
              </Button>

              <Button
                variant="primary"
                onClick={() => {
                  setFormData(INITIAL_PROFILE);
                  setCurrentStep(1);
                  setIsCompleted(false);
                  setIsStarted(false);
                }}
                className="flex items-center justify-center gap-1.5 text-xs sm:text-sm py-3 font-bold shadow-md shadow-primary-500/20"
              >
                <X className="w-4 h-4" /> Close
              </Button>
            </div>
          </div>

          {/* Bottom Android Navigation Bar */}
          <div className="bg-black text-white/70 py-2 px-12 flex items-center justify-between select-none">
            <button
              type="button"
              onClick={() => setIsCompleted(false)}
              className="p-1 hover:text-white transition-colors"
              title="Back"
            >
              <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[10px] border-r-white/80" />
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData(INITIAL_PROFILE);
                setCurrentStep(1);
                setIsCompleted(false);
                setIsStarted(false);
              }}
              className="p-1 hover:text-white transition-colors"
              title="Close to Home"
            >
              <div className="w-3.5 h-3.5 rounded-full border-2 border-white/80" />
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="p-1 hover:text-white transition-colors"
              title="Recent Apps"
            >
              <div className="w-3.5 h-3.5 rounded-xs border-2 border-white/80" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100/50 via-[#FAF7F2] to-amber-50/60 font-sans flex flex-col items-center justify-start p-2 sm:p-6 relative selection:bg-primary-100 selection:text-primary-900">
      {/* Decorative Warm Ambient Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[550px] h-[550px] bg-primary-200/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[550px] h-[550px] bg-orange-300/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Utility Bar */}
      <header className="w-full max-w-[390px] mb-2 flex items-center justify-between px-2 sm:px-1 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-primary-500/20">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest font-black text-primary-600 block leading-none">
              PANORAMA JTB
            </span>
            <span className="text-xs font-bold text-gray-800 leading-tight">
              Tour Leader Profiling
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={loadSampleData}
            className="text-[11px] font-semibold bg-orange-100/80 hover:bg-orange-200 text-primary-800 px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1 active:scale-95"
            title="Isi form secara otomatis dengan contoh data profiling"
          >
            <Zap className="w-3 h-3 text-primary-600 fill-primary-600" />
            <span className="inline">Isi Contoh</span>
          </button>

          <div
            className="text-[11px] font-semibold bg-white text-gray-700 border border-gray-200 px-2.5 py-1.5 rounded-xl flex items-center gap-1 shadow-2xs"
            title="Ukuran layar Smartphone (390px)"
          >
            <Smartphone className="w-3 h-3 text-primary-600" />
            <span className="hidden xs:inline">Mobile</span>
          </div>
        </div>
      </header>

      {/* Main Mobile Shell Container (Locked to exact phone dimensions) */}
      <div className="w-full max-w-[390px] h-[844px] max-h-[92vh] sm:rounded-[3rem] sm:border-[8px] sm:border-gray-900 sm:shadow-2xl sm:shadow-orange-950/20 my-1 sm:my-2 flex flex-col justify-between overflow-hidden relative border border-gray-100 bg-white backdrop-blur-md animate-fade-in">
        {/* Realistic Mobile Status Bar matching screenshot */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1 text-gray-800 select-none z-50 bg-white">
          <span className="text-xs font-bold tracking-tight">9:46</span>
          
          {/* Front Camera Punch-hole */}
          <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center -ml-1">
            <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
          </div>

          <div className="flex items-center gap-1.5 text-gray-800">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* View Switch: Welcome Screen vs Questionnaire Flow */}
        {!isStarted ? (
          <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
            <WelcomePage
              onStart={() => {
                setIsStarted(true);
                setCurrentStep(1);
              }}
              onBack={() => {
                // Friendly indication
              }}
            />

            {/* Bottom Android Navigation Bar (matching reference image) */}
            <div className="bg-black text-white/70 py-2 px-12 flex items-center justify-between select-none">
              <button
                type="button"
                onClick={() => {}}
                className="p-1 hover:text-white transition-colors"
                title="Back"
              >
                <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[10px] border-r-white/80" />
              </button>
              <button
                type="button"
                onClick={() => setIsStarted(false)}
                className="p-1 hover:text-white transition-colors"
                title="Home"
              >
                <div className="w-3.5 h-3.5 rounded-full border-2 border-white/80" />
              </button>
              <button
                type="button"
                onClick={() => {}}
                className="p-1 hover:text-white transition-colors"
                title="Recent Apps"
              >
                <div className="w-3.5 h-3.5 rounded-xs border-2 border-white/80" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden relative">
            {/* Top Navigation Header for Questionnaire */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100/80">
              <div className="px-4 py-2.5 flex items-center justify-between relative">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-9 h-9 rounded-full bg-orange-100/90 hover:bg-orange-200 active:scale-95 flex items-center justify-center text-primary-600 transition-all shadow-xs z-10"
                  title="Kembali"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>

                <div className="absolute inset-x-0 text-center pointer-events-none flex flex-col items-center justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 leading-tight">
                    PANORAMA JTB
                  </span>
                  <span className="text-xs sm:text-sm font-black text-gray-900 tracking-tight leading-tight">
                    Tour Leader Profiling
                  </span>
                </div>

                {/* Right spacer for balanced title centering */}
                <div className="w-9 h-9" />
              </div>
            </div>

            {/* Validation Warning Banner if any */}
            {validationError && (
              <div className="mx-4 mt-2 p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 animate-fade-in z-20">
                <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                <p className="text-xs font-semibold text-red-700 flex-1">{validationError}</p>
              </div>
            )}

            {/* Scrollable Form Content Area with custom scrollbar */}
            <main
              id="step-scroll-area"
              className="flex-1 min-h-0 px-4 sm:px-5 py-4 pb-28 overflow-y-auto custom-scrollbar scroll-smooth"
            >
              {currentStep === 1 && <Step1 data={formData} updateData={updateData} />}
              {currentStep === 2 && <Step2 data={formData} updateData={updateData} />}
              {currentStep === 3 && <StepVisa data={formData} updateData={updateData} />}
              {currentStep === 4 && <Step3 data={formData} updateData={updateData} />}
              {currentStep === 5 && <Step4 data={formData} updateData={updateData} />}

              {/* Footnote & Guarantee */}
              <div className="mt-8 pt-5 border-t border-orange-200/50 text-[11px] text-gray-400 space-y-1 text-center">
                <p className="font-medium text-gray-600">
                  Data diri tersinkronisasi dari Akun Profil Anda.
                </p>
                <p className="opacity-75 text-[10px]">
                  Data kuesioner ini aman dan khusus untuk penugasan trip Tour Leader.
                </p>
              </div>
            </main>

            {/* Fixed Bottom Navigation Floating Dock */}
            <div className="w-full bg-white/95 backdrop-blur-md p-3 sm:p-3.5 z-40 border-t border-orange-100 shadow-md">
              <div className="flex gap-2.5 items-center">
                <Button
                  variant="secondary"
                  onClick={handleBack}
                  className="w-12 h-11 flex items-center justify-center !px-0 rounded-2xl"
                  title="Kembali"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </Button>

                <Button
                  fullWidth
                  className="flex-1 h-11 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/25"
                  onClick={handleNext}
                >
                  <span className="font-bold text-sm">
                    {currentStep === totalSteps ? 'Simpan & Terbitkan Profil' : 'Lanjutkan'}
                  </span>
                  {currentStep !== totalSteps && <ChevronRight className="w-4 h-4 opacity-90" />}
                </Button>
              </div>
            </div>

            {/* Bottom Android Navigation Bar (matching Welcome and Completed) */}
            <div className="bg-black text-white/70 py-2 px-12 flex items-center justify-between select-none">
              <button
                type="button"
                onClick={handleBack}
                className="p-1 hover:text-white transition-colors"
                title="Back"
              >
                <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[10px] border-r-white/80" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData(INITIAL_PROFILE);
                  setCurrentStep(1);
                  setIsStarted(false);
                }}
                className="p-1 hover:text-white transition-colors"
                title="Home"
              >
                <div className="w-3.5 h-3.5 rounded-full border-2 border-white/80" />
              </button>
              <button
                type="button"
                onClick={() => {}}
                className="p-1 hover:text-white transition-colors"
                title="Recent Apps"
              >
                <div className="w-3.5 h-3.5 rounded-xs border-2 border-white/80" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
