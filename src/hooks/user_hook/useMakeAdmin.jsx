import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../axios_hook/useAxiosSecure";
import Swal from "sweetalert2";

export function useMakeAdmin() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async (user) => {
      return await axiosSecure.patch(`/users/make-admin/${user._id}`);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Swal.fire({
        title: "Privileges Elevated",
        text: `${variables.name} is now registered under the Admin tier.`,
        icon: "success",
      });
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
