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
    <div className="flex flex-col gap-2 shadow-xl p-5 rounded-lg border">
      <div className="flex justify-between gap-5 pb-2 border-b mb-auto flex-grow">
        <h2 className="text-lg lg:text-xl font-bold">{title}</h2>
        <span
          className={`text-xs h-fit px-2 py-0.5 rounded-full font-semibold ${
            role === "trainer"
              ? "bg-green-100 text-green-900"
              : "bg-blue-100 text-blue-900"
          }`}
        >
          {role}
        </span>
      </div>
      <div className="flex justify-between py-2 text-gray-600">
        <p> By {author}</p>
        <p>Date: {date}</p>
      </div>
      <p className="text-gray-600">Category: {category}</p>
      <p className="flex-grow">{description}</p>
      <div className="flex justify-between items-center border-t pt-3">
        <span className="text-sm">
          {" "}
          <span className="font-semibold">Votes:</span> {votes}
        </span>
        <div className="space-x-2 text-xl font-semibold text-gray-500 ">
          <button onClick={() => handleUpVote(_id)} className={`px-3 py-2 `}>
            <AiFillLike />
          </button>
          <button onClick={() => handleDownVote(_id)} className={`px-3 py-2 $`}>
            <AiFillDislike />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
