import React from "react";
import { Tabs, Tab, Button } from "@nextui-org/react";
import HotNFTWelcome from "../nfts/HotNFTWelcome";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function BroweNFTDisplay() {
  return (
    <div className="mb-20">
      <div className=" w-full text-3xl font-bold mb-10 poetsen-one-regular">
        <h2>✨Browser NFTs with categories</h2>
      </div>
      <div className="w-full text-center mb-10">
        <div>
          <Tabs
            variant="underlined"
            color="primary"
            aria-label="Tabs variants"
            size="lg"
          >
            <Tab key="Burger" title="🍔Burger" />
            <Tab key="Pizza" title="🍕Pizza" />
            <Tab key="Hot dog" title="🌭Hot dog" />
            <Tab key="Doughnut" title="🍩Doughnut" />
            <Tab key="Ice cream" title="🍧Ice cream" />
          </Tabs>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full px-0 grid grid-cols-5 grid-rows-2 gap-x-10 gap-y-10">
          <HotNFTWelcome />
          <HotNFTWelcome />
          <HotNFTWelcome />
          <HotNFTWelcome />
          <HotNFTWelcome />
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
