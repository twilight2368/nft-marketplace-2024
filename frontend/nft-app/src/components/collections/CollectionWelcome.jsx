import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";
import NFTsampleImg from "../../assets/images/nftsample.jpg";
import PizzaCurrency from "../../assets/icons/pizza.png";

export default function CollectionWelcome() {
  return (
    <div>
      <Card className="text-white bg-white/10 backdrop-blur border-1 border-blue-800 shadow shadow-purple-600  ">
        <CardBody>
          <div className=" flex flex-row p-1">
            <div className=" w-1/4 grid grid-cols-2 grid-rows-2 gap-2">
              <Image src={NFTsampleImg} className="h-14 w-14" />
              <Image src={NFTsampleImg} className="h-14 w-14" />
              <Image src={NFTsampleImg} className="h-14 w-14" />
              <Image src={NFTsampleImg} className="h-14 w-14" />
            </div>
            <div className=" px-4 ">
              <div className="mb-3">
                <span className=" poetsen-one-regular text-lg pr-1">
                  Collections_name
                </span>
                <span className="text-gray-500 pr-1">by</span>
                <span className="text-purple-500">@</span>
                <span className="nunito">artist_username</span>
              </div>
              <div className="flex flex-row ">
                <div className=" w-1/2 text-center pt-2">
                  <div className=" text-5xl text-white/0 bg-clip-text bg-gradient-to-br  from-indigo-500 via-purple-500 to-pink-500 font-black roboto">
                    100
                  </div>
                  <div className="nunito text-gray-500 text-sm font-bold">
                    NFTs
                  </div>
                </div>
                <div className="bg-gray-600 w-0.5 rounded-full"></div>
                <div className=" w-1/2 flex flex-col justify-start items-center pt-2">
                  <div>
                    <span className="nunito text-gray-500">Total price:</span>
                  </div>
                  <div className=" flex flex-row items-center">
                    <div className="text-white/0 text-xl pt-1 px-1 nunito  bg-clip-text bg-gradient-to-br  from-yellow-300 to-red-500">
                      1000
                    </div>
                    <div>
                      <Image src={PizzaCurrency} className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
