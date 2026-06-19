import React, { useState } from "react";
import useTrainer from "../../hooks/useTrainer";
import TrainerCard from "./TrainerCard";
import Loader from "../Shared/Loader";
import { Select, Option } from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const TrainersCards = () => {
  const [sort, setSort] = useState("");
  const axiosPublic = useAxiosPublic();

  const {
    data: trainers = [],

    isLoading,
  } = useQuery({
    queryKey: ["trainers", sort],
    queryFn: async () => {
      try {
        const { data } = await axiosPublic.get(`/trainers?sort=${sort}`);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-11/12 mx-auto my-20">
      <div className="flex justify-between items-cente items-center mb-5">
        <h2 className="text-xl lg:text-3xl font-semibold text-foreground dark:text-foreground-dark">
          Trainers ({trainers?.length})
        </h2>
        <div>
          <Select
            onChange={(value) => setSort(value)}
            label="Sort by"
            value={sort}
            className="text-gray-700 dark:text-gray-200"
            labelProps={{
              className: "text-gray-700 dark:text-gray-200",
            }}
          >
            <Option value="age">Age</Option>
            <Option value="trainer experience">Trainer experience</Option>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer._id} trainer={trainer}></TrainerCard>
        ))}
      </div>
    </div>
  );
};

export default TrainersCards;
