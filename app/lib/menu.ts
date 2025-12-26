import {
  Calendar,
  Home,
  ClipboardPlus,
  Settings,
  FolderClosed,
  ClipboardClock,
} from "lucide-react";
import { CiSearch } from "react-icons/ci";

const dashboardmenuitems = [
  {
    title: "Search",
    url: "/dashboard",
    icon: CiSearch,
  },
  {
    title: "Records",
    url: "#",
    icon: FolderClosed,
  },
  {
    title: "History",
    url: "#",
    icon: ClipboardPlus,
  },
  {
    title: "Appointments",
    url: "#",
    icon: ClipboardClock,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export { dashboardmenuitems };
