import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useClass = ({ search }) => {
  const axiosPublic = useAxiosPublic();

  const { data: classes = [], refetch } = useQuery({
    queryKey: [search, "classes"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/classes?search=${search}`);
      return data;
    },
  });
  return { classes, refetch };
};

export default useClass;
