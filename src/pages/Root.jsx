import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Shared/Footer";
import Navbar from "../components/Shared/Navbar";

const Root = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  return (
    <div>
      {noHeaderFooter || <Navbar></Navbar>}
      <Outlet />
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Root;
