import React from "react";
import { motion } from "framer-motion";
import {
  LucideDumbbell,
  LucideHeart,
  LucideUsers,
  LucideTrophy,
  LucideSparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="w-11/12 max-w-7xl mx-auto my-16 mt-28 bg-transparent text-gray-900 dark:text-white antialiased">
      <Helmet>
        <title>FitRack | About Us</title>
      </Helmet>

      {/* Modern Split Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 border-b border-gray-200 dark:border-white/5 pb-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <LucideSparkles className="w-3.5 h-3.5" /> Truly Next-Gen Fitness
          </div>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-none text-gray-900 dark:text-white">
            We Build The Tools to <span className="text-primary">Elevate</span>{" "}
            Your Strength
          </h1>
          <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 font-normal leading-relaxed max-w-2xl">
            FitRack isn't just a logger; it's an interactive dynamic ecosystem
            engineered for modern fitness enthusiast. We combine high-end UI
            aesthetics with flawless performance analytics.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to={"/#newsletter"}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-6 py-3 rounded-xl text-white font-bold shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Join Our Tribe
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <div className="relative rounded-2xl overflow-hidden border border-gray-300 dark:border-white/10 shadow-2xl bg-gray-100 dark:bg-neutral-900">
            <img
              src="https://wod.guru/wp-content/uploads/2024/09/7_Gym-Mission-Statement-1024x640.jpg"
              alt="Fitness Mission"
              className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      {/* Interactive Bento Box Grid Layout */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Why We Are <span className="text-primary">Different</span>
          </h2>
          <p className="text-xs lg:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">
            The core pillars that power our core platform architecture
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Bento Box 1: Big Spotlight Item */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 flex flex-col justify-between p-8 rounded-2xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-primary/40 dark:hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
            <div className="space-y-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                <LucideDumbbell className="w-6 h-6" />
              </div>
              <h3 className="font-black text-2xl text-gray-900 dark:text-white tracking-tight">
                Industrial-Grade Comprehensive Tracking
              </h3>
              <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-normal max-w-xl">
                Monitor your tailored raw workouts, specialized nutrition plans,
                and absolute milestone parameters all inside one slick
                hyper-optimized custom view. No bloatware, just performance.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/5 flex items-center gap-6 text-xs font-bold text-gray-500 dark:text-gray-400">
              <div>⚡ Dynamic Metrics</div>
              <div>🎯 Precision Driven</div>
            </div>
          </motion.div>

          {/* Bento Box 2: Compact Card */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between p-6 rounded-2xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-primary/40 dark:hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <LucideHeart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
                Vibrant Ecosystem
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                Never train isolated. Share complex data sets, routines and find
                immediate accountability partner check-ins.
              </p>
            </div>
            <div className="text-xs font-bold text-secondary mt-4 group-hover:underline cursor-pointer">
              Explore community feed →
            </div>
          </motion.div>

          {/* Bento Box 3: Compact Card */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between p-6 rounded-2xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-primary/40 dark:hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <LucideUsers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
                Verified Trainers Only
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                Access curated elite program splits explicitly created by fully
                vetted athletic and bodybuilding instructors.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-4">
              100% Certified Crew
            </div>
          </motion.div>

          {/* Bento Box 4: Wide Milestone Item */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 flex flex-col justify-between p-8 rounded-2xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-transparent backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-primary/40 dark:hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <LucideTrophy className="w-6 h-6" />
              </div>
              <h3 className="font-black text-2xl text-gray-900 dark:text-white tracking-tight">
                Built For Serious Evolution
              </h3>
              <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                Whether your goal is localized strength hypertrophy, extreme
                cardiovascular endurance tracking, or pure body recomposition,
                our systems recalibrate to fuel your vision seamlessly.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
