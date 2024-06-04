import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import CollectionBanner from "../../components/home/CollectionBanner";
import TopNFTDisplay from "../../components/home/TopNFTDisplay";
import HotNFTDisplay from "../../components/home/HotNFTDisplay";
import BroweNFTDisplay from "../../components/home/BrowserNFTDisplay";
import CollectionDisplay from "../../components/home/CollectionDisplay";
import RandomNFTDisplay from "../../components/home/RandomNFTDisplay";

export default function Home() {
  return (
    <div>
      <Navbar>
        <div className=" py-20 ">
          <div className=" px-20 mb-20 ">
            <CollectionBanner />
          </div>
          <div className="px-28  mb-20">
            <TopNFTDisplay />
          </div>
          <div className="px-28  mb-20">
            <HotNFTDisplay />
          </div>
          <div className="px-28  mb-20">
            <BroweNFTDisplay />
          </div>
          <div className="px-28  mb-20">
            <CollectionDisplay />
          </div>
          <div className="px-28  mb-20">
            <RandomNFTDisplay />
          </div>
        </div>
      </Navbar>
      <MainFooter />
    </div>
  );
}
