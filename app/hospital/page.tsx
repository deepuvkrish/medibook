import { auth } from "@/auth";
import { getHospitalsForUser } from "@/app/lib/data/hospitals";
import { HospitalCard } from "@/app/hospital/hospital-card";
import { HospitalFilters } from "@/app/hospital/hospital-filters";
import { HospitalSkeleton } from "@/app/hospital/hospital-skeleton";
import { Suspense } from "react";

type SearchParams = {
  q?: string;
  state?: string;
  district?: string;
  department?: string;
};

export default async function HospitalsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();

  // ✅ UNWRAP searchParams
  const resolvedSearchParams = await searchParams;

  const { visible, blurred, canViewContact } = await getHospitalsForUser(
    session?.user?.id,
    resolvedSearchParams
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Hospitals</h1>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <HospitalSkeleton key={i} />
            ))}
          </div>
        }
      >
        <HospitalFilters />
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
