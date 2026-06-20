import React, { useEffect, useState } from "react";
import Logo from "../../components/Shared/Logo";
import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import "./dashboard.css";
import { LuLetterText } from "react-icons/lu";
import { CgGym, CgProfile } from "react-icons/cg";
import { RiMenuFill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdClass, MdDarkMode, MdForum, MdLightMode } from "react-icons/md";
import { SiGooglecampaignmanager360, SiGoogleclassroom } from "react-icons/si";
import { FaBookmark, FaHouse, FaRegCircleUser } from "react-icons/fa6";
import { IoIosAddCircle, IoMdClose } from "react-icons/io";
import { BsActivity } from "react-icons/bs";
import { SlEnvolopeLetter } from "react-icons/sl";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { TbLogout2 } from "react-icons/tb";
import useAdmin from "../../hooks/useAdmin";
import useTrainerCheck from "../../hooks/useTrainerCheck";
import fitrack from "../../assets/fitrack.png";

const Dashboard = () => {
  const { signOutUser } = useAuth();
  const { isAdmin } = useAdmin();
  const { isTrainer } = useTrainerCheck();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLinkClick = () => {
    setMobileSidebarOpen(false);
  };

  const navLinkStyling = ({ isActive }) =>
    `flex items-center gap-3 py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20 scale-[1.02]"
        : "text-slate-800 dark:text-gray-300 hover:bg-slate-200/80 dark:hover:bg-white/5 hover:translate-x-1"
    }`;

  const navMenu = (
    <nav id="dashboard-nav" className="w-full space-y-1.5">
      {isAdmin ? (
        <>
          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/my-profile"
          >
            <CgProfile className="text-xl shrink-0" /> Profile
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/balance"
          >
            <RiMoneyDollarCircleLine className="text-xl shrink-0" /> Balance
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/newsletter"
          >
            <LuLetterText className="text-xl shrink-0" /> Newsletter Subscribers
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/applied-trainers"
          >
            <SlEnvolopeLetter className="text-xl shrink-0" /> Applied
            Trainers{" "}
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/trainers"
          >
            <CgGym className="text-xl shrink-0" /> Trainers
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/add-forum"
          >
            <MdClass className="text-xl shrink-0" /> Add Forum
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/add-class"
          >
            <SiGoogleclassroom className="text-xl shrink-0" /> Add Class
          </NavLink>

          <div className="my-4 border-b border-gray-300 dark:border-white/10" />

          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/manage-users"
          >
            <FaRegCircleUser className="text-xl shrink-0" /> Manage Users
          </NavLink>
          <NavLink onClick={handleLinkClick} className={navLinkStyling} to="/">
            <FaHouse className="text-xl shrink-0" /> Home
          </NavLink>
        </>
      ) : isTrainer ? (
        <>
          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/my-profile"
          >
            <CgProfile className="text-xl shrink-0" /> Profile
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/manage-slot"
          >
            <SiGooglecampaignmanager360 className="text-xl shrink-0" /> Manage
            Slot
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/add-slot"
          >
            <IoIosAddCircle className="text-xl shrink-0" /> Add Slot
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/add-forum"
          >
            <MdForum className="text-xl shrink-0" /> Add Forum
          </NavLink>

          <div className="my-4 border-b border-gray-300 dark:border-white/10" />

          <NavLink onClick={handleLinkClick} className={navLinkStyling} to="/">
            <FaHouse className="text-xl shrink-0" /> Home
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/my-profile"
          >
            <CgProfile className="text-xl shrink-0" /> Profile
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/activity-log"
          >
            <BsActivity className="text-xl shrink-0" /> Activity Log
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={navLinkStyling}
            to="/dashboard/booked-trainers"
          >
            <FaBookmark className="text-xl shrink-0" /> Booked Trainers
          </NavLink>

          <div className="my-4 border-b border-gray-300 dark:border-white/10" />

          <NavLink onClick={handleLinkClick} className={navLinkStyling} to="/">
            <FaHouse className="text-xl shrink-0" /> Home
          </NavLink>
        </>
      )}
    </nav>
  );

  const handleSignOut = () => {
    signOutUser().then(() => {
      Swal.fire({
        title: "Successfully signed out",
        icon: "success",
        background: darkMode ? "#171717" : "#ffffff",
        color: darkMode ? "#ffffff" : "#0f172a",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white antialiased grid grid-cols-12 relative">
      {/* Desktop SideBar (Glassy Slate Panel) */}
      <aside className="hidden lg:flex flex-col lg:col-span-3 bg-white dark:bg-transparent border-r border-gray-200 dark:border-white/10 duration-300 min-h-screen sticky top-0 h-screen overflow-y-auto">
        <div className="p-4">
          <Logo />
        </div>
        <div className="border-b border-gray-200 dark:border-white/10 " />

        {/* NavMenu Elastic Wrapper */}
        <div className="overflow-y-auto">
          <div className="flex-1 p-5 pt-3">{navMenu}</div>
        </div>

        {/* Logout Activation Terminal */}
        <div className="p-4 mt-auto border-t border-gray-200 dark:border-white/10">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full py-3 px-4 rounded-xl font-extrabold text-sm text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-all duration-300 cursor-pointer"
          >
            <TbLogout2 className="text-lg" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Structural Pipeline */}
      <section className="col-span-12 lg:col-span-9 flex flex-col min-h-screen">
        {/* Top Floating Control Deck (Desktop Only) */}
        <div className="hidden lg:flex justify-end p-5 pb-0 bg-transparent border-b border-transparent">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-slate-800 dark:text-gray-200 text-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 p-2 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm"
          >
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>

        {/* Small Device Header Deck */}
        <header className="bg-white/80 dark:bg-surface-dark backdrop-blur-md border-b border-gray-200 dark:border-white/10 lg:hidden sticky top-0 z-50 shadow-sm">
          <div className="flex justify-between items-center w-11/12 mx-auto py-4">
            <a href="/" className="flex items-center gap-2 group">
              <img
                className="w-9 md:w-12 transition-transform duration-500 group-hover:rotate-12"
                src={fitrack}
                alt="logo"
              />
              <h2 className="font-black text-xl md:text-2xl italic text-slate-950 dark:text-white uppercase tracking-tight">
                Fit<span className="text-primary">Rack</span>
              </h2>
            </a>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="text-slate-800 dark:text-gray-200 text-lg border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-2 rounded-xl cursor-pointer transition-all"
              >
                {darkMode ? <MdLightMode /> : <MdDarkMode />}
              </button>
              <button
                className="text-lg p-2 rounded-xl border border-gray-300 dark:border-white/10 dark:text-white bg-gray-50 dark:bg-white/5 cursor-pointer text-slate-800"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              >
                {mobileSidebarOpen ? <IoMdClose /> : <RiMenuFill />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Flyout Panel */}
        <aside
          className={`lg:hidden overflow-y-auto bg-white/95 dark:bg-surface-dark backdrop-blur-xl w-full p-6 fixed z-40 border-b border-gray-200 dark:border-white/10 transition-all duration-300 flex flex-col ${
            mobileSidebarOpen
              ? "top-[69px] opacity-100 h-[calc(100vh-69px)]"
              : "-top-[1000px] opacity-0 pointer-events-none"
          }`}
        >
          <div className=" py-4 px-1">{navMenu}</div>
          <div className="pt-4 border-t border-gray-200 dark:border-white/10 pb-6">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full py-3 px-4 rounded-xl font-extrabold text-sm text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
            >
              <TbLogout2 className="text-lg" /> Logout
            </button>
          </div>
        </aside>

        {/* Global Content Container Pipeline */}
        <main className="flex-1 py-6 md:py-10 w-11/12 mx-auto">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default Dashboard;
