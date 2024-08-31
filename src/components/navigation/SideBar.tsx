"use client";
import { sliderData } from "@/utils/data";
import useStore from "@/utils/useStore";
import { cn } from "@/utils/utils";
import React from "react";

interface SideBarProps {
  activeIndex: number;
}

const SideBar: React.FC<SideBarProps> = ({ activeIndex }) => {
  const showSideBar = useStore((state) => state.showSideBar);
  const activeColor = sliderData[activeIndex]?.color || "#000";
  return (
    <ul
      className={cn(
        "fixed z-[999] top-[50%] mt-[-215px] text-center transition-opacity duration-1000",
        showSideBar ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      style={{ color: activeColor }}
    >
      {sliderData.map((year, index) => (
        <li
          key={year.id}
          style={{
            borderBottomColor: activeColor, //  active color to border
          }}
          className={cn(
            `block px-[10px] leading-[37px] font-semibold text-left`,
            activeIndex === year.id - 1 ? "border-b-4 font-bold" : "border-b-2"
          )}
        >
          {year.year}
        </li>
      ))}
    </ul>
  );
};

export default SideBar;
