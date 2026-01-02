import React from "react";
import { ComponentType } from "react";
import Link from "next/link";
export default function MenuCards({
  title,
  mobtitle,
  subtitle,
  link,
  icon: Icon,
}: {
  title: string;
  mobtitle: string;
  subtitle: string;
  link: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      className="notification md:dark:bg-[#0000003d] md:bg-white relative md:w-[18rem] w-20 justify-center items-center md:justify-baseline md:items-baseline after:bg-none md:dark:after:bg-[#e6456b] md:after:bg-[#5faaff]  before:bg-[#afd4f86d] dark:before:bg-[#ffd2e354] group"
      href={link}
    >
      <Icon className="text-4xl md:text-5xl relative md:absolute md:top-2 md:right-2 text-gray-400  group-hover:text-[#5faaff]  dark:group-hover:text-[#e6456b]" />
      <div className="hidden md:block notititle text-[20px] dark:text-white text-gray-600">
        {title}
      </div>
      <div className="block md:hidden text-[15px] text-[#3f3f3f] dark:text-white font-bold mt-2 z-5">
        {mobtitle}
      </div>
      <div className="hidden md:block notibody text-[13px] md:text-[15px] text-[#262626]  dark:text-gray-200 px-0 py-2 md:px-0 md:py-5">
        {subtitle}
      </div>
    </Link>
  );
}
