import Image from "next/image";

export default function AcmeLogo() {
  return (
    <div className="flex flex-row items-center leading-none text-white">
      <Image alt="logo" src="/logo/medi.png" width={300} height={350} />
    </div>
  );
}
