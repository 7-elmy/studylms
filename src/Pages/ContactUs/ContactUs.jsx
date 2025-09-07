


// import React, { useEffect } from 'react'
// import DynamicBreadcrumb from '../../Components/Ui/DynamicBreadcrumb'
// import { useState } from "react";
// import { Phone, Mail, MapPin, ChevronUp, Smartphone } from "lucide-react";
// import MapComponent, { ClickableMapText } from '../../Components/Ui/Map';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiRequest } from '../../Redux/Apis/apiRequest';
// import { useTranslation } from 'react-i18next';
// import toast from 'react-hot-toast';
// import { data } from 'react-router-dom';

// export default function ContactUs() {
//   const { t, i18n } = useTranslation();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
  
//   let dispatch = useDispatch();
//   let { contactus } = useSelector((state) => state.api);

//   useEffect(() => {
//     dispatch(apiRequest({
//       entity: "contactus",
//       url: "api/contact_us",
//       method: "GET",
//       headers: {
//         "Accept-Language": localStorage.getItem('language') || 'en',
//       },
//     }))
//   }, [dispatch, localStorage.getItem('language')]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     let form_Data = new FormData()
//     form_Data.append("name", formData.name);
//     form_Data.append("email", formData.email);
//     form_Data.append("message", formData.message);
//     dispatch(apiRequest({
//       url:"api/messages",
//       entity:"messageContact",
//       method:"POST",
//       data:form_Data,
//       headers: {
//              "Accept-Language": i18n.language,
//              "Authorization":`Bearer ${localStorage.getItem("token")}`
//             }
//     }))
//     setFormData({ name: '', email: '', message: '' });
//   };

//   return (
//     <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
//       <DynamicBreadcrumb 
//         MainTitle={t('contact.title')} 
//         BreadCrumbs={[
//           {label: t('breadcrumbs.home'), href:"/"}, 
//           {label: t('breadcrumbs.contact')}
//         ]} 
//       />

//       <div className="min-h-screen bg-gray-50 py-16 px-4 relative">
//         <div className="max-w-6xl mx-auto mb-5">
//           {/* Contact Details Section */}
//           <div className="text-center mb-16">
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//               {t('contact.contactDetails')}
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               {t('contact.welcomeMessage')}
//             </p>
//           </div>

//           {/* Contact Info Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
//             {/* Phone Card */}
//             <div className="text-center p-8 flex items-center gap-1">
//               <div className="flex items-center justify-center w-16 h-16 mt-4 rounded-lg mb-6">
//                 <Smartphone className="w-8 h-8 text-yellow-500" />
//               </div>
//               <div>
//                 <h3 className={`text-sm font-semibold text-gray-800 ${i18n.language=="ar" ? "text-right":"text-left"} `}>
//                   {t('contact.callUs')}
//                 </h3>
//                 <p className="text-gray-600 text-[12px] leading-relaxed text-left">
//                   {contactus?.data?.data?.phone}
//                 </p>
//               </div>
//             </div>

//             {/* Email Card */}
//             <div className="text-center p-8 flex items-center gap-1">
//               <div className="flex items-center justify-center w-16 h-16 mt-4 rounded-lg mb-6">
//                 <Mail className="w-8 h-8 text-yellow-500" />
//               </div>
//               <div>
//                 <h3 className={`text-sm font-semibold text-gray-800 ${i18n.language=="ar" ? "text-right":"text-left"} `}>
//                   {t('contact.emailUs')}
//                 </h3>
//                 <p className={"text-gray-600 text-[12px] leading-relaxed text-left"}>
//                   {contactus?.data?.data?.email}
//                 </p>
//               </div>
//             </div>

//             {/* Location Card */}
//             <div className="text-center p-8 flex items-center gap-1">
//               <div className="flex items-center justify-center w-16 h-16 mt-4 rounded-lg mb-6">
//                 <MapPin className="w-8 h-8 text-yellow-500" />
//               </div>
//               <div>
//                 <h3 className={`text-sm font-semibold text-gray-800 ${i18n.language=="ar" ? "text-right":"text-left"} `}>
//                   {t('contact.visitUs')}
//                 </h3>
//                 <p className="text-gray-600 text-[12px] leading-relaxed text-left">
//                   <ClickableMapText/>
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form Section */}
//           <div className="max-w-4xl mx-auto">
//             <div className="text-center mb-12">
//               <h2 className="text-4xl font-bold text-gray-800 mb-4">
//                 {t('contact.sendMessage')}
//               </h2>
//               <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
//             </div>

//             {/* Contact Form */}
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder={t('contact.namePlaceholder')}
//                     required
//                     className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500"
//                   />
//                 </div>
//                 <div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder={t('contact.emailPlaceholder')}
//                     required
//                     className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   placeholder={t('contact.messagePlaceholder')}
//                   required
//                   rows={6}
//                   className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500 resize-vertical"
//                 />
//               </div>

//               <div className="text-center">
//                 <button
//                   onClick={handleSubmit}
//                   className="inline-flex items-center px-8 py-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-200 transition-all duration-200 transform hover:scale-105"
//                 >
//                   {t('contact.sendButton')}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <MapComponent/>
//       </div>
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
import { data } from 'react-router-dom';

export default function ContactUs() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isFormValid, setIsFormValid] = useState(false);
  
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

  // Validate form whenever formData changes
  useEffect(() => {
    validateForm();
  }, [formData]);

  // const validateForm = () => {
  //   let valid = true;
  //   const newErrors = {
  //     name: '',
  //     email: '',
  //     message: ''
  //   };

  //   // Name validation
  //   if (!formData.name.trim()) {
  //     newErrors.name = t('contact.validation.nameRequired');
  //     valid = false;
  //   } else if (formData.name.trim().length < 2) {
  //     newErrors.name = t('contact.validation.nameMinLength');
  //     valid = false;
  //   }

  //   // Email validation
  //   if (!formData.email.trim()) {
  //     newErrors.email = t('contact.validation.emailRequired');
  //     valid = false;
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = t('contact.validation.emailInvalid');
  //     valid = false;
  //   }

  //   // Message validation
  //   if (!formData.message.trim()) {
  //     newErrors.message = i18n.language=="ar"? "يجب اخال الرسالة": "message required";
  //     valid = false;
  //   } else if (formData.message.trim().length < 10) {
  //     newErrors.message = t('contact.validation.messageMinLength');
  //     valid = false;
  //   }

  //   setErrors(newErrors);
  //   setIsFormValid(valid);
  // };


  const validateForm = () => {
  let valid = true;

  // Initialize empty error messages for all fields
  const newErrors = {
    name: '',
    email: '',
    message: ''
  };

  // ---------------------
  // Name field validation
  // ---------------------
  if (!formData.name.trim()) {
    // If the name is empty
    newErrors.name = i18n.language=="en"?  "Name is required" :"الاسم مطلوب" 
    valid = false;
  } else if (formData.name.trim().length < 2) {
    // If the name is too short
    newErrors.name = i18n.language=="en"? "Name must be at least 2 characters" :"الاسم يجب ان يكون علي الاقل حرفين" 
    valid = false;
  }

  // ----------------------
  // Email field validation
  // ----------------------
  if (!formData.email.trim()) {
    // If the email is empty
    newErrors.email = i18n.language=="ar"? "الايميل مطلوب" : "Email is required"  
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    // If the email format is invalid
    newErrors.email =  i18n.language =="ar" ? "الايميل غير صحيح" :"Invalid email address" 
    valid = false;
  }

  // ------------------------
  // Message field validation
  // ------------------------
  if (!formData.message.trim()) {
    // If the message is empty
    newErrors.message = i18n.language === "ar"
      ? "يجب إدخال الرسالة" // Arabic: "The message must be entered"
      : "Message is required"; // English fallback
    valid = false;
  } else if (formData.message.trim().length < 10) {
    // If the message is too short
    newErrors.message = i18n.language=="ar"?"يجب ان تكون الرسالة علي الاقل 8 احرف":"Message must be at least 10 characters" 
    valid = false;
  }

  // ----------------------
  // Update state
  // ----------------------
  setErrors(newErrors);      // Show error messages to the user
  setIsFormValid(valid);     // Set the form’s overall validity
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast.error(t('contact.validation.formInvalid'));
      return;
    }
    
    let form_Data = new FormData()
    form_Data.append("name", formData.name);
    form_Data.append("email", formData.email);
    form_Data.append("message", formData.message);
    dispatch(apiRequest({
      url:"api/messages",
      entity:"messageContact",
      method:"POST",
      data:form_Data,
      headers: {
             "Accept-Language": i18n.language,
             "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
    }))
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
                    className={`w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('contact.emailPlaceholder')}
                    required
                    className={`w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
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
                  className={`w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500 resize-vertical ${
                    errors.message ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className={`inline-flex items-center px-8 py-4 text-white font-semibold rounded-lg focus:ring-4 focus:ring-yellow-200 transition-all duration-200 transform ${
                    isFormValid 
                      ? 'bg-yellow-500 hover:bg-yellow-600 hover:scale-105' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
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