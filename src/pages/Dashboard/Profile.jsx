import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { useGetUserByEmail, useUpdateUser } from "../../hooks/useUser";
import { Helmet } from "react-helmet-async";
import Loader from "../../components/Shared/Loader";
import {
  FiUser,
  FiMail,
  FiClock,
  FiShield,
  FiSliders,
  FiX,
  FiActivity,
  FiCpu,
  FiCamera,
} from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";
import { fileSchema } from "../../validation/schema/file.validation";
import { updateProfileSchema } from "../../validation/schema/profile.validation";
import { useUploadImage } from "../../hooks/useUploadImage";
import Swal from "sweetalert2";
const Profile = () => {
  const { user, setUser, updateUserProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState([]);
  console.log(user);
  const [formData, setFromData] = useState({
    name: user?.displayName || undefined,
    profileImage: undefined,
  });
  const [photoPreview, setPhotoPreview] = useState(user?.photoURL);
  const handleOpen = () => {
    setError([]);
    setOpen(!open);
    setFromData((prev) => ({
      ...prev,
      name: user?.displayName || undefined,
      profileImage: undefined,
    }));
    setPhotoPreview(user?.photoURL);
  };

  const { data: currentUser, isPending } = useGetUserByEmail(user?.email);
  console.log(currentUser);
  const updateMutation = useUpdateUser();
  const uploadMutation = useUploadImage();

  const nameError = error?.find((err) => err?.field === "name");
  const imageError = error?.find((err) => err?.field === "profileImage");

  const handleImageChange = (e) => {
    if (imageError) setError([...error, (imageError.message = "")]);
    const file = e?.target?.files?.[0];
    if (!file) return;

    const { data: validatedFile, error: fileError } =
      fileSchema.safeParse(file);

    if (fileError) {
      return setError(
        fileError?.issues?.map((err) => ({
          field: "profileImage",
          message: err?.message,
        })),
      );
    }

    if (photoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(photoPreview);
    }

    setPhotoPreview(URL.createObjectURL(file));
    setFromData({ ...formData, profileImage: validatedFile });
  };

  const changeInputHandler = (e) => {
    const { name, value } = e.target;

    setFromData({ ...formData, [name]: value?.length > 0 ? value : undefined });

    if (nameError) setError([...error, (nameError.message = "")]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError([]);
    handleOpen();
    const { data: validatedData, error: validationError } =
      updateProfileSchema.safeParse(formData);

    if (validationError) {
      return setError(
        validationError?.issues?.map((err) => ({
          field: err?.path?.[0],
          message: err?.message,
        })),
      );
    }

    const { name, profileImage } = validatedData;

    let photoURL = user?.photoURL || "";
    try {
      if (profileImage) {
        const result = await uploadMutation.mutateAsync({
          file: profileImage,
          path: "users",
        });
        photoURL = result?.data;
      }
    } catch (error) {
      console.error(error);
      return;
    }

    const isNameChanged = name !== user?.displayName;
    const isPhotoChanged = user?.photoURL !== photoURL;

    try {
      if (!isNameChanged && !isPhotoChanged) {
        await Swal.fire({
          title: "No changes were made",
          icon: "info",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }

      await updateUserProfile({
        displayName: name,
        photoURL,
      });
      setUser((prev) => ({ ...prev, displayName: name, photoURL }));

      if (name !== currentUser?.name) {
        updateMutation.mutate({ payload: { name }, email: currentUser?.email });
      }

      await Swal.fire({
        title:
          isPhotoChanged && isNameChanged
            ? "Profile updated"
            : isNameChanged
              ? "Name changed"
              : "Photo changed",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Something went wrong",
        icon: "error",
        timer: 1500,
      });
    }
  };

  if (isPending) return <Loader />;

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
            {user?.photoURL ? (
              <img
                src={user?.photoURL}
                alt="Cluster Core"
                className="relative w-36 h-36 rounded-full object-cover object-top p-1 shadow-2xl border-4 border-primary"
              />
            ) : (
              <div className="relative w-36 h-36 rounded-full  p-2 shadow-2xl flex justify-center items-center text-6xl font-bold">
                {user?.displayName[0]}
              </div>
            )}
          </div>

          <div className="mt-8 space-y-2 w-full">
            <h3 className="font-black text-2xl text-surface-dark dark:text-white uppercase tracking-tight leading-none">
              {user?.displayName}
            </h3>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary">
              <FiShield className="text-xs" />
              {currentUser?.role}
            </div>
          </div>

          {/* Fancy Tech Trigger Button */}
          <button
            onClick={handleOpen}
            className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all duration-500 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <FiSliders className="text-sm" /> Update
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
                  Name
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
                  Email
                </p>
                <p className="text-sm font-bold text-surface-dark dark:text-gray-200 mt-1 truncate select-all">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Box 3: Database ID Signature */}
            <div className="p-6 rounded-[1.5rem] border border-gray-300/60 dark:border-white/5 bg-white dark:bg-transparent space-y-3 relative overflow-hidden group hover:border-primary/20 transition-colors duration-300">
              <div className="text-primary/40 group-hover:text-primary text-lg transition-colors">
                <GoShieldCheck />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Email Status
                </p>
                <p className="text-sm font-mono font-bold text-surface-dark dark:text-gray-300 mt-1 tracking-wide">
                  {user?.emailVerified ? "Verified" : "Not Verified"}
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
            <FiSliders className="text-primary" /> Update Profile
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
            {/* Circular Profile Picture Upload & Preview */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <label
                htmlFor="photo-upload"
                className="relative group w-24 h-24 rounded-full border-2 border-dashed border-gray-300 dark:border-white/20 hover:border-primary dark:hover:border-primary overflow-hidden cursor-pointer transition-all shadow-md bg-slate-50 dark:bg-white/5 flex items-center justify-center"
              >
                {photoPreview ? (
                  <img
                    src={photoPreview || user?.photoURL}
                    alt="Profile Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <FiUser className="text-3xl text-gray-400 dark:text-gray-500" />
                )}

                {/* Hover Camera Overlay */}
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiCamera className="text-white text-xl mb-0.5" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white">
                    Change
                  </span>
                </div>

                <input
                  id="photo-upload"
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Profile Photo
              </span>
              {imageError && (
                <p className="text-xs text-red-500">{imageError?.message}</p>
              )}
            </div>

            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData?.name ?? ""}
                onChange={changeInputHandler}
                className="w-full bg-slate-50 dark:bg-transparent text-surface-dark dark:text-white border border-gray-300 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-semibold transition-all outline-none"
              />
              {nameError && (
                <p className="text-xs text-red-500">{nameError?.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center justify-end gap-3 ">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-primary to-secondary hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-primary/10"
              >
                Submit
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default Profile;
