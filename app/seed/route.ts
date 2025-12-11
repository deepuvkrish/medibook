import bcrypt from "bcrypt";
import postgres from "postgres";

import { medbookusers } from "../lib/placeholder_data";

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!, { ssl: "require" });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS medusers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      fname VARCHAR(255) NOT NULL,
      lname VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  for (const user of medbookusers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await sql`
      INSERT INTO medusers (fname, lname, email, password)
      VALUES (${user.fname}, ${user.lname},${user.email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
}

export async function GET() {
  try {
    await seedUsers();

    return Response.json({ message: "✅ Database seeded successfully" });
  } catch (error) {
    console.error("Seeding error:", error);
    return Response.json({ error }, { status: 500 });
  } finally {
    await sql.end({ timeout: 5 }); // close connection
  }
}
