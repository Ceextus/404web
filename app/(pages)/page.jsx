import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-purple-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="font-raleway font-bold text-3xl mb-4">
          This uses Raleway font
        </h1>
        
        <p className="font-sans text-base my-3">
          This uses Inter as the default sans font
        </p>
        
        <pre className="font-mono text-sm my-3 p-2 bg-gray-100 rounded">
          This uses JetBrains Mono font
        </pre>
        
        <div className="font-outfit text-lg my-3">
          This text uses Outfit font
        </div>
        
        <div className="font-montserrat text-lg my-3">
          This text uses Montserrat font
        </div>
        
        {/* Explicitly styled elements to ensure fonts are working */}
        <div className="my-6 space-y-3">
          <div style={{ fontFamily: "var(--font-raleway)" }} className="font-bold">
            Inline style: Raleway font
          </div>
          
          <div style={{ fontFamily: "var(--font-inter)" }}>
            Inline style: Inter font
          </div>
          
          <div style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
            Inline style: JetBrains Mono font
          </div>
          
          <div style={{ fontFamily: "var(--font-outfit)" }}>
            Inline style: Outfit font
          </div>
          
          <div style={{ fontFamily: "var(--font-montserrat)" }}>
            Inline style: Montserrat font
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
