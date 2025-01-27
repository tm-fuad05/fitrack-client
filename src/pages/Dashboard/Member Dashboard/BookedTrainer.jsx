import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Textarea,
} from "@material-tailwind/react";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa6";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const BookedTrainer = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: [user?.email, "payments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/payments/user?email=${user?.email}`
      );
      return data;
    },
  });

  const [ratingValue, setRatingValue] = useState(0);

  const handleRatingChange = (value) => {
    setRatingValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    const review = {
      name: user?.displayName,
      review: feedback,
      rating: ratingValue,
    };

    axiosSecure.post("/reviews", review).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Feedback Sent",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>FitRack | Booked</title>
      </Helmet>
      {/* Simple Header */}
      <h1 className="text-2xl font-bold mb-4">Booked Trainers</h1>

      {/* Total Count */}
      {payments?.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-600">
            Total Booked Trainers: {payments?.length}
          </p>
        </div>
      )}
      {payments.length === 0 ? (
        <p className="text-center mt-5">No Trainers Booked</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {payments.map((p) => (
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h2 className="text-2xl font-bold mb-2">{p.membershipType}</h2>
              <p className="text-gray-500 mb-4">{p.trainer}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-4xl font-bold">${p.price}</span>
                <span className="text-gray-500">{p.membershipType}</span>
              </div>
              <p className="text-gray-500 flex-grow">Booked Date: {p.date} </p>
              <button
                onClick={handleOpen}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Review
              </button>
              <Dialog open={open}>
                <DialogHeader>Send Feedback</DialogHeader>
                <DialogBody>
                  <form onSubmit={handleSubmit}>
                    <Textarea name="feedback" label="Feedback" required />
                    <div className="mt-5 w-fit mx-auto">
                      <h3 className="text-center font-semibold mb-2 text-xl">
                        Rate Us
                      </h3>
                      <Rating
                        onChange={handleRatingChange}
                        initialRating={0}
                        emptySymbol={
                          <FaRegStar className="text-3xl text-yellow-700" />
                        }
                        fullSymbol={
                          <FaStar className="text-3xl text-yellow-700" />
                        }
                        max={5}
                      />
                    </div>
                    <div className="text-right">
                      <button
                        onClick={handleOpen}
                        className="capitalize bg-gradient-to-r from-primary to-secondary text-white  hover:bg-gradient-to-l hoverfrom-primary hover:to-secondary font-[400] px-3 py-2 rounded-md"
                      >
                        send feedback
                      </button>
                    </div>
                  </form>
                  <button
                    className="px-3 py-2 rounded-md hover:bg-gray-100"
                    onClick={handleOpen}
                  >
                    Cancel
                  </button>
                </DialogBody>
              </Dialog>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;
