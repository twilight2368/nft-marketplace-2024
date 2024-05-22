import React from "react";
import { Button } from "@nextui-org/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import HotNFTWelcome from "../nfts/HotNFTWelcome";
export default function TopNFTDisplay() {
  return (
    <div className=" w-full px-auto mb-32">
      <h2 className=" text-center text-4xl font-black mb-8">🔥Hot NFT</h2>
      <div className=" h-96  grid grid-cols-4 gap-10 ">
        <HotNFTWelcome />
        <HotNFTWelcome />
        <HotNFTWelcome />
        <HotNFTWelcome />
      </div>
      <div>
        <div className=" text-center mt-24">
          <Button
            color="danger"
            variant="ghost"
            className=" nunito text-white shadow-md shadow-red-600"
          >
            <div className=" flex justify-center items-center gap-2">
              <div>Learn more</div>
              <div>
                <ArrowRightIcon className="h-3 w-3 " />
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
