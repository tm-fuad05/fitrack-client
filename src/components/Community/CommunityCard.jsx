import React from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import {
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTag,
} from "react-icons/hi2";
import moment from "moment/moment";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const CommunityCard = ({ post, refetch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { _id, author, category, date, description, role, title, votedBy } =
    post;
  const axiosSecure = useAxiosSecure();
  const isVoted = votedBy?.includes(user?.email);

  const handleVote = async (id) => {
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

  return (
    <div
      key={_id}
      className="flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all duration-300 group relative h-full"
    >
      {/* Header Area: Title & Role Badge */}
      <div className="flex justify-between items-start gap-4 pb-3 border-b border-white/5">
        <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-foreground-dark tracking-wide leading-snug group-hover:text-primary transition-colors">
          {title}
        </h2>
        <span
          className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg font-bold shrink-0 ${
            role === "trainer"
              ? "bg-primary/10 border border-primary/20 text-primary"
              : "bg-emerald-500/10 border border-gray-600 dark:text-gray-500 text-emerald-400"
          }`}
        >
          {role}
        </span>
      </div>

      {/* Meta Info Area */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-700 font-medium">
        <div className="flex items-center gap-1.5">
          <HiOutlineUser className="text-sm text-gray-700 dark:text-gray-500" />
          <span>
            By{" "}
            <span className="text-gray-700 dark:text-gray-300 font-bold">
              {author}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <HiOutlineCalendar className="text-sm text-gray-500" />
          <span>{moment(date).format("MMM DD YYYY")}</span>
        </div>
      </div>

      {/* Category Tag */}
      <div className="inline-flex items-center gap-1.5 w-fit text-xs px-2.5 py-1 rounded-lg border border-dashed border-gray-500 dark:border-gray-700 text-gray-800 dark:text-gray-300 bg-transparent">
        <HiOutlineTag className="text-primary text-sm" />
        <span className="font-medium capitalize">{category}</span>
      </div>

      {/* Description Text */}
      <p className="text-sm text-gray-800 dark:text-foreground-dark leading-relaxed flex-grow line-clamp-3">
        {description}
      </p>

      {/* Footer Area: Voting System */}
      <div className="flex justify-between items-center border-t dark:border-white/5  border-gray-300 pt-4 mt-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-700 dark:text-gray-500">
            Total Feedback
          </span>
          <span className="text-sm font-bold text-gray-700 dark:text-white">
            Votes:{" "}
            <motion.span
              key={_id}
              initial={{ scale: 1.2, color: "var(--primary)" }}
              animate={{ scale: 1, color: "currentColor" }}
              className={`inline-block font-bold ${votedBy?.length >= 0 ? "text-primary" : "text-red-400"}`}
            >
              {votedBy?.length || 0}
            </motion.span>
          </span>
        </div>

        {/* Like / Dislike Micro-Interactions in Floating Dock */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-transparent border border-white/5 rounded-xl p-1 shadow-inner">
          <motion.button
            whileHover={{ scale: 1.1, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleVote(_id)}
            className={` ${isVoted ? "text-primary" : "text-gray-600"} p-2 rounded-lg  hover:text-primary hover:bg-white/5 transition-all`}
            aria-label="Upvote"
          >
            <AiFillLike className="text-xl" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
