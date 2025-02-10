import React from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useNewsletter = () => {
  const axiosSecure = useAxiosSecure();

  const { data: newsletters = [], isLoading } = useQuery({
    queryKey: ["newsletters"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/newsletter");
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  return { newsletters, isLoading };
};

export default useNewsletter;
