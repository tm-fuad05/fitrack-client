import React, { useState } from "react";
// Pic import
import authbg from "../../assets/authbg.jpg";
import gymbg from "../../assets/gymbg.jpg";

// Icons
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import SocialLogin from "../../components/Shared/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const { signInUser, setUser, user } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    try {
      const result = await signInUser(email, password);
      toast.success("Successfully signed in");
      setUser(result.user);
      navigate(location?.state || "/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password. Try again!");
    }
  };

  if (user) {
    return <Navigate to={location.state ? location.state : "/"} />;
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center relative px-4 py-8 antialiased"
      style={{ backgroundImage: `url(${gymbg})` }}
    >
      {/* Background Dimmer Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-5xl flex flex-row-reverse rounded-3xl overflow-hidden shadow-2xl relative z-10 bg-white/90 dark:bg-surface-dark backdrop-blur-xl">
        {/* Right Side Image Banner (Desktop Only) */}
        <div className="w-1/2 hidden lg:block relative">
          <img
            className="w-full h-full object-cover"
            src={authbg}
            alt="Authentication Visual"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <h3 className="text-2xl font-black tracking-wide uppercase">
              Forge Your Potential
            </h3>
            <p className="text-xs font-semibold text-gray-300 mt-2 leading-relaxed">
              Unlock professional tools, metrics configurations, and elite
              community distribution networks.
            </p>
          </div>
        </div>

        {/* Left Side Form Terminal */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-10 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Subtle Ambient Decorative Orb */}
          <div className="absolute top-[-20%] right-[-20%] w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Branding Panel */}
          <div className="flex flex-col gap-1.5 mb-8">
            <h2 className="font-black text-2xl lg:text-3xl tracking-tight text-slate-950 dark:text-white uppercase flex items-center gap-2">
              <FiLogIn className="text-primary" /> Login to Fit
              <span className="text-secondary">Rack</span>
            </h2>
          </div>

          {/* Interactive Form System */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field Panel */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-extrabold text-gray-800 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5"
              >
                <FiMail className="text-primary" /> Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@example.com"
                  className="w-full rounded-xl pl-4 pr-4 py-3.5 border border-gray-400 dark:border-white/10 bg-white dark:bg-white/5 text-slate-950 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 font-semibold text-sm transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Password Field Panel */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-extrabold text-gray-800 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5"
              >
                <FiLock className="text-secondary" /> Security Password
              </label>
              <div className="relative">
                <input
                  type={isEyeOpen ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl pl-4 pr-12 py-3.5 border border-gray-400 dark:border-white/10 bg-white dark:bg-white/5 text-slate-950 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 font-semibold text-sm transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsEyeOpen(!isEyeOpen)}
                  className="absolute top-1/2 -translate-y-1/2 right-4 text-xl text-gray-500 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {isEyeOpen ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>

              {/* Dynamic Error Logs */}
              {error && (
                <p className="text-xs font-bold text-red-500 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20 mt-2">
                  {error}
                </p>
              )}
            </div>

            {/* Submit Control Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-black text-sm tracking-wide text-white bg-gradient-to-r from-primary to-secondary hover:opacity-95 shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Authenticate & Enter Dashboard
              </button>
            </div>
          </form>

          {/* Alternative Providers Pipeline */}
          <div className="mt-6">
            <div className="relative mb-5 text-center flex items-center">
              <div className="grow h-px bg-gray-400 dark:bg-gray-500" />
              <p className="relative lg:bg-transparent px-3 text-[11px] font-black uppercase text-gray-500 tracking-widest">
                Or Gateway Integration
              </p>
              <div className="grow h-px bg-gray-400 dark:bg-gray-500" />
            </div>
            <SocialLogin />
          </div>

          {/* Footer Navigation Redirection */}
          <div className="mt-8 text-center border-t border-gray-300/50 dark:border-white/5 pt-4">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              New to this platform?{" "}
              <Link
                className="font-extrabold text-secondary hover:underline ml-1"
                to="/register"
              >
                Register Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
