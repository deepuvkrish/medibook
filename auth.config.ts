//auth.config.ts

import type { NextAuthConfig } from "next-auth";
export const authConfig = {
  pages: { signIn: "/login", signOut: "/login" },
  session: { strategy: "jwt", maxAge: 60 * 30 },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const pathname = nextUrl.pathname;
      const isLoggedIn = !!auth?.user;
      const publicRoutes = [
        "/",
        "/login",
        "/signup",
        "/hospital",
        "/doctors",
        "/labs",
      ];
      if (publicRoutes.includes(pathname)) return true;
      if (!isLoggedIn) return false;
      // ✅ SAFE role access
      const role = auth?.user && "role" in auth.user ? auth.user.role : null;
      if (pathname.startsWith("/admin") && role !== "admin") {
        return Response.redirect(new URL("/unauthorized", nextUrl));
      }
      if (pathname.startsWith("/doctor") && role !== "doctor") {
        return Response.redirect(new URL("/unauthorized", nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // now typed correctly
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "user" | "doctor" | "admin";
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
