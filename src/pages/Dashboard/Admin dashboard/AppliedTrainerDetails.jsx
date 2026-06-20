import React from "react";
import { useLoaderData } from "react-router-dom";
import Back from "../../../components/Shared/Back";
import { Helmet } from "react-helmet-async";
import {
  FiMail,
  FiClock,
  FiBriefcase,
  FiAward,
  FiCalendar,
  FiUser,
} from "react-icons/fi";

const AppliedTrainerDetails = () => {
  const appliedTrainer = useLoaderData() || {};

  return (
    <div className="space-y-6 antialiased pb-10">
      <Helmet>
        <title>FitRack | Candidate File Review</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <Back />
      </div>

      {/* Main Container Stack */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
        {/* Left Column: Visual Profile Snapshot Card */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-transparent border border-gray-300/60 dark:border-white/10 backdrop-blur-md shadow-sm relative overflow-hidden group">
            <div className="absolute top-[-20%] left-[-20%] w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

            {/* Optimized Frame Aspect */}
            <div className="w-full h-72 rounded-xl overflow-hidden border border-gray-200 dark:border-white/5 relative">
              <img
                className="w-full height-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={appliedTrainer.profileImage}
                alt={`${appliedTrainer.fullName || "Candidate"} Framework Profile`}
              />
            </div>

            {/* Profile Meta Metadata */}
            <div className="mt-4 space-y-1">
              <h2 className="text-lg font-black tracking-tight text-slate-950 dark:text-white uppercase">
                {appliedTrainer.fullName}
              </h2>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400">
                <FiUser className="text-primary text-sm" />{" "}
                <span>Candidate Profile Ledger</span>
              </div>

              <div className="pt-2 flex items-center gap-2 mt-1 border-t border-gray-200 dark:border-white/5">
                <FiMail className="text-secondary shrink-0" />
                <span
                  className="text-xs font-bold text-slate-800 dark:text-gray-300 truncate"
                  title={appliedTrainer.email}
                >
                  {appliedTrainer.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Exhaustive Onboarding Parameters */}
        <div className="md:col-span-8 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-transparent border border-gray-300/60 dark:border-white/10 backdrop-blur-md shadow-sm space-y-6 relative overflow-hidden">
            <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            {/* Section Header */}
            <div className="border-b border-gray-200 dark:border-white/5 pb-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Core Credentials
              </h3>
              <p className="text-base font-black text-slate-950 dark:text-white tracking-tight uppercase mt-0.5">
                Instructional Experience Parameters
              </p>
            </div>

            {/* Metric Matrix Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-gray-300/40 dark:border-white/5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block mb-1">
                  Age Context
                </span>
                <span className="text-lg font-black text-slate-950 dark:text-white tracking-tight">
                  {appliedTrainer.age}{" "}
                  <span className="text-xs font-semibold text-gray-400">
                    Years
                  </span>
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-gray-300/40 dark:border-white/5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block mb-1 flex items-center gap-1">
                  <FiBriefcase /> Seniority
                </span>
                <span className="text-lg font-black text-slate-950 dark:text-white tracking-tight">
                  {appliedTrainer.yearsOfExperience}{" "}
                  <span className="text-xs font-semibold text-gray-400">
                    Yrs Exp
                  </span>
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-gray-300/40 dark:border-white/5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block mb-1 flex items-center gap-1">
                  <FiClock /> Scope Window
                </span>
                <span
                  className="text-sm font-black text-slate-950 dark:text-white truncate block mt-0.5"
                  title={appliedTrainer.availableTime}
                >
                  {appliedTrainer.availableTime}
                </span>
              </div>
            </div>

            {/* Bio / Payload Description */}
            {appliedTrainer.bio && (
              <div className="space-y-1.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Professional Bio
                </span>
                <p className="text-xs font-medium leading-relaxed text-gray-600 dark:text-gray-400 bg-slate-50/50 dark:bg-white/5 p-4 rounded-xl border border-gray-300/30 dark:border-white/5">
                  {appliedTrainer.bio}
                </p>
              </div>
            )}

            {/* Skills Framework Section */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                <FiAward className="text-primary" /> Endorsed Core Skills Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {appliedTrainer?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-gray-300 bg-slate-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg uppercase tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Allocation Target Days */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                <FiCalendar className="text-secondary" /> Available Availability
                Schedule
              </span>
              <div className="flex flex-wrap gap-1.5">
                {appliedTrainer?.availableDays?.map((day, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider bg-primary/10 border border-primary/20 text-primary rounded-md"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedTrainerDetails;
