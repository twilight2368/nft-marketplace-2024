import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import { Button, Card, CardBody, Chip, Image, Input } from "@nextui-org/react";
import Logotext from "../../components/logo/Logotext";
import CoinImg from "../../assets/icons/pizza.png";
import Payment from "./Payment";

export default function PaymentProcess() {
  const [price, setPrice] = useState(null);
  const [payproceed, setPayproceed] = useState(false);
  const [amount, setAmount] = useState(0);
  const [coin, setCoin] = useState(0)

  const setPaymentState = () => {
    setPayproceed(!payproceed)
  }

  useEffect(() => {
    fetch("http://localhost:8080/coinprice")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(parseFloat(data.price_in_usd));
        setPrice(parseFloat(data.price_in_usd));
      })
      .catch((error) => {
        console.log(error.messages);
      });
  }, []);
  return (
    <div>
      <Navbar>
        {payproceed ? (
          <>
            <div className="p-20 pt-40">
              <Card className="bg-purple-800/30 border-2 border-blue-600 shadow-md shadow-purple-600 ">
                <CardBody className="flex justify-center mb-20 ">
                  <Payment
                    amount={amount}
                    total_coin={coin}
                    setPaymentState={setPaymentState}
                  />
                </CardBody>
              </Card>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-full flex justify-center items-center text-xl">
              <Card className="w-1/6 p-3 mt-40  border-4 border-purple-600 shadow-md shadow-purple-500">
                <CardBody>
                  <div className="text-white/0 nunito text-2xl text-center font-black mb-5">
                    <Logotext />
                  </div>
                  <div className=" mb-5 flex justify-center items-center">
                    {price ? (
                      <>
                        <Chip color="secondary" variant="solid">
                          <div className="flex flex-row gap-1 justify-center items-center">
                            <div>1</div>
                            <div>
                              <Image src={CoinImg} className="w-5 h-5" />
                            </div>
                            <div>=</div>
                            <div>{price}💲</div>
                          </div>
                        </Chip>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <Input
                      label="Amount of coin"
                      placeholder="Input amount of coin"
                      type="number"
                      min={10}
                      step={1}
                      color="primary"
                      onChange={(e) => {
                        const newCoinValue = parseInt(e.target.value);
                        setCoin(newCoinValue);
                        setAmount((newCoinValue * price).toFixed(1));
                      }}
                      className="mb-2"
                    />
                  </div>
                  <div className="mb-3 h-20">
                    Coin: {coin} <br />
                    Amount: {amount}💲
                  </div>
                  <div className=" flex justify-center items-center">
                    <Button
                      color="primary"
                      isDisabled={!(coin >= 10 && amount >= 10 * 0.1)}
                      onClick={setPaymentState}
                    >
                      Confirm
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </>
        )}
      </Navbar>
      <MainFooter />
    </div>
  );
}
