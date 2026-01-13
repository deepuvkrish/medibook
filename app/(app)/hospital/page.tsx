//hospital/page.tsx

import { auth } from "@/auth";
import { getHospitalsForUser } from "@/app/lib/data/hospitals";
import { HospitalCard } from "./hospital-card";
import { HospitalSkeleton } from "./hospital-skeleton";
import { Suspense } from "react";

export default async function HospitalsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    state?: string;
    department?: string;
    distance?: string;
    lat?: string;
    lng?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const session = await auth();

  const { visible, blurred, canViewContact } = await getHospitalsForUser(
    session?.user?.id,
    resolvedSearchParams
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Hospitals</h1>

      <Suspense fallback={<HospitalSkeleton />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((h) => (
            <HospitalCard
              key={h.id}
              hospital={h}
              canViewContact={canViewContact}
              blurred={false}
            />
          ))}

          {blurred.map((h) => (
            <HospitalCard
              key={h.id}
              hospital={h}
              canViewContact={false}
              blurred
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
