import Swal from "sweetalert2";
import newsletter from "../../assets/newsletter.png";
import { usePostNewsletter } from "../../hooks/useNewsletter";
import Button from "../Shared/Button";
import SectionTitle from "../Shared/SectionTitle";
import { motion } from "framer-motion";
import { useState } from "react";
import { createNewsletterSchema } from "../../validation/schema/newsletter.validation";

const Newsletter = () => {
  const postMutation = usePostNewsletter();
  const [error, setError] = useState([]);
  const [formData, setFormData] = useState({
    name: null,
    phone: null,
    email: null,
    subject: null,
    message: null,
  });

  const nameError = error?.find((err) => err.field === "name");
  const phoneError = error?.find((err) => err.field === "phone");
  const emailError = error?.find((err) => err.field === "email");
  const subjectError = error?.find((err) => err.field === "subject");
  const messageError = error?.find((err) => err.field === "message");

  const changeInputHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value.length > 0 ? value : null,
    }));

    const fieldError = error.find((err) => err.field === name);

    if (fieldError) setError((prev) => [...prev, (fieldError.message = "")]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error: validationError } =
      createNewsletterSchema.safeParse(formData);

    if (validationError)
      return setError(
        validationError?.issues?.map((err) => ({
          field: err?.path[0],
          message: err?.message,
        })),
      );

    postMutation.mutate(data, {
      onSuccess: async (data) => {
        if (data.success) {
          await Swal.fire({
            title: "Message Sent",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
        }
      },
    });
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
          className=" grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl mx-auto mt-12 p-6 md:p-10 rounded-2xl border border-white/10 backdrop-blur-md bg-black/40 shadow-2xl"
        >
          {/* Name Input */}
          <motion.div variants={itemVariants} className="w-full">
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={changeInputHandler}
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            />
            {nameError && (
              <p className="text-xs text-red-500 pl-1 pt-1">
                {nameError.message}
              </p>
            )}
          </motion.div>

          {/* Phone Input */}
          <motion.div variants={itemVariants} className="w-full">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={changeInputHandler}
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            />
            {phoneError && (
              <p className="text-xs text-red-500 pl-1 pt-1">
                {phoneError.message}
              </p>
            )}
          </motion.div>

          {/* Email Input */}
          <motion.div variants={itemVariants} className="w-full">
            <input
              name="email"
              placeholder="Email"
              onChange={changeInputHandler}
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            />
            {emailError && (
              <p className="text-xs text-red-500 pl-1 pt-1">
                {emailError.message}
              </p>
            )}
          </motion.div>

          {/* Subject Input */}
          <motion.div variants={itemVariants} className="w-full">
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              onChange={changeInputHandler}
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            />
            {subjectError && (
              <p className="text-xs text-red-500 pl-1 pt-1">
                {subjectError.message}
              </p>
            )}
          </motion.div>

          {/* Message Textarea */}
          <motion.div variants={itemVariants} className="w-full md:col-span-2">
            <textarea
              name="message"
              placeholder="Send a message"
              onChange={changeInputHandler}
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-5 pt-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              rows={5}
            />
            {messageError && (
              <p className="text-xs text-red-500 pl-1 pt-1">
                {messageError.message}
              </p>
            )}
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
