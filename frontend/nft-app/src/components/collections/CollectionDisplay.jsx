import React from 'react'
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
import { Bars4Icon, Squares2X2Icon, FunnelIcon } from "@heroicons/react/24/outline";

export default function CollectionDisplay() {
  return (
    <div>
      <div className="fixed px-20 z-20 bg-black/80 backdrop-blur-sm w-full h-24 flex flex-row items-center gap-10">
        <div>
          <h3 className=" text-2xl poetsen-one-regular ">Collections</h3>
        </div>
        <div className=" w-1/2">
          <Input
            color="danger"
            size="md"
            type="text"
            label="Search collections"
            variant="bordered"
            className="w-full"
          />
        </div>
        <div>
          <Dropdown className="dark">
            <DropdownTrigger>
              <Button
                size="lg"
                variant="shadow"
                color="danger"
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
        <div className=" w-1/6">
          <Slider
            color="danger"
            label="Number of NFTs"
            step={1}
            size="sm"
            minValue={0}
            maxValue={100}
            defaultValue={[0, 100]}
            className="w-full"
          />
        </div>
        <div>
          <Switch
            defaultSelected
            size="lg"
            color="danger"
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <>
                  <Squares2X2Icon className={className + " h-5 w-5"} />
                </>
              ) : (
                <>
                  <Bars4Icon className={className + " h-5 w-5 "} />
                </>
              )
            }
          ></Switch>
        </div>
        <div>
          <Dropdown className="dark">
            <DropdownTrigger>
              <Button
                size="lg"
                variant="light"
                color="danger"
                className="nunito"
              >
                <FunnelIcon className="h-6 w-6 text-red-600" />
                Sort
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
    </div>
  );
}
