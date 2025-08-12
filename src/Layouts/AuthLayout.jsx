import React from 'react'
import Navbar from '../Pages/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Footer/Footer'
import { ChevronRight, Home } from 'lucide-react'
export default function AuthLayout() {
  return (
    <div>
      
      <Navbar/>
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-gray-400 to-gray-300 py-12 md:py-16 lg:py-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className=''>
            <h1 className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4'>
              My Account
            </h1>
           
          </div>
        </div>
      </div>

      {/* Breadcrumb Section */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8'>
          <div className=' h-12 '>
            
     
            <nav className='flex items-center ml-auto pt-4' aria-label="Breadcrumb">
              <ol className="flex items-center space-x-1 md:space-x-2 text-sm">
                <li className="flex items-center">
                  <a 
                    href="#" 
                    className="flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200 group"
                  >
                    <Home className="w-4 h-4 mr-1 group-hover:text-blue-600 transition-colors" />
                    <span className="font-medium">Home</span>
                  </a>
                </li>
                
                <li className="flex items-center">
                  <ChevronRight className="w-3 h-3 text-gray-400 mx-1 md:mx-2" />
                  <span className="text-gray-700 font-medium" aria-current="page">
                    My Account
                  </span>
                </li>
              </ol>
            </nav>
            
          </div>
        </div>
      </div>

        <Outlet/>
      <Footer/>
    </div>
  )
}
