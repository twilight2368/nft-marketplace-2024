import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import NFTImage from "../../assets/images/nftsample.jpg";
import { Button, Chip, Image } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import coinIcon from "../../assets/icons/pizza.png";
import { useLoginContext } from "../../context/LoginProvider";
export default function NFTdetails() {
  const [dataLoad, setDataLoad] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [processing, setProcessing] = useState(false);
  const [txcomplete, setTxcomplete] = useState(false);
  const { userID } = useLoginContext();
  const params = useParams();

  useEffect(() => {
    setProcessing(false);
    setTxcomplete(false);
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
        setErrorMessage(e.messages);
      });
  }, []);

  const purchaseNFT = async (e) => {
    e.preventDefault();

    const user_id = parseInt(userID);
    setProcessing(true);
    if (dataLoad) {
      const dataSend = {
        userid: user_id,
        nftid: dataLoad.nft_id,
      };
      fetch("http://localhost:8080/make_nft_transactions", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(dataSend),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setTxcomplete(true);
          console.log(data);
          if (data.messages === "Done!") {
            setErrorMessage();
          } else {
            setErrorMessage("Some thing went wrong");
          }
        })
        .catch((e) => {
          setTxcomplete(true);
          setErrorMessage("Some thing went wrong");
          console.log(e.messages);
        });
    }
  };

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
                  URI: <br />
                  {dataLoad ? (
                    <a
                      href={"https://ipfs.io/ipfs/" + dataLoad.token_url}
                      className="text-blue-500 underline"
                      target="_blank"
                    >
                      {dataLoad.token_url}
                    </a>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="text-lg mb-5">
                  Mint transaction: <br />
                  {dataLoad ? (
                    <a
                      href={
                        "https://sepolia.etherscan.io/tx/" +
                        dataLoad.transaction_hash
                      }
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      <span className="w-96 overflow-hidden">
                        {dataLoad.transaction_hash}
                      </span>
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
                        onClick={purchaseNFT}
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
                    className="h-96 w-96"
                  
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div>
          {processing ? (
            <>
              <div className="w-full min-h-80 text-center">
                {txcomplete ? (
                  <>
                    {errorMessage ? (
                      <>
                        <span className="nunito text-red-400">
                          {errorMessage ? errorMessage : ""}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="nunito text-green-300">
                          Transaction success
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div>Transaction is on process please wait ...</div>
                    <div>
                      <span className="loading loading-bars loading-lg"></span>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </Navbar>
      <MainFooter />
    </div>
  );
}
