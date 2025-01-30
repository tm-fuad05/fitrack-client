import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useClass = ({ search }) => {
  const axiosPublic = useAxiosPublic();

  const { data: classes = [], refetch } = useQuery({
    queryKey: [search, "classes"],
    queryFn: async () => {
      try {
        const { data } = await axiosPublic.get(`/classes?search=${search}`);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  return { classes, refetch };
};

export default useClass;
