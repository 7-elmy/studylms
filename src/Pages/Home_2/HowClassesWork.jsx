// import React, { useState } from 'react';
// import { User, HelpCircle, FileText, ThumbsUp } from 'lucide-react';

// const HowClassesWork = () => {
//   const [hoveredStep, setHoveredStep] = useState(null);

//   const steps = [
//     {
//       id: 1,
//       title: "Become A Member",
//       icon: User,
//       description: "We choose to go to the moon in this decade and the other.",
//       color: "bg-gray-100",
//       iconColor: "text-gray-600"
//     },
//     {
//       id: 2,
//       title: "Learn By Doing",
//       icon: HelpCircle,
//       description: "We choose to go to the moon in this decade and the other.",
//       color: "bg-yellow-400",
//       iconColor: "text-white"
//     },
//     {
//       id: 3,
//       title: "Preview The Syllabus",
//       icon: FileText,
//       description: "We choose to go to the moon in this decade and the other.",
//       color: "bg-gray-800",
//       iconColor: "text-white"
//     },
//     {
//       id: 4,
//       title: "Take A Course",
//       icon: ThumbsUp,
//       description: "We choose to go to the moon in this decade and the other.",
//       color: "bg-gray-100",
//       iconColor: "text-gray-600"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             How Our Classes Work
//           </h1>
//           <div className="flex items-center justify-center mb-4">
//             <p className="text-lg text-gray-600 max-w-2xl">
//               Share your work to collaborate with our vibrant design element.
//             </p>
//           </div>
//           <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full"></div>
//         </div>

//         {/* Steps Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {steps.map((step, index) => {
//             const IconComponent = step.icon;
//             return (
//               <div
//                 key={step.id}
//                 className="relative group cursor-pointer"
//                 onMouseEnter={() => setHoveredStep(step.id)}
//                 onMouseLeave={() => setHoveredStep(null)}
//               >
//                 {/* Step Card */}
//                 <div className="text-center transform transition-all duration-300 hover:scale-105">
//                   {/* Icon Circle */}
//                   <div className="relative mb-6">
//                     <div 
//                       className={`w-20 h-20 mx-auto rounded-full ${step.color} flex items-center justify-center shadow-lg transform transition-all duration-300 ${
//                         hoveredStep === step.id ? 'scale-110 shadow-xl' : ''
//                       }`}
//                     >
//                       <IconComponent 
//                         className={`w-8 h-8 ${step.iconColor} transition-all duration-300`}
//                       />
//                     </div>
                    
//                     {/* Animated Ring */}
//                     <div className={`absolute inset-0 w-20 h-20 mx-auto rounded-full border-2 border-yellow-400 opacity-0 scale-110 transition-all duration-300 ${
//                       hoveredStep === step.id ? 'opacity-100 scale-125' : ''
//                     }`}></div>
//                   </div>

//                   {/* Step Number and Title */}
//                   <div className="mb-4">
//                     <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                       <span className="text-yellow-500">{step.id}.</span>
//                       {step.title}
//                     </h3>
//                   </div>

//                   {/* Description */}
//                   <p className={`text-gray-600 leading-relaxed transition-all duration-300 ${
//                     hoveredStep === step.id ? 'text-gray-800' : ''
//                   }`}>
//                     {step.description}
//                   </p>

//                   {/* Hover Effect Overlay */}
//                   <div className={`absolute inset-0 bg-gradient-to-t from-yellow-50 to-transparent rounded-lg opacity-0 transition-opacity duration-300 -z-10 ${
//                     hoveredStep === step.id ? 'opacity-100' : ''
//                   }`}></div>
//                 </div>

//                 {/* Connection Line (except for last item) */}
//                 {index < steps.length - 1 && (
//                   <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform -translate-y-1/2 z-0">
//                     <div className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-300 transform origin-left transition-all duration-500 ${
//                       hoveredStep === step.id || hoveredStep === step.id + 1 ? 'scale-x-100' : 'scale-x-0'
//                     }`}></div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* Bottom CTA Section */}
//         <div className="text-center mt-16">
//           <div className="inline-flex items-center space-x-4">
//             <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
//               Get Started Today
//             </button>
//             <button className="border-2 border-gray-300 hover:border-yellow-400 text-gray-700 hover:text-yellow-600 px-8 py-3 rounded-full font-semibold transform transition-all duration-300 hover:scale-105">
//               Learn More
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Floating Yellow Arrow */}
//       <div className="fixed bottom-8 right-8">
//         <button className="bg-yellow-400 hover:bg-yellow-500 text-white w-12 h-12 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 flex items-center justify-center">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HowClassesWork;


import React, { useState } from 'react';
import { User, HelpCircle, FileText, ThumbsUp } from 'lucide-react';

const HowClassesWork = () => {
  const [hoveredStep, setHoveredStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Become A Member",
      icon: User,
      description: "We choose to go to the moon in this decade and the other.",
      color: "bg-gray-100",
      iconColor: "text-gray-600"
    },
    {
      id: 2,
      title: "Learn By Doing",
      icon: HelpCircle,
      description: "We choose to go to the moon in this decade and the other.",
      color: "bg-yellow-400",
      iconColor: "text-white"
    },
    {
      id: 3,
      title: "Preview The Syllabus",
      icon: FileText,
      description: "We choose to go to the moon in this decade and the other.",
      color: "bg-gray-800",
      iconColor: "text-white"
    },
    {
      id: 4,
      title: "Take A Course",
      icon: ThumbsUp,
      description: "We choose to go to the moon in this decade and the other.",
      color: "bg-gray-100",
      iconColor: "text-gray-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl  font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            How Our Classes Work
          </h1>
          <div className="flex items-center justify-center mb-4">
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl px-4">
              Share your work to collaborate with our vibrant design element.
            </p>
          </div>
          <div className="w-16 sm:w-20 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 xl:gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Step Card */}
                <div className="text-center transform transition-all duration-300 hover:scale-105 px-2 sm:px-4">
                  {/* Icon Circle */}
                  <div className="relative mb-4 sm:mb-6">
                    <div 
                      className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full ${step.color} flex items-center justify-center shadow-lg transform transition-all duration-300 ${
                        hoveredStep === step.id ? 'scale-110 shadow-xl' : ''
                      }`}
                    >
                      <IconComponent 
                        className={`w-6 h-6 sm:w-8 sm:h-8 ${step.iconColor} transition-all duration-300`}
                      />
                    </div>
                    
                    {/* Animated Ring */}
                    <div className={`absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full border-2 border-yellow-400 opacity-0 scale-110 transition-all duration-300 ${
                      hoveredStep === step.id ? 'opacity-100 scale-125' : ''
                    }`}></div>
                  </div>

                  {/* Step Number and Title */}
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-tight">
                      <span className="text-yellow-500">{step.id}.</span>
                      <span className="block sm:inline">{step.title}</span>
                    </h3>
                  </div>

                  {/* Description */}
                  <p className={`text-sm sm:text-base text-gray-600 leading-relaxed transition-all duration-300 px-2 ${
                    hoveredStep === step.id ? 'text-gray-800' : ''
                  }`}>
                    {step.description}
                  </p>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-yellow-50 to-transparent rounded-lg opacity-0 transition-opacity duration-300 -z-10 ${
                    hoveredStep === step.id ? 'opacity-100' : ''
                  }`}></div>
                </div>

                {/* Connection Line (except for last item) */}
                {index < steps.length - 1 && (
                  <>
                    {/* Desktop Connection Line */}
                    {/* <div className="hidden lg:block absolute top-8 sm:top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform -translate-y-1/2 z-0">
                      <div className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-300 transform origin-left transition-all duration-500 ${
                        hoveredStep === step.id || hoveredStep === step.id + 1 ? 'scale-x-100' : 'scale-x-0'
                      }`}></div>
                    </div> */}
                    
                    {/* Mobile/Tablet Vertical Connection Line */}
                    <div className="lg:hidden absolute left-1/2 top-full w-0.5 h-6 bg-gradient-to-b from-gray-300 to-transparent transform -translate-x-1/2 z-0">
                      <div className={`w-full bg-gradient-to-b from-yellow-400 to-yellow-300 transform origin-top transition-all duration-500 ${
                        hoveredStep === step.id || hoveredStep === step.id + 1 ? 'scale-y-100' : 'scale-y-0'
                      }`}></div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">
            <button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base">
              Get Started Today
            </button>
            <button className="w-full sm:w-auto border-2 border-gray-300 hover:border-yellow-400 text-gray-700 hover:text-yellow-600 px-6 sm:px-8 py-3 rounded-full font-semibold transform transition-all duration-300 hover:scale-105 text-sm sm:text-base">
              Learn More
            </button>
          </div>
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

export default HowClassesWork;