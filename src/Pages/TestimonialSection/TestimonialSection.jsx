import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialSection() {
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
            What People Say
          </h2>
        </div>

        {/* Testimonial Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 sm:left-4 lg:left-8 z-10 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-gray-800 transition-colors" />
            </button>

            {/* Testimonial Content */}
            <div className="mx-8 sm:mx-16 lg:mx-20 text-center px-4 sm:px-6">
              {/* Quote */}
              <div className="mb-8 sm:mb-12">
                <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="space-y-2">
                {/* Profile Image Placeholder */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full"></div>
                </div>
                
                {/* Author Name */}
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {testimonials[currentTestimonial].author}
                </h3>
                
                {/* Position and Company */}
                <p className="text-base sm:text-lg text-gray-500">
                  <span className="font-medium">{testimonials[currentTestimonial].company}</span>
                  <span className="mx-1">-</span>
                  <span>{testimonials[currentTestimonial].position}</span>
                </p>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextTestimonial}
              className="absolute right-0 sm:right-4 lg:right-8 z-10 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-gray-800 transition-colors" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 sm:mt-12 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                  currentTestimonial === index 
                    ? 'bg-gray-800' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}