import React from "react";
import dynamic from "next/dynamic";

const Landing = dynamic(() => import("../components/ui/Landing"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-full h-screen">
      <Landing />
    </main>
  );
}
