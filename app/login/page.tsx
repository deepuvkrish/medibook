import Login from "@/app/components/authentications/Login";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex w-full h-screen justify-center md:items-center items-baseline pt-10 md:pt-0">
      <Suspense>
        <Login />
      </Suspense>
    </div>
  );
}
