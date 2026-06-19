import React from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
} from "react-icons/io5";
import Logo from "../components/Shared/Logo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  // Snappy spring physics for social icons
  const iconVariants = {
    hover: {
      y: -5,
      scale: 1.15,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  return (
    // CHANGED: Fixed hardcoded bg-neutral-950 to adaptive dark theme backgrounds (bg-background-dark / bg-surface-dark)
    <footer className="relative bg-gray-50 text-gray-800 dark:bg-background-dark dark:text-gray-300 pt-16 pb-6 overflow-hidden border-t border-gray-200 dark:border-white/5 font-poppins transition-colors duration-300">
      {/* IMPROVED: Enhanced glowing neon blobs for that rich glossy dark-UI backdrop depth */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen opacity-70 dark:opacity-100" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen opacity-70 dark:opacity-100" />

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Main Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 pb-12">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4 flex flex-col items-start">
            <Logo />
            <p className="text-sm text-gray-700 dark:text-gray-400 font-normal dark:font-light leading-relaxed pt-2">
              Track your fitness, unlock premium analytics, and reach your peak
              performance with the ultimate gym ecosystem.
            </p>

            {/* Social Links clustered beautifully under the brand */}
            <div className="flex space-x-3 pt-3">
              {[
                {
                  icon: <IoLogoFacebook />,
                  url: "https://facebook.com",
                  label: "Facebook",
                },
                {
                  icon: <IoLogoTwitter />,
                  url: "https://twitter.com",
                  label: "Twitter",
                },
                {
                  icon: <IoLogoInstagram />,
                  url: "https://instagram.com",
                  label: "Instagram",
                },
                {
                  icon: <IoLogoLinkedin />,
                  url: "https://linkedin.com",
                  label: "LinkedIn",
                },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  variants={iconVariants}
                  whileHover="hover"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-xl text-gray-700 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:border-primary/50 dark:hover:border-primary/50 transition-colors duration-200 shadow-md dark:shadow-lg"
                  aria-label={item.label}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-oxanium text-gray-900 dark:text-white uppercase tracking-widest border-b border-gray-300 dark:border-white/5 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm font-medium dark:font-light">
              {[
                { text: "All Classes", path: "/all-classes" },
                { text: "Our Trainers", path: "/trainers" },
                { text: "Community Forum", path: "/community" },
                { text: "Privacy Policy", path: "/privacy" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-gray-700 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    &rarr; {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info Blocks */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-oxanium text-gray-900 dark:text-white uppercase tracking-widest border-b border-gray-300 dark:border-white/5 pb-2">
              Contact Info
            </h4>
            <div className="space-y-3.5 text-sm font-medium dark:font-light">
              <div className="flex items-start gap-3 text-gray-700 dark:text-gray-400">
                <IoLocationOutline className="text-xl text-secondary mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">
                  123 Main Street, Suite 456, City, Country
                </p>
              </div>

              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-400 group">
                <IoMailOutline className="text-xl text-secondary flex-shrink-0 group-hover:text-primary transition-colors" />
                <a
                  href="mailto:fitrack.admin@gmail.com"
                  className="hover:text-primary border-b border-transparent hover:border-primary transition-all duration-200"
                >
                  fitrack.admin@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-400 group">
                <IoCallOutline className="text-xl text-secondary flex-shrink-0 group-hover:text-primary transition-colors" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-primary border-b border-transparent hover:border-primary transition-all duration-200"
                >
                  +123 456 7890
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter Micro-CTA */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-oxanium text-gray-900 dark:text-white uppercase tracking-widest border-b border-gray-300 dark:border-white/5 pb-2">
              Newsletter
            </h4>
            <p className="text-xs text-gray-700 dark:text-gray-400 font-normal dark:font-light leading-relaxed">
              Subscribe to get latest fitness tips and exclusive updates right
              to your inbox.
            </p>
            <div className="flex items-center h-11 rounded-xl border border-gray-400 dark:border-white/10 bg-white dark:bg-white/5 p-1 focus-within:border-primary/50 transition-all shadow-sm">
              <input
                type="email"
                placeholder="Your email..."
                className="w-full bg-transparent pl-3 text-xs text-gray-900 dark:text-white focus:outline-none placeholder-gray-500"
              />
              <button className="h-full px-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold font-poppins hover:opacity-90 active:scale-95 transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar Footer Line */}
        <div className="border-t border-gray-300 dark:border-white/5 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600 dark:text-gray-500 text-center sm:text-left tracking-wide font-medium dark:font-normal">
            &copy; {new Date().getFullYear()} FitRack. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-xs text-gray-600 dark:text-gray-500 font-medium dark:font-light">
            <a
              href="#terms"
              className="hover:text-primary dark:hover:text-gray-400 transition-colors"
            >
              Terms of Use
            </a>
            <a
              href="#cookies"
              className="hover:text-primary dark:hover:text-gray-400 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
