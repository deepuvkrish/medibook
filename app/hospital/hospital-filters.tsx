// hospital/hospital-filters.tsx

"use client";

import { MultiSelectDropdown } from "./multi-select-dropdown";
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
import { IoIosSearch } from "react-icons/io";

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
  const selectedStates = values.state
    ? values.state.split(",").filter(Boolean)
    : [];

  const selectedDepartments = values.department
    ? values.department.split(",").filter(Boolean)
    : [];

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
      <div className="flex flex-col md:flex-row gap-3 items-center">
        <div className="flex items-center relative w-full group">
          <IoIosSearch className="absolute left-2 top-2 text-xl text-gray-500 group-hover:text-blue-400" />
          <Input
            placeholder="Search hospitals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 w-full md:w-[320px] text-gray-500"
          />
        </div>
        <div className="flex w-full">
          <MultiSelectDropdown
            label="States"
            options={states}
            values={selectedStates}
            onChange={(next) =>
              onUpdate("state", next.length ? next.join(",") : undefined)
            }
            width="180px"
          />

          <MultiSelectDropdown
            label="Departments"
            options={departments}
            values={selectedDepartments}
            onChange={(next) =>
              onUpdate("department", next.length ? next.join(",") : undefined)
            }
            width="220px"
          />

          <Select
            value={values.distance}
            onValueChange={(v) => onUpdate("distance", v)}
            disabled={loading}
          >
            <SelectTrigger className="w-fit md:w-[180px] mx-2">
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
              variant="ghost"
              size="sm"
              onClick={onUseCurrentLocation}
              disabled={loading}
              className="w-fit rounded-full cursor-pointer text-[10px] text-green-500"
            >
              <MapPin className="w-4 h-4 mr-[3px]" />
              Use current location
            </Button>
          )}
        </div>

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
        {/* {values.state && <Badge>{values.state}</Badge>}
        {values.department && <Badge>{values.department}</Badge>} */}
        {selectedStates.map((s) => (
          <Badge key={s}>{s}</Badge>
        ))}

        {selectedDepartments.map((d) => (
          <Badge key={d}>{d}</Badge>
        ))}

        {values.distance && !locationError && (
          <Badge className="bg-green-600 text-white">
            📍 Within {values.distance} km
          </Badge>
        )}
      </div>
    </div>
  );
}
