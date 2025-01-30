import React from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();

      if (!result.user) alert("Google sign in failed");

      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        role: "member",
      };

      const { data } = await axiosPublic.post("/users", userInfo);
      if (data.insertedId) {
        navigate(location?.state || "/");
      }

      setUser(result.user);
      toast.success("Successfully signed in");
      navigate(location?.state || "/");
    } catch (error) {
      console.error("Google sign-in error", error);
      alert(error);
    }
  };

  return (
    <div className="flex justify-between gap-2 mx-auto">
      <button
        onClick={handleGoogleSignIn}
        className="py-3 rounded-md bg-white w-full flex justify-center gap-2 hover:bg-gray-200 font-medium"
      >
        <img
          src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
          alt="google logo"
          className="w-[23px]"
        />
        Sign in with
      </button>
    </div>
  );
};

export default SocialLogin;
