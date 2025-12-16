import postgres from "postgres";
import { auth } from "@/auth";
import type { AuditAction } from "@/app/lib/audit/actions";

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!, {
  ssl: "require",
});

export type AuditLog = {
  id: string;
  user_id: string | null;
  action: AuditAction;
  target_id: string | null;
  ip: string | null;
  user_agent: string | null;
  created_at: string;
};

type Params = {
  action?: AuditAction;
  from?: string;
  to?: string;
  page: number;
  pageSize: number;
};

/** ✅ Postgres.js-safe WHERE builder */
function buildWhere(conditions: any[]) {
  if (conditions.length === 0) return sql``;

  return sql`WHERE ${conditions.reduce((acc, condition, index) =>
    index === 0 ? condition : sql`${acc} AND ${condition}`
  )}`;
}

export async function getAuditLogs({
  action,
  from,
  to,
  page,
  pageSize,
}: Params) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const offset = (page - 1) * pageSize;

  const conditions = [];

  if (action) conditions.push(sql`action = ${action}`);
  if (from) conditions.push(sql`created_at >= ${from}`);
  if (to) conditions.push(sql`created_at <= ${to}`);

  const where = buildWhere(conditions);

  const logs = await sql<AuditLog[]>`
    SELECT
      id,
      user_id,
      action,
      target_id,
      ip,
      user_agent,
      created_at
    FROM medi_audit_logs
    ${where}
    ORDER BY created_at DESC
    LIMIT ${pageSize}
    OFFSET ${offset}
  `;

  const [{ count }] = await sql<{ count: number }[]>`
    SELECT COUNT(*)::int AS count
    FROM medi_audit_logs
    ${where}
  `;

  return {
    logs,
    total: count,
  };
}
