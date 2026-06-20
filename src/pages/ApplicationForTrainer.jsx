import React, { useState } from "react";
import Select from "react-select";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useTrainerCheck from "../hooks/useTrainerCheck";
import useAppliedTrainer from "../hooks/useAppliedTrainer";
import {
  FiUser,
  FiMail,
  FiClock,
  FiBriefcase,
  FiHash,
  FiImage,
  FiGrid,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";
import { div } from "framer-motion/client";

const ApplicationForTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const { isTrainer } = useTrainerCheck();
  const { appliedTrainers } = useAppliedTrainer();

  const currentUser = appliedTrainers?.find((u) => u.email === user?.email);

  const [formData, setFormData] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    age: "",
    profileImage: "",
    yearsOfExperience: "",
    skills: [],
    availableDays: [],
    availableTime: "",
  });

  const skillsOptions = [
    { value: "Weight Loss Coaching", label: "Weight Loss Coaching" },
    { value: "Nutrition Planning", label: "Nutrition Planning" },
    { value: "Bodybuilding", label: "Bodybuilding" },
    { value: "Strength Conditioning", label: "Strength Conditioning" },
    { value: "HIIT", label: "HIIT" },
    { value: "Fat Burn", label: "Fat Burn" },
    { value: "Core Strength", label: "Core Strength" },
    { value: "Injury Prevention", label: "Injury Prevention" },
  ];

  const daysOptions = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];

  // Premium Tokyo Night Custom Style Injector for React-Select
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      borderColor: state.isFocused ? "#ff5200" : "rgba(148, 163, 184, 0.3)",
      boxShadow: state.isFocused ? "0 0 0 1px #ff5200" : "none",
      borderRadius: "0.75rem",
      padding: "2px",
      minHeight: "42px",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: "rgba(148, 163, 184, 0.5)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: document.documentElement.classList.contains("dark")
        ? "#12131a"
        : "#white",
      border: "1px solid rgba(148, 163, 184, 0.2)",
      borderRadius: "0.75rem",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
      overflow: "hidden",
    }),
    option: (provided, state) => {
      const isDark = document.documentElement.classList.contains("dark");

      return {
        ...provided,
        // ১. Selected হলে Primary কালার, Focused/Hover হলে হালকা অপাসিটি, আর ডিফল্ট অবস্থায় মোড অনুযায়ী ব্যাকগ্রাউন্ড
        backgroundColor: state.isSelected
          ? "#ff5200"
          : state.isFocused
            ? "rgba(255, 82, 0)" // Hover State with low opacity primary
            : isDark
              ? "#12131a" // আপনার dynamic dark surface কালার (বা প্রোজেক্টের surface-dark hex)
              : "#ffffff", // Light mode default bg

        // ২. Selected হলে সাদা, Focused হলে Primary, আর ডিফল্ট অবস্থায় মোড অনুযায়ী টেক্সট কালার
        color: state.isSelected
          ? "#ffffff"
          : state.isFocused
            ? "#fff"
            : isDark
              ? "#d1d5db" // text-gray-300
              : "#111827", // text-gray-900

        cursor: "pointer",
        fontSize: "13px",
        fontWeight: "600",
        transition: "all 0.15s ease",
        "&:active": {
          backgroundColor: "#ff5200",
          color: "#ffffff",
        },
      };
    },
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "rgba(255, 82, 0, 0.1)",
      borderRadius: "0.375rem",
      border: "1px solid rgba(255, 82, 0, 0.2)",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#ff5200",
      fontSize: "11px",
      fontWeight: "700",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#ff5200",
      "&:hover": {
        backgroundColor: "rgba(255, 82, 0, 0.2)",
        color: "#ff5200",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#94a3b8",
      fontSize: "13px",
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosSecure.post("/applied-as-trainer", {
        ...formData,
        status: "pending",
      });

      if (data.success) {
        Swal.fire({
          title: "Application Broadcasted",
          text: "Your professional registry is pending verification log review.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/dashboard/activity-log");
        }, 1500);
      }
    } catch (error) {
      console.error("Transmission sequence broken", error);
      Swal.fire(
        "Transmission Failed",
        error.message || "Network Error",
        "error",
      );
    }
  };

  return (
    <div className="py-28">
      <div className="max-w-4xl mx-auto bg-white dark:bg-transparent md:border border-gray-300/60 dark:border-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden antialiased">
        <Helmet>
          <title>FitRack | Cluster Application</title>
        </Helmet>

        {/* Absolute Geometric Light Accent */}
        <div className="absolute top-[-20%] left-[-10%] w-60 h-60 md:bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header Section */}
        <div className="text-center mb-8 relative">
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-950 dark:text-white flex items-center justify-center gap-2">
            <FiGrid className="text-primary animate-pulse" /> Apply to Be a
            Trainer
          </h1>
          <p className="text-xs font-semibold text-slate-500 dark:text-gray-400 mt-1">
            Deploy your core training profile assets into the FitRack cluster
            environment.
          </p>
        </div>

        {/* Authorization Guard Verification */}
        {isAdmin || isTrainer ? (
          <div className="py-20 text-center rounded-xl border border-red-500/20 bg-red-500/5 max-w-xl mx-auto p-6 space-y-3">
            <FiAlertTriangle className="text-4xl text-red-500 mx-auto animate-bounce" />
            <h3 className="text-sm font-black uppercase tracking-wider text-red-500">
              Access Sequence Denied
            </h3>
            <p className="text-xs text-gray-800 dark:text-gray-400 font-medium">
              Your current account context contains elevated active privileges
              (Admin/Trainer). Re-application is restricted.
            </p>
          </div>
        ) : currentUser?.status === "pending" ? (
          <div className="py-20 text-center rounded-xl border border-secondary/20 bg-secondary/5 max-w-xl mx-auto p-6 space-y-3">
            <FiClock className="text-4xl text-secondary mx-auto animate-spin-slow" />
            <h3 className="text-sm font-black uppercase tracking-wider text-secondary">
              Registry Pipeline Pending
            </h3>
            <p className="text-xs text-gray-800 dark:text-gray-400 font-medium">
              Your submission payload is currently under system queue
              evaluation. Track progress via the verification log.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            {/* Two Column Grid Structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
                  <FiUser className="text-primary" /> Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-slate-50 dark:bg-transparent text-slate-950 dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-semibold transition-all outline-none"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>

              {/* Read-Only Email Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
                  <FiMail className="text-gray-400" /> Email
                </label>
                <input
                  type="email"
                  className="w-full bg-slate-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-slate-400 dark:text-gray-800 rounded-xl px-4 py-2.5 text-sm font-mono cursor-not-allowed outline-none"
                  value={formData.email}
                  readOnly
                />
              </div>

              {/* Age Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
                  <FiHash className="text-primary" /> Age
                </label>
                <input
                  type="number"
                  placeholder="Years"
                  className="w-full bg-slate-50 dark:bg-transparent text-slate-950 dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-semibold transition-all outline-none"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  required
                />
              </div>

              {/* Experience Metric */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
                  <FiBriefcase className="text-primary" /> Years of Experience
                </label>
                <input
                  type="text"
                  placeholder="e.g., 3 Years"
                  className="w-full bg-slate-50 dark:bg-transparent text-slate-950 dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-semibold transition-all outline-none"
                  value={formData.yearsOfExperience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      yearsOfExperience: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Image Vector URL */}
              <div className="col-span-1 md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
                  <FiImage className="text-primary" />
                  Photo URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/vector.png"
                  className="w-full bg-slate-50 dark:bg-transparent text-slate-950 dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-mono transition-all outline-none"
                  value={formData.profileImage}
                  onChange={(e) =>
                    setFormData({ ...formData, profileImage: e.target.value })
                  }
                  required
                />
              </div>

              {/* Advanced Multi-Select Matrix Modules */}
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {/* Skills Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400">
                    Skill-Set Class Matrix
                  </label>
                  <Select
                    isMulti
                    options={skillsOptions}
                    styles={customSelectStyles}
                    placeholder="Select technical matrix components..."
                    onChange={(selected) =>
                      setFormData({
                        ...formData,
                        skills: selected ? selected.map((s) => s.value) : [],
                      })
                    }
                  />
                </div>

                {/* Day Availability Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400">
                    Weekly Node Availability
                  </label>
                  <Select
                    isMulti
                    options={daysOptions}
                    styles={customSelectStyles}
                    placeholder="Select core active days..."
                    onChange={(selected) =>
                      setFormData({
                        ...formData,
                        availableDays: selected
                          ? selected.map((d) => d.value)
                          : [],
                      })
                    }
                  />
                </div>
              </div>

              {/* Time Frame Scope */}
              <div className="col-span-1 md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
                  <FiClock className="text-primary" /> Daily Schedule Span
                </label>
                <input
                  type="text"
                  placeholder="e.g., 09:00 AM - 05:00 PM"
                  className="w-full bg-slate-50 dark:bg-transparent text-slate-950 dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-mono transition-all outline-none"
                  value={formData.availableTime}
                  onChange={(e) =>
                    setFormData({ ...formData, availableTime: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Action Form Dispatch Anchor */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/10 hover:opacity-95 active:scale-99 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <FiCheckCircle className="text-sm" /> Dispatch Registry Payload
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplicationForTrainer;
