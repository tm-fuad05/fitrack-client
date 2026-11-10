/* eslint-disable react/prop-types */
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Loader from "../components/Shared/Loader";
import { useCheckRole } from "../hooks/useCheckRole";

const CombinedRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const { isTrainer, isAdmin, isLoading } = useCheckRole();

  if (loader || isLoading) {
    return <Loader />;
  }

  if (user && (isAdmin || isTrainer)) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default CombinedRoute;
