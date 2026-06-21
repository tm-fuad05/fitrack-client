import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useTrainer from "../../../hooks/useTrainer";
import { FaTrash } from "react-icons/fa6";
import { FiCalendar, FiCheckCircle } from "react-icons/fi";
import usePayment from "../../../hooks/usePayment";
import { TiTick } from "react-icons/ti";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import Select from "react-select";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Loader from "../../../components/Shared/Loader";

const ManageSlot = () => {
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const { user } = useAuth();
  const { trainers, refetch, isLoading } = useTrainer();
  const { payments } = usePayment();
  const isDark = document.documentElement.classList.contains("dark");

  const currentTrainer = trainers.find((t) => t.email === user.email);

  const [formData, setFormData] = useState({
    availableDays: [],
  });

  const bookingSlots = payments.filter((p) => p.trainer === user.displayName);

  const selectedSlots = currentTrainer?.availableDays?.map((d) => ({
    value: d,
    label: d,
  }));

  const handleManageSlots = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosSecure.patch(
        `/trainers/deleteSlot/${currentTrainer._id}`,
        formData,
      );

      if (data.success) {
        refetch();
        setOpen(false);
        Swal.fire({
          title: "Slot Configuration Updated",
          icon: "success",
          background: isDark ? "#171717" : "#ffffff",
          color: isDark ? "#ffffff" : "#0f172a",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      alert(`Failed to delete slot: ${error.message || error}`);
    }
  };

  // react-select কাস্টম স্টাইলস (লাইট মোডে ডিপ থিম ট্র্যাকিং সহ)
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
      borderColor: state.isFocused
        ? "var(--color-primary, #3b82f6)"
        : isDark
          ? "rgba(255, 255, 255, 0.1)"
          : "#9ca3af",
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
      zIndex: 50,
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
      color: state.isSelected ? "#ffffff" : isDark ? "#ffffff" : "#0f172a",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0",
      borderRadius: "0.5rem",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: isDark ? "#ffffff" : "#0f172a",
      fontWeight: "500",
    }),
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-11/12 max-w-5xl mx-auto bg-transparent text-slate-900 dark:text-white antialiased">
      <Helmet>
        <title>FitRack | Manage Slot</title>
      </Helmet>

      {/* Header section */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black tracking-tight text-surface-dark dark:text-white uppercase flex items-center justify-center gap-2">
          <FiCalendar className="text-primary" /> Manage Routine{" "}
          <span className="text-primary">Slots</span>
        </h1>
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">
          Monitor active day distributions, filter bookings, and handle
          availability updates
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Table Glass Card Wrapper */}
        <div className="rounded-3xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200/70 dark:bg-white/5 border-b border-gray-300 dark:border-white/10">
                  <th className="p-4 text-xs font-black uppercase tracking-wider text-surface-dark dark:text-gray-300">
                    Trainer Name
                  </th>
                  <th className="p-4 text-xs font-black uppercase tracking-wider text-surface-dark dark:text-gray-300">
                    Active Slots / Schedule
                  </th>
                  <th className="p-4 text-xs font-black uppercase tracking-wider text-surface-dark dark:text-gray-300 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300/50 dark:divide-white/5">
                <tr className="hover:bg-gray-200/20 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-surface-dark dark:text-gray-200 text-sm">
                    {user?.displayName}
                  </td>
                  <td className="p-4 space-y-1.5">
                    {currentTrainer?.availableDays?.map((d, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-1.5 bg-gray-200/60 dark:bg-white/10 text-surface-dark dark:text-gray-200 text-xs font-bold px-3 py-1.5 rounded-lg mr-2 mb-1.5 shadow-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {d} ({currentTrainer?.availableTime || "Not Specified"})
                      </div>
                    ))}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={handleOpen}
                      title="Modify Availability Slots"
                      className="p-3 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white rounded-xl transition-all duration-300 shadow-md shadow-red-500/5 hover:shadow-red-500/20 cursor-pointer"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Booked Slots Analytics Card */}
        <div className="p-6 rounded-3xl border border-gray-300 dark:border-white/10 bg-gray-100/70 dark:bg-white/5 backdrop-blur-md shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl pointer-events-none" />

          <h3 className="text-lg font-black text-surface-dark dark:text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
            <FiCheckCircle className="text-green-500" /> Current Trainee
            Bookings
          </h3>

          {bookingSlots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bookingSlots.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-white/5 text-surface-dark dark:text-gray-200 shadow-inner"
                >
                  <div className="p-1.5 rounded-lg bg-green-500/10 text-green-500 shrink-0">
                    <TiTick className="text-xl" />
                  </div>
                  <div className="text-xs font-semibold truncate">
                    <span className="font-extrabold text-primary">
                      {slot.slot}
                    </span>
                    <span className="mx-1.5 text-gray-400">||</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      By:{" "}
                      <strong className="text-surface-dark dark:text-white font-bold">
                        {slot.name}
                      </strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 italic bg-white dark:bg-white/5 p-4 rounded-xl text-center border border-dashed border-gray-300 dark:border-white/10">
              No reservation logs discovered on your slots data pipeline.
            </p>
          )}
        </div>
      </div>

      {/* Material Tailwind Global Themed Dialog */}
      <Dialog
        open={open}
        handler={handleOpen}
        size="sm"
        className="bg-white dark:bg-neutral-900 border border-gray-300 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden focus:outline-none"
      >
        <DialogHeader className="text-lg font-black text-surface-dark dark:text-white px-6 pt-6 uppercase tracking-wide border-b border-gray-200 dark:border-white/5 pb-3">
          Configure Distribution Structure
        </DialogHeader>
        <DialogBody className="p-6">
          <form onSubmit={handleManageSlots} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-gray-800 dark:text-gray-400 uppercase tracking-wider block">
                Retain / Active Week Slots
              </label>
              <Select
                isMulti
                defaultValue={selectedSlots}
                options={selectedSlots} // শুধুমাত্র নিজের একটিভ স্লটগুলোই অপশন হিসেবে থাকবে রিমুভ করার জন্য
                styles={customSelectStyles}
                onChange={(selected) =>
                  setFormData({
                    availableDays: selected ? selected.map((d) => d.value) : [],
                  })
                }
              />
              <p className="text-[11px] text-gray-500 font-semibold mt-1">
                * Deselect any target days inside the wrapper block to purge
                them from backend storage logs upon commit.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleOpen}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-200/70 dark:bg-white/5 hover:bg-gray-300/80 dark:hover:bg-white/10 transition-all cursor-pointer"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-primary to-secondary hover:opacity-95 shadow-md shadow-primary/10 transition-all cursor-pointer"
              >
                Commit Structural Changes
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default ManageSlot;
