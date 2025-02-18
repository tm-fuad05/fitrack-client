import React from "react";
import Button from "../Shared/Button";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const TrainerCard = ({ trainer }) => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <img
        className="w-full h-[340px] md:h-64 object-cover"
        src={trainer.profileImage}
        alt={`${trainer.trainerName} Profile`}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {trainer.fullName}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm ">
          {trainer.yearsOfExperience} Years of Experience
        </p>
        <p className="text-gray-700 dark:text-gray-400 mt-2 ">
          <span className="font-semibold">Age:</span> {trainer.age}
        </p>
        <p className="text-gray-700 dark:text-gray-400 mt-2 flex-grow">
          <span className="font-semibold">Expertise:</span>{" "}
          {trainer.skills.map((skill, index) => (
            <span key={index} className="text-gray-500 dark:text-gray-400">
              {skill}
              {index < trainer.skills.length - 1 && ", "}
            </span>
          ))}
        </p>
        <div className=" mt-4 text-3xl text-secondary flex gap-3">
          <IoLogoFacebook className="hover:opacity-50 cursor-pointer" />
          <IoLogoInstagram className="hover:opacity-50 cursor-pointer" />
          <IoLogoTwitter className="hover:opacity-50 cursor-pointer" />
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-black/15 p-4">
        <p className="text-gray-800 dark:text-gray-400 font-medium">
          Available Slots:{" "}
          <span className="text-secondary font-semibold">
            {trainer.availableDays.length}
          </span>
        </p>
        <div className="mt-2">
          <Link to={`/all-trainer/trainer/${trainer.fullName}`}>
            <Button
              text={"know more"}
              hoverText={"white"}
              dark={"white"}
            ></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
