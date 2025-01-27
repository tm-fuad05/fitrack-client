import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Button } from "@material-tailwind/react";
import { LucideDumbbell, LucideHeart } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <header className="bg-gradient-to-r from-primary to-secondary text-white py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About FitRack</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Empowering fitness enthusiasts to achieve their goals with
            cutting-edge tools, community support, and expert guidance.
          </p>
        </div>
      </header>

      <motion.section
        className="py-16 container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg mb-6">
              At FitRack, our mission is to create a one-stop fitness platform
              where you can track your progress, connect with like-minded
              individuals, and access expert guidance to transform your fitness
              journey. Whether you're a beginner or a pro, we are here to
              support you every step of the way.
            </p>
            <Link
              to={"/#newsletter"}
              className="bg-secondary font-oxanium hover:bg-opacity-50 px-6 py-3 rounded-lg text-white font-semibold"
            >
              Join the Community
            </Link>
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://wod.guru/wp-content/uploads/2024/09/7_Gym-Mission-Statement-1024x640.jpg"
              alt="Fitness"
              className="rounded-2xl shadow-lg w-full"
            />
          </motion.div>
        </div>
      </motion.section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose FitRack?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-lg">
              <CardBody className="text-center">
                <LucideDumbbell className="w-12 h-12 mx-auto text-secondary mb-4" />
                <h3 className="font-semibold text-xl mb-2">
                  Comprehensive Tracking
                </h3>
                <p>
                  Monitor your workouts, nutrition, and progress all in one
                  place with our intuitive tools and personalized dashboards.
                </p>
              </CardBody>
            </Card>
            <Card className="shadow-lg">
              <CardBody className="text-center">
                <LucideHeart className="w-12 h-12 mx-auto text-secondary mb-4" />
                <h3 className="font-semibold text-xl mb-2">
                  Supportive Community
                </h3>
                <p>
                  Connect with other fitness enthusiasts, share your journey,
                  and find inspiration in our vibrant community.
                </p>
              </CardBody>
            </Card>
            <Card className="shadow-lg">
              <CardBody className="text-center">
                <LucideDumbbell className="w-12 h-12 mx-auto text-secondary mb-4" />
                <h3 className="font-semibold text-xl mb-2">Expert Guidance</h3>
                <p>
                  Access workouts and advice from fitness professionals to help
                  you achieve your goals efficiently and safely.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
