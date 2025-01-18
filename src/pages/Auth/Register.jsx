import React, { useState } from "react";
// Pic import
import authbg from "../../assets/authbg.jpg";
import gymbg from "../../assets/gymbg.jpg";

// Icons

import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import SocialLogin from "../../components/Shared/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const { registerUser, updateUserProfile, signOutUser, user } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    setError("");
    const strongPass =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

    if (!strongPass.test(password)) {
      setError("Your password is not enough strong.Try again!");
      return;
    }

    registerUser(email, password)
      .then(() => {
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            toast.success("Successfully registered");
            signOutUser();
            navigate("/login");
          })
          .catch(() => alert("Something went wrong!"));
      })
      .catch((error) => setError(error));
  };
  if (user) {
    return <Navigate to={location.state ? location.state : "/"} />;
  }

  return (
    <div
      className="flex min-h-screen items-center bg-cover "
      style={{ backgroundImage: `url(${gymbg})` }}
    >
      <div className="lg:w-8/12 mx-auto flex lg:h-[600px] justify-center rounded-xl bg-cover my-20">
        <img
          className="w-1/2 h-full object-cover rounded-l-xl hidden lg:block"
          src={authbg}
          alt=""
        />
        <div className="w-1/2 flex flex-col px-6 py-7 lg:py-0 justify-center lg:rounded-r-xl bg-gray-100 flex-grow">
          {/* <h3 className="font-bold text-lg lg:text-xl text-center mt-5">
            Welcome!
          </h3> */}
          {/* Content */}
          <div className="flex flex-col gap-2 mb-4">
            <h2 className="font-bold text-2xl lg:text-3xl mt-2">
              Register to Fit<span className="text-orange-600">Rack</span>
            </h2>
          </div>
          <form onSubmit={handleRegister} className="space-y-2">
            {/* Name */}
            <div>
              <label htmlFor="password" className="text-[15px] font-[400]">
                Name
              </label>
              <input
                type="name"
                name="name"
                id="name"
                placeholder="Name "
                className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-4 py-3 w-full focus:border-red-600 transition-colors duration-300"
              />
            </div>
            {/* Photo */}
            <div>
              <label htmlFor="password" className="text-[15px] font-[400]">
                Your Photo
              </label>
              <input
                type="photo"
                name="photo"
                id="photo"
                placeholder="Photo URL"
                className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-4 py-3 w-full focus:border-red-600 transition-colors duration-300"
              />
            </div>
            {/* email */}
            <div>
              <label htmlFor="password" className="text-[15px] font-[400]">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email "
                className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-4 py-3 w-full focus:border-red-600 transition-colors duration-300"
              />
            </div>
            {/* password */}
            <div>
              <label htmlFor="password" className="text-[15px] font-[400]">
                Password
              </label>
              <div className="w-full relative">
                <input
                  type={isEyeOpen ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-red-600 transition-colors duration-300 mb-2"
                />
                {isEyeOpen ? (
                  <IoEyeOutline
                    className=" absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                    onClick={() => setIsEyeOpen(false)}
                  />
                ) : (
                  <IoEyeOffOutline
                    className=" absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                    onClick={() => setIsEyeOpen(true)}
                  />
                )}
                {/* Error Handling */}
                {error && <p className="text-xs text-red-500 mb-1">{error}</p>}
              </div>
            </div>

            {/* button */}
            <button className="bg-gradient-to-r from-[#e13a3b] to-[#e96d4c] btn w-full text-white hover:bg-gradient-to-r hover:from-[#e96d4c] hover:to-[#e13a3b]">
              Register
            </button>
          </form>
          <div className="mt-2">
            <SocialLogin></SocialLogin>
          </div>
          <div className="mt-3 text-center">
            <p>
              Already have an account?{" "}
              <Link className="hover:underline text-orange-600" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
