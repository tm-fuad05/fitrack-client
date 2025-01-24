import React from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Payment = () => {
  const { slot, membershipType, price } = useParams();
  console.log(slot, membershipType, price);
  const { user } = useAuth();

  return (
    <div className="my-20 w-10/12 mx-auto flex flex-col lg:flex-row gap-10">
      <Helmet>
        <title>FitRack | Payment</title>
      </Helmet>
      <div className="bg-gray-200 p-5 lg:w-1/2">
        <p>
          <span className="font-semibold">Name:</span> {user.displayName}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Selected Slot:</span> {slot}
        </p>
        <p>
          <span className="font-semibold">Package:</span> {membershipType}
        </p>
        <p>
          <span className="font-semibold">Price:</span> ${price}
        </p>
      </div>
      <div className="bg-primary p-5 lg:w-1/2">
        <p>
          <span className="font-semibold">Name:</span> {user.displayName}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Selected Slot:</span> {slot}
        </p>
        <p>
          <span className="font-semibold">Package:</span> {membershipType}
        </p>
        <p>
          <span className="font-semibold">Price:</span> ${price}
        </p>
      </div>
    </div>
  );
};

export default Payment;
