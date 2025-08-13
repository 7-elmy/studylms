



import { Search, Users, MessageSquare, Star, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

import { Link } from "react-router-dom";
import DynamicBreadcrumb from "../Components/Ui/DynamicBreadcrumb";
import SubscriptionModal from "../Components/Ui/SubscriptionModal";
import CourseCard from "../Components/Ui/CourseCard";

export default function CourseLayout({courses , popularCourses,categories ,renderStars ,MainTitle ,Breadcrumb1 , Breadcrumb2 , selectedCategory, setSelectedCategory , searchTerm, setSearchTerm , type="course" }) {
  // const [selectedCategory, setSelectedCategory] = useState("All Courses");
  // const [searchTerm, setSearchTerm] = useState("");

  
 

  return (
    <div className="min-h-screen bg-gray-50">
    
      {/* <div className="bg-gray-400 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-5xl font-bold">{MainTitle}</h1>
        </div>
      </div>

    
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="hover:text-blue-600 cursor-pointer">{Breadcrumb1}</span>
            <span>›</span>
            <span className="text-gray-900">{Breadcrumb2}</span>
          </div>
        </div>
      </div> */}

  

 <DynamicBreadcrumb 
        MainTitle={MainTitle}
        BreadCrumbs={ [
      { label: `${Breadcrumb1}`, href: `/${Breadcrumb1}` },
      { label: `${Breadcrumb2}`},
      
    ]} 
      />


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
         

          {/* Main Content Area */}
          <div className="w-full">
            {/* Results Header */}
                   <div className="relative my-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <p className="text-gray-600">Showing 1-9 of 15 results</p>
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Courses</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div> */}

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <CourseCard course={course} renderStars={renderStars} />
                </div>
                
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold">
                  1
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                  ›
                </button>
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}



