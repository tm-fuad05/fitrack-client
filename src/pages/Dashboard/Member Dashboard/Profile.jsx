import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import Swal from "sweetalert2";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Loader from "../../../components/Shared/Loader";
import {
  FiUser,
  FiMail,
  FiClock,
  FiShield,
  FiSliders,
  FiX,
  FiActivity,
  FiCpu,
} from "react-icons/fi";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const handleOpen = () => setOpen(!open);

  const { user, updateUserProfile } = useAuth();
  const { users, refetch, isLoading } = useUser() || { users: [] };

  const currentUser = users?.find((u) => u.email === user?.email);

  const handleUpdate = async (e) => {
    e.preventDefault();
    handleOpen();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;

    try {
      await updateUserProfile({ displayName: name, photoURL: photo });

      if (currentUser?._id) {
        const { data } = await axiosSecure.patch(`/users/${currentUser._id}`, {
          name,
        });
        if (data.success) {
          refetch();
          Swal.fire({
            title: "Identity Synchronized",
            text: "Core parameters successfully updated.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Pipeline transaction failed.", "error");
    }
  };

  if (isLoading) return <Loader />;

  const lastLogin = user?.metadata?.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  return (
    <div className="space-y-8 antialiased pb-5 max-w-6xl mx-auto px-2 md:px-0">
      <Helmet>
        <title>FitRack | Identity Terminal</title>
      </Helmet>

      {/* Main Structural Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT CARD: Neo-Glow Command Avatar Center */}
        <div className="lg:col-span-5 rounded-[2rem] border border-gray-300/60 dark:border-white/10  bg-gradient-to-b from-white to-white dark:from-transparent dark:to-transparent p-8 flex flex-col items-center justify-between text-center relative overflow-hidden backdrop-blur-xl shadow-2xl">
          {/* Decorative Cyber Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-4 mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
              <FiCpu className="animate-pulse" /> Core_Node_01
            </span>
            <div className="h-2 w-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse" />
          </div>

          {/* Futuristic Glowing Avatar Stack */}
          <div className="relative group my-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-transparent to-secondary rounded-full p-1 animate-spin duration-10000 opacity-70 group-hover:opacity-100" />
            <div className="absolute inset-1 bg-white dark:bg-neutral-950 rounded-full" />
            <img
              src={user?.photoURL || "https://i.ibb.co/vxs71Nf/placeholder.png"}
              alt="Cluster Core"
              className="relative w-36 h-36 rounded-full object-cover p-2 shadow-2xl"
            />
          </div>

          <div className="mt-8 space-y-2 w-full">
            <h3 className="font-black text-2xl text-surface-dark dark:text-white uppercase tracking-tight leading-none">
              {user?.displayName}
            </h3>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary">
              <FiShield className="text-xs" /> Tier:{" "}
              {currentUser?.role || "Standard Client"}
            </div>
          </div>

          {/* Fancy Tech Trigger Button */}
          <button
            onClick={handleOpen}
            className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all duration-500 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <FiSliders className="text-sm" /> Modify Configuration
          </button>
        </div>

        {/* RIGHT CARD: Modular Holographic Specs Blocks */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          {/* Top Decorative Alert Panel */}
          <div className="p-6 rounded-2xl border border-gray-300/60 dark:border-white/10 bg-white dark:bg-transparent flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <FiActivity className="text-xl" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
                System Handshake State
              </p>
              <h4 className="text-sm font-bold text-surface-dark dark:text-gray-200 mt-0.5">
                All local client databases are synchronized with root.
              </h4>
            </div>
          </div>

          {/* 4-Grid Modular Data Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            {/* Box 1: Reference Alias */}
            <div className="p-6 rounded-[1.5rem] border border-gray-300/60 dark:border-white/5 bg-white dark:bg-transparent space-y-3 relative overflow-hidden group hover:border-primary/20 transition-colors duration-300">
              <div className="text-primary/40 group-hover:text-primary text-lg transition-colors">
                <FiUser />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Identity Tag
                </p>
                <p className="text-base font-bold text-surface-dark dark:text-gray-200 mt-1">
                  {user?.displayName}
                </p>
              </div>
            </div>

            {/* Box 2: Mail Coordinates */}
            <div className="p-6 rounded-[1.5rem] border border-gray-300/60 dark:border-white/5 bg-white dark:bg-transparent space-y-3 relative overflow-hidden group hover:border-secondary/20 transition-colors duration-300">
              <div className="text-secondary/40 group-hover:text-secondary text-lg transition-colors">
                <FiMail />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Secure Network Endpoint
                </p>
                <p className="text-sm font-bold text-surface-dark dark:text-gray-200 mt-1 truncate select-all">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Box 3: Database ID Signature */}
            <div className="p-6 rounded-[1.5rem] border border-gray-300/60 dark:border-white/5 bg-white dark:bg-transparent space-y-3 relative overflow-hidden group hover:border-primary/20 transition-colors duration-300">
              <div className="text-primary/40 group-hover:text-primary text-lg transition-colors">
                <FiCpu />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Hex Ledger Signature
                </p>
                <p className="text-sm font-mono font-bold text-surface-dark dark:text-gray-300 mt-1 tracking-wide">
                  {currentUser?._id || "fetching_hash..."}
                </p>
              </div>
            </div>

            {/* Box 4: Last Authorization Log */}
            <div className="p-6 rounded-[1.5rem] border border-gray-300/60 dark:border-white/5 bg-white dark:bg-transparent space-y-3 relative overflow-hidden group hover:border-secondary/20 transition-colors duration-300">
              <div className="text-secondary/40 group-hover:text-secondary text-lg transition-colors">
                <FiClock />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Handshake Time-stamp
                </p>
                <p className="text-xs font-mono font-bold text-surface-dark dark:text-gray-200 mt-1">
                  {lastLogin}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cyberpunk Dynamic Custom Parameter Dialog */}
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-white dark:bg-[#12131a] border border-gray-300 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden focus:outline-none"
        size="sm"
      >
        <DialogHeader className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 p-5 text-surface-dark dark:text-white font-black text-base uppercase tracking-tight">
          <span className="flex items-center gap-2">
            <FiSliders className="text-primary" /> Modify Parameter Payload
          </span>
          <button
            onClick={handleOpen}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <FiX className="text-xl" />
          </button>
        </DialogHeader>

        <DialogBody className="p-6">
          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Core Alias Label
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                className="w-full bg-slate-50 dark:bg-transparent text-surface-dark dark:text-white border border-gray-300 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Avatar Route URL
              </label>
              <input
                type="url"
                name="photo"
                defaultValue={user?.photoURL}
                className="w-full bg-slate-50 dark:bg-transparent text-surface-dark dark:text-white border border-gray-300 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-medium transition-all outline-none"
                required
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-200 dark:border-white/5">
              <button
                type="button"
                onClick={handleOpen}
                className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                Abort
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-primary to-secondary hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-primary/10"
              >
                Execute Sync
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default Profile;
