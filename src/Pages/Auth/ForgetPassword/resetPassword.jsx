// // import React from 'react'
// // import { useSearchParams } from 'react-router-dom';

// // export default function ResetPassword() {

// //       const [searchParams] = useSearchParams();
// //   const email = searchParams.get('email');
// //   return (
// //     <div>
      
// //     </div>
// //   )
// // }



// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { apiRequest } from '../../../Redux/Apis/apiRequest';

// export default function ResetPassword() {

//         const [searchParams] = useSearchParams();
//         const email = searchParams.get('email');
//         let dispatch = useDispatch();
// let navigate = useNavigate()

  
//   const [formData, setFormData] = useState({
//     email: email || '',
//     password: '',
//     password_confirmation: ''
//   });
  
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters long';
//     }
    
//     if (!formData.password_confirmation) {
//       newErrors.password_confirmation = 'Password confirmation is required';
//     } else if (formData.password !== formData.password_confirmation) {
//       newErrors.password_confirmation = 'Passwords do not match';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//      e.preventDefault();
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//      let response = await dispatch(apiRequest({
//             entity: "resetPassword",
//             url: "api/reset-password",
//             method: "POST",
//             data: formData
//           }))
          
//           console.log({'✅ Send OTP Response:': response});
//           if(response.payload.success ==true){
    
//             //    navigate("/send-otp")
//                navigate(`/`);
            
//             //   setSendSuccess(true);
//           }
//     } catch (error) {
//         console.log(error);
        
//       setErrors(error.data.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-yellow-100">
//           <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//           </svg>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
//           Reset Your Password
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Enter your email and new password below
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {errors.general && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
//                 {errors.general}
//               </div>
//             )}

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm ${
//                     errors.email ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter your email"
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 New Password
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className={`appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm ${
//                     errors.password ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter your new password"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     {showPassword ? (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
//                     ) : (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     )}
//                   </svg>
//                 </button>
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
//                 Confirm New Password
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   id="password_confirmation"
//                   name="password_confirmation"
//                   type={showConfirmPassword ? "text" : "password"}
//                   value={formData.password_confirmation}
//                   onChange={handleInputChange}
//                   className={`appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm ${
//                     errors.password_confirmation ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                   placeholder="Confirm your new password"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     {showConfirmPassword ? (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
//                     ) : (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     )}
//                   </svg>
//                 </button>
//                 {errors.password_confirmation && (
//                   <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${
//                   isLoading 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-yellow-600 hover:bg-yellow-700'
//                 }`}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Resetting Password...
//                   </div>
//                 ) : (
//                   'Reset Password'
//                 )}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Remember your password?</span>
//               </div>
//             </div>

//             <div className="mt-6 text-center">
//               <a href="/login" className="font-medium text-yellow-600 hover:text-yellow-500">
//                 Sign in to your account
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiRequest } from '../../../Redux/Apis/apiRequest';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function ResetPassword() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: email || '',
    password: '',
    password_confirmation: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = t('resetPassword.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('resetPassword.errors.invalidEmail');
    }
    
    if (!formData.password) {
      newErrors.password = t('resetPassword.errors.passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('resetPassword.errors.passwordLength');
    }
    
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = t('resetPassword.errors.confirmRequired');
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = t('resetPassword.errors.passwordMismatch');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      let response = await dispatch(apiRequest({
        entity: "resetPassword",
        url: "api/reset-password",
        method: "POST",
        data: formData
      }));
      
      if (response.payload?.success) {
        navigate(`/`);
      }
    } catch (error) {
      setErrors({
        general: error.response?.data?.message || t('resetPassword.errors.generalError')
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-purple-50 flex items-center justify-center p-4 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t('resetPassword.title')}
            </h2>
            <p className="text-gray-600 text-sm">
              {t('resetPassword.subtitle')}
            </p>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm text-red-700">{errors.general}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('resetPassword.emailLabel')}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${i18n.language=="ar" ? "right-0" :"left-0"}  px-3 flex items-center pointer-events-none`}>
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 px-3 py-3 border placeholder:${i18n.language=="ar" ?" pr-9 " :""} rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={t('resetPassword.emailPlaceholder')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('resetPassword.passwordLabel')}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${i18n.language =="ar"? "right-0" :"left-0"}  px-3 flex items-center pointer-events-none`}>
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-10 py-3 ${i18n.language== "ar" ? "" :""} border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={t('resetPassword.passwordPlaceholder')}
                />
                <button
                  type="button"
                  className={`absolute inset-y-0 ${i18n.language=="ar" ? "left-0" :"right-0"}  px-3 flex items-center`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                {t('resetPassword.confirmLabel')}
              </label>
              <div className="relative">
                 <div className={`absolute inset-y-0 ${i18n.language =="ar"? "right-0" :"left-0"}  px-3 flex items-center pointer-events-none`}>
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                className={`w-full pl-10 pr-10 py-3 ${i18n.language== "ar" ? "" :""} border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={t('resetPassword.confirmPlaceholder')}
                />
                <button
                  type="button"
               className={`absolute inset-y-0 ${i18n.language=="ar" ? "left-0" :"right-0"}  px-3 flex items-center`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password_confirmation && (
                <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  {t('resetPassword.resettingButton')}
                </>
              ) : (
                t('resetPassword.submitButton')
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              {t('resetPassword.rememberPassword')}{' '}
              <a href="/login" className="text-yellow-600 hover:text-yellow-500 font-medium">
                {t('resetPassword.signInLink')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}