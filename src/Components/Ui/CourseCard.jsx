import React from 'react'
import SubscriptionModal from './SubscriptionModal'
import { Link } from 'react-router-dom'
import { MessageSquare, Users } from 'lucide-react'


export default function CourseCard({course , renderStars }) {
  return (
    <div  className='border border-gray-300  rounded-lg min-h-[420px]'>
                {/* Course Image */}
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg"></div>
                    {/* Price Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        course.price === 'FREE' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-cyan-500 text-white'
                      }`}>
                        {course.price}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <SubscriptionModal/>
                        {/* <button className="px-3 py-1 cursor-pointer text-sm font-medium bg-amber-400 p-1  rounded-md">subscription</button> */}
                      
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6 ">
                    <Link to={`/courses/${course.id}`} className="text-custom-yellow underline text-right">view Details</Link>
                    <h3 className="text-lg font-semibold text-gray-900 my-3 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    {/* Instructor */}
                    <div className="flex items-center mb-4">
                      <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">{course.instructor}</span>
                    </div>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{course.students}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          <span>{course.comments}</span>
                        </div>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center">
                        {renderStars(course.rating)}
                      </div>
                    </div>
                  </div>
                </div>
  )
}
