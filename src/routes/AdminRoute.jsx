/* eslint-disable react/prop-types */
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Loader from "../components/Shared/Loader";
import { useCheckRole } from "../hooks/useCheckRole";

const AdminRoute = ({ children }) => {
  const { user, loader, signOutUser } = useAuth();
  const { isAdmin, isLoading } = useCheckRole();

  if (loader || isLoading) {
    return <Loader />;
  }

  if (user && isAdmin) {
    return children;
  }
  signOutUser();
  setTimeout(() => {
    return <Navigate to="/login" />;
  }, 1000);
};

export default AdminRoute;
