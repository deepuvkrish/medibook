"use client";

import { MultiSelectDropdown } from "./multi-select-dropdown";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { Loader2, MapPin } from "lucide-react";

export function HospitalFiltersSidebar({
  states,
  departments,
  values,
  onUpdate,
  onClear,
  loading,
  locationError,
  locationNote,
}: any) {
  const selectedStates = values.state?.split(",").filter(Boolean) ?? [];
  const selectedDepartments =
    values.department?.split(",").filter(Boolean) ?? [];

  return (
    <div className="p-4 space-y-6">
      <h2 className="font-semibold text-lg">Filters</h2>

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

      {loading && (
        <div className="flex items-center gap-2 text-sm">
          <Loader2 className="animate-spin w-4 h-4" />
          Detecting location…
        </div>
      )}

      {locationError && <p className="text-red-500">{locationError}</p>}
      {locationNote && <p className="text-yellow-600">{locationNote}</p>}

      {(values.state || values.department || values.distance) && (
        <Button variant="ghost" onClick={onClear}>
          Clear filters
        </Button>
      )}

      <div className="flex flex-wrap gap-2">
        {selectedStates.map((s: string) => (
          <Badge key={s}>{s}</Badge>
        ))}
        {selectedDepartments.map((d: string) => (
          <Badge key={d}>{d}</Badge>
        ))}
        {values.distance && (
          <Badge className="bg-green-600 text-white">
            📍 {values.distance} km
          </Badge>
        )}
      </div>
    </div>
  );
}
