"use client";
import React from "react";
import { Icon } from "@iconify/react";

const Contact = () => {
  // Social media links
  const socialLinks = {
    whatsapp: "https://wa.me/6282246747133",
    instagram: "https://www.instagram.com/biidproperty.id/",
  };

  return (
    <section id="contactus" className="bg-primary">
      {/* Judul */}
      <div className="text-center pt-10 ">
        <h1 className="text-white text-5xl font-bold mb-18">Contact Us</h1>
      </div>

      <div className="flex items-center md:px-30 pb-20 px-4">
        {/* Garis vertikal dan lingkaran */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-secondary" />
          <div className="w-1 bg-secondary h-2" />
          <div className="w-14 rounded-3xl bg-gray-300 flex flex-col items-center py-4 space-y-6 shadow-lg">
            {/* WhatsApp dengan link */}
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Icon
                icon="logos:whatsapp-icon"
                className="text-green-500 w-8 h-8"
              />
            </a>
            {/* Instagram dengan link */}
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Icon icon="skill-icons:instagram" className="w-8 h-8" />
            </a>
            {/* YouTube dengan link */}
          </div>
          <div className="w-1 bg-secondary h-10" />
        </div>
        {/* Kontak Text */}
        <div className="text-white md:text-2xl space-y-6 mt-6 text-xl py-2 flex flex-col">
          <a href={socialLinks.whatsapp}>
            <p>+62 822-4674-7133 (DW)</p>
          </a>
          <a href={socialLinks.instagram}>
            <p>@biidproperty.id</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
