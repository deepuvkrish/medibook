"use client";

import { useEffect, useState } from "react";
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
import { Loader2, MapPin } from "lucide-react";

/* ---------------------------------------------
   Types
--------------------------------------------- */
export type FilterValues = {
  q: string;
  state: string;
  department: string;
  distance: string;
};

type Props = {
  states: string[];
  departments: string[];
  values: FilterValues;
  onUpdate: (key: keyof FilterValues, value?: string) => void;
  onClear: () => void;
  loading?: boolean;
  locationError?: string | null;
  locationNote?: string | null;
  onUseCurrentLocation?: () => void;
};

/* ---------------------------------------------
   Component
--------------------------------------------- */
export function HospitalFilters({
  states,
  departments,
  values,
  onUpdate,
  onClear,
  loading,
  locationError,
  locationNote,
  onUseCurrentLocation,
}: Props) {
  const [search, setSearch] = useState(values.q);

  /* Sync search box only */
  useEffect(() => {
    setSearch(values.q);
  }, [values.q]);

  /* Debounced search */
  useEffect(() => {
    if (search === values.q) return; // 🔑 STOP LOOP
    const t = setTimeout(() => {
      onUpdate("q", search || undefined);
    }, 300);
    return () => clearTimeout(t);
  }, [search, values.q, onUpdate]);

  const hasFilters =
    values.q || values.state || values.department || values.distance;

  return (
    <div className="space-y-3">
      {/* FILTER ROW */}
      <div className="flex flex-wrap gap-3 items-center">
        <Input
          placeholder="Search hospitals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[320px]"
        />

        <Select
          value={values.state}
          onValueChange={(v) => onUpdate("state", v)}
        >
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
          onValueChange={(v) => onUpdate("distance", v)}
          disabled={loading}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Distance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">Within 5 km</SelectItem>
            <SelectItem value="10">Within 10 km</SelectItem>
            <SelectItem value="25">Within 25 km</SelectItem>
            <SelectItem value="40">Within 40 km</SelectItem>
          </SelectContent>
        </Select>

        {onUseCurrentLocation && (
          <Button
            variant="outline"
            size="sm"
            onClick={onUseCurrentLocation}
            disabled={loading}
          >
            <MapPin className="w-4 h-4 mr-1" />
            Use current location
          </Button>
        )}

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear filters
          </Button>
        )}
      </div>

      {/* STATUS ROW */}
      <div className="flex flex-wrap gap-2 text-sm">
        {loading && (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            Detecting your location…
          </div>
        )}

        {locationError && (
          <div className="text-red-600 font-medium">{locationError}</div>
        )}

        {locationNote && (
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md">
            {locationNote}
          </div>
        )}
      </div>

      {/* ACTIVE FILTER BADGES */}
      <div className="flex flex-wrap gap-2">
        {values.state && <Badge>{values.state}</Badge>}
        {values.department && <Badge>{values.department}</Badge>}
        {values.distance && !locationError && (
          <Badge className="bg-green-600 text-white">
            📍 Within {values.distance} km
          </Badge>
        )}
      </div>
    </div>
  );
}
