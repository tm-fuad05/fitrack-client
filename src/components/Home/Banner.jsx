import React from "react";
import hero from "../../assets/hero.png";
import { Link } from "react-router-dom";
import Button from "../Shared/Button";
import { motion } from "framer-motion";

const Banner = () => {
  // Variants for the character-by-character typing animation
  const typingContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const typingLetter = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1 },
    },
  };

  const welcomeText = "welcome to FitRack";

  return (
    <div
      className="relative bg-cover bg-center lg:bg-top min-h-screen flex justify-center items-center mb-16 overflow-hidden"
      style={{
        backgroundImage: `url(${hero})`,
        clipPath: "polygon(0 0, 100% 0, 100% 94%, 50% 100%, 0 94%)",
      }}
    >
      <div className="relative z-10 font-oxanium w-11/12 mx-auto text-white flex flex-col items-center md:items-start gap-4 text-center md:text-start">
        {/* Sub-heading: Smooth typing animation with a glassmorphism background */}
        <motion.div
          variants={typingContainer}
          initial="hidden"
          animate="visible"
          className="font-semibold text-xs lg:text-sm uppercase tracking-[6px] lg:tracking-[12px] p-3 px-5 w-fit mx-auto md:mx-0 rounded-bl-xl rounded-tr-xl border border-white/10 shadow-lg backdrop-blur-md bg-gradient-to-r from-primary to-secondary/30"
        >
          {welcomeText.split("").map((char, index) => (
            <motion.span key={index} variants={typingLetter}>
              {char}
            </motion.span>
          ))}
          {/* Blinking cursor effect */}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-[2px] h-3 ml-1 bg-secondary align-middle"
          />
        </motion.div>

        {/* Main Heading: Reveal with premium text gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold lg:w-10/12 leading-tight tracking-wide"
        >
          UNLEASH YOUR{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            POTENTIAL
          </span>
          , TRANSFORM YOUR LIFESTYLE
        </motion.h1>

        {/* Description Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-sm lg:text-lg text-gray-300 font-light max-w-xl tracking-wider"
        >
          Where Your Journey to Wellness Begins!
        </motion.p>

        {/* Call To Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1, ease: "backOut" }}
          className="mt-4"
        >
          <Link to={"/all-classes"}>
            <Button textColor={"white"} text={"go to classes page"}></Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
