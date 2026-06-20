import React from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import {
  FiUser,
  FiMail,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
} from "react-icons/fi";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_gateaway_PK);

const Payment = () => {
  const { slot, membershipType, price, trainerName } = useParams();
  const { user } = useAuth();

  return (
    <div className="w-11/12 max-w-7xl mx-auto my-28 bg-transparent text-gray-900 dark:text-white antialiased">
      <Helmet>
        <title>FitRack | Payment</title>
      </Helmet>

      {/* Top Heading */}
      <div className="mb-12">
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 dark:text-white uppercase mb-2">
          Secure <span className="text-primary">Checkout</span>
        </h1>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-600">
          Finalize your payment parameters to activate your elite training
          package
        </p>
      </div>

      {/* Main Container Split Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Left Side: Premium Invoice / Summary Card */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8 rounded-3xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Huge Price Highlight */}
          <div className="flex flex-col mb-6 pb-6 border-b border-gray-200 dark:border-white/5">
            <span className="text-xs font-bold text-gray-600 dark:text-gray-500 uppercase tracking-widest">
              Total Amount Due
            </span>
            <span className="text-5xl font-black text-gray-950 dark:text-white tracking-tight mt-1">
              ${price}
              <span className="text-xs text-gray-600 dark:text-gray-500 font-semibold uppercase tracking-wider">
                .00 USD
              </span>
            </span>
          </div>

          {/* Itemized Specification Grid */}
          <div className="space-y-4">
            {/* User Profile Info */}
            <div className="flex items-center gap-3 text-sm">
              <FiUser className="text-primary shrink-0 text-base" />
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                <span className="text-gray-900 dark:text-gray-500 font-bold mr-1">
                  Client:
                </span>{" "}
                {user?.displayName}
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <FiMail className="text-primary shrink-0 text-base" />
              <p className="text-gray-700 dark:text-gray-300 font-medium truncate">
                <span className="text-gray-900 dark:text-gray-500 font-bold mr-1">
                  Email:
                </span>{" "}
                {user?.email}
              </p>
            </div>

            <div className="border-t border-dashed border-gray-200 dark:border-white/5 my-3"></div>

            {/* Session Logistics Info */}
            <div className="flex items-center gap-3 text-sm">
              <FiUser className="text-secondary shrink-0 text-base" />
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                <span className="text-gray-900 dark:text-gray-500 font-bold mr-1">
                  Instructor:
                </span>{" "}
                {trainerName}
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <FiClock className="text-secondary shrink-0 text-base" />
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                <span className="text-gray-900 dark:text-gray-500 font-bold mr-1">
                  Schedule:
                </span>{" "}
                {slot}
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <FiCheckCircle className="text-emerald-500 dark:text-emerald-400 shrink-0 text-base" />
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                <span className="text-gray-900 dark:text-gray-500 font-bold mr-1">
                  Tier Level:
                </span>{" "}
                {membershipType}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Stripe Interactive Payment Terminal */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8 rounded-3xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md shadow-xl relative">
          <div className="flex items-center gap-2 mb-6 text-sm font-black text-gray-900 dark:text-gray-500 uppercase tracking-widest">
            <FiCreditCard className="text-primary text-base" /> Card Credentials
          </div>

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
    </div>
  );
};

export default Payment;
