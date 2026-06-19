import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import {
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTag,
} from "react-icons/hi2";
import SectionTitle from "../Shared/SectionTitle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

const RecentCommunity = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: communities = [], refetch } = useQuery({
    queryKey: ["community"],
    queryFn: async () => {
      try {
        const { data } = await axiosPublic.get("/recent-community");
        return data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });

  const handleUpVote = async (id) => {
    if (user && user?.email) {
      try {
        const { data } = await axiosSecure.patch(`/community/upvote/${id}`);
        if (data.success || data.modifiedCount) {
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
        if (data.success || data.modifiedCount) {
          refetch();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/login", { state: location.pathname });
    }
  };

  // Stagger configurations for grid container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // Slide-up configuration for community post cards
  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="w-11/12 xl:w-10/12 mx-auto my-16 mb-28">
      <SectionTitle subtitle={"Our Community"} title={"Recent Posts"} />

      {/* Animated Layout Grid Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-6 p-4"
      >
        {communities.map((post) => (
          <motion.div
            key={post._id}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Header Area: Title & Role Badge */}
            <div className="flex justify-between items-start gap-4 pb-3 border-b border-white/5">
              <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-foreground-dark tracking-wide leading-snug group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <span
                className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg font-bold shrink-0 ${
                  post.role === "trainer"
                    ? "bg-primary/10 border border-primary/20 text-primary"
                    : "bg-emerald-500/10 border border-gray-600 dark:text-gray-500 text-emerald-400"
                }`}
              >
                {post.role}
              </span>
            </div>

            {/* Meta Info Area */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-700 font-medium">
              <div className="flex items-center gap-1.5">
                <HiOutlineUser className="text-sm text-gray-700 dark:text-gray-500" />
                <span>
                  By{" "}
                  <span className="text-gray-700 dark:text-gray-300 font-bold">
                    {post.author}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineCalendar className="text-sm text-gray-500" />
                <span>{post.date}</span>
              </div>
            </div>

            {/* Category Tag */}
            <div className="inline-flex items-center gap-1.5 w-fit text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300市 bg-transparent">
              <HiOutlineTag className="text-primary text-sm" />
              <span className="font-medium capitalize">{post.category}</span>
            </div>

            {/* Description Text */}
            <p className="text-sm text-gray-800 dark:text-foreground-dark leading-relaxed flex-grow line-clamp-3">
              {post.description}
            </p>

            {/* Footer Area: Voting System */}
            <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-2">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-700 dark:text-gray-500">
                  Total Feedback
                </span>
                <span className="text-sm font-bold text-gray-700 dark:text-white">
                  Votes:{" "}
                  <motion.span
                    key={post.votes}
                    initial={{ scale: 1.2, color: "var(--primary)" }}
                    animate={{ scale: 1, color: "currentColor" }}
                    className={`inline-block font-bold ${post.votes >= 0 ? "text-primary" : "text-red-400"}`}
                  >
                    {post.votes}
                  </motion.span>
                </span>
              </div>

              {/* Like / Dislike Micro-Interactions in Floating Dock */}
              <div className="flex items-center gap-1 bg-neutral-950/40 border border-white/5 rounded-xl p-1 shadow-inner">
                <motion.button
                  whileHover={{ scale: 1.1, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleUpVote(post._id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-white/5 transition-all"
                  aria-label="Upvote"
                >
                  <AiFillLike className="text-xl" />
                </motion.button>

                <div className="w-[1px] h-4 bg-white/10"></div>

                <motion.button
                  whileHover={{ scale: 1.1, y: 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownVote(post._id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-all"
                  aria-label="Downvote"
                >
                  <AiFillDislike className="text-xl" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Primary To Secondary CTA Action Button */}
      <motion.div
        className="w-fit mx-auto mt-4"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <Link to={"/community"}>
          <button className="relative bg-gradient-to-r from-primary to-secondary px-6 py-3 text-white rounded-xl font-medium shadow-lg shadow-primary/20 hover:shadow-secondary/30 transition-all duration-300 overflow-hidden group/btn">
            <span className="relative z-10">See All Posts</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default RecentCommunity;
