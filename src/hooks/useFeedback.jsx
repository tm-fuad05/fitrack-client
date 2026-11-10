import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxios";
import useAuth from "./useAuth";
import Swal from "sweetalert2";

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

export const useAddFeedback = (handleOpen) => {
  const axiosSecure = useAxiosSecure();
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.post("/rejection-feedback", payload);
      return res.data;
    },
    onSuccess: async (data) => {
      if (data.success) {
        handleOpen();
        Swal.fire({
          title: data?.message,
          text: "Feedback successfully transmitted",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    },
    onError: async (error) => {
      console.error("Pipeline failure:", error);
      Swal.fire("Error", "Failed to process rejection routine.", "error");
    },
  });
  return mutation;
};
