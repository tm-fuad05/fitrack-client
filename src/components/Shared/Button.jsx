import React from "react";
import { FiArrowRight } from "react-icons/fi";
const Button = ({ textColor, hoverText, text }) => {
  return (
    <button
      className={`capitalize btn bg-transparent rounded-full text-${textColor} hover:bg-gradient-to-l hover:from-secondary hover:to-primary group  hover:text-${hoverText}`}
    >
      {text}
      <FiArrowRight className="text-3xl p-1 rounded-full bg-gradient-to-r from-primary to-secondary group-hover:translate-x-2  group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white group-hover:text-secondary  duration-300" />
    </button>
  );
};

export default Button;
