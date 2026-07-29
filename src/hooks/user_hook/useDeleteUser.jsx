import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../axios_hook/useAxiosSecure";
import Swal from "sweetalert2";

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
        title: error.message,
        icon: "error",
      });
    },
  });
  return mutation;
}
