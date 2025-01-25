import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Loader from "../components/Shared/Loader";
import useTrainerCheck from "../hooks/useTrainerCheck";

const CombinedRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const { isAdmin, adminLoading } = useAdmin();
  const { isTrainer, trainerLoading } = useTrainerCheck();

  if (loader || adminLoading || trainerLoading) {
    return <Loader />;
  }

  if (user && (isAdmin || isTrainer)) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default CombinedRoute;
