import React, { useState } from 'react';
import { Calendar, User, ArrowRight, ExternalLink } from 'lucide-react';

const RecentNews = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const newsItems = [
    {
      id: 1,
      title: "Best Educational Psd Template Launching Today",
      excerpt: "Areas tackled in the most fundamental parts of medical research include cellular and molecular biology...",
      date: "MAR 05, 2017",
      author: "ANDREW CASET",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      featured: true
    },
    {
      id: 2,
      title: "10 New Online Courses For Creative Students",
      excerpt: "Areas tackled in the most fundamental parts of medical research include cellular and molecular biology...",
      date: "MAR 05, 2017",
      author: "ANDREW CASET",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Recent News
          </h1>
          <div className="flex items-center justify-center mb-4">
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl px-4">
              Share your work to collaborate with our vibrant design element.
            </p>
          </div>
          <div className="w-16 sm:w-20 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {newsItems.map((item, index) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* News Card */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                
                {/* Yellow Top Border */}
                <div className={`h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 transform origin-left transition-all duration-500 ${
                  hoveredCard === item.id ? 'scale-x-100' : 'scale-x-0'
                }`}></div>

                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover transform transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Image Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 ${
                    hoveredCard === item.id ? 'opacity-100' : ''
                  }`}></div>
                  
                  {/* Floating Action Button */}
                  <div className={`absolute top-4 right-4 bg-yellow-400 text-white p-2 rounded-full shadow-lg transform transition-all duration-300 ${
                    hoveredCard === item.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}>
                    <ExternalLink className="w-4 h-4" />
                  </div>

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8">
                  {/* Title */}
                  <h3 className={`text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-tight transition-colors duration-300 ${
                    hoveredCard === item.id ? 'text-yellow-600' : ''
                  }`}>
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                    {item.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                      {/* Date */}
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {item.date}
                      </div>
                      
                      {/* Author */}
                      <div className="flex items-center text-gray-500 text-sm">
                        <User className="w-4 h-4 mr-2" />
                        {item.author}
                      </div>
                    </div>

                    {/* Read More Button */}
                    <div className={`flex items-center text-yellow-500 font-semibold text-sm transition-all duration-300 ${
                      hoveredCard === item.id ? 'transform translate-x-2' : ''
                    }`}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


       
      </div>

      {/* Floating Yellow Arrow */}
      {/* <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 flex items-center justify-center">
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div> */}
    </div>
  );
};

export default RecentNews;