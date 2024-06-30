import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import NFTsampleImg from "../../assets/images/nftsample.jpg";
import PizzaCurrency from "../../assets/icons/pizza.png";
import { Link } from "react-router-dom";

export default function TopNFTHome(props) {
  return (
    <div>
      <Link to={"/nft/" + props.id}>
        <Card className=" bg-black border-1 border-purple-600 shadow-md shadow-blue-600  text-white">
          <CardBody className="overflow-y-hidden p-5 pb-1">
            <Image
              src={process.env.REACT_APP_PINATA_GATEWAY  + props.image}
              className="mb-0"
            />
          </CardBody>
          <CardFooter className=" pt-1 pb-4 px-6">
            <div className=" pb-2">
              <div>
                <span className="nunito text-lg font-bold">{props.name}</span>
              </div>
              <div className="flex flex-row justify-start items-center gap-1">
                <div>
                  <Image src={PizzaCurrency} className=" h-5 w-5" />
                </div>
                <div>
                  <span>{props.price}</span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
