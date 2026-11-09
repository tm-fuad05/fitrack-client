import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxios";

export const useGetAllApplicants = () => {
  const axiosSecure = useAxiosSecure();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["applicant"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/applicants");
        return res.data.data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
      }
    },
  });
  return { data, refetch, isLoading };
};
