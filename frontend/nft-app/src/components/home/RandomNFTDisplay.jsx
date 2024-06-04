import React from 'react'
import TopNFTHome from "../nfts/TopNFTHome";
export default function RandomNFTDisplay() {
  return (
    <div>
      <div>
        <div className=" min-h-96 w-full">
          <h2 className="poetsen-one-regular text-3xl mb-10">
            {" "}
            🥠 Random NFTs
          </h2>
          <div className=" grid grid-cols-5 grid-rows-2 gap-10 justify-center items-center">
            <TopNFTHome />
            <TopNFTHome />
            <TopNFTHome />
            <TopNFTHome />
            <TopNFTHome />
            <TopNFTHome />
            <TopNFTHome />
            <TopNFTHome />
            <TopNFTHome />
            <TopNFTHome />
          </div>
        </div>
      </div>
    </div>
  );
}
