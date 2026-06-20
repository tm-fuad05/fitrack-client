import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FiLock, FiLoader } from "react-icons/fi";

const CheckoutForm = ({ slot, membershipType, price, trainerName }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transaction, setTransaction] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // ডার্ক মোড ডিটেকশনের জন্য রিয়্যাক্টিভ চেক
  const isDark = document.documentElement.classList.contains("dark");

  useEffect(() => {
    if (price) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || isProcessing) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    setIsProcessing(true);
    setError("");

    // Create Payment Method
    const { error: methodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (methodError) {
      setError(methodError.message);
      setIsProcessing(false);
      return;
    }

    // Confirm Card Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setIsProcessing(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransaction(paymentIntent.id);

        const paymentInfo = {
          email: user?.email,
          name: user?.displayName,
          price: price,
          slot: slot,
          membershipType: membershipType,
          trainer: trainerName,
          date: moment().format("MMM DD, YYYY"),
        };

        try {
          const { data } = await axiosSecure.post("/payments", paymentInfo);
          if (data.insertedId) {
            Swal.fire({
              title: "Payment Successful",
              text: `Transaction ID: ${paymentIntent.id}`,
              icon: "success",
              background: isDark ? "#171717" : "#ffffff",
              color: isDark ? "#ffffff" : "#171717",
              showConfirmButton: false,
              timer: 2500,
            });
            setTimeout(() => {
              navigate("/dashboard/booked-trainers");
            }, 2000);
          }
        } catch (postError) {
          setError(`Failed to synchronize backend: ${postError.message}`);
          setIsProcessing(false);
        }
      }
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Styled Card Input Container */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-500 uppercase tracking-wider">
            Credit or Debit Card
          </label>
          <div className="p-4 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 transition-all duration-300 focus-within:border-primary/50 dark:focus-within:border-primary/40 shadow-inner">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    fontFamily: "Geist Mono, Inter, sans-serif",
                    color: isDark ? "#ffffff" : "#111827",
                    "::placeholder": {
                      color: isDark ? "#6b7280" : "#9ca3af",
                    },
                  },
                  invalid: {
                    color: "#ef4444",
                    iconColor: "#ef4444",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Error Messaging Output */}
        {error && (
          <p className="text-xs font-semibold text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20 animate-pulse">
            ⚠️ {error}
          </p>
        )}

        {/* Dynamic State Submit Button */}
        <button
          disabled={!stripe || !clientSecret || isProcessing}
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary disabled:from-gray-400 disabled:to-gray-500 dark:disabled:from-white/10 dark:disabled:to-white/10 disabled:text-gray-300 dark:disabled:text-gray-500 py-3.5 px-4 font-black text-sm text-white rounded-xl shadow-lg shadow-primary/10 transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed cursor-pointer"
        >
          {isProcessing ? (
            <>
              <FiLoader className="animate-spin text-lg" />
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <FiLock className="text-base" />
              <span>Authorize Guarded Payment of ${price}</span>
            </>
          )}
        </button>

        {/* Success Transaction Output */}
        {transaction && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Payment Handshaking Complete!
            </p>
            <p className="text-[11px] font-mono text-gray-500 dark:text-gray-400 mt-1 select-all">
              ID: {transaction}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
