"use client";
import React, { useState, useEffect } from "react";

const WorkingProcess = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(6 / itemsPerPage);

  const steps = [
    {
      number: "01",
      title: "Brainstorming",
      description:
        "This is the initial phase where ideas are generated through open discussions. It focuses on exploring various possibilities and formulating strategies to align with the project's goals.",
    },
    {
      number: "02",
      title: "Research",
      description:
        "In this phase, detailed research is conducted to gather insights, understand the market or problem, and approach the project with well-informed decisions.",
    },
    {
      number: "03",
      title: "Adjusting",
      description:
        "Based on the research, adjustments are made to fine-tune strategies or solutions. Information is analyzed and refined to better suit the project's objectives.",
    },
    {
      number: "04",
      title: "Implementation",
      description:
        "The final phase where all the planning and research is put into action. This is where we execute the strategies developed earlier and track progress towards objectives.",
    },
    {
      number: "05",
      title: "Testing",
      description:
        "A critical phase where the implemented solution undergoes thorough testing to ensure it meets all requirements and functions as intended without issues or errors.",
    },
    {
      number: "06",
      title: "Deployment",
      description:
        "The final stage where the completed project is launched and made available to users. This includes monitoring initial performance and addressing any immediate feedback.",
    },
  ];

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-orange-500 font-medium mb-2">
            OUR WORKING PROCESS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-black">A Clear Path </span>
            <span className="text-gray-400">Through Our</span>
            <br />
            <span className="text-black">Development Process.</span>
          </h2>

          <div className="mt-8">
            <button className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors">
              Contact More Info
            </button>
          </div>

          {/* Timeline progress indicator */}
          <div className="relative mt-12">
            <div className="absolute top-7 left-0 right-0 h-0.5 bg-gray-200">
              {/* Progress indicator */}
              <div
                className="absolute top-0 left-0 h-full bg-orange-600 transition-all duration-500"
                style={{ width: `${(currentPage / (totalPages - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Custom slider component */}
        <div className="mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0 flex gap-6">
                {steps
                  .slice(
                    pageIndex * itemsPerPage,
                    (pageIndex + 1) * itemsPerPage
                  )
                  .map((step, stepIndex) => (
                    <div
                      key={pageIndex * itemsPerPage + stepIndex}
                      className="w-1/3 flex-shrink-0 px-4"
                    >
                      <div className="text-8xl font-bold text-gray-200 mb-4 mt-4 cursor-pointer hover:[text-shadow:-1px_-1px_0_#9333ea,1px_-1px_0_#9333ea,-1px_1px_0_#9333ea,1px_1px_0_#9333ea] transition-all duration-500">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                      <p className="text-gray-500 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center items-center mt-12 gap-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentPage === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
            }
            disabled={currentPage === totalPages - 1}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentPage === totalPages - 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
