import React from "react";

const Coverpage = ({ bg, subtitle, title }) => {
  return (
    <div
      className="bg-cover bg-center lg:bg-top min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="uppercase mx-auto text-center space-y-2 w-10/12 lg:w-7/12">
        <p className="text-primary tracking-[4px] text-md lg:text-xl font-semibold">
          {subtitle}
        </p>
        <h2
          className={`text-3xl text-white md:text-5xl lg:text-6xl font-extrabold leading-7 `}
        >
          {title}
        </h2>
      </div>
    </div>
  );
};

export default Coverpage;
