import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ slot, membershipType, price, trainerName }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transaction, setTransaction] = useState("");

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    // Confirm Payment
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
      alert(confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransaction(paymentIntent.id);
        const date = new Date();
        const paymentInfo = {
          email: user?.email,
          name: user?.displayName,
          price: price,
          slot: slot,
          membershipType: membershipType,
          trainer: trainerName,
          date: moment(date).format("MMM DD ,YYYY"),
        };
        try {
          const { data } = await axiosSecure.post("/payments", paymentInfo);
          if (data.insertedId) {
            Swal.fire({
              title: "Payment Successfull",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
            setTimeout(() => {
              navigate("/dashboard/booked-trainers");
            }, 1500);
          }
        } catch (error) {
          alert(`Failed to pay : ${error.message || error}`);
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <p className="text-xs text-red-500 mt-2">{error}</p>
        <button
          disabled={!stripe || !clientSecret}
          type="submit"
          className="bg-gradient-to-r from-primary to-secondary px-4 py-2 font-semibold text-white rounded-md hover:opacity-50 mt-10 cursor-pointer"
        >
          Pay
        </button>
        {transaction && (
          <p className="text-xs text-green-500 mt-2">
            Transaction ID:{transaction}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
