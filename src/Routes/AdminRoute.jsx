import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Loader from "../components/Shared/Loader";

const AdminRoute = ({ children }) => {
  const { user, loader, signOutUser } = useAuth();
  const { isAdmin, adminLoading } = useAdmin();

  if (loader || adminLoading) {
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
