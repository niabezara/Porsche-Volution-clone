"use client";
import React from "react";
import Hero from "@/components/hero/Hero";
import NavBar from "@/components/navigation/NavBar";
import { useMediaQuery } from "@uidotdev/usehooks";
import Warning from "@/components/ui/Warning";

export default function Landing() {
  const isLargeDevice = useMediaQuery("(min-width : 993px)");

  return (
    <>
      {!isLargeDevice ? (
        <Warning />
      ) : (
        <>
          <NavBar />
          <Hero />
        </>
      )}
    </>
  );
}
