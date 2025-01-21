import React from "react";
import useTrainer from "../../hooks/useTrainer";
import TrainerCard from "./TrainerCard";

const TrainersCards = () => {
  const { trainers } = useTrainer();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-20 w-11/12 mx-auto">
      {trainers.map((trainer) => (
        <TrainerCard key={trainer._id} trainer={trainer}></TrainerCard>
      ))}
    </div>
  );
};

export default TrainersCards;
