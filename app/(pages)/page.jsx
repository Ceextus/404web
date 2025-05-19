import AboutSection from '@/components/AboutSection'
import HeroSlider from '@/components/HeroSlider'
import Projects from '@/components/Projects'
import Core from '@/components/Core'
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
       <Projects/>
       <Core/>
    </div>
  )
}

export default page
