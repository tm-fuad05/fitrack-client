import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "./useAxiosPublic";

const useTrainer = () => {
  const axiosPublic = useAxiosPublic();

  const { data: trainers = [] } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/trainers");
      return data;
    },
  });
  return trainers;
};

export default useTrainer;
