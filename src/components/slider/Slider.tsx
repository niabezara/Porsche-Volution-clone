"use client";
import { sliderData } from "@/utils/data";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SideBar from "../navigation/SideBar";
import { cn } from "@/utils/utils";
import { Icons } from "../shared/Icons";

export default function Slider({
  startSoundPlayed,
}: {
  startSoundPlayed: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
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
      audioRefs.current[activeIndex].muted = isMuted;
    }
  }, [activeIndex, startSoundPlayed, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.muted = !isMuted;
      }
    });
  };

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
                "w-[50%] relative top-[0px] m-auto h-full items-center text-center justify-center"
              )}
              style={{ color: textColor }}
            >
              <div className="top-[60px] relative">
                <h1
                  className={cn("text-[29px] w-full")}
                  style={{ color: textColor }}
                >
                  {i.title}
                </h1>
                <hr className="w-[5%] border-solid border-[#B10909] mt-[11px] m-auto" />
                <div
                  className="text-[15px] mt-[25px] text-center w-full"
                  style={{ color: textColor }}
                >
                  <span className="text-[20px] font-bold">{i.span}</span>
                  {i.about}
                </div>
              </div>
              <audio
                ref={(el) => {
                  audioRefs.current[index] = el;
                }} // <-- Corrected ref function
                src={i.audio}
                loop
              />
            </div>
            <div
              className="fixed flex justify-center left-4 items-center bottom-[25px] z-[999] bg-black/5 px-[5px] py-[7px] cursor-pointer h-[30px] w-[30px]"
              onClick={toggleMute}
            >
              {isMuted ? (
                <Icons.speakerCross color={textColor} />
              ) : (
                <Icons.speaker />
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
