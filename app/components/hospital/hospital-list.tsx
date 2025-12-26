"use client";

import Image from "next/image";
import clsx from "clsx";

export default function HospitalList({
  hospitals,
  isLoggedIn,
}: {
  hospitals: any[];
  isLoggedIn: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {hospitals.map((hospital, index) => {
        const locked = index >= 10;

        return (
          <div
            key={hospital.id}
            className={clsx(
              "relative border rounded-lg p-4 bg-white shadow",
              locked && "blur-sm pointer-events-none"
            )}
          >
            <Image
              src={hospital.image_url || "/hospital-placeholder.png"}
              alt={hospital.name}
              width={400}
              height={200}
              className="rounded"
            />

            <h3 className="text-lg font-semibold mt-2">{hospital.name}</h3>

            <p className="text-sm text-gray-500">
              {hospital.locality}, {hospital.district}
            </p>

            {/* Contact Info */}
            <div className="mt-3 text-sm">
              <p>
                📞{" "}
                {isLoggedIn ? (
                  hospital.contact_no
                ) : (
                  <span className="blur-sm">XXXXXXXXXX</span>
                )}
              </p>

              <p>
                ✉️{" "}
                {isLoggedIn ? (
                  hospital.contact_mail
                ) : (
                  <span className="blur-sm">hidden@email.com</span>
                )}
              </p>
            </div>

            {locked && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                <span className="text-sm font-semibold text-gray-700">
                  🔒 Premium subscription required
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
