import React from "react";

const BeATrainer = () => {
  return (
    <div className="bg-gradient-to-b from-primary to-secondary text-white py-12 px-6 text-center rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
        Join Us as a Trainer
      </h2>
      <p className="text-md lg:text-lg mb-8">
        Share your expertise and help others achieve their goals. Join our
        platform to make a difference and grow your career!
      </p>
      <button className="bg-white text-primary font-medium px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transform transition duration-300">
        Become a Trainer
      </button>
    </div>
  );
};

export default BeATrainer;
