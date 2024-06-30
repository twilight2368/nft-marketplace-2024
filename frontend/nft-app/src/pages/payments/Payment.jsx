import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

import { useLoginContext } from "../../context/LoginProvider";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import CoinImg from "../../assets/icons/pizza.png";
import Logotext from "../../components/logo/Logotext";

function Payment({ amount, total_coin, setPaymentState }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { userID } = useLoginContext();

  useEffect(() => {
    console.log(userID);
    setStripePromise(loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: parseInt(amount * 100),
        total_coin: parseInt(total_coin),
        userid: userID,
      }),
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log("done");
        setClientSecret(data.clientSecret);
      })
      .catch((e) => {
        console.log(e.mees);
      });
  }, []);

  return (
    <>
      <div className=" flex flex-row justify-center items-center">
        <div className="w-1/2 flex justify-center items-center">
          <Card className="text-white border-4 border-blue-500 shadow-lg shadow-purple-500 w-1/2">
            <CardBody>
              <div className=" text-center  text-white/0 poetsen-one-regular text-3xl mb-10">
                <Logotext />
              </div>
              <div className="flex flex-row justify-center items-center mb-5">
                <div>Amount of coins: {total_coin} </div>
                <Image src={CoinImg} className="h-5 w-5" />
              </div>
              <div className="flex flex-row justify-center items-center  mb-5">
                <div>Total in USD: {amount} 💵</div>
              </div>
              <div className="flex justify-center items-center">
                <Button onClick={setPaymentState} color="warning" variant="ghost">Back</Button>
              </div>
            </CardBody>
            <CardFooter>
              <div className=" w-full h-full text-center">
                <span class="block text-sm nunito text-gray-500  sm:text-center ">
                  © 2024{" "}
                  <a href="#" class="hover:underline text-blue-500 ">
                    FastFoodie™
                  </a>
                  . All Rights Reserved.
                </span>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className=" w-1/2 h-full pt-24 flex justify-center items-center px-0">
          {clientSecret && stripePromise ? (
            <>
              <Card className="text-white bg-white nunito w-2/3 p-6  ">
                {clientSecret && stripePromise && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm amount={amount} total_coin={total_coin} />
                  </Elements>
                )}
              </Card>
            </>
          ) : (
            <>
              <span className="loading loading-dots loading-lg"></span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Payment;
