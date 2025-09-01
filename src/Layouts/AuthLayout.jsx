import React, { useEffect } from 'react'
import Navbar from '../Pages/Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Pages/Footer/Footer'
import { ChevronRight, Home } from 'lucide-react'
import ScrollToTop from '../Utils/ScrollTop'
export default function AuthLayout() {

  let navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('language')) {
      localStorage.setItem('language', 'en'); // Default to English if no language is set
    }
    if(localStorage.getItem('token')|| sessionStorage.getItem('token')) {
     navigate('/all-lessons');
    
    }

  })
  return (
    <div>
      <ScrollToTop/>
      <Navbar/>
     
    

        <Outlet/>
      <Footer/>
    </div>
  )
}
