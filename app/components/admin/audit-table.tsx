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
      <div className="rounded-xl border border-gray-500 overflow-hidden">
        <Table className="rounded-xl">
          <TableHeader className="rounded-xl">
            <TableRow className="bg-[#42546f] hover:bg-[#3a364f] group rounded-xl">
              <TableHead className="text-blue-400 font-bold text-[15px] border-r border-gray-500 group-hover:text-white ">
                Action
              </TableHead>
              <TableHead className="text-blue-400 font-bold text-[15px] border-r border-gray-500 group-hover:text-white">
                User
              </TableHead>
              <TableHead className="text-blue-400 font-bold text-[15px] border-r border-gray-500 group-hover:text-white">
                Target
              </TableHead>
              <TableHead className="text-blue-400 font-bold text-[15px] border-r border-gray-500 group-hover:text-white">
                IP
              </TableHead>
              <TableHead className="text-blue-400 font-bold text-[15px] border-r border-gray-500 group-hover:text-white">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {logs.map((log) => (
              <TableRow
                key={log.id}
                className=" hover:border-b hover:border-blue-400 cursor-pointer"
              >
                <TableCell className="border-r border-gray-600 bg-[#282828]">
                  <Badge
                    className={
                      log.action == "LOGIN_SUCCESS"
                        ? `bg-green-800 text-gray-300 text-[10px]`
                        : `bg-red-700 text-gray-300 text-[10px]`
                    }
                  >
                    {log.action}
                  </Badge>
                </TableCell>

                <TableCell className="text-xs border-r border-gray-600 bg-[#282828]  cursor-pointer">
                  {log.user_id ?? "—"}
                </TableCell>

                <TableCell className="text-xs border-r border-gray-600 bg-[#282828]">
                  {log.target_id ?? "—"}
                </TableCell>

                <TableCell className="text-xs border-r border-gray-600 bg-[#282828]">
                  {log.ip ?? "—"}
                </TableCell>

                <TableCell className="text-xs border-r border-gray-600 bg-[#282828]">
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
