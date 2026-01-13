import { ReactNode } from "react";
import { AppLayoutClient } from "./AppLayoutClient";

export function AppLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar?: ReactNode;
}) {
  return <AppLayoutClient sidebar={sidebar}>{children}</AppLayoutClient>;
}
