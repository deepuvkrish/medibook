//app/(app)/hospital/page.tsx
export const dynamic = "force-dynamic";
import Link from "next/link";
import { auth } from "@/auth";
import { getHospitalsForUser } from "@/app/lib/data/hospitals";
import { HospitalCard } from "./hospital-card";
import { HospitalSkeleton } from "./hospital-skeleton";
import { Suspense } from "react";
import { UpgradeCard } from "./upgrade-card";
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
  searchParams: Promise<{
    q?: string;
    state?: string;
    department?: string;
    distance?: string;
    lat?: string;
    lng?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const session = await auth();
  const { visible, hasMore, canViewContact } = await getHospitalsForUser(
    session?.user?.id,
    resolvedSearchParams
  );

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/"
                className="text-gray-800 dark:text-white dark:hover:text-blue-400"
              >
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-500">Hospitals</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-semibold">Hospitals</h1>
      <Suspense fallback={<HospitalSkeleton />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((h) => (
            <HospitalCard
              key={h.id}
              hospital={h}
              canViewContact={canViewContact}
              blurred={false}
            />
          ))}
          {/* 🔒 PREMIUM PAYWALL CARD */}
          {hasMore && <UpgradeCard />}
        </div>
      </Suspense>
    </div>
  );
}
