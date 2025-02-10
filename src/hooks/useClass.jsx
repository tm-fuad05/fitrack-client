import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useClass = ({ search }) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: classes = [],
    refetch,
    isLoading,
  } = useQuery({
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
  return { classes, refetch, isLoading };
};

export default useClass;
