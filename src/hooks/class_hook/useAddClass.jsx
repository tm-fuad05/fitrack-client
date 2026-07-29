import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../axios_hook/useAxiosSecure";
import { useNavigate } from "react-router-dom";

export function useAddClass() {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const mutation = useMutation({
    mutationFn: async (newClass) => {
      await axiosSecure.post("/classes", newClass);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Class Dispatched Successfully",
        text: "The structural class profile has been added to index.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/all-classes");
      }, 1500);
    },
    onError: (error) => {
      Swal.fire({
        title: error.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
  return mutation;
}
