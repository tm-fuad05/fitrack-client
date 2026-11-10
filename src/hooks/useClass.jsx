import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "./useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAxiosSecure } from "./useAxios";

export const useGetAllClasses = ({ search }) => {
  const axiosPublic = useAxiosPublic();

  const { data, refetch, isLoading } = useQuery({
    queryKey: [search, "classes"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(`/classes?search=${search}`);
        return res.data.data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
      }
    },
  });
  return { data, refetch, isLoading };
};

export function useAddClass() {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const mutation = useMutation({
    mutationFn: async (newClass) => {
      await axiosSecure.post("/classes", newClass);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Class Added Successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/classes");
      }, 1000);
    },
    onError: (error) => {
      Swal.fire({
        title: error?.response?.data?.message || error?.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });
  return mutation;
}
