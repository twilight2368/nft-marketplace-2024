import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import NFTImage from "../../assets/images/nftsample.jpg";
import { Button, Chip, Image } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import coinIcon from "../../assets/icons/pizza.png";
export default function NFTdetails() {
  const [dataLoad, setDataLoad] = useState(null);
  const params = useParams();
  useEffect(() => {
    fetch("http://localhost:8080/nft/" + params.id)
      .then((res) => {
        if (!res.ok) {
          console.log("hello");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.sale_status);
        setDataLoad(data);
      })
      .catch((e) => {
        console.log(e.messages);
      });
  }, []);
  return (
    <div>
      <Navbar>
        <div className=" flex flex-row nunito">
          <div className=" w-1/2 ">
            <div className="w-full h-full p-40 pr-20">
              <div className=" flex flex-col gap-3">
                <div className="  text-5xl poetsen-one-regular mb-5">
                  {dataLoad ? <>{dataLoad.nft_name}</> : <></>}
                </div>
                <div className=" text-xl mb-5">
                  Artist:{" "}
                  {dataLoad ? (
                    <>
                      <a
                        href={"http://localhost:3000/user/" + dataLoad.creator}
                      >
                        <Chip
                          size="lg"
                          variant="bordered"
                          color="success"
                          className="mx-3 "
                        >
                          {" "}
                          {dataLoad.user_name}
                        </Chip>
                      </a>
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="text-lg mb-5">
                  Description: {dataLoad ? <>{dataLoad.description}</> : <></>}
                </div>
                <div className="text-lg mb-5">
                  URI:{" "}
                  {dataLoad ? (
                    <a
                      href={"https://ipfs.io/ipfs/" + dataLoad.token_url}
                      className="text-blue-500 underline"
                    >
                      {dataLoad.token_url}
                    </a>
                  ) : (
                    <></>
                  )}
                </div>
                <div className=" flex flex-col justify-center items-center ">
                  {dataLoad ? (
                    <>
                      <Button
                        className=" flex flex-row gap-2 mb-5 disabled:border-red-500"
                        variant="bordered"
                        color="primary"
                        disabled={!dataLoad.sale_status}
                      >
                        <Image src={coinIcon} className=" h-5 w-5" />
                        <span className="text-white">{dataLoad.price}</span>
                      </Button>
                      <div>
                        <>
                          {dataLoad.sale_status ? (
                            <></>
                          ) : (
                            <>
                              <span className="text-gray-500 nunito mt-10">
                                This NFT is not for sale
                              </span>
                            </>
                          )}
                        </>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className=" w-1/2 flex justify-center items-center">
            <div className="w-1/2 h-1/2">
              {dataLoad ? (
                <>
                  <Image
                    src={
                      process.env.REACT_APP_PINATA_GATEWAY + dataLoad.image_url
                    }
                    isBlurred
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Navbar>
      <MainFooter />
    </div>
  );
}
