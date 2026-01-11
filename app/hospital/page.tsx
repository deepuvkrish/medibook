//app/hospital/page.tsx

import { auth } from "@/auth";
import { getHospitalsForUser } from "@/app/lib/data/hospitals";
import { HospitalCard } from "@/app/hospital/hospital-card";
import { HospitalFiltersClient } from "@/app/hospital/hospital-filters-client";
import { HospitalSkeleton } from "@/app/hospital/hospital-skeleton";
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
  const resolvedSearchParams = await searchParams; // ✅ REQUIRED

  const session = await auth();

  const { visible, blurred, canViewContact } = await getHospitalsForUser(
    session?.user?.id,
    resolvedSearchParams
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Hospitals</h1>

      <Suspense fallback={<HospitalSkeleton />}>
        <HospitalFiltersClient
          states={["Kerala", "Tamil Nadu", "Karnataka", "Haryana"]}
          departments={["Cardiology", "Orthopedics", "Neurology"]}
        />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
    </div>
  );
}
