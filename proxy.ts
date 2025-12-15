import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/records/:path*",
    "/doctor/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
