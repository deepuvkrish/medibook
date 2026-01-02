// Libraries ======================================================>
import Link from "next/link";
import localFont from "next/font/local";
// ICONS ======================================================>
import { SearchIcon } from "lucide-react";
import { GiHospitalCross, GiMedicines } from "react-icons/gi";
import { FaUserDoctor, FaFilePrescription } from "react-icons/fa6";
import { ImLab } from "react-icons/im";
import { MdBloodtype } from "react-icons/md";

// Components ======================================================>
import { HealNavLogo } from "./components/ui/healLogo";
import LandingFooter from "./components/layout/LandingFooter";
import MenuCards from "@/app/components/ui/menuCards";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/components/ui/input-group";
import { ca } from "zod/v4/locales";

// Fonts ==========================================================>
const calsans = localFont({
  src: "./fonts/CalSans-SemiBold.ttf",
});

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center py-0 md:py-0 dark:bg-linear-to-t md:dark:bg-linear-to-l   dark:from-[#e6456b] dark:to-[#000d1a] bg-linear-to-t from-blue-100 to-white">
      <div className="navBar flex w-full p-0 md:p-2 h-15 items-center justify-between px-0 md:px-3">
        <HealNavLogo w={80} h={50} />
        <div className="loginnavForm w-1/2  md:w-[200px] flex justify-center">
          <Link
            href="/login"
            className="flex px-2 py-1  md:px-5 text-gray-700 dark:text-white text-lg hover:text-[#e6456b]"
          >
            Sign in
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-10  md:mt-25 w-[70%] text-center">
        {/* <HealMainLogo w={250} h={250} /> */}
        <h1
          className={`${calsans.className} text-gray-800  dark:text-white font-extrabold text-4xl md:text-8xl`}
        >
          Global Medical Monitoring
        </h1>
        <h4 className="text-gray-700 dark:text-gray-300 mt-4 nd:mt-10 text-[14px] md:text-xl">
          Consult your doctor and know your medicines from anywhere, anyhow
          around the world.
        </h4>
      </div>
      <div className="content text-gray-700 w-full flex flex-col justify-center items-center h-100 mb-20">
        <div className="block md:w-150 w-full h-10 px-5">
          <InputGroup className="border border-gray-500 py-5 focus:outline-0 focus:border-0 focus:ring-0 rounded-3xl">
            <InputGroupInput
              placeholder="Search...hospitals, medicines, treatment, doctors..."
              className="text-gray-900 focus:outline-0 focus:border-0 focus:ring-0  text-[14px] md:text-lg py-2"
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-4 gap-4 mt-10">
          <MenuCards
            title="Find an Hospital"
            mobtitle="Hospital"
            subtitle="Seach Nearby Hospitals to you."
            icon={GiHospitalCross}
            link="/hospital"
          />
          <MenuCards
            title="Book your Doctor"
            mobtitle="Doctor"
            subtitle="Seach Nearby Doctors to you."
            link="/doctors"
            icon={FaUserDoctor}
          />
          <MenuCards
            title="Know Your Medicines"
            mobtitle="Medicine"
            subtitle="Search usage and availability."
            link="/medicines"
            icon={GiMedicines}
          />
          <MenuCards
            title="Laboratary Search"
            mobtitle="Laboratary"
            subtitle="Search Labs."
            link="/labs"
            icon={ImLab}
          />
          <MenuCards
            title="Blood Bank"
            mobtitle="Blood Bank"
            subtitle="Search Nearby Blood Banks."
            link="/labs"
            icon={MdBloodtype}
          />
          <MenuCards
            title="Records Safe"
            mobtitle="Records"
            subtitle="View-Save Records."
            link="/records"
            icon={FaFilePrescription}
          />
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}
