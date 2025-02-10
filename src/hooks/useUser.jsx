import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/users");
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return { users, refetch, isLoading };
};

export default useUser;
