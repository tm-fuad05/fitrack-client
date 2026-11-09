import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxios";
import Swal from "sweetalert2";

export function useMakeAdmin() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async (user) => {
      await axiosSecure.patch(`/users/make-admin/${user._id}`);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Swal.fire({
        title: "Privileges Elevated",
        text: `${variables.name} is now registered under the Admin tier.`,
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
