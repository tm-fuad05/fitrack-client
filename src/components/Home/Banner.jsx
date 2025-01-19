import React from "react";
import hero from "../../assets/hero.png";

import { Link } from "react-router-dom";
import Button from "../Shared/Button";
const Banner = () => {
  return (
    <div
      className="bg-cover max-sm:bg-center min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${hero})`,
        clipPath: "polygon(0 0, 100% 0, 100% 92%, 50% 100%, 0 92%)",
      }}
    >
      <div className="font-oxanium w-11/12 mx-auto text-white flex flex-col gap-3 text-center md:text-start">
        <h4 className=" font-semibold text-md lg:text-xl  capitalize tracking-[7px] lg:tracking-[15px]  p-2 w-fit mx-auto bg-gradient-to-r from-primary to-secondary  rounded-bl-2xl rounded-tr-2xl  md:mx-0">
          welcome to FitRack
        </h4>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold lg:w-9/12 ">
          UNLEASH YOUR POTENTIAL, TRANSFORM YOUR LIFESTYLE
        </h1>
        <p className="text-md lg:text-lg ">
          Where Your Journey to Wellness Begins!
        </p>
        <div className="mt-3">
          <Link to={"/all-classes"}>
            <Button textColor={"white"} text={"go to classes page"}></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
