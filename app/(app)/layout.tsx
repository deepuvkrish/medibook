"use client";

import { ReactNode, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { HealNavLogo } from "@/app/components/ui/healLogo";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { IoIosSearch } from "react-icons/io";

export default function AppGroupLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useSearchParams();

  const onSearch = useCallback(
    (value: string) => {
      const sp = new URLSearchParams(params.toString());
      if (!value) sp.delete("q");
      else sp.set("q", value);

      router.replace(`?${sp.toString()}`, { scroll: false });
    },
    [params, router]
  );

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* ================= NAVBAR (ONLY ONCE) ================= */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#cae1f7] dark:bg-[#0b111d] text-white">
        <Link href="/" className="flex items-center gap-2">
          <HealNavLogo w={80} h={50} />
        </Link>

        <div className="flex-1 px-6 max-w-2xl relative">
          <IoIosSearch className="absolute left-8 top-3 text-gray-700 z-5" />
          <Input
            placeholder="Search Hospital Names, Doctors, Medicines, Labs..."
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Link href="/login">
          <Button size="sm" variant="secondary">
            Sign in
          </Button>
        </Link>
      </header>

      {/* ================= APP CONTENT ================= */}
      <main className="flex flex-1 w-full">{children}</main>
    </div>
  );
}
