
// import { useRef, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// // import required modules
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// // Mock Link component
// const Link = ({ children, to = "#", className, ...props }) => (
//   <a href={to} className={className} {...props}>
//     {children}
//   </a>
// );

// export default function MainSlider() {
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     const swiper = swiperRef.current?.swiper;
//     if (!swiper) return;

//     const resetAnimations = (slideIndex) => {
//       const slide = swiper.slides[slideIndex];
//       if (!slide) return;

//       const animatedElements = slide.querySelectorAll('.animate-title, .animate-paragraph, .animate-buttons, .animate-button-1, .animate-button-2, .animate-feature-1, .animate-feature-2, .animate-feature-3');
      
//       animatedElements.forEach(el => {
//         el.classList.remove('animate-active');
//         el.offsetHeight;
//         el.classList.add('animate-active');
//       });
//     };

//     const handleSlideChange = () => {
//       resetAnimations(swiper.activeIndex);
//     };

//     setTimeout(() => resetAnimations(0), 100);
//     swiper.on('slideChange', handleSlideChange);

//     return () => {
//       swiper.off('slideChange', handleSlideChange);
//     };
//   }, []);

//   return (
//     <div className="relative "> {/* Added bg-[#2222] here */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .animate-title {
//           opacity: 0;
//           transform: translateY(30px);
//         }

//         .animate-title.animate-active {
//           animation: fadeInUp 0.8s ease-out forwards;
//           animation-delay: 0.3s;
//         }

//         .animate-paragraph {
//           opacity: 0;
//           transform: translateY(30px);
//         }

//         .animate-paragraph.animate-active {
//           animation: fadeInUp 0.8s ease-out forwards;
//           animation-delay: 0.8s;
//         }

//         .animate-buttons {
//           opacity: 0;
//           transform: translateY(30px);
//         }

//         .animate-buttons.animate-active {
//           animation: fadeInUp 0.8s ease-out forwards;
//           animation-delay: 1.3s;
//         }

//         .animate-button-1 {
//           opacity: 0;
//           transform: translateX(-30px);
//         }

//         .animate-button-1.animate-active {
//           animation: fadeInLeft 0.6s ease-out forwards;
//           animation-delay: 1.5s;
//         }

//         .animate-button-2 {
//           opacity: 0;
//           transform: translateX(-30px);
//         }

//         .animate-button-2.animate-active {
//           animation: fadeInLeft 0.6s ease-out forwards;
//           animation-delay: 1.7s;
//         }

//         .animate-feature-1 {
//           opacity: 0;
//           transform: translateX(-30px);
//         }

//         .animate-feature-1.animate-active {
//           animation: fadeInLeft 0.6s ease-out forwards;
//           animation-delay: 2.0s;
//         }

//         .animate-feature-2 {
//           opacity: 0;
//           transform: translateX(-30px);
//         }

//         .animate-feature-2.animate-active {
//           animation: fadeInLeft 0.6s ease-out forwards;
//           animation-delay: 2.3s;
//         }

//         .animate-feature-3 {
//           opacity: 0;
//           transform: translateX(-30px);
//         }

//         .animate-feature-3.animate-active {
//           animation: fadeInLeft 0.6s ease-out forwards;
//           animation-delay: 2.6s;
//         }
//       `}</style>

//       <Swiper
//         ref={swiperRef}
//         spaceBetween={30}
//         centeredSlides={true}
//         loop={true}
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         navigation={false}
//         modules={[Autoplay, Pagination, Navigation]}
//         className="mySwiper w-full bg-[#2222]" // Added bg-[#2222] here
//       >
//         <SwiperSlide key="slide1" className="w-full pt-12 flex flex-col items-center justify-center bg-[#2222]"> {/* Added bg-[#2222] here */}
//           <div className="text-white flex justify-center items-center bg-[#2222] w-full"> {/* Added bg-[#2222] here */}
//             <div className='w-[80%] space-y-4 p-6'>
//               <h2 className="text-3xl hidden md:block md:text-6xl font-bold md:ps-4 text-left animate-title">
//                 Education & Training <br/>
//                 Organization
//               </h2>
//               <h2 className="text-3xl md:hidden block md:text-4xl font-bold md:ps-4 text-left animate-title">
//                 Education & Training Organization
//               </h2>
              
//               <p className='text-center md:text-left w-[90%] md:w-[60%] lg:w-[50%] animate-paragraph'>
//                 We offer the most complete course package in the country, for the research, design and development of Education.
//               </p>

//               <div className='flex gap-8 items-center pt-4 animate-buttons'>
//                 <Link to="/register" className='bg-yellow-500 w-[200px] text-white p-3 text-sm hover:bg-yellow-600 transition-colors animate-button-1'>
//                   Register Now 
//                 </Link>
//                 <Link to="/" className='bg-white text-gray-800 p-3 w-[200px] text-sm text-center hover:bg-gray-100 transition-colors animate-button-2'>
//                   Log In
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//         <SwiperSlide key="slide2" className="w-full pt-12 flex flex-col items-center justify-center bg-[#2222]"> {/* Added bg-[#2222] here */}
//           <div className="text-white flex justify-center items-center bg-[#2222] w-full"> {/* Added bg-[#2222] here */}
//             <div className='w-[80%] space-y-4 p-6'>
//               <h2 className="text-3xl hidden md:block md:text-6xl font-bold md:ps-4 text-left animate-title">
//                 Education & Training <br/>
//                 Organization
//               </h2>
//               <h2 className="text-3xl md:hidden block md:text-4xl font-bold md:ps-4 text-left animate-title">
//                 Education & Training Organization
//               </h2>
              
//               <p className='text-center md:text-left w-[90%] md:w-[60%] lg:w-[50%] animate-paragraph'>
//                 We offer the most complete course package in the country, for the research, design and development of Education.
//               </p>

//               <div className='flex gap-8 items-center pt-4 animate-buttons'>
//                 <Link to="/register" className='bg-yellow-500 w-[200px] text-white p-3 text-sm hover:bg-yellow-600 transition-colors animate-button-1'>
//                   Register Now 
//                 </Link>
//                 <Link to="/" className='bg-white text-gray-800 p-3 w-[200px] text-sm text-center hover:bg-gray-100 transition-colors animate-button-2'>
//                   Log In
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>
//       </Swiper>

//       {/* Custom Navigation Buttons */}
//       <button
//         onClick={() => swiperRef.current?.swiper?.slidePrev()}
//         className="absolute top-1/2 left-2 md:left-8 transform -translate-y-1/2 z-10 bg-gray-400 py-4 bg-opacity-20 hover:bg-opacity-40 text-white px-2 rounded-md backdrop-blur-sm transition-all duration-200"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>

//       <button
//         onClick={() => swiperRef.current?.swiper?.slideNext()}
//         className="absolute top-1/2 right-2 md:right-8 transform -translate-y-1/2 z-10 bg-gray-400 py-4 bg-opacity-20 hover:bg-opacity-40 text-white px-2 rounded-md backdrop-blur-sm transition-all duration-200"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>
//     </div>
//   );
// }




//-----------------------------------------------------------------------------------last last update-----------


// import { useRef, useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// // import img from "../../assets/student.jpg"
// const Link = ({ children, to = "/", className, ...props }) => (
//   <a href={to} className={className} {...props}>
//     {children}
//   </a>
// );

// export default function MainSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const intervalRef = useRef(null);
//   const totalSlides = 3;

//   const slides = [
//     {
//       title: "Education & Training",
//       subtitle: "Organization",
//       description: "We offer the most complete course package in the country, for the research, design and development of Education.",
//       id: 1
//     },
//     {
//       title: "Advanced Learning",
//       subtitle: "Platform",
//       description: "Discover innovative teaching methods and comprehensive educational resources designed for modern learning experiences.",
//       id: 2
//     },
//     {
//       title: "Future Ready",
//       subtitle: "Education",
//       description: "Prepare students for tomorrow's challenges with our cutting-edge curriculum and expert-led training programs.",
//       id: 3
//     }
//   ];

//   const courses = [
//     'First Preparatory', 
//     'Second Preparatory', 
//     'Third Preparatory', 
//     'First Secondary', 
//     'Second Secondary', 
//     'Third Secondary'
//   ];

 
//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//     resetAnimations();
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % totalSlides);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
//   };

//   const resetAnimations = () => {
//     const animatedElements = document.querySelectorAll('.animate-element');
//     animatedElements.forEach(el => {
//       el.classList.remove('animate-active');
//       setTimeout(() => {
//         el.classList.add('animate-active');
//       }, 50);
//     });
//   };

//   useEffect(() => {
//     resetAnimations();
    
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
    
//     intervalRef.current = setInterval(() => {
//       nextSlide();
//     }, 5000);

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [currentSlide]);

//   useEffect(() => {
//     resetAnimations();
//   }, [currentSlide]);

//   const currentSlideData = slides[currentSlide];

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{
//         __html: `
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(40px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           @keyframes fadeInLeft {
//             from {
//               opacity: 0;
//               transform: translateX(-40px);
//             }
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }

//           @keyframes fadeInScale {
//             from {
//               opacity: 0;
//               transform: scale(0.9);
//             }
//             to {
//               opacity: 1;
//               transform: scale(1);
//             }
//           }

//           .animate-element {
//             opacity: 0;
//             transition: all 0.3s ease;
//           }

//           .animate-title.animate-active {
//             animation: fadeInUp 1s ease-out forwards;
//             animation-delay: 0.2s;
//           }

//           .animate-subtitle.animate-active {
//             animation: fadeInLeft 0.8s ease-out forwards;
//             animation-delay: 0.5s;
//           }

//           .animate-description.animate-active {
//             animation: fadeInUp 0.8s ease-out forwards;
//             animation-delay: 0.8s;
//           }

//           .animate-buttons.animate-active {
//             animation: fadeInUp 0.8s ease-out forwards;
//             animation-delay: 1.1s;
//           }

//           .animate-course.animate-active {
//             animation: fadeInScale 0.6s ease-out forwards;
//           }

//           .button-glow:hover {
//             box-shadow: 0 0 20px rgba(234, 179, 8, 0.5);
//           }

//           .glassmorphism {
//             background: rgba(255, 255, 255, 0.1);
//             backdrop-filter: blur(10px);
//             border: 1px solid rgba(255, 255, 255, 0.1);
//           }

//           .slide-enter {
//             transform: translateX(100%);
//           }

//           .slide-enter-active {
//             transform: translateX(0);
//             transition: transform 0.5s ease-in-out;
//           }

//           .slide-exit {
//             transform: translateX(0);
//           }

//           .slide-exit-active {
//             transform: translateX(-100%);
//             transition: transform 0.5s ease-in-out;
//           }
//         `
//       }} />

//       <div className="relative min-h-screen pt-12 md:pt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-gradient-radial from-white to-transparent"></div>
//         </div>

//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500 rounded-full opacity-10 animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-bounce"></div>
//           <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-500 rounded-full opacity-10 animate-ping"></div>
//         </div>

//         {/* Main Content */}
//         <div className="relative z-10 min-h-screen flex flex-col">
//           {/* Header Content */}
//           <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
//             <div className="max-w-7xl flex w-full ">
//               <div className="text-center lg:text-left ">
//                 {/* Title */}
//                 <div className="mb-6 sm:mb-8">
//                   <h1 className="animate-element animate-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight">
//                     {currentSlideData.title}
//                   </h1>
//                   <h2 className="animate-element animate-subtitle text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-yellow-400 mb-4 sm:mb-6">
//                     {currentSlideData.subtitle}
//                   </h2>
//                 </div>

//                 {/* Description */}
//                 <p className="animate-element animate-description text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed px-4 lg:px-0">
//                   {currentSlideData.description}
//                 </p>

//                 {/* Buttons */}
//                 <div className="animate-element animate-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12 px-4 lg:px-0">
//                   <Link 
//                     to="/register" 
//                     className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 button-glow shadow-lg text-center"
//                   >
//                     Register Now
//                   </Link>
//                   <Link 
//                     to="/login" 
//                     className="glassmorphism text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 text-center"
//                   >
//                     Sign In
//                   </Link>
//                 </div>
//               </div>

             
//             </div>
//           </div>

//           {/* Course Grid */}
//           <div className="px-4 sm:px-6 lg:px-8 mb-12 sm:pb-8">
//             <div className="max-w-7xl mx-auto">
//               <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
//                 {courses.map((course, index) => (
//                   <div
//                     key={index}
//                     className="animate-element animate-course"
//                     style={{ 
//                       animationDelay: `${1.4 + (index * 0.1)}s`,
//                       opacity: 0
//                     }}
//                   >
//                     <div className="glassmorphism rounded-lg p-3 sm:p-4 hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-yellow-500 group cursor-pointer min-h-[60px] flex items-center">
//                       <p className="text-white group-hover:text-yellow-400 transition-colors duration-300 font-medium text-sm sm:text-base text-center w-full">
//                         {course}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Controls */}
//         {/* <div className="absolute inset-y-0 left-0 flex items-center">
//           <button
//             onClick={prevSlide}
//             className="ml-2 sm:ml-4 p-2 sm:p-3 rounded-full glassmorphism text-white hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110 group"
//           >
//             <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//         </div>

//         <div className="absolute inset-y-0 right-0 flex items-center">
//           <button
//             onClick={nextSlide}
//             className="mr-2 sm:mr-4 p-2 sm:p-3 rounded-full glassmorphism text-white hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110 group"
//           >
//             <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div> */}

//         {/* Pagination Dots */}
//         <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
//           <div className="flex space-x-2 sm:space-x-3">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
//                   index === currentSlide
//                     ? 'bg-yellow-500 w-6 sm:w-8'
//                     : 'bg-white bg-opacity-40 hover:bg-opacity-60'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-black bg-opacity-20">
//           <div 
//             className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-500 ease-linear"
//             style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
//           />
//         </div>
//       </div>
//     </>
//   );
// }




// import { useRef, useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';

// export default function MainSlider() {
//   const { t, i18n } = useTranslation();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const intervalRef = useRef(null);
//   const totalSlides = 3;

//   const slides = t('slider.slides', { returnObjects: true });
//   const courses = t('slider.courses', { returnObjects: true });

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//     resetAnimations();
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % totalSlides);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
//   };

//   const resetAnimations = () => {
//     const animatedElements = document.querySelectorAll('.animate-element');
//     animatedElements.forEach(el => {
//       el.classList.remove('animate-active');
//       setTimeout(() => {
//         el.classList.add('animate-active');
//       }, 50);
//     });
//   };

//   useEffect(() => {
//     resetAnimations();
    
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
    
//     intervalRef.current = setInterval(() => {
//       nextSlide();
//     }, 5000);

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [currentSlide, i18n.language]);

//   useEffect(() => {
//     resetAnimations();
//   }, [currentSlide, i18n.language]);

//   const currentSlideData = slides[currentSlide];

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{
//         __html: `
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(40px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           @keyframes fadeInLeft {
//             from {
//               opacity: 0;
//               transform: translateX(${i18n.language === 'ar' ? '40px' : '-40px'});
//             }
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }

//           @keyframes fadeInScale {
//             from {
//               opacity: 0;
//               transform: scale(0.9);
//             }
//             to {
//               opacity: 1;
//               transform: scale(1);
//             }
//           }

//           .animate-element {
//             opacity: 0;
//             transition: all 0.3s ease;
//           }

//           .animate-title.animate-active {
//             animation: fadeInUp 1s ease-out forwards;
//             animation-delay: 0.2s;
//           }

//           .animate-subtitle.animate-active {
//             animation: fadeInLeft 0.8s ease-out forwards;
//             animation-delay: 0.5s;
//           }

//           .animate-description.animate-active {
//             animation: fadeInUp 0.8s ease-out forwards;
//             animation-delay: 0.8s;
//           }

//           .animate-buttons.animate-active {
//             animation: fadeInUp 0.8s ease-out forwards;
//             animation-delay: 1.1s;
//           }

//           .animate-course.animate-active {
//             animation: fadeInScale 0.6s ease-out forwards;
//           }

//           .button-glow:hover {
//             box-shadow: 0 0 20px rgba(234, 179, 8, 0.5);
//           }

//           .glassmorphism {
//             background: rgba(255, 255, 255, 0.1);
//             backdrop-filter: blur(10px);
//             border: 1px solid rgba(255, 255, 255, 0.1);
//           }
//         `
//       }} />

//       <div 
//         className={`relative min-h-screen pt-12 md:pt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}
//         dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
//       >
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-gradient-radial from-white to-transparent"></div>
//         </div>

//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500 rounded-full opacity-10 animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-bounce"></div>
//           <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-500 rounded-full opacity-10 animate-ping"></div>
//         </div>

//         {/* Main Content */}
//         <div className="relative z-10 min-h-screen flex flex-col ">
//           {/* Header Content */}

//           <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl flex w-full">
//               <div className={`text-center ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
//                 {/* Title */}
//                 <div className="mb-6 sm:mb-8">
//                   <h1 className="animate-element animate-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight">
//                     {currentSlideData.title}
//                   </h1>
//                   <h2 className="animate-element animate-subtitle text-2xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-5xl font-light text-yellow-400 mb-4 sm:mb-6">
//                     {currentSlideData.subtitle}
//                   </h2>
//                 </div>

//                 {/* Description */}
//                 <p className={`animate-element animate-description text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed px-4 lg:px-0 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
//                   {currentSlideData.description}
//                 </p>

//                 {/* Buttons */}
//                 <div className={`animate-element animate-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 ${i18n.language === 'ar' ? 'sm:flex-row-reverse' : ''} justify-center lg:justify-start mb-8 sm:mb-12 px-4 lg:px-0`}>
//                   <Link 
//                     to="/register" 
//                     className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 button-glow shadow-lg text-center"
//                   >
//                     {t('slider.buttons.register')}
//                   </Link>
//                   <Link 
//                     to="/login" 
//                     className="glassmorphism text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 text-center"
//                   >
//                     {t('slider.buttons.signIn')}
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Course Grid */}
//           <div className="px-4 sm:px-6 lg:px-8 mb-12 sm:pb-8">
//             <div className="max-w-7xl mx-auto">
//               <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
//                 {courses.map((course, index) => (
//                   <div
//                     key={index}
//                     className="animate-element animate-course"
//                     style={{ 
//                       animationDelay: `${1.4 + (index * 0.1)}s`,
//                       opacity: 0
//                     }}
//                   >
//                     <div className="glassmorphism rounded-lg p-3 sm:p-4 hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-yellow-500 group cursor-pointer min-h-[60px] flex items-center">
//                       <p className="text-white group-hover:text-yellow-400 transition-colors duration-300 font-medium text-sm sm:text-base text-center w-full">
//                         {course}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Pagination Dots */}
//         <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
//           <div className="flex space-x-2 sm:space-x-3">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
//                   index === currentSlide
//                     ? 'bg-yellow-500 w-6 sm:w-8'
//                     : 'bg-white bg-opacity-40 hover:bg-opacity-60'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 bg-opacity-20">
//           <div 
//             className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-500 ease-linear"
//             style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
//           />
//         </div>
//       </div>
//     </>
//   );
// }


// import { useRef, useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';

// export default function MainSlider() {
//   const { t, i18n } = useTranslation();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const intervalRef = useRef(null);
//   const totalSlides = 3;

//   const slides = t('slider.slides', { returnObjects: true });
//   const courses = t('slider.courses', { returnObjects: true });

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//     resetAnimations();
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % totalSlides);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
//   };

//   const resetAnimations = () => {
//     const animatedElements = document.querySelectorAll('.animate-element');
//     animatedElements.forEach(el => {
//       el.classList.remove('animate-active');
//       setTimeout(() => {
//         el.classList.add('animate-active');
//       }, 50);
//     });
//   };

//   useEffect(() => {
//     resetAnimations();
    
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
    
//     intervalRef.current = setInterval(() => {
//       nextSlide();
//     }, 5000);

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [currentSlide, i18n.language]);

//   useEffect(() => {
//     resetAnimations();
//   }, [currentSlide, i18n.language]);

//   const currentSlideData = slides[currentSlide];

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{
//         __html: `
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(40px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           @keyframes fadeInLeft {
//             from {
//               opacity: 0;
//               transform: translateX(${i18n.language === 'ar' ? '40px' : '-40px'});
//             }
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }

//           @keyframes fadeInScale {
//             from {
//               opacity: 0;
//               transform: scale(0.9);
//             }
//             to {
//               opacity: 1;
//               transform: scale(1);
//             }
//           }

//           .animate-element {
//             opacity: 0;
//             transition: all 0.3s ease;
//           }

//           .animate-title.animate-active {
//             animation: fadeInUp 1s ease-out forwards;
//             animation-delay: 0.2s;
//           }

//           .animate-subtitle.animate-active {
//             animation: fadeInLeft 0.8s ease-out forwards;
//             animation-delay: 0.5s;
//           }

//           .animate-description.animate-active {
//             animation: fadeInUp 0.8s ease-out forwards;
//             animation-delay: 0.8s;
//           }

//           .animate-buttons.animate-active {
//             animation: fadeInUp 0.8s ease-out forwards;
//             animation-delay: 1.1s;
//           }

//           .animate-course.animate-active {
//             animation: fadeInScale 0.6s ease-out forwards;
//           }

//           .button-glow:hover {
//             box-shadow: 0 0 20px rgba(234, 179, 8, 0.5);
//           }

//           .glassmorphism {
//             background: rgba(255, 255, 255, 0.1);
//             backdrop-filter: blur(10px);
//             border: 1px solid rgba(255, 255, 255, 0.1);
//           }
//         `
//       }} />

//       <div 
//         // className={`relative min-h-screen pt-12 md:pt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}
//         className={`relative min-h-screen pt-12 md:pt-8  bg-[#222222]  overflow-hidden ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}
//         dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
//       >
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-gradient-radial from-white to-transparent"></div>
//         </div>

//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500 rounded-full opacity-10 animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-bounce"></div>
//           <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-500 rounded-full opacity-10 animate-ping"></div>
//         </div>

//         {/* Main Content */}
//         <div className="relative z-10 min-h-screen  ">
//           {/* Header Content */}
// <div className="grid grid-cols-12 gap-2  p-8" >

//   <div className="col-span-12 md:col-span-8">
//       <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl flex w-full">
//               <div className={`text-center ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
//                 {/* Title */}
//                 <div className="mb-6 sm:mb-8">
//                   <h1 className="animate-element animate-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight">
//                     {currentSlideData.title}
//                   </h1>
//                   <h2 className="animate-element animate-subtitle text-2xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-5xl font-light text-yellow-400 mb-4 sm:mb-6">
//                     {currentSlideData.subtitle}
//                   </h2>
//                 </div>

//                 {/* Description */}
//                 <p className={`animate-element animate-description text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed px-4 lg:px-0 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
//                   {currentSlideData.description}
//                 </p>

//                 {/* Buttons */}
//                 <div className={`animate-element animate-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 ${i18n.language === 'ar' ? 'sm:flex-row-reverse' : ''} justify-center lg:justify-start mb-8 sm:mb-12 px-4 lg:px-0`}>
//                   <Link 
//                     to="/register" 
//                     className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 button-glow shadow-lg text-center"
//                   >
//                     {t('slider.buttons.register')}
//                   </Link>
//                   <Link 
//                     to="/login" 
//                     className="glassmorphism text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 text-center"
//                   >
//                     {t('slider.buttons.signIn')}
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//   </div>
//   <div className="col-span-12 md:col-span-4 ">
//   {/* Course Grid */}
//           <div className="px-4 sm:px-6 lg:px-8 mb-12 sm:pb-8">
//             <div className="max-w-7xl mx-auto pt-3">
//               <div className="grid grid-cols-1  gap-6 sm:gap-4 lg:gap-6">
//                 {courses.map((course, index) => (
//                   <div
//                     key={index}
//                     className="animate-element animate-course"
//                     style={{ 
//                       animationDelay: `${1.4 + (index * 0.1)}s`,
//                       opacity: 0
//                     }}
//                   >
//                     <div className="glassmorphism rounded-lg p-3 sm:p-4 hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-yellow-500 group cursor-pointer min-h-[60px] flex items-center">
//                       <p className="text-white group-hover:text-yellow-400 transition-colors duration-300 font-medium text-sm sm:text-base text-center w-full">
//                         {course}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//   </div>
// </div>
        

        
//         </div>

//         {/* Pagination Dots */}
//         <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
//           <div className="flex space-x-2 sm:space-x-3">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
//                   index === currentSlide
//                     ? 'bg-yellow-500 w-6 sm:w-8'
//                     : 'bg-white bg-opacity-40 hover:bg-opacity-60'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 bg-opacity-20">
//           <div 
//             className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-500 ease-linear"
//             style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
//           />
//         </div>
//       </div>
//     </>
//   );
// }





// import { useRef, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiRequest } from '../../Redux/Apis/apiRequest';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';


// export default function MainSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const intervalRef = useRef(null);
//   const totalSlides = 3;
//   let [slides , setSlides]= useState( [
//     {
//       title: "Learn Programming",
     
//       description: "Master the fundamentals of programming with our comprehensive courses designed for all skill levels."
//     },
//     {
//       title: "Web Development",
     
//       description: "Create stunning, responsive websites using the latest technologies and best practices."
//     },
//     {
//       title: "Mobile Apps",
   
//       description: "Develop powerful mobile applications for both iOS and Android platforms."
//     }
//   ]
// )
//  let [courses , setCourses] = useState([])
// let dispatch = useDispatch();
//  let {i18n} = useTranslation()






// let getSliders = async () => {
//   try {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/views`,
//       {
//         headers: {
//           "Accept-Language": localStorage.getItem("language") || "en",
//         },
//       }
//     );

//     console.log("Response:", response.data);
//     setSlides(response?.data?.data)
//      setCourses(response?.data?.sections)
    
//   } catch (error) {
//     if (error.response) {
//       // Server responded with an error (4xx or 5xx)
//       console.error("API Error:", error.response.data);
//       console.error("Status:", error.response.status);
//     } else if (error.request) {
//       // No response received
//       console.error("No response received:", error.request);
//     } else {
//       // Something went wrong before sending the request
//       console.error("Request setup error:", error.message);
//     }
//   }
// };


//   useEffect(()=>{

   
//       getSliders()
//   },[i18n.language])

 

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//     resetAnimations();
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % totalSlides);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
//   };

//   const resetAnimations = () => {
//     const animatedElements = document.querySelectorAll('.animate-element');
//     animatedElements.forEach(el => {
//       el.classList.remove('animate-active');
//       setTimeout(() => {
//         el.classList.add('animate-active');
//       }, 50);
//     });
//   };

//   useEffect(() => {
//     resetAnimations();
    
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
    
//     intervalRef.current = setInterval(() => {
//       nextSlide();
//     }, 5000);

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [currentSlide]);

//   useEffect(() => {
//     resetAnimations();
//   }, [currentSlide]);

//   const currentSlideData = slides[currentSlide];

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{
//         __html: `
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(40px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           @keyframes fadeInLeft {
//             from {
//               opacity: 0;
//               transform: translateX(-40px);
//             }
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }

//           @keyframes fadeInScale {
//             from {
//               opacity: 0;
//               transform: scale(0.9);
//             }
//             to {
//               opacity: 1;
//               transform: scale(1);
//             }
//           }

//           .animate-element {
//             opacity: 0;
//             transition: all 0.3s ease;
//           }

//           .animate-title.animate-active {
//             animation: fadeInUp 1s ease-out forwards;
//             animation-delay: 0.2s;
//           }

//           .animate-subtitle.animate-active {
//             animation: fadeInLeft 0.8s ease-out forwards;
//             animation-delay: 0.5s;
//           }

//           .animate-description.animate-active {
//             animation: fadeInUp 0.8s ease-out forwards;
//             animation-delay: 0.8s;
//           }

//           .animate-buttons.animate-active {
//             animation: fadeInUp 0.8s ease-out forwards;
//             animation-delay: 1.1s;
//           }

//           .animate-course.animate-active {
//             animation: fadeInScale 0.6s ease-out forwards;
//           }

//           .button-glow:hover {
//             box-shadow: 0 0 20px rgba(234, 179, 8, 0.5);
//           }

//           .glassmorphism {
//             background: rgba(255, 255, 255, 0.1);
//             backdrop-filter: blur(10px);
//             border: 1px solid rgba(255, 255, 255, 0.1);
//           }

//           .bg-image-overlay {
//             background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7));
//           }
//         `
//       }} />

//       <div 
//         className="relative min-h-screen pt-12 md:pt-8 overflow-hidden"
//         style={{
//           backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           backgroundAttachment: 'fixed'
//         }}
//       >
//         {/* Dark Overlay for better text readability */}
//         <div className="absolute inset-0 bg-image-overlay"></div>

//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-gradient-radial from-white to-transparent"></div>
//         </div>

//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500 rounded-full opacity-10 animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-bounce"></div>
//           <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-500 rounded-full opacity-10 animate-ping"></div>
//         </div>

//         {/* Main Content */}
//         <div className="relative z-10 min-h-screen md:min-h-[76vh]">
//           {/* Header Content */}
//           <div className="grid grid-cols-12 gap-2 p-8">

//             <div className="col-span-12 md:col-span-8">
//               <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//                 <div className="max-w-7xl flex w-full">
//                   <div className="text-center text-left">
//                     {/* Title */}
//                     <div className="mb-6 sm:mb-8">
//                       <h1 className="animate-element animate-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight">
//                         {currentSlideData.title}
//                       </h1>
//                       <h2 className="animate-element animate-subtitle text-2xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-5xl font-light text-yellow-400 mb-4 sm:mb-6">
//                         {currentSlideData.subtitle}
//                       </h2>
//                     </div>

//                     {/* Description */}
//                     <p className="animate-element animate-description text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed px-4 lg:px-0 text-left">
//                       {currentSlideData.description}
//                     </p>

//                     {/* Buttons */}
//                     <div className="animate-element animate-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12 px-4 lg:px-0">
//                       <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 button-glow shadow-lg text-center">
//                         Register Now
//                       </button>
//                       <button className="glassmorphism text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 text-center">
//                         Sign In
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="col-span-12 md:col-span-4">
//               {/* Course Grid */}
//               {/* <div className="px-4 sm:px-6 lg:px-8 mb-12 sm:pb-8">
//                 <div className="max-w-7xl mx-auto pt-3">
//                   <div className="grid grid-cols-1 gap-6 sm:gap-4 lg:gap-6">
//                     {courses.map((course, index) => (
//                       <div
//                         key={index}
//                         className="animate-element animate-course"
//                         style={{ 
//                           animationDelay: `${1.4 + (index * 0.1)}s`,
//                           opacity: 0
//                         }}
//                       >
//                         <div className="glassmorphism rounded-lg p-3 sm:p-4 hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-yellow-500 group cursor-pointer min-h-[60px] flex items-center">
//                           <p className="text-white group-hover:text-yellow-400 transition-colors duration-300 font-medium text-sm sm:text-base text-center w-full">
//                             {course}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         </div>

//         {/* Pagination Dots */}
//         <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
//           <div className="flex space-x-2 sm:space-x-3">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
//                   index === currentSlide
//                     ? 'bg-yellow-500 w-6 sm:w-8'
//                     : 'bg-white bg-opacity-40 hover:bg-opacity-60'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 bg-opacity-20">
//           <div 
//             className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-500 ease-linear"
//             style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
//           />
//         </div>
//       </div>
//     </>
//   );
// }


import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../../Redux/Apis/apiRequest';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function MainSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
 

  const [slides, setSlides] = useState([]);
 
  const [isLoading, setIsLoading] = useState(true);
  
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  // Calculate totalSlides dynamically based on actual slides length
  const totalSlides = slides.length;

  const getSliders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/views`,
        {
          headers: {
            "Accept-Language": localStorage.getItem("language") || "en",
          },
        }
      );

      console.log("Response:", response.data);
      
      // Check if response.data exists and has the expected structure
      if (response?.data) {
        // Set slides with fallback to default if data is empty or invalid
        if (response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
          console.log({aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:response.data.data});
          
          setSlides(response.data.data);
        } else {
          console.warn("No valid slides data received, using default slides");
        
        }

        // Set courses with fallback to empty array
        if (response.data.sections && Array.isArray(response.data.sections)) {
          setCourses(response.data.sections);
        } else {
          console.warn("No valid sections data received");
        
        }
      }
    } catch (error) {
      console.error("Failed to fetch slider data, using defaults");
     
 
      
      if (error.response) {
        console.error("API Error:", error.response.data);
        console.error("Status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Request setup error:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSliders();
  }, [i18n.language]);

  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
      resetAnimations();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const resetAnimations = () => {
    const animatedElements = document.querySelectorAll('.animate-element');
    animatedElements.forEach(el => {
      el.classList.remove('animate-active');
      setTimeout(() => {
        el.classList.add('animate-active');
      }, 50);
    });
  };

  useEffect(() => {
    resetAnimations();
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Only start auto-slide if we have slides and not loading
    if (!isLoading && totalSlides > 0) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, isLoading, totalSlides]);

  useEffect(() => {
    resetAnimations();
  }, [currentSlide]);

  // Ensure currentSlide is within bounds
  const safeCurrentSlide = Math.min(currentSlide, totalSlides - 1);
  const currentSlideData = slides[safeCurrentSlide];

  // Show loading state or return early if no data
  if (isLoading) {
    return (
      <div className="relative min-h-screen pt-12 md:pt-8 overflow-hidden flex items-center justify-center bg-gray-900">
        
      </div>
    );
  }

  // Safety check: if no slides available, show error state
  if (!currentSlideData || totalSlides === 0) {
    return (
      <div className="relative min-h-screen pt-12 md:pt-8 overflow-hidden flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">No slides available</div>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-element {
            opacity: 0;
            transition: all 0.3s ease;
          }

          .animate-title.animate-active {
            animation: fadeInUp 1s ease-out forwards;
            animation-delay: 0.2s;
          }

          .animate-subtitle.animate-active {
            animation: fadeInLeft 0.8s ease-out forwards;
            animation-delay: 0.5s;
          }

          .animate-description.animate-active {
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 0.8s;
          }

          .animate-buttons.animate-active {
            animation: fadeInUp 0.8s ease-out forwards;
            animation-delay: 1.1s;
          }

          .animate-course.animate-active {
            animation: fadeInScale 0.6s ease-out forwards;
          }

          .button-glow:hover {
            box-shadow: 0 0 20px rgba(234, 179, 8, 0.5);
          }

          .glassmorphism {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .bg-image-overlay {
            background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7));
          }
        `
      }} />

      <div 
        className="relative min-h-screen pt-12 md:pt-8 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-image-overlay"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-radial from-white to-transparent"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-500 rounded-full opacity-10 animate-ping"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen md:min-h-[76vh]">
          {/* Header Content */}
          <div className="grid grid-cols-12 gap-2 p-8">
            <div className="col-span-12 md:col-span-8">
              <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl flex w-full">
                  <div className={i18n.language=="ar"? "text-right":"text-left"}>
                    {/* Title */}
                    <div className="mb-6 sm:mb-8">
                      <h1 className="animate-element animate-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                        {currentSlideData?.title || 'Welcome'}
                      </h1>
                      <h2 className="animate-element animate-subtitle text-2xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-5xl font-light text-yellow-400 mb-4 sm:mb-6">
                        {currentSlideData?.subtitle || ''}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="animate-element animate-description text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed px-4 lg:px-0 text-left">
                      {currentSlideData?.description || 'Loading content...'}
                    </p>

                    {/* Buttons */}
                    <div className="animate-element animate-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12 px-4 lg:px-0">
                      <Link  to={"/register"} className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 button-glow shadow-lg text-center">
                        
                        {i18n.language =="ar" ?  "سجل الان" : "Register Now"}
                      </Link>
                      <Link  to={"/login"} className="glassmorphism text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 text-center">
                        
                        {i18n.language =="ar" ?  "تسجيل دخول" : "Sign In"}


                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* <div className="col-span-12 md:col-span-4">
          
              <div className="px-4 sm:px-6 lg:px-8 mb-12 sm:pb-8">
                <div className="max-w-7xl mx-auto pt-3">
                  <div className="grid grid-cols-1 gap-6 sm:gap-4 lg:gap-6">
                    {courses && courses.length > 0 ? courses.map((course, index) => (
                      <div
                        key={index}
                        className="animate-element animate-course"
                        style={{ 
                          animationDelay: `${1.4 + (index * 0.1)}s`,
                          opacity: 0
                        }}
                      >
                        <div className="glassmorphism rounded-lg p-3 sm:p-4 hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-yellow-500 group cursor-pointer min-h-[60px] flex items-center">
                          <p className="text-white group-hover:text-yellow-400 transition-colors duration-300 font-medium text-sm sm:text-base text-center w-full">
                            {course?.name || course?.title || course}
                          </p>
                        </div>
                      </div>
                    )) : (
                      <div className="text-white text-center py-4">
                        <p>No courses available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2 sm:space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-yellow-500 w-6 sm:w-8'
                    : 'bg-white bg-opacity-40 hover:bg-opacity-60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 bg-opacity-20">
          <div 
            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-500 ease-linear"
            style={{ width: `${totalSlides > 0 ? ((currentSlide + 1) / totalSlides) * 100 : 0}%` }}
          />
        </div>
      </div>
    </>
  );
}