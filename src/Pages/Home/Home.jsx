// import React, { useEffect } from "react";
// import CourseSlider from "./CourseSlider";
// import HowClassesWork from "./HowClassesWork";
// import About from "../About/About";
// import LearningPlatformHero from "./LearningPlatformHero";
// import NewsletterSignup from "../NewLetterSignup/NewLetterSignup";
// import MainSlider from "./SilderSwiper";
// import FutureSection from "./FeaturesSection";

// export default function Home() {

//   useEffect(()=>{
    
//   },[])
//   return (
//     <>
//       <div className=" relative  ">
//         <MainSlider />

//         <div className=" md:absolute bottom-[0.5px] left-[8px] md:left-[80px] lg:left-[180px] z-10 md:w-[80%]  w-full">
//           <FutureSection />
//         </div>
//       </div>

//       <div className="mt-16">
//         <CourseSlider />
//       </div>

//       <HowClassesWork />

//       <About />

//       <LearningPlatformHero />
//       <NewsletterSignup />
//     </>
//   );
// }


import React, { useEffect } from "react";
import CourseSlider from "./CourseSlider";
import HowClassesWork from "./HowClassesWork";
import About from "../About/About";
import LearningPlatformHero from "./LearningPlatformHero";
import NewsletterSignup from "../NewLetterSignup/NewLetterSignup";
import MainSlider from "./SilderSwiper";
import FutureSection from "./FeaturesSection";

export default function Home() {
  useEffect(()=>{
    
  },[])
  return (
    <>
      <div className="rela">
        <MainSlider />

        {/* <div className="md:absolute bottom-[0.5px] left-[8px] md:left-[80px] lg:left-[180px] z-10 md:w-[80%] w-full">
          <FutureSection />
          </div> */}
      </div>

      <div className="mt-16">
        <CourseSlider />
      </div>
          <About />

      <HowClassesWork />


      <LearningPlatformHero />
      <NewsletterSignup />
    </>
  );
}