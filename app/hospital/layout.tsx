import { HospitalFiltersClient } from "@/app/hospital/hospital-filters-client";
import { HospitalSkeleton } from "@/app/hospital/hospital-skeleton";
import { Suspense } from "react";
import Link from "next/link";
import { HealNavLogo } from "../components/ui/healLogo";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full ">
      <div className="flex justify-between items-center p-6 bg-[#0b111d]">
        <Link href="/">
          <HealNavLogo w={80} h={50} />
        </Link>
        <Link href="/login">Sign in</Link>
      </div>
      <div className="flex w-full justify-between">
        <div className="md:flex flex-col w-[17%] min-h-full hidden bg-[#0b111d] p-3">
          <span> Sidebar </span>
        </div>
        <div className="flex flex-col w-[83%] p-2">{children}</div>
      </div>
    </div>
  );
}
