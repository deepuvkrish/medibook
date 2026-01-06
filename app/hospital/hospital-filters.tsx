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

export type FilterValues = {
  q: string;
  state: string;
  department: string;
  distance: string;
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

  useEffect(() => setSearch(values.q), [values.q]);

  useEffect(() => {
    const t = setTimeout(() => {
      onUpdate("q", search || undefined);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const hasFilters =
    values.q || values.state || values.department || values.distance;

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
        onValueChange={(v) => onUpdate("distance", v)}
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

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear filters
        </Button>
      )}

      {values.distance && (
        <Badge className="ml-auto bg-green-600 text-white">
          📍 Within {values.distance} km
        </Badge>
      )}
    </div>
  );
}
