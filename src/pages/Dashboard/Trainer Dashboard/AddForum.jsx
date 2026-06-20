import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import {
  FiFileText,
  FiTag,
  FiEdit3,
  FiUser,
  FiCalendar,
  FiShield,
} from "react-icons/fi";

const AddForum = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const axiosSecure = useAxiosSecure();
  const isDark = document.documentElement.classList.contains("dark");

  const date = new Date();

  const [formData, setFormData] = useState({
    title: "",
    author: user?.displayName,
    date: date,
    category: "",
    role: `${isAdmin ? "admin" : "trainer"}`,
    description: "",
    votedBy: [],
  });

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosSecure.post("/community", formData);
      if (data.success) {
        Swal.fire({
          title: "Successfully Added",
          icon: "success",
          background: isDark ? "#171717" : "#ffffff",
          color: isDark ? "#ffffff" : "#171717",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/community");
        }, 1500);
      }
    } catch (error) {
      alert("Failed to post", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-transparent text-slate-900 dark:text-white antialiased">
      <Helmet>
        <title>FitRack | Add Forum</title>
      </Helmet>

      {/* Header Title */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white uppercase flex items-center justify-center gap-2">
          <FiEdit3 className="text-primary" /> Post a{" "}
          <span className="text-primary">Forum</span>
        </h1>
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-700 dark:text-gray-400 mt-1">
          Share your professional insights, fitness paradigms, or platform
          updates
        </p>
      </div>

      {/* Main Form Container */}
      <div className="p-6 lg:p-10 rounded-3xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <form onSubmit={handlePost} className="space-y-6">
          {/* Top Banner Meta Info (Read Only Display) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-gray-200/50 dark:bg-white/5 border border-gray-300 dark:border-white/5 text-sm">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold">
              <FiUser className="text-primary shrink-0" />
              <span className="truncate">
                <span className="text-gray-700 dark:text-gray-400 font-bold mr-1">
                  Author:
                </span>{" "}
                {formData.author}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold">
              <FiCalendar className="text-primary shrink-0" />
              <span>
                <span className="text-gray-700 dark:text-gray-400 font-bold mr-1">
                  Date:
                </span>{" "}
                {moment(formData.date).format("MMM DD YYYY")}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold capitalize">
              <FiShield className="text-secondary shrink-0" />
              <span>
                <span className="text-gray-700 dark:text-gray-400 font-bold mr-1">
                  Role Badge:
                </span>{" "}
                {formData.role}
              </span>
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-gray-800 dark:text-gray-700 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <FiFileText className="text-primary" /> Forum Title
            </label>
            <input
              type="text"
              placeholder="e.g., Optimal Post-Workout Nutrition Windows"
              className="w-full bg-transparent text-slate-950 dark:text-white border border-gray-400/40 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          {/* Category Input */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-gray-800 dark:text-gray-700 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <FiTag className="text-secondary" /> Category / Tag
            </label>
            <input
              type="text"
              placeholder="e.g., Diet & Nutrition, Hypertrophy, Cardio"
              className="w-full bg-transparent text-slate-950 dark:text-white border border-gray-400/40 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            />
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-gray-800 dark:text-gray-700 dark:text-gray-400 uppercase tracking-wider block">
              Detailed Article Description
            </label>
            <textarea
              placeholder="Compose your comprehensive technical discourse here..."
              className="w-full bg-transparent text-slate-950 dark:text-white border border-gray-400/40 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-medium transition-all outline-none leading-relaxed"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={6}
              required
            />
          </div>

          {/* Action Trigger Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl font-black text-sm tracking-wide text-white bg-gradient-to-r from-primary to-secondary hover:opacity-95 shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Publish Article into Community
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForum;
