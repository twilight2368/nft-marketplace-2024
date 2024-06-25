import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import NFTImage from "../../assets/images/nftsample.jpg";
import { Button, Image } from "@nextui-org/react";
export default function NFTdetails() {
  return (
    <div>
      <Navbar>
        <div className=" flex flex-row nunito">
          <div className=" w-1/2 ">
            <div className="w-full h-full p-40 pr-20">
              <div className=" flex flex-col gap-3">
                <div className="  text-5xl poetsen-one-regular mb-5">
                  NFT_name
                </div>
                <div className=" text-xl">Artist_name</div>
                <div className=" text-xl">Current_owmer</div>
                <div className="text-lg">
                  Description: Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Nesciunt recusandae ipsum exercitationem
                  doloremque rerum natus dolores minus mollitia iusto? Impedit
                  nulla nisi unde voluptas perspiciatis nihil. Sequi cumque
                  doloribus quisquam.
                </div>
                <div className="text-lg">Tags:</div>
                <div className="text-lg">URI:</div>
                <div className=" flex justify-center items-center ">
                  <Button className="">Purchase</Button>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-1/2 flex justify-center items-center">
            <div className="w-1/2 h-1/2">
              <Image src={NFTImage} isBlurred />
            </div>
          </div>
        </div>
      </Navbar>
      <MainFooter />
    </div>
  );
}
