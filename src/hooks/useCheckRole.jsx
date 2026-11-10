import { useMutation, useQuery } from "@tanstack/react-query";
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

export const useChangeRole = (id) => {
  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.patch(`/users/change-user-role/${id}`);

      return res.data;
    },
    onSuccess: async (data) => {
      if (data?.success) {
        await Swal.fire({
          title: data?.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
  });
  return mutation;
};
