import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import BeATrainer from "./BeATariner";
import { Helmet } from "react-helmet-async";

const TrainerDetails = () => {
  const trainer = useLoaderData();

  return (
    <div className="pt-20 ">
      <Helmet>
        <title>FitRack | Details</title>
      </Helmet>
      <section className="w-11/12 mx-auto flex flex-col lg:flex-row gap-10 mb-32">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 lg:w-1/2">
          <img
            className="w-full h-[400px] lg:h-[500px] object-cover"
            src={trainer.profileImage}
            alt={`${trainer.fullName} Profile`}
          />
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-xl font-bold text-gray-800">
              {trainer.fullName}
            </h2>
            <p className=" mt-2 text-sm px-3 py-2 bg-secondary w-fit text-white bg-opacity-80 rounded-full font-semibold">
              {trainer.email}
            </p>
            <p className="mt-6 text-gray-700">
              <span className="font-semibold ">Age:</span> {trainer.age}
            </p>
            <p className="mt-2 text-gray-700">
              <span className="font-semibold ">Years of Experience:</span>{" "}
              {trainer.yearsOfExperience}
            </p>
            <p className="mt-2 text-gray-700">
              <span className="font-semibold ">Available Time:</span>{" "}
              {trainer.availableTime}
            </p>
            {/* Devider */}
            <div className="border-b mt-3"></div>
            <p className="text-gray-700 mt-2 flex-grow">
              <span className="font-semibold ">Skills:</span>{" "}
              <ul className="list-decimal pl-7 mt-1">
                {" "}
                {trainer.skills?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </p>
            {/* Devider */}
            <div className="border-b mt-3"></div>
            <p className="text-gray-700 mt-2 flex-grow">
              <span className="font-semibold ">Available Days:</span>{" "}
              <ul className="mt-1 flex flex-wrap gap-1">
                {" "}
                {trainer.availableDays?.map((day, index) => (
                  <li
                    className="bg-gray-500 rounded-full text-white font-[500] p-2 px-3"
                    key={index}
                  >
                    {day}
                  </li>
                ))}
              </ul>
            </p>

            <p className="mt-3">{trainer.bio}</p>
          </div>
        </div>
        {/* Slots */}
        <div className="lg:w-1/2">
          <div className="bg-white shadow-xl rounded-lg p-6  border">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Available Slots{" "}
              <span className="font-[300]">
                {" "}
                (
                {trainer.availableDays.map((day, idx) => (
                  <span key={idx}>{day},</span>
                ))}{" "}
                <span>{trainer.availableTime}</span>)
              </span>
            </h2>
            <div className="flex gap-4">
              {trainer.availableDays?.map((day) => (
                <Link
                  to={`/trainer-booking/${trainer.fullName}/${day} (${trainer.availableTime})/${trainer.skills}`}
                  className="bg-blue-500 text-white font-medium py-2 px-4 text-center rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  {day} ({trainer.availableTime})
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section>
        <BeATrainer></BeATrainer>
      </section>
    </div>
  );
};

export default TrainerDetails;
