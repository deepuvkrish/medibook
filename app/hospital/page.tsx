import { auth } from "@/auth";
import { getHospitalsForUser } from "@/app/lib/data/hospitals";
import { HospitalCard } from "@/app/hospital/hospital-card";
import { HospitalFiltersClient } from "@/app/hospital/hospital-filters-client";
import { HospitalSkeleton } from "@/app/hospital/hospital-skeleton";
import { Suspense } from "react";
import { HealNavLogo } from "../components/ui/healLogo";
import Link from "next/link";
type SearchParams = {
  q?: string;
  state?: string;
  district?: string;
  department?: string;
};

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
export default async function HospitalsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();

  // ✅ UNWRAP searchParams
  const resolvedSearchParams = await searchParams;

  const { visible, blurred, canViewContact } = await getHospitalsForUser(
    session?.user?.id,
    resolvedSearchParams
  );

  return (
    <div className="p-6 space-y-6">
      <div className="navBar flex w-full p-0 md:p-2 h-15 items-center justify-between px-0 md:px-3">
        <Link href="/">
          <HealNavLogo w={80} h={50} />
        </Link>
        <div className="loginnavForm w-1/2  md:w-[200px] flex justify-center">
          <Link
            href="/login"
            className="flex px-2 py-1  md:px-5 text-gray-700 dark:text-white text-lg hover:text-[#e6456b]"
          >
            Sign in
          </Link>
        </div>
      </div>
      <h1 className="text-2xl font-semibold">Hospitals</h1>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Hospitals</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <HospitalSkeleton key={i} />
            ))}
          </div>
        }
      >
        <HospitalFiltersClient
          states={["Kerala", "Tamil Nadu", "Karnataka"]}
          departments={["Cardiology", "Orthopedics", "Neurology"]}
        />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {visible.map((h) => (
          <HospitalCard
            key={h.id}
            hospital={h}
            canViewContact={canViewContact}
            blurred={false}
          />
        ))}

        {blurred.map((h) => (
          <HospitalCard
            key={h.id}
            hospital={h}
            canViewContact={false}
            blurred
          />
        ))}
      </div>

      <div className="card m-4 text-gray-300 w-[clamp(260px,80%,300px)] hover:brightness-90 transition-all cursor-pointer group bg-linear-to-tl from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950 border-r-2 border-t-2 border-gray-900 rounded-lg overflow-hidden relative">
        <div className="px-8 py-10">
          <div className="bg-orange-500 w-10 h-10 rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-red-900 transition-all"></div>
          <div className="uppercase font-bold text-xl">CHAMONILLE</div>
          <div className="text-gray-300 uppercase tracking-widest">
            NATURAL, OIL
          </div>
          <div className="text-gray-400 mt-8">
            <p className="font-bold">39.00 MLC</p>
            <p>Perfect everywhere</p>
          </div>
        </div>

        <div className="h-2 w-full bg-linear-to-l via-yellow-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0"></div>
        <div className="h-0.5 group-hover:w-full bg-linear-to-l  via-yellow-950 group-hover:via-yellow-500 w-[70%] m-auto rounded transition-all"></div>
      </div>
    </div>
  );
}
