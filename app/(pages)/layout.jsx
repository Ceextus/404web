import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import Prenav from '@/components/Prenav'
import React from 'react'

const layout = ({children}) => {
  return (
    <div >
      <Prenav/>
      <Nav/>
      {children}
      <Footer/>
    </div>
  )
}

export default layout
