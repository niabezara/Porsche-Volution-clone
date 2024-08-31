"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Slider from "../slider/Slider";
import useStore from "@/utils/useStore";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const setShowLogo = useStore((state) => state.setShowLogo);
  const setShowSideBar = useStore((state) => state.setShowSideBar);
  const [startSoundPlayed, setStartSoundPlayed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 100], [0, -100]);

  const handleScroll = useCallback(() => {
    const audio = new Audio("/sounds/start.ogg");
    audio.play();
    audio.onended = () => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setShowLogo(true);
      setShowSideBar(true);
      setStartSoundPlayed(true); // Mark that the start sound has played
    };
  }, [setShowLogo, setShowSideBar]);

  const handleResize = useCallback(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    setShowSideBar(false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, setShowSideBar]);

  return (
    <main className="bg-[url('/landingpage.jpg')] overflow-y-hidden bg-cover bg-center w-full h-screen relative">
      <motion.div
        className="w-[80%] h-screen m-auto relative"
        style={{ y: y1 }}
      >
        <div className="text-[20px] font-light pt-[8%] pb-[1px] text-[#7D7D7D]">
          <span className="text-[#B13C3C] font-medium pr-[2px] text-[20px]">
            PORSCHE
          </span>
          volution
        </div>
        <span className="text-[#7D7D7D] font-light">
          Turn up the volume to enjoy full experience
        </span>
      </motion.div>
      <div className="absolute bottom-[76px] left-[50%] translate-x-[-50%]">
        <button
          className="border-[#B13C3C] border rounded-sm text-[#B13C3C] font-bold uppercase py-2 px-4 hover:bg-[#a12d2d] transition-colors hover:text-white"
          onClick={handleScroll}
        >
          start experience
        </button>
      </div>
      <div ref={sectionRef} className="h-screen bg-gray-200">
        <Slider startSoundPlayed={startSoundPlayed} />
      </div>
    </main>
  );
}
