// hospital/hospital-filters.tsx

"use client";

import { X } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { MultiSelectDropdown } from "./multi-select-dropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import type { Country } from "@/app/lib/codelists/countries";
import * as Flags from "country-flag-icons/react/3x2";

export type FilterValues = {
  q: string;
  country: string;
  state: string;
  department: string;
  distance: string;
};

type Props = {
  countries: Country[];
  states: string[];
  departments: string[];
  values: FilterValues;
  onUpdate: (key: keyof FilterValues, value?: string) => void;
  onClear: () => void;
  loading?: boolean;
  locationError?: string | null;
};

export function HospitalFilters({
  countries,
  states,
  departments,
  values,
  onUpdate,
  onClear,
  loading,
  locationError,
}: Props) {
  const selectedStates = values.state.split(",").filter(Boolean);
  const selectedDepartments = values.department.split(",").filter(Boolean);

  const activeCount =
    (values.q ? 1 : 0) +
    (values.country ? 1 : 0) +
    selectedStates.length +
    selectedDepartments.length +
    (values.distance ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Country */}
      <Select
        value={values.country}
        onValueChange={(v) => onUpdate("country", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent className="w-80 mt-3">
          {countries.map((c) => {
            const Flag = Flags[c.code as keyof typeof Flags];
            return (
              <SelectItem key={c.code} value={c.code} className="w-80">
                <div className="flex items-center gap-2 w-80">
                  {Flag && (
                    <Flag className="w-4 h-4 rounded-sm" title={c.name} />
                  )}
                  <span>{c.name}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {/* State */}
      <div className="space-y-1">
        <MultiSelectDropdown
          label="States"
          options={states}
          values={selectedStates}
          disabled={!values.country}
          onChange={(v) => onUpdate("state", v.join(",") || undefined)}
        />
        {!values.country && (
          <p className="text-[10px] text-muted-foreground mx-3">
            Select a country first
          </p>
        )}
      </div>

      {/* Departments */}
      <MultiSelectDropdown
        label="Departments"
        options={departments}
        values={selectedDepartments}
        onChange={(v) => onUpdate("department", v.join(",") || undefined)}
      />

      {/* Distance */}
      <Select
        value={values.distance}
        onValueChange={(v) => onUpdate("distance", v)}
        disabled={loading}
      >
        <SelectTrigger>
          <SelectValue placeholder="Distance" />
        </SelectTrigger>
        <SelectContent className="w-50 mt-10">
          <SelectItem value="5">Within 5 km</SelectItem>
          <SelectItem value="10">Within 10 km</SelectItem>
          <SelectItem value="25">Within 25 km</SelectItem>
        </SelectContent>
      </Select>

      {locationError && <p className="text-xs text-red-500">{locationError}</p>}

      {activeCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-red-500 hover:bg-red-50"
        >
          Clear all filters
        </Button>
      )}

      {/* Filter pills */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {values.country && (
            <FilterPill
              label={`Country: ${values.country}`}
              onRemove={() => onUpdate("country", undefined)}
            />
          )}

          {selectedStates.map((s) => (
            <FilterPill
              key={s}
              label={s}
              onRemove={() =>
                onUpdate(
                  "state",
                  selectedStates.filter((x) => x !== s).join(",") || undefined
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <Badge className="flex items-center gap-1 pr-1 animate-in fade-in zoom-in">
      {label}
      <button
        onClick={onRemove}
        className="ml-1 rounded hover:bg-background p-0.5 focus:ring-2"
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
}
