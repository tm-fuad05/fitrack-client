import React from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
} from "react-icons/io5";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-3">
      <div className="container mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo and Name */}
          <Logo />
          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-secondary"
              aria-label="Facebook"
            >
              <IoLogoFacebook className="text-3xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-secondary"
              aria-label="Twitter"
            >
              <IoLogoTwitter className="text-3xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-secondary"
              aria-label="Instagram"
            >
              <IoLogoInstagram className="text-3xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-secondary"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-wrap justify-between items-center">
          {/* Contact Information */}
          <div>
            <p className="text-sm">
              <strong>Address:</strong> 123 Main Street, Suite 456, City,
              Country
            </p>
            <p className="text-sm">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:contact@mywebsite.com"
                className="text-gray-300 hover:text-secondary"
              >
                fitrack.admin@gmail.com
              </a>
            </p>
            <p className="text-sm">
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+1234567890"
                className="text-gray-300 hover:text-secondary"
              >
                +123 456 7890
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="border-t border-gray-700 my-3"></div>
      {/* Copyright */}
      <div className="mt-4 md:mt-0 text-sm text-gray-400 text-center">
        &copy; {new Date().getFullYear()} FitRack. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
