// lib/types/hospital.ts
export type Hospital = {
  id: string;
  name: string;
  address: string;
  state: string;
  district: string;
  locality: string;
  departments: string[];
  services: string[];
  workingdays: string;
  contact_no: string;
  contact_mail: string;
  image_url?: string;
  web_link?: string;
  googlemaplink?: string;
  created_at: string;
};
