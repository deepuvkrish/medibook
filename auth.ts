import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import postgres from "postgres";
import { authConfig } from "./auth.config";

import { logAudit } from "@/app/lib/audit/logger";
import { AUDIT_ACTIONS } from "@/app/lib/audit/actions";

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!, {
  ssl: "require",
});

type DBUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "doctor" | "admin";
};

async function getUserByEmail(email: string): Promise<DBUser | null> {
  const users = await sql<DBUser[]>`
    SELECT id, name, email, password, role
    FROM mediusers
    WHERE email = ${email}
    LIMIT 1
  `;
  return users[0] ?? null;
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials, req) {
        const ip =
          req?.headers?.get("x-forwarded-for") ??
          req?.headers?.get("x-real-ip") ??
          undefined;

        const userAgent = req?.headers?.get("user-agent") ?? undefined;

        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        // ❌ Invalid payload
        if (!parsed.success) {
          await logAudit({
            action: AUDIT_ACTIONS.LOGIN_FAILED,
            ip,
            userAgent,
          });
          return null;
        }

        const { email, password } = parsed.data;
        const user = await getUserByEmail(email);

        // ❌ User not found
        if (!user) {
          await logAudit({
            action: AUDIT_ACTIONS.LOGIN_FAILED,
            ip,
            userAgent,
          });
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);

        console.log({
          inputPassword: password,
          dbHash: user.password,
          isValid,
        });

        // ❌ Wrong password
        if (!isValid) {
          await logAudit({
            action: AUDIT_ACTIONS.LOGIN_FAILED,
            targetId: user.id,
            ip,
            userAgent,
          });
          return null;
        }

        // ✅ SUCCESS
        await logAudit({
          action: AUDIT_ACTIONS.LOGIN_SUCCESS,
          targetId: user.id,
          ip,
          userAgent,
        });

        // ✅ SAFE USER OBJECT
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
});
