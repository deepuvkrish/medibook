"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { AUDIT_ACTIONS } from "@/app/lib/audit/actions";

export function AuditFilters() {
  const router = useRouter();
  const params = useSearchParams();

  function update(key: string, value?: string) {
    const sp = new URLSearchParams(params.toString());

    if (!value) sp.delete(key);
    else sp.set(key, value);

    sp.set("page", "1");
    router.push(`?${sp.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-4 items-end">
      {/* Action filter */}
      <Select
        value={params.get("action") ?? "all"}
        onValueChange={(v) => update("action", v === "all" ? undefined : v)}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Filter action" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All actions</SelectItem>
          {Object.values(AUDIT_ACTIONS).map((action) => (
            <SelectItem key={action} value={action}>
              {action.replaceAll("_", " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* From date */}
      <Input
        type="date"
        value={params.get("from") ?? ""}
        onChange={(e) => update("from", e.target.value)}
      />

      {/* To date */}
      <Input
        type="date"
        value={params.get("to") ?? ""}
        onChange={(e) => update("to", e.target.value)}
      />

      {/* CSV Export */}
      <Button
        variant="outline"
        onClick={() =>
          window.open(`/admin/audit-logs/export?${params.toString()}`, "_blank")
        }
      >
        Export CSV
      </Button>
    </div>
  );
}
