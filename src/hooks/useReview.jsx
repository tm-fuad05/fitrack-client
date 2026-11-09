import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "./useAxios";

export const useGetAllReviews = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["review", "all"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/reviews");
        return res.data.data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
      }
    },
  });
  return { data, isLoading, refetch };
};
