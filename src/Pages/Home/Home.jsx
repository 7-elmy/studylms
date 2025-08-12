import React from 'react'
import MainSlider from './SilderSwiper'
import { Features } from 'tailwindcss'
import FutureSection from './FeaturesSection'
import CourseSlider from './CourseSlider'
// import Statistics from './Statistics'
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents'
// import CourseSearch from '../UpcomingEvents/CourseSectionSearch'
import CoachingTrainingPage from '../CoachingTraining/CoachingTraining'
import TestimonialSection from '../TestimonialSection/TestimonialSection'
import RecentNewsSection from '../RecentNewsSection/RecentNewsSection'
import NewsletterSignup from '../NewLetterSignup/NewLetterSignup'

export default function Home() {
  return (
    <>
    <div className=' relative  bg-gray-800'>
<MainSlider/>

{/* <div className=' absolute 
    bottom-0
    left-1/2 
    transform 
    -translate-x-1/2 
    translate-y-1/2
    z-10 
    w-[95%]
    sm:w-[90%] 
    md:w-[85%] 
    lg:w-[80%] 
    xl:w-[75%]
    max-w-7xl
    px-4
    sm:px-0
  '>

      <FutureSection/>
</div> */}
<div className=' md:absolute bottom-[0.5px] left-[8px] md:left-[80px] lg:left-[180px] z-10 md:w-[80%]  w-full'>
      <FutureSection/>
</div>
    </div>

    <div className='mt-16'>

    <CourseSlider/>
    </div>

    {/* <Statistics/> */}

    <UpcomingEvents/>


    {/* <CourseSearch/> */}

    <CoachingTrainingPage/>

<TestimonialSection/>

<RecentNewsSection/>
<NewsletterSignup/>
    
    </>
  )
}
