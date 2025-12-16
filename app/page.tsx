import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/app/lib/links";
import LoginForm from "./components/ui/login_form";
import MediLogo from "./components/ui/med-logo";
import LandingFooter from "./components/layout/LandingFooter";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

export default function Home() {
  return (
    <div className="flex flex-col w-full logwall items-center py-3 md:py-0">
      <div className="absolute md:hidden block">
        <MediLogo />
      </div>

      <main className="flex min-h-screen flex-row p-6  w-full justify-between items-center">
        <div className="hidden md:flex ">
          <div className="flex flex-col items-center w-full p-4 text-center sm:p-8 ">
            <Image
              src="/logo/ayurlogo.png"
              width={300}
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
                className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <FaApple />
                <div className="text-left rtl:text-right">
                  <div className="mb-1 text-xs">Download on the</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">
                    Mac App Store
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <BiLogoPlayStore />
                <div className="text-left rtl:text-right">
                  <div className="mb-1 text-xs">Get in on</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">
                    Google Play
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="h-[500px] w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <LoginForm />
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
