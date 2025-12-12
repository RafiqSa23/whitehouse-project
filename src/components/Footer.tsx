import React from "react";
import { Icon } from "@iconify/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-secondary mb-2">
              White House Premiere
            </h3>
            <p className="text-gray-300 text-sm">
              Membangun Hunian Impian Anda
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6">
            <a
              href="https://wa.me/6282246747133"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              <Icon icon="logos:whatsapp-icon" className="w-8 h-8" />
            </a>
            <a
              href="https://instagram.com/biidproperty.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400 transition-colors"
            >
              <Icon icon="skill-icons:instagram" className="w-8 h-8" />
            </a>
            <a
              href="https://youtube.com/@biidproperty.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-500 transition-colors"
            >
              <Icon icon="logos:youtube-icon" className="w-8 h-8" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-6 pt-6">
          {/* Copyright and Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} White House Premiere. All rights reserved.
            </div>

            {/* Quick Links */}
            <div className="flex space-x-6 text-sm">
              <a
                href="#home"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#type"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Type
              </a>
              <a
                href="#contactus"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
