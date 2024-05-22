import React from "react";
import { Tabs, Tab, Button } from "@nextui-org/react";
import HotNFTWelcome from "../nfts/HotNFTWelcome";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function BrowserNFTWelcome() {
  return (
    <div className="mb-40">
      <div className=" w-full pl-20 text-4xl font-bold mb-5">
        <h2>✨Browser NFTs with categories</h2>
      </div>
      <div className="w-full pl-20 pr-20 mb-10 flex flex-row justify-between items-center">
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
        <div>
          <Button color="primary" variant="flat" className=" nunito font-bold ">
            <div>Explore marketplace</div>
            <div>
              <ArrowRightIcon className="h-3 w-3 " />
            </div>
          </Button>
        </div>
      </div>
      <div className="w-full px-20">
        <div className="w-full grid grid-cols-5 grid-rows-2 gap-x-5 gap-y-8">
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
