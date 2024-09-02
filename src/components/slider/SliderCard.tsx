import React from "react";
import { cn } from "@/utils/utils";
import { Icons } from "../shared/Icons";

function SliderCard({
  i,
  index,
  textColor,
  isMuted,
  toggleMute,
  audioRefs,
}: {
  i: any; // Replace `any` with your data type
  index: number;
  textColor: string;
  isMuted: boolean;
  toggleMute: () => void;
  audioRefs: React.MutableRefObject<(HTMLAudioElement | null)[]>;
}) {
  return (
    <>
      <div
        className={cn(
          "w-[50%] relative top-[0px] m-auto h-full items-center text-center justify-center"
        )}
        style={{ color: textColor }}
      >
        <div className="top-[60px] relative">
          <h1 className={cn("text-[29px] w-full")} style={{ color: textColor }}>
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
          }}
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
          <Icons.speaker color={textColor} />
        )}
      </div>
    </>
  );
}

export default SliderCard;
