import React from 'react'
import Navbar from '../Pages/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Footer/Footer'
import { ChevronRight, Home } from 'lucide-react'
export default function MainLayout() {
  return (
    <div>
      
      <Navbar/>
     

        <Outlet/>
      <Footer/>
    </div>
  )
}
