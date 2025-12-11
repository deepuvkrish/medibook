import MedLogo from "@/app/components/ui/med-logo";
import LoginForm from "@/app/components/ui/login_form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative  flex md:flex-row w-full flex-col justify-around items-center">
        <div className="flex items-end p-3 w-3/4">
          <MedLogo />
        </div>
        <div className="w-1/4">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
