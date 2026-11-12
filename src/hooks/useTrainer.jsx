import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosPublic, useAxiosSecure } from "./useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const useAddTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ payload, email }) => {
      await axiosSecure.post("/trainers", payload);
      await axiosSecure.patch(`/users/change-user-role?email=${email}`, {
        role: "TRAINER",
      });
      await axiosSecure.delete(`/applicants/delete?email=${email}`);
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Successfully added",
        showConfirmButton: false,
        timer: 1000,
      });
      queryClient.invalidateQueries({ queryKey: ["trainer"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["applicant"] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong";
      console.error(message);
      Swal.fire({
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
  return mutation;
};

export const useGetAllTrainers = (sort = "") => {
  const axiosPublic = useAxiosPublic();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["trainer", "all", sort],

    queryFn: async () => {
      try {
        const res = await axiosPublic.get(`/trainers?sort=${sort}`);
        return res.data.data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
      }
    },
  });
  return { data, refetch, isLoading };
};

export function useRemoveTrainer() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (trainer) => {
      const res = await axiosSecure.patch(
        `/users/change-user-role?email=${trainer?.email}`,
        { role: "MEMBER" },
      );
      await axiosSecure.delete(`/trainers/delete?email=${trainer?.email}`);
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (data?.success) {
        Swal.fire({
          title: data.message,
          text: `${variables.name} has been successfully reverted to a member.`,
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        queryClient.invalidateQueries({ queryKey: ["user"] });
        queryClient.invalidateQueries({ queryKey: ["trainer"] });
      }
    },
    onError: (error) => {
      Swal.fire({
        title: error?.response?.data?.message || error?.message,
        icon: "error",
      });
    },
  });
  return mutation;
}

export const useManageSlot = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isDark = document.documentElement.classList.contains("dark");

  const mutation = useMutation({
    mutationFn: async ({ payload, id }) => {
      const { data } = await axiosSecure.patch(
        `/trainers/add-slot/${id}`,
        payload,
      );
      return data;
    },
    onSuccess: async (data) => {
      if (data?.success) {
        await Swal.fire({
          title: "Slot Added Successfully",
          icon: "success",
          background: isDark ? "#171717" : "#ffffff",
          color: isDark ? "#ffffff" : "#171717",
          showConfirmButton: false,
          timer: 1000,
        });
        queryClient.invalidateQueries({ queryKey: ["trainer"] });
        navigate("/dashboard/manage-slot");
      }
    },
    onError: (error) => {
      console.error(
        "Failed to add slot",
        error?.response?.data?.message || error?.message,
      );
      Swal.fire({
        title: "Something went wrong",
        text: error?.response?.data?.message || error?.message,
        icon: "error",
        background: isDark ? "#171717" : "#ffffff",
        color: isDark ? "#ffffff" : "#171717",
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });
  return mutation;
};
