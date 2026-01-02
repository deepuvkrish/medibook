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

    router.push(`?${sp.toString()}`);
  }

  async function updateDistance(value?: string) {
    if (!value) {
      updateParam("distance");
      updateParam("lat");
      updateParam("lng");
      return;
    }

    if (!navigator.geolocation) {
      alert("GPS not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updateParam("distance", value);
        updateParam("lat", pos.coords.latitude.toString());
        updateParam("lng", pos.coords.longitude.toString());
      },
      () => alert("Location permission denied")
    );
  }

  function clearFilters() {
    router.push("/hospital");
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
      }}
      onUpdate={(key, value) => {
        if (key === "distance") updateDistance(value);
        else updateParam(key, value);
      }}
      onClear={clearFilters}
    />
  );
}
