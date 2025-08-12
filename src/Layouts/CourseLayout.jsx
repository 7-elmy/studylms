



import { Search, Users, MessageSquare, Star, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

import { Link } from "react-router-dom";
import DynamicBreadcrumb from "../Components/Ui/DynamicBreadcrumb";

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
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
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
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <Link
                    to={`/courses/${course.id}`}>
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
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
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


                  
                   
                   

                  </Link>
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


 {/* Right Sidebar */}
          <div className="lg:w-1/4">
            {/* Course Search */}
            <div className="bg-white rounded-lg shadow-sm  p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">COURSE SEARCH</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Course Categories */}
            <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">COURSE CATEGORIES</h3>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className="text-gray-600 hover:text-blue-600 hover:underline text-left w-full"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>


               {/* Course Intro */}
            <div className="bg-white rounded-lg shadow-sm  p-6 mb-6">
              {type=="course" ?  
              <>
               <h3 className="text-lg font-semibold text-gray-900 mb-4">COURSE INTRO</h3>
              <div className="relative">
                <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  {/* <div className="bg-white rounded-full p-3 shadow-lg">
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-gray-200 border-r-[12px] border-r-transparent ml-1"></div>
                  </div> */}
                </div>
              </div>
              </>
              :
              <>
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Filter</h3>
              <CoursePriceFilter/>
              </>
              }
             
              
            </div>

            {/* Popular Courses */}
            <div className="bg-white rounded-lg shadow-sm  p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">POPULAR COURSES</h3>
              <div className="space-y-4">
                {popularCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-3">
                    <div className="w-16 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {course.title}
                      </h4>
                      <p className={`text-sm font-semibold mt-1 ${
                        course.price === 'FREE' ? 'text-green-600' : 'text-cyan-600'
                      }`}>
                        {course.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}





export  function CoursePriceFilter() {
  const courses = [
    { id: 1, title: "React Basics", price: 50 },
    { id: 2, title: "Advanced JavaScript", price: 100 },
    { id: 3, title: "Node.js Mastery", price: 150 },
    { id: 4, title: "Fullstack Development", price: 200 },
    { id: 5, title: "UI/UX Design", price: 300 }
  ];

  const minPrice = 35;
  const maxPossiblePrice = 335;
  const [minRange, setMinRange] = useState(minPrice);
  const [maxRange, setMaxRange] = useState(maxPossiblePrice);
  const [isFiltered, setIsFiltered] = useState(false);

  // Filter courses based on price range
  const filteredCourses = isFiltered 
    ? courses.filter(c => c.price >= minRange && c.price <= maxRange)
    : courses;

  const handleFilter = () => {
    setIsFiltered(true);
  };

  const handleReset = () => {
    setMinRange(minPrice);
    setMaxRange(maxPossiblePrice);
    setIsFiltered(false);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white">
      {/* Pricing Filter Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-6 text-gray-800">PRICING FILTER</h2>
        
        {/* Range Slider Container */}
        <div className="relative mb-6">
          {/* Track */}
          <div className="w-full h-1 bg-gray-200 rounded-full relative">
            {/* Active range */}
            <div 
              className="absolute h-1 bg-orange-400 rounded-full"
              style={{
                left: `${((minRange - minPrice) / (maxPossiblePrice - minPrice)) * 100}%`,
                width: `${((maxRange - minRange) / (maxPossiblePrice - minPrice)) * 100}%`
              }}
            ></div>
          </div>
          
          {/* Min Range Slider */}
          <input
            type="range"
            min={minPrice}
            max={maxPossiblePrice}
            value={minRange}
            onChange={(e) => setMinRange(Math.min(parseInt(e.target.value), maxRange))}
            className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-auto cursor-pointer slider-thumb"
            style={{ zIndex: 1 }}
          />
          
          {/* Max Range Slider */}
          <input
            type="range"
            min={minPrice}
            max={maxPossiblePrice}
            value={maxRange}
            onChange={(e) => setMaxRange(Math.max(parseInt(e.target.value), minRange))}
            className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-auto cursor-pointer slider-thumb"
            style={{ zIndex: 2 }}
          />
        </div>

        {/* Filter Button and Price Display */}
        <div className="flex items-center space-x-5 justify-between ">
          <button
            onClick={handleFilter}
            className="px-4 py-2 border text-sm border-orange-400 text-orange-400 font-medium hover:bg-orange-50 transition-colors duration-200"
          >
            FILTER
          </button>
          
          <div className="text-gray-600  text-[12px]">
            Price Range : ${minRange} - ${maxRange}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Courses {isFiltered ? `(${filteredCourses.length} results)` : `(${courses.length} total)`}
          </h3>
          {isFiltered && (
            <button
              onClick={handleReset}
              className="px-4 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          )}
        </div>

        {/* 
        <div className="space-y-3">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">{course.title}</span>
              <span className="text-lg font-semibold text-gray-700">${course.price}</span>
            </div>
          ))}
          
          {isFiltered && filteredCourses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No courses found in this price range
            </div>
          )}
        </div> */}
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fb923c;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        
        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fb923c;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
