export type Doctor = {
  doctor_id: string;
  name: string;
  specialization: string | null;
  hospital_name: string | null;
  country: string | null;
  state: string | null;
  district: string | null;
  locality: string | null;
  experience: number | null;
  degree: string | null;
  doc_image: string | null;
  is_verified: boolean | null;
};

export type DoctorFilters = {
  q?: string;
  country?: string;
  state?: string;
  district?: string;
  specialization?: string;
  latitude?: string;
  longitude?: string;
};
