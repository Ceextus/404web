"use client"
import React, { useState } from 'react'
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md'
import { ArrowUpRight } from 'lucide-react'
import Projects from '@/components/Projects'
import Btn from '@/components/Btn'

const page = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      client: 'biggest',
      title: 'Car Dealership',
      category: 'Web Development',
      image: '/project1.jpg',
      url: '/projects/car-dealership',
      description: 'Modern automotive platform with advanced search and booking system'
    },
    {
      id: 2,
      client: 'tech-co',
      title: 'Mobile Banking',
      category: 'App Development',
      image: '/project2.jpg',
      url: '/projects/mobile-banking',
      description: 'Secure mobile banking solution with biometric authentication'
    },
    {
      id: 3,
      client: 'creative-agency',
      title: 'Brand Identity',
      category: 'UI/UX Design',
      image: '/project3.jpg',
      url: '/projects/brand-identity',
      description: 'Complete brand redesign with modern visual identity system'
    },
    {
      id: 4,
      client: 'creative-agency',
      title: 'E-commerce Platform',
      category: 'Web Development',
      image: '/project4.jpg',
      url: '/projects/ecommerce',
      description: 'Next-generation shopping experience with AI recommendations'
    }
  ];

  return (
    <div>
      <div className="relative w-full min-h-[300px] bg-[url('/grad.jpg')] bg-cover bg-center bg-fixed h-77 flex flex-col items-center justify-center px-4 font-montserrat">
        {/* Breadcrumb navigation */}
        {/* Navigation Breadcrumb */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <nav className="flex items-center space-x-2 text-sm text-black">
            <a 
              href="#" 
              className="text-purple-600 hover:text-purple-800 transition-colors duration-200"
            >
              HOME
            </a>
            <span className="text-gray-600">→</span>
            <span className="text-gray-800 font-medium">Portfolio</span>
          </nav>
        </div>

        {/* Main Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Portfolio
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div className='absolute -bottom-8 z-50 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce border border-gray-300 bg-gray-200 rounded-full px-2 py-6 cursor-pointer'>
          <MdOutlineKeyboardDoubleArrowDown className='text-4xl' />
        </div>
      </div>

      {/* Portfolio Grid Section */}
      <section className="bg-black text-white py-16 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-20">
            <div className="max-w-2xl">
            
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-white">The </span>
                <span className="text-gray-400">Power of Collaboration: </span>
                <span className="text-white">Our Successful Projects.</span>
              </h2>
            </div>
         
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl bg-gray-900 cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  transform: hoveredProject === project.id ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                {/* Project Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-orange-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  
                  {/* Hover Overlay */}
                  <div 
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-400 z-20 flex items-center justify-center"
                  >
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center gap-2">
                        View Project
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 relative">
                  {/* Background decoration */}
                  <div 
                    className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-orange-500 to-purple-600 group-hover:h-full transition-all duration-500 delay-200"
                  />
                  
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                        Client: {project.client}
                      </p>
                      <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                    <div 
                      className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 delay-100"
                    >
                      <ArrowUpRight className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 rounded-full border border-gray-700 text-sm text-gray-300 group-hover:border-orange-500 group-hover:text-orange-400 transition-all duration-300">
                      {project.category}
                    </span>
                  </div>

                  {/* Description that slides up on hover */}
                  <div className="overflow-hidden">
                    <p 
                      className="text-gray-400 text-sm mt-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-400 delay-200"
                    >
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/30 rounded-2xl transition-all duration-400" />
              </div>
            ))}
          </div>

          
        </div>
       <span className='flex items-center justify-center mt-10'>
         <Btn/>
       </span>
      </section>

      <Projects />
    </div>
  )
}

export default page