"use client";
import React, { useEffect, useRef } from "react";
import { FaShieldAlt, FaHeadset, FaMoneyCheckAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt size={40} className="text-purple-500" />,
    title: "Reliability and Security",
    description:
      "We prioritize reliability and security, delivering dependable solutions that protect your business from risks while ensuring smooth, uninterrupted operations.",
  },
  {
    icon: <FaHeadset size={40} className="text-purple-500" />,
    title: "Fast Customer Service",
    description:
      "Our dedicated team provides fast, efficient customer service, resolving issues promptly and ensuring your business stays on track with minimal downtime.",
  },
  {
    icon: <FaMoneyCheckAlt size={40} className="text-purple-500" />,
    title: "Reasonable Maintenance Costs",
    description:
      "We provide tailored, cost-effective maintenance services to ensure your systems stay updated and functional without unnecessary expenses.",
  },
];

const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation based on mouse position
      const rotateX = ((y - centerY) / centerY) * 10; // Limit rotation to 10 degrees
      const rotateY = ((x - centerX) / centerX) * 10;

      // Apply transform with smooth transition
      card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      // Reset transform with smooth transition
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Calculate position offset based on index
  const getPositionClasses = () => {
    if (index === 0) return "ml-18"; // First card shifted left
    if (index === 1) return "ml-4";  // Second card centered
    if (index === 2) return "ml-16"; // Third card shifted right
    return "";
  };

  return (
    <div
      ref={cardRef}
      className={`font-montserrat bg-gray-900 text-white p-6 rounded-xl shadow-lg w-4/5 ${getPositionClasses()}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        transition: "transform 0.3s ease",
        willChange: "transform"
      }}
    >
      <div className="relative z-10 flex items-center justify-center flex-col h-56" style={{ transform: "translateZ(20px)" }}>
        <div className="mb-3 ">{feature.icon}</div>
        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
        <p className="text-sm text-gray-300">{feature.description}</p>
      </div>
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-indigo-600/5 rounded-xl"
        style={{ transform: "translateZ(0px)" }}
      />
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="py-16 px-4 md:px-16 bg-white text-black font-montserrat">
      <div className="max-w-7xl items-center  mx-auto flex flex-col md:flex-row gap-10">
        {/* Left Section */}
        <div className="flex-1 flex flex-col gap-2">    
          <p className="text-orange-600 font-semibold uppercase mb-2">
            About 404Services
          </p>
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Let Your <span className="text-purple-600">Next Click</span> be
            <span className="text-black">404SERVICES.</span>
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            DexfliQ is a leading company specializing in developing and
            deploying technologies for efficient business management. With a
            team of software experts, we create innovative solutions that
            enhance activities in the academic, business, and social sectors.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            We believe in building strong relationships with our clients through
            close collaboration and understanding of their needs. This approach
            allows us to build mutual trust and provide tailored advice. Our
            experts suggest suitable technologies that can transform and enhance
            your business operations, ensuring you receive high-quality services
            at reasonable costs.
          </p>
          <a
            href="#"
            className="text-orange-600 font-semibold hover:underline inline-flex items-center gap-1"
          >
            MORE ABOUT US →
          </a>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;