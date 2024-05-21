import React from "react";
import HeroImage from "../../assets/icons/nothing.png";
import { Image } from "@nextui-org/image";

export default function HeroImageBlur() {
  return (
    <div>
      <div className=" relative flex justify-center items-center">
        <img
          src={HeroImage}
          alt=""
          className="h-[505px] animate-pulse absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 blur-2xl"
        />
        <Image src={HeroImage} className="h-[500px] block" isBlurred />
      </div>
    </div>
  );
}
