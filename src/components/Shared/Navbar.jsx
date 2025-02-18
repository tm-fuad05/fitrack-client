import React, { useEffect, useState } from "react";

// react icons
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { IoIosArrowUp, IoMdClose } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { RiMenuFill } from "react-icons/ri";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// SweetAlert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "./navbar.css";
import Logo from "./logo";
import useAdmin from "../../hooks/useAdmin";
import useTrainerCheck from "../../hooks/useTrainerCheck";
import MiniLoader from "./MiniLoader";

const Navbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
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

  const { isAdmin } = useAdmin();
  const { isTrainer } = useTrainerCheck();
  const { pathname } = useLocation();

  const { user, signOutUser, loader } = useAuth();

  // Scroll behaviour with navbar
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const navMenu = (
    <>
      <NavLink
        className="before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-primary transition-all duration-300 before:left-0 cursor-pointer capitalize"
        to={"/"}
      >
        Home
      </NavLink>
      <NavLink
        className="before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-primary transition-all duration-300 before:left-0 cursor-pointer capitalize"
        to={"all-trainer"}
      >
        All Trainer
      </NavLink>
      <NavLink
        className="before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-primary transition-all duration-300 before:left-0 cursor-pointer capitalize"
        to={"all-classes"}
      >
        All Classes
      </NavLink>
      {user && user?.email && (
        <NavLink
          className="before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-primary transition-all duration-300 before:left-0 cursor-pointer capitalize"
          to={`/dashboard/${
            isAdmin ? "balance" : isTrainer ? "manage-slot" : "my-profile"
          }`}
        >
          Dashboard
        </NavLink>
      )}
      <NavLink
        className="before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-primary transition-all duration-300 before:left-0 cursor-pointer capitalize"
        to={"community"}
      >
        Community
      </NavLink>
      <NavLink
        className="before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-primary transition-all duration-300 before:left-0 cursor-pointer capitalize"
        to={"about-us"}
      >
        About Us
      </NavLink>
    </>
  );

  return (
    <div
      className={`  ${
        pathname === "/" || pathname === "/all-trainer"
          ? `fixed ${scrolled ? "bg-black bg-opacity-80" : "bg-transparent"}`
          : `sticky top-0 bg-gray-900  ${
              scrolled ? "bg-opacity-80" : "bg-opacity-100"
            }`
      } z-50 w-full duration-300`}
    >
      <nav className="flex items-center justify-between relative px-6 py-5 ">
        <Logo />
        <ul
          id="home-nav"
          className="items-center gap-[40px] text-[1rem] text-white lg:flex hidden p-2"
        >
          {navMenu}
        </ul>

        <div className="flex items-center gap-4">
          {user && user?.email ? (
            <div className="flex items-center gap-[15px]">
              <div
                className="flex items-center gap-[10px] cursor-pointer relative"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              >
                <div className="relative">
                  <img
                    src={user?.photoURL}
                    alt="avatar"
                    className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] rounded-full object-cover"
                  />

                  <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
                </div>

                <h1 className="text-[1rem] font-[400] text-white md:block hidden">
                  {user?.displayName}
                </h1>

                <div
                  className={`${
                    accountMenuOpen
                      ? "translate-y-0 opacity-100 z-[1]"
                      : "hidden opacity-0 z-[-1]"
                  } bg-white w-max rounded-md boxShadow absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
                >
                  <Link
                    to={`/dashboard/${
                      isAdmin
                        ? "manage-users"
                        : isTrainer
                        ? "manage-slot"
                        : "my-profile"
                    }`}
                    className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-100"
                  >
                    {isAdmin
                      ? "Manage User"
                      : isTrainer
                      ? "Manage Slot"
                      : "View Profile"}
                  </Link>

                  <div
                    onClick={handleSignOut}
                    className="mt-3 border-t border-gray-200 pt-[5px]"
                  >
                    <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50">
                      <TbLogout2 />
                      Logout
                    </p>
                  </div>
                </div>

                <IoIosArrowUp
                  className={`${
                    accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
                  } transition-all duration-300 text-white sm:block hidden`}
                />
              </div>
            </div>
          ) : (
            <div>
              <Link to={"/login"}>
                {loader ? (
                  <MiniLoader />
                ) : (
                  <button className="bg-gradient-to-r from-[#e13a3b] to-[#e96d4c] px-4 py-3 font-medium rounded-md text-white hover:bg-gradient-to-r hover:from-[#e96d4c] hover:to-[#e13a3b] border-none">
                    Login
                  </button>
                )}
              </Link>
            </div>
          )}
          <div
            onClick={() => setDarkMode(!darkMode)}
            className="text-white text-xl border border-gray-500 p-1.5 rounded-lg cursor-pointer transition-all duration-1000"
          >
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </div>
          <div
            className="text-3xl cursor-pointer lg:hidden text-white"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            {mobileSidebarOpen ? <IoMdClose /> : <RiMenuFill />}
          </div>
        </div>

        <aside
          className={` ${
            mobileSidebarOpen
              ? "right-0 opacity-100 z-20"
              : "right-[1000px] opacity-0 z-[-1]"
          } lg:hidden shadow-xl bg-white boxShadow p-4 text-center absolute right-0 top-[71px] sm:top-[90px] w-full rounded-md rounded-t-none transition-all duration-300`}
        >
          <ul
            id="home-nav"
            className="items-center gap-[20px] text-[1rem] text-gray-600 flex flex-col"
          >
            {navMenu}
          </ul>
        </aside>
      </nav>
    </div>
  );
};

export default Navbar;
