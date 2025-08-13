import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import  logo  from "../../assets/student.jpg"
export default function About() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Trent from punchy rollie grab us a waggin school. Flat out like a bludger where he hasn't got a damper. As stands out like brass razoo heaps it'll be relo. As busy as a paddock.",
      author: "Nethor",
      position: "Developer",
      company: "Nethor Doct"
    },
    {
      text: "Amazing experience working with this team. They delivered exactly what we needed and exceeded our expectations in every way possible.",
      author: "Sarah Johnson",
      position: "Product Manager",
      company: "Tech Corp"
    },
    {
      text: "Professional, reliable, and innovative. This collaboration has been instrumental in achieving our project goals and milestones.",
      author: "Michael Chen",
      position: "CTO",
      company: "StartupXYZ"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            About Me
          </h2>
        </div>

        {/* Testimonial Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
           

            {/* Testimonial Content */}
            <div className="mx-8 sm:mx-16 lg:mx-20 text-center px-4 sm:px-6">

              {/* Author Info */}
              <div className="space-y-2">
                {/* Profile Image Placeholder */}
                <div className="w-64 h-64  bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                
                    <img src={logo} className='rounded-full' alt="" />
                 
                </div>
                
                {/* Author Name */}
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  "Michael Chen"
                </h3>
              
                
               
              </div>
              {/* Quote */}
              <div className="mb-8 sm:mb-12">
                <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed italic">
                       "Professional, reliable, and innovative. This collaboration has been instrumental in achieving our project goals and milestones.",

                </blockquote>
              </div>

              
            </div>

           
          </div>

        
        </div>
      </div>
    </section>
  );
}