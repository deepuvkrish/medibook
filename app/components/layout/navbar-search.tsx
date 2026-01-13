"use client";

import { Input } from "@/app/components/ui/input";
import { IoIosSearch } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function NavbarSearch({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("q") ?? "");

  useEffect(() => {
    setValue(params.get("q") ?? "");
  }, [params]);

  useEffect(() => {
    const t = setTimeout(() => {
      const sp = new URLSearchParams(params.toString());
      if (!value) sp.delete("q");
      else sp.set("q", value);

      router.replace(`?${sp.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className="relative w-full max-w-md">
      <IoIosSearch className="absolute left-3 top-3 text-gray-500" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  );
}
