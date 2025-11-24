export interface SurveyData {
  // Step 1: Informasi Dasar
  companions: string;
  companions_other?: string;
  tourFrequency: string;

  // Step 2: Tour Leader
  tl_schedule: number;
  tl_helpful: number;
  tl_informative: number;
  tl_atmosphere: number;
  tl_polite: number;
  tl_expectations: string;

  // Step 3: Local Guide
  hasLocalGuide: 'Ya' | 'Tidak' | null;
  lg_schedule?: number;
  lg_helpful?: number;
  lg_informative?: number;
  lg_atmosphere?: number;
  lg_polite?: number;
  lg_expectations?: string;

  // Step 4: Perjalanan
  trip_attractions: number;
  trip_hotel_loc: number;
  trip_breakfast: number;
  trip_food: number;
  trip_transport: number;
  trip_expectations: string;

  // Step 5: Sumber Info
  source_knowledge: string;
  source_knowledge_other?: string;
  source_contact: string;
  source_contact_other?: string;

  // Step 6: Minat & Rekomendasi
  dream_destination: string;
  dream_destination_other?: string;
  nps_score: number | null;
  social_share: 'Ya' | 'Tidak' | null;
  instagram_handle: string;
  experience_story: string;
}

export const INITIAL_DATA: SurveyData = {
  companions: '',
  companions_other: '',
  tourFrequency: '',
  tl_schedule: 0,
  tl_helpful: 0,
  tl_informative: 0,
  tl_atmosphere: 0,
  tl_polite: 0,
  tl_expectations: '',
  hasLocalGuide: null,
  lg_expectations: '',
  trip_attractions: 0,
  trip_hotel_loc: 0,
  trip_breakfast: 0,
  trip_food: 0,
  trip_transport: 0,
  trip_expectations: '',
  source_knowledge: '',
  source_contact: '',
  dream_destination: '',
  nps_score: null,
  social_share: null,
  instagram_handle: '',
  experience_story: ''
};