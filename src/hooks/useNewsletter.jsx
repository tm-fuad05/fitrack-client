/* eslint-disable no-unused-vars */
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxiosPublic, useAxiosSecure } from "./useAxios";
import Swal from "sweetalert2";

export const useGetAllNewsletter = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["newsletter", "all"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/newsletters");
        return data.data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
      }
    },
  });
  return { data, isLoading };
};

export const usePostNewsletter = () => {
  const axiosPublic = useAxiosPublic();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosPublic.post("/newsletters", payload);
      return res.data;
    },
  });
  return mutation;
};
