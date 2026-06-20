import React from "react";
import { useParams } from "react-router-dom";
import Packages from "../components/Shared/Packages";
import { Helmet } from "react-helmet-async";
// import {
//   HiOutlineUser,
//   HiOutlineClock,
//   HiOutlineAcademicCap,
// } from "react-icons/fi"; // বা আপনার প্রজেক্টের যেকোনো রিঅ্যাক্ট আইকন সেট
import { FiClock, FiUser, FiZap } from "react-icons/fi";

const TrainerBooking = () => {
  const { trainerName, slot, skills } = useParams();

  return (
    <div className="w-11/12 max-w-7xl mx-auto my-28 bg-transparent text-gray-900 dark:text-white antialiased">
      <Helmet>
        <title>FitRack | Booking</title>
      </Helmet>

      {/* Booking Overview Header Grid */}
      <div className="mb-16">
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 dark:text-white uppercase mb-2">
          Review Your <span className="text-primary">Booking</span>
        </h1>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Confirm your selected trainer details before proceeding to premium
          membership selection
        </p>
      </div>

      {/* Meta Info Glass Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 lg:p-8 rounded-3xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md shadow-xl mb-16 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Trainer Name Block */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 shadow-sm">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
            <FiUser className="text-lg" />
          </div>
          <div className="space-y-0.5 overflow-hidden">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Assigned Trainer
            </span>
            <p className="text-base font-black text-gray-900 dark:text-white truncate">
              {trainerName}
            </p>
          </div>
        </div>

        {/* Selected Slot Block */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 shadow-sm">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/10 text-secondary shrink-0">
            <FiClock className="text-lg" />
          </div>
          <div className="space-y-0.5 overflow-hidden">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Selected Schedule
            </span>
            <p className="text-base font-black text-gray-900 dark:text-white truncate">
              {slot}
            </p>
          </div>
        </div>

        {/* Skills Block */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 shadow-sm">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
            <FiZap className="text-lg" />
          </div>
          <div className="space-y-0.5 overflow-hidden">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Focused Expertise
            </span>
            <p className="text-base font-black text-gray-900 dark:text-white truncate">
              {skills}
            </p>
          </div>
        </div>
      </div>

      {/* Packages Component Call */}
      <Packages slot={slot} trainerName={trainerName} />
    </div>
  );
};

export default TrainerBooking;
