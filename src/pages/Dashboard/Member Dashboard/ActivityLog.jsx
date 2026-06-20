import React from "react";
import useAppliedTrainer from "../../../hooks/useAppliedTrainer";
import Back from "../../../components/Shared/Back";
import useAuth from "../../../hooks/useAuth";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Loader from "../../../components/Shared/Loader";
import Swal from "sweetalert2";
import {
  FiActivity,
  FiEye,
  FiTrash2,
  FiClock,
  FiX,
  FiInfo,
} from "react-icons/fi";

const ActivityLog = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  // Fetch Rejection Feedbacks
  const { data: rejectionFeedback = [], isLoading } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/rejection-feedback");
        return data;
      } catch (error) {
        console.error("Failed to load data", error);
        return [];
      }
    },
  });

  const rejectedUser = rejectionFeedback.find((u) => u.email === user?.email);
  const { appliedTrainers = [], refetch } = useAppliedTrainer() || {
    appliedTrainers: [],
  };
  const currentUser = appliedTrainers.find((u) => u.email === user?.email);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Retract Application?",
      text: "This will purge your submission record from the screening queue.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "var(--color-primary, #ff5200)",
      confirmButtonText: "Retract Record",
    });

    if (!result.isConfirmed) return;

    try {
      const { data } = await axiosSecure.delete(
        `/applied-as-trainer/${currentUser._id}`,
      );
      if (data.success) {
        refetch();
        Swal.fire({
          title: "Record Terminated",
          text: "Your application footprint has been cleared.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Failed to delete", error);
      Swal.fire("Error", "Pipeline failure during data clearing.", "error");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 antialiased pb-10">
      <Helmet>
        <title>FitRack | Operation Logs</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <Back />
      </div>

      {/* Premium Sci-Fi Stats Header Panel */}
      <div className="p-6 rounded-2xl bg-white dark:bg-transparent border border-gray-300/60 dark:border-white/10 backdrop-blur-md shadow-sm relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <h1 className="text-xl font-black tracking-tight text-slate-950 dark:text-white uppercase flex items-center gap-2">
          <FiActivity className="text-primary animate-pulse" /> Security
          Activity Ledger
        </h1>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
          Track real-time parameters, approval statuses, and structural response
          hashes for outstanding roles.
        </p>
      </div>

      {/* Core Log Entry Table Layout */}
      {!currentUser ? (
        <div className="py-16 text-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/10 bg-white dark:bg-transparent">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wide uppercase flex items-center justify-center gap-2">
            <FiClock className="text-gray-400 " /> Static Void: No Operational
            Footprints Found
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-300/60 dark:border-white/5 bg-white dark:bg-neutral-900/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-white/5 border-b border-gray-300 dark:border-white/10">
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Identity Alias
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Network Endpoint
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Applied Vector
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Handshake State
                </th>
                {currentUser?.status === "rejected" && (
                  <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300 text-center">
                    Diagnostics
                  </th>
                )}
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300 text-center">
                  Retract
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/5">
              <tr className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors duration-200">
                {/* Full Name */}
                <td className="p-4 text-sm font-bold text-slate-950 dark:text-gray-200 whitespace-nowrap">
                  {currentUser?.fullName}
                </td>

                {/* Email */}
                <td className="p-4 text-sm font-semibold text-slate-800 dark:text-gray-400 whitespace-nowrap">
                  {currentUser?.email}
                </td>

                {/* Target Role Tag */}
                <td className="p-4 text-xs font-extrabold uppercase tracking-widest text-secondary whitespace-nowrap">
                  [{currentUser?.role || "trainer"}]
                </td>

                {/* Highly Dynamic Status Badge System */}
                <td className="p-4 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 rounded-md border ${
                      currentUser?.status === "accepted"
                        ? "bg-green-500/10 border-green-500/20 text-green-500"
                        : currentUser?.status === "rejected"
                          ? "bg-red-500/10 border-red-500/20 text-red-500"
                          : "bg-amber-500/10 border-amber-500/20 text-amber-500 animate-pulse"
                    }`}
                  >
                    {currentUser?.status || "pending"}
                  </span>
                </td>

                {/* Inspect Feedback Cell Link */}
                {currentUser?.status === "rejected" && (
                  <td className="p-4 text-center">
                    <button
                      onClick={handleOpen}
                      className="p-2 bg-slate-100 dark:bg-white/5 hover:bg-primary/10 text-gray-700 dark:text-gray-400 hover:text-primary border border-gray-300 dark:border-white/10 rounded-lg transition-all text-lg cursor-pointer inline-flex items-center justify-center"
                      title="Read Rejection Diagnostic Logs"
                    >
                      <FiEye />
                    </button>
                  </td>
                )}

                {/* Retract Entry Controls */}
                <td className="p-4 text-center">
                  <button
                    onClick={handleDelete}
                    className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-lg transition-all text-base cursor-pointer inline-flex items-center justify-center"
                    title="Retract Pipeline Application"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Premium Dark-Consistent Dialog Manifestation Module */}
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-white dark:bg-[#12131a] border border-gray-300 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden focus:outline-none"
        size="sm"
      >
        <DialogHeader className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 p-4 text-slate-950 dark:text-white font-black text-base uppercase tracking-tight">
          <span className="flex items-center gap-2">
            <FiInfo className="text-red-500" /> Infrastructure Feedback
          </span>
          <button
            onClick={handleOpen}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <FiX className="text-xl" />
          </button>
        </DialogHeader>

        <DialogBody className="p-6 text-sm font-semibold text-slate-700 dark:text-gray-400 leading-relaxed">
          {rejectedUser?.feedback ? (
            rejectedUser.feedback
          ) : (
            <span className="text-xs italic text-gray-400 dark:text-gray-500">
              No textual diagnostic payload provided by the root administrator.
            </span>
          )}
        </DialogBody>

        <DialogFooter className="p-4 border-t border-gray-200 dark:border-white/5 flex items-center justify-end">
          <button
            onClick={handleOpen}
            className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-primary to-secondary hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-primary/10"
          >
            Acknowledge Blueprint
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ActivityLog;
