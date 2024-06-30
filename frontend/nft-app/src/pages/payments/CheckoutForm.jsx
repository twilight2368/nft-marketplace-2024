import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@nextui-org/react";
import { useLoginContext } from "../../context/LoginProvider";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({amount, total_coin}) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { userID } = useLoginContext();

  const handleSubmit = async (e) => {
    console.log("hello");
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      // confirmParams: {
      //   return_url: null, // Not using return_url
      // },
      redirect: "if_required", // Prevent automatic redirect
    });

    if (stripeError) {
      setMessage(stripeError.message);
    } else {
      fetch("http://localhost:8080/save-payment", {
        method: "POST",
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
          userId: userID,
          total_coin: total_coin,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setMessage(data.messages);
          console.log(data);
          setTimeout(() => {
            navigate('/dashboard')
          }, 3000);
        })
        .catch((e) => {
          setMessage(e.messages);
          console.log(e.messages);
        });
    }

    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className=" text-black flex flex-col justify-center items-center gap-5 p-5"
    >
      <PaymentElement id="payment-element" />
      <Button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        type="submit"
        color="primary"
      >
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message" className=" text-red-500 nunito">{message}</div>}
    </form>
  );
}
