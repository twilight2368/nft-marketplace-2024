import React from "react";
import "./herodisplay.css";
import { Button } from "@nextui-org/react";

export default function HeroTextDisplay() {
  return (
    <div className="w-full h-full pt-20 pl-28">
      <div className="mb-5 flex flex-col gap-4">
        <h1 className=" text-6xl font-black pl-20 ">Discover, Collect and Sell</h1>
        <h1 className="text-5xl font-black text-center ">
          Digital arts <span className="nft-hero-text ">NFTs</span>
        </h1>
      </div>
      <div className=" text-sm nunito text-center text-gray-400 mb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
        accusamus quae quasi iure, nemo incidunt doloribus a aliquid nihil optio
        delectus ducimus accusantium molestias. Voluptatum non id eligendi sit
        inventore.
      </div>
      <div>
        <div className="flex justify-center items-center">
          <Button size="lg" className="nunito text-bold text-lg bg-black/0 border-1 border-blue-600 text-blue-400" variant="shadow" color="secondary">
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
}
