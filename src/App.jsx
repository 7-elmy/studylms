import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './Layouts/AuthLayout'
 import LoginPage from './Pages/Auth/Login/Login'

import RegisterPage from './Pages/Auth/Register/Register'
import { useTranslation } from 'react-i18next'
import Home from './Pages/Home/Home'
import MainLayout from './Layouts/MainLayout'
import CoursesPage from './Pages/Courses/Courses'
import CourseDetailPage from './Pages/Courses/SingleCourse'

import ContactUs from './Pages/ContactUs/ContactUs'
import NotFound from './Pages/NotFound/NotFound'
import Subscriptions from './Pages/Subscriptions/Subscriptions'
import AssignmentDetails from './Pages/AssignmentDetails/AssignmentDetails'
import ProfilePage from './Pages/Profile/Profile'


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
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />
      
      
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/assignmentDetails/:id" element={<AssignmentDetails />} />
      <Route path="/profile" element={<ProfilePage />} />

    </Route>
       
        <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>

     
    </div>
  )
}

export default App
