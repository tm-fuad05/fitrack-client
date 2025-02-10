import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "./useAxiosPublic";

const useTrainer = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: trainers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      try {
        const { data } = await axiosPublic.get("/trainers");
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  return { trainers, refetch, isLoading };
};

export default useTrainer;
