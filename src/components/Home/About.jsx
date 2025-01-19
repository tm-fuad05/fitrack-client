import React from "react";
import aboutbg from "../../assets/aboutbg.png";
import SectionTitle from "../Shared/SectionTitle";
import Button from "../Shared/Button";

const About = () => {
  return (
    <div
      className="bg-cover min-h-screen py-10 flex items-center"
      style={{ backgroundImage: `url(${aboutbg})` }}
    >
      <div className="w-11/12 mx-auto">
        <div className="uppercase  space-y-3 lg:w-7/12 w-1/2">
          <p className="text-primary tracking-[4px] text-md lg:text-lg font-semibold">
            about us
          </p>
          <h2
            className={`text-white text-2xl md:text-3xl lg:text-4xl leading-7 font-extrabold`}
          >
            welcome to fitrack
          </h2>
          <p className="text-white mt-2 text-sm lg:text-md">
            At <strong>FitRack</strong>, we provide fitness resources and expert
            guidance to help you achieve your health goals. We believe in
            empowering you to live a healthier, happier life
          </p>
          <div>
            <Button textColor={"white"} text={"read more"}></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
