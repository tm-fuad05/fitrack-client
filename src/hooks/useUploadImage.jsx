import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxios";
import Swal from "sweetalert2";

export const useUploadImage = () => {
  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async ({ file, path }) => {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axiosSecure.post(`/upload-image/${path}`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return res.data;
    },
    onError: async () => {
      await Swal.fire({
        title: "Something went wrong",
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });
  return mutation;
};
