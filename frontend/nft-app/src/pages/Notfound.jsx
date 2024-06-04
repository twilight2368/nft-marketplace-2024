import React from "react";
import { Image } from "@nextui-org/react";
import Logo from "../assets/icons/logo1.png";
import NorfoundFooter from "../components/footer/NorfoundFooter";

export default function Notfound() {
  return (
    <div>
      <div className="min-h-screen bg-purple-900/20">
        <div className=" w-full flex justify-center items-center h-28 mb-16">
          <img src={Logo} alt="" className=" w-24 h-24 mt-8" />
        </div>

        <div>
          <h1 className="text-center nunito font-black text-6xl  bg-gradient-to-r from-orange-400 to-red-600  text-white/0 bg-clip-text">
            Uh-Oh
          </h1>
          <div className="text-center text-xl mt-5 mb-5 text-gray-500 ">
            The page you are looking for may have been moved, deleted <br />
            or possibly never existed.
          </div>
          <h2 className="nunito text-white/0 text-9xl text-center mt-28 bg-clip-text bg-gradient-to-br from-blue-500 to-purple-500">
            404
          </h2>
        </div>
        <NorfoundFooter />
      </div>
    </div>
  );
}
