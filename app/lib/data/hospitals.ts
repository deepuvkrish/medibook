import "server-only";

import { createClient } from "@/app/lib/supabase/server";
import { getUserSubscription } from "@/app/lib/subscription/get-user-subscription";

type HospitalQuery = {
  q?: string;
  state?: string;
  district?: string;
  department?: string;
};

export async function getHospitalsForUser(
  userId?: string,
  filters?: HospitalQuery
) {
  const supabase = await createClient();
  // 🔐 Subscription logic
  let hospitalLimit = 10;
  let canViewContact = false;
  const limit = hospitalLimit ?? 10;

  const fetchLimit = hospitalLimit + 6; // show blurred preview

  let query = supabase
    .from("medi_hospitals")
    .select(
      `
      id,
      name,
      address,
      state,
      district,
      locality,
      departments,
      services,
      contact_no,
      contact_mail,
      image_url,
      weblink,
      googlemaplink,
      created_at
    `
    )
    .order("created_at", { ascending: true })
    .limit(fetchLimit);

  // 🔎 Search
  if (filters?.q) {
    const q = `%${filters.q}%`;
    query = query.or(
      `name.ilike.${q},locality.ilike.${q},district.ilike.${q},state.ilike.${q}`
    );
  }

  // 🎛 Filters
  if (filters?.state) {
    query = query.eq("state", filters.state);
  }

  if (filters?.district) {
    query = query.eq("district", filters.district);
  }

  if (filters?.department) {
    query = query.filter("departments", "cs", `{${filters.department}}`);
  }

  const { data: hospitals, error } = await query;

  console.log("HOSPITALS:", hospitals, error);

  if (error || !hospitals) {
    return { visible: [], blurred: [], canViewContact: false };
  }

  if (userId) {
    const subscription = await getUserSubscription(userId);
    if (subscription) {
      hospitalLimit = subscription.hospitalLimit ?? 1000; // premium = more
      canViewContact = subscription.allowContactAccess;
    }
  }

  return {
    visible: hospitals.slice(0, hospitalLimit),
    blurred: hospitals.slice(hospitalLimit),
    canViewContact,
  };
}
