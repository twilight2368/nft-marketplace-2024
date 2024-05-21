import React from "react";
import LogoImage from "../../assets/icons/logo1.png";
import { Button } from "@nextui-org/react";
export default function WelcomeNavbar() {
  return (
    <div>
      <div
        id="welcomenavbar"
        className=" h-28 home-background w-full flex items-center select-none"
      >
        <img src={LogoImage} alt="" className=" ml-16 h-16 " />
        <div className="ml-2 font-black text-4xl text-white/0 poetsen-one-regular mr-48">
          <span className="bg-clip-text bg-teal-300">Fast</span>
          <span className="bg-clip-text bg-gradient-to-r from-[#ff0f7b] to-[#f89b29]">
            Foodie
          </span>
          <span className="bg-clip-text bg-[#f89b29] ">NFT</span>
        </div>
        <div className=" w-1/3">
          <div className="w-full flex justify-center items-center gap-24 flex-shrink font-semibold nunito">
            <div>Home</div>
            <div>Marketplace</div>
            <div>Contact</div>
          </div>
        </div>
        <div className="w-1/3 pl-64 pr-14">
          <div className="w-full grid grid-cols-2 place-items-center justify-items-end ">
            <div>
              <Button
                color="danger"
                variant="flat"
                size="lg"        
              >
                <span className=" text-lg nunito font-bold text-orange-500 ">Sign up</span>
              </Button>
            </div>
            <div>
              <Button
                color="primary"
                variant="shadow"
                size="lg"
                className=" bg-black/0 border-4 border-blue-600"
              >
                <span className=" text-lg nunito font-bold text-purple-600 ">
                  {" "}
                  Log in
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
