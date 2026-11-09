import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosPublic } from "./useAxios";
import { useAxiosSecure } from "./useAxios";
import useAuth from "./useAuth";
import Swal from "sweetalert2";

export const useGetAllTrainers = (sort = "") => {
  const axiosPublic = useAxiosPublic();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["trainer", "all", sort],

    queryFn: async () => {
      try {
        const res = await axiosPublic.get(`/trainers?sort=${sort}`);
        return res.data.data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
      }
    },
  });
  return { data, refetch, isLoading };
};

export const useTrainerCheck = () => {
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
        console.error(error?.response?.data?.message || error?.message);
      }
    },
  });
  return { isTrainer, trainerLoading };
};

export function useRemoveTrainerRole() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (trainer) => {
      await axiosSecure.patch(`/users/make-member/${trainer._id}`);
    },
    onSuccess: (_, variables) => {
      Swal.fire({
        title: "Role Revoked",
        text: `${variables.name} has been successfully reverted to a member.`,
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      Swal.fire({
        title: error?.response?.data?.message || error?.message,
        icon: "error",
      });
    },
  });
  return mutation;
}
