//hospital/hospital-filters.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

/* ---------------------------------------------
   Types
--------------------------------------------- */
export type FilterValues = {
  q: string;
  state: string;
  department: string;
  distance: string;
  lat?: string;
  lng?: string;
};

/* ---------------------------------------------
   GPS helper
--------------------------------------------- */
function getUserLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (err) => reject(err),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  });
}

/* ---------------------------------------------
   Component
--------------------------------------------- */
export function HospitalFilters({
  states,
  departments,
  values,
  onUpdate,
  onClear,
}: {
  states: string[];
  departments: string[];
  values: FilterValues;
  onUpdate: (key: keyof FilterValues, value?: string) => void;
  onClear: () => void;
}) {
  const [search, setSearch] = useState(values.q);
  const [locating, setLocating] = useState(false);
  const gpsInFlight = useRef(false); // 🔒 HARD LOCK

  /* 🔁 sync search */
  useEffect(() => {
    setSearch(values.q);
  }, [values.q]);

  /* ⏱ debounce search */
  useEffect(() => {
    const t = setTimeout(() => {
      onUpdate("q", search || undefined);
    }, 300);
    return () => clearTimeout(t);
  }, [search, onUpdate]);

  const hasFilters =
    values.q || values.state || values.department || values.distance;

  /* ---------------------------------------------
     Distance handler (FIXED)
  --------------------------------------------- */
  async function handleDistanceChange(value: string) {
    if (!value) {
      onUpdate("distance", undefined);
      onUpdate("lat", undefined);
      onUpdate("lng", undefined);
      return;
    }

    // 🔥 prevent double fire
    if (locating || gpsInFlight.current) return;

    // Already have location
    if (values.lat && values.lng) {
      onUpdate("distance", value);
      return;
    }

    // Session cache
    const cached = sessionStorage.getItem("userLocation");
    if (cached) {
      const loc = JSON.parse(cached);
      onUpdate("lat", String(loc.lat));
      onUpdate("lng", String(loc.lng));
      onUpdate("distance", value);
      return;
    }

    try {
      gpsInFlight.current = true;
      setLocating(true);

      const loc = await getUserLocation();

      sessionStorage.setItem("userLocation", JSON.stringify(loc));

      onUpdate("lat", String(loc.lat));
      onUpdate("lng", String(loc.lng));
      onUpdate("distance", value);
    } catch (err: any) {
      // 🚫 Ignore duplicate / aborted calls
      if (err?.code === 1) {
        alert("Location permission is required to filter by distance");
      }
    } finally {
      gpsInFlight.current = false;
      setLocating(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Input
        placeholder="Search hospitals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-[320px]"
      />

      <Select value={values.state} onValueChange={(v) => onUpdate("state", v)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="State" />
        </SelectTrigger>
        <SelectContent>
          {states.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={values.department}
        onValueChange={(v) => onUpdate("department", v)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((d) => (
            <SelectItem key={d} value={d}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={values.distance}
        onValueChange={handleDistanceChange}
        disabled={locating}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={locating ? "Detecting location..." : "Distance"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">Within 5 km</SelectItem>
          <SelectItem value="10">5 – 10 km</SelectItem>
          <SelectItem value="25">11 – 25 km</SelectItem>
          <SelectItem value="40">25 – 40 km</SelectItem>
          <SelectItem value="40+">Above 40 km</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear filters
        </Button>
      )}

      <div className="flex gap-2 ml-auto">
        {values.state && <Badge>{values.state}</Badge>}
        {values.department && <Badge>{values.department}</Badge>}
        {values.distance && <Badge>{values.distance} km</Badge>}
        {values.lat && values.lng && <Badge>📍 Near you</Badge>}
      </div>
    </div>
  );
}
