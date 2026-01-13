"use client";

import { ReactNode } from "react";
import { AppLayout } from "@/app/components/layout/AppLayout";
import { HospitalFiltersClient } from "./hospital-filters-client";
import { Button } from "@/app/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";

export default function HospitalLayout({ children }: { children: ReactNode }) {
  const filters = (
    <HospitalFiltersClient
      states={["Kerala", "Tamil Nadu", "Karnataka", "Haryana"]}
      departments={["Cardiology", "Orthopedics", "Neurology"]}
    />
  );

  return (
    <AppLayout
      sidebar={
        <>
          {/* DESKTOP */}
          <div className="hidden md:block">{filters}</div>

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

              <SheetContent side="left">{filters}</SheetContent>
            </Sheet>
          </div>
        </>
      }
    >
      {children}
    </AppLayout>
  );
}
