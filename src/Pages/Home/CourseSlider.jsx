// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, Users, MessageSquare, Star } from 'lucide-react';

// const CourseSlider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const courses = [
//     {
//       id: 1,
//       title: "French for Beginners to Advanced Training",
//       instructor: "Keny White",
//       price: "$99.00",
//       isFree: false,
//       students: 98,
//       comments: 10,
//       rating: 5,
//       image: "/api/placeholder/300/180",
//       featured: false
//     },
//     {
//       id: 2,
//       title: "Introduction to Mobile Apps Development",
//       instructor: "Sarah Johnson",
//       price: "FREE",
//       students: 150,
//       comments: 3,
//       rating: 4,
//       image: "/api/placeholder/300/180",
//       featured: true
//     },
//     {
//       id: 3,
//       title: "How to Become a Startup Founder",
//       instructor: "Jhon Milton",
//       price: "$85.60",
//       students: 200,
//       comments: 3,
//       rating: 4.5,
//       image: "/api/placeholder/300/180",
//       featured: false
//     },
//     {
//       id: 4,
//       title: "Your Complete Guide to Self Development",
//       instructor: "Peter Parker",
//       price: "$68.00",
//       students: 48,
//       comments: 5,
//       rating: 5,
//       isFree: true,
//       price: "FREE",
//       image: "/api/placeholder/300/180",
//       featured: false
//     },
//     {
//       id: 5,
//       title: "Advanced JavaScript Masterclass",
//       instructor: "Emma Watson",
//       price: "$120.00",
//       students: 89,
//       isfree: false,
//       price: "$120.00",
//       comments: 12,
//       rating: 4.8,
//       image: "/api/placeholder/300/180",
//       featured: false
//     },
//     {
//       id: 6,
//       title: "UI/UX Design Fundamentals",
//       instructor: "David Chen",
//       price: "$75.00",
//       students: 156,
//        isfree: false,
//       price: "$150.00",
//       comments: 8,
//       rating: 4.7,
//       image: "/api/placeholder/300/180",
//       featured: false
//     },
//     {
//       id: 7,
//       title: " Design Fundamentals",
//       instructor: "David Chen",
//       price: "$75.00",
//       students: 156,
//        isfree: false,
//       price: "$150.00",
//       comments: 8,
//       rating: 4.7,
//       image: "/api/placeholder/300/180",
//       featured: false
//     },
//     {
//       id: 8,
//       title: "php Fundamentals",
//       instructor: "David Chen",
//       price: "$75.00",
//       students: 156,
//        isfree: false,
//       price: "$150.00",
//       comments: 8,
//       rating: 4.7,
//       image: "/api/placeholder/300/180",
//       featured: false
//     }
//   ];

//   const itemsPerPage = 4;
//   const maxSlide = Math.max(0, courses.length - itemsPerPage);

//   const nextSlide = () => {
//     setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
//   };

//   const prevSlide = () => {
//     setCurrentSlide(prev => Math.max(prev - 1, 0));
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
//       } else {
//         stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
//       }
//     }
//     return stars;
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-8">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-3xl font-bold text-gray-900">Most Popular Courses</h2>
//         <div className="flex space-x-2">
//           <button
//             onClick={prevSlide}
//             disabled={currentSlide === 0}
//             className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//           >
//             <ChevronLeft className="w-5 h-5 text-gray-600" />
//           </button>
//           <button
//             onClick={nextSlide}
//             disabled={currentSlide >= maxSlide}
//             className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//           >
//             <ChevronRight className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>
//       </div>

//       {/* Slider Container */}
//       <div className="relative overflow-hidden">
//         <div 
//           className="flex transition-transform duration-300 ease-in-out"
//           style={{ transform: `translateX(-${currentSlide * (100 / itemsPerPage)}%)` }}
//         >
//           {courses.map((course) => (
//             <div key={course.id} className="w-1/4 flex-shrink-0 px-3">
//               <div className={`bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer ${
//                 course.featured ? 'border-cyan-300 ring-2 ring-cyan-100' : 'border-gray-200'
//               }`}>
//                 {/* Image */}
//                 <div className="relative">
//                   <div className="w-full h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
//                     <span className="text-yellow-600 text-sm font-medium">Course Image</span>
//                   </div>
                  
//                   {/* Price Badge */}
//                   <div className="absolute top-4 left-4">
//                     <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                       course.price === 'FREE' 
//                         ? 'bg-green-500 text-white' 
//                         : 'bg-cyan-400 text-white'
//                     }`}>
//                       {course.price}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6">
//                   {/* Title */}
//                   <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-custom-yellow transition-colors">
//                     {course.title}
//                   </h3>

//                   {/* Instructor */}
//                   <div className="flex items-center mb-4">
//                     <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mr-3">
//                       <span className="text-cyan-600 text-xs font-medium">
//                         {course.instructor.split(' ').map(n => n[0]).join('')}
//                       </span>
//                     </div>
//                     <span className="text-gray-600 text-sm">{course.instructor}</span>
//                   </div>

//                   {/* Stats and Rating */}
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center text-gray-500 text-sm">
//                         <Users className="w-4 h-4 mr-1" />
//                         <span>{course.students}</span>
//                       </div>
//                       <div className="flex items-center text-gray-500 text-sm">
//                         <MessageSquare className="w-4 h-4 mr-1" />
//                         <span>{course.comments}</span>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center">
//                       {renderStars(course.rating)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Slide Indicators */}
//       <div className="flex justify-center mt-8 space-x-2">
//         {Array.from({ length: maxSlide + 1 }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`w-2 h-2 rounded-full transition-all duration-200 ${
//               index === currentSlide ? 'bg-cyan-400' : 'bg-gray-300'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CourseSlider;


import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, MessageSquare, Star } from 'lucide-react';
import CourseCard from '../../Components/Ui/CourseCard';
import { useTranslation } from 'react-i18next';

const CourseSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const { t, i18n } = useTranslation();
  const courses = [
    {
      id: 1,
      title: "French for Beginners to Advanced Training",
      instructor: "Keny White",
      price: "$99.00",
      students: 98,
      comments: 10,
      rating: 5,
      image: "/api/placeholder/300/180",
      featured: false
    },
    {
      id: 2,
      title: "Introduction to Mobile Apps Development",
      instructor: "Sarah Johnson",
      price: "FREE",
      students: 150,
      comments: 3,
      rating: 4,
      image: "/api/placeholder/300/180",
      featured: true
    },
    {
      id: 3,
      title: "How to Become a Startup Founder",
      instructor: "Jhon Milton",
      price: "$85.60",
      students: 200,
      comments: 3,
      rating: 4.5,
      image: "/api/placeholder/300/180",
      featured: false
    },
    {
      id: 4,
      title: "Your Complete Guide to Self Development",
      instructor: "Peter Parker",
      price: "FREE",
      students: 48,
      comments: 5,
      rating: 5,
      image: "/api/placeholder/300/180",
      featured: false
    },
    {
      id: 5,
      title: "Advanced JavaScript Masterclass",
      instructor: "Emma Watson",
      price: "$120.00",
      students: 89,
      comments: 12,
      rating: 4.8,
      image: "/api/placeholder/300/180",
      featured: false
    },
    {
      id: 6,
      title: "UI/UX Design Fundamentals",
      instructor: "David Chen",
      price: "$150.00",
      students: 156,
      comments: 8,
      rating: 4.7,
      image: "/api/placeholder/300/180",
      featured: false
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSlide = Math.max(0, courses.length - itemsPerPage);

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div dir='ltr' className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {i18n.language =="ar" ?
         <>
        
        <div dir='ltr' className="flex space-x-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide >= maxSlide}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">{t("course.relatedVideos")}</h2>
        
        </>
        :
        <>
        
        <h2 className="text-3xl font-bold text-gray-900">{t("most")}</h2>
        <div dir='ltr' className="flex space-x-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide >= maxSlide}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        </>
        
        }
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * (100 / itemsPerPage)}%)` }}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className={`px-3 flex-shrink-0   ${
                itemsPerPage === 1
                  ? 'w-full'
                  : itemsPerPage === 2
                  ? 'w-1/2'
                  : itemsPerPage === 3
                  ? 'w-1/3'
                  : 'w-1/3'
              }`}
            >
              <CourseCard course={course} renderStars={renderStars}  itemsPerPage={itemsPerPage}/>
              
            </div>

          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: maxSlide + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-cyan-400' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSlider;
