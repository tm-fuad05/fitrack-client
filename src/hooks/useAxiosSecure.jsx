import axios from "axios";

import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/",
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  // Add a request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");

      config.headers.authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        signOutUser().then(() => {
          Swal.fire({
            title: "Something went wrong!",
            text: "Please login and try again.",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        });

        navigate("/login");
      }

      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
