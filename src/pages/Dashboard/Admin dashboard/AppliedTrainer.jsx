import React, { useState } from "react";
import useAppliedTrainer from "../../../hooks/useAppliedTrainer";
import { TiTick } from "react-icons/ti";
import { FiUsers, FiMail, FiEye, FiX, FiUserX } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useUser from "../../../hooks/useUser";
import Back from "../../../components/Shared/Back";
import { Dialog, DialogBody, Input, Textarea } from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Loader from "../../../components/Shared/Loader";

const AppliedTrainer = () => {
  const { appliedTrainers, refetch, isLoading } = useAppliedTrainer();
  const pendingFilter =
    appliedTrainers?.filter((p) => p.status === "pending") || [];
  const axiosSecure = useAxiosSecure();
  const { users } = useUser();

  const [open, setOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleOpen = (trainer = null) => {
    setSelectedTrainer(trainer);
    setOpen(!open);
  };

  const handleConfirmTrainer = async (trainer) => {
    const currentTrainer = users.find((u) => u.email === trainer.email);
    if (!currentTrainer) {
      Swal.fire("Error", "Corresponding user account not found.", "error");
      return;
    }

    const confirmedTrainer = {
      fullName: trainer.fullName,
      email: trainer.email,
      age: trainer.age,
      profileImage: trainer.profileImage,
      skills: trainer.skills,
      availableDays: trainer.availableDays,
      availableTime: trainer.availableTime,
    };

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Confirm ${trainer.fullName} as an active instructor?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary, #ff5200)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Allocation",
    });

    if (!result.isConfirmed) return;

    try {
      const [postRes, deleteRes, patchRes] = await Promise.all([
        axiosSecure.post("/trainers", confirmedTrainer),
        axiosSecure.delete(`/applied-as-trainer/${trainer._id}`),
        axiosSecure.patch(`/users/make-trainer/${currentTrainer._id}`),
      ]);

      if (
        postRes.data.success &&
        deleteRes.data.success &&
        patchRes.data.success
      ) {
        refetch();
        Swal.fire({
          title: "Session Initialized!",
          text: `${trainer.fullName} has been successfully promoted to Trainer.`,
          icon: "success",
        });
      } else {
        Swal.fire("Error", "One or more pipeline operations failed.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        error.message || "Failed to execute pipeline.",
        "error",
      );
    }
  };

  const handleRejectPipeline = async (e) => {
    e.preventDefault();
    if (!selectedTrainer) return;

    const form = e.target;
    const email = form.email.value;
    const feedback = form.feedback.value;

    try {
      const feedbackRes = await axiosSecure.post("/rejection-feedback", {
        email,
        feedback,
      });

      if (feedbackRes.data.success) {
        const patchRes = await axiosSecure.patch(
          `/applied-as-trainer/${selectedTrainer._id}`,
        );

        if (patchRes.data.success) {
          refetch();
          handleOpen();
          Swal.fire({
            title: "Application Rejected",
            text: "Feedback successfully transmitted and log updated.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      }
    } catch (error) {
      console.error("Pipeline failure:", error);
      Swal.fire("Error", "Failed to process rejection routine.", "error");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 antialiased">
      <Helmet>
        <title>FitRack | Applied Trainers</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <Back />
      </div>

      {/* Premium Stats Header Panel */}
      <div className="p-6 rounded-2xl bg-white dark:bg-transparent border border-gray-300/60 dark:border-white/10 backdrop-blur-md shadow-sm relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-950 dark:text-white uppercase flex items-center gap-2">
              <FiUsers className="text-primary" /> Applied Candidates
            </h1>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
              Review and authorize structural onboarding for incoming profile
              credentials.
            </p>
          </div>

          <div className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 flex items-center gap-3 w-fit">
            <span className="text-xs font-extrabold uppercase tracking-wider text-gray-600 dark:text-gray-400">
              Pending Scope
            </span>
            <span className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              {pendingFilter.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Ledger Table Component */}
      {pendingFilter.length === 0 ? (
        <div className="py-16 text-center rounded-xl border-2 border-dashed border-gray-300 dark:border-white/10">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wide uppercase">
            No Pending Requisitions On Radar
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-300/60 dark:border-white/5 bg-white dark:bg-transparent">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-white/5 border-b border-gray-300 dark:border-white/10">
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Candidate
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <FiMail className="text-primary" /> Email Coordinates
                  </span>
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300 text-center">
                  Verify
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300 text-center">
                  Action Auth
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/5">
              {pendingFilter.map((trainer) => (
                <tr
                  key={trainer._id}
                  className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="p-4 text-sm font-bold text-slate-950 dark:text-gray-200 whitespace-nowrap">
                    {trainer.fullName}
                  </td>
                  <td className="p-4 text-sm font-semibold text-slate-800 dark:text-gray-400 whitespace-nowrap">
                    {trainer.email}
                  </td>
                  <td className="p-4 text-xs font-extrabold uppercase tracking-wider text-primary">
                    <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20">
                      {trainer.status}
                    </span>
                  </td>

                  {/* Details Navigation */}
                  <td className="p-4 text-center">
                    <Link to={trainer._id} title="Inspect Core Criteria">
                      <button className="p-2 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-gray-300 rounded-lg hover:text-secondary border border-gray-300 dark:border-white/10 transition-colors cursor-pointer inline-flex items-center justify-center text-lg">
                        <TbListDetails />
                      </button>
                    </Link>
                  </td>

                  {/* Actions System */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleConfirmTrainer(trainer)}
                        className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white border border-green-500/20 rounded-lg transition-all text-lg cursor-pointer inline-flex items-center justify-center"
                        title="Authorize Promotion"
                      >
                        <TiTick />
                      </button>
                      <button
                        onClick={() => handleOpen(trainer)}
                        className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-lg transition-all text-lg cursor-pointer inline-flex items-center justify-center"
                        title="Decline & Feedback Execution"
                      >
                        <FiUserX />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Unified Dialogue Terminal */}
      <Dialog
        open={open}
        handler={() => handleOpen(null)}
        size="sm"
        className="bg-white dark:bg-neutral-900 dark:border dark:border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
      >
        {selectedTrainer && (
          <>
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-3 mb-4">
              <h3 className="text-md font-black tracking-tight text-slate-950 dark:text-white uppercase flex items-center gap-2">
                <FiEye className="text-secondary" /> Candidate File Stack
              </h3>
              <button
                onClick={() => handleOpen(null)}
                className="text-lg p-1 text-gray-400 hover:text-slate-950 dark:hover:text-white cursor-pointer"
              >
                <FiX />
              </button>
            </div>

            <DialogBody className="space-y-6 text-slate-800 dark:text-gray-300 p-0 font-sans">
              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-gray-300/50 dark:border-white/5 grid grid-cols-2 gap-3 text-xs">
                <p className="font-semibold text-gray-500 uppercase">
                  Full Identity:{" "}
                  <span className="block text-sm font-black text-slate-950 dark:text-white tracking-tight mt-0.5">
                    {selectedTrainer.fullName}
                  </span>
                </p>
                <p className="font-semibold text-gray-500 uppercase">
                  Age Matrix:{" "}
                  <span className="block text-sm font-black text-slate-950 dark:text-white tracking-tight mt-0.5">
                    {selectedTrainer.age} Years
                  </span>
                </p>
                <p className="font-semibold text-gray-500 uppercase col-span-2">
                  Email Parameters:{" "}
                  <span className="block text-sm font-bold text-slate-800 dark:text-gray-300 mt-0.5">
                    {selectedTrainer.email}
                  </span>
                </p>
              </div>

              {/* Feedback Interface */}
              <form onSubmit={handleRejectPipeline} className="space-y-4">
                <div className="hidden">
                  <Input
                    label="email"
                    name="email"
                    defaultValue={selectedTrainer.email}
                    readOnly
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Rejection Logs Statement
                  </label>
                  <Textarea
                    label="Constructive Rejection Feedback Parameters..."
                    name="feedback"
                    required
                    className="bg-transparent text-slate-950 dark:text-white border-gray-400 dark:border-white/10 focus:border-primary rounded-xl"
                  />
                </div>

                {/* Submissions Action Stack */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200 dark:border-white/5">
                  <button
                    type="button"
                    className="px-4 py-2 text-xs font-bold uppercase text-gray-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                    onClick={() => handleOpen(null)}
                  >
                    Abort Control
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-black uppercase text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Execute Rejection
                  </button>
                </div>
              </form>
            </DialogBody>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default AppliedTrainer;
