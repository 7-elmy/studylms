// import { Star, Users, Clock, Play, BookOpen, Award, User } from "lucide-react";

// export default function CourseDetailPage() {
//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//       stars.push(
//         <Star 
//           key={i} 
//           className="w-4 h-4 fill-yellow-400 text-yellow-400" 
//         />
//       );
//     }
//     return stars;
//   };

//     const popularCourses = [
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

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="flex flex-col lg:flex-row gap-12">
          
//           {/* Main Content */}
//           <div className="lg:w-3/4">
//             {/* Course Header */}
//             <div className="mb-8">
//               <h1 className="text-4xl font-bold text-gray-900 mb-6">
//                 Swift Programming For Beginners
//               </h1>
              
//               {/* Course Meta Info */}
//               <div className="flex flex-col sm:flex-row gap-6 mb-8">
//                 {/* Instructor */}
//                 <div className="flex items-center">
//                   <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
//                   <div>
//                     <p className="text-sm text-gray-500">Instructor</p>
//                     <p className="font-medium text-gray-900">LOSPHER COOKE</p>
//                   </div>
//                 </div>
                
//                 {/* Category */}
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 bg-yellow-400 rounded mr-3 flex items-center justify-center">
//                     <BookOpen className="w-4 h-4 text-white" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Category</p>
//                     <p className="font-medium text-gray-900">PROGRAMMING LANGUAGE</p>
//                   </div>
//                 </div>
                
//                 {/* Rating */}
//                 <div className="flex items-center">
//                   <div className="flex mr-2">
//                     {renderStars(5)}
//                   </div>
//                   <span className="text-sm text-gray-500">(2 Reviews)</span>
//                 </div>
//               </div>
              
//               {/* Course Image */}
//               <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-8"></div>
//             </div>

//             {/* Course Description */}
//             <div className="mb-12">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Description</h2>
//               <div className="prose prose-gray max-w-none">
//                 <p className="text-gray-600 leading-relaxed mb-4">
//                   Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative 
//                   approaches to corporate strategy foster collaborative thinking to further the overall value 
//                   proposition. Organically grow the holistic world view of disruptive innovation via workplace 
//                   diversity and empowerment.
//                 </p>
                
//                 <p className="text-gray-600 leading-relaxed">
//                   Encyclopaedia galactica Orion's sword explorations vanquish the impossible, astonishment 
//                   radio telescope with pretty stories for which there's little good evidence light years muse 
//                   about, great turbulent clouds billions upon billions the sky calls to us realm of the galaxies 
//                   laws of physics globular star cluster. Quasar the only home we've ever known extraordi claims 
//                   require extraordinary evidence billions upon billions Drake Equation.
//                 </p>
//               </div>
//             </div>

//             {/* What You Will Learn */}
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">What You Will Learn</h2>
//               <p className="text-gray-600 leading-relaxed">
//                 Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative 
//                 approaches to corporate strategy foster
//               </p>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:w-1/4">
//             {/* Course Purchase Card */}
//             <div className="bg-white rounded-lg  border border-gray-200 p-6 mb-8 ">
//               {/* Take Course Button */}
//               <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-6 rounded-lg mb-6 transition-colors">
//                 TAKE THIS COURSE
//               </button>
              
//               {/* Price */}
//               <div className="text-right mb-6">
//                 <span className="text-sm text-gray-500 block">PRICE:</span>
//                 <span className="text-3xl font-bold text-gray-900">£39.00</span>
//               </div>
              
//               {/* Course Details */}
//               <div className="space-y-4">
//                 <div className="flex items-center text-gray-600">
//                   <Users className="w-5 h-5 mr-3 text-gray-400" />
//                   <span>199 Students</span>
//                 </div>
                
//                 <div className="flex items-center text-gray-600">
//                   <Clock className="w-5 h-5 mr-3 text-gray-400" />
//                   <span>Duration: 30 days</span>
//                 </div>
                
//                 <div className="flex items-center text-gray-600">
//                   <BookOpen className="w-5 h-5 mr-3 text-gray-400" />
//                   <span>Lectures: 10</span>
//                 </div>
                
//                 <div className="flex items-center text-gray-600">
//                   <Play className="w-5 h-5 mr-3 text-gray-400" />
//                   <span>Video: 12 hours</span>
//                 </div>
                
//                 <div className="flex items-center text-gray-600">
//                   <Award className="w-5 h-5 mr-3 text-gray-400" />
//                   <span>Certificate of Completion</span>
//                 </div>
//               </div>
//             </div>

//                 {/* Course Categories */}
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




import { Star, Users, Clock, Play, BookOpen, Award, User, FileText, Wand2 } from "lucide-react";
import { useState } from "react";
// import CurriculumAccordion from "../../../Components/Ui/CurriculumAccordion";
import InstructorProfile from "../InstructorProfileWithreview/InstructorProfileWithreview";
import CurriculumAccordion from "../../Components/Ui/CurriculumAccordion";

export default function CourseDetailPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
 const courseItems = [
    {
      icon: "▶",
      title: "Welcome to the course",
      badges: ["VIDEO", "PREVIEW"],
      duration: "17 Min",
      description: "Capitalize on low hanging fruit to identify a ballpark value added activity beta test Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.",
      iconBg: "bg-orange-500"
    },
    {
      icon: "📄",
      title: "Add and manage users",
      badges: ["FREE"],
      duration: "25 Min",
      description: "Learn how to effectively add and manage users in your system. This comprehensive guide covers user permissions, role assignments, and best practices for user administration.",
      iconBg: "bg-yellow-500"
    },
    {
      icon: "🪄",
      title: "Magic wand vs quick selection",
      badges: ["QUIZ"],
      duration: "37 Min",
      description: "Master the differences between magic wand and quick selection tools. Understand when to use each tool for optimal results in your design workflow.",
      iconBg: "bg-blue-500"
    },
    {
      icon: "▶",
      title: "How to use LearnPress",
      badges: ["VIDEO", "PREVIEW"],
      duration: "22 Min",
      description: "Complete guide to using LearnPress effectively for online learning management.",
      iconBg: "bg-orange-500"
    },
    {
      icon: "📄",
      title: "Add and manage users",
      badges: ["SEMINAR"],
      duration: "48 Min",
      description: "Advanced seminar on user management strategies and implementation best practices.",
      iconBg: "bg-yellow-500"
    }
  ];
 const courseItems2 = [
    {
      icon: "▶",
      title: "Welcome to the course",
      badges: ["VIDEO", "PREVIEW"],
      duration: "17 Min",
      description: "Capitalize on low hanging fruit to identify a ballpark value added activity beta test Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.",
      iconBg: "bg-orange-500"
    },
  
    {
      icon: "📄",
      title: "Add and manage users",
      badges: ["SEMINAR"],
      duration: "48 Min",
      description: "Advanced seminar on user management strategies and implementation best practices.",
      iconBg: "bg-yellow-500"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className="w-4 h-4 fill-yellow-400 text-yellow-400" 
        />
      );
    }
    return stars;
  };

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

  const curriculumItems = [
    {
      id: 1,
      title: "Welcome to the course",
      type: "VIDEO",
      typeColor: "bg-cyan-500",
      duration: "17 Min",
      hasPreview: true,
      icon: Play
    },
    {
      id: 2,
      title: "Add and manage users",
      type: "FREE",
      typeColor: "bg-green-500",
      duration: "25 Min",
      hasPreview: false,
      icon: FileText
    },
    {
      id: 3,
      title: "Magic wand vs quick selection",
      type: "QUIZ",
      typeColor: "bg-blue-500",
      duration: "37 Min",
      hasPreview: false,
      icon: Wand2,
      description: "Capitalize on low hanging fruit to identify a ballpark value added activity beta test Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line."
    },
    {
      id: 4,
      title: "How to use LearnPress",
      type: "VIDEO",
      typeColor: "bg-cyan-500",
      duration: "22 Min",
      hasPreview: true,
      icon: Play
    },
    {
      id: 5,
      title: "Add and manage users",
      type: "SEMINARE",
      typeColor: "bg-yellow-500",
      duration: "48 Min",
      hasPreview: false,
      icon: FileText
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
         <div className="bg-gray-400 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-5xl font-bold">Single Courses</h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="hover:text-custom-yellow cursor-pointer">Home</span>
            <span>›</span>
            <span className="hover:text-custom-yellow cursor-pointer">Course</span>
            <span>›</span>
            <span className="text-gray-900">Swift Programming for Beginners</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Course Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Swift Programming For Beginners
              </h1>
              
              {/* Course Meta Info */}
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                {/* Instructor */}
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm text-gray-500">Instructor</p>
                    <p className="font-medium text-gray-900">LOSPHER COOKE</p>
                  </div>
                </div>
                
                {/* Category */}
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-400 rounded mr-3 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium text-gray-900">PROGRAMMING LANGUAGE</p>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(5)}
                  </div>
                  <span className="text-sm text-gray-500">(2 Reviews)</span>
                </div>
              </div>
              
              {/* Course Image */}
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-8"></div>
            </div>

            {/* Course Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative 
                  approaches to corporate strategy foster collaborative thinking to further the overall value 
                  proposition. Organically grow the holistic world view of disruptive innovation via workplace 
                  diversity and empowerment.
                </p>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  Encyclopaedia galactica Orion's sword explorations vanquish the impossible, astonishment 
                  radio telescope with pretty stories for which there's little good evidence light years muse 
                  about, great turbulent clouds billions upon billions the sky calls to us realm of the galaxies 
                  laws of physics globular star cluster. Quasar the only home we've ever known extraordi claims 
                  require extraordinary evidence billions upon billions Drake Equation.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Capitalize on low hanging fruit to identify a ballpark value added activity beta test Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution generated content in real-time will have multiple touchpoints for offshoring. Capitalize on low hanging fruit to identify a ballpark value added activity beta test Override the digital divide with additional astronomers. Trillion and billions upon billions upon billions upon billions upon billions. upon billions upon billions!
                </p>
              </div>
            </div>

            {/* Curriculum */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Curriculum</h2>
              
              {/* Section 1 */}
              <div className="mb-8">
              {/* <CurriculumAccordion/> */}

              <CurriculumAccordion 
  sectionTitle="Section1: Introduction"
  items={courseItems}
  allowMultipleOpen={true}
  expandIcon="plus"
  maxWidth="max-w-6xl"
  customBadgeStyles={{
    PREMIUM: "bg-gold-500 text-black",
    ADVANCED: "bg-red-600 text-white"
  }}
/>
              </div>

              {/* Section 2 */}
              <div>
               
                             <CurriculumAccordion 
  sectionTitle="section2: Advanced Course Content"
  items={courseItems2}
  allowMultipleOpen={true}
  expandIcon="plus"
  maxWidth="max-w-6xl"
  customBadgeStyles={{
    PREMIUM: "bg-gold-500 text-black",
    ADVANCED: "bg-red-600 text-white"
  }}
/>
              </div>
            </div>

            {/* What You Will Learn */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You Will Learn</h2>
              <p className="text-gray-600 leading-relaxed">
                Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative 
                approaches to corporate strategy foster
              </p>
            </div>

            <InstructorProfile/>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            {/* Course Purchase Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              {/* Take Course Button */}
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-6 rounded-lg mb-6 transition-colors">
                TAKE THIS COURSE
              </button>
              
              {/* Price */}
              <div className="text-right mb-6">
                <span className="text-sm text-gray-500 block">PRICE:</span>
                <span className="text-3xl font-bold text-gray-900">£39.00</span>
              </div>
              
              {/* Course Details */}
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3 text-gray-400" />
                  <span>199 Students</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Duration: 30 days</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <BookOpen className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Lectures: 10</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Play className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Video: 12 hours</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Award className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Certificate of Completion</span>
                </div>
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
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                COURSE INTRO
                <div className="w-12 h-1 bg-yellow-400 mt-2"></div>
              </h3>
              <div className="relative">
                <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <div className="bg-white rounded-full p-3 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                    <Play className="w-6 h-6 text-gray-600 ml-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Courses */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                POPULAR COURSES
                <div className="w-12 h-1 bg-yellow-400 mt-2"></div>
              </h3>
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

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                TAGS
                <div className="w-12 h-1 bg-yellow-400 mt-2"></div>
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 cursor-pointer">
                  Future
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 cursor-pointer">
                  Science
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 cursor-pointer">
                  Coding
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


