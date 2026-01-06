// hospital/hospital-filters-client.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

  const [distance, setDistance] = useState(params.get("distance") ?? "");

  useEffect(() => {
    setDistance(params.get("distance") ?? "");
  }, [params]);

  function pushParams(updates: Record<string, string | undefined>) {
    const sp = new URLSearchParams(params.toString());

    Object.entries(updates).forEach(([k, v]) => {
      if (!v) sp.delete(k);
      else sp.set(k, v);
    });

    router.push(`?${sp.toString()}`, { scroll: false });
  }

  function handleUpdate(key: string, value?: string) {
    if (key !== "distance") {
      pushParams({ [key]: value });
      return;
    }

    if (!value) {
      setDistance("");
      pushParams({ distance: undefined, lat: undefined, lng: undefined });
      return;
    }

    setDistance(value);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        pushParams({
          distance: value,
          lat: pos.coords.latitude.toString(),
          lng: pos.coords.longitude.toString(),
        });
      },
      () => {
        setDistance("");
        alert("Location permission required for distance filter");
      },
      { enableHighAccuracy: true }
    );
  }

  function clearFilters() {
    setDistance("");
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
        distance,
      }}
      onUpdate={handleUpdate}
      onClear={clearFilters}
    />
  );
}
