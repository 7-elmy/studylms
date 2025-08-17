


import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from "../../assets/student.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../../Redux/Apis/apiRequest';

export default function About() {
  // const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { t, i18n } = useTranslation();
    let {about} = useSelector((state) => state.api);
  //  //console.log({about});
  
  let dispatch = useDispatch();
  

 
 


  useEffect(()=>{
    dispatch(apiRequest({
      entity: "about",
      url:"api/about_us"
    }))
  },[dispatch , localStorage.getItem('language') ]);



  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            {about?.data?.data?.title  }
          </h2>
        </div>

        {/* Testimonial Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            {/* Testimonial Content */}
            <div className="mx-8 sm:mx-16 lg:mx-20 text-center px-4 sm:px-6">
              {/* Author Info */}
              <div className="space-y-2">
                {/* Profile Image */}
                <div className="w-64 h-64 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <img src={about?.data?.data?.image} className='rounded-full' alt={about?.data?.data?.name+"12"} />
                </div>
                
                {/* Author Name */}
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  { about?.data?.data?.name||"Michael Chen"}
                </h3>
              </div>
              
              {/* Quote */}
              <div className="mb-8 sm:mb-12">
                <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed italic">
                  {about?.data?.data?.description}
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}