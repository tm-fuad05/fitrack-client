import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useClass = () => {
  const axiosPublic = useAxiosPublic();

  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/classes");
      return data;
    },
  });
  return { classes, refetch };
};

export default useClass;
