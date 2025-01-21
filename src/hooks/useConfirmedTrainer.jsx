import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useConfirmedTrainer = () => {
  const axiosPublic = useAxiosPublic();

  const { data: confirmedTrainers = [], refetch } = useQuery({
    queryKey: ["confirmed trainers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/confirmed-trainer");
      return data;
    },
  });
  return { confirmedTrainers, refetch };
};

export default useConfirmedTrainer;
