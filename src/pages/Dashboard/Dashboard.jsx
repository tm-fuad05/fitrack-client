import React, { useEffect, useState } from "react";
import Logo from "../../components/Shared/logo";
import { NavLink, Outlet } from "react-router-dom";
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

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.querySelector("html").classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.querySelector("html").classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const navMenu = (
    <nav
      id="dashboard-nav"
      className="font-semibold text-white w-full space-y-1"
    >
      {isAdmin ? (
        <>
          <NavLink
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/dashboard/balance"}
          >
            {" "}
            <RiMoneyDollarCircleLine className="text-xl" />
            Balance
          </NavLink>
          <NavLink
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/dashboard/newsletter"}
          >
            {" "}
            <LuLetterText className="text-xl" />
            Newsletter Subscribers
          </NavLink>
          <NavLink
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/dashboard/applied-trainers"}
          >
            {" "}
            <SlEnvolopeLetter className="text-xl" />
            Applied Trainers
          </NavLink>
          <NavLink
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/dashboard/trainers"}
          >
            <CgGym className="text-xl" />
            Trainers
          </NavLink>
          <NavLink
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/dashboard/add-forum"}
          >
            {" "}
            <MdClass className="text-xl" />
            Add Forum
          </NavLink>
          <NavLink
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/dashboard/add-class"}
          >
            <SiGoogleclassroom className="text-xl" />
            Add Class
          </NavLink>
          {/* Devider */}
          <div className="border-b mb-5 border-gray-300 dark:border-gray-100"></div>
          <NavLink
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/dashboard/manage-users"}
          >
            <FaRegCircleUser className="text-xl" />
            Manage Users
          </NavLink>
          <NavLink
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2"
            }
            to={"/"}
          >
            <FaHouse className="text-xl" />
            Home
          </NavLink>{" "}
        </>
      ) : isTrainer ? (
        <>
          {" "}
          <NavLink
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/dashboard/manage-slot"}
          >
            {" "}
            <SiGooglecampaignmanager360 className="text-xl" />
            Manage Slot
          </NavLink>
          <NavLink
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/dashboard/add-slot"}
          >
            {" "}
            <IoIosAddCircle className="text-xl" />
            Add Slot
          </NavLink>
          <NavLink
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/dashboard/add-forum"}
          >
            {" "}
            <MdForum className="text-xl" />
            Add forum
          </NavLink>
          {/* Devider */}
          <div className="border-b mb-5 border-gray-300 dark:border-gray-100"></div>
          <NavLink
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/"}
          >
            <FaHouse className="text-xl" />
            Home
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/dashboard/my-profile"}
          >
            {" "}
            <CgProfile className="text-xl" />
            Profile
          </NavLink>
          <NavLink
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/dashboard/activity-log"}
          >
            {" "}
            <BsActivity className="text-xl" />
            Activity Log
          </NavLink>
          <NavLink
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/dashboard/booked-trainers"}
          >
            {" "}
            <FaBookmark className="text-xl" />
            Booked Trainers
          </NavLink>
          {/* Devider */}
          <div className="border-b mb-5 border-gray-300 dark:border-gray-100"></div>
          <NavLink
            className={
              "text-black dark:text-white  py-3 px-2 rounded-md w-full  hover:bg-gray-200  dark:hover:bg-gray-600 flex  gap-2 "
            }
            to={"/"}
          >
            <FaHouse className="text-xl" />
            Home
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
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <div className="grid grid-cols-12 relative">
      {/* SideBar */}
      <aside className="hidden lg:block lg:col-span-3 bg-gray-100 dark:bg-gray-900 duration-300 min-h-screen p-5">
        <div className="mb-4 w-fit">
          <Logo></Logo>
        </div>
        {/* Devider */}
        <div className="border-b border-gray-300 dark:border-gray-100 mb-5"></div>
        {/* NavMenu */}
        {navMenu}
        {/* Logout */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-[5px] w-full py-3 px-2 rounded-md  text-red-500 hover:bg-gray-200"
        >
          <TbLogout2 />
          Logout
        </button>
      </aside>
      {/* Main */}
      <section className="col-span-12 lg:col-span-9">
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-800 dark:text-white text-xl border border-gray-500 p-1.5 rounded-lg cursor-pointer transition-all w-fit ml-auto m-5 duration-1000 hidden lg:block"
        >
          {darkMode ? <MdLightMode /> : <MdDarkMode />}
        </div>
        {/* Small device navbar */}
        <div className="bg-gray-100 dark:bg-gray-900 duration-300 lg:hidden sticky top-0 z-50">
          <div className="flex justify-between items-center w-11/12 mx-auto py-5">
            {/* Logo */}
            <a href="/">
              <div className="flex items-center gap-1">
                <img className="w-10 md:w-16" src={fitrack} alt="logo" />
                <h2
                  className={`font-bold text-xl md:text-2xl lg:text-3xl italic text-gray-900/90 dark:text-white`}
                >
                  Fit<span className="text-primary">Rack</span>
                </h2>
              </div>
            </a>
            <div className="flex items-center gap-3">
              <div
                onClick={() => setDarkMode(!darkMode)}
                className={`text-gray-800 dark:text-white dar text-xl border border-gray-500 p-1.5 rounded-lg cursor-pointer transition-all duration-300`}
              >
                {darkMode ? <MdLightMode /> : <MdDarkMode />}
              </div>
              <div
                className="text-3xl cursor-pointer dark:text-white lg:hidden w-fit text-gray-800"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              >
                {mobileSidebarOpen ? <IoMdClose /> : <RiMenuFill />}
              </div>
            </div>
          </div>
        </div>

        <aside
          className={`lg:hidden bg-gray-100 dark:bg-gray-900 min-h-screen w-full p-5 fixed z-20 duration-300 ${
            mobileSidebarOpen
              ? "top-[71px] opacity-100 sm:top-[90px]"
              : "-top-[1000px] opacity-0 z-[1]"
          } `}
        >
          {/* NavMenu */}
          {navMenu}
          {/* Logout */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-[5px] w-full py-3 px-2 rounded-md  text-red-500 hover:bg-gray-200"
          >
            <TbLogout2 />
            Logout
          </button>
        </aside>
        {/* Content */}
        <section className="py-10 w-11/12 mx-auto">
          <Outlet></Outlet>
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
