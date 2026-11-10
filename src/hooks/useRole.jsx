import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { useAxiosSecure } from "./useAxios";
import Swal from "sweetalert2";

export const useCheckRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/check-user-role?email=${user?.email}`,
      );
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  const isAdmin = role === "ADMIN";
  const isTrainer = role === "TRAINER";

  return { isAdmin, isTrainer, isLoading };
};

export const useChangeRole = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ role, email }) => {
      const res = await axiosSecure.patch(
        `/users/change-user-role?email=${email}`,
        { role },
      );

      return res.data;
    },
    onSuccess: async (data) => {
      if (data?.success) {
        await Swal.fire({
          icon: "success",
          title: data?.message,
          showConfirmButton: false,
          timer: 1000,
        });
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });
  return mutation;
};
