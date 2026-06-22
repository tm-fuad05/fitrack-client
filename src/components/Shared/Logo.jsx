import React from "react";
import fitrack from "../../assets/fitrack.png";
const Logo = ({ scrolled = {} }) => {
  return (
    <a href="/">
      <div className="flex items-center gap-2">
        <img className="w-10 md:w-12" src={fitrack} alt="logo" />
        <h2
          className={`${!scrolled && "text-white dark:text-white"} font-bold text-xl md:text-2xl italic text-black dark:text-foreground-dark`}
        >
          Fit<span className="text-primary">Rack</span>
        </h2>
      </div>
    </a>
  );
};

export default Logo;
