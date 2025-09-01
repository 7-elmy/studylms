


// import { useEffect } from 'react';

// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiRequest } from '../../Redux/Apis/apiRequest';

// export default function About() {
//   // const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const { t, i18n } = useTranslation();
//     let {about} = useSelector((state) => state.api);
//   //  //console.log({about});
  
//   let dispatch = useDispatch();
//   useEffect(()=>{
//     dispatch(apiRequest({
//       entity: "about",
//       url:"api/about_us",
//       method: "GET",
//        headers: {
//              "Accept-Language": localStorage.getItem('language') || 'en',
              
//             }
//     }))
//   },[dispatch , localStorage.getItem('language') ]);



//   return (
//     <section className="bg-gray-50 py-12 sm:py-16 lg:py-20" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Title */}
//         <div className="text-center mb-12 sm:mb-16">
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
//             {about?.data?.data?.title  }
//           </h2>
//         </div>

//         {/* Testimonial Container */}
//         <div className="relative max-w-4xl mx-auto">
//           <div className="flex items-center justify-center">
//             {/* Testimonial Content */}
//             <div className="mx-8 sm:mx-16 lg:mx-20 text-center px-4 sm:px-6">
//               {/* Author Info */}
//               <div className="space-y-2">
//                 {/* Profile Image */}
//                 <div className="w-64 h-64 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
//                   <img src={about?.data?.data?.image} className='rounded-full' alt={about?.data?.data?.name+"12"} />
//                 </div>
                
//                 {/* Author Name */}
//                 <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
//                   { about?.data?.data?.name||"Michael Chen"}
//                 </h3>
//               </div>
              
//               {/* Quote */}
//               <div className="mb-8 sm:mb-12">
//                 <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed italic">
//                   {about?.data?.data?.description}
//                 </blockquote>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



// import { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiRequest } from '../../Redux/Apis/apiRequest';

// export default function About() {
//   const { t, i18n } = useTranslation();
//   let { about } = useSelector((state) => state.api);
  
//   let dispatch = useDispatch();
  
//   useEffect(() => {
//     dispatch(apiRequest({
//       entity: "about",
//       url: "api/about_us",
//       method: "GET",
//       headers: {
//         "Accept-Language": localStorage.getItem('language') || 'en',
//       }
//     }))
//   }, [dispatch, localStorage.getItem('language')]);

//   return (
//     <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 sm:py-20 lg:py-28 overflow-hidden" 
//              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      
//       {/* Background Decorations */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Title */}
//         <div className="text-center mb-16 sm:mb-20">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
//             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//             </svg>
//           </div>
//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
//             {about?.data?.data?.title || "About Us"}
//           </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          
//           {/* Image Column */}
//           <div className="col-span-12 lg:col-span-6 order-1 lg:order-1">
//             <div className="relative">
//               {/* Main Image Container */}
//               <div className="relative group">
//                 {/* Gradient Border */}
//                 <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                
//                 {/* Image Frame */}
//                 <div className="relative bg-white p-3 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
//                   <div className="w-full z-50 aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
//                     <img 
//                       src={about?.data?.data?.image || "/api/placeholder/400/400"} 
//                       className="w-full z-50 h-full object-cover rounded-2xl hover:scale-110 transition-transform duration-700" 
//                       alt={about?.data?.data?.name || "About Us"}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Floating Elements */}

//                      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-950 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-950 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-950 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
//             </div>
//           </div>

//           {/* Content Column */}
//           <div className="col-span-12 lg:col-span-6 order-2 lg:order-2">
//             <div className="space-y-8">
              
//               {/* Name Section */}
//               <div className="space-y-4">
//                 <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   <span>Featured Profile</span>
//                 </div>
                
//                 <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
//                   {about?.data?.data?.name || "Michael Chen"}
//                 </h3>
//               </div>

//               {/* Description */}
//               <div className="relative">
//                 <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
//                 <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-light italic pl-8">
//                   "{about?.data?.data?.description || "Passionate about creating innovative solutions that make a difference in people's lives. With years of experience in technology and design, I believe in the power of collaboration and continuous learning."}"
//                 </blockquote>
//               </div>

//               {/* Stats or Additional Info */}
//               <div className="grid grid-cols-2 gap-6 pt-8">
//                 <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
//                   <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
//                   <div className="text-gray-600 font-medium">Years Experience</div>
//                 </div>
//                 <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
//                   <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
//                   <div className="text-gray-600 font-medium">Projects Completed</div>
//                 </div>
//               </div>

//               {/* Call to Action */}
//               <div className="pt-6">
//                 <button className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
//                   <span>Get In Touch</span>
//                   <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../../Redux/Apis/apiRequest';

export default function About() {
  const { t, i18n } = useTranslation();
  let { about } = useSelector((state) => state.api);
  const [isVisible, setIsVisible] = useState(false);
  
  let dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(apiRequest({
      entity: "about",
      url: "api/about_us",
      method: "GET",
      headers: {
        "Accept-Language": localStorage.getItem('language') || 'en',
        "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token") }`,
 
      }
    }))
  }, [dispatch, localStorage.getItem('language')]);

  // Trigger animations when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const isRTL = i18n.language === 'ar';

  return (
    <section className="relative bg-[#222222] py-10 sm:py-20  overflow-hidden" 
             dir={isRTL ? 'rtl' : 'ltr'}>
      
   

      {/* Grid Pattern Overlay */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-2xl mb-6 shadow-2xl shadow-blue-500/25 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-180'}`}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-4 drop-shadow-lg transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {about?.data?.data?.title || "About Us"}
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-900 mx-auto rounded-full shadow-lg shadow-blue-500/50 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Image Column */}
          <div className={`col-span-12 px-3 lg:col-span-6 order-1 lg:order-1 transition-all duration-1000 delay-200 ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : `opacity-0 ${isRTL ? 'translate-x-20' : '-translate-x-20'}`
          }`}>
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative group">
                {/* Neon Glow Effect */}
                <div className="absolute -inset-6 bg-gradient-to-br from-gray-950  to-black rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
                
                {/* Glass Card Effect */}
                <div className="relative bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl transform group-hover:scale-105 transition-all duration-500 hover:bg-white/10">
                  <div className="w-full aspect-square bg-gradient-to-br from-gray-950  to-black rounded-2xl overflow-hidden border border-white/5">
                    <img 
                      src={about?.data?.data?.image || "/api/placeholder/400/400"} 
                      className="w-full h-full object-cover rounded-2xl hover:scale-110 transition-transform duration-700 opacity-90 hover:opacity-100" 
                      alt={about?.data?.data?.name || "About Us"}
                    />
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                  </div>
                </div>
              </div>

              {/* Floating Dark Elements */}
              <div className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-gray-950/30  to-gray-900/30 rounded-full blur-xl opacity-60 animate-float transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-60' : 'opacity-0'}`}></div>
              <div className={`absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-gray-950/30 to-gray-700/30 rounded-2xl blur-lg opacity-70 animate-float transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-70' : 'opacity-0'}`} style={{animationDelay: '1s'}}></div>
              
              {/* Glowing Orbs */}
              <div className={`absolute top-1/4 -left-4 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-blue-400/50 animate-ping transition-all duration-1000 delay-1400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className={`absolute bottom-1/4 -right-4 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-purple-400/50 animate-ping transition-all duration-1000 delay-1600 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{animationDelay: '1s'}}></div>
            </div>
          </div>

          {/* Content Column */}
          <div className={`col-span-12 lg:col-span-6 order-2 lg:order-2 transition-all duration-1000 delay-400 ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : `opacity-0 ${isRTL ? '-translate-x-20' : 'translate-x-20'}`
          }`}>
            <div className="space-y-8">
              
              {/* Name Section */}
              <div className={`space-y-4 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-yellow-500/20 backdrop-blur-sm border border-blue-500/30 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Featured Profile</span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight drop-shadow-lg">
                  {about?.data?.data?.name || "Michael Chen"}
                </h3>
              </div>

              {/* Description */}
              <div className={`relative px-6 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-yellow-500 to-yellow-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light italic pl-8">
                  <span className="text-yellow-400 text-4xl leading-none">"</span>
                  {about?.data?.data?.description || "Passionate about creating innovative solutions that make a difference in people's lives. With years of experience in technology and design, I believe in the power of collaboration and continuous learning."}
                  <span className="text-yellow-400 text-4xl leading-none">"</span>
                </blockquote>
              </div>

              {/* Stats Cards */}
              <div className={`grid grid-cols-2 gap-6 pt-8 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 group">
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">10+</div>
                  <div className="text-gray-400 font-medium">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 group">
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
                  <div className="text-gray-400 font-medium">Projects Completed</div>
                </div>
              </div>

              {/* Call to Action */}
              <div className={`pt-6 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <button className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-600 via-yellow-600 to-yellow-600 hover:from-yellow-500 hover:via-yellow-300 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl shadow-yellow-500/25 hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-400/20 blur-xl group-hover:blur-none transition-all duration-300"></div>
                  <span className="relative z-10">Get In Touch</span>
                  <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  {/* Button Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-800 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx={"true"}>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes slideInFromLeft {
          0% { opacity: 0; transform: translateX(-100px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInFromRight {
          0% { opacity: 0; transform: translateX(100px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}

// import { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiRequest } from '../../Redux/Apis/apiRequest';

// export default function About() {
//   const { t, i18n } = useTranslation();
//   let { about } = useSelector((state) => state.api);
  
//   let dispatch = useDispatch();
  
//   useEffect(() => {
//     dispatch(apiRequest({
//       entity: "about",
//       url: "api/about_us",
//       method: "GET",
//       headers: {
//         "Accept-Language": localStorage.getItem('language') || 'en',
//       }
//     }))
//   }, [dispatch, localStorage.getItem('language')]);

//   return (
//     <section className="relative bg-gradient-to-br from-gray-950 via-slate-900 to-black py-16 sm:py-20 lg:py-28 overflow-hidden" 
//              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      
//       {/* Dark Background Decorations */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
//       </div>

//       {/* Grid Pattern Overlay */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Title */}
//         <div className="text-center mb-16 sm:mb-20">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-2xl mb-6 shadow-2xl shadow-blue-500/25">
//             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//             </svg>
//           </div>
//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
//             {about?.data?.data?.title || "About Us"}
//           </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-900 mx-auto rounded-full shadow-lg shadow-blue-500/50"></div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          
//           {/* Image Column */}
//           <div className="col-span-12 lg:col-span-6 order-1 lg:order-1">
//             <div className="relative">
//               {/* Main Image Container */}
//               <div className="relative group">
//                 {/* Neon Glow Effect */}
//                 <div className="absolute -inset-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
                
//                 {/* Glass Card Effect */}
//                 <div className="relative bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl transform group-hover:scale-105 transition-all duration-500 hover:bg-white/10">
//                   <div className="w-full aspect-square bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden border border-white/5">
//                     <img 
//                       src={about?.data?.data?.image || "/api/placeholder/400/400"} 
//                       className="w-full h-full object-cover rounded-2xl hover:scale-110 transition-transform duration-700 opacity-90 hover:opacity-100" 
//                       alt={about?.data?.data?.name || "About Us"}
//                     />
//                     {/* Image Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
//                   </div>
//                 </div>
//               </div>

//               {/* Floating Dark Elements */}
//               <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl opacity-60 animate-float"></div>
//               <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-cyan-500/30 to-teal-500/30 rounded-2xl blur-lg opacity-70 animate-float" style={{animationDelay: '1s'}}></div>
              
//               {/* Glowing Orbs */}
//               <div className="absolute top-1/4 -left-4 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-ping"></div>
//               <div className="absolute bottom-1/4 -right-4 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-ping" style={{animationDelay: '1s'}}></div>
//             </div>
//           </div>

//           {/* Content Column */}
//           <div className="col-span-12 lg:col-span-6 order-2 lg:order-2">
//             <div className="space-y-8">
              
//               {/* Name Section */}
//               <div className="space-y-4">
//                 <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-yellow-500/20 backdrop-blur-sm border border-blue-500/30 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   <span>Featured Profile</span>
//                 </div>
                
//                 <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight drop-shadow-lg">
//                   {about?.data?.data?.name || "Michael Chen"}
//                 </h3>
//               </div>

//               {/* Description */}
//               <div className="relative">
//                 <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-yellow-500 to-yellow-500 rounded-full shadow-lg shadow-blue-500/50"></div>
//                 <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light italic pl-8">
//                   <span className="text-yellow-400 text-4xl leading-none">"</span>
//                   {about?.data?.data?.description || "Passionate about creating innovative solutions that make a difference in people's lives. With years of experience in technology and design, I believe in the power of collaboration and continuous learning."}
//                   <span className="text-yellow-400 text-4xl leading-none">"</span>
//                 </blockquote>
//               </div>

//               {/* Stats Cards */}
//               <div className="grid grid-cols-2 gap-6 pt-8">
//                 <div className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 group">
//                   <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">10+</div>
//                   <div className="text-gray-400 font-medium">Years Experience</div>
//                 </div>
//                 <div className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 group">
//                   <div className="text-3xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
//                   <div className="text-gray-400 font-medium">Projects Completed</div>
//                 </div>
//               </div>

//               {/* Call to Action */}
//               <div className="pt-6">
//                 <button className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-600 via-yellow-600 to-yellow-600 hover:from-yellow-500 hover:via-yellow-300 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl shadow-blue-500/25 hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-400/20 blur-xl group-hover:blur-none transition-all duration-300"></div>
//                   <span className="relative z-10">Get In Touch</span>
//                   <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                   {/* Button Glow Effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-800 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl"></div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// }