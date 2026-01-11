// hospital/hospital-filters-client.tsx
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

  /* ---------------------------------------------
     UI-only state (NOT filter state)
  --------------------------------------------- */
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationNote, setLocationNote] = useState<string | null>(null);

  /* ---------------------------------------------
     Derived filters (URL = source of truth)
  --------------------------------------------- */
  const filters = {
    q: params.get("q") ?? "",
    state: params.get("state") ?? "",
    department: params.get("department") ?? "",
    distance: params.get("distance") ?? "",
  };

  /* ---------------------------------------------
     Stable URL updater (CRITICAL)
  --------------------------------------------- */
  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const sp = new URLSearchParams(params.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (!value) sp.delete(key);
        else sp.set(key, value);
      });

      const next = `?${sp.toString()}`;
      const current = `?${params.toString()}`;

      if (next !== current) {
        router.replace(next, { scroll: false });
      }
    },
    [params, router]
  );

  /* ---------------------------------------------
     Filter handler
  --------------------------------------------- */
  const handleUpdate = useCallback(
    (key: keyof typeof filters, value?: string) => {
      if (key !== "distance") {
        updateParams({ [key]: value });
        return;
      }

      /* Clear distance */
      if (!value) {
        setLocationError(null);
        setLocationNote(null);
        updateParams({
          distance: undefined,
          lat: undefined,
          lng: undefined,
        });
        return;
      }

      /* Distance selected → try GPS */
      setLoading(true);
      setLocationError(null);
      setLocationNote(null);

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          updateParams({
            distance: (Number(value) + DISTANCE_TOLERANCE_KM).toString(),
            lat: pos.coords.latitude.toFixed(6),
            lng: pos.coords.longitude.toFixed(6),
          });

          setLocationNote(
            "Using approximate location. Distances may vary slightly."
          );
          setLoading(false);
        },
        () => {
          /* Fallback: distance-only filtering */
          updateParams({ distance: value });

          setLocationError(
            "Location unavailable. Showing results without precise distance."
          );
          setLoading(false);
        },
        {
          enableHighAccuracy: false,
          timeout: 8000,
          maximumAge: 60000,
        }
      );
    },
    [updateParams]
  );

  /* ---------------------------------------------
     Manual GPS trigger
  --------------------------------------------- */
  const useCurrentLocation = useCallback(() => {
    handleUpdate("distance", filters.distance || "10");
  }, [handleUpdate, filters.distance]);

  /* ---------------------------------------------
     Clear all
  --------------------------------------------- */
  const clearFilters = useCallback(() => {
    setLocationError(null);
    setLocationNote(null);
    router.replace("/hospital", { scroll: false });
  }, [router]);

  return (
    <HospitalFilters
      states={states}
      departments={departments}
      values={filters}
      onUpdate={handleUpdate}
      onClear={clearFilters}
      loading={loading}
      locationError={locationError}
      locationNote={locationNote}
      onUseCurrentLocation={useCurrentLocation}
    />
  );
}
