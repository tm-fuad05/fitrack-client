import React from "react";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { googleSignIn, setUser } = useAuth();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        alert("Signed in");
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="flex justify-between gap-2 mx-auto">
      <button onClick={handleGoogleSignIn} className="btn bg-white w-full">
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
