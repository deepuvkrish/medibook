// app/(app)/hospital/upgrade-card.tsx

import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export function UpgradeCard() {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-xl border border-dashed border-primary/40 bg-white dark:bg-linear-to-tl dark:from-gray-900 dark:to-gray-950 dark:hover:from-gray-800 dark:hover:to-gray-950 p-6 text-center shadow-sm h-[380px] m-4 text-gray-600 dark:text-gray-300 ">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <Lock className="h-5 w-5 text-yellow-200/40" />
      </div>

      <h3 className="text-base font-semibold">Unlock more hospitals</h3>

      <p className="mt-1 text-sm text-muted-foreground">
        Upgrade to premium to view all hospitals and contact details.
      </p>

      <Link href="/pricing" className="mt-4 ">
        <Button size="sm" className="cursor-pointer">
          Upgrade to Premium
        </Button>
      </Link>
    </div>
  );
}
