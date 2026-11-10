/* eslint-disable react/prop-types */
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Loader from "../components/Shared/Loader";
import { useCheckRole } from "../hooks/useRole";

const TrainerRoute = ({ children }) => {
  const { user, loader, signOutUser } = useAuth();
  const { isTrainer, isLoading } = useCheckRole();

  if (loader || isLoading) {
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
