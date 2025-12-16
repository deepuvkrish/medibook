import postgres from "postgres";
import { auth } from "@/auth";
import type { AuditAction } from "./actions";

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!, { ssl: "require" });

type LogParams = {
  action: AuditAction;
  targetId?: string;
  ip?: string;
  userAgent?: string;
};

export async function logAudit({ action, targetId, ip, userAgent }: LogParams) {
  const session = await auth();

  await sql`
    INSERT INTO medi_audit_logs (
      user_id,
      action,
      target_id,
      ip,
      user_agent
    )
    VALUES (
      ${session?.user?.id ?? null},
      ${action},
      ${targetId ?? null},
      ${ip ?? null},
      ${userAgent ?? null}
    )
  `;
}
