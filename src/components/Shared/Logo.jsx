import React from "react";
import fitrack from "../../assets/fitrack.png";
const Logo = () => {
  return (
    <a href="/">
      <div className="flex items-center gap-1">
        <img className="w-10 md:w-16" src={fitrack} alt="logo" />
        <h2
          className={
            "font-bold text-xl md:text-2xl lg:text-3xl italic text-white"
          }
        >
          Fit<span className="text-primary">Rack</span>
        </h2>
      </div>
    </a>
  );
};

export default Logo;
