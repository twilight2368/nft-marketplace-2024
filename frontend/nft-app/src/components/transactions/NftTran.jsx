import { Button, Card, CardBody, Chip, Image } from "@nextui-org/react";
import React, { useEffect } from "react";
import {
  ArrowLongRightIcon,
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function NftTran({
  user,
  from_user,
  to_user,
  amount,
  time,
  nft_id,
}) {
  useEffect(() => {
    console.log(typeof user);
    console.log(typeof from_user);
    console.log(typeof to_user);

    console.log(user === from_user);
    console.log(user === to_user);
  });

  const navigate = useNavigate();
  return (
    <div className="w-3/4 h-20 mb-5 nunito">
      <Card className="w-full rounded-lg border-2 border-gray-500 shadow shadow-gray-400">
        <CardBody>
          <div className="flex flex-row items-center">
            <div className="mr-10 text-gray-500">{time}</div>
            <div className="mr-3 text-gray-500">
              from:{" "}
              {user == from_user ? (
                <>
                  <span className="text-red-400 ">you</span>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="solid"
                    color="success"
                    onClick={(e) => {
                      navigate("/user/" + from_user);
                    }}
                  >
                    Go to profile
                  </Button>
                </>
              )}
            </div>
            <div className="mr-3">
              <ArrowLongRightIcon className="h-6 w-6 text-gray-500" />
            </div>
            <div className="mr-60 text-gray-500">
              to:{" "}
              {user == to_user ? (
                <>
                  <span className="text-green-400 ">you</span>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="solid"
                    color="danger"
                    onClick={(e) => {
                      navigate("/user/" + to_user);
                    }}
                  >
                    Go to profile
                  </Button>
                </>
              )}
            </div>
            <div className="mr-40">
              <Button
                color="secondary"
                variant="bordered"
                onClick={(e) => {
                  navigate("/nft/" + nft_id);
                }}
              >
                Show NFT
              </Button>
            </div>
            <div>
              {user == from_user ? (
                <>
                  <div className="flex flex-row gap-2 justify-center items-center text-xl">
                    <div className="flex flex=row justify-center items-center gap-1 text-3xl poetsen-one-regular">
                      <div>{amount}</div>
                      <div className="mr-10">
                        <Image
                          src={require("../../assets/icons/pizza.png")}
                          className="h-6 w-6"
                        />
                      </div>
                      <div>
                        <ArrowUpRightIcon className="h-6 w-6 text-red-400 font-bold" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {user == to_user ? (
                    <></>
                  ) : (
                    <Chip color="danger">Something went wrong</Chip>
                  )}
                </>
              )}
              {user == to_user ? (
                <>
                  <div className="flex flex-row gap-2 justify-center items-center text-xl">
                    <div className="flex flex=row justify-center items-center gap-1 text-3xl poetsen-one-regular">
                      <div>{amount}</div>
                      <div className="mr-10">
                        <Image
                          src={require("../../assets/icons/pizza.png")}
                          className="h-6 w-6"
                        />
                      </div>
                      <div>
                        <ArrowDownLeftIcon className="h-6 w-6 text-green-300 font-bold" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {user == from_user ? (
                    <></>
                  ) : (
                    <Chip color="danger">Something went wrong</Chip>
                  )}
                </>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
