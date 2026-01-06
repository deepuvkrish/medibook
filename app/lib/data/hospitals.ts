//app/lib/data/hospitals.ts

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
  distance?: string;
  lat?: string;
  lng?: string;
  cursor?: string;
};

export async function getHospitalsForUser(
  userId?: string,
  filters?: HospitalQuery
): Promise<HospitalResult & { nextCursor?: string }> {
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

  const fetchLimit = hospitalLimit + 1;

  const { data, error } = await supabase.rpc("filter_hospitals", {
    p_q: filters?.q || null,
    p_state: filters?.state || null,
    p_department: filters?.department || null,
    p_lat: filters?.lat ? Number(filters.lat) : null,
    p_lng: filters?.lng ? Number(filters.lng) : null,
    p_distance:
      filters?.distance && filters.distance !== "40+"
        ? Number(filters.distance)
        : null,
    p_cursor: filters?.cursor || null,
  });

  if (error || !data) {
    console.error(error);
    return { visible: [], blurred: [], canViewContact };
  }

  const hasMore = data.length > hospitalLimit;
  const items = data.slice(0, hospitalLimit);

  return {
    visible: items,
    blurred: [],
    canViewContact,
    nextCursor: hasMore ? items[items.length - 1]?.created_at : undefined,
  };
}
