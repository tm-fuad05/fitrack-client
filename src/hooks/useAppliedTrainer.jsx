import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAppliedTrainer = () => {
  const axiosPublic = useAxiosPublic();

  const { data: appliedTrainers = [], refetch } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/applied-as-trainer");
      return data;
    },
  });
  return { appliedTrainers, refetch };
};

export default useAppliedTrainer;
