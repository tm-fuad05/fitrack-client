import Swal from "sweetalert2";
import { useAxiosPublic, useAxiosSecure } from "./useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllUsers() {
  const axiosSecure = useAxiosSecure();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["user", "all"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/users");
        return data.data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
      }
    },
  });

  return { data, refetch, isLoading };
}

export function useGetUserByEmail(email = "") {
  const axiosPublic = useAxiosPublic();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["user", "by-email", email],
    queryFn: async () => {
      try {
        const { data } = await axiosPublic.get(`/users/user?email=${email}`);
        return data.data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
      }
    },
  });

  return { data, refetch, isLoading };
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async (user) => {
      const res = await axiosSecure.delete(`/users/delete/${user._id}`);
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        Swal.fire({
          title: "User Deleted",
          text: `${variables.name} has been erased from user list.`,
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      }
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
