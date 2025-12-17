import Image from "next/image";
import LoginForm from "@/app/components/ui/login_form";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import { Suspense } from "react";
import MediLogo from "@/app/components/ui/med-logo";

export default function page() {
  return (
    <div className="flex flex-col w-full logwall items-center py-3 md:py-0">
      <div className="absolute md:hidden block">
        <MediLogo w={100} h={100} />
      </div>

      <main className="logwall flex min-h-screen flex-row p-6  w-full justify-between items-center">
        <div className="hidden md:flex ">
          <div className="flex flex-col items-center w-full p-4 text-center sm:p-8 ">
            <Image
              src="/logo/heal-12.png"
              width={400}
              height={300}
              className="hidden md:block"
              alt="logo"
            />
            <h5 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
              Connect fast, Get your treatments at your fingertips from anywhere
            </h5>
            <p className="mb-5 text-base text-gray-500 sm:text-sm dark:text-gray-400">
              Stay safe and Healthy, and move Life forward with Ayur on iOS &
              Android. Download the app today.
            </p>
            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="w-full sm:w-auto bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5  dark:hover:bg-[#4ca0f5] dark:focus:ring-gray-700"
              >
                <FaApple className="text-xl mr-3" />
                <div className="text-left rtl:text-right">
                  <div className="mb-1 text-[9px] text-pink-200">
                    Download on the
                  </div>
                  <div className="-mt-1 font-sans text-sm font-semibold">
                    Mac App Store
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="w-full sm:w-auto bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:hover:bg-[#4ca0f5] dark:focus:ring-gray-700"
              >
                <BiLogoPlayStore className="text-xl mr-3" />
                <div className="text-left rtl:text-right">
                  <div className="mb-1 text-[9px] text-pink-200">Get in on</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">
                    Google Play
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="h-[500px] w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-[#1e2938a1] dark:border-gray-700">
          <Suspense fallback={<LoginSkeleton />}>
            <LoginForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

function LoginSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-muted rounded" />
      <div className="h-10 bg-muted rounded" />
      <div className="h-10 bg-muted rounded" />
      <div className="h-10 bg-muted rounded" />
    </div>
  );
}
