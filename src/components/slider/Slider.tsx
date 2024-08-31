"use client";
import { sliderData } from "@/utils/data";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SideBar from "../navigation/SideBar";
import { cn } from "@/utils/utils";

export default function Slider({
  startSoundPlayed,
}: {
  startSoundPlayed: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(
              entry.target as HTMLElement
            );
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.5, // Adjust this value to determine when a section is considered "in view"
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    if (!startSoundPlayed) return; // Don't play slider sounds until the start sound has finished

    // Stop all audios first
    audioRefs.current.forEach((audio, index) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // Reset to start
      }
    });

    // Play the active audio
    if (audioRefs.current[activeIndex]) {
      audioRefs.current[activeIndex].play();
    }
  }, [activeIndex, startSoundPlayed]);

  return (
    <div className="w-full h-screen overflow-auto relative">
      <SideBar activeIndex={activeIndex} />
      {sliderData.map((i, index) => {
        const isActive = activeIndex === index;
        const textColor = isActive ? i.color : "#313131";
        return (
          <section
            key={i.id}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }} // <-- ref function returns void
            className={`bg-cover w-full h-full bg-center bg-no-repeat bg-fixed relative`}
            style={{ backgroundImage: `url('${i.image}')` }}
          >
            <div
              className={cn(
                "w-[70%] relative top-[60px] m-auto h-full  items-center text-center justify-center"
              )}
              style={{ color: textColor }}
            >
              <h1
                className={cn("text-[22px] w-full")}
                style={{ color: textColor }}
              >
                {i.year}
              </h1>
              <hr className="w-[5%] border-solid border-[#B10909] mt-[11px] m-auto" />
              <p
                className="text-[13px] text-white/10 mt-[25px]"
                style={{ color: textColor }}
              >
                {i.about}
              </p>
              <audio
                ref={(el) => {
                  audioRefs.current[index] = el;
                }} // <-- Corrected ref function
                src={i.audio}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}
