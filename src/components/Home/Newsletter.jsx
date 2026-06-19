import React from "react";
import newsletter from "../../assets/newsletter.png";
import Button from "../Shared/Button";
import SectionTitle from "../Shared/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { motion } from "framer-motion";
// SweetAlert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Newsletter = () => {
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;
    const newsLetterInfo = {
      name,
      phone,
      email,
      subject,
      message,
    };

    try {
      const { data } = await axiosPublic.post("/newsletter", newsLetterInfo);
      if (data.success) {
        form.reset();
        Swal.fire({
          title: "Message Sent",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Animation configuration for staggering inputs
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div
      className="relative bg-cover bg-center py-20 overflow-hidden"
      style={{ backgroundImage: `url(${newsletter})` }}
    >
      {/* Premium dark overlay layer for depth and consistency */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85 pointer-events-none" />

      <div className="relative z-10 w-11/12 mx-auto">
        <SectionTitle
          subtitle={"contact us"}
          title={"join our team"}
          color={"white"}
        />

        {/* Form Container with glassmorphic backing and entrance animation */}
        <motion.form
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          onSubmit={handleSubmit}
          className="font-poppins grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl mx-auto mt-12 p-6 md:p-10 rounded-2xl border border-white/10 backdrop-blur-md bg-black/40 shadow-2xl"
        >
          {/* Name Input */}
          <motion.div variants={itemVariants} className="w-full">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              required
            />
          </motion.div>

          {/* Phone Input */}
          <motion.div variants={itemVariants} className="w-full">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              required
            />
          </motion.div>

          {/* Email Input */}
          <motion.div variants={itemVariants} className="w-full">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              required
            />
          </motion.div>

          {/* Subject Input */}
          <motion.div variants={itemVariants} className="w-full">
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              required
            />
          </motion.div>

          {/* Message Textarea */}
          <motion.div variants={itemVariants} className="w-full md:col-span-2">
            <textarea
              name="message"
              placeholder="Send a message"
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-5 pt-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              rows={5}
              required
            />
          </motion.div>

          {/* Subscribe Button Wrapper */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 flex justify-start mt-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button text={"subscribe now"} textColor={"white"}></Button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default Newsletter;
