"use client";
import { useState } from "react";
import Link from "next/link";
import { Lock, MapPin } from "lucide-react";
import { HospitalDetailsModal } from "./hospital-details-modal";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { SiGooglemaps } from "react-icons/si";
import { FaCrown } from "react-icons/fa";
import { Hospital } from "@/app/lib/types/hospital";
import { FaStar } from "react-icons/fa";
import { HiCheckBadge } from "react-icons/hi2";
import { BsPatchExclamationFill } from "react-icons/bs";
import { PiHospitalThin } from "react-icons/pi";

export function HospitalCard({
  hospital,
  blurred,
  canViewContact,
}: {
  hospital: Hospital;
  blurred?: boolean;
  canViewContact: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative m-4 text-gray-600 dark:text-gray-300 w-[clamp(260px,80%,300px)]  dark:hover:brightness-90 transition-all cursor-pointer group bg-white dark:bg-linear-to-tl dark:from-gray-900 dark:to-gray-950 dark:hover:from-gray-800 dark:hover:to-gray-950 rounded-lg overflow-hidden h-[380px] shadow "
      onClick={() => setOpen(true)}
    >
      {/* Blur Overlay */}
      {blurred && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm cursor-not-allowed">
          <Lock className="h-6 w-6 mb-2 text-muted-foreground" />
          <button className="PremiumBtn">
            <FaCrown className="logoIcon" />
            GO PREMIUM
          </button>
        </div>
      )}

      <div className="flex flex-col px-0 py-0 relative">
        {hospital.verified ? (
          <div
            className="flex items-center absolute right-2 top-0 py-1 px-1 rounded-bl-md rounded-br-md bg-[#ffffff]/90 text-gray-500  text-[12px] font-medium z-10 shadow-sm shadow-gray-400"
            title="verified"
          >
            <HiCheckBadge className="text-lime-500 text-[15px]" />
          </div>
        ) : (
          <div
            className="flex items-center absolute right-2 top-0 py-1 px-1 rounded-bl-md rounded-br-md bg-[#ffffff]/90 text-gray-500  text-[12px] font-medium z-10 shadow-sm shadow-gray-400"
            title="Not Verified"
          >
            <BsPatchExclamationFill className="text-blue-400 text-[15px]" />
          </div>
        )}

        <div className="h-40 w-full overflow-hidden">
          {hospital.image_url ? (
            <Image
              src={hospital.image_url}
              alt={hospital.name}
              className="h-full w-full object-cover group-hover:scale-120 duration-500 "
              width={200}
              height={150}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
              No Image
            </div>
          )}
        </div>

        <div className="uppercase font-bold text-sm px-2 py-1">
          {hospital.name}
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400 uppercase tracking-widest text-[11px] m-1">
          <MapPin className="h-3 w-3 mr-1" />
          {hospital.locality}, {hospital.district}
        </div>
        <div className="flex w-[80%] justify-between text-gray-600 dark:text-gray-400  mt-2 p-2">
          {hospital.weblink == null ? (
            <p className="flex items-center font-light uppercase text-[10px]">
              <FiExternalLink className="mr-1" /> No Website
            </p>
          ) : (
            <Link
              href={hospital.weblink}
              target="__blank"
              className="font-light uppercase text-[11px] flex items-center hover:text-blue-400 tracking-normal hover:tracking-wide duration-300"
            >
              <FiExternalLink className="mr-1" /> Visit Website
            </Link>
          )}

          {hospital.googlemaplink == null ? (
            <p className="flex items-center font-light uppercase text-[10px]">
              <SiGooglemaps className="mr-1" /> No Maps
            </p>
          ) : (
            <Link
              href={hospital.googlemaplink}
              target="__blank"
              className="font-light uppercase text-[11px] flex items-center hover:text-red-400 tracking-normal hover:tracking-wide duration-300"
            >
              <SiGooglemaps className="mr-1" /> Find in Map
            </Link>
          )}
        </div>
        <div className="flex items-center">
          <div className="flex items-center px-3 text-sm">
            <FaStar className="mr-1 text-blue-400" /> {hospital.rating}
          </div>

          <div className="flex items-center px-3 text-[10px] uppercase">
            <PiHospitalThin className="mr-1 text-[14px]" /> {hospital.type}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="px-4 py-2 space-y-3 ">
        <HospitalDetailsModal
          hospital={hospital}
          open={open}
          onClose={() => setOpen(false)}
          canViewContact={canViewContact}
        />
      </div>

      <div className="h-2 w-full bg-linear-to-l via-blue-400 dark:via-yellow-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0"></div>
      <div className="h-0.5 group-hover:w-full bg-linear-to-l via-gray-300 group-hover:via-blue-400  dark:via-yellow-950 dark:group-hover:via-yellow-500 w-full m-auto rounded transition-all absolute bottom-0"></div>
    </div>
  );
}
