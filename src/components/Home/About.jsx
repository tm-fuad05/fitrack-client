import React from "react";
import aboutbg from "../../assets/aboutbg.png";
import Button from "../Shared/Button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div
      className="bg-cover min-h-screen py-10 flex items-center"
      style={{ backgroundImage: `url(${aboutbg})` }}
    >
      <div className="w-10/12 mx-auto">
        <div className="uppercase  space-y-3 lg:w-1/2 text-center lg:text-start">
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
          <div className="w-fit mx-auto lg:mx-0">
            <Link to={"about-us"}>
              <Button textColor={"white"} text={"read more"}></Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
