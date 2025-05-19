import { Phone, MessageSquare, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DexfliQCoreValues() {
  return (
    <div className="flex flex-col md:flex-row w-full bg-white rounded-lg overflow-hidden shadow-lg font-montserrat ">
      {/* Left side image section */}
      <div className="w-full md:w-1/2 h-64 md:h-auto relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 opacity-10"></div>
        <Image 
          src={"/bussines.jpg"}
          width={500}
          height={500}
          alt="Business professionals in a meeting" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Right side content section */}
      <div className="w-full md:w-1/2 bg-blue-100 p-6 md:p-8 font-montserrat ">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 w-[85%] mx-auto py-8">Our Core Values: What Drives DexfliQ.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[85%] mx-auto">
          {/* Integrity */}
          <div className="col-span-1">
              <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Integrity</h3>
            </div>
            <p className="text-sm text-gray-600">
              At DexfliQ, we uphold the highest ethical standards, ensuring honesty and transparency in every project we undertake.
            </p>
          </div>
          
          {/* Expertise */}
          <div className="col-span-1">
              <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Expertise</h3>
            </div>
            <p className="text-sm text-gray-600">
              Our team of skilled professionals brings deep knowledge and experience to deliver cutting-edge solutions tailored to your business needs.
            </p>
          </div>
          
          {/* Trust and Confidentiality */}
          <div className="col-span-1">
              <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Trust and Confidentiality</h3>
            </div>
            <p className="text-sm text-gray-600">
              We prioritize building strong, trusted relationships with our clients, maintaining strict confidentiality to protect your sensitive information.
            </p>
          </div>
          
          {/* Accountability */}
          <div className="col-span-1 ">
              <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Accountability</h3>
            </div>
            <p className="text-sm text-gray-600">
              We take full responsibility for our work, ensuring that every project is delivered with the highest quality and on time, meeting your expectations.
            </p>
          </div>
        </div>
        
        {/* Contact section */}
        <div className="mt-8 pt-6 border-t border-gray-200 relative top-20 max-lg:top-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <p className="text-xs text-gray-500 mb-2">Any Question? Chat or call any of these numbers:</p>
              <div className="flex flex-col">
                <div className="flex items-center text-gray-700 text-sm">
                  <Phone size={14} className="mr-1" />
                  <Link href="tel:+2348100311203" className="hover:underline">+2348100311203</Link>
                </div>
                <div className="flex items-center text-gray-700 text-sm">
                  <MessageSquare size={14} className="mr-1" />
                  <Link href="tel:+2349068262592" className="hover:underline">+2349068262592</Link>
                </div>
              </div>
            </div>
            
            <button className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Request A Quote
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}