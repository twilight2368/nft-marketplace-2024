import { Button, Card, CardBody, Image } from "@nextui-org/react";
import React from "react";
import CoinImg from "../../assets/icons/pizza.png";

export default function SaleNFT({
  id,
  name,
  price,
  image,
  sale,
  reloadPage,
  owner,
}) {
  const changeToNotSale = () => {
    const data = {
      nftid: id,
      userid: owner,
    };
    fetch("http://localhost:8080/set_nft_to_not_sale", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        reloadPage();
      })
      .catch((e) => {
        console.log(e.messages);
        reloadPage();
      });
  };
  return (
    <div>
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
              <div className="flex flex-row justify-center items-center text-lg text-gray-500 nunito gap-2 w-60">
                <div>Price: {price}</div>
                <Image src={CoinImg} className="h-5 w-5" />
              </div>
              <div className="px-10 flex justify-center items-center">
                <Button
                  variant="flat"
                  color="warning"
                  size="lg"
                  onClick={changeToNotSale}
                >
                  Archive
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
