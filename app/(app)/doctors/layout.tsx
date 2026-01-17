//app/(app)/doctors/layout.tsx

import { ReactNode, Suspense } from "react";
import { AppLayout } from "@/app/components/layout/AppLayout";
import { DoctorFiltersClient } from "./doctor-filters-client";
import { Button } from "@/app/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

import { COUNTRIES } from "@/app/lib/codelists/countries";
import { STATES_BY_COUNTRY } from "@/app/lib/codelists/states";

function Filters() {
  return (
    <Suspense fallback={<div className="p-4 text-sm">Loading filters…</div>}>
      <DoctorFiltersClient
        countries={COUNTRIES}
        statesByCountry={STATES_BY_COUNTRY}
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
          {/* Desktop */}
          <div className="hidden md:block">
            <Filters />
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Filters />
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
