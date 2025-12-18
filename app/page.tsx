import Link from "next/link";
import { SearchIcon } from "lucide-react";
import MediLogo from "./components/ui/med-logo";
import HealLogo from "./components/ui/heal-logo";
import LandingFooter from "./components/layout/LandingFooter";
import { MenuCards } from "./components/ui/menuCards";
import { GiHospitalCross } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { ImLab } from "react-icons/im";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/components/ui/input-group";

export default function Home() {
  return (
    <div className="flex flex-col w-full logwall items-center py-0 md:py-0">
      <div className="navBar flex w-full p-2 bg-[#0c101e] h-15 items-center justify-between px-3">
        <MediLogo w={50} h={50} />
        <div className="loginnavForm w-1/2  md:w-[200px] flex justify-center">
          <Link
            href="/login"
            className="flex px-2 py-1 rounded-sm md:rounded-sm bg-[#e6456b] md:px-5"
          >
            Sign in Here
          </Link>
        </div>
      </div>
      <div className="flex w-full justify-center items-center my-15">
        <HealLogo w={250} h={250} />
      </div>
      <div className="content text-gray-700 w-full flex flex-col justify-center items-center h-100 mb-20">
        <div className="block w-150 h-10">
          <InputGroup>
            <InputGroupInput
              placeholder="Search...hospitals, medicines, treatment, doctors..."
              className="text-white focus:outline-0 focus:border-0 focus:ring-0"
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-10">
          <MenuCards
            title="Find an Hospital"
            subtitle="Seach Nearby Hospitals to you."
            icon={GiHospitalCross}
          />
          <MenuCards
            title="Book your Doctor"
            subtitle="Seach Nearby Doctors to you."
            icon={FaUserDoctor}
          />
          <MenuCards
            title="Know Your Medicines"
            subtitle="Search usage and availability."
            icon={GiMedicines}
          />
          <MenuCards
            title="Laboratary Search"
            subtitle="Search Labs."
            icon={ImLab}
          />
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}
