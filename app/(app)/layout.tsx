//app/(app)/layout.tsx

"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { HealNavLogo } from "@/app/components/ui/healLogo";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { IoIosSearch } from "react-icons/io";

const DEBOUNCE_MS = 400;
export default function AppGroupLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useSearchParams();
  const urlQ = params.get("q") ?? "";
  const [value, setValue] = useState(urlQ);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* 🔑 Keep input in sync when URL changes (pill close) */
  useEffect(() => {
    setValue(urlQ);
  }, [urlQ]);

  /* 🔑 Debounced URL update — NO params dependency */
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const sp = new URLSearchParams(window.location.search);
      if (!value) sp.delete("q");
      else sp.set("q", value);
      const next = `?${sp.toString()}`;
      const current = window.location.search;
      // 🚫 prevent useless replaces
      if (next !== current) {
        router.replace(next, { scroll: false });
      }
    }, DEBOUNCE_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, router]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="flex items-center justify-between px-6 py-4 bg-[#cae1f7] dark:bg-[#0b111d]">
        <Link href="/" className="flex items-center gap-2">
          <HealNavLogo w={80} h={50} />
        </Link>
        <div className="flex-1 px-6 max-w-2xl relative">
          <IoIosSearch className="absolute left-8 top-3 text-gray-700" />
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search hospitals, doctors, labs…"
            className="pl-10"
          />
        </div>
        <Link href="/login">
          <Button size="sm" variant="secondary">
            Sign in
          </Button>
        </Link>
      </header>
      <main className="flex flex-1 w-full">{children}</main>
    </div>
  );
}
