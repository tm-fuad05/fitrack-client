/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { FiClock, FiGrid, FiAlertTriangle } from "react-icons/fi";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import { useApplyForTrainer, useMyApplication } from "../hooks/useApplicant";

import { useCheckRole } from "../hooks/useRole";
import { createApplicationSchema } from "../validation/schema/application.validation";
import { useUploadImage } from "../hooks/useUploadImage";
import { fileSchema } from "../validation/schema/file.validation";
import ApplicationFrom from "./ApplicationForm";

const ApplicationForTrainer = () => {
  const { user } = useAuth();
  const { isAdmin, isTrainer } = useCheckRole();
  const [error, setError] = useState([]);
  const { data: applicant } = useMyApplication();
  const [preview, setPreview] = useState(null);
  const postMutation = useApplyForTrainer();
  const uploadMutation = useUploadImage();
  console.log(error);

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

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { data, error: fileError } = fileSchema.safeParse(file);

    if (fileError) {
      return setError(
        fileError?.issues?.map((err) => ({
          field: "profileImage",
          message: err?.message,
        })),
      );
    }

    setPreview(URL.createObjectURL(data));
    setFormData((prev) => ({ ...prev, profileImage: data }));

    const imageError = error?.find((err) => err.field === "profileImage");
    if (imageError) setError((prev) => [...prev, (imageError.message = "")]);
  };

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

    const { data: applicantData, error: validationError } =
      createApplicationSchema.safeParse(formData);

    if (validationError)
      return setError(
        validationError?.issues?.map((err) => ({
          field: err?.path[0],
          message: err?.message,
        })),
      );

    let photoUrl = "";
    try {
      if (applicantData?.profileImage) {
        const result = await uploadMutation.mutateAsync({
          file: applicantData?.profileImage,
          path: "trainers",
        });
        photoUrl = result?.data;
      }
    } catch (err) {
      console.error("Upload Error:", err);
    }

    postMutation.mutate({ ...applicantData, profileImage: photoUrl });
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
          <ApplicationFrom
            error={error}
            setError={setError}
            skillsOptions={skillsOptions}
            changeInputHandler={changeInputHandler}
            customSelectStyles={customSelectStyles}
            formData={formData}
            daysOptions={daysOptions}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            preview={preview}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
};

export default ApplicationForTrainer;
