import React from "react";
import SectionTitle from "../Shared/SectionTitle";
import { TbTreadmill } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";
import { FaDumbbell } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Featured = () => {
  const cards = [
    {
      name: "Personal Training",
      description:
        "Achieve personalized fitness goals with our expert trainers guiding you every step of the way.",
      icons: <TbTreadmill />,
    },
    {
      name: "Group Classes",
      description:
        "Join dynamic group classes that combine fun and fitness, fostering a sense of community.",
      icons: <FaPeopleGroup />,
    },
    {
      name: "Nutrition Guidance",
      description:
        "Fuel your body right with customized nutrition plans to complement your fitness routine.",
      icons: <LuNotebookPen />,
    },
    {
      name: "State-of-the-Art Equipment",
      description:
        "Unleash your potential with our cutting-edge gym equipment, crafted for a state-of-the-art fitness experience.",
      icons: <FaDumbbell />,
    },
  ];

  // Grid container animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Single card entrance animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen py-24 bg-background dark:bg-background-dark overflow-hidden">
      <SectionTitle
        title={"Transform Your Health and Elevate Your Fitness Journey"}
        subtitle={"our services"}
      />

      {/* Animated wrapper grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-11/12 xl:w-10/12 mx-auto mt-14"
      >
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{
              y: -8,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            className="relative flex flex-col md:flex-row gap-6 border border-white/5 dark:border-gray-800 bg-surface/40 dark:bg-surface-dark/40 backdrop-blur-md p-8 md:p-10 rounded-2xl group transition-all duration-300 shadow-xl overflow-hidden"
          >
            {/* Hover Background Accent Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/10 to-secondary/10 transition-opacity duration-500 pointer-events-none" />

            {/* Animated Icon Container */}
            <motion.div
              className="p-5 text-4xl text-secondary border border-secondary/30 bg-secondary/5 rounded-2xl w-fit h-fit transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]"
              whileHover={{ rotate: 8, scale: 1.05 }}
            >
              {card.icons}
            </motion.div>

            {/* Content Area */}
            <div className="flex flex-col gap-3 z-10 flex-grow">
              <h3 className="uppercase text-xl font-bold font-oxanium text-foreground dark:text-foreground-dark tracking-wide transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary">
                {card.name}
              </h3>

              <p className="font-poppins text-sm lg:text-base text-foreground-muted dark:text-foreground-muted-dark font-light leading-relaxed">
                {card.description}
              </p>

              <div className="mt-auto pt-4">
                <Link to={"/all-classes"}>
                  <button className="capitalize flex items-center gap-3 py-2 px-5 font-medium font-poppins text-sm border border-foreground/20 dark:border-white/10 rounded-full text-foreground dark:text-foreground-dark transition-all duration-300 hover:border-primary dark:hover:border-secondary group/btn relative overflow-hidden">
                    read more
                    {/* Dynamic arrow tracking */}
                    <motion.div
                      className="flex items-center justify-center"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <FiArrowRight className="text-2xl p-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white" />
                    </motion.div>
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Featured;
