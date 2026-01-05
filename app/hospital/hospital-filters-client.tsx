//hospital/hospital-filters-client.tsx

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { HospitalFilters } from "./hospital-filters";

export function HospitalFiltersClient({
  states,
  departments,
}: {
  states: string[];
  departments: string[];
}) {
  const router = useRouter();
  const params = useSearchParams();

  function updateParam(key: string, value?: string) {
    const sp = new URLSearchParams(params.toString());
    if (!value) sp.delete(key);
    else sp.set(key, value);

    router.push(`?${sp.toString()}`, { scroll: false });
  }

  function clearFilters() {
    router.push("/hospital", { scroll: false });
  }

  return (
    <HospitalFilters
      states={states}
      departments={departments}
      values={{
        q: params.get("q") ?? "",
        state: params.get("state") ?? "",
        department: params.get("department") ?? "",
        distance: params.get("distance") ?? "",
        lat: params.get("lat") ?? undefined,
        lng: params.get("lng") ?? undefined,
      }}
      onUpdate={updateParam}
      onClear={clearFilters}
    />
  );
}
