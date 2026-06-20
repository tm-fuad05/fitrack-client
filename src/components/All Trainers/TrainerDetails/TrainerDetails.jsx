import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import BeATrainer from "./BeATariner";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import {
  FiMail,
  FiClock,
  FiCalendar,
  FiBriefcase,
  FiUser,
  FiZap,
} from "react-icons/fi";

const TrainerDetails = () => {
  const trainer = useLoaderData();
  const { user } = useAuth();

  return (
    <div className=" mt-28 bg-transparent text-gray-900 dark:text-white antialiased">
      <Helmet>
        <title>FitRack | {trainer.fullName || "Trainer Profile"}</title>
      </Helmet>

      {/* Main Structural Asymmetric Grid */}
      <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* Left Column (4 Cols): Floating Polaroid Frame Container */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 rounded-3xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md shadow-2xl"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-md h-[400px]">
              <img
                className="w-full h-full object-cover"
                src={trainer.profileImage}
                alt={`${trainer.fullName}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-secondary text-white text-[10px] font-black uppercase tracking-widest mb-1.5">
                  Elite Roster
                </span>
                <h3 className="text-xl font-black text-white tracking-tight">
                  {trainer.fullName}
                </h3>
              </div>
            </div>

            {/* Quick Micro-Meta Info */}
            <div className="mt-4 px-2 py-1 flex justify-between items-center text-xs text-gray-700 dark:text-gray-400 font-semibold border-t border-gray-200 dark:border-white/5 pt-3">
              <span className="flex items-center gap-1">
                <FiUser className="text-primary" /> {trainer.age} Y/O
              </span>
              <span className="flex items-center gap-1">
                <FiBriefcase className="text-primary" />{" "}
                {trainer.yearsOfExperience}Y Experience
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column (8 Cols): Deep Tech Data Layout */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header & Bio Segment */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
              Meet Your <span className="text-primary">Instructor</span>
            </h1>
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
              <FiMail className="text-primary text-base" />
              <span className="hover:text-primary transition-colors cursor-pointer">
                {trainer.email}
              </span>
            </div>
            {trainer.bio && (
              <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 font-normal leading-relaxed pt-2 border-l-2 border-gray-300 dark:border-white/10 pl-5">
                {trainer.bio}
              </p>
            )}
          </div>

          {/* Specializations & Skills Bento Section */}
          <div className="p-6 rounded-2xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md shadow-xl space-y-4">
            <h3 className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <FiZap className="text-primary" /> Technical Specializations
            </h3>
            <div className="flex flex-wrap gap-2">
              {trainer.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs font-bold px-3 py-2 rounded-xl bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/5 text-gray-800 dark:text-gray-200 tracking-wide"
                >
                  #{skill}
                </span>
              ))}
            </div>
          </div>

          {/* Clean Modern Grid Slots System */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                <FiClock className="text-secondary" /> Schedule Your Session
              </h3>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                <FiCalendar /> Standard Availability: {trainer.availableTime}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trainer.availableDays?.map((day) => (
                <Link
                  key={day}
                  to={`${
                    user && user?.email
                      ? `/trainer-booking/${trainer.fullName}/${day} (${trainer.availableTime})/${trainer.skills}`
                      : "/login"
                  }`}
                  className="flex flex-col gap-2 p-5 rounded-2xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent hover:border-secondary/50 dark:hover:border-secondary/40 hover:bg-white dark:hover:bg-neutral-900 transition-all duration-300 group shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-gray-900 dark:text-white group-hover:text-secondary transition-colors">
                      {day} Shift
                    </span>
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-secondary/10 text-secondary">
                      Available
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Book dedicated routine slot at {trainer.availableTime}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA Block */}
      <div className="border-t border-gray-200 dark:border-white/5 pt-12">
        <BeATrainer />
      </div>
    </div>
  );
};

export default TrainerDetails;
