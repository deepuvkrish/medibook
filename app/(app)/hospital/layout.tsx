//hospital/layout.tsx

import { ReactNode, Suspense } from "react";
import { AppLayout } from "@/app/components/layout/AppLayout";
import { HospitalFiltersClient } from "./hospital-filters-client";
import { Button } from "@/app/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";

function FiltersSuspense() {
  return (
    <Suspense
      fallback={
        <div className="p-4 text-sm text-muted-foreground">
          Loading filters…
        </div>
      }
    >
      <HospitalFiltersClient
        states={["Kerala", "Tamil Nadu", "Karnataka", "Haryana"]}
        departments={["Cardiology", "Orthopedics", "Neurology"]}
      />
    </Suspense>
  );
}

export default function HospitalLayout({ children }: { children: ReactNode }) {
  return (
    <AppLayout
      sidebar={
        <>
          {/* DESKTOP */}
          <div className="hidden md:block">
            <FiltersSuspense />
          </div>

          {/* MOBILE */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-[85%] sm:w-[380px]">
                <FiltersSuspense />
              </SheetContent>
            </Sheet>
          </div>
        </>
      }
    >
      {children}
    </AppLayout>
  );
}
