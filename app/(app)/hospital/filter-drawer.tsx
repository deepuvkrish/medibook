"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

export function FilterDrawer({
  activeCount,
  children,
}: {
  activeCount: number;
  children: React.ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          Filters
          {activeCount > 0 && <Badge className="ml-2">{activeCount}</Badge>}
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col">
        <div className="flex-1 overflow-auto">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
