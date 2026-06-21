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
    <div className="bg-surface dark:bg-surface-dark/40 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <img
        className="w-full h-[340px] md:h-64 object-cover"
        src={trainer.profileImage}
        alt={`${trainer.trainerName} Profile`}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-foreground dark:text-foreground-dark">
          {trainer.fullName}
        </h2>
        <p className="text-foreground-muted dark:text-foreground-muted-dark mt-2 text-sm">
          {trainer.yearsOfExperience} Years of Experience
        </p>
        <p className="text-foreground-muted dark:text-foreground-muted-dark mt-2">
          <span className="font-semibold">Age:</span> {trainer.age}
        </p>
        <p className="text-foreground-muted dark:text-foreground-muted-dark mt-2 flex-grow">
          <span className="font-semibold">Expertise:</span>{" "}
          {trainer.skills.map((skill, index) => (
            <span
              key={index}
              className="text-foreground-muted dark:text-foreground-muted-dark"
            >
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
      <div className="w-full h-px bg-gray-200 dark:bg-gray-800" />
      <div className="p-4">
        <p className="text-foreground dark:text-foreground-dark font-medium">
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
