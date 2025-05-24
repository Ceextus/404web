import WorkingProcess from '@/components/WorkingComponent'
import WebDevelopmentSection from '@/components/WebDevelopmentSection'
import React from 'react'
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

import { ChevronDown } from "lucide-react";

const page = () => {
  return (
    <div>
     <section className=" z-50 relative h-72 bg-[url('/grad.jpg')] bg-cover bg-center bg-fixed  flex flex-col items-center justify-center px-4">
      {/* Navigation Breadcrumb */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <nav className="flex items-center space-x-2 text-sm">
          <a 
            href="#" 
            className="text-purple-600 hover:text-purple-800 transition-colors duration-200"
          >
            HOME
          </a>
          <span className="text-gray-600">→</span>
          <span className="text-gray-800 font-medium">SERVICES</span>
        </nav>
      </div>

      {/* Main Title */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight">
          Services
        </h1>
      </div>

      {/* Scroll Indicator */}
   <div className='absolute -bottom-8 z-50 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce border border-gray-300 bg-gray-200 rounded-full px-2 py-6  cursor-pointer'>
    <MdOutlineKeyboardDoubleArrowDown className='text-4xl  '/>
   </div>

    </section>
      <WorkingProcess  />
      <WebDevelopmentSection />
    </div>
  )
}

export default page
