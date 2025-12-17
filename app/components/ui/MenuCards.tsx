import React from "react";

export function MenuCards({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="notification">
      <div className="notiglow" />
      <div className="notiborderglow" />
      <div className="notititle">{title}</div>
      <div className="notibody">{subtitle}</div>
    </div>
  );
}

export function GlassCards({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative drop-shadow-xl w-48 h-48 overflow-hidden rounded-xl bg-[#3d3c3d]">
      <div className="absolute flex items-center justify-center text-white z-1 opacity-90 rounded-xl inset-0.5 bg-[#323132]">
        CARD
      </div>
      <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
    </div>
  );
}
