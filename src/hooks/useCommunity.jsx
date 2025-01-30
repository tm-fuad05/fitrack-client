import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useCommunity = () => {
  const axiosPublic = useAxiosPublic();

  const { data: communities = [], refetch } = useQuery({
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
  return { communities, refetch };
};

export default useCommunity;
