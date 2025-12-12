import MedLogo from "@/app/components/ui/med-logo";
import LoginForm from "@/app/components/ui/login_form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen w-full">
      <div className="relative flex md:flex-row w-full flex-col md:justify-around  justify-center items-center">
        <div className="flex md:items-end items-center justify-center p-3 md:w-3/4 w-full">
          <MedLogo />
        </div>
        <div className="md:w-1/4 w-full flex justify-center items-center">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
