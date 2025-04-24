"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const [openRight, setOpenRight] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Portfolio", link: "/portfolio" },
    { name: "FAQs", link: "/faqs" },
    { name: "Contact Us", link: "/contact" },
  ];

  return (
    <div className="font-montserrat">
      <div className="bg-white shadow-md">
      <nav className="flex items-center justify-between px-6 py-4   z-30 w-[80%] mx-auto sticky top-0">
        {/* Logo */}
        <Link href="/">
          <span className="flex items-center">
            <span className="ml-2 text-2xl font-montserrat  font-bold text-purple-700 hover:animate-pulse">404Services</span>
          </span>
        </Link>

        {/* Mobile Nav Menu Toggle */}
        <button
          onClick={() => setOpenRight(!openRight)}
          className="md:hidden z-20"
        >
          <Image src="/icons/menu.png" alt="Menu" width={24} height={24} />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className={`hover:text-purple-600 ${
                item.name === "Home"
                  ? "text-purple-600 font-medium"
                  : "text-black"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button className="bg-orange-400 text-white font-semibold px-4 py-2 rounded">
            Request A Quote
          </button>
          <button onClick={() => setOpenLeft(!openLeft)} className="z-20 block">
            <Image src="/icons/menu.png" alt="Info" width={28} height={24} />
          </button>
        </div>
      </nav>
      </div>

      {/* Left Sidebar (Company Info) */}
      <div
          className={`fixed top-0 right-0 h-full w-1/3 bg-gray-100 shadow-lg transform transition-transform duration-500 ease-in-out z-40 ${
            openLeft ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6 space-y-4">
          <button
            onClick={() => setOpenLeft(false)}
            className="self-end text-2xl font-bold"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold text-purple-600">About Us</h2>
          <p className="text-sm text-gray-700">
            We’re a creative tech agency helping brands build top-notch digital
            experiences.
          </p>
          <p className="text-sm text-gray-500">info@404services.com</p>
        </div>
      </div>

      {/* Right Sidebar (Nav Menu for Mobile) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden z-40 ${
          openRight ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col space-y-4">
          <button
            onClick={() => setOpenRight(false)}
            className="self-end text-2xl font-bold"
          >
            &times;
          </button>
          {navItems.map((item) => (
            <Link key={item.name} href={item.link}>
              <span
                onClick={() => setOpenRight(false)}
                className={`${
                  item.name === "Home"
                    ? "text-purple-600 font-medium"
                    : "text-black"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
          <button className="bg-orange-400 text-white font-semibold px-4 py-2 rounded w-full">
            Request A Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
