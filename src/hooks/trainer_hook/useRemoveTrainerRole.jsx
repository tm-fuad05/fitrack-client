import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../axios_hook/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../useAuth";

export function useRemoveTrainerRole() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const mutation = useMutation({
    mutationFn: async (trainer) => {
      return await axiosSecure.patch(`/users/make-member/${trainer._id}`);
    },
    onSuccess: (data, variables) => {
      Swal.fire({
        title: "Role Revoked",
        text: `${variables.name} has been successfully reverted to a member.`,
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      Swal.fire({
        title: err.message,
        icon: "error",
      });
    },
  });
  return mutation;
}
