import { getAuditLogs } from "@/app/lib/data/audit";
import { AuditTable } from "@/app/components/admin/audit-table";
import { AuditFilters } from "@/app/components/admin/audit-filters";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
type Props = {
  searchParams: {
    action?: string;
    from?: string;
    to?: string;
    page?: string;
  };
};

export default async function AuditLogsPage({ searchParams }: Props) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  const page = Number(searchParams.page ?? 1);
  const pageSize = 20;

  const { logs, total } = await getAuditLogs({
    action: searchParams.action as any,
    from: searchParams.from,
    to: searchParams.to,
    page,
    pageSize,
  });

  const totalPages = Math.ceil(total / pageSize);

  return (
    <Suspense fallback={null}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Audit Logs</h1>
          <p className="text-muted-foreground">Filtered system activity</p>
        </div>
        <AuditFilters />
        <AuditTable logs={logs} page={page} totalPages={totalPages} />
      </div>
    </Suspense>
  );
}
