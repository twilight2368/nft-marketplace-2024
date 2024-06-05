import { Button, Image } from "@nextui-org/react";
import React from "react";
import BannerImg from "../../assets/images/banner-fast-food.jpg";
import PizzaPriceIcon from "../../assets/icons/pizza.png";
export default function CollectionBanner() {
  return (
    <div className=" w-full">
      <div className="carousel w-full rounded-lg">
        <div id="slide1" className="carousel-item relative w-full">
          <div className=" relative w-full">
            <Image src={BannerImg} className=" brightness-75" />
            <div className=" absolute z-10 bottom-10 left-0 h-40 w-full px-20 flex flex-row items-center">
              <div className=" w-4/5 nunito">
                <div>
                  <span className=" text-5xl poetsen-one-regular">
                    Collection_name
                  </span>
                </div>
                <div className="pl-2">
                  <div className=" text-lg ">
                    <span>By: </span>
                    <span>@User_name</span>
                  </div>
                </div>
                <div className="pl-2 text-lg flex flex-row justify-start items-center gap-2">
                  <div>
                    <span>100 NFTs</span>
                  </div>
                  <div>-</div>
                  <div className=" flex flex-row justify-start items-center gap-1 ">
                    <div>
                      <span>1000 </span>
                    </div>
                    <div>
                      <img src={PizzaPriceIcon} alt="" className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-1/5 h-full nunito flex items-center justify-center ">
                <Button size="lg" className=" h-16 w-60 text-xl bg-black/80">
                  View Collection
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
