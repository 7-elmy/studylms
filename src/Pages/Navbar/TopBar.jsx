// import React from 'react'

// export default function TopBar() {
//   return (
//     <>
//          <div className="bg-gray-900 text-gray-300  text-sm hidden md:block">
//            <div className=" w-full  md:w-[80%] mx-auto">
//              <div className="flex flex-wrap items-center  justify-between">
//                <div className="w-full md:w-auto ">
//                  <ul className="flex  ">
//                    <li>
//                      <a href="tel:+611234567890" className="flex items-center py-2  ps-2 pe-4 border-gray-500 border-s-2  border-e-2 hover:text-white">
//                        <span className="hidden md:inline mr-1  text-white">Call:</span>
//                        <span className="font-medium">+(61) 123 456 7890</span>
//                        <i className="md:hidden ml-2 fas fa-phone-square"></i>
//                      </a>
//                    </li>
//                    <li>
//                      <a href="mailto:example@domain.com" className="flex items-center ps-2 py-2 pe-4 border-gray-500   border-e-2 hover:text-white">
//                        <span className="hidden md:inline mr-1 text-white">Email:</span>
//                        <span className="font-medium">example@domain.com</span>
//                        <i className="md:hidden ml-2 fas fa-envelope-square"></i>
//                      </a>
//                    </li>
//                  </ul>
//                </div>
//                <div className="w-full  md:w-auto">
//                  <ul className="flex justify-end font-medium  bg-custom-yellow text-gray-500 space-x-6 p-1 rounded-xs">
//                    <li>
//                      <a href="#popup1" className="hover:text-white">Login</a>
//                      <span className="mx-2">|</span>
//                      <a href="#popup2" className="hover:text-white">Register</a>
//                    </li>
//                  </ul>
//                </div>
//              </div>
//            </div>
//          </div>


//          <div className="bg-gray-900 text-gray-300  text-sm md:hidden block">
//            <div className=" w-full  md:w-[80%] mx-auto">
//              <div className="flex flex-wrap items-center  justify-between">
//                <div className="w-[90%] mx-auto md:w-auto ">
//                  <ul className="flex  ">
//                    <li>
//                      <a href="tel:+611234567890" className="flex items-center py-2  ps-2 pe-4 border-gray-500 border-s-2  border-e-2 hover:text-white">
//                        <span className="hidden md:inline mr-1  text-white">Call:</span>
//                        <span className="font-medium">+(61) 123 456 7890</span>
//                        <i className="md:hidden ml-2 fas fa-phone-square"></i>
//                      </a>
//                    </li>
//                    <li>
//                      <a href="mailto:example@domain.com" className="flex items-center ps-2 py-2 pe-4 border-gray-500   border-e-2 hover:text-white">
//                        <span className="hidden md:inline mr-1 text-white">Email:</span>
//                        <span className="font-medium">example@domain.com</span>
//                        <i className="md:hidden ml-2 fas fa-envelope-square"></i>
//                      </a>
//                    </li>
//                  </ul>
//                </div>
//                <div className="w-[120px] mx-auto my-3  md:w-auto">
//                  <ul className="flex justify-end font-medium  bg-custom-yellow text-gray-500 space-x-6 p-1 rounded-xs">
//                    <li>
//                      <a href="#popup1" className="hover:text-white">Login</a>
//                      <span className="mx-2">|</span>
//                      <a href="#popup2" className="hover:text-white">Register</a>
//                    </li>
//                  </ul>
//                </div>
//              </div>
//            </div>
//          </div>
    
    
//     </>
//   )
// }



import React from 'react'
import { Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TopBar() {
  return (
    <div className="bg-gray-900 text-gray-300 text-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-2">
          
          {/* Contact Information */}
          <div className="flex items-center space-x-0 mb-3 md:mb-0">
            <a 
              href="tel:+611234567890" 
              className="flex items-center px-4 py-2 border-r border-gray-600 hover:text-white transition-colors duration-200 group"
            >
              <Phone className="w-4 h-4 mr-2 text-yellow-500 group-hover:text-white transition-colors md:hidden" />
              <span className="hidden md:inline mr-2 text-white font-medium">Call:</span>
              <span className="text-gray-300 group-hover:text-white transition-colors">+(61) 123 456 7890</span>
            </a>
            
            <a 
              href="mailto:example@domain.com" 
              className="flex items-center px-4 py-2 hover:text-white transition-colors duration-200 group"
            >
              <Mail className="w-4 h-4 mr-2 text-yellow-500 group-hover:text-white transition-colors md:hidden" />
              <span className="hidden md:inline mr-2 text-white font-medium">Email:</span>
              <span className="text-gray-300 group-hover:text-white transition-colors">example@domain.com</span>
            </a>
          </div>

          {/* Authentication Links */}
          <div className="flex items-center">
            <div className="bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200 px-4 py-1 ">
              <div className="flex items-center space-x-1 text-gray-500 font-medium">
                <Link
                  to="/" 
                  className="hover:text-gray-700 transition-colors text-[12px]  duration-200"
                >
                  Login
                </Link>
                <span className="text-gray-700 mx-2">|</span>
                <Link
                  to="/register" 
                  className="hover:text-gray-700  text-[12px] transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}