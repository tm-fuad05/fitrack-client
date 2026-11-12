/* eslint-disable no-unused-vars */
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
import { useState } from "react";
import Select from "react-select";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import { useApplyForTrainer, useMyApplication } from "../hooks/useApplicant";

import { useCheckRole } from "../hooks/useRole";
import { createApplicationSchema } from "../validation/schema/application.validation";

const ApplicationForTrainer = () => {
  const { user } = useAuth();
  const { isAdmin, isTrainer } = useCheckRole();
  const [error, setError] = useState([]);
  const { data: applicant } = useMyApplication();

  const [formData, setFormData] = useState({
    fullName: null,
    email: user?.email,
    age: null,
    profileImage: null,
    yearsOfExperience: null,
    skills: [],
    availableDays: [],
    availableTime: null,
  });

  const nameError = error?.find((err) => err.field === "fullName");
  const emailError = error?.find((err) => err.field === "email");
  const ageError = error?.find((err) => err.field === "age");
  const imageError = error?.find((err) => err.field === "profileImage");
  const experienceError = error?.find(
    (err) => err.field === "yearsOfExperience",
  );
  const skillError = error?.find((err) => err.field === "skills");
  const daysError = error?.find((err) => err.field === "availableDays");
  const timeError = error?.find((err) => err.field === "availableTime");

  const changeInputHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value.length > 0 ? value : null,
    }));

    const fieldError = error.find((err) => err.field === name);

    if (fieldError) setError((prev) => [...prev, (fieldError.message = "")]);
  };

  const postMutation = useApplyForTrainer();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error: validationError } =
      createApplicationSchema.safeParse(formData);

    if (validationError)
      return setError(
        validationError?.issues?.map((err) => ({
          field: err?.path[0],
          message: err?.message,
        })),
      );
    postMutation.mutate(data);
  };

  const skillsOptions = [
    { value: "Yoga", label: "Yoga" },
    { value: "HIIT", label: "HIIT (High-Intensity Interval Training)" },
    { value: "Zumba", label: "Zumba" },
    { value: "Pilates", label: "Pilates" },
    { value: "Spinning", label: "Spinning" },
    { value: "Strength Training", label: "Strength Training" },
    { value: "Boxing", label: "Boxing" },
    { value: "Dance Fitness", label: "Dance Fitness" },
    { value: "CrossFit", label: "CrossFit" },
    { value: "Aqua Aerobics", label: "Aqua Aerobics" },
    { value: "Barre", label: "Barre" },
    { value: "Kickboxing", label: "Kickboxing" },
    { value: "Tai Chi", label: "Tai Chi" },
    { value: "Stretching", label: "Stretching" },
    { value: "Cardio Workouts", label: "Cardio Workouts" },
    { value: "Functional Training", label: "Functional Training" },
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

        backgroundColor: state.isSelected
          ? "#ff5200"
          : state.isFocused
            ? "rgba(255, 82, 0)"
            : isDark
              ? "#12131a"
              : "#ffffff",

        color: state.isSelected
          ? "#ffffff"
          : state.isFocused
            ? "#fff"
            : isDark
              ? "#d1d5db"
              : "#111827",

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
          <h1 className="text-2xl font-black uppercase tracking-tight text-surface-dark dark:text-white flex items-center justify-center gap-2">
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
        ) : applicant?.status === "pending" ? (
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
                  name="fullName"
                  placeholder="Enter your full name"
                  className="w-full bg-slate-50 dark:bg-transparent text-surface-dark dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-semibold transition-all outline-none"
                  value={formData.fullName}
                  onChange={changeInputHandler}
                />
                {nameError && (
                  <p className="text-xs text-red-500 pl-1">
                    {nameError.message}
                  </p>
                )}
              </div>

              {/* Read-Only Email Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
                  <FiMail className="text-gray-400" /> Email
                </label>
                <input
                  name="email"
                  className="w-full bg-slate-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-slate-400 dark:text-gray-800 rounded-xl px-4 py-2.5 text-sm font-mono cursor-not-allowed outline-none"
                  value={formData.email}
                  onChange={changeInputHandler}
                  readOnly
                />
                {emailError && (
                  <p className="text-xs text-red-500 pl-1">
                    {emailError.message}
                  </p>
                )}
              </div>

              {/* Age Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
                  <FiHash className="text-primary" /> Age
                </label>
                <input
                  type="number"
                  name="age"
                  placeholder="Years"
                  className="w-full bg-slate-50 dark:bg-transparent text-surface-dark dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-semibold transition-all outline-none"
                  value={formData.age}
                  onChange={changeInputHandler}
                />
                {ageError && (
                  <p className="text-xs text-red-500 pl-1">
                    {ageError.message}
                  </p>
                )}
              </div>

              {/* Experience Metric */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
                  <FiBriefcase className="text-primary" /> Years of Experience
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  placeholder="e.g., 3 Years"
                  className="w-full bg-slate-50 dark:bg-transparent text-surface-dark dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-semibold transition-all outline-none"
                  value={formData.yearsOfExperience}
                  onChange={changeInputHandler}
                />
                {experienceError && (
                  <p className="text-xs text-red-500 pl-1">
                    {experienceError.message}
                  </p>
                )}
              </div>

              {/* Image Vector URL */}
              <div className="col-span-1 md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
                  <FiImage className="text-primary" />
                  Photo URL
                </label>
                <input
                  type="url"
                  name="profileImage"
                  placeholder="https://example.com/vector.png"
                  className="w-full bg-slate-50 dark:bg-transparent text-surface-dark dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-mono transition-all outline-none"
                  value={formData.profileImage}
                  onChange={changeInputHandler}
                />
                {imageError && (
                  <p className="text-xs text-red-500 pl-1">
                    {imageError.message}
                  </p>
                )}
              </div>

              {/* Advanced Multi-Select Matrix Modules */}
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {/* Skills Selector */}
                <div className="space-y-1.5" data-lenis-prevent>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400">
                    Skill-Set Class Matrix
                  </label>
                  <Select
                    isMulti
                    name="skills"
                    options={skillsOptions}
                    styles={customSelectStyles}
                    placeholder="Select technical matrix components..."
                    onChange={(selected) => {
                      if (skillError)
                        setError((prev) => [
                          ...prev,
                          (skillError.message = ""),
                        ]);

                      setFormData({
                        ...formData,
                        skills: selected ? selected?.map((s) => s.value) : [],
                      });
                    }}
                  />
                  {skillError && (
                    <p className="text-xs text-red-500 pl-1">
                      {skillError.message}
                    </p>
                  )}
                </div>

                {/* Day Availability Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400">
                    Weekly Node Availability
                  </label>
                  <Select
                    isMulti
                    name="availableDays"
                    options={daysOptions}
                    styles={customSelectStyles}
                    placeholder="Select core active days..."
                    onChange={(selected) => {
                      if (daysError)
                        setError((prev) => [...prev, (daysError.message = "")]);

                      setFormData({
                        ...formData,
                        availableDays: selected
                          ? selected?.map((d) => d.value)
                          : [],
                      });
                    }}
                  />
                  {daysError && (
                    <p className="text-xs text-red-500 pl-1">
                      {daysError.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Time Frame Scope */}
              <div className="col-span-1 md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
                  <FiClock className="text-primary" /> Daily Schedule Span
                </label>
                <input
                  type="text"
                  name="availableTime"
                  placeholder="e.g., 09:00 AM - 05:00 PM"
                  className="w-full bg-slate-50 dark:bg-transparent text-surface-dark dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-mono transition-all outline-none"
                  value={formData.availableTime}
                  onChange={changeInputHandler}
                />
                {timeError && (
                  <p className="text-xs text-red-500 pl-1">
                    {timeError.message}
                  </p>
                )}
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
