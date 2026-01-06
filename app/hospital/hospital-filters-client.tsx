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

  // ✅ LOCAL STATE (critical)
  const [distance, setDistance] = useState(params.get("distance") ?? "");

  // 🔁 Sync when URL changes (back/forward / SSR)
  useEffect(() => {
    setDistance(params.get("distance") ?? "");
  }, [params]);

  function updateParam(key: string, value?: string) {
    const sp = new URLSearchParams(params.toString());
    if (!value) sp.delete(key);
    else sp.set(key, value);
    router.push(`?${sp.toString()}`, { scroll: false });
  }

  function handleUpdate(key: string, value?: string) {
    if (key !== "distance") {
      updateParam(key, value);
      return;
    }

    // 🔹 Clear distance
    if (!value) {
      setDistance("");
      ["distance", "lat", "lng"].forEach((k) => updateParam(k));
      return;
    }

    // 🔹 OPTIMISTIC UI UPDATE
    setDistance(value);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updateParam("distance", value);
        updateParam("lat", pos.coords.latitude.toString());
        updateParam("lng", pos.coords.longitude.toString());
      },
      (err) => {
        console.error("GPS error:", err);

        if (err.code === 1) {
          alert("Location permission denied");
        } else if (err.code === 2) {
          alert(
            "Unable to determine your location. Try enabling location services or turning off VPN."
          );
        } else if (err.code === 3) {
          alert("Location request timed out. Please try again.");
        }
      },
      { enableHighAccuracy: true, timeout: 15000 }
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
        distance, // ✅ LOCAL STATE
        lat: params.get("lat") ?? undefined,
        lng: params.get("lng") ?? undefined,
      }}
      onUpdate={handleUpdate}
      onClear={clearFilters}
    />
  );
}
