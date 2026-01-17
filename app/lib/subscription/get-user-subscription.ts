//app/lib/subsription.ts

import { createClient } from "@/app/lib/supabase/server";

export type UserSubscription = {
  planCode: string;
  hospitalLimit: number | null;
  allowContactAccess: boolean;
  isActive: boolean;
};

type SubscriptionRow = {
  status: string;
  ends_at: string;
  plan: {
    code: string;
    hospital_limit: number | null;
    allow_contact_access: boolean;
  } | null;
};

export async function getUserSubscription(
  userId: string,
): Promise<UserSubscription | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("medi_user_subscriptions")
    .select(
      `
      status,
      ends_at,
      plan:medi_subscription_plans (
        code,
        hospital_limit,
        allow_contact_access
      )
    `,
    )
    .eq("user_id", userId)
    .eq("status", "active")
    .gt("ends_at", new Date().toISOString())
    .limit(1)
    .maybeSingle<SubscriptionRow>();

  if (error || !data || !data.plan) return null;

  return {
    planCode: data.plan.code,
    hospitalLimit: data.plan.hospital_limit,
    allowContactAccess: data.plan.allow_contact_access,
    isActive: true,
  };
}
