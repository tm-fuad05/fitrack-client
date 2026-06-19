import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import SmoothScrollProvider from "../Provider/SmoothScrollProvider";
import ScrollToTop from "../Routes/ScrollToTop";

const Root = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register") ||
    location.pathname.includes("/dashboard");

  return (
    <SmoothScrollProvider>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300 dark:bg-background-dark dark:text-foreground-dark">
        {noHeaderFooter || <Navbar />}
        <main>
          <Outlet />
        </main>
        {noHeaderFooter || <Footer />}
      </div>
    </SmoothScrollProvider>
  );
};

export default Root;
