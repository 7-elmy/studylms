// import { Search, Users, MessageSquare, Star, ChevronDown } from "lucide-react";
// import { useState } from "react";

// export default function CoursesPage() {
//   const [selectedCategory, setSelectedCategory] = useState("All Courses");
//   const [searchTerm, setSearchTerm] = useState("");

//   const courses = [
//     {
//       id: 1,
//       title: "French for Beginners to Advanced Training",
//       instructor: "Keny White",
//       price: "$99.00",
//       students: 98,
//       comments: 10,
//       rating: 5,
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 2,
//       title: "Introduction to Mobile Apps Development",
//       instructor: "Sarah Johnson",
//       price: "FREE",
//       students: 200,
//       comments: 3,
//       rating: 4,
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 3,
//       title: "How to Become a Startup Founder",
//       instructor: "Jhon Milton",
//       price: "$85.60",
//       students: 200,
//       comments: 3,
//       rating: 4.5,
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 4,
//       title: "Complete Web Development Bootcamp",
//       instructor: "Mike Davis",
//       price: "FREE",
//       students: 150,
//       comments: 8,
//       rating: 5,
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 5,
//       title: "Advanced JavaScript Concepts",
//       instructor: "Lisa Chen",
//       price: "$48.00",
//       students: 120,
//       comments: 15,
//       rating: 4.5,
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 6,
//       title: "Digital Marketing Masterclass",
//       instructor: "Tom Wilson",
//       price: "$75.00",
//       students: 180,
//       comments: 12,
//       rating: 4,
//       image: "/api/placeholder/300/200"
//     }
//   ];

//   const categories = [
//     "Business",
//     "Design", 
//     "Programing Language",
//     "Photography",
//     "Language",
//     "Life Style",
//     "IT & Software"
//   ];

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;
    
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
//     }
    
//     if (hasHalfStar) {
//       stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
//     }
    
//     const remainingStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
//     }
    
//     return stars;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header Banner */}
//       <div className="bg-gray-400 px-6 py-16">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-white text-5xl font-bold">Courses</h1>
//         </div>
//       </div>

//       {/* Breadcrumb */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center space-x-2 text-gray-600">
//             <span className="hover:text-blue-600 cursor-pointer">Home</span>
//             <span>›</span>
//             <span className="text-gray-900">Courses</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
          
       

//           {/* Main Content Area */}
//           <div className="lg:w-3/4">
//             {/* Results Header */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//               <p className="text-gray-600">Showing 1-9 of 15 results</p>
//               <div className="relative">
//                 <select 
//                   className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                   <option>All Courses</option>
//                   {categories.map((category) => (
//                     <option key={category} value={category}>{category}</option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               </div>
//             </div>

//             {/* Courses Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {courses.map((course) => (
//                 <div key={course.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300">
//                   {/* Course Image */}
//                   <div className="relative">
//                     <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg"></div>
//                     {/* Price Badge */}
//                     <div className="absolute top-4 left-4">
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         course.price === 'FREE' 
//                           ? 'bg-green-500 text-white' 
//                           : 'bg-cyan-500 text-white'
//                       }`}>
//                         {course.price}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Course Content */}
//                   <div className="p-6">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
//                       {course.title}
//                     </h3>
                    
//                     {/* Instructor */}
//                     <div className="flex items-center mb-4">
//                       <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
//                       <span className="text-sm text-gray-600">{course.instructor}</span>
//                     </div>

//                     {/* Course Stats */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-4 text-sm text-gray-500">
//                         <div className="flex items-center">
//                           <Users className="w-4 h-4 mr-1" />
//                           <span>{course.students}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <MessageSquare className="w-4 h-4 mr-1" />
//                           <span>{course.comments}</span>
//                         </div>
//                       </div>
                      
//                       {/* Rating */}
//                       <div className="flex items-center">
//                         {renderStars(course.rating)}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Load More Button */}
//             <div className="text-center mt-12">
//               <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
//                 Load More Courses
//               </button>
//             </div>
//           </div>


//              {/* Sidebar */}
//           <div className="lg:w-1/4">
//             {/* Course Search */}
//             <div className="bg-white rounded-lg shadow-sm  p-6 mb-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">COURSE SEARCH</h3>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               </div>
//             </div>

//             {/* Course Categories */}
//             <div className="bg-white rounded-lg shadow-sm  p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">COURSE CATEGORIES</h3>
//               <ul className="space-y-3">
//                 {categories.map((category) => (
//                   <li key={category}>
//                     <button
//                       className="text-gray-600 hover:text-blue-600 hover:underline text-left w-full"
//                       onClick={() => setSelectedCategory(category)}
//                     >
//                       {category}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//---------------------------------------------------------------------------------------------------------
// import { Search, Users, MessageSquare, Star, ChevronDown } from "lucide-react";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function CoursesPage() {
//   const [selectedCategory, setSelectedCategory] = useState("All Courses");
//   const [searchTerm, setSearchTerm] = useState("");

//   const courses = [
//     {
//       id: 1,
//       title: "French for Beginners to Advanced Training",
//       instructor: "Keny White",
//       price: "$99.00",
//       students: 98,
//       comments: 10,
//       rating: 5,
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 2,
//       title: "Introduction to Mobile Apps Development",
//       instructor: "Sarah Johnson",
//       price: "FREE",
//       students: 200,
//       comments: 3,
//       rating: 4,
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 3,
//       title: "How to Become a Startup Founder",
//       instructor: "Jhon Milton",
//       price: "$85.60",
//       students: 200,
//       comments: 3,
//       rating: 4.5,
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 4,
//       title: "Your Complete Guide to Self Development",
//       instructor: "Sarah Johnson",
//       price: "FREE",
//       students: 48,
//       comments: 5,
//       rating: 5,
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 5,
//       title: "Adobe InDesign CS6 Tutorial Beginners",
//       instructor: "Ans Niversity",
//       price: "$68.00",
//       students: 48,
//       comments: 5,
//       rating: 5,
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 6,
//       title: "Swift Programming for Beginners",
//       instructor: "Don Cooper",
//       price: "$75.00",
//       students: 48,
//       comments: 5,
//       rating: 5,
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 7,
//       title: "Become a Professional Film Maker",
//       instructor: "Don Cooper",
//       price: "$89.00",
//       students: 48,
//       comments: 5,
//       rating: 5,
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 8,
//       title: "Branding like a professional in 10 days",
//       instructor: "Logancee Wok",
//       price: "$55.00",
//       students: 48,
//       comments: 5,
//       rating: 5,
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 9,
//       title: "Anatomy for Figure Drawing Mastering Figure",
//       instructor: "Keny White",
//       price: "FREE",
//       students: 48,
//       comments: 5,
//       rating: 5,
//       image: "/api/placeholder/300/200"
//     }
//   ];

//   const popularCourses = [
//     {
//       id: 1,
//       title: "Introduction To Mobile Apps Development",
//       price: "$99.00",
//       image: "/api/placeholder/80/60"
//     },
//     {
//       id: 2,
//       title: "Become A Professional Film Maker",
//       price: "FREE",
//       image: "/api/placeholder/80/60"
//     },
//     {
//       id: 3,
//       title: "Swift Programming For Beginners",
//       price: "$75.00",
//       image: "/api/placeholder/80/60"
//     }
//   ];

//   const categories = [
//     "Business",
//     "Design", 
//     "Programing Language",
//     "Photography",
//     "Language",
//     "Life Style",
//     "IT & Software"
//   ];

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;
    
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
//     }
    
//     if (hasHalfStar) {
//       stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
//     }
    
//     const remainingStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
//     }
    
//     return stars;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header Banner */}
//       <div className="bg-gray-400 px-6 py-16">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-white text-5xl font-bold">Courses</h1>
//         </div>
//       </div>

//       {/* Breadcrumb */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center space-x-2 text-gray-600">
//             <span className="hover:text-blue-600 cursor-pointer">Home</span>
//             <span>›</span>
//             <span className="text-gray-900">Courses</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
          
         

//           {/* Main Content Area */}
//           <div className="lg:w-3/4">
//             {/* Results Header */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//               <p className="text-gray-600">Showing 1-9 of 15 results</p>
//               <div className="relative">
//                 <select 
//                   className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                   <option>All Courses</option>
//                   {categories.map((category) => (
//                     <option key={category} value={category}>{category}</option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               </div>
//             </div>

//             {/* Courses Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {courses.map((course) => (
//                 <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
//                   <Link
                  
//                     to={`/courses/${course.id}`}>
//                   {/* Course Image */}
//                   <div className="relative">
//                     <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg"></div>
//                     {/* Price Badge */}
//                     <div className="absolute top-4 left-4">
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         course.price === 'FREE' 
//                           ? 'bg-green-500 text-white' 
//                           : 'bg-cyan-500 text-white'
//                       }`}>
//                         {course.price}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Course Content */}
//                   <div className="p-6">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
//                       {course.title}
//                     </h3>
                    
//                     {/* Instructor */}
//                     <div className="flex items-center mb-4">
//                       <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
//                       <span className="text-sm text-gray-600">{course.instructor}</span>
//                     </div>

//                     {/* Course Stats */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-4 text-sm text-gray-500">
//                         <div className="flex items-center">
//                           <Users className="w-4 h-4 mr-1" />
//                           <span>{course.students}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <MessageSquare className="w-4 h-4 mr-1" />
//                           <span>{course.comments}</span>
//                         </div>
//                       </div>
                      
//                       {/* Rating */}
//                       <div className="flex items-center">
//                         {renderStars(course.rating)}
//                       </div>
//                     </div>
//                   </div>


                  
                   
                   

//                   </Link>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center mt-12">
//               <div className="flex items-center space-x-2">
//                 <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold">
//                   1
//                 </button>
//                 <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
//                   2
//                 </button>
//                 <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
//                   ›
//                 </button>
//               </div>
//             </div>
//           </div>


//  {/* Right Sidebar */}
//           <div className="lg:w-1/4">
//             {/* Course Search */}
//             <div className="bg-white rounded-lg shadow-sm  p-6 mb-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">COURSE SEARCH</h3>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               </div>
//             </div>

//             {/* Course Categories */}
//             <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">COURSE CATEGORIES</h3>
//               <ul className="space-y-3">
//                 {categories.map((category) => (
//                   <li key={category}>
//                     <button
//                       className="text-gray-600 hover:text-blue-600 hover:underline text-left w-full"
//                       onClick={() => setSelectedCategory(category)}
//                     >
//                       {category}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>


//                {/* Course Intro */}
//             <div className="bg-white rounded-lg shadow-sm  p-6 mb-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">COURSE INTRO</h3>
//               <div className="relative">
//                 <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
//                   {/* <div className="bg-white rounded-full p-3 shadow-lg">
//                     <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-gray-200 border-r-[12px] border-r-transparent ml-1"></div>
//                   </div> */}
//                 </div>
//               </div>
//             </div>

//             {/* Popular Courses */}
//             <div className="bg-white rounded-lg shadow-sm  p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">POPULAR COURSES</h3>
//               <div className="space-y-4">
//                 {popularCourses.map((course) => (
//                   <div key={course.id} className="flex items-center space-x-3">
//                     <div className="w-16 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex-shrink-0"></div>
//                     <div className="flex-1 min-w-0">
//                       <h4 className="text-sm font-medium text-gray-900 truncate">
//                         {course.title}
//                       </h4>
//                       <p className={`text-sm font-semibold mt-1 ${
//                         course.price === 'FREE' ? 'text-green-600' : 'text-cyan-600'
//                       }`}>
//                         {course.price}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
        
//         </div>
//       </div>
//     </div>
//   );
// }


//-------------------------------------------------------




import { Search, Users, MessageSquare, Star, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CourseLayout from "../../Layouts/CourseLayout";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    {
      id: 1,
      title: "French for Beginners to Advanced Training",
      instructor: "Keny White",
      price: "$99.00",
      students: 98,
      comments: 10,
      rating: 5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Introduction to Mobile Apps Development",
      instructor: "Sarah Johnson",
      price: "FREE",
      students: 200,
      comments: 3,
      rating: 4,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "How to Become a Startup Founder",
      instructor: "Jhon Milton",
      price: "$85.60",
      students: 200,
      comments: 3,
      rating: 4.5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      title: "Your Complete Guide to Self Development",
      instructor: "Sarah Johnson",
      price: "FREE",
      students: 48,
      comments: 5,
      rating: 5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      title: "Adobe InDesign CS6 Tutorial Beginners",
      instructor: "Ans Niversity",
      price: "$68.00",
      students: 48,
      comments: 5,
      rating: 5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      title: "Swift Programming for Beginners",
      instructor: "Don Cooper",
      price: "$75.00",
      students: 48,
      comments: 5,
      rating: 5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 7,
      title: "Become a Professional Film Maker",
      instructor: "Don Cooper",
      price: "$89.00",
      students: 48,
      comments: 5,
      rating: 5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 8,
      title: "Branding like a professional in 10 days",
      instructor: "Logancee Wok",
      price: "$55.00",
      students: 48,
      comments: 5,
      rating: 5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 9,
      title: "Anatomy for Figure Drawing Mastering Figure",
      instructor: "Keny White",
      price: "FREE",
      students: 48,
      comments: 5,
      rating: 5,
      image: "/api/placeholder/300/200"
    }
  ];

  const popularCourses = [
    {
      id: 1,
      title: "Introduction To Mobile Apps Development",
      price: "$99.00",
      image: "/api/placeholder/80/60"
    },
    {
      id: 2,
      title: "Become A Professional Film Maker",
      price: "FREE",
      image: "/api/placeholder/80/60"
    },
    {
      id: 3,
      title: "Swift Programming For Beginners",
      price: "$75.00",
      image: "/api/placeholder/80/60"
    }
  ];

  const categories = [
    "Business",
    "Design", 
    "Programing Language",
    "Photography",
    "Language",
    "Life Style",
    "IT & Software"
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="">
     <CourseLayout 
     categories={categories}
     courses={courses}
     popularCourses={popularCourses}
     renderStars={renderStars}
     Breadcrumb1={"Home"}
      Breadcrumb2={"Courses"}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}

      MainTitle={"Courses"}
      type="course"
      

     />
    </div>
  );
}
