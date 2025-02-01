import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Shared/Loader";
import useTrainerCheck from "../hooks/useTrainerCheck";

const TrainerRoute = ({ children }) => {
  const { user, loader, signOutUser } = useAuth();
  const { isTrainer, trainerLoading } = useTrainerCheck();

  if (loader || trainerLoading) {
    return <Loader />;
  }

  if (user && isTrainer) {
    return children;
  }
  signOutUser();
  setTimeout(() => {
    return <Navigate to="/login" />;
  }, 1000);
};

export default TrainerRoute;
