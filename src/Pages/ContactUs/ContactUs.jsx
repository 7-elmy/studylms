import React from 'react'
import DynamicBreadcrumb from '../../Components/Ui/DynamicBreadcrumb'
import { useState } from "react";
import { Phone, Mail, MapPin, ChevronUp, Smartphone } from "lucide-react";
import { MapComponent } from '../../Components/Ui/Map';

export default function ContactUs() {

      const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [showScrollTop, setShowScrollTop] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div>
      <DynamicBreadcrumb   MainTitle={"Contact Us"} BreadCrumbs={[{label:"home" , href:"/home"} , {label:"contact"}]} />

 <div className="min-h-screen bg-gray-50 py-16 px-4 relative">
      <div className="max-w-6xl mx-auto mb-5">
        
        {/* Contact Details Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Contact Details
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to our Website. We are glad to have you around.
          </p>
        </div>

        {/* mail Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Phone Card */}
          <div className="text-center p-8  flex items-center gap-1  ">
            <div className="flex items-center justify-center w-16 h-16  mt-4 rounded-lg mb-6">
              <Smartphone  className="w-8 h-8 text-yellow-500" />
            </div>

            <div>
            <h3 className="text-sm font-semibold text-gray-800   text-left">
              GIVE US A CALL
            </h3>
            <p className="text-gray-600 text-[12px] leading-relaxed text-left">
              +61 (800) 659-2684, +61 (800) 659-5214
            </p>

            </div>
          </div>

          {/* Email Card */}
          <div className="text-center p-8  flex items-center gap-1  ">
            <div className="flex items-center justify-center w-16 h-16  mt-4 rounded-lg mb-6">
               <Mail className="w-8 h-8 text-yellow-500" />
            </div>

            <div>
            <h3 className="text-sm font-semibold text-gray-800   text-left">
               SEND US A MESSAGE
            </h3>
            <p className="text-gray-600 text-[12px] leading-relaxed text-left">
               ExampleId@cyberlms.com
            </p>

            </div>
          </div>

            {/* Location Card */}
          <div className="text-center p-8  flex items-center gap-1  ">
            <div className="flex items-center justify-center w-16 h-16  mt-4 rounded-lg mb-6">
                <MapPin className="w-8 h-8 text-yellow-500" />
            </div>

            <div>
            <h3 className="text-sm font-semibold text-gray-800   text-left">
               VISIT OUR LOCATION
            </h3>
            <p className="text-gray-600 text-[12px] leading-relaxed text-left">
               9015 Sunset Boulevard United Kingdom
            </p>

            </div>
          </div>
        

        </div>



        {/* Contact Form Section */}
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Drop Us a Message
            </h2>
            <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message"
                required
                rows={6}
                className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500 resize-vertical"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center px-8 py-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-200 transition-all duration-200 transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>


      <MapComponent/>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-200 transition-all duration-200 transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 mx-auto" />
        </button>
      )}
    </div>

    </div>
  )
}





