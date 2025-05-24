import React from 'react'
import { TbArrowBadgeDown } from "react-icons/tb";
import { Shield, Settings, BarChart3 } from "lucide-react"
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';

const AboutUsHeader = () => {
  return (
    <section>
      <div className="relative w-full min-h-[300px] bg-[url('/grad.jpg')] bg-cover bg-center bg-fixed  h-77  flex flex-col items-center justify-center px-4 font-montserrat">
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
                <span className="text-gray-800 font-medium">About Us</span>
              </nav>
            </div>
      
            {/* Main Title */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                About Us
              </h1>
            </div>
      
            {/* Scroll Indicator */}
         <div className='absolute -bottom-8 z-50 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce border border-gray-300 bg-gray-200 rounded-full px-2 py-6  cursor-pointer'>
          <MdOutlineKeyboardDoubleArrowDown className='text-4xl  '/>
         </div>
    </div>

    <section className="max-w-screen-xl mx-auto px-4 py-12">
      {/* Who We Are Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
        <p className="text-gray-700 mb-4">
          DexfliQ is a leading company specializing in developing and deploying technologies for efficient 
          business management. With a team of software experts, we create innovative solutions that 
          enhance activities in the academic, business, and social sectors.
        </p>
        <p className="text-gray-700 mb-4">
          We believe in building strong relationships with our clients through close collaboration and 
          understanding of their needs. This approach allows us to build mutual trust and provide tailored 
          advice. Our experts suggest suitable technologies that can transform and enhance your business 
          operations, ensuring you receive high-quality services at reasonable costs.
        </p>
        <p className="text-gray-700 mb-4">
          At DexfliQ, we promote a work environment based on trust, respect, timeliness, objectivity, 
          perfection, effective communication, compliance with policies and processes, corporate loyalty, and 
          swift execution. We are always ready to take on new challenges and deliver results that exceed 
          expectations.
        </p>
      </div>

      {/* Vision Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Vision</h2>
        <p className="text-gray-700 mb-4">
          Our vision is to be the global leader in technology development, recognized for our commitment to 
          excellence and innovation. We aim to transform the way people work and live, creating a future 
          where technology seamlessly integrates into everyday life, fostering greater efficiency, 
          collaboration, and success.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Mission</h2>
        <p className="text-gray-700 mb-4">
          At DexfliQ, our mission is to empower businesses and individuals through innovative technology 
          solutions. We strive to enhance productivity, streamline processes, and drive growth by delivering 
          cutting-edge software that meets the evolving needs of our clients in the academic, business, and 
          social sectors.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="bg-purple-50 p-6 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-gray-700" />
          </div>
          <h3 className="text-lg font-semibold mb-3">Reliability and Security</h3>
          <p className="text-sm text-gray-600">
            We prioritize reliability and security, delivering dependable solutions that protect your 
            business from risks while ensuring smooth, uninterrupted operations.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-purple-50 p-6 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <Settings className="w-12 h-12 text-gray-700" />
          </div>
          <h3 className="text-lg font-semibold mb-3">Reasonable Maintenance Costs</h3>
          <p className="text-sm text-gray-600">
            We offer maintenance services at competitive rates, ensuring that your systems remain 
            optimized and up-to-date without straining your budget.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-purple-50 p-6 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <BarChart3 className="w-12 h-12 text-gray-700" />
          </div>
          <h3 className="text-lg font-semibold mb-3">Fast Customer Service</h3>
          <p className="text-sm text-gray-600">
            Our dedicated team provides fast, efficient customer service, resolving issues promptly 
            and ensuring your business stays on track with minimal downtime.
          </p>
        </div>
      </div>

      {/* Social Share - Right Side */}
      <div className="mt-10 md:mt-0">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">Social Share</h3>
        </div>
        <div className="flex gap-4">
          <a href="#" className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
            <span className="sr-only">LinkedIn</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a href="#" className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
            <span className="sr-only">Facebook</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
            <span className="sr-only">Twitter</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
            <span className="sr-only">Instagram</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
    </section>
    
  )
}

export default AboutUsHeader