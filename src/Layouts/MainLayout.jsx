import React from 'react'
import Navbar from '../Pages/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Footer/Footer'
import { ChevronRight, Home } from 'lucide-react'
import ScrollToTop from '../Utils/ScrollTop'
export default function MainLayout() {
  return (
    <div>
      <ScrollToTop/>
      <Navbar/>
     

        <Outlet/>
      <Footer/>
    </div>
  )
}
