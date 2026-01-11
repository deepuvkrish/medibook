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

/* ---------------------------------------------
   Query params coming from URL
--------------------------------------------- */
type HospitalQuery = {
  q?: string;
  state?: string; // comma-separated
  department?: string; // comma-separated
  distance?: string;
  lat?: string;
  lng?: string;
};

export async function getHospitalsForUser(
  userId?: string,
  filters?: HospitalQuery
): Promise<HospitalResult> {
  const supabase = await createClient();

  /* ---------------------------------------------
     Subscription logic
  --------------------------------------------- */
  let hospitalLimit = 20;
  let canViewContact = false;

  if (userId) {
    const subscription = await getUserSubscription(userId);
    if (subscription) {
      hospitalLimit = subscription.hospitalLimit ?? 1000;
      canViewContact = subscription.allowContactAccess;
    }
  }

  /* ---------------------------------------------
     Parse multi-select filters (URL → ARRAY)
  --------------------------------------------- */
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

  /* ---------------------------------------------
     Distance (direct pass-through to RPC)
     RPC already handles NULL safely
  --------------------------------------------- */
  const distanceKm = filters?.distance ? Number(filters.distance) : null;

  const lat = filters?.lat ? Number(filters.lat) : null;

  const lng = filters?.lng ? Number(filters.lng) : null;

  /* ---------------------------------------------
     RPC: filter_hospitals
  --------------------------------------------- */
  const { data, error } = await supabase.rpc("filter_hospitals", {
    p_lat: lat,
    p_lng: lng,
    p_distance_km: distanceKm,
    p_q: filters?.q || null,
    p_states: statesArray && statesArray.length ? statesArray : null,
    p_departments:
      departmentsArray && departmentsArray.length ? departmentsArray : null,
  });

  if (error || !data) {
    console.error("filter_hospitals RPC error:", error);
    return {
      visible: [],
      blurred: [],
      canViewContact,
    };
  }

  /* ---------------------------------------------
     Apply subscription-based visibility
  --------------------------------------------- */
  return {
    visible: data.slice(0, hospitalLimit),
    blurred: [],
    canViewContact,
  };
}
