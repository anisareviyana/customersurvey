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
  // Informasi Diri, Domisili & Agama
  fullName: string;
  nickname: string;
  gender: 'Pria' | 'Wanita' | '';
  phone: string;
  email: string;
  city: string;
  cityOther?: string;
  domicile: string;
  domicileOther?: string;
  religion: string;
  uniformSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '';
  instagram: string;
  avatarUrl: string;

  // Step 1: Spesialisasi Destinasi & Tipe Wisatawan
  domesticDestinations: string[];
  internationalDestinations: string[];
  preferredGroupType: string[];

  // Step 2: Sertifikasi & Legalitas
  bnspStatus: string;
  bnspNumber?: string;
  passportStatus: string;
  passportExpiry?: string;
  activeVisas: string[];
  firstAidCertified: string;
  documents: DocumentAttachment[];

  // Step 3 (Questionnaire Step 4): Kemampuan Bahasa & Keahlian Khusus
  languages: LanguageSkill[];
  specialSkills: string[];
  personalBio: string;

  // Step 4 (Questionnaire Step 5): Kesiapan & Komitmen
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
  // Akun Pengguna Terhubung
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
  avatarUrl: DEFAULT_AVATARS[1],

  // Step 1: Spesialisasi Destinasi & Tipe Wisatawan
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

  // Step 3 (Questionnaire Step 4): Kemampuan Bahasa & Keahlian Khusus
  languages: [
    { language: 'Bahasa Indonesia', level: 'Fasih (Fluent)' },
    { language: 'Bahasa Inggris', level: 'Menengah' }
  ],
  specialSkills: [],
  personalBio: '',

  // Step 4 (Questionnaire Step 5): Kesiapan & Komitmen
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
