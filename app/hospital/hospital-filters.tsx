//hospital/hospital-filters.tsx

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

  /* 🔁 Sync search input */
  useEffect(() => {
    setSearch(values.q);
  }, [values.q]);

  /* ⏱ Debounced search */
  useEffect(() => {
    const t = setTimeout(() => {
      onUpdate("q", search || undefined);
    }, 300);
    return () => clearTimeout(t);
  }, [search, onUpdate]);

  const hasFilters =
    values.q || values.state || values.department || values.distance;

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* 🔍 Search */}
      <Input
        placeholder="Search hospitals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-[320px]"
      />

      {/* 🏙 State */}
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

      {/* 🏥 Department */}
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

      {/* 📍 Distance */}

      <Select
        value={values.distance}
        onValueChange={(v) => onUpdate("distance", v)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Distance" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">Within 5 km</SelectItem>
          <SelectItem value="10">5 – 10 km</SelectItem>
          <SelectItem value="25">11 – 25 km</SelectItem>
          <SelectItem value="40">25 – 40 km</SelectItem>
          <SelectItem value="40+">Above 40 km</SelectItem>
        </SelectContent>
      </Select>

      {/* 🧹 Clear */}
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear filters
        </Button>
      )}

      {/* 🏷 Active filter badges */}
      <div className="flex gap-2 ml-auto">
        {values.state && <Badge>{values.state}</Badge>}
        {values.department && <Badge>{values.department}</Badge>}
        {values.distance && (
          <Badge className="bg-green-600 text-white">
            📍 Within {values.distance} km
          </Badge>
        )}
      </div>
    </div>
  );
}
