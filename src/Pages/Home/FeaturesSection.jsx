import axios from "axios";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function FutureSection() {
   let [courses , setCourses] = useState([])
   let {i18n} = useTranslation()

   
   
   let getSliders = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/views`,
      {
        headers: {
          "Accept-Language": localStorage.getItem("language") || "en",
        },
      }
    );

    console.log("Response in futer:", response.data.data[0].sections);
    setCourses(response.data.data[0].sections)
    console.log("Response in futer:", response?.data[0].sections);
   
    
  } catch (error) {
    if (error.response) {
      // Server responded with an error (4xx or 5xx)
      console.error("API Error:", error.response.data);
      console.error("Status:", error.response.status);
    } else if (error.request) {
      // No response received
      console.error("No response received:", error.request);
    } else {
      // Something went wrong before sending the request
      console.error("Request setup error:", error.message);
    }
  }
};
useEffect(()=>{getSliders()},[i18n.language])
  return (
    <div>
      <div className="flex justify-center items-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600  rounded-md ">
        <div className="w-full">
          <div className={`grid grid-cols-12 md:grid-cols-${courses.length}  `}>
            {courses?.map(ele=>(

            <FeatureCard  key={ele.id} title={ele.name} to="#" />
            ))}
            {/* <FeatureCard  title="Second Preparatory " to="#" />
            <FeatureCard  title="Third Preparatory  " to="#" />
            <FeatureCard  title="First Secondary " to="#" /> */}
            
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
    <div className=" col-span-12 md:col-span-2  shadow-lg py-8 px-4">
      <a
        href={to}
        className="group flex items-center gap-4 text-white hover:text-yellow-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg p-2"
        onFocus={handleFocus}
      >
      
        
        <div className="flex items-center gap-2">
          <div className='w-10  h-10 bg-amber-50 text-amber-700 flex justify-center items-center rounded-full'>
            <BookOpen className="animate" />
          </div>
          <h2 className="text-sm  ">{title}</h2>
        
         
        </div>
      </a>
    </div>
  )
}