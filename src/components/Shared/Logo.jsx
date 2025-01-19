import React from "react";
import fitrack from "../../assets/fitrack.png";
const Logo = () => {
  return (
    <a href="/">
      <div className="flex items-center gap-1">
        <img className="w-16" src={fitrack} alt="logo" />
        <h2 className="font-bold text-2xl lg:text-3xl mt-2 italic">
          Fit<span className="text-red-600">Rack</span>
        </h2>
      </div>
    </a>
  );
};

export default Logo;
