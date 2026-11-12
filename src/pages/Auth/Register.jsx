/* eslint-disable no-useless-escape */
import { useState } from "react";
// Pic import
import authbg from "../../assets/authbg.jpg";
import gymbg from "../../assets/gymbg.jpg";

// Icons
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";
import SocialLogin from "../../components/Shared/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxiosPublic } from "../../hooks/useAxios";
import { signUpSchema } from "../../validation/schema/auth.validation";

const Register = () => {
  const [isEyeOpen, setIsEyeOpen] = useState({
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState([]);

  const { registerUser, updateUserProfile, signOutUser, user } = useAuth();
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const [formData, setFormData] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const changeInputHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value.length > 0 ? value : null,
    }));

    const fieldError = error.find((err) => err.field === name);

    if (fieldError) setError((prev) => [...prev, (fieldError.message = "")]);
  };
  const nameError = error.find((err) => err.field === "name");
  const emailError = error.find((err) => err.field === "email");
  const passwordError = error.find((err) => err.field === "password");
  const confirmPasswordError = error.find(
    (err) => err.field === "confirmPassword",
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError("");

    const { data, error: validationError } = signUpSchema.safeParse(formData);

    if (validationError) {
      return setError(
        validationError?.issues?.map((err) => ({
          field: err?.path[0],
          message: err?.message,
        })),
      );
    }

    try {
      await registerUser(data.email, data.password);
      await updateUserProfile({ displayName: data.name });

      const userInfo = { name: data.name, email: data.email };
      const res = await axiosPublic.post("/users", userInfo);

      if (res.data.success) {
        toast.success("Successfully registered");
      }

      navigate("/login");
      await signOutUser();
    } catch (error) {
      console.error(error);
      setAuthError(error.message || "Something went wrong! Please try again.");
    }
  };

  if (user) {
    return <Navigate to={location?.state || "/login"} />;
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center relative px-4 py-12 antialiased"
      style={{ backgroundImage: `url(${gymbg})` }}
    >
      {/* Background Dimmer Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl relative z-10 bg-white/90 dark:bg-surface-dark backdrop-blur-xl my-10">
        {/* Left Side Image Banner (Desktop Only) */}
        <div className="w-1/2 hidden lg:block relative">
          <img
            className="w-full h-full object-cover"
            src={authbg}
            alt="Authentication Visual"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <h3 className="text-2xl font-black tracking-wide uppercase">
              Join the Movement
            </h3>
            <p className="text-xs font-semibold text-gray-300 mt-2 leading-relaxed">
              Track targeted matrix distribution systems, optimize session
              parameters, and reach industrial-grade performance.
            </p>
          </div>
        </div>

        {/* Right Side Form Terminal */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-10 md:p-12 lg:p-14 relative overflow-hidden">
          {/* Subtle Ambient Decorative Orb */}
          <div className="absolute top-[-20%] left-[-20%] w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Branding Panel */}
          <div className="flex flex-col gap-1.5 mb-6">
            <h2 className="font-black text-2xl lg:text-3xl tracking-tight text-surface-dark dark:text-white uppercase flex items-center gap-2">
              <FiUserPlus className="text-primary" /> Register to Fit
              <span className="text-secondary">Rack</span>
            </h2>
          </div>

          {/* Interactive Form System */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Field Panel */}
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-xs font-extrabold text-gray-800 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5"
              >
                <FiUser className="text-primary" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={changeInputHandler}
                placeholder="John Doe"
                className="w-full rounded-xl pl-4 pr-4 py-3 border border-gray-400 dark:border-white/10 bg-white dark:bg-white/5 text-surface-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 font-semibold text-sm transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
              />
              {nameError && (
                <p className="text-xs text-red-500 pl-1">{nameError.message}</p>
              )}
            </div>

            {/* Email Field Panel */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-xs font-extrabold text-gray-800 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5"
              >
                <FiMail className="text-primary" /> Email Address
              </label>
              <input
                name="email"
                id="email"
                onChange={changeInputHandler}
                placeholder="name@example.com"
                className="w-full rounded-xl pl-4 pr-4 py-3 border border-gray-400 dark:border-white/10 bg-white dark:bg-white/5 text-surface-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 font-semibold text-sm transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
              />
              {emailError && (
                <p className="text-xs text-red-500 pl-1">
                  {emailError.message}
                </p>
              )}
            </div>

            {/* Password Field Panel */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-xs font-extrabold text-gray-800 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5"
              >
                <FiLock className="text-secondary" /> Password
              </label>
              <div className="relative">
                <input
                  type={isEyeOpen.password ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={changeInputHandler}
                  placeholder="••••••••"
                  className="w-full rounded-xl pl-4 pr-12 py-3 border border-gray-400 dark:border-white/10 bg-white dark:bg-white/5 text-surface-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 font-semibold text-sm transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
                />
                <button
                  type="button"
                  onClick={() =>
                    setIsEyeOpen((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }
                  className="absolute top-1/2 -translate-y-1/2 right-4 text-xl text-gray-500 dark:text-gray-400 hover:text-surface-dark dark:hover:text-white transition-colors cursor-pointer"
                >
                  {isEyeOpen.password ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>

              {passwordError && (
                <p className="text-xs text-red-500 pl-1">
                  {passwordError.message}
                </p>
              )}
            </div>
            {/*COnfirm Password Field Panel */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-xs font-extrabold text-gray-800 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5"
              >
                <FiLock className="text-secondary" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={isEyeOpen.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={changeInputHandler}
                  placeholder="••••••••"
                  className="w-full rounded-xl pl-4 pr-12 py-3 border border-gray-400 dark:border-white/10 bg-white dark:bg-white/5 text-surface-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 font-semibold text-sm transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
                />
                <button
                  type="button"
                  onClick={() =>
                    setIsEyeOpen((prev) => ({
                      ...prev,
                      confirmPassword: !prev.confirmPassword,
                    }))
                  }
                  className="absolute top-1/2 -translate-y-1/2 right-4 text-xl text-gray-500 dark:text-gray-400 hover:text-surface-dark dark:hover:text-white transition-colors cursor-pointer"
                >
                  {isEyeOpen.confirmPassword ? (
                    <IoEyeOutline />
                  ) : (
                    <IoEyeOffOutline />
                  )}
                </button>
              </div>

              {confirmPasswordError && (
                <p className="text-xs text-red-500 pl-1">
                  {confirmPasswordError.message}
                </p>
              )}
            </div>

            {/* Submit Control Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-black text-sm tracking-wide text-white bg-gradient-to-r from-primary to-secondary hover:opacity-95 shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Register & Initialize Session
              </button>
            </div>
          </form>

          {/* Alternative Providers Pipeline */}
          <div className="mt-5">
            <div className="relative mb-5 text-center flex items-center">
              <div className="grow h-px bg-gray-400 dark:bg-gray-500" />
              <p className="relative bg-white dark:bg-neutral-900 lg:bg-transparent px-3 text-[11px] font-black uppercase text-gray-500 tracking-widest">
                Or Gateway Integration
              </p>
              <div className="grow h-px bg-gray-400 dark:bg-gray-500" />
            </div>
            <SocialLogin />
          </div>

          {/* Footer Navigation Redirection */}
          <div className="mt-6 text-center border-t border-gray-300/50 dark:border-white/5 pt-3">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                className="font-extrabold text-secondary hover:underline ml-1"
                to="/login"
              >
                Login Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
