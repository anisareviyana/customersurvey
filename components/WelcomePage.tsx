import React from 'react';
import { ChevronLeft, Compass, Sparkles, ArrowRight } from 'lucide-react';

interface WelcomePageProps {
  onStart: () => void;
  onBack?: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onStart, onBack }) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden bg-white animate-fade-in select-none">
      {/* Scrollable Screen Content */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-5 sm:p-6 flex flex-col justify-between">
        {/* Top Header Bar */}
        <div>
        <div className="flex items-center justify-between relative py-2 mb-4">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-orange-100/90 hover:bg-orange-200 active:scale-95 flex items-center justify-center text-primary-600 transition-all shadow-xs z-10"
            title="Kembali"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <div className="absolute inset-x-0 text-center pointer-events-none flex flex-col items-center justify-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary-600 leading-tight">
              PANORAMA JTB
            </span>
            <span className="text-sm sm:text-base font-black text-gray-900 tracking-tight leading-tight">
              Tour Leader Profiling
            </span>
          </div>
          <div className="w-10 h-10" />
        </div>

        {/* Highlight Peach / Warm Card */}
        <div className="bg-[#FFF6EF] border border-orange-200/70 rounded-2xl p-4 sm:p-5 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight mb-1.5">
            Tour Leader Profiling
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            We collect your competencies and tour experience to ensure optimal tour assignments.
          </p>
        </div>
      </div>

      {/* Center Illustration matching design reference */}
      <div className="my-auto py-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-[280px] sm:max-w-[310px] aspect-[1/1] relative flex items-center justify-center">
          <svg
            viewBox="0 0 320 320"
            className="w-full h-full drop-shadow-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ground Shadow */}
            <ellipse cx="155" cy="272" rx="115" ry="10" fill="#F1F5F9" />
            <ellipse cx="145" cy="272" rx="75" ry="6" fill="#FED7AA" fillOpacity="0.4" />

            {/* Clipboard Shadow */}
            <rect x="73" y="98" width="118" height="154" rx="14" fill="#E2E8F0" fillOpacity="0.5" />

            {/* Clipboard Body */}
            <rect
              x="70"
              y="95"
              width="118"
              height="150"
              rx="12"
              fill="#FFFFFF"
              stroke="#EA580C"
              strokeWidth="4"
            />

            {/* Clipboard Top Clip */}
            <path
              d="M98 94C98 87.3726 103.373 82 110 82H148C154.627 82 160 87.3726 160 94V97H98V94Z"
              fill="#1E293B"
            />
            <rect x="114" y="78" width="30" height="7" rx="3.5" fill="#334155" />
            <circle cx="129" cy="88" r="3.5" fill="#94A3B8" />

            {/* Speedometer / Gauge Section */}
            <g transform="translate(100, 114)">
              {/* Gauge Arc Track */}
              <path
                d="M 12 28 A 18 18 0 0 1 46 28"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Colored Gauge Arc Segments */}
              <path
                d="M 12 28 A 18 18 0 0 1 20 14"
                fill="none"
                stroke="#F97316"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M 22 13 A 18 18 0 0 1 36 13"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="7"
              />
              <path
                d="M 38 14 A 18 18 0 0 1 46 28"
                fill="none"
                stroke="#10B981"
                strokeWidth="7"
                strokeLinecap="round"
              />

              {/* Gauge needle center & pointer */}
              <circle cx="29" cy="27" r="3.5" fill="#0F172A" />
              <path d="M29 27L25 15" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

              {/* Mini Emoji faces around meter */}
              {/* Left Face (Sad/Neutral) */}
              <circle cx="15" cy="22" r="2.2" fill="#94A3B8" />
              {/* Center Face (Smile) */}
              <circle cx="29" cy="9" r="2.2" fill="#F59E0B" />
              {/* Right Face (Happy) */}
              <circle cx="43" cy="22" r="2.2" fill="#10B981" />
            </g>

            {/* Checklist Item 1 */}
            <g transform="translate(86, 150)">
              {/* Circle check */}
              <circle cx="9" cy="9" r="9" fill="#FFF7ED" stroke="#F97316" strokeWidth="2" />
              <path
                d="M6 9.5L8.5 12L13 6.5"
                stroke="#EA580C"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Text lines */}
              <rect x="25" y="4" width="36" height="4" rx="2" fill="#CBD5E1" />
              <rect x="25" y="11" width="22" height="3.5" rx="1.75" fill="#E2E8F0" />
            </g>

            {/* Checklist Item 2 */}
            <g transform="translate(86, 178)">
              {/* Circle check */}
              <circle cx="9" cy="9" r="9" fill="#FFF7ED" stroke="#F97316" strokeWidth="2" />
              <path
                d="M6 9.5L8.5 12L13 6.5"
                stroke="#EA580C"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Text lines */}
              <rect x="25" y="4" width="42" height="4" rx="2" fill="#CBD5E1" />
              <rect x="25" y="11" width="30" height="3.5" rx="1.75" fill="#E2E8F0" />
            </g>

            {/* Checklist Item 3 */}
            <g transform="translate(86, 206)">
              {/* Circle check */}
              <circle cx="9" cy="9" r="9" fill="#FFF7ED" stroke="#F97316" strokeWidth="2" />
              <path
                d="M6 9.5L8.5 12L13 6.5"
                stroke="#EA580C"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Text lines */}
              <rect x="25" y="6" width="38" height="4" rx="2" fill="#CBD5E1" />
              <rect x="25" y="13" width="18" height="3.5" rx="1.75" fill="#E2E8F0" />
            </g>

            {/* Character: Tour Leader Standing */}
            <g transform="translate(162, 88)">
              {/* Head / Hair / Face */}
              {/* Neck */}
              <rect x="47" y="32" width="7" height="9" fill="#FDBA74" />
              {/* Face */}
              <path
                d="M44 20C44 26 47 31 52 31C56 31 59 26 59 20C59 15 55 14 51 14C46 14 44 16 44 20Z"
                fill="#FED7AA"
              />
              {/* Hair */}
              <path
                d="M42 18C41 12 45 7 51 7C57 7 61 10 61 16C61 19 59 20 58 19C57 16 54 13 49 13C45 13 43 15 42 18Z"
                fill="#1E293B"
              />
              {/* Ear */}
              <circle cx="43.5" cy="22" r="2.5" fill="#FDBA74" />

              {/* White Shirt Collar */}
              <path d="M47 38L51 44L55 38Z" fill="#FFFFFF" />

              {/* Dark Navy Jacket / Upper Body */}
              <path
                d="M37 42C37 39 42 38 51 38C60 38 65 39 65 42L67 86H35L37 42Z"
                fill="#1E293B"
              />

              {/* Left Arm Pointing to Clipboard */}
              {/* Upper arm */}
              <path
                d="M38 43L16 60C14 62 13 65 15 67L19 71C21 73 24 73 26 70L42 52"
                fill="#1E293B"
              />
              {/* Left Hand Pointing */}
              <path
                d="M14 62L2 65C-1 66 -0.5 70 3 71L14 71"
                fill="#FED7AA"
              />
              {/* Pointer finger */}
              <path d="M7 66L-1 67" stroke="#FED7AA" strokeWidth="3" strokeLinecap="round" />

              {/* Right Arm hanging straight down */}
              <path
                d="M63 44L68 68C69 72 70 76 68 80L66 84L60 84L60 76L59 48"
                fill="#1E293B"
              />
              {/* Right Hand */}
              <path
                d="M62 84C62 88 64 91 66 91C68 91 69 88 69 84Z"
                fill="#FED7AA"
              />

              {/* Dark Belt */}
              <rect x="37" y="85" width="28" height="5" fill="#0F172A" />
              <rect x="48" y="85.5" width="6" height="4" fill="#F59E0B" />

              {/* Orange Trousers */}
              {/* Pelvis to legs */}
              <path
                d="M37 90H65L68 140C68 144 64 147 60 147H55L52 108L48 147H43C39 147 35 144 35 140L37 90Z"
                fill="#EA580C"
              />
              {/* Trousers Center Crease */}
              <line x1="43" y1="96" x2="43" y2="142" stroke="#C2410C" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="60" y1="96" x2="60" y2="142" stroke="#C2410C" strokeWidth="1.5" strokeOpacity="0.5" />

              {/* Dark Smart Shoes */}
              {/* Left shoe */}
              <path
                d="M33 147H45C45 152 42 155 38 155H31C28 155 28 150 31 148L33 147Z"
                fill="#0F172A"
              />
              {/* Right shoe */}
              <path
                d="M57 147H69L71 148C74 150 74 155 71 155H64C60 155 57 152 57 147Z"
                fill="#0F172A"
              />
            </g>
          </svg>
        </div>

        {/* Supporting Text below illustration */}
        <p className="text-center text-xs sm:text-sm text-gray-600 font-medium px-4 max-w-xs mt-2 leading-relaxed">
          Complete your profile to get matched with the right tours.
        </p>
      </div>
      </div>

      {/* Pinned Bottom Start Button matching design */}
      <div className="p-4 sm:p-5 bg-white border-t border-orange-100/60 shadow-xs z-10">
        <button
          type="button"
          onClick={onStart}
          className="w-full bg-[#0B0F19] hover:bg-gray-900 active:scale-[0.98] text-white py-3.5 sm:py-4 px-6 rounded-full font-bold text-sm sm:text-base flex items-center justify-center relative shadow-xl shadow-gray-950/20 transition-all group"
        >
          {/* Subtle Decorative Star Icon on Left (as in screenshot) */}
          <div className="absolute left-3.5 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <span className="tracking-wide">Start Profiling</span>

          <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
};
