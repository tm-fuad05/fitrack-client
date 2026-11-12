import { useState } from "react";
import Select from "react-select";
import { useGetAllTrainers } from "../../../hooks/useTrainer";
import { Helmet } from "react-helmet-async";
import { FiPlusCircle, FiBookOpen, FiFileText, FiUsers } from "react-icons/fi";
import { useAddClass } from "../../../hooks/useClass";
import { useValidateInput } from "../../../hooks/useValidateInput";
import { createClassSchema } from "../../../validation/schema/class.validation";

const AddClass = () => {
  const { data: trainers } = useGetAllTrainers();
  const [error, setError] = useState([]);
  // const { data, error, isValid, setError, validate } =
  // useValidateInput(createClassSchema);
  const [formData, setFormData] = useState({
    name: null,
    description: null,
    trainers: [],
  });
  const mutation = useAddClass();

  const trainersOptions = trainers?.map((trainer) => ({
    value: trainer.fullName,
    label: trainer.fullName,
  }));

  const nameError = error?.find((err) => err.field === "name");
  const desError = error?.find((err) => err.field === "description");
  const trainerError = error?.find((err) => err.field === "trainers");

  const changeInputHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value.length > 0 ? value : null,
    }));

    const fieldError = error.find((err) => err.field === name);

    if (fieldError) setError((prev) => [...prev, (fieldError.message = "")]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error: validationError } =
      createClassSchema.safeParse(formData);

    if (validationError)
      return setError(
        validationError?.issues?.map((err) => ({
          field: err?.path[0],
          message: err?.message,
        })),
      );

    mutation.mutate(data);
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      borderColor: state.isFocused
        ? "var(--color-primary, #ff5200)"
        : "rgba(156, 163, 175, 0.4)",
      boxShadow: state.isFocused
        ? "0 0 0 1px var(--color-primary, #ff5200)"
        : "none",
      borderRadius: "0.75rem",
      padding: "2px",
      "&:hover": {
        borderColor: "var(--color-primary, #ff5200)",
      },
    }),
    menu: (provided) => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      return {
        ...provided,
        backgroundColor: isDarkMode ? "#12131a" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "0.75rem",
        border: isDarkMode
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "1px solid rgba(156, 163, 175, 0.2)",
        overflow: "hidden",
        zIndex: 50,
      };
    },
    option: (provided, state) => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      return {
        ...provided,
        backgroundColor: state.isSelected
          ? "var(--color-primary, #ff5200)"
          : state.isFocused
            ? isDarkMode
              ? "rgba(255, 82, 0, 0.15)"
              : "rgba(255, 82, 0, 0.1)"
            : isDarkMode
              ? "#1a1b26" // ডার্ক মোডে ড্রপডাউন অপশনের ডিপ ব্যাকগ্রাউন্ড
              : "transparent",
        color: state.isSelected
          ? "#ffffff"
          : isDarkMode
            ? "#a9b1d6" // ডার্ক মোডের সফ্ট টেক্সট কালার
            : "#1e293b",
        cursor: "pointer",
        ":active": {
          backgroundColor: "var(--color-primary, #ff5200)",
          color: "#ffffff",
        },
      };
    },
    multiValue: (provided) => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      return {
        ...provided,
        backgroundColor: isDarkMode
          ? "rgba(255, 82, 0, 0.15)"
          : "rgba(255, 82, 0, 0.1)",
        borderRadius: "0.375rem",
        border: isDarkMode
          ? "1px solid rgba(255, 82, 0, 0.3)"
          : "1px solid rgba(255, 82, 0, 0.2)",
      };
    },
    multiValueLabel: (provided) => ({
      ...provided,
      color: "var(--color-primary, #ff5200)",
      fontWeight: "700",
      fontSize: "0.75rem",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "var(--color-primary, #ff5200)",
      "&:hover": {
        backgroundColor: "var(--color-primary, #ff5200)",
        color: "#ffffff",
      },
    }),
  };

  return (
    <div className="space-y-6 antialiased pb-10">
      <Helmet>
        <title>FitRack | Initialize Class Blueprint</title>
      </Helmet>

      {/* Premium Profile Section Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-transparent border border-gray-300/60 dark:border-white/10 backdrop-blur-md shadow-sm relative overflow-hidden max-w-3xl mx-auto">
        <div className="absolute top-[-30%] right-[-10%] w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div>
          <h1 className="text-xl font-black tracking-tight text-surface-dark dark:text-white uppercase flex items-center gap-2">
            <FiPlusCircle className="text-primary" /> Deploy New Class
          </h1>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
            Construct and scale new fitness metrics blueprints assigned directly
            to active instructors.
          </p>
        </div>
      </div>

      {/* Main Structuring Input Form Layout */}
      <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl bg-white dark:bg-transparent border border-gray-300/60 dark:border-white/10 backdrop-blur-md shadow-sm relative">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Class Name Spec */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
              <FiBookOpen className="text-primary" /> Class Designation Title
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., High-Intensity Metabolic Conditioning"
              className="w-full bg-transparent text-surface-dark dark:text-white border border-gray-400/40 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none"
              value={formData.name}
              onChange={changeInputHandler}
            />
            {nameError && (
              <p className="text-xs text-red-500 pl-1">{nameError.message}</p>
            )}
          </div>

          {/* Details Specification */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
              <FiFileText className="text-secondary" /> Architectural Syllabus &
              Details
            </label>
            <textarea
              name="description"
              placeholder="Map out structural targets, physiological scopes, or program descriptions..."
              className="w-full bg-transparent text-surface-dark dark:text-white border border-gray-400/40 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-medium transition-all outline-none leading-relaxed"
              value={formData.description}
              onChange={changeInputHandler}
              rows={5}
            />
            {desError && (
              <p className="text-xs text-red-500 pl-1">{desError.message}</p>
            )}
          </div>

          {/* Instructors Multi-Allocation Core */}
          <div className="space-y-1.5 dark:[&_.css-1dimb5e-singleValue]:text-white dark:[&_.css-1p3m7a8-multiValue]:bg-white/5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
              <FiUsers className="text-primary" /> Allocate Roster Instructors
            </label>
            <Select
              isMulti
              name="trainers"
              options={trainersOptions}
              className="w-full text-sm font-semibold text-surface-dark dark:text-white"
              styles={customSelectStyles}
              placeholder="Search and map active instructors to system profile..."
              onChange={(selected) => {
                if (trainerError)
                  setError((prev) => [...prev, (trainerError.message = "")]);

                setFormData({
                  ...formData,
                  trainers: selected ? selected?.map((t) => t.value) : [],
                });
              }}
            />
            {trainerError && (
              <p className="text-xs text-red-500 pl-1">
                {trainerError.message}
              </p>
            )}
          </div>

          {/* Submit Action Block */}
          <div className="pt-4 border-t border-gray-200 dark:border-white/5">
            <button
              type="submit"
              className="w-full py-3.5 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-primary to-secondary hover:opacity-95 rounded-xl shadow-lg shadow-primary/10 transition-all cursor-pointer"
            >
              Initialize Profile Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
