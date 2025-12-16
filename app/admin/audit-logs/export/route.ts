import { auth } from "@/auth";
import postgres from "postgres";
import { NextResponse } from "next/server";

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!, {
  ssl: "require",
});

/** Same Postgres.js-safe WHERE builder */
function buildWhere(conditions: any[]) {
  if (conditions.length === 0) return sql``;

  return sql`WHERE ${conditions.reduce((acc, condition, index) =>
    index === 0 ? condition : sql`${acc} AND ${condition}`
  )}`;
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const action = searchParams.get("action");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const conditions = [];

  if (action) conditions.push(sql`action = ${action}`);
  if (from) conditions.push(sql`created_at >= ${from}`);
  if (to) conditions.push(sql`created_at <= ${to}`);

  const where = buildWhere(conditions);

  const rows = await sql`
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
  `;

  const headers = [
    "id",
    "user_id",
    "action",
    "target_id",
    "ip",
    "user_agent",
    "created_at",
  ];

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((h) => `"${String(row[h] ?? "").replace(/"/g, '""')}"`)
        .join(",")
    ),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=audit-logs.csv",
    },
  });
}
