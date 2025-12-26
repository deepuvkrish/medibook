"use client";
// Fonts ===============================================>
import { inter } from "@/app/components/ui/fonts";

// Icons ===============================================>
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { IoMdCheckmark } from "react-icons/io";

// Libraries ===============================================>
import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";

// Components ===============================================>
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

// Main Function ===============================================>
export default function SignUpForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-6">
      <h5 className="text-xl text-center font-medium text-white">Sign up</h5>

      <div>
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-white"
        >
          Username
        </label>
        <div className="relative">
          <input
            type="text"
            name="username"
            id="username"
            className="bg-[#010d1a85] text-gray-100 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 pl-10 loginput"
            placeholder="john doe"
            required
          />
          <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-200 peer-focus:text-blue-400 logicon" />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-white"
        >
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            id="email"
            className="bg-[#010d1a85] text-gray-100 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 pl-10 loginput"
            placeholder="name@company.com"
            required
          />
          <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-200 peer-focus:text-blue-400 logicon" />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-white"
        >
          Your password
        </label>
        <div className="relative">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-[#010d1a85] text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10  dark:placeholder-gray-400 loginput"
            required
            minLength={6}
          />
          <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-blue-400 logicon" />
        </div>
      </div>
      <div>
        <label
          htmlFor="confirmpassword"
          className="block mb-2 text-sm font-medium text-white"
        >
          Confirm password
        </label>
        <div className="relative">
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            placeholder="••••••••"
            className="bg-[#010d1a85] text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10  dark:placeholder-gray-400 loginput"
            required
            minLength={6}
          />
          <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-blue-400 logicon" />
        </div>
      </div>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <div className="flex flex-col items-start">
        <div className="checkbox-container mb-4">
          <label className="ios-checkbox red mr-2">
            <input type="checkbox" id="remember" value="" />
            <div className="checkbox-wrapper">
              <div className="checkbox-bg" />
              <IoMdCheckmark className="checkbox-icon" />
            </div>
          </label>
          I agree to the terms and Conditions
        </div>

        <div className="flex w-full justify-between items-center">
          <Link href="#" className="text-sm text-[#ff7aac] hover:underline">
            Terms & Conditions
          </Link>
          <Link href="#" className="text-sm text-[#ff7aac] hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-[#e6456b] hover:bg-[#f07390] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center cursor-pointer"
        aria-disabled={isPending}
      >
        Sign Up <ArrowRightIcon className="ml-2 h-5 w-5 text-gray-50" />
      </button>

      <div className="flex h-8 items-end space-x-1">
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>

      <div className="text-sm font-medium text-gray-100 border-t border-gray-700 pt-5">
        Already Have an Account?{" "}
        <Link href="/login" className="text-[#ff7aac] hover:underline ">
          Log in
        </Link>
      </div>
    </form>
  );
}
