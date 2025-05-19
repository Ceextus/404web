"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define the service data for each section
const serviceData = [
  {
    title: "Web Development",
    description: 
      "DexfliQ offers Web Development services designed to create dynamic, responsive, and user-friendly websites that drive engagement and growth. Our skilled team utilizes the latest technologies and best practices to build custom solutions tailored to your business objectives. From e-commerce platforms to corporate websites, DexfliQ ensures that your online presence is impactful and effective.",
    imageSrc: "/3d2.png",
    bgColor: "bg-black",
    textColor: "text-white",
    accentColor: {
      text: "text-orange-500",
      border: "border-orange-500",
      hover: "hover:text-orange-400",
      shadow: "rgba(255, 165, 0, 0.3)",
      lightShadow: "rgba(255, 165, 0, 0.2)"
    }
  },
  {
    title: "Mobile App Development",
    description: 
      "Transform your ideas into powerful mobile applications with DexfliQ's comprehensive mobile development services. We create intuitive, high-performance apps for iOS and Android platforms that engage users and deliver exceptional experiences. Our team combines creative design with technical expertise to build mobile solutions that help your business thrive in the digital landscape.",
    imageSrc: "/3d4.png",
    bgColor: "bg-gray-900",
    textColor: "text-white",
    accentColor: {
      text: "text-blue-500",
      border: "border-blue-500",
      hover: "hover:text-blue-400",
      shadow: "rgba(59, 130, 246, 0.3)",
      lightShadow: "rgba(59, 130, 246, 0.2)"
    }
  },
  {
    title: "UI/UX Design",
    description: 
      "DexfliQ's UI/UX design services focus on creating visually stunning and intuitive user experiences that drive engagement and satisfaction. We combine aesthetic appeal with functional design to develop interfaces that are both beautiful and easy to use. Our design process is centered around user research, wireframing, prototyping, and iterative testing to ensure that your digital products truly resonate with your target audience.",
    imageSrc: "/3d2.png",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
    accentColor: {
      text: "text-purple-500",
      border: "border-purple-500",
      hover: "hover:text-purple-400",
      shadow: "rgba(139, 92, 246, 0.3)",
      lightShadow: "rgba(139, 92, 246, 0.2)"
    }
  },
  {
    title: "Digital Marketing",
    description: 
      "Amplify your online presence with DexfliQ's strategic digital marketing services. We leverage data-driven approaches to increase your brand visibility, drive qualified traffic, and boost conversions. Our comprehensive marketing solutions include SEO, content marketing, social media strategy, PPC campaigns, and email marketing – all tailored to meet your specific business goals and target audience preferences.",
    imageSrc: "/3d3.png",
    bgColor: "bg-blue-900",
    textColor: "text-white",
    accentColor: {
      text: "text-green-500",
      border: "border-green-500", 
      hover: "hover:text-green-400",
      shadow: "rgba(34, 197, 94, 0.3)",
      lightShadow: "rgba(34, 197, 94, 0.2)"
    }
  }
];

const ServiceSection = ({ service, isReversed, index, total }) => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Magnetic effect code
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

      image.style.transform = `translate(${moveX}px, ${moveY}px)`;
      
      const shadowX = moveX / 2;
      const shadowY = moveY / 2;
      container.style.boxShadow = `${shadowX}px ${shadowY}px 30px ${service.accentColor.shadow}`;
    };

    const handleMouseLeave = () => {
      image.style.transform = 'translate(0, 0)';
      container.style.boxShadow = `0px 0px 20px ${service.accentColor.lightShadow}`;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // GSAP ScrollTrigger Setup
    if (sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: index === 0 ? "top top" : "top top+=80px", // First section starts at top, others slightly offset
        end: index === total - 1 ? "bottom bottom" : "bottom top+=80px", // Last section ends at bottom
        pin: true,
        pinSpacing: false,
        // markers: true, // Uncomment for debugging  
      });
    }
    
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [service.accentColor.shadow, service.accentColor.lightShadow, index, total]);

  return (
    <section 
      ref={sectionRef}
      className={`relative w-full h-screen/2 ${service.bgColor} ${service.textColor} py-24 px-8 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center h-full">
        {/* Content */}
        <div className={`w-full md:w-1/2 ${isReversed ? 'order-2 md:pl-12' : 'order-1 md:pr-12'}`}>
          <h2 className="text-5xl font-bold mb-6">{service.title}</h2>
          <p className={`${service.bgColor === 'bg-gray-100' ? 'text-gray-600' : 'text-gray-300'} text-lg leading-relaxed mb-8`}>
            {service.description}
          </p>
          <a 
            href="#" 
            className={`inline-flex items-center ${service.accentColor.text} font-semibold border-b ${service.accentColor.border} pb-1 ${service.accentColor.hover} transition-colors`}
          >
            REQUEST A QUOTE ✈
          </a>
        </div>
        
        {/* Image with Magnetic Effect */}
        <div className={`w-full md:w-1/2 flex ${isReversed ? 'order-1 justify-center md:justify-start' : 'order-2 justify-center md:justify-end'} mt-10 md:mt-0 max-md:hidden`}>
          <div 
            ref={imageContainerRef}
            className="relative rounded-full overflow-hidden"
            style={{
              width: "300px",
              height: "300px",
              transition: "box-shadow 0.3s ease",
              boxShadow: `0px 0px 20px ${service.accentColor.lightShadow}`
            }}
          >
            <div
              ref={imageRef}
              className="w-full h-full relative"
              style={{
                transition: "transform 0.3s ease-out",
                willChange: "transform"
              }}
            >
              <Image 
                src={service.imageSrc}
                width={300}
                height={300}
                alt={`3D ${service.title}`} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSections = () => {
  return (
    <>
      {serviceData.map((service, index) => (
        <ServiceSection 
          key={service.title} 
          service={service} 
          isReversed={index % 2 !== 0} // Alternating layout
          index={index}
          total={serviceData.length}
        />
      ))}
    </>
  );
};

export default ServicesSections;