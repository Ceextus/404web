"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Official 404services service data
const serviceData = [
  {
    title: "Web Architecture",
    description: 
      "We architect custom Next.js and React builds with Tailwind CSS. Our platforms are SEO-optimized, universally accessible, and engineered for ultra-fast, near-instantaneous load times.",
    imageSrc: "/3d2.png", // Keep existing placeholder, user can replace later
    bgColor: "bg-[#050b14]", // Deepest Navy
    textColor: "text-white",
    accentColor: {
      text: "text-[#c2a66b]", // Gold
      border: "border-[#c2a66b]",
      hover: "hover:text-[#e6ca8a]",
      shadow: "rgba(194, 166, 107, 0.2)",
      lightShadow: "rgba(194, 166, 107, 0.1)"
    }
  },
  {
    title: "Mobile Solutions",
    description: 
      "Cross-platform excellence using React Native and Expo. We build high-performance mobile applications that look, feel, and run natively on every device, without the overhead of maintaining dual codebases.",
    imageSrc: "/3d4.png",
    bgColor: "bg-[#070f1c]", // Mid Navy
    textColor: "text-white",
    accentColor: {
      text: "text-[#c2a66b]",
      border: "border-[#c2a66b]",
      hover: "hover:text-[#e6ca8a]",
      shadow: "rgba(194, 166, 107, 0.2)",
      lightShadow: "rgba(194, 166, 107, 0.1)"
    }
  },
  {
    title: "SaaS & Cloud Engines",
    description: 
      "Building the 'brain' of your business. We engineer robust database management systems, resilient API architectures, and automated workflows that scale effortlessly with your enterprise.",
    imageSrc: "/3d2.png",
    bgColor: "bg-[#0a1628]", // Lightest Navy
    textColor: "text-white",
    accentColor: {
      text: "text-[#c2a66b]",
      border: "border-[#c2a66b]",
      hover: "hover:text-[#e6ca8a]",
      shadow: "rgba(194, 166, 107, 0.2)",
      lightShadow: "rgba(194, 166, 107, 0.1)"
    }
  },
  {
    title: "Cinematic UI/UX",
    description: 
      "Dark-themed, elegant glassmorphic designs that prioritize user retention and aesthetic 'wow' factor. We don't just design interfaces; we craft visual experiences that command attention.",
    imageSrc: "/3d3.png",
    bgColor: "bg-[#050b14]", // Back to deep Navy
    textColor: "text-white",
    accentColor: {
      text: "text-[#c2a66b]",
      border: "border-[#c2a66b]", 
      hover: "hover:text-[#e6ca8a]",
      shadow: "rgba(194, 166, 107, 0.2)",
      lightShadow: "rgba(194, 166, 107, 0.1)"
    }
  }
];

const ServiceSection = ({ service, isReversed, index, total }) => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Magnetic Hover Effect
    if (!imageContainerRef.current || !imageRef.current) return;
    
    const container = imageContainerRef.current;
    const image = imageRef.current;
    
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const distX = x - centerX;
      const distY = y - centerY;
      
      const strength = 0.15;
      const moveX = distX * strength;
      const moveY = distY * strength;

      image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
      
      const shadowX = moveX / 2;
      const shadowY = moveY / 2;
      container.style.boxShadow = `${shadowX}px ${shadowY}px 40px ${service.accentColor.shadow}`;
    };

    const handleMouseLeave = () => {
      image.style.transform = 'translate(0, 0) scale(1)';
      container.style.boxShadow = `0px 0px 30px ${service.accentColor.lightShadow}`;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // GSAP ScrollTrigger Pinning Logic
    if (sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        // Pin squarely at the top to cover the previous section completely
        start: "top top",
        end: "bottom top", 
        pin: true,
        pinSpacing: false,
      });
    }
    
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      ScrollTrigger.getAll().forEach(t => t.refresh());
    };
  }, [service.accentColor.shadow, service.accentColor.lightShadow, index, total]);

  return (
    <section 
      ref={sectionRef}
      className={`relative w-full min-h-screen flex items-center ${service.bgColor} ${service.textColor} py-24 px-6 md:px-12 overflow-hidden border-t border-white/5 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]`}
      style={{ zIndex: index }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full h-full gap-12">
        
        {/* Text Content */}
        <div className={`w-full md:w-1/2 flex flex-col gap-6 ${isReversed ? 'md:order-2 md:pl-16' : 'md:order-1 md:pr-16'}`}>
          <div className="inline-flex items-center gap-3">
            <span className="text-[#c2a66b] font-mono text-sm tracking-widest uppercase">
              0{index + 1} // The Engine
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit tracking-tight leading-[1.1]">
            {service.title}
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
            {service.description}
          </p>
          
          <div className="pt-4">
            <a 
              href="#" 
              className={`inline-flex items-center gap-2 group ${service.accentColor.text} ${service.accentColor.hover} transition-colors duration-300`}
            >
              <span className="text-sm font-semibold tracking-widest uppercase border-b border-transparent group-hover:border-[#c2a66b] pb-1 transition-colors">
                Explore Expertise
              </span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
            </a>
          </div>
        </div>
        
        {/* Image with Magnetic Effect */}
        <div className={`w-full md:w-1/2 flex ${isReversed ? 'md:order-1 justify-center md:justify-start' : 'md:order-2 justify-center md:justify-end'} mt-10 md:mt-0`}>
          <div 
            ref={imageContainerRef}
            className="relative rounded-full overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
            style={{
              width: "350px",
              height: "350px",
              transition: "box-shadow 0.4s ease",
              boxShadow: `0px 0px 30px ${service.accentColor.lightShadow}`
            }}
          >
            <div
              ref={imageRef}
              className="w-full h-full relative"
              style={{
                transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1)",
                willChange: "transform"
              }}
            >
              <Image 
                src={service.imageSrc}
                width={400}
                height={400}
                alt={`404Services - ${service.title}`} 
                className="w-full h-full object-cover opacity-90 p-10"
              />
            </div>
            {/* Inner glow ring */}
            <div className="absolute inset-0 rounded-full border border-[#c2a66b]/20 pointer-events-none"></div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default function WebDevelopmentSection() {
  return (
    <div className="relative w-full bg-[#050b14]">
      {serviceData.map((service, index) => (
        <ServiceSection 
          key={service.title} 
          service={service} 
          isReversed={index % 2 !== 0} // Alternating layout
          index={index}
          total={serviceData.length}
        />
      ))}
    </div>
  );
}