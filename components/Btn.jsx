"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from 'gsap';

const AnimatedButton = ({ 
  className = "", 
  topText = "Request A Quote",
  bottomText = "Request Quote",
  topBgColor = "bg-orange-400",
  bottomBgGradient = "from-purple-600 to-gray-300",
  onClick,
  ...props 
}) => {
  const btnRef = useRef(null);

  // GSAP sliding swap animation
  const handleButtonHover = (isHovering) => {
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
    if (btnRef.current) {
      gsap.set(btnRef.current, {
        boxShadow: "0 4px 15px rgba(251, 146, 60, 0.2)"
      });
    }
  }, []);

  return (
    <button 
      ref={btnRef}
      className={`relative overflow-hidden ${topBgColor} text-white font-semibold rounded cursor-pointer text-xl  ${className}`}
      onMouseEnter={() => handleButtonHover(true)}
      onMouseLeave={() => handleButtonHover(false)}
      onClick={onClick}
      {...props}
    >
      {/* Top layer - visible by default */}
      <div className={`top-bg absolute inset-0 ${topBgColor} z-0`}></div>
      <span className="top-text relative z-10 block px-4 py-2">{topText}</span>
      
      {/* Bottom layer - positioned below, will slide up */}
      <div 
        className={`bottom-bg absolute inset-0 bg-gradient-to-r ${bottomBgGradient} z-0`} 
        style={{transform: 'translateY(100%)'}}
      />
      <span 
        className="bottom-text absolute inset-0 flex items-center justify-center text-white font-semibold z-10" 
        style={{transform: 'translateY(100%)'}}
      >
        {bottomText}
      </span>
    </button>
  );
};

export default AnimatedButton;