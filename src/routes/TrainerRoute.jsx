/* eslint-disable react/prop-types */
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Loader from "../components/Shared/Loader";
import { useTrainerCheck } from "../hooks/useTrainer";

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
