"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/app/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { MdLocationOn } from "react-icons/md";
import { IoMedicalOutline } from "react-icons/io5";
import { useState } from "react";
import { CiLock } from "react-icons/ci";
import { Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Hospital } from "@/app/lib/types/hospital";

export function HospitalDetailsModal({
  hospital,
  open,
  onClose,
  canViewContact,
}: {
  hospital: Hospital;
  open: boolean;
  onClose: () => void;
  canViewContact: boolean;
}) {
  if (!hospital) return null;
  const departments = hospital.departments ?? [];

  const services: string[] = Array.isArray(hospital.services)
    ? hospital.services
    : typeof hospital.services === "string"
    ? hospital.services.split(",").map((d: string) => d.trim())
    : [];
  const MAX_PILLS = 8;

  const visible = departments.slice(0, MAX_PILLS);
  const extra = departments.length - visible.length;
  const [opens, setOpens] = useState(false);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl bg-white dark:bg-[#1e1f28] md:w-full w-[96%]">
        <div className="hidden md:flex justify-between w-full ">
          {/* Image */}
          <div className="h-fit w-[30%] bg-muted group">
            {hospital.image_url ? (
              <Image
                src={hospital.image_url}
                alt={hospital.name}
                className="rounded-md h-full w-full object-cover group-hover:scale-110 duration-500 cursor-pointer"
                width={200}
                height={180}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
                No Image
              </div>
            )}
          </div>
          <div className="flex flex-col w-[65%] p-2">
            <DialogTitle>{hospital.name}</DialogTitle>
            <p className="text-[10px] md:text-[12px] text-muted-foreground leading-3 md:leading-6 mt-1">
              {hospital.address}
            </p>

            <div className="flex flex-col md:flex-row justify-baseline md:items-center my-4 space-y-1">
              <p className="font-light text-sm flex items-center">
                <MdLocationOn className="text-red-500" /> {hospital.locality} ,{" "}
                {hospital.state}
              </p>
              <Link
                href={hospital.weblink == null ? "#" : hospital.weblink}
                className="text-[12px] text-blue-400 hover:text-blue-300 md:ml-4"
              >
                🌐 {hospital.weblink == null ? "No Website" : "Visit Website"}
              </Link>
            </div>
            {/* Departments */}
            <p className="text-[12px] font-medium">Departments:</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {visible.map((dept: string) => (
                <span
                  key={dept}
                  className="text-xs px-3 py-1 rounded-full bg-[#5c2c50] text-white hover:bg-[#b55a9c] transition whitespace-nowrap cursor-pointer"
                >
                  {dept}
                </span>
              ))}

              {extra > 0 && (
                <button
                  type="button"
                  onClick={() => setOpens(true)}
                  className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 transition"
                >
                  +{extra} more
                </button>
              )}
            </div>

            <p className="text-[12px] font-medium mt-3">
              Services - Facilities - Treatments:
            </p>

            {services.length > 0 && (
              <div className="grid grid-cols-3 gap-2 py-2">
                {services.slice(0, 50).map((dept: string, i: number) => (
                  <span key={dept} className="flex text-[12px] items-center">
                    <IoMedicalOutline className="mr-1" />
                    {dept}
                  </span>
                ))}
              </div>
            )}

            <div className="px-4 py-2 space-y-3 ">
              {/* Contact */}
              <div className="space-y-1 text-sm relative cursor-not-allowed">
                <div className="absolute top-0 left-0 w-full  h-full flex justify-center items-center  bg-[#ee588524] rounded-xl">
                  <span className="flex">
                    <CiLock className="mr-2" />
                    Login to View Contact Details
                  </span>
                </div>
                <p
                  className={cn(
                    "flex items-center gap-2",
                    !canViewContact && "blur-sm select-none"
                  )}
                >
                  <Phone className="h-4 w-4" />
                  {hospital.contact_no ?? "Hidden"}
                </p>
                <p
                  className={cn(
                    "flex items-center gap-2",
                    !canViewContact && "blur-sm select-none"
                  )}
                >
                  <Mail className="h-4 w-4" />
                  {hospital.contact_mail ?? "Hidden"}
                </p>
              </div>
            </div>

            <Dialog open={opens} onOpenChange={setOpens}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Departments</DialogTitle>
                </DialogHeader>

                <div className="flex flex-wrap gap-2 mt-4 ">
                  {departments.map((dept: string) => (
                    <span
                      key={dept}
                      className="text-[12px] px-3 py-1 rounded-full bg-[#5c2c50] text-white hover:bg-[#b55a9c] cursor-pointer"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="md:hidden flex flex-col justify-between w-full ">
          <div className="flex">
            <div className="h-fit w-[30%] bg-muted group">
              {hospital.image_url ? (
                <Image
                  src={hospital.image_url}
                  alt={hospital.name}
                  className="rounded-md h-full w-full object-cover group-hover:scale-110 duration-500 cursor-pointer"
                  width={200}
                  height={180}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
                  No Image
                </div>
              )}
            </div>
            <div className="flex flex-col w-[65%] p-2">
              <DialogTitle>{hospital.name}</DialogTitle>
              <p className="text-[10px] md:text-[12px] text-muted-foreground leading-3 md:leading-6 mt-1">
                {hospital.address}
              </p>
            </div>
          </div>
          <div className="flex w-full">
            <Link
              href={
                hospital.googlemaplink == null ? "#" : hospital.googlemaplink
              }
              className="flex items-center text-[12px] text-green-600 hover:text-blue-300 md:ml-4"
            >
              <MdLocationOn className="text-red-500 mr-1" />
              {hospital.googlemaplink == null
                ? "No map"
                : "View in Google maps"}
            </Link>
            <Link
              href={hospital.weblink == null ? "#" : hospital.weblink}
              className="text-[12px] text-cyan-700 hover:text-blue-300 ml-6"
            >
              🌐 {hospital.weblink == null ? "No Website" : "Visit Website"}
            </Link>
          </div>

          <div className="flex flex-col w-full mt-3">
            <p className="text-[12px] font-medium">Departments:</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {visible.map((dept: string) => (
                <span
                  key={dept}
                  className="text-[10px] px-2 py-[3px] rounded-full bg-[#fad7f1] dark:bg-[#5c2c50] text-pink-900 dark:text-white hover:bg-[#b55a9c] transition whitespace-nowrap cursor-pointer"
                >
                  {dept}
                </span>
              ))}

              {extra > 0 && (
                <button
                  type="button"
                  onClick={() => setOpens(true)}
                  className="text-xs px-3 py-1 rounded-full bg-white dark:bg-gray-100 text-blue-700 underline dark:text-gray-600 cursor-pointer hover:bg-gray-200 transition"
                >
                  +{extra} more
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col w-full mt-5">
            <p className="text-[12px] font-medium mt-3">
              Services - Facilities - Treatments:
            </p>

            {services.length > 0 && (
              <div className="grid grid-cols-2 gap-2 py-2">
                {services.slice(0, 50).map((dept: string, i: number) => (
                  <span
                    key={dept}
                    className="flex text-[12px] items-center text-gray-400 dark:text-gray-50"
                  >
                    <IoMedicalOutline className="mr-1" />
                    {dept}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col w-full">
            <div className="px-4 py-2 space-y-3 ">
              {/* Contact */}
              <div className="space-y-1 text-sm relative cursor-not-allowed">
                <div className="absolute top-0 left-0 w-full  h-full flex justify-center items-center  bg-[#ee588524] rounded-xl">
                  <span className="flex">
                    <CiLock className="mr-2" />
                    Login to View Contact Details
                  </span>
                </div>
                <p
                  className={cn(
                    "flex items-center gap-2",
                    !canViewContact && "blur-sm select-none"
                  )}
                >
                  <Phone className="h-4 w-4" />
                  {hospital.contact_no ?? "Hidden"}
                </p>
                <p
                  className={cn(
                    "flex items-center gap-2",
                    !canViewContact && "blur-sm select-none"
                  )}
                >
                  <Mail className="h-4 w-4" />
                  {hospital.contact_mail ?? "Hidden"}
                </p>
              </div>
            </div>
          </div>

          <Dialog open={opens} onOpenChange={setOpens}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Departments</DialogTitle>
              </DialogHeader>

              <div className="flex flex-wrap gap-2 mt-4 ">
                {departments.map((dept: string) => (
                  <span
                    key={dept}
                    className="text-[12px] px-3 py-1 rounded-full bg-[#5c2c50] text-white hover:bg-[#b55a9c] cursor-pointer"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}
