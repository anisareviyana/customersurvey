export interface LanguageSkill {
  language: string;
  level: 'Dasar' | 'Menengah' | 'Fasih (Fluent)';
}

export type DocumentCategory =
  | 'Visa'
  | 'Sertifikat BNSP'
  | 'Paspor'
  | 'Sertifikat First Aid / CPR'
  | 'Dokumen Lainnya';

export interface DocumentAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  category: DocumentCategory;
  visaName?: string;
  fileData?: string;
  uploadedAt: string;
  note?: string;
}

export interface TourLeaderProfile {
  // Step 1: Informasi Diri & Identitas
  fullName: string;
  nickname: string;
  gender: 'Pria' | 'Wanita' | '';
  phone: string;
  email: string;
  city: string;
  cityOther?: string;
  uniformSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '';
  instagram: string;
  avatarUrl: string;

  // Step 2: Jam Terbang & Spesialisasi Destinasi
  yearsExperience: string;
  totalTripsCount: string;
  domesticDestinations: string[];
  internationalDestinations: string[];
  preferredGroupType: string[];

  // Step 3: Sertifikasi & Legalitas
  bnspStatus: string;
  bnspNumber?: string;
  passportStatus: string;
  passportExpiry?: string;
  activeVisas: string[];
  firstAidCertified: string;
  documents: DocumentAttachment[];

  // Step 4: Kemampuan Bahasa, Karakter & Keahlian
  languages: LanguageSkill[];
  guidingStyle: string;
  specialSkills: string[];
  personalBio: string;

  // Step 5: Ketersediaan & Komitmen
  availabilityStatus: string;
  assignmentScope: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  dataConsent: boolean;
}

export const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80'
];

export const INITIAL_PROFILE: TourLeaderProfile = {
  // Akun Pengguna Terhubung (dari menu profile yang sudah ada)
  fullName: 'Arif Wibisono, S.Par',
  nickname: 'Arif',
  gender: 'Pria',
  phone: '0812-8899-7721',
  email: 'arif.wibisono@panoramatours.id',
  city: 'Jabodetabek',
  cityOther: '',
  uniformSize: 'L',
  instagram: '@arif.adventure',
  avatarUrl: DEFAULT_AVATARS[1],

  // Step 1: Jam Terbang & Spesialisasi Destinasi
  yearsExperience: '',
  totalTripsCount: '',
  domesticDestinations: [],
  internationalDestinations: [],
  preferredGroupType: [],

  // Step 2: Sertifikasi & Legalitas
  bnspStatus: '',
  bnspNumber: '',
  passportStatus: '',
  passportExpiry: '',
  activeVisas: [],
  firstAidCertified: '',
  documents: [],

  // Step 3: Kemampuan Bahasa, Karakter & Keahlian
  languages: [
    { language: 'Bahasa Indonesia', level: 'Fasih (Fluent)' },
    { language: 'Bahasa Inggris', level: 'Menengah' }
  ],
  guidingStyle: '',
  specialSkills: [],
  personalBio: '',

  // Step 4: Kesiapan & Komitmen
  availabilityStatus: '',
  assignmentScope: '',
  emergencyContactName: '',
  emergencyContactRelation: '',
  emergencyContactPhone: '',
  dataConsent: false,
};

// Aliases for backward compatibility if needed
export type SurveyData = TourLeaderProfile;
export const INITIAL_DATA = INITIAL_PROFILE;
