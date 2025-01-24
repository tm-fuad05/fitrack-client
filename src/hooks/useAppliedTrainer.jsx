import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAppliedTrainer = () => {
  const axiosSecure = useAxiosSecure();

  const { data: appliedTrainers = [], refetch } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/applied-as-trainer");
      return data;
    },
  });
  return { appliedTrainers, refetch };
};

export default useAppliedTrainer;
