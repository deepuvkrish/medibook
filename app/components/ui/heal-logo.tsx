import Image from "next/image";

export default function HealLogo({ w, h }: { w: number; h: number }) {
  return (
    <div className="flex flex-row justify-center items-center leading-none text-white">
      <Image
        alt="logo"
        src="/logo/heal-logo.png"
        width={w}
        height={h}
        priority
      />
    </div>
  );
}
