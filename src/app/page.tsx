import React from "react";
import Hero from "@/components/hero/Hero";
import NavBar from "@/components/navigation/NavBar";

export default function Home() {
  return (
    <main className="w-full h-screen">
      <NavBar />
      <Hero />
    </main>
  );
}
