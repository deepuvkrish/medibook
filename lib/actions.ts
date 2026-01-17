"use server";

import { signIn } from "@/auth";
// import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import postgres from "postgres";
import { z } from "zod";

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!, {
  ssl: "require",
});

const SignupSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmpassword: z.string().min(6),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const parsed = SignupSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmpassword: formData.get("confirmpassword"),
  });
  if (!parsed.success) {
    return "Invalid form data.";
  }
  const { username, email, password, confirmpassword } = parsed.data;
  if (password !== confirmpassword) {
    return "Passwords do not match.";
  }

  // 🔎 Check existing user
  const existing =
    await sql`SELECT id FROM mediusers WHERE email = ${email} LIMIT 1`;
  if (existing.length > 0) {
    return "User already exists.";
  }

  // 🔐 Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ Insert user
  await sql`
    INSERT INTO mediusers (name, email, password, role)
    VALUES (${username}, ${email}, ${hashedPassword}, 'user')
  `;

  // 🔑 Auto login
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
}
