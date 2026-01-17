// app/lib/data/doctors.ts

// app/lib/data/doctors.ts
import "server-only";
import { createClient } from "@/app/lib/supabase/server";
import { getUserSubscription } from "@/app/lib/subscription/get-user-subscription";
import type { Doctor, DoctorFilters } from "@/app/lib/types/doctors";

export type DoctorResult = {
  visible: Doctor[];
  hasMore: boolean;
  canViewContact: boolean;
};

const FREE_DOCTOR_LIMIT = 10;

export async function getDoctors(
  userId?: string,
  filters?: DoctorFilters
): Promise<DoctorResult> {
  const supabase = await createClient();

  let doctorLimit = FREE_DOCTOR_LIMIT;
  let canViewContact = false;
  let isPremium = false;

  if (userId) {
    const subscription = await getUserSubscription(userId);
    if (subscription) {
      isPremium = true;
      doctorLimit = subscription.hospitalLimit ?? 1000; // reuse existing plan
      canViewContact = subscription.allowContactAccess;
    }
  }

  const { data, error } = await supabase.rpc("filter_doctors", {
    p_q: filters?.q ?? null,
    p_country: filters?.country ?? null,
    p_state: filters?.state ?? null, // ✅ TEXT
    p_district: filters?.district ?? null,
    p_specialization: filters?.specialization ?? null,
    p_limit: doctorLimit + 1, // 👈 fetch 1 extra
  });

  if (error) {
    console.error("filter_doctors error:", error);
    throw new Error("Failed to fetch doctors");
  }

  const doctors = (data ?? []) as Doctor[];

  if (isPremium) {
    return {
      visible: doctors,
      hasMore: false,
      canViewContact: true,
    };
  }

  return {
    visible: doctors.slice(0, doctorLimit),
    hasMore: doctors.length > doctorLimit,
    canViewContact: false,
  };
}
