import React from "react";
import Image from "next/image";

function Warning() {
  return (
    <div className="relative  flex h-screen w-full flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image
        src="/landingpage.jpg"
        sizes="100vw"
        fill
        alt="landingpage"
        style={{
          objectFit: "cover",
        }}
      />
      <div className="absolute bottom-[25px]">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-800 text-center">
          For the Best Experience,
          <br />
          Please View on a Desktop
        </h1>
      </div>
    </div>
  );
}

export default Warning;
