import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const Back = () => {
  const navigate = useNavigate();

  const handleGoToPreviousPage = () => {
    navigate(-1);
  };
  return (
    <div>
      <button
        onClick={handleGoToPreviousPage}
        className="bg-gradient-to-r from-primary to-secondary hover:bg-opacity-50 px-5 py-3 text-white font-semibold flex items-center gap-3"
      >
        <FaArrowLeft /> Back
      </button>
    </div>
  );
};

export default Back;
