"use client";
import { cn } from "@/utils/utils";
import React from "react";
import useStore from "@/utils/useStore";

export default function NavBar() {
  const showLogo = useStore((state) => state.showLogo);

  return (
    <div
      className={cn(
        `fixed top-0 bg-white  left-0 w-full transition-transform duration-500 ${
          showLogo ? "z-[99] translate-y-0" : "-translate-y-[90%] z-0"
        }`
      )}
    >
      <div className="text-[17px] p-2 font-light text-[#7D7D7D]">
        <span className="text-black font-medium pr-[4px] text-[17px]">
          PORSCHE
        </span>
        volution
      </div>
    </div>
  );
}
