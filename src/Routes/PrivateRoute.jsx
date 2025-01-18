import React from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Shared/Loader";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const location = useLocation();

  if (loader) {
    <Loader />;
  }

  if (user) {
    return children;
  }
  <Navigate state={location.pathname} to="/login" />;
};

export default PrivateRoute;
