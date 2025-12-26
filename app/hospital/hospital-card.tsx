"use client";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Lock, MapPin, Phone, Mail } from "lucide-react";
import { HospitalDetailsModal } from "./hospital-details-modal";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

export function HospitalCard({
  hospital,
  blurred,
  canViewContact,
}: {
  hospital: any;
  blurred?: boolean;
  canViewContact: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-sm transition hover:shadow-md cursor-pointer hover:bg-gray-600 group">
      {/* Blur Overlay */}
      {blurred && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm cursor-not-allowed">
          <Lock className="h-6 w-6 mb-2 text-muted-foreground" />
          <p className="text-xl font-medium text-yellow-600">
            Premium subscription required
          </p>
        </div>
      )}

      {/* Image */}
      <div className="h-40 w-full bg-muted overflow-hidden">
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

      {/* Content */}
      <div className="px-4 py-2 space-y-3">
        <h2 className="font-semibold text-[16px] text-foreground h-10">
          {hospital.name}
        </h2>

        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {hospital.locality}, {hospital.district}
        </p>

        {/* Contact */}
        <div className="space-y-1 text-sm">
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

        <div className="flex w-full border-t border-gray-500">
          <div className="Readmorecontainer ">
            <button
              onClick={() => setOpen(true)}
              className="button border border-yellow-300"
            >
              View details
            </button>
            <FaArrowRight className="arrow first" />
            <FaArrowRight className="arrow second" />
            <FaArrowRight className="arrow third" />
            <FaArrowRight className="arrow four" />
          </div>
        </div>

        <HospitalDetailsModal
          hospital={hospital}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
}
