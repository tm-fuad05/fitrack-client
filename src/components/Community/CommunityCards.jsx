import React, { useState } from "react";
import useCommunity from "../../hooks/useCommunity";
import CommunityCard from "./CommunityCard";
import ReactPaginate from "react-paginate";
import Loader from "../Shared/Loader";

const CommunityCards = () => {
  const { communities, refetch, isLoading } = useCommunity();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Calculate page count
  const pageCount = Math.ceil(communities.length / itemsPerPage);

  // Get current page items
  const offset = currentPage * itemsPerPage;
  const currentCommunities = communities.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {currentCommunities.map((post) => (
          <CommunityCard
            refetch={refetch}
            key={post._id}
            post={post}
          ></CommunityCard>
        ))}
      </div>
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

export default CommunityCards;
