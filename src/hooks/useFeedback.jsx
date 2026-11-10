import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxios";
import useAuth from "./useAuth";

export const useGetAllAplicantsFeedback = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/rejection-feedback");
        return data.data;
      } catch (error) {
        console.error(
          "Failed to load data",
          error?.response?.data?.message || error?.message,
        );
        return [];
      }
    },
  });
  return { data, isLoading };
};

export const useGetUserFeedback = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["feedback", "specific", user?.email],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(
          `/rejection-feedback/applicant?email=${user?.email}`,
        );
        return data.data;
      } catch (error) {
        console.error(
          "Failed to load data",
          error?.response?.data?.message || error?.message,
        );
        if (error?.response?.status == 404) return null;
      }
    },
  });
  return { data, isLoading };
};
