import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import SectionTitle from "../Shared/SectionTitle";
import { Link } from "react-router-dom";

const RecentCommunity = () => {
  const axiosPublic = useAxiosPublic();
  const { data: communities = [], refetch } = useQuery({
    queryKey: ["community"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/recent-community");
      return data;
    },
  });

  return (
    <div className="w-10/12 mx-auto my-10 mb-20">
      <SectionTitle
        subtitle={"Our Community"}
        title={"Recent Posts"}
      ></SectionTitle>
      <div className="my-10 grid grid-cols-1 lg:grid-cols-2  gap-5 ">
        {communities.map((post) => (
          <div className="flex flex-col gap-2 shadow-xl p-5 rounded-lg border">
            <div className="flex justify-between gap-5 pb-2 border-b mb-auto flex-grow">
              <h2 className="text-lg lg:text-xl font-bold">{post.title}</h2>
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
            <div className="flex justify-between py-2 text-gray-600">
              <p> By {post.author}</p>
              <p>Date: {post.date}</p>
            </div>
            <p className="text-gray-600">Category: {post.category}</p>
            <p className="flex-grow">{post.description}</p>
            <div className="flex justify-between items-center border-t pt-3">
              <span className="text-sm">
                {" "}
                <span className="font-semibold">Votes:</span> {post.votes}
              </span>
              <div className="space-x-2 text-xl font-semibold">
                <button
                  onClick={() => handleUpVote(_id)}
                  className="px-3 py-2 rounded-full "
                >
                  <AiOutlineLike />
                </button>
                <button
                  onClick={() => handleDownVote(_id)}
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
