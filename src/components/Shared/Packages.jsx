import React from "react";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import { HiOutlineSparkles } from "react-icons/hi2";

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
      isPopular: false,
    },
    {
      membershipType: "Standard Membership",
      benefits: [
        "All benefits of the basic membership.",
        "Access to group fitness classes such as yoga, spinning, and Zumba.",
        "Use of additional amenities like a sauna or steam room.",
      ],
      price: 50,
      isPopular: true,
    },
    {
      membershipType: "Premium Membership",
      benefits: [
        "All benefits of the standard membership.",
        "Access to personal training sessions with certified trainers.",
        "Discounts on additional services such as massage therapy or nutrition counseling.",
      ],
      price: 100,
      isPopular: false,
    },
  ];

  return (
    <div className="w-11/12 max-w-7xl mx-auto my-16 bg-transparent text-gray-900 dark:text-white antialiased">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
          Choose a <span className="text-primary">Plan</span>
        </h1>
        <p className="text-sm font-medium mt-1 text-gray-500 dark:text-gray-400">
          Select the perfect tier tailored to fuel your ultimate physical
          evolution
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {packages.map((p, idx) => (
          <div
            key={idx}
            className={`flex flex-col justify-between p-8 py-12 rounded-3xl border transition-all duration-300 relative overflow-hidden group shadow-xl hover:shadow-2xl ${
              p.isPopular
                ? "border-primary/60 dark:border-primary/50 bg-gray-100/80 dark:bg-transparent scale-102 lg:scale-105 z-10"
                : "border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md"
            }`}
          >
            {/* Spotlight Accent Glow */}
            <div
              className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none group-hover:opacity-100 transition-opacity duration-500 ${
                p.isPopular
                  ? "bg-primary/10 opacity-100"
                  : "bg-primary/5 opacity-5"
              }`}
            />

            {/* Popular Badge */}
            {p.isPopular && (
              <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                <HiOutlineSparkles /> Most Popular
              </div>
            )}

            {/* Content Top */}
            <div className="space-y-6 flex-grow flex flex-col">
              <div className="space-y-2">
                <h3 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                  {p.membershipType}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl lg:text-5xl font-black text-gray-950 dark:text-white tracking-tight">
                    ${p.price}
                  </span>
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    / month
                  </span>
                </div>
              </div>

              <div className="border-b border-gray-200 dark:border-white/5 w-full"></div>

              {/* Benefits List */}
              <div className="flex flex-col gap-3.5 flex-grow justify-start">
                {p.benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center font-bold">
                      <TiTick className="text-lg" />
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 leading-normal font-normal">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 pt-4 w-full">
              <Link
                to={`/payment/${trainerName}/${slot}/${p.membershipType}/${p.price}`}
                className={`w-full block py-3.5 rounded-xl font-black text-sm tracking-wide text-center transition-all duration-300 shadow-md ${
                  p.isPopular
                    ? "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-95 shadow-primary/20 transform hover:-translate-y-0.5"
                    : "bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-200 hover:border-primary/50 dark:hover:border-primary/40 hover:bg-gray-50 dark:hover:bg-white/10"
                }`}
              >
                Join Plan Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
