import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import postgres from "postgres";
import { authConfig } from "./auth.config";

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

      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUserByEmail(email);

        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        // ✅ VERY IMPORTANT: return SAFE user object
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
