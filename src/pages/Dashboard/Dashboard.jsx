import React, { useState } from "react";
import Logo from "../../components/Shared/logo";
import { NavLink, Outlet } from "react-router-dom";
import "./dashboard.css";
import { LuLetterText } from "react-icons/lu";
import { CgGym } from "react-icons/cg";
import { RiMenuFill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdClass } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { FaHouse, FaRegCircleUser } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Dashboard = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState();

  const navMenu = (
    <nav
      id="dashboard-nav"
      className="font-semibold text-white w-full space-y-1"
    >
      {/* Admin */}
      <NavLink
        className={
          " py-3 px-2 rounded-md w-full  hover:bg-gray-600 flex  gap-2 "
        }
        to={"/dashboard/newsletter"}
      >
        {" "}
        <LuLetterText className="text-xl" />
        Newsletter Subscribers
      </NavLink>
      <NavLink
        className={
          " py-3 px-2 rounded-md w-full  hover:bg-gray-600 flex  gap-2 "
        }
        to={"/dashboard/trainers"}
      >
        <CgGym className="text-xl" />
        Trainers
      </NavLink>
      <NavLink
        className={
          " py-3 px-2 rounded-md w-full  hover:bg-gray-600 flex  gap-2 "
        }
        to={"/dashboard/balance"}
      >
        {" "}
        <RiMoneyDollarCircleLine className="text-xl" />
        Balance
      </NavLink>
      <NavLink
        className={
          " py-3 px-2 rounded-md w-full  hover:bg-gray-600 flex  gap-2 "
        }
        to={"/dashboard/classes"}
      >
        {" "}
        <MdClass className="text-xl" />
        Classes
      </NavLink>
      <NavLink
        className={
          " py-3 px-2 rounded-md w-full  hover:bg-gray-600 flex  gap-2 "
        }
        to={"/dashboard/add-class"}
      >
        <SiGoogleclassroom className="text-xl" />
        Add Class
      </NavLink>
      {/* Devider */}
      <div className="border-b mb-5"></div>

      <NavLink
        className={
          " py-3 px-2 rounded-md w-full  hover:bg-gray-600 flex  gap-2"
        }
        to={"/dashboard/manage-users"}
      >
        <FaRegCircleUser className="text-xl" />
        Manage Users
      </NavLink>
      <NavLink
        className={
          " py-3 px-2 rounded-md w-full  hover:bg-gray-600 flex  gap-2 "
        }
        to={"/"}
      >
        <FaHouse className="text-xl" />
        Home
      </NavLink>
    </nav>
  );

  return (
    <div className="grid grid-cols-12 relative">
      {/* SideBar */}
      <aside className="hidden lg:block lg:col-span-3 bg-gray-900 min-h-screen p-5">
        <div className="mb-4 w-fit">
          <Logo></Logo>
        </div>
        {/* Devider */}
        <div className="border-b mb-5"></div>
        {/* NavMenu */}
        {navMenu}
      </aside>
      {/* Main */}
      <section className="col-span-12 lg:col-span-9">
        <div className="bg-gray-900 lg:hidden sticky top-0">
          <div className="flex justify-between items-center w-11/12 mx-auto py-5">
            <Logo></Logo>
            <div
              className="text-3xl cursor-pointer text-white lg:hidden w-fit"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            >
              {mobileSidebarOpen ? <IoMdClose /> : <RiMenuFill />}
            </div>
          </div>
        </div>

        <aside
          className={` lg:hidden bg-gray-900  w-full p-5 absolute ${
            mobileSidebarOpen ? " z-50  top-[90px]" : "hidden opacity-0 z-[1]"
          } `}
        >
          {/* NavMenu */}
          {navMenu}
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
