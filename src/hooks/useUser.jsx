import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/users");
        return data.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return { users, refetch };
};

export default useUser;
