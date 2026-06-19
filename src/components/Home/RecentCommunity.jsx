import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
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
  const navigate = useNavigate(); // Added missing navigation reference

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
    <div className="w-11/12 xl:w-10/12 mx-auto my-16 mb-28 overflow-hidden">
      <SectionTitle subtitle={"Our Community"} title={"Recent Posts"} />

      {/* Animated Layout Grid Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {communities.map((post) => (
          <motion.div
            key={post._id}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col gap-4 shadow-xl p-6 md:p-8 rounded-2xl border border-white/5 dark:border-gray-800 bg-surface/60 dark:bg-surface-dark/40 backdrop-blur-md relative overflow-hidden group"
          >
            {/* Top Row: Title & Badges */}
            <div className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100 dark:border-gray-800/60">
              <h2 className="text-lg lg:text-xl font-bold font-oxanium text-foreground dark:text-foreground-dark tracking-wide leading-snug">
                {post.title}
              </h2>
              <span
                className={`text-[10px] uppercase tracking-wider h-fit px-3 py-1 rounded-full font-bold shadow-sm ${
                  post.role === "trainer"
                    ? "bg-gradient-to-r from-primary/20 to-primary/30 text-primary border border-primary/20"
                    : "bg-gradient-to-r from-secondary/20 to-secondary/30 text-secondary border border-secondary/20"
                }`}
              >
                {post.role}
              </span>
            </div>

            {/* Meta Info Row */}
            <div className="flex flex-wrap justify-between text-xs font-poppins text-foreground-muted dark:text-foreground-muted-dark opacity-80">
              <p>
                By{" "}
                <span className="font-medium text-foreground dark:text-foreground-dark">
                  {post.author}
                </span>
              </p>
              <p>{post.date}</p>
            </div>

            {/* Content & Category */}
            <div className="flex flex-col gap-2 flex-grow">
              <span className="text-xs font-semibold w-fit px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-foreground-muted dark:text-foreground-muted-dark font-poppins">
                #{post.category}
              </span>
              <p className="text-sm md:text-base leading-relaxed text-foreground/90 dark:text-foreground-dark/90 font-poppins font-light mt-1">
                {post.description}
              </p>
            </div>

            {/* Footer Interactive Actions */}
            <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-800/60 pt-4 mt-2">
              <span className="text-sm font-poppins text-foreground-muted dark:text-foreground-muted-dark">
                Total{" "}
                <span className="font-semibold text-foreground dark:text-foreground-dark">
                  Votes:
                </span>{" "}
                <motion.span
                  key={post.votes}
                  initial={{ scale: 1.2, color: "var(--primary)" }}
                  animate={{ scale: 1, color: "currentColor" }}
                  className="inline-block font-bold"
                >
                  {post.votes}
                </motion.span>
              </span>

              {/* Like / Dislike Micro-Interactions */}
              <div className="flex items-center gap-1 font-semibold text-foreground dark:text-foreground-dark">
                <motion.button
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleUpVote(post._id)}
                  className="p-2.5 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                >
                  <AiOutlineLike className="text-xl" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.15, y: 2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDownVote(post._id)}
                  className="p-2.5 rounded-xl hover:bg-rose-500/10 hover:text-rose-500 transition-colors duration-200"
                >
                  <AiOutlineDislike className="text-xl" />
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
        <Link to={"all-classes"}>
          <button className="relative bg-gradient-to-r from-primary to-secondary px-6 py-3 text-white rounded-xl font-medium font-poppins shadow-lg shadow-primary/20 hover:shadow-secondary/30 transition-all duration-300 overflow-hidden group/btn">
            <span className="relative z-10">See All Posts</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default RecentCommunity;
