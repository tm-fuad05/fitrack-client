import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAppliedTrainer = () => {
  const axiosSecure = useAxiosSecure();

  const { data: appliedTrainers = [], refetch } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/applied-as-trainer");
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  return { appliedTrainers, refetch };
};

export default useAppliedTrainer;
