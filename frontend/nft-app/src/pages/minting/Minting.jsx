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
} from "@nextui-org/react";
import PictureBefore from "../../assets/images/picture.png";
export default function Minting() {
  const [selectedImage, setSelectedImage] = useState(PictureBefore);
  const [chosenTag, setChosenTag] = useState(new Set());

  const handleSelectionChange = (e) => {
    setChosenTag(new Set(e.target.value.split(",")));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
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
                  />
                  <Textarea
                    isRequired
                    label="Description"
                    labelPlacement="inside"
                    placeholder="Enter your description"
                    size="lg"
                    className="w-full "
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
                  <p className="text-small text-default-500 w-full px-2">Selected tags: </p>
                </CardBody>
                <CardFooter className=" text-center w-full flex justify-center items-center">
                  <Button>Mint</Button>
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
