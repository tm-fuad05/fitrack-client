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
import Swal from "sweetalert2";
import "./navbar.css";
import useAdmin from "../hooks/useAdmin";
import useTrainerCheck from "../hooks/useTrainerCheck";
import MiniLoader from "../components/Shared/MiniLoader";

const Navbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const mobNavRef = useRef(null);
  const dropdownRef = useRef(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
      if (mobNavRef.current && !mobNavRef.current.contains(event.target)) {
        setMobileSidebarOpen(false);
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
  const { scrollY } = useLenis() || { scrollY: 0 };

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

  // NavLink CSS Class Mapping Generator
  const getNavLinkClass = (isActive) => {
    const baseClass =
      "before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-4px] transition-all duration-300 before:left-0 cursor-pointer capitalize font-semibold tracking-wide text-sm uppercase";

    if (isActive) {
      return `${baseClass} text-primary before:w-full`;
    }

    // Adapt links based on current viewport routing & state
    if (pathname === "/" || pathname === "/all-trainer") {
      return scrolled
        ? `${baseClass} text-gray-900 dark:text-gray-300 hover:text-primary`
        : `${baseClass} text-gray-900 lg:text-gray-50 dark:text-gray-300 hover:text-primary`;
    }

    return `${baseClass} text-gray-800 dark:text-gray-300 hover:text-primary`;
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
              className={({ isActive }) => getNavLinkClass(isActive)}
              to={path}
              onClick={() => setMobileSidebarOpen(false)}
            >
              {item}
            </NavLink>
          );
        },
      )}

      {user && user?.email && (
        <NavLink
          className={({ isActive }) => getNavLinkClass(isActive)}
          to={`/dashboard/${isAdmin ? "balance" : isTrainer ? "manage-slot" : "my-profile"}`}
          onClick={() => setMobileSidebarOpen(false)}
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  // Dynamic Background Wrapper Engine
  const getNavbarBgClass = () => {
    const isHomeOrTrainer = pathname === "/" || pathname === "/all-trainer";

    if (isHomeOrTrainer) {
      return scrolled
        ? "bg-white dark:bg-surface-dark shadow-sm py-4 text-gray-900 dark:text-white"
        : "bg-transparent py-5 text-white";
    }

    // Static layouts for interior views (Classes, Community, About Us)
    return scrolled
      ? "bg-white/90 dark:bg-surface-dark  dark:border-white/10 backdrop-blur-xl shadow-md py-4 text-gray-900 dark:text-white"
      : "bg-white dark:bg-surface-dark dark:border-white/5 py-5 text-gray-900 dark:text-white";
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${getNavbarBgClass()}`}
    >
      <nav className="flex items-center justify-between relative px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href="/"
          className="group flex items-center gap-2 transition-transform active:scale-95"
        >
          <img
            className="w-9 md:w-10 object-contain group-hover:rotate-6 transition-transform duration-300"
            src={fitrack}
            alt="logo"
          />
          <h2
            className={`font-black text-xl italic tracking-tight transition-colors duration-300 ${
              (pathname === "/" || pathname === "/all-trainer") && !scrolled
                ? "text-white"
                : "text-gray-950 dark:text-white"
            }`}
          >
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
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative flex items-center justify-center text-lg p-2.5 rounded-xl border transition-all duration-300 active:scale-90 cursor-pointer ${
              (pathname === "/" || pathname === "/all-trainer") && !scrolled
                ? "border-white/10 bg-white/5 text-white"
                : "border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 text-gray-800 dark:text-amber-400"
            } hover:text-primary dark:hover:text-primary`}
            aria-label="Toggle Theme"
          >
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>

          {/* User Section / Login */}
          {user && user?.email ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className={`flex items-center gap-2 p-1 pr-3 rounded-full border transition-all active:scale-98 cursor-pointer ${
                  (pathname === "/" || pathname === "/all-trainer") && !scrolled
                    ? "border-white/10 bg-white/5 text-white"
                    : "border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 text-gray-900 dark:text-white"
                }`}
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={user?.photoURL}
                    alt="avatar"
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 absolute bottom-0 right-0 border bg-green-600 dark:border-gray-950" />
                </div>
                <span className="text-xs font-bold md:block hidden max-w-[100px] truncate">
                  {user?.displayName?.split(" ")[0]}
                </span>
                <IoIosArrowDown
                  className={`text-[10px] transition-transform duration-300 ${
                    accountMenuOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Profile Dropdown Component Container */}
              {accountMenuOpen && (
                <div className="absolute top-[44px] right-0 w-52 bg-white dark:bg-[#12131a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="px-3 py-2 border-b border-gray-100 dark:border-white/5 mb-1">
                    <p className="text-xs font-semibold text-gray-950 dark:text-white truncate">
                      {user?.displayName}
                    </p>
                    <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    to={`/dashboard/${isAdmin ? "balance" : isTrainer ? "manage-slot" : "my-profile"}`}
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <TbDashboard className="text-base text-primary" />
                    Dashboard Node
                  </Link>

                  <button
                    onClick={() => {
                      setAccountMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/10 transition-colors text-left border-none bg-transparent cursor-pointer"
                  >
                    <TbLogout2 className="text-base" />
                    Terminate Session
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/login"}>
              {loader ? (
                <MiniLoader />
              ) : (
                <button className="bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl text-white hover:shadow-lg hover:shadow-primary/20 hover:opacity-95 active:scale-95 transition-all border-none cursor-pointer">
                  Login
                </button>
              )}
            </Link>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            className={`text-xl p-2 rounded-xl lg:hidden transition-colors border-none bg-transparent cursor-pointer ${
              (pathname === "/" || pathname === "/all-trainer") && !scrolled
                ? "text-white"
                : "text-gray-900 dark:text-white"
            }`}
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            {mobileSidebarOpen ? <IoMdClose /> : <RiMenuFill />}
          </button>
        </div>

        {/* Mobile Sidebar Menu Panel */}
        <aside
          ref={mobNavRef}
          className={`fixed lg:hidden left-0 right-0 top-[72px] w-full bg-gray-50 dark:bg-surface-dark  backdrop-blur-xl shadow-2xl p-6 text-center transition-all duration-300 ${
            mobileSidebarOpen
              ? "trangray-y-0 opacity-100 z-40"
              : "-trangray-y-10 opacity-0 pointer-events-none"
          }`}
        >
          <ul className="items-center gap-6 flex flex-col">{navMenu}</ul>
        </aside>
      </nav>
    </div>
  );
};

export default Navbar;
