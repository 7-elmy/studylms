


import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Mock Link component since react-router-dom isn't available
const Link = ({ children, className, ...props }) => (
  <a href="#" className={className} {...props}>
    {children}
  </a>
);

export default function MainSlider() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    const resetAnimations = (slideIndex) => {
      // Reset all animations by removing and re-adding animation classes
      const slide = swiper.slides[slideIndex];
      if (!slide) return;

      const animatedElements = slide.querySelectorAll('.animate-title, .animate-paragraph, .animate-buttons, .animate-button-1, .animate-button-2, .animate-feature-1, .animate-feature-2, .animate-feature-3');
      
      animatedElements.forEach(el => {
        // Remove animation classes
        el.classList.remove('animate-active');
        // Force reflow
        el.offsetHeight;
        // Add animation class back
        el.classList.add('animate-active');
      });
    };

    const handleSlideChange = () => {
      resetAnimations(swiper.activeIndex);
    };

    // Initial animation for first slide
    setTimeout(() => resetAnimations(0), 100);

    // Listen for slide changes
    swiper.on('slideChange', handleSlideChange);

    return () => {
      swiper.off('slideChange', handleSlideChange);
    };
  }, []);

  return (
    <div className="relative">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-title {
          opacity: 0;
          transform: translateY(30px);
        }

        .animate-title.animate-active {
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.3s;
        }

        .animate-paragraph {
          opacity: 0;
          transform: translateY(30px);
        }

        .animate-paragraph.animate-active {
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.8s;
        }

        .animate-buttons {
          opacity: 0;
          transform: translateY(30px);
        }

        .animate-buttons.animate-active {
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 1.3s;
        }

        .animate-button-1 {
          opacity: 0;
          transform: translateX(-30px);
        }

        .animate-button-1.animate-active {
          animation: fadeInLeft 0.6s ease-out forwards;
          animation-delay: 1.5s;
        }

        .animate-button-2 {
          opacity: 0;
          transform: translateX(-30px);
        }

        .animate-button-2.animate-active {
          animation: fadeInLeft 0.6s ease-out forwards;
          animation-delay: 1.7s;
        }

        .animate-feature-1 {
          opacity: 0;
          transform: translateX(-30px);
        }

        .animate-feature-1.animate-active {
          animation: fadeInLeft 0.6s ease-out forwards;
          animation-delay: 2.0s;
        }

        .animate-feature-2 {
          opacity: 0;
          transform: translateX(-30px);
        }

        .animate-feature-2.animate-active {
          animation: fadeInLeft 0.6s ease-out forwards;
          animation-delay: 2.3s;
        }

        .animate-feature-3 {
          opacity: 0;
          transform: translateX(-30px);
        }

        .animate-feature-3.animate-active {
          animation: fadeInLeft 0.6s ease-out forwards;
          animation-delay: 2.6s;
        }
      `}</style>

      <Swiper
        ref={swiperRef}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper relative h-[100vh] w-full !bg-[#2222]"
      >
        <SwiperSlide className="h-[100vh] w-full pt-12  flex flex-col items-center justify-center ">
          <div className="text-white flex justify-center items-center  bg-[#2222] w-full">
            <div className='w-[80%] space-y-4 p-6'>
              <h2 className="text-3xl hidden md:block   md:text-6xl font-bold md:ps-4 text-left animate-title">
                Education & Training <br/>
                Organization
              </h2>
              <h2 className="text-3xl md:hidden block   md:text-4xl font-bold md:ps-4 text-left animate-title">
                Education & Training 
                Organization
              </h2>
              
              <p className=' text-center md:text-left w-[90%] md:w-[60%] lg:w-[50%] animate-paragraph'>
                We offer the most complete course package in the country, for the research, design and development of Education.
              </p>

              <div className='flex gap-8 items-center pt-4 animate-buttons'>
                <Link className='bg-yellow-500 w-[200px] text-white p-3 text-sm hover:bg-yellow-600 transition-colors animate-button-1'>
                  Our Courses
                </Link>
                <Link className='bg-white  text-gray-800 p-3 w-[200px] text-sm text-center hover:bg-gray-100 transition-colors animate-button-2'>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="h-[100vh] w-full pt-12  flex flex-col items-center justify-center ">
          <div className="text-white flex justify-center items-center  bg-[#22222] w-full">
            <div className='w-[80%] space-y-4 p-6'>
                   <h2 className="text-3xl hidden md:block   md:text-6xl font-bold md:ps-4 text-left animate-title">
                Education & Training <br/>
                Organization222
              </h2>
              <h2 className="text-3xl md:hidden block   md:text-4xl font-bold md:ps-4 text-left animate-title">
                Education & Training 
                Organization22222
              </h2>
              
              <p className=' text-center md:text-left w-[90%] md:w-[60%] lg:w-[50%] animate-paragraph'>
                We offer the most complete course package in the country, for the research, design and development of Education.
              </p>

              <div className='flex gap-8 items-center pt-4 animate-buttons'>
                <Link className='bg-yellow-500 w-[200px] text-white p-3 text-sm hover:bg-yellow-600 transition-colors animate-button-1'>
                  Our Courses
                </Link>
                <Link className='bg-white  text-gray-800 p-3 w-[200px] text-sm text-center hover:bg-gray-100 transition-colors animate-button-2'>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="h-[100vh] w-full pt-12  flex flex-col items-center justify-center ">
          <div className="text-white flex justify-center items-center  bg-[#22222] w-full">
            <div className='w-[80%] space-y-4 p-6'>
                    <h2 className="text-3xl hidden md:block   md:text-6xl font-bold md:ps-4 text-left animate-title">
                Education & Training <br/>
                Organization33
              </h2>
              <h2 className="text-3xl md:hidden block   md:text-4xl font-bold md:ps-4 text-left animate-title">
                Education & Training 
                Organization33
              </h2>
              
              <p className=' text-center md:text-left w-[90%] md:w-[60%] lg:w-[50%] animate-paragraph'>
                We offer the most complete course package in the country, for the research, design and development of Education.
              </p>

              <div className='flex gap-8 items-center pt-4 animate-buttons'>
                <Link className='bg-yellow-500 w-[200px] text-white p-3 text-sm hover:bg-yellow-600 transition-colors animate-button-1'>
                  Our Courses
                </Link>
                <Link className='bg-white  text-gray-800 p-3 w-[200px] text-sm text-center hover:bg-gray-100 transition-colors animate-button-2'>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

 
      </Swiper>

    

      {/* Custom Navigation Buttons */}
      <button
        onClick={() => swiperRef.current?.swiper?.slidePrev()}
        className="absolute top-1/2 left-2 md:left-8 transform -translate-y-1/2 z-10 bg-gray-400 py-4 bg-opacity-20 hover:bg-opacity-40 text-white px-2 rounded-md backdrop-blur-sm transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => swiperRef.current?.swiper?.slideNext()}
        className="absolute top-1/2 right-2 md:right-8 transform -translate-y-1/2 z-10 bg-gray-400 py-4 bg-opacity-20 hover:bg-opacity-40 text-white px-2 rounded-md backdrop-blur-sm transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}


