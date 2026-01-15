// app/lib/data/hospitals.ts
import "server-only";
import { createClient } from "@/app/lib/supabase/server";
import { getUserSubscription } from "@/app/lib/subscription/get-user-subscription";
import { Hospital } from "@/app/lib/types/hospital";

export type HospitalResult = {
  visible: Hospital[];
  hasMore: boolean; // 👈 NEW
  canViewContact: boolean;
};

//  Query params coming from URL
type HospitalQuery = {
  q?: string;
  state?: string;
  department?: string;
  distance?: string;
  lat?: string;
  lng?: string;
};

export async function getHospitalsForUser(
  userId?: string,
  filters?: HospitalQuery
): Promise<HospitalResult> {
  const supabase = await createClient();

  //  Subscription logic
  const FREE_LIMIT = 10;
  let hospitalLimit = FREE_LIMIT;
  let canViewContact = false;
  let isPremium = false;

  if (userId) {
    const subscription = await getUserSubscription(userId);
    if (subscription) {
      isPremium = true;
      hospitalLimit = subscription.hospitalLimit ?? 1000;
      canViewContact = subscription.allowContactAccess;
    }
  }

  // Parse filters
  const statesArray = filters?.state
    ? filters.state
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : null;
  const departmentsArray = filters?.department
    ? filters.department
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean)
    : null;

  const distanceKm = filters?.distance ? Number(filters.distance) : null;
  const lat = filters?.lat ? Number(filters.lat) : null;
  const lng = filters?.lng ? Number(filters.lng) : null;

  //  RPC call
  const { data, error } = await supabase.rpc("filter_hospitals", {
    p_lat: lat,
    p_lng: lng,
    p_distance_km: distanceKm,
    p_q: filters?.q || null,
    p_states: statesArray?.length ? statesArray : null,
    p_departments: departmentsArray?.length ? departmentsArray : null,
  });

  if (error || !data) {
    console.error("filter_hospitals RPC error:", error);
    return { visible: [], hasMore: false, canViewContact };
  }

  /* ---------------------------------------------
     PREMIUM USERS → everything
  --------------------------------------------- */
  if (isPremium) {
    return { visible: data, hasMore: false, canViewContact: true };
  }

  /* ---------------------------------------------
     FREE USERS → HARD BLOCK
  --------------------------------------------- */
  return {
    visible: data.slice(0, hospitalLimit),
    hasMore: data.length > hospitalLimit, // 👈 only a boolean
    canViewContact: false,
  };
}
