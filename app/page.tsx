import Image from "next/image";
import Login from "./components/authentications/Login";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-zinc-50 font-sans dark:bg-black w-full md:px-5 px-1">
      <main className="flex md:flex-row flex-col md:w-[90%] w-full justify-between items-center md:px-10 px-3">
        <div className="logo w-3/4 md:justify-baseline justify-center md:items-baseline items-center flex flex-col min-h-full pl-0 md:pl-20">
          <Image
            src="/logo/medi.png"
            width={500}
            height={700}
            alt="logo"
            className="h-[100px] md:h-[300px] w-auto"
          />
          <span className="md:text-5xl text-xl my-2 block font-bold capitalize dark:text-invert">
            Medi
            <span className="text-[#2d79f3]">Gram</span>
          </span>
        </div>
        <div className="w-full md:w-fit">
          <Login />
        </div>
      </main>
      <div className="flex justify-around w-full mt-30">
        <span className="block uppercase text-[10px] hover:text-[#2d79f3] cursor-pointer md:text-md text-gray-500">
          About us
        </span>
        <span className="block uppercase text-[10px] hover:text-[#2d79f3] cursor-pointer md:text-md text-gray-500">
          FAQs
        </span>
        <span className="block uppercase text-[10px] hover:text-[#2d79f3] cursor-pointer md:text-md text-gray-500">
          Contact us
        </span>
        <span className="block uppercase text-[10px] hover:text-[#2d79f3] cursor-pointer md:text-md text-gray-500">
          Career us
        </span>
      </div>
    </div>
  );
}
