import Link from "next/link";
import { SearchIcon } from "lucide-react";
import MediLogo from "./components/ui/med-logo";
import LandingFooter from "./components/layout/LandingFooter";
import { Input } from "@/app/components/ui/input";

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

      <div className="content  text-gray-700 w-full flex justify-center items-center min-h-[600px]">
        <div className="block w-90 h-10">
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}
