import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Loader from "../components/Shared/Loader";
import useTrainerCheck from "../hooks/useTrainerCheck";

const TrainerRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const { isTrainer, trainerLoading } = useTrainerCheck();

  if (loader || trainerLoading) {
    return <Loader />;
  }

  if (user && isTrainer) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default TrainerRoute;
