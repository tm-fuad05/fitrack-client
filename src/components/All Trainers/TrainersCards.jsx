import React from "react";
import useTrainer from "../../hooks/useTrainer";
import TrainerCard from "./TrainerCard";

const TrainersCards = () => {
  const { trainers } = useTrainer();

  return (
    <div className=" w-11/12 mx-auto my-20">
      <h2 className="text-xl lg:text-3xl font-semibold mb-5">
        Trainers ({trainers?.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer._id} trainer={trainer}></TrainerCard>
        ))}
      </div>
    </div>
  );
};

export default TrainersCards;
