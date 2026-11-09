import { useAxiosPublic } from "./useAxios";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCommunities = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: communities = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["community", "all"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/communities");
        return res.data.data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
      }
    },
  });
  return { communities, refetch, isLoading };
};

export const useGetRecentCommunities = () => {
  const axiosPublic = useAxiosPublic();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["community", "recent"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/communities/recent");
        return res.data.data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
      }
    },
  });
  return { data, refetch, isLoading };
};
