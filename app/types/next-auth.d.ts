import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: "user" | "doctor" | "admin";
  }

  interface Session {
    user: {
      id: string;
      role: "user" | "doctor" | "admin";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "user" | "doctor" | "admin";
  }
}
