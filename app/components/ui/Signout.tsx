"use server";

import { signOut } from "@/auth";
import { PowerIcon } from "lucide-react";

export default async function Signout() {
  return (
    <form
      action={async () => {
        await signOut({ redirectTo: "/" });
      }}
    >
      <button className="flex w-full h-12 grow items-center justify-center gap-2 text-sm font-medium border-t">
        <PowerIcon className="w-6" />
        <div className="block">Sign Out</div>
      </button>
    </form>
  );
}
