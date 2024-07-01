import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";
import CoinImg from "../../assets/icons/pizza.png";
import SetSaleModel from "../modal/SetSaleModel";

export default function NotSaleNFT({
  id,
  name,
  price,
  image,
  sale,
  reloadPage,
  owner
}) {

    
  return (
    <div className="mb-5 w-3/4">
      <Card className="">
        <CardBody>
          <div className="flex flex-row gap-6 items-center">
            <div>
              <Image
                src={process.env.REACT_APP_PINATA_GATEWAY + image}
                className="h-16 w-16"
              />
            </div>
            <div className="w-2/3">
              <span className="text-3xl poetsen-one-regular">{name}</span>
            </div>
            <div className="flex flex-row justify-center items-center text-lg text-gray-500 nunito gap-2 w-28">
              <div>Price: {price}</div>
              <Image src={CoinImg} className="h-5 w-5" />
            </div>
            <div className="flex justify-center items-center">
              <SetSaleModel id={id} name={name} reloadPage={reloadPage} image={image} owner={owner} price={price} />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
