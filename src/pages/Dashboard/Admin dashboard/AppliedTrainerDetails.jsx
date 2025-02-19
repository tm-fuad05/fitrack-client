import React from "react";
import { useLoaderData } from "react-router-dom";
import Back from "../../../components/Shared/Back";
import { Helmet } from "react-helmet-async";

const AppliedTrainerDetails = () => {
  const appliedTrainer = useLoaderData();

  return (
    <div>
      <Helmet>
        <title>FitRack | Trainer details</title>
      </Helmet>
      <Back></Back>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-5">
        {appliedTrainer.fullName}'s Details
      </h2>
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-10/12 mx-auto">
        <img
          className="w-full h-[400px] lg:h-[500px] object-cover dark:text-gray-500"
          src={appliedTrainer.profileImage}
          alt={`${appliedTrainer.fullName} Profile`}
        />
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {appliedTrainer.fullName}
          </h2>
          <p className=" mt-2 text-sm px-3 py-2 bg-secondary w-fit text-white bg-opacity-80 rounded-full font-semibold ">
            {appliedTrainer?.email}
          </p>
          <p className="mt-6 text-gray-700 dark:text-gray-500 ">
            <span className="font-semibold ">Age:</span> {appliedTrainer.age}
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-500 ">
            <span className="font-semibold ">Years of Experience:</span>{" "}
            {appliedTrainer.yearsOfExperience}
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-500 ">
            <span className="font-semibold ">Available Time:</span>{" "}
            {appliedTrainer.availableTime}
          </p>
          {/* Devider */}
          <div className="border-b mt-3"></div>
          <p className="text-gray-700  dark:text-gray-500  mt-2 flex-grow ">
            <span className="font-semibold ">Skills:</span>{" "}
            <ul className="list-decimal pl-7 mt-1">
              {" "}
              {appliedTrainer?.skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </p>
          {/* Devider */}
          <div className="border-b mt-3"></div>
          <p className="text-gray-700 dark:text-gray-500  mt-2 flex-grow">
            <span className="font-semibold ">Available Days:</span>{" "}
            <ul className="mt-1 flex flex-wrap gap-1">
              {" "}
              {appliedTrainer?.availableDays?.map((day, index) => (
                <li
                  className="bg-gray-500 dark:bg-gray-700 rounded-full text-white font-[500] p-2 px-3"
                  key={index}
                >
                  {day}
                </li>
              ))}
            </ul>
          </p>

          <p className="mt-3">{appliedTrainer.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default AppliedTrainerDetails;
