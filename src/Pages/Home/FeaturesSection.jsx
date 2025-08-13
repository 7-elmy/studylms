


// import React from 'react'
// import { BookOpen, Monitor, Trophy } from 'lucide-react'

// export default function FutureSection() {
//   return (
//     <div>
//       <div className="flex justify-center items-center bg-yellow-500 py-8 px-4">
//         <div className="w-full max-w-6xl">
//           <div className="grid grid-cols-12 gap-8">
//             <FeatureCard Icon={Trophy} title="24/7 Monitoring" to="#" />
//             <FeatureCard Icon={Monitor} title="Realtime Dashboard" to="#" />
//             <FeatureCard Icon={BookOpen} title="Knowledge Base" to="#" />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function FeatureCard({ to = '#', Icon, title }) {
//   const handleFocus = (e) => {
//     const icon = e.currentTarget.querySelector('.icon-rotate');
//     if (icon) {
//       icon.style.transform = 'rotateY(360deg)';
//       setTimeout(() => {
//         icon.style.transform = 'rotateY(0deg)';
//       }, 700);
//     }
//   };

//   return (
//     <div className="col-span-12 sm:col-span-4">
//       <a
//         href={to}
//         className="group flex items-center gap-4 text-white hover:text-yellow-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg p-2"
//         onFocus={handleFocus}
//       >
//         <div 
//           className="w-16 h-16 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300"
//           style={{ 
//             perspective: '1000px',
//             transformStyle: 'preserve-3d'
//           }}
//         >
//           <Icon
//             className="
//               icon-rotate
//               w-12 h-12 text-white
//               group-hover:rotate-360
//               transition-transform duration-300
//             "
//             style={{
//               transform: 'rotateY(0deg)',
//               transition: 'transform 0.7s ease-in-out',
//               transformStyle: 'preserve-3d'
//             }}
//           />
//         </div>
        
//         <div className="flex-1">
//           <h2 className="text-lg font-bold mb-1">{title}</h2>
//           <span className="text-sm uppercase tracking-wide opacity-90">VIEW MORE</span>
//         </div>
//       </a>
//     </div>
//   )
// }

import React from 'react'
import { BookOpen, Monitor, Trophy } from 'lucide-react'

export default function FutureSection() {
  return (
    <div>
      <div className="flex justify-center items-center bg-yellow-500 py-8 rounded-md px-4">
        <div className="w-full">
          <div className="grid grid-cols-12 gap-8">
            <FeatureCard  title="First Preparatory " to="#" />
            <FeatureCard  title="Second Preparatory " to="#" />
            <FeatureCard  title="Third Preparatory  " to="#" />
            <FeatureCard  title="First Secondary " to="#" />
            <FeatureCard  title="Second Secondary  " to="#" />
            <FeatureCard  title="Third Secondary  " to="#" />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ to = '#', Icon, title }) {
  const handleFocus = (e) => {
    const icon = e.currentTarget.querySelector('.icon-rotate');
    if (icon) {
      icon.style.transform = 'rotateY(360deg)';
      setTimeout(() => {
        icon.style.transform = 'rotateY(0deg)';
      }, 700);
    }
  };

  return (
    <div className=" col-span-12 md:col-span-2  ">
      <a
        href={to}
        className="group flex items-center gap-4 text-white hover:text-yellow-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg p-2"
        onFocus={handleFocus}
      >
      
        
        <div className="flex items-center gap-2">
          <div className='w-2 h-2 bg-white rounded-full'></div>
          <h2 className="text-sm  ">{title}</h2>
        
         
        </div>
      </a>
    </div>
  )
}