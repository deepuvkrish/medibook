import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

export function HospitalCard({
  hospital,
  blurred,
  canViewContact,
}: {
  hospital: any;
  blurred?: boolean;
  canViewContact: boolean;
}) {
  return (
    <div className="relative rounded-xl border p-4 shadow-sm bg-white">
      {/* Blur Overlay */}
      {blurred && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center
                        bg-white/80 backdrop-blur-sm rounded-xl"
        >
          <Lock className="h-6 w-6 mb-2 text-muted-foreground" />
          <p className="text-sm font-medium">Premium subscription required</p>
        </div>
      )}

      <h2 className="font-semibold text-gray-500">
        {hospital.name || "NO NAME"}
      </h2>
      <p className="text-sm text-muted-foreground">{hospital.locality}</p>

      {/* Contact Info */}
      <div className="mt-3 space-y-1 text-sm">
        <p className={cn(!canViewContact && "blur-sm select-none")}>
          📞 {canViewContact ? hospital.contact_no : "Login to view"}
        </p>
        <p className={cn(!canViewContact && "blur-sm select-none")}>
          ✉️ {hospital.contact_mail ?? "Hidden"}
        </p>
      </div>
    </div>
  );
}
