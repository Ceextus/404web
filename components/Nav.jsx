"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const Nav = ({ settings = {} }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "/services",
      dropdown: [
        { name: "Web Architecture", href: "/services/web" },
        { name: "Mobile Solutions", href: "/services/mobile" },
        { name: "SaaS & Cloud Engines", href: "/services/cloud" },
        { name: "Cinematic UI/UX", href: "/services/ui-ux" },
      ],
    },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Insights", href: "/insights" },
  ];

  // Animation Variants
  const mobileMenuVariants = {
    closed: { opacity: 0, clipPath: "circle(0% at 100% 0)" },
    open: {
      opacity: 1,
      clipPath: "circle(150% at 100% 0)",
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    },
  };

  const mobileLinkVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.2, // Stagger effect
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut", staggerChildren: 0.05 },
    },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } },
  };

  const dropdownItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 font-outfit flex justify-center ${
          isScrolled ? "pt-6 px-4" : "pt-6 px-6 sm:px-10"
        }`}
      >
        <motion.div
          layout
          className={`flex items-center justify-between transition-all duration-700 ease-in-out relative ${
            isScrolled
              ? "w-full max-w-[95%] md:max-w-[85%] lg:max-w-[70%] bg-[#050b14]/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full py-3 px-6 lg:px-8 border border-[#c2a66b]/20"
              : "w-full max-w-7xl bg-transparent py-2 px-0 rounded-none border-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="relative z-50 flex-shrink-0 group">
            <img
              src={settings.logo_url || "/404 slogo.png"}
              alt="404Services Logo"
              className={`object-contain transition-all duration-700 group-hover:drop-shadow-[0_0_12px_rgba(194,166,107,0.4)] h-auto ${
                (settings.logo_url || "/404 slogo.png").startsWith("/") ? "brightness-0 invert" : ""
              } ${
                isScrolled ? "w-28 sm:w-32 max-h-9" : "w-36 sm:w-44 max-h-12"
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (pathname.startsWith(link.href) && link.href !== "/");
              return (
                <div
                  key={link.name}
                  className="relative py-2 px-3 lg:px-4"
                  onMouseEnter={() => {
                    setHoveredLink(link.name);
                    if (link.dropdown) setIsServicesOpen(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredLink(null);
                    if (link.dropdown) setIsServicesOpen(false);
                  }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-xs lg:text-sm font-medium tracking-widest uppercase transition-colors duration-300 relative z-10 ${
                      isActive ? "text-[#c2a66b]" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {link.dropdown && (
                      <motion.div
                        animate={{ rotate: isServicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown
                          size={14}
                          className={isActive ? "text-[#c2a66b]" : ""}
                        />
                      </motion.div>
                    )}
                  </Link>

                  {/* Hover Background Pill Effect */}
                  {hoveredLink === link.name && !isActive && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 bg-white/5 rounded-full z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Active Underline Effect with Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#c2a66b] to-transparent z-0"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="absolute inset-0 bg-[#c2a66b] blur-sm opacity-50"></div>
                    </motion.div>
                  )}

                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-60 bg-[#050b14]/90 backdrop-blur-3xl border border-[#c2a66b]/20 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden"
                        >
                          {/* Top Pointer */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#050b14]/90 border-t border-l border-[#c2a66b]/20 rotate-45 backdrop-blur-md"></div>

                          <div className="py-3 relative z-10 flex flex-col">
                            {link.dropdown.map((subItem) => (
                              <motion.div
                                variants={dropdownItemVariants}
                                key={subItem.name}
                              >
                                <Link
                                  href={subItem.href}
                                  className="group flex items-center px-5 py-3 text-sm text-gray-300 hover:text-white transition-colors duration-200 relative overflow-hidden"
                                >
                                  {/* Left highlight line on hover */}
                                  <span className="absolute left-0 w-1 h-0 bg-[#c2a66b] rounded-r-md group-hover:h-full transition-all duration-300 top-1/2 -translate-y-1/2"></span>
                                  <span className="relative z-10 translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                                    {subItem.name}
                                  </span>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block flex-shrink-0 relative z-50">
            <Link href="/contact" className="relative group inline-block">
              {/* Glow Behind Button */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#c2a66b] to-[#f4d083] rounded-full blur-md opacity-0 group-hover:opacity-40 transition duration-500"></div>
              
              <button
                className={`relative bg-transparent border border-[#c2a66b]/50 text-[#c2a66b] group-hover:text-[#050b14] overflow-hidden transition-all duration-500 rounded-full font-semibold uppercase tracking-widest ${
                  isScrolled ? "px-6 py-2.5 text-xs" : "px-7 py-3 text-sm"
                }`}
              >
                {/* sliding fill effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#c2a66b] to-[#f4d083] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                <span className="relative z-10">Book us</span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden relative z-[60] text-gray-200 hover:text-[#c2a66b] transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </motion.div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 w-full h-screen bg-[#050b14]/98 backdrop-blur-3xl z-50 flex flex-col justify-center"
          >
            {/* Cinematic Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#1a4fb0]/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#c2a66b]/15 rounded-full blur-[100px] pointer-events-none"></div>

            <nav className="flex flex-col px-8 md:px-16 w-full max-w-sm mx-auto relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={mobileLinkVariants}
                  className="border-b border-white/5 py-5 last:border-none"
                >
                  {link.dropdown ? (
                    <div className="flex flex-col">
                      <div className="text-2xl font-light text-white tracking-widest uppercase">
                        {link.name}
                      </div>
                      <div className="mt-3 flex flex-col gap-3 pl-4 border-l-2 border-[#c2a66b]/30">
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="text-sm font-medium text-gray-400 hover:text-[#c2a66b] transition-colors tracking-wide uppercase py-1"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block text-2xl font-light text-gray-400 hover:text-white transition-colors tracking-widest uppercase hover:translate-x-2 duration-300"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div
                custom={navLinks.length}
                variants={mobileLinkVariants}
                className="mt-12"
              >
                <Link href="/contact" className="relative group block w-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#c2a66b] to-[#f4d083] rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
                  <button className="relative w-full bg-[#050b14] border border-[#c2a66b]/50 text-[#c2a66b] group-hover:text-[#050b14] overflow-hidden transition-all duration-300 py-4 rounded-full text-sm font-semibold uppercase tracking-widest">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#c2a66b] to-[#f4d083] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
                    <span className="relative z-10">Start Your Project</span>
                  </button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;