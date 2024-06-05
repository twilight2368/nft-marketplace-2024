import React from "react";
import LogoImage from "../../assets/icons/logo1.png";
import { Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
export default function WelcomeNavbar() {
  const navigate = useNavigate()
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
          <div className="w-full flex justify-center items-center gap-20 flex-shrink font-semibold nunito">
            <div>
              <Link className=" hover:text-blue-500 " to="/home">
                Home
              </Link>
            </div>
            <div>
              <Link className=" hover:text-blue-500 " to="/marketplace">
                Marketplace
              </Link>
            </div>
            <div>
              <Link className=" hover:text-blue-500 " to="/collections">
                Collections
              </Link>
            </div>
            <div>
              <Link className=" hover:text-blue-500 " to="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
        <div className="w-1/3 pl-80 pr-14">
          <div className="w-full grid grid-cols-2 place-items-center justify-items-end ">
            <div>
              <Button
                color="danger"
                variant="flat"
                size="lg"
                onClick={() => {
                  navigate("/register");
                }}
              >
                <span className=" text-lg nunito font-bold text-orange-500 ">
                  Sign up
                </span>
              </Button>
            </div>
            <div>
              <Button
                color="primary"
                variant="shadow"
                size="lg"
                className=" bg-black/0 border-2 border-blue-800"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <span className=" text-lg nunito font-bold text-purple-600 ">
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
