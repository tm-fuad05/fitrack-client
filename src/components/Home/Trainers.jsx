import React from "react";
import SectionTitle from "../Shared/SectionTitle";
import { motion } from "framer-motion";

const Trainers = () => {
  const trainers = [
    {
      id: 1,
      name: "Dr. Ayesha Rahman",
      bio: "Dr. Ayesha Rahman is a seasoned educator with over 5 years of experience in academic counseling and leadership training. She has worked with various educational institutions to design effective learning modules and mentoring systems.",
      expertise: [
        "Leadership Development",
        "Academic Counseling",
        "Soft Skills Training",
      ],
      photo:
        "https://media.istockphoto.com/id/856797530/photo/portrait-of-a-beautiful-woman-at-the-gym.jpg?s=612x612&w=0&k=20&c=0wMa1MYxt6HHamjd66d5__XGAKbJFDFQyu9LCloRsYU=",
    },
    {
      id: 2,
      name: "Mr. Tariq Hasan",
      bio: "Tariq Hasan is a tech entrepreneur and software engineer who has spent a decade mentoring students in programming, web development, and tech startups. He regularly speaks at international tech conferences.",
      expertise: [
        "Web Development",
        "Programming Languages",
        "Startup Mentorship",
      ],
      photo:
        "https://media.istockphoto.com/id/1324042769/photo/confident-gym-owner.jpg?s=612x612&w=0&k=20&c=2ARveP6nctKY2V1180dCOXS7yJrZjRg-TTIDkazond8=",
    },
    {
      id: 3,
      name: "Ms. Nazia Hossain",
      bio: "Nazia Hossain is a public speaking coach and communication expert with a strong background in media and public relations. She has helped over 500 individuals build confidence and improve their public speaking skills.",
      expertise: [
        "Public Speaking",
        "Communication Strategies",
        "Media Training",
      ],
      photo:
        "https://t3.ftcdn.net/jpg/07/32/65/04/360_F_732650497_jXQjmlrrB6qT3nZrexd0WrnmeKejmxSc.jpg",
    },
  ];

  // Container configuration for sequential staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Card slide-up and fade-in animation
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div>
      <SectionTitle title={"TEAM OF EXPERT COACHES"} subtitle={"our team"} />
      {/* Kept your original solid gradient background layer */}
      <div className="bg-gradient-to-b from-primary to-secondary py-16 mt-10">
        {/* Animated grid system wrapper */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-7 w-10/12 mx-auto"
        >
          {trainers.map((trainer) => (
            <motion.div
              key={trainer.id}
              variants={cardVariants}
              whileHover={{ y: -5 }} // Subtle hardware-accelerated lift on hover
              className="text-white space-y-3 flex flex-col justify-center items-center group transition-all duration-300"
            >
              {/* Image with your original hover scale, adding a crisp inner border layout */}
              <div className="w-[250px] h-[250px] rounded-full p-1 bg-white/20 overflow-hidden shadow-lg group-hover:bg-white/40 duration-300">
                <img
                  className="w-full h-full rounded-full object-cover group-hover:scale-105 group-hover:opacity-90 duration-300"
                  src={trainer.photo}
                  alt={trainer.name}
                />
              </div>

              {/* Solid high-contrast text titles */}
              <h4 className="text-2xl lg:text-3xl font-bold tracking-wide">
                {trainer.name}
              </h4>

              <p className="text-sm lg:text-md text-center flex-grow text-white/90">
                {trainer.bio}
              </p>

              <p className="font-bold border-b border-white/30 pb-1">
                Expertise in:
              </p>

              {/* Keeping your original list structure intact */}
              <ul className="text-sm lg:text-md list-disc list-inside space-y-1">
                {trainer.expertise.map((point, idx) => (
                  <li key={idx} className="text-white/90">
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Trainers;
