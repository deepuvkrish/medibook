import { getAuditLogs } from "@/app/lib/data/audit";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AuditClient from "./audit-client";
import Link from "next/link";
import { IoReturnDownBack } from "react-icons/io5";

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
    <div className="p-6 space-y-6">
      <Link href="/admin">
        Admin Panel <IoReturnDownBack className="ml-1" />
      </Link>
      <div>
        <h1 className="text-2xl font-semibold">Audit Logs</h1>
        <p className="text-muted-foreground">Filtered system activity</p>
      </div>

      <Suspense fallback={<AuditSkeleton />}>
        <AuditClient logs={logs} page={page} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}

function AuditSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-full bg-muted rounded-md" />
      <div className="h-64 w-full bg-muted rounded-md" />
    </div>
  );
}
