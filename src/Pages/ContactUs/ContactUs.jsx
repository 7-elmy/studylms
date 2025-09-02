// import React, { useEffect } from 'react'
// import DynamicBreadcrumb from '../../Components/Ui/DynamicBreadcrumb'
// import { useState } from "react";
// import { Phone, Mail, MapPin, ChevronUp, Smartphone } from "lucide-react";
// import MapComponent, { ClickableMapText } from '../../Components/Ui/Map';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiRequest } from '../../Redux/Apis/apiRequest';


// export default function ContactUs() {

//       const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   let dispatch = useDispatch();
//   let { contactus } = useSelector((state) => state.api);
//   console.log({contactus});
//   useEffect(()=>{
//     dispatch(apiRequest({
//       entity: "contactus",
//       url: "api/contact_us",
//       method: "GET",
//        headers: {
//              "Accept-Language": localStorage.getItem('language') || 'en',
              
//             },
//     }))

//   },[ dispatch , localStorage.getItem('language')]);
  
  
//   // const [showScrollTop, setShowScrollTop] = useState(true);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     //console.log('Form submitted:', formData);
//     // Handle form submission here
//     alert('Message sent successfully!');
//     setFormData({ name: '', email: '', message: '' });
//   };



//   return (
//     <div>
//       <DynamicBreadcrumb   MainTitle={"Contact Us"} BreadCrumbs={[{label:"home" , href:"/home"} , {label:"contact"}]} />

//  <div className="min-h-screen bg-gray-50 py-16 px-4 relative">
//       <div className="max-w-6xl mx-auto mb-5">
        
//         {/* Contact Details Section */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//             Contact Details
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Welcome to our Website. We are glad to have you around.
//           </p>
//         </div>

//         {/* mail Info Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
//           {/* Phone Card */}
//           <div className="text-center p-8  flex items-center gap-1  ">
//             <div className="flex items-center justify-center w-16 h-16  mt-4 rounded-lg mb-6">
//               <Smartphone  className="w-8 h-8 text-yellow-500" />
//             </div>

//             <div>
//             <h3 className="text-sm font-semibold text-gray-800   text-left">
//               GIVE US A CALL
//             </h3>
//             <p className="text-gray-600 text-[12px] leading-relaxed text-left">
//              {contactus?.data?.data?.phone}
//             </p>

//             </div>
//           </div>

//           {/* Email Card */}
//           <div className="text-center p-8  flex items-center gap-1  ">
//             <div className="flex items-center justify-center w-16 h-16  mt-4 rounded-lg mb-6">
//                <Mail className="w-8 h-8 text-yellow-500" />
//             </div>

//             <div>
//             <h3 className="text-sm font-semibold text-gray-800   text-left">
//                SEND US A MESSAGE
//             </h3>
//             <p className="text-gray-600 text-[12px] leading-relaxed text-left">
//                {contactus?.data?.data?.email}
//             </p>

//             </div>
//           </div>

//             {/* Location Card */}
//           <div className="text-center p-8  flex items-center gap-1  ">
//             <div className="flex items-center justify-center w-16 h-16  mt-4 rounded-lg mb-6">
//                 <MapPin className="w-8 h-8 text-yellow-500" />
//             </div>

//             <div>
//             <h3 className="text-sm font-semibold text-gray-800   text-left">
//                VISIT OUR LOCATION
//             </h3>
//             <p className="text-gray-600 text-[12px] leading-relaxed text-left">
              
//                <ClickableMapText/>
//             </p>

//             </div>
//           </div>
        

//         </div>



//         {/* Contact Form Section */}
        
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-800 mb-4">
//               Drop Us a Message
//             </h2>
//             <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
//           </div>

//           {/* Contact Form */}
//           <div className="space-y-6">
//             {/* Name and Email Row */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Your Name"
//                   required
//                   className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="Email"
//                   required
//                   className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500"
//                 />
//               </div>
//             </div>

//             {/* Message Field */}
//             <div>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleInputChange}
//                 placeholder="Message"
//                 required
//                 rows={6}
//                 className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500 resize-vertical"
//               />
//             </div>

//             {/* Submit Button */}
//             <div className="text-center">
//               <button
//                 onClick={handleSubmit}
//                 className="inline-flex items-center px-8 py-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-200 transition-all duration-200 transform hover:scale-105"
//               >
//                 Send Message
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>


//       <MapComponent/>

   
//     </div>

//     </div>
//   )
// }



import React, { useEffect } from 'react'
import DynamicBreadcrumb from '../../Components/Ui/DynamicBreadcrumb'
import { useState } from "react";
import { Phone, Mail, MapPin, ChevronUp, Smartphone } from "lucide-react";
import MapComponent, { ClickableMapText } from '../../Components/Ui/Map';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../../Redux/Apis/apiRequest';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function ContactUs() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  let dispatch = useDispatch();
  let { contactus } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(apiRequest({
      entity: "contactus",
      url: "api/contact_us",
      method: "GET",
      headers: {
        "Accept-Language": localStorage.getItem('language') || 'en',
      },
    }))
  }, [dispatch, localStorage.getItem('language')]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(t('contact.messageSent'));
    toast("تم الارسال بنجاح")
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <DynamicBreadcrumb 
        MainTitle={t('contact.title')} 
        BreadCrumbs={[
          {label: t('breadcrumbs.home'), href:"/"}, 
          {label: t('breadcrumbs.contact')}
        ]} 
      />

      <div className="min-h-screen bg-gray-50 py-16 px-4 relative">
        <div className="max-w-6xl mx-auto mb-5">
          {/* Contact Details Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t('contact.contactDetails')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('contact.welcomeMessage')}
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Phone Card */}
            <div className="text-center p-8 flex items-center gap-1">
              <div className="flex items-center justify-center w-16 h-16 mt-4 rounded-lg mb-6">
                <Smartphone className="w-8 h-8 text-yellow-500" />
              </div>
              <div>
                <h3 className={`text-sm font-semibold text-gray-800 ${i18n.language=="ar" ? "text-right":"text-left"} `}>
                  {t('contact.callUs')}
                </h3>
                <p className="text-gray-600 text-[12px] leading-relaxed text-left">
                  {contactus?.data?.data?.phone}
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="text-center p-8 flex items-center gap-1">
              <div className="flex items-center justify-center w-16 h-16 mt-4 rounded-lg mb-6">
                <Mail className="w-8 h-8 text-yellow-500" />
              </div>
              <div>
                <h3 className={`text-sm font-semibold text-gray-800 ${i18n.language=="ar" ? "text-right":"text-left"} `}>
                  {t('contact.emailUs')}
                </h3>
                <p className={"text-gray-600 text-[12px] leading-relaxed text-left"}>
                  {contactus?.data?.data?.email}
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="text-center p-8 flex items-center gap-1">
              <div className="flex items-center justify-center w-16 h-16 mt-4 rounded-lg mb-6">
                <MapPin className="w-8 h-8 text-yellow-500" />
              </div>
              <div>
                <h3 className={`text-sm font-semibold text-gray-800 ${i18n.language=="ar" ? "text-right":"text-left"} `}>
                  {t('contact.visitUs')}
                </h3>
                <p className="text-gray-600 text-[12px] leading-relaxed text-left">
                  <ClickableMapText/>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {t('contact.sendMessage')}
              </h2>
              <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
            </div>

            {/* Contact Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('contact.namePlaceholder')}
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
                    placeholder={t('contact.emailPlaceholder')}
                    required
                    className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500"
                  />
                </div>
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('contact.messagePlaceholder')}
                  required
                  rows={6}
                  className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500 resize-vertical"
                />
              </div>

              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center px-8 py-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-200 transition-all duration-200 transform hover:scale-105"
                >
                  {t('contact.sendButton')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <MapComponent/>
      </div>
    </div>
  )
}

