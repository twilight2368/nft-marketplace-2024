import React from "react";
import "./welcometitle.css";
import { Image, Card, Button } from "@nextui-org/react";
import ArtistAvatar from "../../assets/images/artistfemale.jpg";

import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function TopNFTartistDisplay() {
  return (
    <div className=" w-full px-auto mb-32">
      <h2 className=" text-4xl text-center font-bold mb-10">
        🏆Our MasterChef
      </h2>
      <div className="grid grid-cols-3 grid-rows-1 gap-10 px-40">
        <div className="pt-20">
          <div className="text-center w-full text-2xl pb-2">🥈</div>
          <ArtistCard position={2} />
        </div>
        <div className="pt-2">
          <div className="text-center w-full text-3xl pb-2">🥇</div>
          <ArtistCard position={1} />
        </div>
        <div className="pt-20">
          <div className="text-center w-full text-2xl pb-2">🥉</div>
          <ArtistCard position={3} />
        </div>
      </div>
      <div className="text-center w-full mt-20 nunito">
        <Button
          color="success"
          variant="shadow"
          className="bg-white/0 text-green-400 border-1 border-green-500"
        >
          <div>🚀 Start create your NFTs here</div>
          <div>
            <ArrowRightIcon className="h-3 w-3 " />
          </div>
        </Button>
      </div>
    </div>
  );
}

function ArtistCard(props) {
  const display = () => {
    if (props.position === 1) {
      return "border-yellow-600";
    }
    if (props.position === 2) {
      return "border-gray-400";
    }
    if (props.position === 3) {
      return "border-orange-700";
    }
  };

  return (
    <>
      <div>
        <Card
          className={
            `text-write bg-black/0 nunito border-1 ` + ` ${display()}`
          }
        >
          <div className="h-32 flex flex-row p-2">
            <div className="flex  items-center pl-0 p-2 pr-4">
              <Image isBlurred src={ArtistAvatar} className="h-28" />
            </div>
            <div className="p-3">
              <div className="mb-2">
                <span className="text-purple-500 ">@</span>
                <span>artist_username</span>
              </div>

              <div className=" flex flex-row w-full gap-5">
                <div className="text-center w-1/2">
                  <div className="text-gray-500 text-2xl font-black roboto">
                    1.5k+
                  </div>
                  <div className="text-gray-500 text-xs">followers</div>
                </div>
                <div className="text-center w-1/2">
                  <div className="text-gray-500 text-2xl font-black roboto">
                    1.5k+
                  </div>
                  <div className="text-gray-500 text-xs">NFTs</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
