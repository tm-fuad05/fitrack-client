import React from "react";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";
import Back from "../../../components/Shared/Back";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Loader from "../../../components/Shared/Loader";
import {
  FiUsers,
  FiMail,
  FiShield,
  FiTrash2,
  FiUserCheck,
} from "react-icons/fi";

const ManageUsers = () => {
  const { users, refetch, isLoading } = useUser() || { users: [] };
  const axiosSecure = useAxiosSecure();

  const handleDelete = async (user) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Permanently purge ${user.name} from the core system ledger?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "var(--color-primary, #ff5200)",
      confirmButtonText: "Purge User",
    });

    if (!result.isConfirmed) return;
    try {
      const { data } = await axiosSecure.delete(`/users/${user._id}`);
      if (data.success) {
        refetch();
        Swal.fire({
          title: "User Purged",
          text: `${user.name} has been erased from infrastructure records.`,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Failed to delete user", error);
      Swal.fire(
        "Error",
        "Pipeline interruption during termination process.",
        "error",
      );
    }
  };

  const handleRole = async (user) => {
    const result = await Swal.fire({
      title: "Elevate to Admin?",
      text: `Grant full administrative root privileges to ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary, #ff5200)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Elevate Privileges",
    });

    if (!result.isConfirmed) return;
    try {
      const { data } = await axiosSecure.patch(`/users/make-admin/${user._id}`);
      if (data.success) {
        refetch();
        Swal.fire({
          title: "Privileges Elevated",
          text: `${user.name} is now registered under the Admin tier.`,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Failed to promote", error);
      Swal.fire(
        "Error",
        "Authorization update failed on backend pipeline.",
        "error",
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 antialiased pb-10">
      <Helmet>
        <title>FitRack | Manage Users Matrix</title>
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
              <FiUsers className="text-primary" /> Identity Control Center
            </h1>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
              Inspect, authorize, or revoke operational profiles across
              structural user node layers.
            </p>
          </div>

          <div className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 flex items-center gap-3 w-fit">
            <span className="text-xs font-extrabold uppercase tracking-wider text-gray-600 dark:text-gray-400">
              Indexed Nodes
            </span>
            <span className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              {users?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Main Ledger Table Component */}
      {!users || users.length === 0 ? (
        <div className="py-16 text-center rounded-xl border-2 border-dashed border-gray-300 dark:border-white/10">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wide uppercase">
            No User Coordinates Linked inside Records
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-300/60 dark:border-white/5 bg-white dark:bg-transparent">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-white/5 border-b border-gray-300 dark:border-white/10">
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Identity Stack
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <FiMail className="text-primary" /> Email Coordinates
                  </span>
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Authority Role
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300 text-center">
                  Promote Admin
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300 text-center">
                  Terminate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/5">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="group bg-gray-50 dark:bg-transparent hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors duration-200"
                >
                  {/* Name */}
                  <td className="p-4 text-sm font-bold text-slate-950 dark:text-gray-200 whitespace-nowrap">
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="p-4 text-sm font-semibold text-slate-800 dark:text-gray-400 whitespace-nowrap">
                    {user.email}
                  </td>

                  {/* Role Badge Status */}
                  <td className="p-4 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-md border ${
                        user.role === "admin"
                          ? "bg-green-500/10 border-green-500/20 text-green-500"
                          : user.role === "trainer"
                            ? "bg-red-500/10 border-red-500/20 text-red-500"
                            : "bg-slate-500/10 border-slate-500/20 text-slate-600 dark:text-gray-400"
                      }`}
                    >
                      {user.role || "member"}
                    </span>
                  </td>

                  {/* Promote Admin System Action */}
                  <td className="p-4 text-center">
                    {user.role === "admin" ? (
                      <span className="p-2 text-green-500 bg-green-500/5 border border-green-500/10 rounded-lg text-sm font-bold inline-flex items-center gap-1 opacity-70">
                        <FiUserCheck /> Rooted
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRole(user)}
                        className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white border border-green-500/20 rounded-lg transition-all text-base cursor-pointer inline-flex items-center justify-center"
                        title="Elevate Node to Root Admin"
                      >
                        <FiShield />
                      </button>
                    )}
                  </td>

                  {/* Termination Controls */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(user)}
                      className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-lg transition-all text-base cursor-pointer inline-flex items-center justify-center"
                      title="Purge Identity Stack"
                    >
                      <FiTrash2 />
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

export default ManageUsers;
