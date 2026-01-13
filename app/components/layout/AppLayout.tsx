"use client";

import { ReactNode } from "react";

export function AppLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar?: ReactNode;
}) {
  return (
    <div className="flex flex-1 w-full">
      {sidebar && (
        <aside className="hidden md:block w-[260px] dark:border-yellow-500/20 dark:border-r bg-[#ffffff] dark:bg-[#0b111d] p-4 shadow dark:shadow-none">
          {sidebar}
        </aside>
      )}

      <div className="flex-1 p-4 md:p-6 bg-[#e8eff3] dark:bg-[#1e1f28]">
        {children}
      </div>
    </div>
  );
}
