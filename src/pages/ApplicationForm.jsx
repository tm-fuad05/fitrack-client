/* eslint-disable react/prop-types */
import {
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiHash,
  FiImage,
  FiMail,
  FiUploadCloud,
  FiUser,
} from "react-icons/fi";
import Select from "react-select";

export default function ApplicationFrom({
  handleSubmit,
  changeInputHandler,
  formData,
  preview,
  setError,
  customSelectStyles,
  skillsOptions,
  handleImageChange,
  setFormData,
  daysOptions,
  error,
}) {
  const nameError = error?.find((err) => err.field === "fullName");
  const emailError = error?.find((err) => err.field === "email");
  const ageError = error?.find((err) => err.field === "age");
  const imageError = error?.find((err) => err.field === "profileImage");
  const experienceError = error?.find(
    (err) => err.field === "yearsOfExperience",
  );
  const skillError = error?.find((err) => err.field === "skills");
  const daysError = error?.find((err) => err.field === "availableDays");
  const timeError = error?.find((err) => err.field === "availableTime");

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      {/* Two Column Grid Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name Input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
            <FiUser className="text-primary" /> Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            className="w-full bg-slate-50 dark:bg-transparent text-surface-dark dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-semibold transition-all outline-none"
            value={formData.fullName}
            onChange={changeInputHandler}
          />
          {nameError && (
            <p className="text-xs text-red-500 pl-1">{nameError.message}</p>
          )}
        </div>

        {/* Read-Only Email Input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
            <FiMail className="text-gray-400" /> Email
          </label>
          <input
            name="email"
            className="w-full bg-slate-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-slate-400 dark:text-gray-800 rounded-xl px-4 py-2.5 text-sm font-mono cursor-not-allowed outline-none"
            value={formData.email}
            onChange={changeInputHandler}
            readOnly
          />
          {emailError && (
            <p className="text-xs text-red-500 pl-1">{emailError.message}</p>
          )}
        </div>

        {/* Age Input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
            <FiHash className="text-primary" /> Age
          </label>
          <input
            type="number"
            name="age"
            placeholder="Years"
            className="w-full bg-slate-50 dark:bg-transparent text-surface-dark dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-semibold transition-all outline-none"
            value={formData.age}
            onChange={changeInputHandler}
          />
          {ageError && (
            <p className="text-xs text-red-500 pl-1">{ageError.message}</p>
          )}
        </div>

        {/* Experience Metric */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
            <FiBriefcase className="text-primary" /> Years of Experience
          </label>
          <input
            type="number"
            name="yearsOfExperience"
            placeholder="e.g., 3 Years"
            className="w-full bg-slate-50 dark:bg-transparent text-surface-dark dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-semibold transition-all outline-none"
            value={formData.yearsOfExperience}
            onChange={changeInputHandler}
          />
          {experienceError && (
            <p className="text-xs text-red-500 pl-1">
              {experienceError.message}
            </p>
          )}
        </div>

        {/* Profile Image File Upload UI (Avatar Preview + Button) */}
        <div className="col-span-1 md:col-span-2 space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
            <FiImage className="text-primary" />
            Profile Photo
          </label>
          <div className="flex items-center gap-5 p-3.5 bg-slate-50 dark:bg-white/[0.02] border border-gray-300/60 dark:border-white/10 rounded-xl">
            {/* Circular Avatar Preview */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-200 dark:bg-white/5 border-2 border-primary/30 flex items-center justify-center shrink-0 shadow-inner">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiUser className="w-7 h-7 text-slate-400 dark:text-gray-500" />
              )}
            </div>

            {/* Upload Trigger Button & Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-3">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-surface-dark dark:text-white truncate max-w-[200px] sm:max-w-xs">
                  {formData?.profileImage
                    ? formData?.profileImage?.name
                    : "Upload Trainer Avatar"}
                </p>
                <p className="text-[10px] font-mono text-slate-400 dark:text-gray-500">
                  PNG, JPG or WEBP (MAX. 5MB)
                </p>
              </div>

              <label className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-white/5 hover:bg-primary hover:text-white dark:hover:bg-primary text-surface-dark dark:text-gray-200 border border-gray-300/80 dark:border-white/10 hover:border-primary rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-all shrink-0 shadow-xs">
                <FiUploadCloud className="text-sm text-primary group-hover:text-white transition-colors" />
                <span>{preview ? "Change Photo" : "Browse File"}</span>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {imageError && (
            <p className="text-xs text-red-500 pl-1">{imageError.message}</p>
          )}
          {/* )} */}
        </div>

        {/* Advanced Multi-Select Matrix Modules */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Skills Selector */}
          <div className="space-y-1.5" data-lenis-prevent>
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400">
              Skill-Set Class Matrix
            </label>
            <Select
              isMulti
              name="skills"
              options={skillsOptions}
              styles={customSelectStyles}
              placeholder="Select technical matrix components..."
              onChange={(selected) => {
                if (skillError)
                  setError((prev) => [...prev, (skillError.message = "")]);

                setFormData({
                  ...formData,
                  skills: selected ? selected?.map((s) => s.value) : [],
                });
              }}
            />
            {skillError && (
              <p className="text-xs text-red-500 pl-1">{skillError.message}</p>
            )}
          </div>

          {/* Day Availability Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400">
              Weekly Node Availability
            </label>
            <Select
              isMulti
              name="availableDays"
              options={daysOptions}
              styles={customSelectStyles}
              placeholder="Select core active days..."
              onChange={(selected) => {
                if (daysError)
                  setError((prev) => [...prev, (daysError.message = "")]);

                setFormData({
                  ...formData,
                  availableDays: selected ? selected?.map((d) => d.value) : [],
                });
              }}
            />
            {daysError && (
              <p className="text-xs text-red-500 pl-1">{daysError.message}</p>
            )}
          </div>
        </div>

        {/* Time Frame Scope */}
        <div className="col-span-1 md:col-span-2 space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-gray-800 dark:text-gray-400 flex items-center gap-1.5">
            <FiClock className="text-primary" /> Daily Schedule Span
          </label>
          <input
            type="text"
            name="availableTime"
            placeholder="e.g., 09:00 AM - 05:00 PM"
            className="w-full bg-slate-50 dark:bg-transparent text-surface-dark dark:text-white border border-gray-300/60 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm font-mono transition-all outline-none"
            value={formData.availableTime}
            onChange={changeInputHandler}
          />
          {timeError && (
            <p className="text-xs text-red-500 pl-1">{timeError.message}</p>
          )}
        </div>
      </div>

      {/* Action Form Dispatch Anchor */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/10 hover:opacity-95 active:scale-99 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <FiCheckCircle className="text-sm" /> Dispatch Registry Payload
        </button>
      </div>
    </form>
  );
}
