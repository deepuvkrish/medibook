"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { HospitalFiltersSidebar } from "./hospital-filters-sidebar";

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

  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationNote, setLocationNote] = useState<string | null>(null);

  const filters = {
    q: params.get("q") ?? "",
    state: params.get("state") ?? "",
    department: params.get("department") ?? "",
    distance: params.get("distance") ?? "",
  };

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const sp = new URLSearchParams(params.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (!value) sp.delete(key);
        else sp.set(key, value);
      });

      router.replace(`?${sp.toString()}`, { scroll: false });
    },
    [params, router]
  );

  const handleUpdate = useCallback(
    (key: keyof typeof filters, value?: string) => {
      if (key !== "distance") {
        updateParams({ [key]: value });
        return;
      }

      if (!value) {
        setLocationError(null);
        setLocationNote(null);
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
          setLocationNote("Using approximate location.");
          setLoading(false);
        },
        () => {
          updateParams({ distance: value });
          setLocationError("Location unavailable.");
          setLoading(false);
        }
      );
    },
    [updateParams]
  );

  const clearFilters = () => {
    setLocationError(null);
    setLocationNote(null);
    router.replace("/hospital", { scroll: false });
  };

  return (
    <HospitalFiltersSidebar
      states={states}
      departments={departments}
      values={filters}
      onUpdate={handleUpdate}
      onClear={clearFilters}
      loading={loading}
      locationError={locationError}
      locationNote={locationNote}
    />
  );
}
