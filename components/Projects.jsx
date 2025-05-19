"use client";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'animate.css';

export default function PortfolioShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationClass, setAnimationClass] = useState('animate__fadeIn');

  

  const projects = [
    {
      id: 1,
      client: 'biggest',
      title: 'Car Dealership',
      category: 'Web Development',
      image: '/project1.jpg',
      url: '/projects/car-dealership'
    },
    {
      id: 2,
      client: 'tech-co',
      title: 'Mobile Banking',
      category: 'App Development',
      image: '/project2.jpg',
      url: '/projects/mobile-banking'
    },
    {
      id: 3,
      client: 'creative-agency',
      title: 'Brand Identity',
      category: 'UI/UX Design',
      image: '/project3.jpg',
      url: '/projects/brand-identity'
    },
    {
        id: 4,
        client: 'creative-agency',
        title: 'Brand Identity',
        category: 'UI/UX Design',
        image: '/project4.jpg',
        url: '/projects/brand-identity'
      },
      
  ];
  const totalSlides = projects.length;

  const activeProject = projects[currentSlide];

  const changeSlide = (index) => {
    setAnimationClass('animate__fadeOut');
    setTimeout(() => {
      setCurrentSlide(index);
      setAnimationClass('animate__fadeIn');
    }, 300); // Match with fadeOut animation duration
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % totalSlides;
    changeSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    changeSlide(prevIndex);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="bg-black text-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-20">
          <div className="max-w-2xl">
            <p className="text-orange-500 uppercase tracking-wider mb-4">PORTFOLIO SHOWCASE</p>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">The </span>
              <span className="text-gray-400">Power of Collaboration: </span>
              <span className="text-white">Our Successful Projects.</span>
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center text-orange-500 hover:text-orange-400 transition-colors">
            VIEW ALL WORK <span className="ml-2">→</span>
          </a>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left side - Project info */}
          <div className="lg:col-span-4 animate__animated transition-all duration-500 ease-in-out" style={{ opacity: 1 }}>
            <div className="mb-4">
              <p className="text-gray-400">Client: {activeProject.client}</p>
              <h3 className="text-4xl font-bold mt-2">{activeProject.title}</h3>
            </div>
            <div className="mb-12">
              <span className="inline-block px-4 py-2 rounded-full border border-gray-700 text-sm hover:bg-orange-600 transition-colors cursor-pointer">
                {activeProject.category}
              </span>
            </div>
            <div className="relative h-6">
              <div className="absolute bottom-0 left-0">
                <a href={activeProject.url} className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded transition-colors">
                  View
                </a>
              </div>
            </div>
          </div>

          {/* Right side - Project image */}
          <div className="lg:col-span-8 relative">
            <div className={`rounded-lg overflow-hidden animate__animated ${animationClass}`}>
              <a href={activeProject.url}>
                <div className="relative w-full aspect-[16/9]">
                  <img 
                    src={activeProject.image} 
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-2xl font-bold">
                {currentSlide + 1}<span className="text-gray-500">/{totalSlides}</span>
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
