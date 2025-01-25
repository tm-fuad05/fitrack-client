import React from "react";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
const Packages = ({ slot, trainerName }) => {
  const packages = [
    {
      membershipType: "Basic Membership",
      benefits: [
        "Access to gym facilities during regular operating hours.",
        "Use of cardio and strength training equipment.",
        "Access to locker rooms and showers.",
      ],
      price: 10,
    },
    {
      membershipType: "Standard Membership",
      benefits: [
        "All benefits of the basic membership.",
        "Access to group fitness classes such as yoga, spinning, and Zumba.",
        "Use of additional amenities like a sauna or steam room.",
      ],
      price: 50,
    },
    {
      membershipType: "Premium Membership",
      benefits: [
        "All benefits of the standard membership.",
        "Access to personal training sessions with certified trainers.",
        "Discounts on additional services such as massage therapy or nutrition counseling.",
      ],
      price: 100,
    },
  ];

  return (
    <div className="my-10">
      <h1 className="uppercase text-2xl lg:text-3xl font-bold text-center mb-5">
        choose a plan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {packages.map((p, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 text-center bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white border p-5 py-16 px-10 hover:shadow-2xl duration-300"
          >
            <h3 className="text-2xl font-bold">{p.membershipType} </h3>
            <h2 className="text-4xl font-extrabold">{p.price}$</h2>
            {p.benefits.map((benefit) => (
              <p className="flex items-center text-center gap-1 flex-grow text-gray-200">
                <TiTick /> {benefit}
              </p>
            ))}
            <Link
              to={`/payment/${trainerName}/${slot}/${p.membershipType}/${p.price}`}
              className="bg-white text-primary px-4 py-2 w-fit mx-auto mt-5 font-semibold hover:scale-105 duration-100"
            >
              Join Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
