// Components ======================================================>
import MediLogo from "@/app/components/ui/med-logo";
import HealLogo from "@/app/components/ui/heal-logo";
import MenuCards from "@/app/components/ui/menuCards";
import { signOut } from "@/auth";
import bcrypt from "bcrypt";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/components/ui/input-group";

// ICONS ======================================================>
import { SearchIcon } from "lucide-react";
import { GiHospitalCross } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { ImLab } from "react-icons/im";

export default async function page() {
  console.log(await bcrypt.hash("agetdata@787", 10));
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full h-full items-center py-0 md:py-0">
        <div className="content text-gray-700 w-full flex flex-col justify-center items-center h-100 mb-20">
          <div className="block md:w-150 w-full h-15 px-5">
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
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-10">
            <MenuCards
              title="Find an Hospital"
              subtitle="Seach Nearby Hospitals to you."
              icon={GiHospitalCross}
              link="/hospital"
            />
            <MenuCards
              title="Book your Doctor"
              subtitle="Seach Nearby Doctors to you."
              link="/hospital"
              icon={FaUserDoctor}
            />
            <MenuCards
              title="Know Your Medicines"
              subtitle="Search usage and availability."
              link="/hospital"
              icon={GiMedicines}
            />
            <MenuCards
              title="Laboratary Search"
              subtitle="Search Labs."
              link="/hospital"
              icon={ImLab}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
