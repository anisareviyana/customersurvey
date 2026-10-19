import React from 'react';
import { TourLeaderProfile } from '../../types';
import { ShieldCheck, Award, MapPin, Compass, QrCode, Globe, Sparkles } from 'lucide-react';

interface BadgeCardProps {
  profile: TourLeaderProfile;
  previewOnly?: boolean;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ profile, previewOnly = false }) => {
  const displayNickname = profile.nickname || profile.fullName.split(' ')[0] || 'Tour Leader';
  const displayFullName = profile.fullName || 'Nama Lengkap Tour Leader';
  const displayCity = profile.city === 'Lainnya' ? (profile.cityOther || 'Indonesia') : (profile.city || 'Indonesia');

  return (
    <div className="relative w-full max-w-sm mx-auto select-none">
      {/* Top Lanyard Slot Graphic */}
      <div className="flex justify-center -mb-2 relative z-20">
        <div className="w-12 h-3.5 bg-gray-300 rounded-full border border-gray-400/50 shadow-inner flex items-center justify-center">
          <div className="w-8 h-1.5 bg-gray-700/60 rounded-full" />
        </div>
      </div>

      {/* Main Card Container */}
      <div className="bg-gradient-to-b from-white via-orange-50/20 to-white rounded-3xl p-5 sm:p-6 shadow-xl shadow-orange-950/10 border-2 border-orange-100 relative overflow-hidden backdrop-blur-md">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-primary-400/20 to-orange-500/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b border-orange-100/80 pb-3.5 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary-500 to-amber-500 flex items-center justify-center shadow-md shadow-primary-500/30 text-white">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary-600">PANORAMA JTB</p>
              <h3 className="text-xs font-black text-gray-900 tracking-tight">TOUR LEADER BADGE</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded-full text-[10px] font-bold">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>VERIFIED</span>
          </div>
        </div>

        {/* Profile Avatar & Primary Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-primary-400 shadow-md shadow-primary-500/20 bg-orange-100 flex-shrink-0">
              <img
                src={profile.avatarUrl}
                alt={displayFullName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary-500 text-white p-1 rounded-full shadow-sm">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="inline-block bg-primary-100 text-primary-800 text-[10px] font-bold px-2 py-0.5 rounded-md mb-1 uppercase tracking-wider">
              {profile.yearsExperience || 'Experienced'} • {profile.totalTripsCount || 'Active Leader'}
            </div>
            <h4 className="text-base sm:text-lg font-black text-gray-900 leading-tight truncate">
              {displayNickname}
            </h4>
            <p className="text-xs text-gray-500 font-medium truncate">{displayFullName}</p>
            <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
              <MapPin className="w-3 h-3 text-primary-500 flex-shrink-0" />
              <span className="truncate">{displayCity}</span>
              {profile.uniformSize && (
                <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded ml-1">
                  Size {profile.uniformSize}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Highlight Tags */}
        <div className="space-y-2 mb-4 bg-orange-50/60 p-3 rounded-2xl border border-orange-100/80">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-500 font-medium">BNSP Status:</span>
            <span className="font-bold text-gray-800 text-right truncate max-w-[170px]">
              {profile.bnspStatus || 'Belum Tercatat'}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Gaya Memandu:</span>
            <span className="font-bold text-primary-700 text-right truncate max-w-[170px]">
              {profile.guidingStyle || 'Professional & Energetic'}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Bahasa:</span>
            <span className="font-bold text-gray-800 text-right truncate max-w-[170px]">
              {profile.languages && profile.languages.length > 0
                ? profile.languages.map(l => l.language).join(', ')
                : 'Bahasa Indonesia, English'}
            </span>
          </div>
        </div>

        {/* Domestic & International Destination Pills */}
        {(((profile.domesticDestinations?.length ?? 0) > 0) || ((profile.internationalDestinations?.length ?? 0) > 0)) && (
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Destinasi Dikuasai:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[...(profile.domesticDestinations || []), ...(profile.internationalDestinations || [])]
                .slice(0, 4)
                .map((dest, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold bg-white text-gray-700 border border-orange-200 px-2 py-0.5 rounded-lg shadow-2xs truncate max-w-[140px]"
                  >
                    {dest}
                  </span>
                ))}
              {[...(profile.domesticDestinations || []), ...(profile.internationalDestinations || [])].length > 4 && (
                <span className="text-[10px] font-bold bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded-lg">
                  +{[...(profile.domesticDestinations || []), ...(profile.internationalDestinations || [])].length - 4} lagi
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer with QR Code & ID */}
        <div className="pt-3 border-t border-dashed border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white rounded-lg border border-gray-200 shadow-2xs">
              <QrCode className="w-8 h-8 text-gray-800" />
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">LEADER ID</p>
              <p className="text-xs font-mono font-bold text-primary-700">TL-2026-{displayNickname.toUpperCase().slice(0, 3)}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-gray-400 block font-medium">STATUS KESIAPAN</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              {profile.availabilityStatus ? 'SIAP BERTUGAS' : 'PENDING REVIEW'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
