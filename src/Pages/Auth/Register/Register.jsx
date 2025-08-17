// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiRequest } from '../../../Redux/Apis/apiRequest';
// import Autocomplete from '../../../Components/Ui/Autocomplete';
// import { Link, useNavigate } from 'react-router-dom';

// // Validation functions
// const validateEmail = (email) => {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// };

// const validatePhone = (phone) => {
//   return /^[0-9]{11}$/.test(phone);
// };

// const RegisterPage = () => {
//   const [activeTab, setActiveTab] = useState(null);
//   const [serverError, setServerError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const dispatch = useDispatch();
//   let navigate = useNavigate()
//   const { countries , register } = useSelector(state => state.api);
//   const [governorates, setGovernorates] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [countrySearchLoading, setCountrySearchLoading] = useState(false);
//   const [governorateSearchLoading, setGovernorateSearchLoading] = useState(false);
// console.log({register});

//   // Form data
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     country_id: '',
//     governorate_id: '',
//     class: '',
//     child_code: '',
//     password: '',
//     password_confirmation: '',
//     terms: false
//   });

//   // Form errors
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   // Load countries on component mount
//   useEffect(() => {
//     loadCountries();
//   }, []);

//   // Reset form when tab changes
//   useEffect(() => {
//     if (activeTab) {
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         country_id: '',
//         governorate_id: '',
//         class: '',
//         child_code: '',
//         password: '',
//         password_confirmation: '',
//         terms: false
//       });
//       setErrors({});
//       setTouched({});
//       setServerError('');
//       setSuccessMessage('');
//     }
//   }, [activeTab]);

//   // Update governorates when country changes
//   useEffect(() => {
//     if (formData.country_id) {
//       loadGovernorates(formData.country_id);
//     } else {
//       setGovernorates([]);
//       setFormData(prev => ({ ...prev, governorate_id: '' }));
//     }
//   }, [formData.country_id]);

//   const loadCountries = async () => {
//     setLoading(true);
//     try {
//       await dispatch(apiRequest({
//         url: "api/countries",
//         entity: "countries"
//       }));
//     } catch (error) {
//       console.error('Error loading countries:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadGovernorates = async (countryId) => {
//     const selectedCountry = countries?.data?.data?.find(country => 
//       country.id.toString() === countryId
//     );
    
//     if (selectedCountry && selectedCountry.governorates) {
//       setGovernorates(
//         selectedCountry.governorates.map(gov => ({
//           value: gov.id.toString(),
//           label: gov.name
//         }))
//       );
      
//       // Clear governorate selection if it's not valid for new country
//       if (formData.governorate_id) {
//         const isValidGovernorate = selectedCountry.governorates.some(
//           gov => gov.id.toString() === formData.governorate_id
//         );
//         if (!isValidGovernorate) {
//           setFormData(prev => ({ ...prev, governorate_id: '' }));
//         }
//       }
//     } 
//   };

//   // Search function for countries (if you want to implement server-side search)
//   const searchCountries = async (searchTerm) => {
//     if (!searchTerm || searchTerm.length < 2) {
//       return countries?.data?.data?.map(country => ({
//         value: country.id.toString(),
//         label: country.name
//       })) || [];
//     }

//     setCountrySearchLoading(true);
//     try {
//       const response = await dispatch(apiRequest({
//         url: `api/countries/search?q=${encodeURIComponent(searchTerm)}`,
//         method: "GET"
//       }));
      
//       return response?.data?.data?.map(country => ({
//         value: country.id.toString(),
//         label: country.name
//       })) || [];
//     } catch (error) {
//       console.error('Error searching countries:', error);
//       // Fallback to local search
//       return countries?.data?.data?.filter(country =>
//         country.name.toLowerCase().includes(searchTerm.toLowerCase())
//       ).map(country => ({
//         value: country.id.toString(),
//         label: country.name
//       })) || [];
//     } finally {
//       setCountrySearchLoading(false);
//     }
//   };

//   const validateField = (name, value) => {
//     switch (name) {
//       case 'name':
//         return !value ? 'Name is required' : value.length > 100 ? 'Name is too long' : '';
//       case 'email':
//         return !value ? 'Email is required' : !validateEmail(value) ? 'Invalid email' : '';
//       case 'phone':
//         return !value ? 'Phone is required' : !validatePhone(value) ? 'Phone must be 11 digits' : '';
//       case 'country_id':
//         return !value ? 'Country is required' : '';
//       case 'governorate_id':
//         return !value ? 'Governorate is required' : '';
//       case 'class':
//         return !value ? 'Class is required' : '';
//       case 'child_code':
//         return !value ? 'Child code is required' : '';
//       case 'password':
//         return !value ? 'Password is required' : value.length < 8 ? 'Password must be at least 8 characters' : '';
//       case 'password_confirmation':
//         return !value ? 'Please confirm your password' : value !== formData.password ? 'Passwords must match' : '';
//       case 'terms':
//         return !value ? 'You must accept the terms and conditions' : '';
//       default:
//         return '';
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const fieldValue = type === 'checkbox' ? checked : value;
    
//     setFormData(prev => ({
//       ...prev,
//       [name]: fieldValue
//     }));

//     // Validate field on change
//     if (touched[name]) {
//       const error = validateField(name, fieldValue);
//       setErrors(prev => ({
//         ...prev,
//         [name]: error
//       }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     const value = formData[name];
    
//     setTouched(prev => ({
//       ...prev,
//       [name]: true
//     }));

//     const error = validateField(name, value);
//     setErrors(prev => ({
//       ...prev,
//       [name]: error
//     }));
//   };

//   const validateForm = () => {
//     const requiredFields = activeTab === 'student' 
//       ? ['name', 'email', 'phone', 'country_id', 'governorate_id', 'class', 'password', 'password_confirmation', 'terms']
//       : ['name', 'phone', 'child_code', 'password', 'password_confirmation', 'terms'];

//     const newErrors = {};
//     requiredFields.forEach(field => {
//       const error = validateField(field, formData[field]);
//       if (error) newErrors[field] = error;
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const isFormValid = () => {
//     const requiredFields = activeTab === 'student' 
//       ? ['name', 'email', 'phone', 'country_id', 'governorate_id', 'class', 'password', 'password_confirmation', 'terms']
//       : ['name', 'phone', 'child_code', 'password', 'password_confirmation', 'terms'];

//     return requiredFields.every(field => {
//       const hasValue = formData[field];
//       const hasError = errors[field];
//       return hasValue && !hasError;
//     });
//   };

//   const handleSubmit =async  (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     setServerError('');
//     setSuccessMessage('');

//     try {
//       const endpoint = activeTab === 'student' ? 'api/register/student' : 'api/register/guardian';
      
//    ;

//     const response = await dispatch(
//        apiRequest({
//         url: endpoint,
//         method: "POST",
//         data: formData,
//         entity:"register"
//     })
//         ).unwrap();
//         navigate(`/verify-email/${formData.email}`)
//         console.log('✅ API Response:', response);

      
//     } catch (error) {
//       console.error('Registration error:', error);
    
//       setIsSubmitting(false);
//     }
//   };

//   // Show only banners initially
//   if (activeTab === null) {
//     return (
//       <div className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
//         <div className='w-full max-w-xl space-y-4'>
//           <h2 className='text-xl sm:text-2xl mb-6 text-center font-medium'>Choose Registration Type</h2>
//           <div className='grid grid-cols-12 gap-8'>
//             <div 
//               onClick={() => setActiveTab('student')}
//               className='p-6 col-span-6 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-200 hover:border-yellow-300 hover:bg-yellow-50'
//             >
//               <div className='w-16 h-16 rounded-full mx-auto bg-blue-100 flex items-center justify-center mb-4'>
//                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                 </svg>
//               </div>
//               <h3 className='font-medium text-lg text-center'>Student Registration</h3>
//               <p className='text-sm text-gray-600 text-center mt-2'>Register as a student to access learning materials</p>
//             </div>
            
//             <div 
//               onClick={() => setActiveTab('parent')}
//               className='p-6 col-span-6 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-200 hover:border-yellow-300 hover:bg-yellow-50'
//             >
//               <div className='w-16 h-16 rounded-full mx-auto bg-green-100 flex items-center justify-center mb-4'>
//                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <h3 className='font-medium text-lg text-center'>Parent Registration</h3>
//               <p className='text-sm text-gray-600 text-center mt-2'>Register as a parent to monitor your child's progress</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
//       <div className='border border-gray-300 px-4 sm:px-6 lg:px-8 rounded-lg py-6 sm:py-8 bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-sm'>
//         <button 
//           onClick={() => setActiveTab(null)}
//           className='text-yellow-500 cursor-pointer hover:text-yellow-600 mb-4 flex items-center transition-colors duration-200'
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//           </svg>
//           Back to selection
//         </button>
        
//         <h2 className='text-xl sm:text-2xl mb-4 sm:mb-6 text-center sm:text-left font-medium'>
//           {activeTab === 'student' ? 'Student Registration' : 'Parent Registration'}
//         </h2>
        
//         {serverError && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//             {serverError}
//           </div>
//         )}
        
//         {successMessage && (
//           <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
//             {successMessage}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//           {/* Name Field */}
//           <div>
//             <input
//               type="text"
//               name="name"
//               placeholder='Full Name *'
//               className={`border ${touched.name && errors.name ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               value={formData.name}
//             />
//             {touched.name && errors.name && (
//               <div className="text-red-500 text-sm mt-1">{errors.name}</div>
//             )}
//           </div>
          
//           {/* Email Field (Student only) */}
//           {activeTab === 'student' && (
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder='Email Address *'
//                 className={`border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                 onChange={handleInputChange}
//                 onBlur={handleBlur}
//                 value={formData.email}
//               />
//               {touched.email && errors.email && (
//                 <div className="text-red-500 text-sm mt-1">{errors.email}</div>
//               )}
//             </div>
//           )}
          
//           {/* Phone Field */}
//           <div>
//             <input
//               type="tel"
//               name="phone"
//               placeholder='Phone Number *'
//               className={`border ${touched.phone && errors.phone ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               value={formData.phone}
//             />
//             {touched.phone && errors.phone && (
//               <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
//             )}
//           </div>
          
//           {/* Student-specific fields */}
//           {activeTab === 'student' && (
//             <>
//               <div>
//                 <Autocomplete 
//                   name="country_id"
//                   placeholder="Select Country *"
//                   className={`${touched.country_id && errors.country_id ? 'border-red-500' : ''}`}
//                   items={countries?.data?.data?.map(country => ({
//                     value: country.id.toString(),
//                     label: country.name
//                   })) || []}
//                   value={formData.country_id}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   disabled={loading}
//                   loading={countrySearchLoading}
//                   onSearch={searchCountries}
//                   searchPlaceholder="Search countries..."
//                   debounceMs={300}
//                   minSearchLength={2}
//                 />
//                 {touched.country_id && errors.country_id && (
//                   <div className="text-red-500 text-sm mt-1">{errors.country_id}</div>
//                 )}
//               </div>
              
//               <div>
//                 <Autocomplete
//                   name="governorate_id"
//                   placeholder="Select Governorate *"
//                   className={`${touched.governorate_id && errors.governorate_id ? 'border-red-500' : ''}`}
//                   items={governorates}
//                   value={formData.governorate_id}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   disabled={!formData.country_id || governorates.length === 0}
//                   loading={governorateSearchLoading}
//                   searchPlaceholder="Search governorates..."
//                   noResultsText={!formData.country_id ? "Please select a country first" : "No governorates found"}
//                 />
//                 {touched.governorate_id && errors.governorate_id && (
//                   <div className="text-red-500 text-sm mt-1">{errors.governorate_id}</div>
//                 )}
//               </div>
              
//               <div>
//                 <input
//                   type="text"
//                   name="class"
//                   placeholder='Class *'
//                   className={`border ${touched.class && errors.class ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   value={formData.class}
//                 />
//                 {touched.class && errors.class && (
//                   <div className="text-red-500 text-sm mt-1">{errors.class}</div>
//                 )}
//               </div>
//             </>
//           )}
          
//           {/* Parent-specific fields */}
//           {activeTab === 'parent' && (
//             <div>
//               <input
//                 type="text"
//                 name="child_code"
//                 placeholder='Child Code *'
//                 className={`border ${touched.child_code && errors.child_code ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                 onChange={handleInputChange}
//                 onBlur={handleBlur}
//                 value={formData.child_code}
//               />
//               {touched.child_code && errors.child_code && (
//                 <div className="text-red-500 text-sm mt-1">{errors.child_code}</div>
//               )}
//             </div>
//           )}
          
//           {/* Password Fields */}
//           <div>
//             <input
//               type="password"
//               name="password"
//               placeholder='Password *'
//               className={`border ${touched.password && errors.password ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               value={formData.password}
//             />
//             {touched.password && errors.password && (
//               <div className="text-red-500 text-sm mt-1">{errors.password}</div>
//             )}
//           </div>
          
//           <div>
//             <input
//               type="password"
//               name="password_confirmation"
//               placeholder='Confirm Password *'
//               className={`border ${touched.password_confirmation && errors.password_confirmation ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               value={formData.password_confirmation}
//             />
//             {touched.password_confirmation && errors.password_confirmation && (
//               <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>
//             )}
//           </div>
          
//           {/* Terms and Conditions */}
//           <div className='flex items-start justify-center space-x-3 pt-4 border-t border-gray-100'>
//             <input
//               type="checkbox"
//               id="terms"
//               name="terms"
//               className={`w-4 h-4 mt-1 text-yellow-500 ${touched.terms && errors.terms ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-yellow-500 flex-shrink-0`}
//               onChange={handleInputChange}
//               checked={formData.terms}
//             />
//             <label htmlFor="terms" className='text-sm text-gray-600 cursor-pointer leading-relaxed'>
//               I agree to the{' '}
//               <Link to="/terms&conditions" className='text-yellow-500 underline hover:text-yellow-600 transition-colors duration-200'>
//                 Terms of Service
//               </Link>
//               {' '}and{' '}
//               <Link to="/privacy&policy" className='text-yellow-500 underline hover:text-yellow-600 transition-colors duration-200'>
//                 Privacy Policy
//               </Link>
//             </label>
//           </div>
//           {touched.terms && errors.terms && (
//             <div className="text-red-500 text-sm -mt-3 text-center">{errors.terms}</div>
//           )}
          
//           {/* Submit Button */}
//           <div className='flex items-center justify-center gap-4 pt-2'>
//             <button
//               type="submit"
//               className={`w-full p-3 px-8 text-white rounded font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
//                 isFormValid() && !isSubmitting
//                   ? 'bg-yellow-500 hover:bg-yellow-600 cursor-pointer transform hover:scale-[1.02]'
//                   : 'bg-gray-400 cursor-not-allowed'
//               }`}
//               disabled={!isFormValid() || isSubmitting}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Processing...
//                 </span>
//               ) : (
//                 `Register as ${activeTab === 'student' ? 'Student' : 'Parent'}`
//               )}
//             </button>
//           </div>
          
//           {/* Login Link */}
//           <div className='text-center'>
//             <p className='text-sm text-gray-600'>
//               Already have an account?{' '}
//               <a href="#login" className='text-yellow-500 hover:text-yellow-600 font-medium transition-colors duration-200'>
//                 Sign In
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default RegisterPage;


// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import { apiRequest } from '../../../Redux/Apis/apiRequest';
// import Autocomplete from '../../../Components/Ui/Autocomplete';
// import { Link, useNavigate } from 'react-router-dom';

// // Validation functions
// const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// const validatePhone = (phone) => /^[0-9]{11}$/.test(phone);

// const RegisterPage = () => {
//   const { t, i18n } = useTranslation();
//   const [activeTab, setActiveTab] = useState(null);
//   const [serverError, setServerError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { countries, register } = useSelector(state => state.api);
//   const [governorates, setGovernorates] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [countrySearchLoading, setCountrySearchLoading] = useState(false);
//   const [governorateSearchLoading, setGovernorateSearchLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     country_id: '',
//     governorate_id: '',
//     class: '',
//     child_code: '',
//     password: '',
//     password_confirmation: '',
//     terms: false
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   useEffect(() => { loadCountries(); }, []);
//   useEffect(() => resetForm(), [activeTab]);
//   useEffect(() => { updateGovernorates(); }, [formData.country_id]);

//   const loadCountries = async () => {
//     setLoading(true);
//     try {
//       await dispatch(apiRequest({ url: "api/countries", entity: "countries" }));
//     } finally { setLoading(false); }
//   };

//   const resetForm = () => {
//     if (activeTab) {
//       setFormData({ ...initialFormState });
//       setErrors({});
//       setTouched({});
//       setServerError('');
//     }
//   };

//   const updateGovernorates = () => {
//     if (formData.country_id) {
//       const selectedCountry = countries?.data?.data?.find(c => c.id.toString() === formData.country_id);
//       if (selectedCountry?.governorates) {
//         setGovernorates(selectedCountry.governorates.map(g => ({
//           value: g.id.toString(),
//           label: g.name
//         })));
//       }
//     } else {
//       setGovernorates([]);
//       setFormData(prev => ({ ...prev, governorate_id: '' }));
//     }
//   };

//   const searchCountries = async (searchTerm) => {
//     setCountrySearchLoading(true);
//     try {
//       const response = await dispatch(apiRequest({
//         url: `api/countries/search?q=${encodeURIComponent(searchTerm)}`,
//         method: "GET"
//       }));
//       return response?.data?.data?.map(c => ({ value: c.id.toString(), label: c.name })) || [];
//     } finally { setCountrySearchLoading(false); }
//   };

//   const validateField = (name, value) => {
//     const errorMessages = {
//       name: !value ? t('auth.Register.errors.required', { field: t('auth.Register.form.name') }) 
//              : value.length > 100 ? t('auth.Register.errors.nameLength') : '',
//       email: !value ? t('auth.Register.errors.required', { field: t('auth.Register.form.email') }) 
//               : !validateEmail(value) ? t('auth.Register.errors.invalidEmail') : '',
//       phone: !value ? t('auth.Register.errors.required', { field: t('auth.Register.form.phone') }) 
//               : !validatePhone(value) ? t('auth.Register.errors.invalidPhone') : '',
//       password: !value ? t('auth.Register.errors.required', { field: t('auth.Register.form.password') }) 
//                 : value.length < 8 ? t('auth.Register.errors.passwordLength') : '',
//       password_confirmation: !value ? t('auth.Register.errors.required', { field: t('auth.Register.form.confirmPassword') }) 
//                              : value !== formData.password ? t('auth.Register.errors.passwordMatch') : '',
//       terms: !value ? t('auth.Register.errors.acceptTerms') : ''
//     };
//     return errorMessages[name] || '';
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const fieldValue = type === 'checkbox' ? checked : value;
    
//     setFormData(prev => ({ ...prev, [name]: fieldValue }));

//     if (touched[name]) {
//       setErrors(prev => ({ ...prev, [name]: validateField(name, fieldValue) }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched(prev => ({ ...prev, [name]: true }));
//     setErrors(prev => ({ ...prev, [name]: validateField(name, formData[name]) }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setServerError('');

//     try {
//       const endpoint = activeTab === 'student' ? 'api/register/student' : 'api/register/guardian';
//       await dispatch(apiRequest({ url: endpoint, method: "POST", data: formData, entity: "register" })).unwrap();
//       navigate(`/verify-email/${formData.email}`);
//     } catch (error) {
//       setServerError(t('auth.Register.serverError'));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!activeTab) {
//     return (
//       <div className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
//         <div className='w-full max-w-xl space-y-4'>
//           <h2 className='text-xl sm:text-2xl mb-6 text-center font-medium'>{t('auth.Register.chooseType')}</h2>
//           <div className='grid grid-cols-12 gap-8'>
//             {['student', 'parent'].map((type) => (
//               <div key={type} onClick={() => setActiveTab(type)}
//                 className='p-6 col-span-6 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-200 hover:border-yellow-300 hover:bg-yellow-50'>
//                 <div className={`w-16 h-16 rounded-full mx-auto ${type === 'student' ? 'bg-blue-100' : 'bg-green-100'} flex items-center justify-center mb-4`}>
                  
//                    {type === 'student' ?   <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                  </svg> :  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                  </svg>} 
//                 </div>
//                 <h3 className='font-medium text-lg text-center'>{t(`auth.Register.${type}.title`)}</h3>
//                 <p className='text-sm text-gray-600 text-center mt-2'>{t(`auth.Register.${type}.description`)}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
//       <div className='border border-gray-300 px-4 sm:px-6 lg:px-8 rounded-lg py-6 sm:py-8 bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-sm'>
//         <button onClick={() => setActiveTab(null)} className='text-yellow-500 cursor-pointer hover:text-yellow-600 mb-4 flex items-center'>
//           {/* Back icon */}
//           {t('auth.Register.back')}
//         </button>

//         <h2 className='text-xl sm:text-2xl mb-4 sm:mb-6 text-center sm:text-left font-medium'>
//           {t(`auth.Register.${activeTab}.title`)}
//         </h2>

//         {serverError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{serverError}</div>}

//         <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//           {/* Name Field */}
//           <input type="text" name="name" placeholder={t('auth.Register.form.name')} 
//             className={`border ${touched.name && errors.name ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//             onChange={handleInputChange} onBlur={handleBlur} value={formData.name} />
//           {touched.name && errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}

//           {/* Email Field (Student only) */}
//           {activeTab === 'student' && (
//             <>
//               <input type="email" name="email" placeholder={t('auth.Register.form.email')}
//                 className={`border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                 onChange={handleInputChange} onBlur={handleBlur} value={formData.email} />
//               {touched.email && errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
//             </>
//           )}

//           {/* Phone Field */}
//           <input type="tel" name="phone" placeholder={t('auth.Register.form.phone')}
//             className={`border ${touched.phone && errors.phone ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//             onChange={handleInputChange} onBlur={handleBlur} value={formData.phone} />
//           {touched.phone && errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}

//           {/* Student-specific fields */}
//           {activeTab === 'student' && (
//             <>
//               <Autocomplete 
//                 name="country_id" placeholder={t('auth.Register.form.country')}
//                 className={`${touched.country_id && errors.country_id ? 'border-red-500' : ''}`}
//                 items={countries?.data?.data?.map(c => ({ value: c.id.toString(), label: c.name })) || []}
//                 value={formData.country_id} onChange={handleInputChange} onBlur={handleBlur}
//                 disabled={loading} loading={countrySearchLoading}
//                 onSearch={searchCountries} searchPlaceholder={t('auth.Register.form.searchCountries')}
//               />
//               {touched.country_id && errors.country_id && <div className="text-red-500 text-sm mt-1">{errors.country_id}</div>}

//               <Autocomplete
//                 name="governorate_id" placeholder={t('auth.Register.form.governorate')}
//                 className={`${touched.governorate_id && errors.governorate_id ? 'border-red-500' : ''}`}
//                 items={governorates} value={formData.governorate_id}
//                 onChange={handleInputChange} onBlur={handleBlur}
//                 disabled={!formData.country_id || governorates.length === 0}
//                 searchPlaceholder={t('auth.Register.form.searchGovernorates')}
//                 noResultsText={!formData.country_id ? t('auth.Register.form.noGovernorates') : "No governorates found"}
//               />
//               {touched.governorate_id && errors.governorate_id && <div className="text-red-500 text-sm mt-1">{errors.governorate_id}</div>}

//               <input type="text" name="class" placeholder={t('auth.Register.form.class')}
//                 className={`border ${touched.class && errors.class ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                 onChange={handleInputChange} onBlur={handleBlur} value={formData.class} />
//               {touched.class && errors.class && <div className="text-red-500 text-sm mt-1">{errors.class}</div>}
//             </>
//           )}

//           {/* Parent-specific fields */}
//           {activeTab === 'parent' && (
//             <>
//               <input type="text" name="child_code" placeholder={t('auth.Register.form.childCode')}
//                 className={`border ${touched.child_code && errors.child_code ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                 onChange={handleInputChange} onBlur={handleBlur} value={formData.child_code} />
//               {touched.child_code && errors.child_code && <div className="text-red-500 text-sm mt-1">{errors.child_code}</div>}
//             </>
//           )}

//           {/* Password Fields */}
//           <input type="password" name="password" placeholder={t('auth.Register.form.password')}
//             className={`border ${touched.password && errors.password ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//             onChange={handleInputChange} onBlur={handleBlur} value={formData.password} />
//           {touched.password && errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}

//           <input type="password" name="password_confirmation" placeholder={t('auth.Register.form.confirmPassword')}
//             className={`border ${touched.password_confirmation && errors.password_confirmation ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//             onChange={handleInputChange} onBlur={handleBlur} value={formData.password_confirmation} />
//           {touched.password_confirmation && errors.password_confirmation && <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>}

//           {/* Terms and Conditions */}
//           <div className='flex items-start justify-center space-x-3 pt-4 border-t border-gray-100'>
//             <input type="checkbox" id="terms" name="terms"
//               className={`w-4 h-4 mt-1 text-yellow-500 ${touched.terms && errors.terms ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-yellow-500 flex-shrink-0`}
//               onChange={handleInputChange} checked={formData.terms} />
//             <label htmlFor="terms" className='text-sm text-gray-600 cursor-pointer leading-relaxed'
//               dangerouslySetInnerHTML={{
//                 __html: t('auth.Register.form.terms', {
//                   terms: `<a href="/terms" class="text-yellow-500 underline hover:text-yellow-600">${t('auth.Register.form.termsLink')}</a>`,
//                   privacy: `<a href="/privacy" class="text-yellow-500 underline hover:text-yellow-600">${t('auth.Register.form.privacyLink')}</a>`
//                 })
//               }} />
//           </div>
//           {touched.terms && errors.terms && <div className="text-red-500 text-sm -mt-3 text-center">{errors.terms}</div>}

//           {/* Submit Button */}
//           <button type="submit"
//             className={`w-full p-3 px-8 text-white rounded font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
//               !isSubmitting ? 'bg-yellow-500 hover:bg-yellow-600 cursor-pointer transform hover:scale-[1.02]' : 'bg-gray-400 cursor-not-allowed'
//             }`}
//             disabled={isSubmitting}>
//             {isSubmitting ? (
//               <span className="flex items-center justify-center">
//                 {/* Spinner icon */}
//                 {t('auth.Register.form.processing')}
//               </span>
//             ) : (
//               t('auth.Register.form.submit', { type: t(`auth.Register.${activeTab}.title`) })
//             )}
//           </button>

//           {/* Login Link */}
//           <p className='text-sm text-gray-600 text-center'
//             dangerouslySetInnerHTML={{
//               __html: t('auth.Register.form.haveAccount', {
//                 login: `<a href="#login" class="text-yellow-500 hover:text-yellow-600 font-medium">${t('auth.Register.form.login')}</a>`
//               })
//             }} />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../../../Redux/Apis/apiRequest';
import Autocomplete from '../../../Components/Ui/Autocomplete';
import { Link, useNavigate } from 'react-router-dom';

// Validation functions
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^[0-9]{11}$/.test(phone);

// Initial form state
const initialFormState = {
  name: '',
  email: '',
  phone: '',
  country_id: '',
  governorate_id: '',
  class: '',
  child_code: '',
  password: '',
  password_confirmation: '',
  terms: false
};

const RegisterPage = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState(null);
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countries, register } = useSelector(state => state.api);
  const [governorates, setGovernorates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countrySearchLoading, setCountrySearchLoading] = useState(false);
  const [governorateSearchLoading, setGovernorateSearchLoading] = useState(false);

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => { loadCountries(); }, []);
  useEffect(() => resetForm(), [activeTab]);
  useEffect(() => { updateGovernorates(); }, [formData.country_id]);

  const loadCountries = async () => {
    setLoading(true);
    try {
      await dispatch(apiRequest({ url: "api/countries", entity: "countries" }));
    } finally { setLoading(false); }
  };

  const resetForm = () => {
    if (activeTab) {
      setFormData({ ...initialFormState });
      setErrors({});
      setTouched({});
      setServerError('');
    }
  };

  const updateGovernorates = () => {
    if (formData.country_id) {
      const selectedCountry = countries?.data?.data?.find(c => c.id.toString() === formData.country_id);
      if (selectedCountry?.governorates) {
        setGovernorates(selectedCountry.governorates.map(g => ({
          value: g.id.toString(),
          label: g.name
        })));
      }
    } else {
      setGovernorates([]);
      setFormData(prev => ({ ...prev, governorate_id: '' }));
    }
  };

  const searchCountries = async (searchTerm) => {
    setCountrySearchLoading(true);
    try {
      const response = await dispatch(apiRequest({
        url: `api/countries/search?q=${encodeURIComponent(searchTerm)}`,
        method: "GET"
      }));
      return response?.data?.data?.map(c => ({ value: c.id.toString(), label: c.name })) || [];
    } finally { setCountrySearchLoading(false); }
  };

  const validateField = (name, value) => {
    const errorMessages = {
      name: !value ? t('auth.Register.errors.required', { field: t('auth.Register.form.name') }) 
             : value.length > 100 ? t('auth.Register.errors.nameLength') : '',
      email: !value ? t('auth.Register.errors.required', { field: t('auth.Register.form.email') }) 
              : !validateEmail(value) ? t('auth.Register.errors.invalidEmail') : '',
      phone: !value ? t('auth.Register.errors.required', { field: t('auth.Register.form.phone') }) 
              : !validatePhone(value) ? t('auth.Register.errors.invalidPhone') : '',
      password: !value ? t('auth.Register.errors.required', { field: t('auth.Register.form.password') }) 
                : value.length < 8 ? t('auth.Register.errors.passwordLength') : '',
      password_confirmation: !value ? t('auth.Register.errors.required', { field: t('auth.Register.form.confirmPassword') }) 
                             : value !== formData.password ? t('auth.Register.errors.passwordMatch') : '',
      terms: !value ? t('auth.Register.errors.acceptTerms') : ''
    };
    return errorMessages[name] || '';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: fieldValue }));

    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, fieldValue) }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, formData[name]) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError('');

    try {
      const endpoint = activeTab === 'student' ? 'api/register/student' : 'api/register/guardian';
      await dispatch(apiRequest({ url: endpoint, method: "POST", data: formData, entity: "register" })).unwrap();
      navigate(`/verify-email/${formData.email}`);
    } catch (error) {
      setServerError(t('auth.Register.serverError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!activeTab) {
    return (
      <div className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
        <div className='w-full max-w-xl space-y-4'>
          <h2 className='text-xl sm:text-2xl mb-6 text-center font-medium'>{t('auth.Register.chooseType')}</h2>
          <div className='grid grid-cols-12 gap-8'>
            {['student', 'parent'].map((type) => (
              <div key={type} onClick={() => setActiveTab(type)}
                className='p-6 col-span-6 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-200 hover:border-yellow-300 hover:bg-yellow-50'>
                <div className={`w-16 h-16 rounded-full mx-auto ${type === 'student' ? 'bg-blue-100' : 'bg-green-100'} flex items-center justify-center mb-4`}>
                  {type === 'student' ? (
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                </div>
                <h3 className='font-medium text-lg text-center'>{t(`auth.Register.${type}.title`)}</h3>
                <p className='text-sm text-gray-600 text-center mt-2'>{t(`auth.Register.${type}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
      <div className='border border-gray-300 px-4 sm:px-6 lg:px-8 rounded-lg py-6 sm:py-8 bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-sm'>
        <button onClick={() => setActiveTab(null)} className='text-yellow-500 cursor-pointer hover:text-yellow-600 mb-4 flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          {t('auth.Register.back')}
        </button>

        <h2  className={`text-xl sm:text-2xl mb-4 sm:mb-6 text-center  font-medium`}>
          {t(`auth.Register.${activeTab}.title`)}
        </h2>

        {serverError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{serverError}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Name Field */}
          <input type="text" name="name" placeholder={t('auth.Register.form.name')} 
            className={`border ${touched.name && errors.name ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
            onChange={handleInputChange} onBlur={handleBlur} value={formData.name} />
          {touched.name && errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}

          {/* Email Field (Student only) */}
          {activeTab === 'student' && (
            <>
              <input type="email" name="email" placeholder={t('auth.Register.form.email')}
                className={`border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                onChange={handleInputChange} onBlur={handleBlur} value={formData.email} />
              {touched.email && errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </>
          )}

          {/* Phone Field */}
          <input dir={i18n.language=="ar"?"rtl":"ltr"} type="tel" name="phone" placeholder={t('auth.Register.form.phone')}
            className={`border ${touched.phone && errors.phone ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
            onChange={handleInputChange} onBlur={handleBlur} value={formData.phone} />
          {touched.phone && errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}

          {/* Student-specific fields */}
          {activeTab === 'student' && (
            <>
              <Autocomplete 
                name="country_id" placeholder={t('auth.Register.form.country')}
                className={`${touched.country_id && errors.country_id ? 'border-red-500' : ''}`}
                items={countries?.data?.data?.map(c => ({ value: c.id.toString(), label: c.name })) || []}
                value={formData.country_id} onChange={handleInputChange} onBlur={handleBlur}
                disabled={loading} loading={countrySearchLoading}
                onSearch={searchCountries} searchPlaceholder={t('auth.Register.form.searchCountries')}
              />
              {touched.country_id && errors.country_id && <div className="text-red-500 text-sm mt-1">{errors.country_id}</div>}

              <Autocomplete
                name="governorate_id" placeholder={t('auth.Register.form.governorate')}
                className={`${touched.governorate_id && errors.governorate_id ? 'border-red-500' : ''}`}
                items={governorates} value={formData.governorate_id}
                onChange={handleInputChange} onBlur={handleBlur}
                disabled={!formData.country_id || governorates.length === 0}
                searchPlaceholder={t('auth.Register.form.searchGovernorates')}
                noResultsText={!formData.country_id ? t('auth.Register.form.noGovernorates') : "No governorates found"}
              />
              {touched.governorate_id && errors.governorate_id && <div className="text-red-500 text-sm mt-1">{errors.governorate_id}</div>}

              <input type="text" name="class" placeholder={t('auth.Register.form.class')}
                className={`border ${touched.class && errors.class ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                onChange={handleInputChange} onBlur={handleBlur} value={formData.class} />
              {touched.class && errors.class && <div className="text-red-500 text-sm mt-1">{errors.class}</div>}
            </>
          )}

          {/* Parent-specific fields */}
          {activeTab === 'parent' && (
            <>
              <input type="text" name="child_code" placeholder={t('auth.Register.form.childCode')}
                className={`border ${touched.child_code && errors.child_code ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                onChange={handleInputChange} onBlur={handleBlur} value={formData.child_code} />
              {touched.child_code && errors.child_code && <div className="text-red-500 text-sm mt-1">{errors.child_code}</div>}
            </>
          )}

          {/* Password Fields */}
          <input type="password" name="password" placeholder={t('auth.Register.form.password')}
            className={`border ${touched.password && errors.password ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
            onChange={handleInputChange} onBlur={handleBlur} value={formData.password} />
          {touched.password && errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}

          <input type="password" name="password_confirmation" placeholder={t('auth.Register.form.confirmPassword')}
            className={`border ${touched.password_confirmation && errors.password_confirmation ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
            onChange={handleInputChange} onBlur={handleBlur} value={formData.password_confirmation} />
          {touched.password_confirmation && errors.password_confirmation && <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>}

          {/* Terms and Conditions */}
         {/* <div className='flex items-start justify-center space-x-3 pt-4 border-t border-gray-100'>
  <input
    type="checkbox"
    id="terms"
    name="terms"
    className={`w-4 h-4 mt-1 text-yellow-500 ${touched.terms && errors.terms ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-yellow-500 flex-shrink-0`}
    onChange={handleInputChange}
    checked={formData.terms}
  />
  <label htmlFor="terms" className='text-sm text-gray-600 cursor-pointer leading-relaxed'>
    {t('auth.Register.form.terms', {
      terms: (
        <Link to="/terms" className="text-yellow-500 underline hover:text-yellow-600">
          {t('auth.Register.form.termsLink')}
        </Link>
      ),
      privacy: (
        <Link to="/privacy" className="text-yellow-500 underline hover:text-yellow-600">
          {t('auth.Register.form.privacyLink')}
        </Link>
      )
    })}
  </label>
</div> */}
         <div className='flex items-start justify-center space-x-3 pt-4 border-t border-gray-100'>
  <input
    type="checkbox"
    id="terms"
    name="terms"
    className={`w-4 h-4 mt-1 text-yellow-500 ${touched.terms && errors.terms ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-yellow-500 flex-shrink-0`}
    onChange={handleInputChange}
    checked={formData.terms}
  />
  <label htmlFor="terms" className='text-sm text-gray-600 cursor-pointer leading-relaxed'>
    {t('auth.Register.form.terms')} <Link to="/terms" className="text-yellow-500 underline hover:text-yellow-600">
          {t('auth.Register.form.termsLink')}
        </Link> {i18n.language=="ar" ?"و" :"and"}  <Link to="/privacy" className="text-yellow-500 underline hover:text-yellow-600">
          {t('auth.Register.form.privacyLink')}
        </Link>
  </label>
</div>


          {touched.terms && errors.terms && <div className="text-red-500 text-sm -mt-3 text-center">{errors.terms}</div>}

          {/* Submit Button */}
          <button type="submit"
            className={`w-full p-3 px-8 text-white rounded font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
              !isSubmitting ? 'bg-yellow-500 hover:bg-yellow-600 cursor-pointer transform hover:scale-[1.02]' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('auth.Register.form.processing')}
              </span>
            ) : (
              t('auth.Register.form.submit') + t(activeTab=="student" ? 'auth.Register.form.student': 'auth.Register.form.parent')
            )}
          </button>

          {/* Login Link */}
          <p className='text-sm text-gray-600 text-center'>
           {  t('auth.Register.form.haveAccount')  }
              <Link to="/" className="text-yellow-500 hover:text-yellow-600 font-medium">{t('auth.Register.form.login')}</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;