"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import type { AuditLog } from "@/app/lib/data/audit";

export function AuditTable({
  logs,
  page,
  totalPages,
}: {
  logs: AuditLog[];
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const params = useSearchParams();

  function goTo(p: number) {
    const sp = new URLSearchParams(params.toString());
    sp.set("page", String(p));
    router.push(`?${sp.toString()}`);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <Badge variant="outline">{log.action}</Badge>
                </TableCell>

                <TableCell className="text-xs">{log.user_id ?? "—"}</TableCell>

                <TableCell className="text-xs">
                  {log.target_id ?? "—"}
                </TableCell>

                <TableCell className="text-xs">{log.ip ?? "—"}</TableCell>

                <TableCell className="text-xs">
                  {format(new Date(log.created_at), "dd MMM yyyy HH:mm")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => goTo(page - 1)}
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => goTo(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
