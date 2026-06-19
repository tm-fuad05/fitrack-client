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
        pageLinkClassName="pagination-link"
        activeClassName="bg-primary text-white border-blue-500"
        activeLinkClassName="hover:bg-gray-500 text-white"
        previousClassName="pagination-nav"
        nextClassName="pagination-nav"
        disabledClassName="opacity-50 cursor-not-allowed hover:bg-transparent"
        breakClassName="px-4 py-2 text-foreground dark:text-foreground-dark"
      />
    </div>
  );
};

export default CommunityCards;
