"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { gsap } from 'gsap';

const Nav = () => {
  const [openRight, setOpenRight] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  
  // Refs for GSAP animation targets
  const desktopBtnRef = useRef(null);
  const mobileBtnRef = useRef(null);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Portfolio", link: "/portfolio" },
    { name: "FAQs", link: "/faqs" },
    { name: "Contact Us", link: "/contact" },
  ];

  // GSAP sliding swap animation
  const handleButtonHover = (btnRef, isHovering) => {
    if (!btnRef.current) return;

    const topText = btnRef.current.querySelector('.top-text');
    const bottomText = btnRef.current.querySelector('.bottom-text');
    const topBg = btnRef.current.querySelector('.top-bg');
    const bottomBg = btnRef.current.querySelector('.bottom-bg');

    if (isHovering) {
      // Slide top elements up and out
      gsap.to([topText, topBg], {
        y: "-100%",
        duration: 0.4,
        ease: "power2.inOut"
      });
      
      // Slide bottom elements up into view
      gsap.to([bottomText, bottomBg], {
        y: "0%",
        duration: 0.4,
        ease: "power2.inOut"
      });

      // Add slight scale and shadow
      gsap.to(btnRef.current, {
        scale: 1.02,
        boxShadow: "0 8px 25px rgba(251, 146, 60, 0.3)",
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      // Reset top elements to original position
      gsap.to([topText, topBg], {
        y: "0%",
        duration: 0.4,
        ease: "power2.inOut"
      });
      
      // Reset bottom elements below view
      gsap.to([bottomText, bottomBg], {
        y: "100%",
        duration: 0.4,
        ease: "power2.inOut"
      });

      // Reset scale and shadow
      gsap.to(btnRef.current, {
        scale: 1,
        boxShadow: "0 4px 15px rgba(251, 146, 60, 0.2)",
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  // Initialize button styles
  useEffect(() => {
    [desktopBtnRef, mobileBtnRef].forEach(ref => {
      if (ref.current) {
        gsap.set(ref.current, {
          boxShadow: "0 4px 15px rgba(251, 146, 60, 0.2)"
        });
      }
    });
  }, []);

  // Reusable button component
  const AnimatedButton = ({ btnRef, className = "" }) => (
    <button 
      ref={btnRef}
      className={`relative overflow-hidden bg-orange-400 text-white font-semibold rounded cursor-pointer ${className}`}
      onMouseEnter={() => handleButtonHover(btnRef, true)}
      onMouseLeave={() => handleButtonHover(btnRef, false)}
    >
      {/* Top layer - visible by default */}
      <div className="top-bg absolute inset-0 bg-orange-400 z-0"></div>
      <span className="top-text relative z-10 block px-4 py-2">Request A Quote</span>
      
      {/* Bottom layer - positioned below, will slide up */}
      <div className="bottom-bg absolute inset-0 bg-gradient-to-r from-gray-600 to-black z-0" style={{transform: 'translateY(100%)'}}>
      </div>
      <span className="bottom-text absolute inset-0 flex items-center justify-center text-white font-semibold z-10" style={{transform: 'translateY(100%)'}}>
       Request Quote
      </span>
    </button>
  );

  return (
    <div className="font-montserrat sticky top-0 z-50 shadow-lg ">
      <div className="bg-white ">
      <nav className="flex items-center justify-between z-30 w-[80%] max-lg:w-[100%] mx-auto  top-0 pr-3">
        {/* Logo */}
        <Link href="/">
          <Image
            src={"/404 slogo.png"}
            alt="Logo"
            width={200}
            height={200}
            className="w-64 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className={`hover:text-purple-600 transition-colors duration-200 ${
                item.name === "Home"
                  ? "text-purple-600 font-medium"
                  : "text-black"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <AnimatedButton btnRef={desktopBtnRef} />
          <button onClick={() => setOpenLeft(!openLeft)} className="z-20 block cursor-pointer">
            <Image src="/icons/app.png" alt="Info" width={28} height={24} />
          </button>
        </div>
         <div className="flex items-center lg:hidden space-x-4">
           {/* Mobile Nav Menu Toggle */}
           <button onClick={() => setOpenLeft(!openLeft)} className="z-20  cursor-pointer hidden max-lg:block">
            <Image src="/icons/app.png" alt="Info" width={38} height={34} />
          </button>
        <button
          onClick={() => setOpenRight(!openRight)}
          className="md:hidden z-20 cursor-pointer"
        >
          <Image src="/icons/menu.png" alt="Menu" width={38} height={34} />
        </button>
         </div>
      </nav>
      </div>

      {/* Left Sidebar (Company Info) */}
      <div
  className={`fixed top-0 right-0 h-full w-full sm:w-4/5 lg:w-1/3 bg-gray-100 shadow-lg transform transition-transform duration-500 ease-in-out z-40 ${
    openLeft ? "translate-x-0" : "translate-x-full"
  } max-h-screen overflow-y-auto`}
>
  <div className="p-6 space-y-4">
    <div className="flex items-center justify-between w-full">
    <Image
            src={"/404 slogo.png"}
            alt="Logo"
            width={200}
            height={200}
            className="w-44 object-contain"
          />
      <button
        onClick={() => setOpenLeft(false)}
        className="text-3xl font-bold border border-gray-200 px-3 rounded-xl cursor-pointer"
      >
        &times;
      </button>
    </div>

    <section className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="text-sm text-orange-500 mb-2">Get in Touch</div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Reach out to 404Services</h2>
      <p className="text-gray-600 mb-8">
        404 is an IT consulting company specializing in automating innovative solutions for businesses.
      </p>

      <div className="space-y-6">
        {/* Phone */}
        <div className="flex items-start gap-4">
          <FaPhoneAlt className="text-purple-500 text-xl mt-1" />
          <div>
            <p className="text-sm text-gray-500">Chat or call any of these numbers:</p>
            <p className="text-base font-medium">+2348100311203</p>
            <p className="text-base font-medium">2349068262592</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <FaEnvelope className="text-purple-500 text-xl mt-1" />
          <div>
            <p className="text-sm text-gray-500">Send Us an Email</p>
            <p className="text-base font-medium">support@chaiiiii.com</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-4">
          <FaMapMarkerAlt className="text-purple-500 text-xl mt-1" />
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-base font-medium">Abuja, Nigeria</p>
          </div>
        </div>
      </div>

      {/* Socials */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Social Just You Connected Us!</h3>
        <div className="flex gap-6 flex-wrap">
          <a href="#" className="flex flex-col items-center text-gray-600 hover:text-black">
            <FaLinkedin className="text-2xl" />
            <span className="text-xs mt-1">LinkedIn</span>
          </a>
          <a href="#" className="flex flex-col items-center text-gray-600 hover:text-black">
            <FaFacebook className="text-2xl" />
            <span className="text-xs mt-1">Facebook</span>
          </a>
          <a href="#" className="flex flex-col items-center text-gray-600 hover:text-black">
            <FaTwitter className="text-2xl" />
            <span className="text-xs mt-1">Twitter</span>
          </a>
          <a href="#" className="flex flex-col items-center text-gray-600 hover:text-black">
            <FaInstagram className="text-2xl" />
            <span className="text-xs mt-1">Instagram</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</div>

      {/* Right Sidebar (Nav Menu for Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 max-md:w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden z-40 ${
          openRight ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col space-y-4">
        <div className="flex items-center justify-between w-full ">
        <Image
            src={"/404 slogo.png"}
            alt="Logo"
            width={200}
            height={200}
            className="w-44 object-contain"
          />
          <button
            onClick={() => setOpenRight(false)}
            className="text-4xl cursor-pointer"
          >
            &times;
          </button>
        </div>
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
          <AnimatedButton btnRef={mobileBtnRef} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Nav;