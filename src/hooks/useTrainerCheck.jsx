import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useTrainerCheck = () => {
  const { user, loader } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isTrainer, isPending: trainerLoading } = useQuery({
    queryKey: [user?.email, "trainer"],
    enabled: !loader,
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/user/trainer/${user.email}`);

        return data?.isTrainer;
      } catch (error) {
        console.error(error);
      }
    },
  });
  return { isTrainer, trainerLoading };
};

export default useTrainerCheck;
