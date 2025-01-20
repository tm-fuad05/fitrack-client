import React from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
} from "react-icons/io5";
import { useLoaderData } from "react-router-dom";
import BeATrainer from "./BeATariner";

const TrainerDetails = () => {
  const trainer = useLoaderData();

  return (
    <div className="py-20 px-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col lg:w-1/2">
        <img
          className="w-full h-[400px] object-cover"
          src={trainer.profileImage}
          alt={`${trainer.trainerName} Profile`}
        />
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-bold text-gray-800">
            {trainer.trainerName}
          </h2>
          <p className=" mt-2 text-sm px-3 py-2 bg-secondary w-fit text-white bg-opacity-80 rounded-full">
            {trainer.yearsOfExperience} Years of Experience
          </p>
          <p className="text-gray-700 mt-2 flex-grow">
            <span className="font-semibold ">Expertise in:</span>{" "}
            <ul className="list-decimal pl-7 mt-1">
              {" "}
              {trainer.expertise.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </p>
          <div className="border-b mt-3"></div>
          <p className="mt-3">{trainer.bio}</p>
          <div className=" mt-4 text-3xl text-secondary flex gap-3">
            <IoLogoFacebook className="hover:opacity-50 cursor-pointer" />
            <IoLogoInstagram className="hover:opacity-50 cursor-pointer" />
            <IoLogoTwitter className="hover:opacity-50 cursor-pointer" />
          </div>
        </div>
        <div className="bg-gray-100 p-4">
          <p className="text-gray-800 font-medium">
            Available Slots:{" "}
            <span className="text-secondary font-semibold">
              {trainer.availableSlots}
            </span>
          </p>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Available Slots
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* {slots.map((slot, index) => ( */}
          <button
            // key={index}
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            12
          </button>
          {/* ))} */}
        </div>
      </div>
      <BeATrainer></BeATrainer>
    </div>
  );
};

export default TrainerDetails;
