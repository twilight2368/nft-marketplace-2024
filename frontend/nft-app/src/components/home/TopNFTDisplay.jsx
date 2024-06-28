import React from "react";
import TopNFTHome from "../nfts/TopNFTHome";
import HotNFTWelcome from "../nfts/HotNFTWelcome";
export default function TopNFTDisplay() {
  return (
    <div>
      <div className=" min-h-96 w-full">
        <h2 className="poetsen-one-regular text-3xl mb-10">🚀 Top NFTs</h2>
        <div className=" grid grid-cols-5 gap-10 justify-center items-center">
          <HotNFTWelcome />
          <HotNFTWelcome />
          <HotNFTWelcome />
          <HotNFTWelcome />
          <HotNFTWelcome />
        </div>
      </div>
    </div>
  );
}
