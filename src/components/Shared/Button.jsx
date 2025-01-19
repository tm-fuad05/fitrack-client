import React from "react";
import { FiArrowRight } from "react-icons/fi";
const Button = ({ textColor, hoverText }) => {
  return (
    <button
      className={`capitalize btn bg-transparent rounded-full text-${textColor} hover:bg-gradient-to-l hover:from-secondary hover:to-primary group  hover:text-${hoverText}`}
    >
      go to classes page
      <FiArrowRight className="text-3xl p-1 rounded-full bg-gradient-to-r from-primary to-secondary group-hover:translate-x-2 duration-300" />
    </button>
  );
};

export default Button;
