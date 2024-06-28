import React, { useEffect, useState } from "react";
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
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
   setLoading(true);
   fetch("http://localhost:8080/allnfts")
     .then((res) => {
       if (!res.ok) {
         throw new Error("Network response was not ok");
       }
       return res.json(); // Ensure we return the parsed JSON
     })
     .then((data) => {
       console.log(data);
       setNFTs(data);
       setLoading(false);
     })
     .catch((error) => {
       console.error("Fetch error:", error);
       setLoading(true);
     });
 }, []);

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
        {loading ? (
          <>
            <div className=" w-full text-center">
              <span className="loading loading-infinity loading-lg"></span>
            </div>
          </>
        ) : (
          <>
            <div className=" grid grid-cols-6 gap-x-6 gap-y-8">
              {nfts.map((e) => {
                return (
                  <>
                    <TopNFTHome name={e.nft_name} image={e.image_url} price={e.price} />
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
