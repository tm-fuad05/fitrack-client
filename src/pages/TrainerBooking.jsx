import React from "react";
import { useParams } from "react-router-dom";
import Packages from "../components/Shared/Packages";
import { Helmet } from "react-helmet-async";

const TrainerBooking = () => {
  const { trainerName, slot, skills } = useParams();

  return (
    <div className="my-20 w-10/12 mx-auto ">
      <Helmet>
        <title>FitRack | Booking</title>
      </Helmet>
      <div className="text-xl bg-gray-200 p-5 font-poppins mb-32">
        <p>
          {" "}
          <span className="font-semibold">Trainer:</span> {trainerName}
        </p>
        <p>
          <span className="font-semibold">Selected Slot:</span> {slot}
        </p>
        <p>
          <span className="font-semibold">Skills:</span> {skills}
        </p>
      </div>
      <Packages slot={slot} trainerName={trainerName}></Packages>
    </div>
  );
};

export default TrainerBooking;
