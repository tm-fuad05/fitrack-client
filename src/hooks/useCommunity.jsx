import Swal from "sweetalert2";
import { useAxiosPublic, useAxiosSecure } from "./useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

export const usePostCommunity = () => {
  const axiosSecure = useAxiosSecure();
  const isDark = document.documentElement.classList.contains("dark");
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosSecure.post("/communities", payload);
      return data;
    },
    onSuccess: async (data) => {
      if (data.success) {
        await Swal.fire({
          title: "Successfully Added",
          icon: "success",
          background: isDark ? "#171717" : "#ffffff",
          color: isDark ? "#ffffff" : "#171717",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/communities");
      }
    },
    onError: async (error) => {
      console.error(
        "Failed to post",
        error?.response?.data?.message || error?.message,
      );
      await Swal.fire({
        title: "Failed to post",
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
