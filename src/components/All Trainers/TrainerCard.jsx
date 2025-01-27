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
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <img
        className="w-full h-[340px] md:h-64 object-cover"
        src={trainer.profileImage}
        alt={`${trainer.trainerName} Profile`}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-800">{trainer.fullName}</h2>
        <p className="text-gray-600 mt-2 text-sm ">
          {trainer.yearsOfExperience} Years of Experience
        </p>
        <p className="text-gray-700 mt-2 flex-grow">
          <span className="font-semibold">Expertise:</span>{" "}
          {trainer.skills.map((skill, index) => (
            <span key={index} className="text-gray-500">
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
      <div className="bg-gray-100 p-4">
        <p className="text-gray-800 font-medium">
          Available Slots:{" "}
          <span className="text-secondary font-semibold">
            {trainer.availableDays.length}
          </span>
        </p>
        <div className="mt-2">
          <Link
            to={`/all-trainer/trainer/${encodeURIComponent(trainer.fullName)}`}
          >
            <Button text={"know more"} hoverText={"white"}></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
