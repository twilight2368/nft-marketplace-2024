import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";

export default function CoinTran({ amount, time }) {
  return (
    <div className="w-1/2 h-10">
      <Card className=" border-2 border-orange-400 shadow shadow-red-500 rounded-lg ">
        <CardBody>
          <div className="flex flex-row justify-between items-center">
            <div className="nunito text-gray-500">{time}</div>
            <div className="flex flex-row justify-center items-center gap-1 nunito text-xl">
              <div>
                Amount:  <span className=" poetsen-one-regular">{amount}</span>
              </div>
              <div>
                <Image
                  src={require("../../assets/icons/pizza.png")}
                  className="h-5 w-5"
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
