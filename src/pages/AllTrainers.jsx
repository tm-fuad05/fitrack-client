import React from "react";
import Coverpage from "../components/Shared/Coverpage";
import trainers from "../assets/trainers.png";
import TrainersCards from "../components/All Trainers/TrainersCards";
import { Helmet } from "react-helmet-async";

const AllTrainers = () => {
  return (
    <div>
      <Helmet>
        <title>FitRack | All trainer</title>
      </Helmet>
      <Coverpage
        bg={trainers}
        subtitle={"Our Trainers"}
        title={"Meet Your Fitness Experts"}
      ></Coverpage>
      <TrainersCards></TrainersCards>
    </div>
  );
};

export default AllTrainers;
