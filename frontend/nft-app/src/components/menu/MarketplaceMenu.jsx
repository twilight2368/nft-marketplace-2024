import React from "react";
import {
  Button,
  Input,
  Switch,
  Slider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { BoltIcon, BoltSlashIcon } from "@heroicons/react/24/outline";
import TopNFTHome from "../nfts/TopNFTHome";

export default function MarketplaceMenu() {
  return (
    <div className=" relative">
      <div className="fixed px-20 z-20 bg-black/80 backdrop-blur-sm w-full h-24 flex flex-row items-center gap-10">
        <div>
          <h3 className=" text-2xl poetsen-one-regular ">Marketplace</h3>
        </div>
        <div className=" w-1/2">
          <Input
            color="primary"
            size="md"
            type="text"
            label="Search NFT"
            variant="bordered"
            className="w-full"
          />
        </div>
        <div>
          <Switch
            defaultSelected
            size="lg"
            color="primary"
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <>
                  <BoltIcon className={className + " h-5 w-5"} />
                </>
              ) : (
                <>
                  <BoltSlashIcon className={className + " h-5 w-5 "} />
                </>
              )
            }
          >
            On sale
          </Switch>
        </div>
        <div className=" w-1/5">
          <Slider
            label="Price Range"
            step={1}
            size="sm"
            minValue={0}
            maxValue={100}
            defaultValue={[0, 100]}
            className="w-full"
          />
        </div>
        <div>
          <Dropdown className="dark">
            <DropdownTrigger>
              <Button
                size="md"
                variant="shadow"
                color="primary"
                className="nunito"
              >
                NFT tags
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              className="dark"
              selectionMode="multiple"
              closeOnSelect={false}
            >
              <DropdownItem>item 1</DropdownItem>
              <DropdownItem>item 1</DropdownItem>
              <DropdownItem>item 1</DropdownItem>
              <DropdownItem>item 1</DropdownItem>
              <DropdownItem>item 1</DropdownItem>
              <DropdownItem>item 1</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className=" pt-32 px-20">
        <div className=" grid grid-cols-6 gap-x-6 gap-y-8">
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
          <TopNFTHome />
          <TopNFTHome />
          <TopNFTHome />
          <TopNFTHome />
        </div>
      </div>
    </div>
  );
}
