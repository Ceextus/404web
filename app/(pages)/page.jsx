import AboutSection from '@/components/AboutSection'
import HeroSlider from '@/components/HeroSlider'
import Mouse from '@/components/Mouse'
import WebDevelopmentSection from '@/components/WebDevelopmentSection'
import WorkingComponent from '@/components/WorkingComponent'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroSlider/>
      landing page
      {/* <Mouse/> */}
      <AboutSection/> 
       <WebDevelopmentSection/>
       <WorkingComponent/>        
    </div>
  )
}

export default page
