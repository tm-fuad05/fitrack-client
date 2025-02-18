import React from "react";
import { FiArrowRight } from "react-icons/fi";
const Button = ({ textColor, hoverText, text, dark }) => {
  return (
    <button
      className={`capitalize flex justify-center items-center gap-3 py-2 px-4 font-medium  bg-transparent rounded-full text-${textColor} dark:text-${dark} hover:translate-x-2 duration-300 border  hover:bg-gradient-to-l hover:from-secondary hover:to-primary group  hover:text-white`}
    >
      {text}
      <FiArrowRight className="text-3xl text-white p-1 rounded-full bg-gradient-to-r from-primary to-secondary group-hover:translate-x-2  group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white group-hover:text-secondary  duration-300" />
    </button>
  );
};

export default Button;
