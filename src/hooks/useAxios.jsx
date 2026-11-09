import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const useAxiosPublic = () => {
  return axiosInstance;
};

export const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        try {
          await signOutUser();
          await Swal.fire({
            title: error.response?.data?.message || "Something went wrong!",
            text: "Please login and try again.",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/login");
        } catch (error) {
          console.error(
            "Error:",
            error?.response?.data?.message || error?.message,
          );
          await Swal.fire("There is an error", "", "error");
        }
      }
      return Promise.reject(error);
    },
  );
  return axiosInstance;
};
