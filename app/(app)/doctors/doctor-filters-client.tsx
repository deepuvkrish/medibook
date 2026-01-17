// Doctor/Doctor-filters-client.tsx

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { DoctorFilters } from "./doctor-filters";
import type { Country } from "@/app/lib/codelists/countries";

const DISTANCE_TOLERANCE_KM = 2;

export function DoctorFiltersClient({
  countries,
  statesByCountry,
  departments,
}: {
  countries: Country[];
  statesByCountry: Record<string, string[]>;
  departments: string[];
}) {
  const router = useRouter();
  const params = useSearchParams();

  const filters = {
    q: params.get("q") ?? "",
    country: params.get("country") ?? "",
    state: params.get("state") ?? "",
    department: params.get("department") ?? "",
    distance: params.get("distance") ?? "",
  };

  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const sp = new URLSearchParams(params.toString());

      Object.entries(updates).forEach(([key, value]) => {
        value ? sp.set(key, value) : sp.delete(key);
      });

      router.replace(`?${sp.toString()}`, { scroll: false });
    },
    [params, router]
  );

  const onUpdate = useCallback(
    (key: keyof typeof filters, value?: string) => {
      // Country change → reset states
      if (key === "country") {
        updateParams({
          country: value,
          state: undefined,
        });
        return;
      }

      if (key !== "distance") {
        updateParams({ [key]: value });
        return;
      }

      if (!value) {
        updateParams({
          distance: undefined,
          lat: undefined,
          lng: undefined,
        });
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
    <DoctorFilters
      countries={countries}
      states={filters.country ? statesByCountry[filters.country] ?? [] : []}
      departments={departments}
      values={filters}
      loading={loading}
      locationError={locationError}
      onUpdate={onUpdate}
      onClear={() => router.replace("/hospital", { scroll: false })}
    />
  );
}
