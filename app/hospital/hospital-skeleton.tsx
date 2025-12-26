import { Skeleton } from "@/app/components/ui/skeleton";

export function HospitalSkeleton() {
  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      <Skeleton className="h-40 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
