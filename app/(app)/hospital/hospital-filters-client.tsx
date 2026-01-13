"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { HospitalFilters } from "./hospital-filters";

const DISTANCE_TOLERANCE_KM = 2;

export function HospitalFiltersClient({
  states,
  departments,
}: {
  states: string[];
  departments: string[];
}) {
  const router = useRouter();
  const params = useSearchParams();

  const filters = {
    q: params.get("q") ?? "",
    state: params.get("state") ?? "",
    department: params.get("department") ?? "",
    distance: params.get("distance") ?? "",
  };

  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const sp = new URLSearchParams(params.toString());
      Object.entries(updates).forEach(([k, v]) =>
        v ? sp.set(k, v) : sp.delete(k)
      );
      router.replace(`?${sp.toString()}`, { scroll: false });
    },
    [params, router]
  );

  const onUpdate = useCallback(
    (key: keyof typeof filters, value?: string) => {
      if (key !== "distance") {
        updateParams({ [key]: value });
        return;
      }

      if (!value) {
        updateParams({ distance: undefined, lat: undefined, lng: undefined });
        return;
      }

      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          updateParams({
            distance: (Number(value) + DISTANCE_TOLERANCE_KM).toString(),
            lat: pos.coords.latitude.toFixed(6),
            lng: pos.coords.longitude.toFixed(6),
          });
          setLoading(false);
        },
        () => {
          updateParams({ distance: value });
          setLocationError("Location unavailable");
          setLoading(false);
        }
      );
    },
    [updateParams]
  );

  return (
    <HospitalFilters
      states={states}
      departments={departments}
      values={filters}
      loading={loading}
      locationError={locationError}
      onUpdate={onUpdate}
      onClear={() => router.replace("/hospital")}
    />
  );
}
