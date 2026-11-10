import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxios";
import useAuth from "./useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const useApplyForTrainer = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.post("/applicants", payload);
      return res.data;
    },
    onSuccess: async (data) => {
      if (data.message) {
        await Swal.fire({
          title: data.message || "Application Submitted",

          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      setTimeout(() => {
        navigate("/dashboard/activity-log");
      }, 1500);
    },
    onError: (error) => {
      console.error("Transmission sequence broken", error);
      Swal.fire(
        "Transmission Failed",
        error.message || "Network Error",
        "error",
      );
    },
  });
  return mutation;
};

export const useGetAllApplicants = () => {
  const axiosSecure = useAxiosSecure();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["applicant", "all"],
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

export const useMyApplication = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["applicant", "my-application", user?.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/applicants/my-application?email=${user?.email}`,
        );
        return res.data.data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
        if (error?.response?.status == 404) return null;
      }
    },
  });
  return { data, isLoading };
};

export const useApplicantById = (id) => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["applicant", "specific", id],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/applicants/${id}`);
        return res.data.data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
        if (error?.response?.status == 404) return null;
      }
    },
  });
  return { data, isLoading };
};

export const useDeleteApplication = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.delete(`/applicants/delete?email=${email}`);
      return res.data;
    },
    onSuccess: async (data) => {
      if (data?.success) {
        await Swal.fire({
          title: data.message || "Application deleted successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        queryClient.invalidateQueries({ queryKey: ["applicant"] });
      }
    },
    onError: async () => {
      await Swal.fire(
        "Error",
        "Pipeline failure during data clearing.",
        "error",
      );
    },
  });
  return mutation;
};

export const useRejectApplication = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/applicants/reject/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicant"] });
    },
    onError: async (error) => {
      console.error(error?.response?.data?.message);
      await Swal.fire("Error", error?.response?.data?.message, "error");
    },
  });
  return mutation;
};
