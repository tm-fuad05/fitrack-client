import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useCommunity = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: communities = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["community"],
    queryFn: async () => {
      try {
        const { data } = await axiosPublic.get("/community");
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  return { communities, refetch, isLoading };
};

export default useCommunity;
