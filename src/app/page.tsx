"use client";
import React from "react";
import Hero from "@/components/hero/Hero";
import NavBar from "@/components/navigation/NavBar";
import { useMediaQuery } from "@uidotdev/usehooks";
import Warning from "@/components/ui/Warning";

export default function Home() {
  const isLargeDevice = useMediaQuery("(min-width : 993px)");
  useMediaQuery;
  return (
    <main className="w-full h-screen">
      {!isLargeDevice ? (
        <Warning />
      ) : (
        <>
          <NavBar />
          <Hero />
        </>
      )}
    </main>
  );
}
