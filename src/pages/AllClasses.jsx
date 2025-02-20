import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import useClass from "../hooks/useClass";
import { IoSearch } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import Loader from "../components/Shared/Loader";

const AllClasses = () => {
  const [search, setSearch] = useState("");

  const { classes, isLoading } = useClass({ search });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Calculate page count
  const pageCount = Math.ceil(classes.length / itemsPerPage);

  // Get current page items
  const offset = currentPage * itemsPerPage;
  const currentClasses = classes.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 dark:text-white">
          All Classes
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore our comprehensive selection of classes
        </p>
      </div>
      <Helmet>
        <title>FitRack | All classes</title>
      </Helmet>

      {/* Search field */}
      <div className="max-w-sm relative mb-7">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search by class name"
          className="border border-[#e5eaf2] py-3 pl-4 pr-[65px] outline-none w-full rounded-md dark:bg-gray-900 dark:border-gray-900 dark:text-gray-400"
        />

        <span className="bg-gray-300 text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-400 group">
          <IoSearch className="text-[1.3rem]  group-hover:text-gray-200" />
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentClasses.map((classItem) => (
          <div
            key={classItem.id}
            className=" rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 flex flex-col"
          >
            <div className="p-6 border-b border-gray-200  flex-grow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 dark:text-white">
                {classItem.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">
                {classItem.description}
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span>Trainers ({classItem.trainers.length})</span>
                </div>

                <ul className="text-xs list-decimal text-gray-600 pl-3 dark:text-gray-400">
                  {classItem.trainers.slice(0, 5).map((trainer) => (
                    <li key={trainer._id} className="group cursor-pointer">
                      <Link
                        to={`/all-trainer/trainer/${trainer}`}
                        className="  mt-1  group-hover:text-blue-500"
                      >
                        {trainer}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        }
        nextLabel={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        }
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName="flex items-center justify-center gap-2 mt-8"
        pageClassName="rounded-md"
        pageLinkClassName="px-4 py-2 rounded-md border hover:bg-gray-50 dark:hover:text-black block dark:text-white"
        activeClassName="bg-primary text-white border-blue-500"
        activeLinkClassName="hover:bg-blue-500 text-white"
        previousClassName="rounded-md border p-2 hover:bg-gray-50 dark:text-white dark:hover:text-black"
        nextClassName="rounded-md border p-2 hover:bg-gray-50 dark:text-white dark:hover:text-black"
        disabledClassName="opacity-50 cursor-not-allowed hover:bg-white"
        breakClassName="px-4 py-2"
      />
    </div>
  );
};
export default AllClasses;
