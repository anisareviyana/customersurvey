import React, { useState } from 'react';
import { INITIAL_DATA, SurveyData } from './types';
import { Step1 } from './components/steps/Step1';
import { Step2 } from './components/steps/Step2';
import { Step3 } from './components/steps/Step3';
import { Step4 } from './components/steps/Step4';
import { Step5 } from './components/steps/Step5';
import { Step6 } from './components/steps/Step6';
import { Step7 } from './components/steps/Step7';
import { Button } from './components/ui/Button';
import { ChevronLeft, ChevronRight, Check, MapPin } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SurveyData>(INITIAL_DATA);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalSteps = 7;

  const updateData = (fields: Partial<SurveyData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        // Step 1: Informasi Dasar
        const companionsValid = formData.companions === 'Lainnya' 
            ? !!formData.companions_other 
            : !!formData.companions;
        return companionsValid && !!formData.tourFrequency;
      
      case 2:
        // Step 2: Perjalanan Anda (Previously Step 4)
        return !!formData.trip_attractions && !!formData.trip_hotel_loc && !!formData.trip_breakfast &&
               !!formData.trip_food && !!formData.trip_transport && !!formData.trip_expectations;
      
      case 3:
        // Step 3: Layanan Tour Leader (Previously Step 2)
        return !!formData.tl_schedule && !!formData.tl_helpful && !!formData.tl_informative && 
               !!formData.tl_atmosphere && !!formData.tl_polite && !!formData.tl_expectations;
      
      case 4:
        // Step 4: Layanan Lokal Guide (Previously Step 3)
        if (formData.hasLocalGuide === 'Tidak') return true;
        if (formData.hasLocalGuide === 'Ya') {
            return !!formData.lg_schedule && !!formData.lg_helpful && !!formData.lg_informative &&
                   !!formData.lg_atmosphere && !!formData.lg_polite && !!formData.lg_expectations;
        }
        return false;
      
      case 5:
        // Step 5: Sumber Info
        const knowledgeValid = formData.source_knowledge === 'Lainnya' 
            ? !!formData.source_knowledge_other 
            : !!formData.source_knowledge;
        const contactValid = formData.source_contact === 'Lainnya'
            ? !!formData.source_contact_other
            : !!formData.source_contact;
        return knowledgeValid && contactValid;
      
      case 6:
        // Step 6: Minat & Rekomendasi
        const destValid = formData.dream_destination === 'Lainnya'
            ? !!formData.dream_destination_other
            : !!formData.dream_destination;
        return destValid && formData.nps_score !== null && !!formData.social_share;
      
      case 7:
        // Step 7: Story
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
      } else {
        handleSubmit();
      }
    } else {
      alert("Mohon lengkapi semua pertanyaan bertanda * sebelum melanjutkan.");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    console.log('Survey Submitted:', formData);
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-orange-100/50 text-center animate-fade-in border border-white">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-slide-up">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                    <Check className="w-8 h-8 text-white" strokeWidth={3} />
                </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Terima Kasih!</h2>
            <p className="text-gray-500 mb-10 leading-relaxed">Masukan Anda sangat berarti bagi kami untuk meningkatkan pelayanan Panorama JTB.</p>
            <Button fullWidth onClick={() => window.location.reload()}>
                Kembali ke Beranda
            </Button>
        </div>
      </div>
    )
  }

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50/30 to-white font-sans flex justify-center">
      {/* Decorative Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-200/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative flex flex-col min-h-screen bg-white/50 shadow-2xl shadow-gray-200/40 sm:my-8 sm:min-h-[calc(100vh-4rem)] sm:rounded-[2.5rem] overflow-hidden border border-white/60 backdrop-blur-sm">
        
        {/* Header / Top Bar */}
        <div className="sticky top-0 z-50 glass-effect border-b border-white/20">
          <div className="px-6 py-5 flex items-center justify-between">
             <div>
                <h1 className="text-lg font-extrabold text-primary-600 tracking-tight flex items-center gap-2">
                    <MapPin className="w-5 h-5" /> PANORAMA JTB
                </h1>
             </div>
             <div className="flex items-center gap-3">
                 <div className="text-[10px] font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    Step {currentStep} of {totalSteps}
                 </div>
             </div>
          </div>
          {/* Custom Progress Bar */}
          <div className="h-1.5 w-full bg-gray-100/50">
            <div 
                className="h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500 ease-out rounded-r-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 px-6 py-8 pb-32 overflow-y-auto no-scrollbar scroll-smooth">
            {currentStep === 1 && <Step1 data={formData} updateData={updateData} />}
            {currentStep === 2 && <Step2 data={formData} updateData={updateData} />}
            {currentStep === 3 && <Step3 data={formData} updateData={updateData} />}
            {currentStep === 4 && <Step4 data={formData} updateData={updateData} />}
            {currentStep === 5 && <Step5 data={formData} updateData={updateData} />}
            {currentStep === 6 && <Step6 data={formData} updateData={updateData} />}
            {currentStep === 7 && <Step7 data={formData} updateData={updateData} />}

            {/* Global Note */}
            <div className="mt-10 pt-8 border-t border-gray-200/60 text-xs text-gray-400 space-y-2 text-center">
                <p className="flex items-center justify-center gap-1.5 font-medium">
                    <span className="text-primary-500 text-sm bg-primary-50 w-5 h-5 flex items-center justify-center rounded-full">*</span> 
                    Wajib diisi (Mandatory)
                </p>
                <p className="opacity-70">
                    Informasi/feedback yang Anda berikan akan kami jaga kerahasiaannya
                </p>
            </div>
        </main>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 w-full bg-gradient-to-t from-white via-white to-white/0 p-6 pb-8 z-40">
            <div className="flex gap-4">
                {currentStep > 1 && (
                    <Button 
                        variant="secondary" 
                        onClick={handleBack}
                        className="w-14 flex items-center justify-center !px-0 rounded-2xl"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </Button>
                )}
                <Button 
                    fullWidth
                    className="flex-1 flex items-center justify-center gap-2 shadow-xl shadow-primary-500/20"
                    onClick={handleNext}
                >
                    {currentStep === totalSteps ? 'Submit Survey' : 'Selanjutnya'}
                    {currentStep !== totalSteps && <ChevronRight className="w-5 h-5 opacity-80" />}
                </Button>
            </div>
        </div>

      </div>
    </div>
  );
}

export default App;