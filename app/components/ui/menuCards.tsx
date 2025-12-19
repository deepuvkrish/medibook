import React from "react";
import { ComponentType } from "react";
import Link from "next/link";
export default function MenuCards({
  title,
  subtitle,
  link,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  link: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Link className="notification relative md:w-[18rem] w-45" href={link}>
      <div className="notiglow" />
      <div className="notiborderglow" />
      <div className="notititle text-[15px] md:text-[20px]">{title}</div>
      <div className="notibody text-[13px] md:text-[15px] px-0 py-2 md:px-0 md:py-5">
        {subtitle}
      </div>
      <Icon className="text-3xl md:text-5xl absolute top-2 right-2 menuCardIcn text-gray-400" />
    </Link>
  );
}
