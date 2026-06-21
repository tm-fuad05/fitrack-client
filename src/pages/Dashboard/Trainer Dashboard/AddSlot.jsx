import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTrainer from "../../../hooks/useTrainer";
import useAuth from "../../../hooks/useAuth";
import Select from "react-select";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
import {
  FiPlusCircle,
  FiUser,
  FiCalendar,
  FiClock,
  FiLayers,
} from "react-icons/fi";

const AddSlot = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { trainers, refetch } = useTrainer();
  const currentTrainer = trainers.find((t) => t.email === user.email);
  const navigate = useNavigate();
  const isDark = document.documentElement.classList.contains("dark");

  const [formData, setFormData] = useState({
    fullName: user.displayName,
    email: user?.email,
    skills: [],
    availableDays: [],
    slotName: "",
    availableTime: currentTrainer?.availableTime,
  });

  const selectedSkills = currentTrainer?.skills?.map((s) => ({
    value: s,
    label: s,
  }));

  const selectedSlots = currentTrainer?.availableDays?.map((d) => ({
    value: d,
    label: d,
  }));

  const daysOptions = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];

  const classesOptions = [
    { value: "yoga", label: "Yoga" },
    { value: "hiit", label: "HIIT (High-Intensity Interval Training)" },
    { value: "zumba", label: "Zumba" },
    { value: "pilates", label: "Pilates" },
    { value: "spinning", label: "Spinning" },
    { value: "strength_training", label: "Strength Training" },
    { value: "boxing", label: "Boxing" },
    { value: "dance", label: "Dance Fitness" },
    { value: "crossfit", label: "CrossFit" },
    { value: "aqua_aerobics", label: "Aqua Aerobics" },
    { value: "barre", label: "Barre" },
    { value: "kickboxing", label: "Kickboxing" },
    { value: "tai_chi", label: "Tai Chi" },
    { value: "stretching", label: "Stretching" },
    { value: "cardio", label: "Cardio Workouts" },
    { value: "functional_training", label: "Functional Training" },
  ];

  // react-select এর জন্য থিম স্টাইলস (লাইট মোডে ডিপ টেক্সট কন্ট্রাস্ট সহ)
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
      borderColor: state.isFocused
        ? "var(--color-primary, #3b82f6)"
        : isDark
          ? "rgba(255, 255, 255, 0.1)"
          : "#D1D5DB",
      borderRadius: "0.75rem",
      padding: "2px",
      boxShadow: "none",
      "&:hover": {
        borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "#4b5563",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDark ? "#1f2937" : "#ffffff",
      borderRadius: "0.75rem",
      border: isDark
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid #d1d5db",
      zIndex: 20,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--color-primary, #3b82f6)"
        : state.isFocused
          ? isDark
            ? "rgba(255, 255, 255, 0.1)"
            : "#f3f4f6"
          : "transparent",
      color: state.isSelected ? "#ffffff" : isDark ? "#ffffff" : "#0f172a", // লাইট মোডে ড্রপডাউন অপশনের ডিপ কালার
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0",
      borderRadius: "0.5rem",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: isDark ? "#ffffff" : "#0f172a", // সিলেক্টেড ব্যাজের টেক্সট ডিপ করা হয়েছে
      fontWeight: "500",
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosSecure.patch(
        `/trainers/addSlot/${currentTrainer._id}`,
        formData,
      );

      if (data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Slot Added Successfully",
          icon: "success",
          background: isDark ? "#171717" : "#ffffff",
          color: isDark ? "#ffffff" : "#171717",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/dashboard/manage-slot");
        }, 1500);
      }
    } catch (error) {
      alert("Failed to add slot", error);
    }
  };

  return (
    <div className="w-11/12 max-w-4xl mx-auto bg-transparent text-slate-900 dark:text-white antialiased">
      <Helmet>
        <title>FitRack | Add Slots</title>
      </Helmet>

      {/* Header Container */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black tracking-tight text-surface-dark dark:text-white uppercase flex items-center justify-center gap-2">
          <FiPlusCircle className="text-primary" /> Add Routine{" "}
          <span className="text-primary">Slot</span>
        </h1>
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">
          Configure a fresh availability structure for your dynamic training
          roster
        </p>
      </div>

      {/* Main Glass Form Wrapper */}
      <div className="p-6 lg:p-10 rounded-3xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Read Only Meta Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-4 rounded-2xl bg-gray-200/50 dark:bg-white/5 border border-gray-300 dark:border-white/5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-gray-700 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <FiUser /> Full Name
              </label>
              <input
                type="text"
                className="w-full rounded-xl px-4 py-2.5 bg-gray-400/30 dark:bg-white/5 border border-transparent text-gray-700 dark:text-gray-400 font-bold cursor-not-allowed text-sm"
                value={formData.fullName}
                disabled
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-gray-700 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                Email Address
              </label>
              <input
                type="email"
                className="w-full rounded-xl px-4 py-2.5 bg-gray-400/30 dark:bg-white/5 border border-transparent text-gray-700 dark:text-gray-400 font-bold cursor-not-allowed text-sm"
                value={formData.email}
                disabled
              />
            </div>
          </div>

          {/* Section: Interactive Slot Data Configuration */}
          <div className="grid grid-cols-1 gap-6">
            {/* Slot Name */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-gray-800 dark:text-gray-400 uppercase tracking-wider block">
                Target Slot Identifier / Name
              </label>
              <input
                type="text"
                placeholder="e.g., Morning Shift, Afternoon Core, Late Night Hypertrophy"
                className="w-full rounded-xl px-4 py-3 border border-gray-400 dark:border-white/10 bg-white dark:bg-white/5 text-surface-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 font-semibold text-sm transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
                value={formData.slotName}
                onChange={(e) =>
                  setFormData({ ...formData, slotName: e.target.value })
                }
                required
              />
            </div>

            {/* Available Days Multi-Select */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-gray-800 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <FiCalendar className="text-primary" /> Active Schedule
                Distribution (Days)
              </label>
              <Select
                isMulti
                defaultValue={selectedSlots}
                options={daysOptions}
                styles={customSelectStyles}
                onChange={(selected) =>
                  setFormData({
                    ...formData,
                    availableDays: selected ? selected.map((d) => d.value) : [],
                  })
                }
              />
            </div>

            {/* Classes Assignment Multi-Select */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-gray-800 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <FiLayers className="text-secondary" /> Map Gym Classes into
                Slot
              </label>
              <Select
                isMulti
                options={classesOptions}
                styles={customSelectStyles}
                onChange={(selected) =>
                  setFormData({
                    ...formData,
                    classes: selected ? selected.map((c) => c.value) : [],
                  })
                }
              />
            </div>

            {/* Skills (Read Only Badge Visuals) */}
            <div className="space-y-2 opacity-85">
              <label className="text-xs font-extrabold text-gray-800 dark:text-gray-400 uppercase tracking-wider block">
                Your Specializations Reference
              </label>
              <Select
                isMulti
                defaultValue={selectedSkills}
                styles={customSelectStyles}
              />
            </div>
          </div>

          {/* Action Trigger Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl font-black text-sm tracking-wide text-white bg-gradient-to-r from-primary to-secondary hover:opacity-95 shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Commit & Append New Slot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSlot;
