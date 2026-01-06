// app/lib/data/hospitals.ts
import "server-only";
import { createClient } from "@/app/lib/supabase/server";
import { getUserSubscription } from "@/app/lib/subscription/get-user-subscription";
import { Hospital } from "@/app/lib/types/hospital";

export type HospitalResult = {
  visible: Hospital[];
  blurred: Hospital[];
  canViewContact: boolean;
};

type HospitalQuery = {
  q?: string;
  state?: string;
  department?: string;
  distance?: string; // dropdown value
  lat?: string;
  lng?: string;
};

export async function getHospitalsForUser(
  userId?: string,
  filters?: HospitalQuery
): Promise<HospitalResult> {
  const supabase = await createClient();

  let hospitalLimit = 10;
  let canViewContact = false;

  if (userId) {
    const subscription = await getUserSubscription(userId);
    if (subscription) {
      hospitalLimit = subscription.hospitalLimit ?? 1000;
      canViewContact = subscription.allowContactAccess;
    }
  }

  /* -------------------------
     Compute min/max distance (km)
  ------------------------- */
  let distance_min: number | null = null;
  let distance_max: number | null = null;

  if (filters?.distance) {
    switch (filters.distance) {
      case "5":
        distance_min = 0;
        distance_max = 5;
        break;
      case "10":
        distance_min = 5;
        distance_max = 10;
        break;
      case "25":
        distance_min = 11;
        distance_max = 25;
        break;
      case "40+":
        distance_min = 40;
        distance_max = 1000; // large upper bound
        break;
      default:
        distance_min = null;
        distance_max = null;
    }
  }

  /* -------------------------
     RPC call to filter_hospitals
  ------------------------- */

  const { data, error } = await supabase.rpc("filter_hospitals", {
    p_lat: filters?.lat ? Number(filters.lat) : null,
    p_lng: filters?.lng ? Number(filters.lng) : null,
    p_distance_km: filters?.distance ? Number(filters.distance) : null,
    p_q: filters?.q || null,
    p_state: filters?.state || null,
    p_department: filters?.department || null,
  });

  if (error || !data) {
    console.error(error);
    return { visible: [], blurred: [], canViewContact };
  }

  return {
    visible: data.slice(0, hospitalLimit),
    blurred: [],
    canViewContact,
  };
}
