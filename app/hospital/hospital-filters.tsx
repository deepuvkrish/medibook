"use client";

// Libraries ===================================================>
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

type FilterValues = {
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

  // 🔁 keep input in sync with URL (back/forward)
  useEffect(() => {
    setSearch(values.q);
  }, [values.q]);

  // ⏱ debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      onUpdate("q", search || undefined);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const hasFilters =
    values.q || values.state || values.department || values.distance;

  return (
    <div className="flex flex-wrap gap-3 items-center filter-bar text-gray-700 dark:text-gray-500">
      {/* Search */}
      <Input
        placeholder="Search hospitals..."
        value={search}
        onChange={(e) => onUpdate("q", e.target.value)}
        className="w-[320px] text-gray-700"
      />

      {/* State */}
      <Select
        value={values.state}
        onValueChange={(value) => onUpdate("state", value)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="State" />
        </SelectTrigger>
        <SelectContent>
          {states.map((state) => (
            <SelectItem key={state} value={state}>
              {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Department */}
      <Select
        value={values.department}
        onValueChange={(value) => onUpdate("department", value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((dept) => (
            <SelectItem key={dept} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Distance */}
      <Select
        value={values.distance}
        onValueChange={(value) => onUpdate("distance", value)}
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

      {/* Clear */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="cursor-pointer bg-[#282937] text-white"
        >
          Clear filters
        </Button>
      )}

      {/* Active filter badges */}
      <div className="flex gap-2 ml-auto">
        {values.state && (
          <Badge className="bg-blue-500 text-white px-3">{values.state}</Badge>
        )}
        {values.department && (
          <Badge className="bg-pink-600 text-white">{values.department}</Badge>
        )}
        {values.distance && (
          <Badge className="bg-pink-400 text-white">{values.distance} km</Badge>
        )}
      </div>
    </div>
  );
}
