import React from "react";
import trainer from "../../../assets/trainer.jpg";
import { Link } from "react-router-dom";
const BeATrainer = () => {
  return (
    <div className=" bg-gradient-to-b from-primary to-secondary text-white p-8 shadow-lg mt-10 flex flex-col-reverse md:flex-row items-center">
      <div className="flex flex-col justify-start md:w-2/4 p-5">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Join Us as a Trainer
        </h2>
        <p className="text-md lg:text-lg mb-8 w-10/12">
          Share your expertise and help others achieve their goals. Join our
          platform to make a difference and grow your career!
        </p>
        <Link to={"/become-a-trainer"}>
          <button className="bg-white text-primary font-medium px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transform transition duration-300 w-fit">
            Become a Trainer
          </button>
        </Link>
      </div>
      <div className="md:w-2/4">
        <img className="rounded-3xl" src={trainer} alt="" />
      </div>
    </div>
  );
};

export default BeATrainer;
