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
    <div className="w-11/12 mx-auto my-20 bg-background dark:bg-background-dark">
      <div className="flex justify-between items-cente items-center mb-5">
        <h2 className="text-xl lg:text-3xl font-semibold text-foreground dark:text-foreground-dark">
          Trainers ({trainers?.length})
        </h2>
        <div>
          <Select
            label="Sort by"
            value={sort}
            onChange={(value) => setSort(value)}
            className="border-gray-300 text-foreground dark:border-gray-600 dark:text-foreground-dark"
            labelProps={{
              className:
                "text-foreground-muted dark:text-foreground-muted-dark peer-focus:text-primary",
            }}
            containerProps={{
              className:
                "min-w-[200px] [&_button]:text-foreground [&_button]:dark:text-foreground-dark",
            }}
            menuProps={{
              className:
                "bg-surface dark:bg-surface-elevated border border-gray-200 dark:border-gray-700",
            }}
          >
            <Option
              value="age"
              className="text-foreground dark:text-foreground-dark hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Age
            </Option>
            <Option
              value="trainer experience"
              className="text-foreground dark:text-foreground-dark hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Trainer experience
            </Option>
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
