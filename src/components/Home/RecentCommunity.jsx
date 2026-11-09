/* eslint-disable no-unused-vars */
import SectionTitle from "../Shared/SectionTitle";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CommunityCard from "../Community/CommunityCard";
import { useGetRecentCommunities } from "../../hooks/useCommunity";
import { cardNode, parentContainer } from "../../animation/motion.animation";

const RecentCommunity = () => {
  const { data: communities, isLoading, refetch } = useGetRecentCommunities();

  return (
    <div className="w-11/12 mx-auto my-16 mb-28">
      <SectionTitle subtitle={"Our Community"} title={"Recent Posts"} />

      {/* Animated Layout Grid Container */}
      <motion.div
        variants={parentContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {communities?.map((post) => (
          <motion.div
            key={post._id}
            variants={cardNode}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <CommunityCard post={post} refetch={refetch} />
          </motion.div>
        ))}
      </motion.div>

      {/* Primary To Secondary CTA Action Button */}
      <motion.div
        className="w-fit mx-auto mt-4"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <Link to={"/communities"}>
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
