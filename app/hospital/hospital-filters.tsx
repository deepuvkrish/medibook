"use client";

import { Input } from "@/app/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

export function HospitalFilters() {
  const router = useRouter();
  const params = useSearchParams();

  function update(key: string, value: string) {
    const sp = new URLSearchParams(params.toString());

    if (!value) sp.delete(key);
    else sp.set(key, value);

    router.push(`?${sp.toString()}`);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Input
        placeholder="Search hospitals..."
        defaultValue={params.get("q") ?? ""}
        onChange={(e) => update("q", e.target.value)}
      />

      <Input
        placeholder="State"
        defaultValue={params.get("state") ?? ""}
        onChange={(e) => update("state", e.target.value)}
      />

      <Input
        placeholder="District"
        defaultValue={params.get("district") ?? ""}
        onChange={(e) => update("district", e.target.value)}
      />

      <Input
        placeholder="Department"
        defaultValue={params.get("department") ?? ""}
        onChange={(e) => update("department", e.target.value)}
      />
    </div>
  );
}
