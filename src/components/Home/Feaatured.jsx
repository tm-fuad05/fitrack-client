import React from "react";
import SectionTitle from "../Shared/SectionTitle";
import { TbTreadmill } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";
import { FaDumbbell } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Feaatured = () => {
  const cards = [
    {
      name: "Personal Training",
      description:
        "Achieve personalized fitness goals with our expert trainers guiding you every step of the way.",
      icons: <TbTreadmill />,
    },
    {
      name: "Group Classes",
      description:
        "Join dynamic group classes that combine fun and fitness, fostering a sense of community.",
      icons: <FaPeopleGroup />,
    },
    {
      name: "Nutrition Guidance",
      description:
        "Fuel your body right with customized nutrition plans to complement your fitness routine.",
      icons: <LuNotebookPen />,
    },
    {
      name: "State-of-the-Art Equipment",
      description:
        "Unleash your potential with our cutting-edge gym equipment, crafted for a state-of-the-art fitness experience.",
      icons: <FaDumbbell />,
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <SectionTitle
        title={"Transform Your Health and Elevate Your Fitness Journey"}
        subtitle={"our services"}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-10/12 mx-auto mt-10">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col lg:flex-row gap-6 border border-secondary p-10 group hover:bg-gradient-to-t hover:from-secondary hover:to-primary transition-all duration-300"
          >
            <div className="p-4 text-5xl text-secondary rounded-full border border-secondary w-fit h-fit group-hover:bg-white duration-300">
              {card.icons}
            </div>
            <div className="flex flex-col gap-2 group-hover:text-white duration-300">
              <h3 className="uppercase text-xl lg:text-2xl font-bold dark:text-white  flex-grow">
                {card.name}
              </h3>
              <p className="font-poppins text-md lg:text-lg text-gray-500 group-hover:text-white dark:text-gray-400 font-light duration-300  ">
                {card.description}
              </p>
              <div>
                <Link to={"/all-classes"}>
                  <button
                    className={`mt-2 capitalize flex justify-center items-center gap-3 py-2 px-4 font-medium bg-transparent rounded-full text-black hover:translate-x-2 duration-300  group  group-hover:text-white group-hover:bg-black border border-black dark:group-hover:border-black dark:border-white dark:text-white  `}
                  >
                    read more
                    <FiArrowRight className="text-3xl p-1 rounded-full bg-gradient-to-r from-primary to-secondary group-hover:translate-x-2 duration-300 text-white" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feaatured;
