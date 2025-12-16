import Image from "next/image";

export default function MediLogo() {
  return (
    <div className="flex flex-row justify-center items-center leading-none text-white">
      <Image
        alt="logo"
        src="/logo/heal-12.png"
        width={100}
        height={100}
        priority
      />
    </div>
  );
}
