import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import "./minting.css";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Input,
  Textarea,
  Button,
  Switch,
} from "@nextui-org/react";
import PictureBefore from "../../assets/images/picture.png";
import { useLoginContext } from "../../context/LoginProvider";
import { Link } from "react-router-dom";

export default function Minting() {
  const [selectedImage, setSelectedImage] = useState(PictureBefore);
  const [nftImage, setNFTImage] = useState(null);
  const [sale, setSale] = useState(false);
  const [nftName, setNFTName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(0);
  const [minting, setMinting] = useState(false);
  const [dataLoad, setDataLoad] = useState(null);

  const { userID, accountname } = useLoginContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNFTImage(e.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMinting(true);
    setDataLoad(false);

    if (nftName && description) {
      const formDataToSend = new FormData();
      formDataToSend.append("image", nftImage);
      formDataToSend.append("NFTname", nftName);
      formDataToSend.append("NFTdescription", description);
      formDataToSend.append("NFTArtist", accountname);
      formDataToSend.append("NFTUserID", userID);
      formDataToSend.append("NFTsale", sale);
      formDataToSend.append("NFTPrice", price);

      try {
        const response = await fetch("http://localhost:8080/minting", {
          method: "POST",
          credentials: "include",
          body: formDataToSend,
        });

        const data = await response.json();
        if (response.ok) {
          setMinting(false);
          setDataLoad(data);
          console.log(data);
          console.log("File uploaded successfully:", data);
        } else {
          console.error("Error uploading file:", data);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <Navbar>
        <div className=" min-h-screen w-full px-20 ">
          <div className=" w-full h-full grid grid-cols-2 gap-10">
            <div className=" flex flex-col justify-center items-center">
              <div className=" pt-20 ">
                <div className=" h-96">
                  <Image
                    src={selectedImage}
                    width={300}
                    height={300}
                    isBlurred
                  />
                </div>
              </div>
              <div>
                <form
                  action="/profile"
                  method="post"
                  enctype="multipart/form-data"
                  className="bg-black text-white"
                >
                  <input
                    type="file"
                    name="nftImage"
                    accept="image/png, image/gif, image/jpeg"
                    className="custom-file-input nunito"
                    onChange={handleImageChange}
                  />
                </form>
              </div>
            </div>
            <div className=" w-full h-full p-3 pt-20 ">
              <Card className=" py-3 px-20 bg-purple-800/20 border-1 border-blue-500 shadow-md shadow-purple-600">
                <CardHeader className="flex justify-center">
                  {" "}
                  <h1 className=" text-3xl poetsen-one-regular text-orange-400">
                    Minting your NFT
                  </h1>
                </CardHeader>
                <CardBody className=" flex flex-col justify-center items-center gap-5">
                  <Input
                    isRequired
                    type="text"
                    label="NFT Name"
                    size="lg"
                    placeholder="Enter your NFT name"
                    className="w-full"
                    onChange={(e) => {
                      setNFTName(e.target.value);
                    }}
                  />
                  <Textarea
                    isRequired
                    label="Description"
                    labelPlacement="inside"
                    placeholder="Enter your description"
                    size="lg"
                    className="w-full "
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <div className=" w-full pl-1">
                    <Switch
                      onClick={(e) => {
                        setSale(!sale);
                      }}
                    >
                      Sale
                    </Switch>
                  </div>
                  <Input
                    isRequired
                    type="number"
                    label="Intial price"
                    size="lg"
                    placeholder="Enter your initial price"
                    className="w-full"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    min={0}
                    max={999}
                  />
                </CardBody>
                <CardFooter className=" text-center w-full flex justify-center items-center">
                  <Button variant="flat" color="success" onClick={handleSubmit}>
                    Mint
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div>
            {minting ? (
              <>
                <div className=" w-full text-center ">
                  <div>This process may take a lot of time</div>
                  <span className="loading loading-infinity loading-lg"></span>
                </div>
              </>
            ) : (
              <>
                {dataLoad ? (
                  <>
                    <div className=" px-96">
                      <Card>
                        <CardBody className=" text-center">
                          <div className=" text-2xl text-green-300 ">
                            {dataLoad.message}
                          </div>
                          <div>
                            Ipfs:{" "}
                            <a
                              href={"https://ipfs.io/ipfs/" + dataLoad.ipfs}
                              target="_blank"
                              className=" text-blue-500"
                            >
                              {" "}
                              {dataLoad.ipfs}
                            </a>
                          </div>
                          <div>
                            Transaction:{" "}
                            <a
                              href={
                                "https://sepolia.etherscan.io/tx/" +
                                dataLoad.transaction
                              }
                              target="_blank"
                              className=" text-blue-500"
                            >
                              {" "}
                              {dataLoad.transaction}
                            </a>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </Navbar>
      <MainFooter />
    </div>
  );
}

/**
 * ? NFT attribute need
    nft_name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    sale_status BOOLEAN NOT NULL,
    price INTEGER NOT NULL
 */
