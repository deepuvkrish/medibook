//app/(app)/doctors/doctor-card.tsx
"use client";
import { useState } from "react";
import { Lock, MapPin } from "lucide-react";
import Image from "next/image";
import { FaCrown } from "react-icons/fa";
import { Doctor } from "@/app/lib/types/doctors";
import { HiCheckBadge } from "react-icons/hi2";
import { BsPatchExclamationFill } from "react-icons/bs";
import { Stethoscope } from "lucide-react";

export function DoctorCard({
  doctor,
  blurred,
  canViewContact,
}: {
  doctor: Doctor;
  blurred?: boolean;
  canViewContact: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="m-4 text-gray-600 dark:text-gray-300 w-[clamp(340px,80%,300px)]  dark:hover:brightness-90 transition-all cursor-pointer group bg-white dark:bg-linear-to-tl dark:from-gray-900 dark:to-gray-950 dark:hover:from-gray-800 dark:hover:to-gray-950 rounded-lg overflow-hidden relative h-fit shadow hover:shadow-2xl hover:shadow-blue-400/30 "
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

      <div className="flex flex-col px-0 py-0 relative items-center">
        {doctor.is_verified ? (
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

        <div className="h-80 w-full overflow-hidden">
          {doctor.doc_image ? (
            <Image
              src={doctor.doc_image}
              alt={doctor.name}
              className="h-full w-full object-cover group-hover:scale-120 duration-500 object-top "
              width={150}
              height={200}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
              No Image
            </div>
          )}
        </div>

        <div className="flex items-center px-4 py-2 w-full">
          <span className="capitalize font-bold text-[16px]">
            Dr. {doctor.name}
          </span>
          <span className="uppercase text-[12px] ml-3">{doctor.degree}</span>
        </div>
        <div className="flex w-full items-center uppercase font-medium text-[12px] px-4 py-0 text-blue-200 justify-between">
          <span className="flex items-center text-gray-400">
            <Stethoscope className="mr-2 w-4 h-4" />
            {doctor.specialization}
          </span>
          <span className="text-gray-400">{doctor.hospital_name}</span>
        </div>

        <div className="flex items-center justify-between w-full px-4">
          <div className="flex items-center text-gray-600 dark:text-gray-400 uppercase  text-[11px] my-2 mx-2">
            <MapPin className="h-3 w-3 mr-1" />
            {doctor.locality}, {doctor.district}
          </div>
          <span className="flex text-[12px]">{doctor.experience} Years</span>
        </div>

        <div className="flex w-[90%] relative my-3">
          <button className="w-full px-4 py-2 rounded-sm bg-[#4f242f] hover:bg-[#913c51] cursor-pointer text-[14px] duration-300 hover:tracking-widest">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
