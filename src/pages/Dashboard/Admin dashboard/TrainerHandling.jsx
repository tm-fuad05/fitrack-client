import React from "react";
import useUser from "../../../hooks/useUser";
import Back from "../../../components/Shared/Back";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { FiShield, FiMail, FiUserMinus, FiAward } from "react-icons/fi";

const TrainerHandling = () => {
  const { users, refetch } = useUser();
  const axiosSecure = useAxiosSecure();
  const trainers = users?.filter((u) => u.role === "trainer") || [];

  const handleRemoveTrainerRole = async (trainer) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Downgrade ${trainer.name} back to a regular member status?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary, #ff5200)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Demote Role",
    });

    if (!result.isConfirmed) return;

    try {
      const { data } = await axiosSecure.patch(
        `/users/make-member/${trainer._id}`,
      );
      if (data.success) {
        refetch();
        Swal.fire({
          title: "Role Revoked",
          text: `${trainer.name} has been successfully reverted to a member.`,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Failed to remove trainer role", error);
      Swal.fire(
        "Error",
        "Could not complete the role downgrade pipeline.",
        "error",
      );
    }
  };

  return (
    <div className="space-y-6 antialiased">
      <Helmet>
        <title>FitRack | Trainer Management</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <Back />
      </div>

      {/* Premium Analytics Metric & Header Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-transparent border border-gray-300/60 dark:border-white/10 backdrop-blur-md shadow-sm relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black tracking-tight text-surface-dark dark:text-white uppercase flex items-center gap-2">
              <FiShield className="text-primary" /> Active Instructors
            </h1>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
              Manage core trainer authorization profiles and active access level
              directories.
            </p>
          </div>

          {/* Total Counter Badge */}
          <div className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 flex items-center gap-3 w-fit">
            <span className="text-xs font-extrabold uppercase tracking-wider text-gray-600 dark:text-gray-400">
              Active Roster
            </span>
            <span className="text-2xl font-black text-surface-dark dark:text-white tracking-tight">
              {trainers.length}
            </span>
          </div>
        </div>
      </div>

      {/* Industrial Grade Ledger Table Module */}
      {trainers.length === 0 ? (
        <div className="py-16 text-center rounded-xl border-2 border-dashed border-gray-300 dark:border-white/10">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wide uppercase">
            No active trainers indexed in infrastructure
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-300/60 dark:border-white/5 bg-white dark:bg-transparent">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white dark:bg-white/5 border-b border-gray-300 dark:border-white/10">
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Trainer Name
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <FiMail className="text-primary" /> Email Coordinates
                  </span>
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <FiAward /> Authority Context
                  </span>
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300 text-center">
                  Action Auth
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/5">
              {trainers.map((trainer) => (
                <tr
                  key={trainer._id}
                  className="group bg-gray-50 dark:bg-transparent dark:hover:bg-white/5 transition-colors duration-200"
                >
                  {/* Name */}
                  <td className="p-4 text-sm font-bold text-surface-dark dark:text-gray-200 whitespace-nowrap">
                    {trainer.name}
                  </td>

                  {/* Email */}
                  <td className="p-4 text-sm font-semibold text-slate-800 dark:text-gray-400 whitespace-nowrap">
                    {trainer.email}
                  </td>

                  {/* Role Badge */}
                  <td className="p-4 text-xs font-extrabold uppercase tracking-wider text-primary whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20">
                      {trainer.role}
                    </span>
                  </td>

                  {/* Action Drop Control */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleRemoveTrainerRole(trainer)}
                      className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-lg transition-all text-lg cursor-pointer inline-flex items-center justify-center"
                      title="Revoke Instructor Privileges"
                    >
                      <FiUserMinus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrainerHandling;
