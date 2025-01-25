import React from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_gateaway_PK);
const Payment = () => {
  const { slot, membershipType, price, trainerName } = useParams();
  console.log(slot, membershipType, price);
  const { user } = useAuth();

  return (
    <div className="my-20 w-10/12 mx-auto flex flex-col lg:flex-row gap-10">
      <Helmet>
        <title>FitRack | Payment</title>
      </Helmet>
      <div className="bg-gray-200 p-5 lg:w-1/2">
        <h2 className="flex flex-col">
          <span className="text-sm">Package price</span>{" "}
          <span className="text-4xl font-bold">${price}</span>
        </h2>
        <p>
          <span className="font-semibold">Name:</span> {user?.displayName}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user?.email}
        </p>
        <p>
          <span className="font-semibold">Selected Slot:</span> {slot}
        </p>
        <p>
          <span className="font-semibold">Package:</span> {membershipType}
        </p>
      </div>
      <div className="bg-gray-200 p-5 lg:w-1/2">
        <Elements stripe={stripePromise}>
          <CheckoutForm
            slot={slot}
            membershipType={membershipType}
            price={price}
            trainerName={trainerName}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
