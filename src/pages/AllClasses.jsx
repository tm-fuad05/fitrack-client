import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import useClass from "../hooks/useClass";
import { IoSearch } from "react-icons/io5";
import { HiOutlineUsers, HiOutlineHashtag } from "react-icons/hi2";
import { Helmet } from "react-helmet-async";
import Loader from "../components/Shared/Loader";

const AllClasses = () => {
  const [search, setSearch] = useState("");
  const { classes = [], isLoading } = useClass({ search });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const pageCount = Math.ceil(classes.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentClasses = classes.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-28 bg-transparent">
      <Helmet>
        <title>FitRack | All Classes</title>
      </Helmet>

      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-gray-200 dark:border-white/5 pb-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            All <span className="text-primary">Classes</span>
          </h1>
          <p className="text-sm font-medium mt-1 text-gray-600 dark:text-gray-400">
            Explore our comprehensive selection of professional fitness classes
          </p>
        </div>

        {/* Premium Search Bar */}
        <div className="w-full md:max-w-sm relative group">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search by class name..."
            className="w-full border border-gray-300 dark:border-white/10 py-3 pl-5 pr-[60px] rounded-xl bg-gray-50 dark:bg-neutral-900/40 backdrop-blur-md text-gray-900 dark:bg-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary/50 dark:focus:border-primary/40 focus:ring-1 focus:ring-primary/20 dark:focus:ring-primary/10 transition-all duration-300"
          />
          <span className="absolute top-1/2 -translate-y-1/2 right-1.5 h-[calc(100%-12px)] px-4 flex items-center justify-center rounded-lg cursor-pointer bg-gray-200 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white hover:border-primary dark:hover:border-primary transition-all duration-300">
            <IoSearch className="text-lg" />
          </span>
        </div>
      </div>

      {/* Grid Layout Container */}
      {isLoading ? (
        <Loader />
      ) : currentClasses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {currentClasses.map((classItem) => (
            <div
              key={classItem.id || classItem._id}
              className="flex flex-col gap-5 p-6 rounded-2xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-primary/40 dark:hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Content Block: Text fixes applied here */}
              <div className="flex flex-col gap-3 flex-grow pb-4 border-b border-gray-200 dark:border-white/5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                  {classItem.name}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-normal flex-grow">
                  {classItem.description}
                </p>
              </div>

              {/* Trainers Meta Block */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">
                  <HiOutlineUsers className="text-base text-primary" />
                  <span>
                    Available Trainers ({classItem.trainers?.length || 0})
                  </span>
                </div>

                {classItem.trainers && classItem.trainers.length > 0 ? (
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {classItem.trainers.slice(0, 5).map((trainer, index) => (
                      <li key={trainer._id || index}>
                        <Link
                          to={`/all-trainer/trainer/${trainer}`}
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:text-white hover:bg-primary dark:hover:bg-primary hover:border-primary dark:hover:border-primary font-medium transition-all duration-200 shadow-sm"
                        >
                          <HiOutlineHashtag className="text-[10px] text-gray-400 dark:text-gray-500 shrink-0" />
                          <span className="truncate max-w-[100px]">
                            {trainer}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs italic text-gray-400 dark:text-gray-500">
                    No trainers assigned yet.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gray-300 dark:border-white/5 rounded-3xl bg-gray-50 dark:bg-neutral-900/20">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            No fitness classes matched your search criteria.
          </p>
        </div>
      )}

      {/* Pagination Panel */}
      {pageCount > 1 && (
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
                strokeWidth={2.5}
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
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          }
          pageCount={pageCount}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          containerClassName="flex items-center justify-center gap-2 mt-12 border-t border-gray-200 dark:border-white/5 pt-6"
          pageClassName="overflow-hidden rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-neutral-900/40 backdrop-blur-md transition-all duration-300 hover:border-primary/50"
          pageLinkClassName="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block"
          activeClassName="bg-primary border-primary hover:border-primary shadow-lg shadow-primary/20 scale-105"
          activeLinkClassName="text-gray-50 hover:text-white"
          previousClassName="p-2 rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-neutral-900/40 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-primary/50 transition-all duration-300"
          nextClassName="p-2 rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-neutral-900/40 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-primary/50 transition-all duration-300"
          disabledClassName="opacity-30 cursor-not-allowed pointer-events-none"
          breakClassName="px-3 py-2 text-gray-400 dark:text-gray-500 font-bold"
        />
      )}
    </div>
  );
};

export default AllClasses;
