// app/api/auth/signout/route.ts
import { logAudit } from "@/app/lib/audit/logger";
import { AUDIT_ACTIONS } from "@/app/lib/audit/actions";

export async function POST() {
  await logAudit({ action: AUDIT_ACTIONS.LOGOUT });
}
