// app/(app)/doctors/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import { auth } from "@/auth";
import { getDoctors } from "@/app/lib/data/doctors";
import { Suspense } from "react";
import { UpgradeCard } from "@/app/components/ui/upgrade-card";
import { DoctorCard } from "./doctor-card";
import { DoctorSkeleton } from "./doctor-skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    country?: string;
    state?: string;
    district?: string;
    specialization?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const session = await auth();

  const { visible, hasMore, canViewContact } = await getDoctors(
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
            <BreadcrumbPage className="text-gray-500">Doctors</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-semibold">Doctors</h1>

      <Suspense fallback={<DoctorSkeleton />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((doctor) => (
            <DoctorCard
              key={doctor.doctor_id}
              doctor={doctor}
              canViewContact={canViewContact}
            />
          ))}

          {hasMore && <UpgradeCard />}
        </div>
      </Suspense>
    </div>
  );
}
