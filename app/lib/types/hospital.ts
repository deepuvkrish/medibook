// lib/types/hospital.ts

export type Hospital = {
  id: string;
  name: string;
  address: string | null;
  state: string | null;
  district: string | null;
  locality: string | null;
  departments: string[] | null;
  services: string | null;
  workingdays: string | null;
  contact_no: string | null;
  contact_mail: string | null;
  image_url: string | null;
  weblink: string | null;
  googlemaplink: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  rating: number | null;
  verified: boolean;
  type: string | null;
};

export type HospitalQuery = {
  q?: string;
  state?: string;
  department?: string;
  distance?: string;
  lat?: string;
  lng?: string;
};
