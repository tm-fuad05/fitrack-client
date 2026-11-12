import { useEffect, useState } from "react";
import { useAddSlot, useGetAllTrainers } from "../../../hooks/useTrainer";
import useAuth from "../../../hooks/useAuth";
import Select from "react-select";
import { Helmet } from "react-helmet-async";
import "sweetalert2/src/sweetalert2.scss";
import { FiPlusCircle, FiUser, FiCalendar, FiClock } from "react-icons/fi";

const AddSlot = () => {
  const { user } = useAuth();
  const { data: trainers, isLoading } = useGetAllTrainers();
  const currentTrainer = trainers?.find((t) => t.email === user.email);
  const [formData, setFormData] = useState({
    availableDays: [],
    availableTime: "",
  });
  useEffect(() => {
    if (!isLoading && currentTrainer) {
      setFormData((prev) => ({
        ...prev,
        availableDays: currentTrainer?.availableDays || [],
        availableTime: currentTrainer?.availableTime || "",
      }));
    }
  }, [currentTrainer, user, isLoading]);

  const isDark = document.documentElement.classList.contains("dark");

  const daysOptions = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];

  const selectedDays = daysOptions?.filter((d) =>
    formData?.availableDays?.includes(d.value),
  );
  const remainingDays = daysOptions?.filter(
    (d) => !formData?.availableDays?.includes(d.value),
  );

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
      backgroundColor: state.isprev
        ? "var(--color-primary, #3b82f6)"
        : state.isFocused
          ? isDark
            ? "rgba(255, 255, 255, 0.1)"
            : "#f3f4f6"
          : "transparent",
      color: state.isprev ? "#ffffff" : isDark ? "#ffffff" : "#0f172a", // লাইট মোডে ড্রপডাউন অপশনের ডিপ কালার
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

  const patchMutation = useAddSlot();

  const handleSubmit = async (e) => {
    e.preventDefault();
    patchMutation.mutate({
      payload: formData,
      id: currentTrainer?._id,
    });
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
      <div className="p-6 lg:p-10 rounded-3xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md shadow-2xl relative">
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
                defaultValue={currentTrainer?.fullName}
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
                defaultValue={currentTrainer?.email}
                disabled
              />
            </div>
          </div>

          {/* Section: Interactive Slot Data Configuration */}
          <div className="grid grid-cols-1 gap-6 relative">
            {/* Available Time */}
            <div className="col-span-1 md:col-span-2 space-y-1.5">
              <label className="text-xs font-extrabold text-gray-800 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <FiClock className="text-primary" /> Daily Schedule
              </label>
              <input
                type="text"
                placeholder="e.g., 09:00 AM - 05:00 PM"
                className="w-full bg-slate-50 dark:bg-transparent text-surface-dark dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-mono transition-all outline-none"
                value={formData.availableTime}
                onChange={(e) =>
                  setFormData({ ...formData, availableTime: e.target.value })
                }
                required
              />
            </div>
            {/* Available Days */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-gray-800 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <FiCalendar className="text-primary" /> Available Days
              </label>
              <Select
                isMulti
                value={selectedDays}
                options={remainingDays}
                styles={customSelectStyles}
                onChange={(selected) => {
                  setFormData({
                    ...formData,
                    availableDays: selected
                      ? selected?.map((d) => d.value)
                      : [],
                  });
                }}
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
