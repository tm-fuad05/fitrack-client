import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "./useAxiosPublic";

const useTrainer = ({ sort }) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: trainers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["trainers", sort],
    queryFn: async () => {
      try {
        const { data } = await axiosPublic.get(`/trainers?sort=${sort}`);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  return { trainers, refetch, isLoading };
};

export default useTrainer;
