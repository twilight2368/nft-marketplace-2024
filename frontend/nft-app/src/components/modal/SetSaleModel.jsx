import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Image,
  input,
} from "@nextui-org/react";
import CoinImg from "../../assets/icons/pizza.png";
export default function SetSaleModel({
  id,
  name,
  price,
  image,
  sale,
  reloadPage,
  owner,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newprice, setNewprice] = useState(0);
  const [processing, setProcessing] = useState(false);

  useEffect(
    (e) => {
      setProcessing(false);
      setNewprice(0);
    },
    [isOpen]
  );

  const changeToSale = () => {
    setProcessing(true);

    const data = {
      nftid: id,
      userid: owner,
      price: newprice || price,
    };

    fetch("http://localhost:8080/set_nft_to_sale", {
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
        setProcessing(false);
        onClose();
      })
      .catch((e) => {
        console.log(e.messages);
        reloadPage();
        setProcessing(false);
        onClose();
      });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Button color="danger" variant="bordered" onPress={onOpen}>
          Sale
        </Button>
      </div>
      <Modal
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
        className="dark"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{name}</ModalHeader>
              <ModalBody className="flex flex-col justify-center items-center">
                <Image
                  src={process.env.REACT_APP_PINATA_GATEWAY + image}
                  className="h-40 w-40"
                />
                <Input
                  placeholder="Input new price"
                  label="Price"
                  variant="underlined"
                  color="primary"
                  type="number"
                  min={0}
                  onChange={(e) => {
                    const input = parseInt(e.target.value);
                    if (isNaN(input) || input === 0) {
                      setNewprice(price);
                    } else {
                      setNewprice(input);
                    }
                  }}
                />
                <div className="w-full">
                  <div className="flex items-center mb-3">
                    Old price: {price}{" "}
                    <Image src={CoinImg} className="ml-1 h-4 w-4" />
                  </div>
                  <div className="flex items-center mb-3">
                    New price: {newprice}{" "}
                    <Image src={CoinImg} className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={changeToSale}>
                  {processing ? (
                    <>
                      <span className="loading loading-dots loading-lg"></span>
                    </>
                  ) : (
                    <>Confirm</>
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
