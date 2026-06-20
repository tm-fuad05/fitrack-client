import React, { useEffect, useState, useRef } from "react";
import fitrack from "../assets/fitrack.png";

// react icons
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { TbLogout2, TbDashboard } from "react-icons/tb";
import { RiMenuFill } from "react-icons/ri";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useLenis } from "../Provider/SmoothScrollProvider";

// SweetAlert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "./navbar.css";
import useAdmin from "../hooks/useAdmin";
import useTrainerCheck from "../hooks/useTrainerCheck";
import MiniLoader from "../components/Shared/MiniLoader";

const Navbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const { isAdmin } = useAdmin();
  const { isTrainer } = useTrainerCheck();
  const { pathname } = useLocation();

  const { user, signOutUser, loader } = useAuth();
  const { scrollY } = useLenis();

  const scrolled = scrollY > 50;

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
      {["Home", "All Trainer", "All Classes", "Community", "About Us"].map(
        (item) => {
          const path =
            item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
          return (
            <NavLink
              key={item}
              className={({ isActive }) =>
                `before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-4px] transition-all duration-300 before:left-0 cursor-pointer capitalize font-medium tracking-wide text-sm ${
                  isActive
                    ? "text-primary font-semibold before:w-full"
                    : "text-white/90 hover:text-primary"
                }`
              }
              to={path}
            >
              {item}
            </NavLink>
          );
        },
      )}

      {user && user?.email && (
        <NavLink
          className={({ isActive }) =>
            `before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-4px] transition-all duration-300 before:left-0 cursor-pointer capitalize font-medium tracking-wide text-sm ${
              isActive
                ? "text-primary font-semibold before:w-full"
                : "text-white/90 hover:text-primary"
            }`
          }
          to={`/dashboard/${isAdmin ? "balance" : isTrainer ? "manage-slot" : "my-profile"}`}
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        pathname === "/" || pathname === "/all-trainer"
          ? scrolled
            ? "bg-black/80 dark:bg-background-dark/80 backdrop-blur-xl shadow-lg py-4"
            : "bg-transparent py-5"
          : scrolled
            ? "bg-black/90 dark:bg-background-dark/90 backdrop-blur-xl shadow-md py-4"
            : "bg-black dark:bg-background-dark py-4"
      } text-white`}
    >
      <nav className="flex items-center justify-between relative px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href="/"
          className="group flex items-center gap-2 transition-transform active:scale-95"
        >
          <img
            className="w-10 md:w-12 object-contain group-hover:rotate-6 transition-transform duration-300"
            src={fitrack}
            alt="logo"
          />
          <h2 className="font-black text-xl md:text-2xl italic tracking-tight text-white">
            Fit
            <span className="text-primary group-hover:text-secondary transition-colors">
              Rack
            </span>
          </h2>
        </a>

        {/* Desktop Nav Links */}
        <ul id="home-nav" className="items-center gap-8 lg:flex hidden p-1">
          {navMenu}
        </ul>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative flex items-center justify-center text-xl p-2 rounded-xl border border-white/10 bg-white/5 text-white dark:text-amber-400 hover:text-primary dark:hover:text-primary hover:border-primary/30 dark:hover:border-primary/30 shadow-sm transition-all duration-300 active:scale-90"
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <MdLightMode className="animate-spin-slow" />
            ) : (
              <MdDarkMode className="hover:animate-pulse" />
            )}
          </button>

          {/* User Section / Login */}
          {user && user?.email ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all shadow-sm active:scale-98"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={user?.photoURL}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-black dark:border-background-dark"></span>
                </div>
                <span className="text-xs font-semibold text-white md:block hidden max-w-[120px] truncate">
                  {user?.displayName.split(" ")[0]}
                </span>
                <IoIosArrowDown
                  className={`text-xs text-gray-400 transition-transform duration-300 ${
                    accountMenuOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {accountMenuOpen && (
                <div className="absolute top-[48px] right-0 w-52 bg-white dark:bg-gray-900 border border-white/10 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="px-3 py-2 border-b border-white/5 mb-1 lg:hidden">
                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {user?.displayName}
                    </p>
                    <p className="text-[10px] text-gray-600 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    to={`/dashboard/${isAdmin ? "manage-users" : isTrainer ? "manage-slot" : "my-profile"}`}
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-gray-400 hover:bg-white/5 font-medium transition-colors"
                  >
                    <TbDashboard className="text-lg text-primary" />
                    {isAdmin
                      ? "Manage User"
                      : isTrainer
                        ? "Manage Slot"
                        : "View Profile"}
                  </Link>

                  <button
                    onClick={() => {
                      setAccountMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 font-medium transition-colors text-left border-none bg-transparent"
                  >
                    <TbLogout2 className="text-lg" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/login"}>
              {loader ? (
                <MiniLoader />
              ) : (
                <button className="bg-gradient-to-r from-[#e13a3b] to-[#e96d4c] px-5 py-2 text-sm font-semibold rounded-xl text-white hover:shadow-lg hover:shadow-primary/20 hover:opacity-95 active:scale-95 transition-all border-none">
                  Login
                </button>
              )}
            </Link>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            className="text-2xl p-1.5 rounded-xl lg:hidden text-white hover:bg-white/5 transition-colors border-none bg-transparent"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            {mobileSidebarOpen ? <IoMdClose /> : <RiMenuFill />}
          </button>
        </div>

        {/* Mobile Sidebar Menu */}
        <aside
          className={`fixed lg:hidden left-0 right-0 top-[65px] w-full bg-black/95 dark:bg-background-dark/95 backdrop-blur-xl shadow-2xl p-6 text-center transition-all duration-300 ${
            mobileSidebarOpen
              ? "translate-y-0 opacity-100 z-40"
              : "-translate-y-10 opacity-0 pointer-events-none"
          }`}
        >
          <ul className="items-center gap-5 flex flex-col font-medium">
            {navMenu}
          </ul>
        </aside>
      </nav>
    </div>
  );
};

export default Navbar;
