import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxios";

export const useGetAllNewsletter = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["newsletters"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/newsletter");
        return data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
      }
    },
  });
  return { data, isLoading };
};
