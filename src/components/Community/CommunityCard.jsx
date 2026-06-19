import React from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CommunityCard = ({ post, refetch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { _id, author, category, date, description, role, title, votes } = post;
  const axiosSecure = useAxiosSecure();

  const handleUpVote = async (id) => {
    try {
      if (user && user?.email) {
        const { data } = await axiosSecure.patch(`/community/upvote/${id}`);
        if (data.success) {
          refetch();
        }
      } else {
        navigate("/login", { state: location.pathname });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownVote = async (id) => {
    try {
      if (user && user?.email) {
        const { data } = await axiosSecure.patch(`/community/downvote/${id}`);
        if (data.success) {
          refetch();
        }
      } else {
        navigate("/login", { state: location.pathname });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 shadow-xl p-5 rounded-lg border border-gray-200 bg-surface dark:border-gray-700 dark:bg-surface-dark">
      <div className="flex justify-between gap-5 pb-2 border-b border-gray-200 dark:border-gray-700 mb-auto flex-grow">
        <h2 className="text-lg lg:text-xl font-bold text-foreground dark:text-foreground-dark">
          {title}
        </h2>
        <span
          className={`text-xs h-fit px-2 py-0.5 rounded-full font-semibold ${
            role === "trainer" ? "role-badge-trainer" : "role-badge-member"
          }`}
        >
          {role}
        </span>
      </div>
      <div className="flex justify-between py-2 text-foreground-muted dark:text-foreground-muted-dark">
        <p> By {author}</p>
        <p>Date: {date}</p>
      </div>
      <p className="text-foreground-muted dark:text-foreground-muted-dark">
        Category: {category}
      </p>
      <p className="flex-grow text-foreground dark:text-foreground-dark">
        {description}
      </p>
      <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3 text-foreground dark:text-foreground-dark">
        <span className="text-sm">
          {" "}
          <span className="font-semibold">Votes:</span> {votes}
        </span>
        <div className="space-x-2 text-xl font-semibold text-foreground-muted dark:text-foreground-muted-dark">
          <button onClick={() => handleUpVote(_id)} className="px-3 py-2">
            <AiFillLike />
          </button>
          <button onClick={() => handleDownVote(_id)} className="px-3 py-2">
            <AiFillDislike />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
