import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import useClass from "../hooks/useClass";

const AllClasses = () => {
  const { classes } = useClass();

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">All Classes</h1>
        <p className="text-gray-600">
          Explore our comprehensive selection of classes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentClasses.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {classItem.name}
              </h2>
              <p className="text-gray-600 text-sm">{classItem.description}</p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
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

                <ul className="text-xs list-decimal text-gray-600 pl-3">
                  {classItem.trainers.slice(0, 5).map((trainer) => (
                    <li key={trainer.id} className="group cursor-pointer">
                      <Link
                        to={`/all-trainer/${trainer}`}
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
        pageLinkClassName="px-4 py-2 rounded-md border hover:bg-gray-50 block"
        activeClassName="bg-blue-500 text-white border-blue-500"
        activeLinkClassName="hover:bg-blue-500 text-white"
        previousClassName="rounded-md border p-2 hover:bg-gray-50"
        nextClassName="rounded-md border p-2 hover:bg-gray-50"
        disabledClassName="opacity-50 cursor-not-allowed hover:bg-white"
        breakClassName="px-4 py-2"
      />
    </div>
  );
};
export default AllClasses;
