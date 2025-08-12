import React from 'react'
import LearningPlatformHero from './LearningPlatformHero'
import CourseSlider from '../Home/CourseSlider'
import CourseCategory from '../CourseCategory/CourseCategory'
import HowClassesWork from './HowClassesWork'
import RecentNews from './RecentNews'
import InstructorsPage from './Instructor'

export default function Home_2() {
  return (
    <div>
      <LearningPlatformHero/>

      <CourseSlider/>

      <CourseCategory/>
      <HowClassesWork/>
      <RecentNews/>
      <InstructorsPage/>

    </div>
  )
}
