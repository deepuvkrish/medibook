"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export function SessionWatcher() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signOut({ callbackUrl: "/login" });
    }
  }, [status]);

  return null;
}
