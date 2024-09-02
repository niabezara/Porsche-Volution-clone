"use client";
import { sliderData } from "@/utils/data";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SideBar from "../navigation/SideBar";
import { cn } from "@/utils/utils";
import { Icons } from "../shared/Icons";
import SliderCard from "./sliderCard";

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
            <SliderCard
              i={i}
              index={index}
              textColor={textColor}
              isMuted={isMuted}
              toggleMute={toggleMute}
              audioRefs={audioRefs}
            />
          </section>
        );
      })}
    </div>
  );
}
