import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const Back = () => {
  const navigate = useNavigate();

  const handleGoToPreviousPage = () => {
    navigate(-1);
  };
  return (
    <div className="mb-5">
      <button
        onClick={handleGoToPreviousPage}
        className="bg-gradient-to-r from-primary to-secondary hover:opacity-50 focus:scale-95 rounded-full px-5 py-3 text-white font-semibold flex items-center gap-3"
      >
        <FaArrowLeft /> Back
      </button>
    </div>
  );
};

export default Back;
