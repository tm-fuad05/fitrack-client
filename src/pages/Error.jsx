import React from "react";
import error from "../assets/error.jpg";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <img className="w-3/4 lg:w-1/2" src={error} alt="" />
      <Link className="btn bg-red-400 text-white" to={"/"}>
        Back to home
      </Link>
    </div>
  );
};

export default Error;
