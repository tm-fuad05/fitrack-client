import Swal from "sweetalert2";
import { useAxiosPublic, useAxiosSecure } from "./useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllUsers() {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/users");
        return data.data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
      }
    },
  });

  return { users, refetch, isLoading };
}

export function useGetSpacificUser(email = "") {
  const axiosPublic = useAxiosPublic();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["user", "single", email],
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
      return await axiosSecure.delete(`/users/${user._id}`);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Swal.fire({
        title: "User Deleted",
        text: `${variables.name} has been erased from user list.`,
        icon: "success",
      });
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
