import React, { useState } from "react";
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

  return (
    <div className="w-11/12 mx-auto my-20">
      <div className="flex flex-col gap-5 md:flex-row justify-between items-cente items-center mb-5">
        <div className="flex items-center pl-4 border-l-4 border-primary/90 py-1">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 dark:text-white uppercase">
            All Trainers{" "}
            <span className="text-primary font-extrabold tracking-wide">
              [{trainers?.length || 0}]
            </span>
          </h2>
        </div>
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
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer._id} trainer={trainer}></TrainerCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainersCards;
