// import React from 'react'

// export default function CourseCategory() {
//       const courseCategories = [
//     {
//       icon: BriefcaseBusiness,
//       title: 'BUSINESS',
//       description: 'Business strategy and management'
//     },
//     {
//       icon: SquarePen,
//       title: 'LANGUAGE',
//       description: 'Learn new languages'
//     },
//     {
//       icon: Code,
//       title: 'PROGRAMMING',
//       description: 'Coding and development'
//     },
//     {
//       icon: Video,
//       title: 'FILM & VIDEO',
//       description: 'Video production and editing'
//     },
//     {
//       icon: Camera,
//       title: 'PHOTOGRAPHY',
//       description: 'Photography techniques'
//     },
//     {
//       icon: Palette,
//       title: 'WEB DESIGN',
//       description: 'Design and user experience'
//     }
//   ];

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
//           {courseCategories.map((category, index) => {
//             const IconComponent = category.icon;
//             return (
//               <div
//                 key={index}
//                 className="group cursor-pointer text-center bg-gray-300 p-4 rounded-md flex flex-col items-center hover:bg-opacity-20 transition-all duration-300"
//               >
//                 <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 mt-2 bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
//                   <IconComponent
//                     className="w-8 h-8 sm:w-10 sm:h-10 text-white"
//                     strokeWidth={1.5}
//                   />
//                 </div>
//                 <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 group-hover:text-yellow-300 transition-colors duration-200">
//                   {category.title}
//                 </h3>
//                 <p className="text-gray-300 text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                   {category.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//   )
// }



import React, { useState } from 'react';
import {
  ChevronDown,
  Search,
  BriefcaseBusiness,
  SquarePen,
  Code,
  Video,
  Camera,
  Palette
} from 'lucide-react';

const CourseSearch = () => {
    
  const courseCategories = [
    {
      icon: BriefcaseBusiness,
      title: 'BUSINESS',
      description: 'Business strategy and management'
    },
    {
      icon: SquarePen,
      title: 'LANGUAGE',
      description: 'Learn new languages'
    },
    {
      icon: Code,
      title: 'PROGRAMMING',
      description: 'Coding and development'
    },
    {
      icon: Video,
      title: 'FILM & VIDEO',
      description: 'Video production and editing'
    },
    {
      icon: Camera,
      title: 'PHOTOGRAPHY',
      description: 'Photography techniques'
    },
    {
      icon: Palette,
      title: 'WEB DESIGN',
      description: 'Design and user experience'
    }
  ];


  return (
    <div className="bg-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Course Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {courseCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="group cursor-pointer shadow-md text-center bg-gray-300 p-4 rounded-md flex flex-col items-center hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 mt-2 bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                  <IconComponent
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 group-hover:text-yellow-300 transition-colors duration-200">
                  {category.title}
                </h3>
                <p className="text-gray-300 text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseSearch;
