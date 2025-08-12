import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './Layouts/AuthLayout'
 import LoginPage from './Pages/Auth/Login/Login'

import RegisterPage from './Pages/Auth/Register/Register'
import { useTranslation } from 'react-i18next'
import Home from './Pages/Home/Home'
import MainLayout from './Layouts/MainLayout'
import Home_2 from './Pages/Home_2/Home_2'
import CoursesPage from './Pages/Courses/Courses'
import CourseDetailPage from './Pages/Courses/SingleCourse'
import EventsListing from './Pages/EventList/EventList'
import Shop from './Pages/Shop/Shop'
import ContactUs from './Pages/ContactUs/ContactUs'


function App() {
 let {i18n} =useTranslation()
  return (
    <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
    <BrowserRouter >
        <Routes>
          <Route element={<AuthLayout />}>
      {/* Child routes */}
     
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    

    </Route>
          <Route  element={<MainLayout />}>
      <Route path="/home" element={<Home />} />
      <Route path="/home_2" element={<Home_2 />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />
      <Route path="/eventsList" element={<EventsListing />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/contact" element={<ContactUs />} />

    </Route>
       
        
        </Routes>
      </BrowserRouter>

     
    </div>
  )
}

export default App
