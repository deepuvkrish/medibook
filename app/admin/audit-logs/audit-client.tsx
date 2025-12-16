"use client";

import { AuditFilters } from "@/app/components/admin/audit-filters";
import { AuditTable } from "@/app/components/admin/audit-table";
import type { AuditLog } from "@/app/lib/data/audit";

export default function AuditClient({
  logs,
  page,
  totalPages,
}: {
  logs: AuditLog[];
  page: number;
  totalPages: number;
}) {
  return (
    <>
      <AuditFilters />
      <AuditTable logs={logs} page={page} totalPages={totalPages} />
    </>
  );
}
