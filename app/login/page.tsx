import Login from "@/app/components/authentications/Login";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Suspense>
        <Login />
      </Suspense>
    </div>
  );
}
