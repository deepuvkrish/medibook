//hospital/hospital-filters.tsx

"use client";

import { MultiSelectDropdown } from "./multi-select-dropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { FilterDrawer } from "./filter-drawer";
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
  loading,
  locationError,
}: {
  states: string[];
  departments: string[];
  values: FilterValues;
  onUpdate: (key: keyof FilterValues, value?: string) => void;
  onClear: () => void;
  loading?: boolean;
  locationError?: string | null;
}) {
  const selectedStates = values.state?.split(",").filter(Boolean) ?? [];
  const selectedDepartments =
    values.department?.split(",").filter(Boolean) ?? [];

  const activeCount =
    selectedStates.length +
    selectedDepartments.length +
    (values.distance ? 1 : 0);

  const FiltersUI = (
    <div className="space-y-4">
      <MultiSelectDropdown
        label="States"
        options={states}
        values={selectedStates}
        onChange={(v) => onUpdate("state", v.length ? v.join(",") : undefined)}
      />

      <MultiSelectDropdown
        label="Departments"
        options={departments}
        values={selectedDepartments}
        onChange={(v) =>
          onUpdate("department", v.length ? v.join(",") : undefined)
        }
      />

      <Select
        value={values.distance}
        onValueChange={(v) => onUpdate("distance", v)}
        disabled={loading}
      >
        <SelectTrigger>
          <SelectValue placeholder="Distance" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">Within 5 km</SelectItem>
          <SelectItem value="10">Within 10 km</SelectItem>
          <SelectItem value="25">Within 25 km</SelectItem>
        </SelectContent>
      </Select>
      {locationError && <p className="text-xs text-red-500">{locationError}</p>}

      <button onClick={onClear} className="text-sm text-red-500">
        Clear filters
      </button>
    </div>
  );

  return (
    <>
      {/* MOBILE */}
      <div className="md:hidden">
        <FilterDrawer activeCount={activeCount}>{FiltersUI}</FilterDrawer>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block space-y-4">{FiltersUI}</div>

      {/* FILTER PILLS */}
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedStates.map((s) => (
          <Badge key={s}>{s}</Badge>
        ))}
        {selectedDepartments.map((d) => (
          <Badge key={d}>{d}</Badge>
        ))}
      </div>
    </>
  );
}
