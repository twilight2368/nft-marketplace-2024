import React from 'react'
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import NFTsampleImg from "../../assets/images/nftsample.jpg";
import PizzaCurrency from "../../assets/icons/pizza.png";

export default function HotNFTWelcome() {
  return (
    <div>
      <Card className=" bg-black border-1 border-purple-600 shadow-md shadow-blue-600  text-white">
        <CardBody className="overflow-y-hidden p-5 pb-1">
          <Image src={NFTsampleImg} className="mb-0" />
        </CardBody>
        <CardFooter className=" pt-1 pb-4 px-6">
          <div className=" pb-2">
            <div>
              <span className="nunito text-lg font-bold">
                Food, love and NFT
              </span>
            </div>
            <div className="flex flex-row justify-start items-center gap-1">
              <div>
                <Image src={PizzaCurrency} className=" h-5 w-5" />
              </div>
              <div>
                <span>0.00</span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
