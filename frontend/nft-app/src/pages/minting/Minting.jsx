import React, { useState } from "react";
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
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import PictureBefore from "../../assets/images/picture.png";
export default function Minting() {
  const [selectedImage, setSelectedImage] = useState(PictureBefore);
  const [nftImage, setNFTImage] = useState(null);
  const [chosenTag, setChosenTag] = useState(new Set());
  const [sale, setSale] = useState(false);
  const [nftName, setNFTName] = useState(null);
  const [description, setDescription] = useState(null);

  const handleSelectionChange = (e) => {
    setChosenTag(new Set(e.target.value.split(",")));
  };

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

    if (nftName && description) {
      const formDataToSend = new FormData();
      formDataToSend.append("image", nftImage);
      formDataToSend.append("NFTname", nftName);
      formDataToSend.append("NFTdescription", description);

      try {
        const response = await fetch("http://localhost:8080/minting", {
          method: "POST",
          body: formDataToSend,
        });

        const data = await response.json();
        if (response.ok) {
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
                  <Select
                    label="NFT tags"
                    selectionMode="multiple"
                    placeholder="Select tags"
                    className="w-full"
                    isRequired
                    onChange={handleSelectionChange}
                    selectedKeys={chosenTag}
                  ></Select>
                  <p className="text-small text-default-500 w-full px-2">
                    Selected tags:{" "}
                  </p>
                  <div className=" w-full pl-1">
                    <Switch>Sale</Switch>
                  </div>
                  <Input
                    isRequired
                    type="number"
                    label="Intial price"
                    size="lg"
                    placeholder="Enter your initial price"
                    className="w-full"
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
