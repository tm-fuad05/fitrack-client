import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import SectionTitle from "../Shared/SectionTitle";
import { Link, useLocation } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const RecentCommunity = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const location = useLocation();
  const { data: communities = [], refetch } = useQuery({
    queryKey: ["community"],
    queryFn: async () => {
      try {
        const { data } = await axiosPublic.get("/recent-community");
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleUpVote = async (id) => {
    if (user && user?.email) {
      try {
        const { data } = await axiosSecure.patch(`/community/upvote/${id}`);
        if (data.modifiedCount) {
          refetch();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/login", { state: location.pathname });
    }
  };

  const handleDownVote = async (id) => {
    if (user && user?.email) {
      try {
        const { data } = await axiosSecure.patch(`/community/downvote/${id}`);
        if (data.modifiedCount) {
          refetch();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/login", { state: location.pathname });
    }
  };

  return (
    <div className="w-10/12 mx-auto my-10 mb-20">
      <SectionTitle
        subtitle={"Our Community"}
        title={"Recent Posts"}
        dark={"white"}
      ></SectionTitle>
      <div className="my-10 grid grid-cols-1 lg:grid-cols-2  gap-5 ">
        {communities.map((post) => (
          <div
            key={post._id}
            className="flex flex-col gap-2 shadow-xl p-5 rounded-lg border dark:border-none dark:bg-gray-900"
          >
            <div className="flex justify-between gap-5 pb-2 border-b mb-auto flex-grow">
              <h2 className="text-lg lg:text-xl font-bold dark:text-white">
                {post.title}
              </h2>
              <span
                className={`text-xs h-fit px-2 py-0.5 rounded-full font-semibold ${
                  post.role === "trainer"
                    ? "bg-green-100 text-green-900"
                    : "bg-blue-100 text-blue-900"
                }`}
              >
                {post.role}
              </span>
            </div>
            <div className="flex justify-between py-2 text-gray-600 dark:text-gray-500">
              <p> By {post.author}</p>
              <p>Date: {post.date}</p>
            </div>
            <p className="text-gray-600 dark:text-gray-500">
              Category: {post.category}
            </p>
            <p className="flex-grow dark:text-white">{post.description}</p>
            <div className="flex justify-between items-center border-t pt-3 dark:text-white">
              <span className="text-sm">
                {" "}
                <span className="font-semibold ">Votes:</span> {post.votes}
              </span>
              <div className="space-x-2 text-xl font-semibold dark:text-white">
                <button
                  onClick={() => handleUpVote(post._id)}
                  className="px-3 py-2 rounded-full "
                >
                  <AiOutlineLike />
                </button>
                <button
                  onClick={() => handleDownVote(post._id)}
                  className="px-3 py-2 rounded-full "
                >
                  <AiOutlineDislike />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-fit mx-auto">
        <Link to={"all-classes"}>
          <button className="bg-gradient-to-r from-primary to-secondary px-4 py-2 text-white rounded-md font-[500] hover:opacity-50">
            See All Posts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecentCommunity;
