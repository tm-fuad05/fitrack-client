import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useNewsletter = () => {
  const axiosPublic = useAxiosPublic();

  const { data: newsletters = [] } = useQuery({
    queryKey: ["newsletters"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/newsletter");
      return data;
    },
  });
  return newsletters;
};

export default useNewsletter;
