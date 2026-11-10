import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxios";

export const useGetAllTransaction = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/transactions`);
        return data.data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
        return [];
      }
    },
  });
  return { data, isLoading };
};

export const useGetRecentTransaction = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/transactions/recent`);
        return data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
        return [];
      }
    },
  });
  return { data, isLoading };
};
