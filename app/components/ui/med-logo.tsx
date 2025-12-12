import Image from "next/image";

export default function AcmeLogo() {
  return (
    <div className="flex flex-row justify-center items-center leading-none text-white">
      <Image
        alt="logo"
        src="/logo/medi.png"
        width={300}
        height={350}
        className="h-20 w-20 md:h-40 md:w-40"
      />
    </div>
  );
}
