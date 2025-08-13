












//---------------------------------------------------------------------------------------------
// import React, { useState, useRef, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// import student from "../../../assets/student.jpg";
// import parent from "../../../assets/parent.jpg";

// export default function RegisterPage() {
//     const [activeTab, setActiveTab] = useState(null);
//     const [selectedGovernorate, setSelectedGovernorate] = useState('');
//     const [governorateInput, setGovernorateInput] = useState('');
//     const [showGovernorateDropdown, setShowGovernorateDropdown] = useState(false);
//     const [selectedGrade, setSelectedGrade] = useState('');
//     const [gradeInput, setGradeInput] = useState('');
//     const [showGradeDropdown, setShowGradeDropdown] = useState(false);
//     const [highlightedIndex, setHighlightedIndex] = useState(-1);
//     const [highlightedGradeIndex, setHighlightedGradeIndex] = useState(-1);
//     const [serverError, setServerError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
    
//     const dropdownRef = useRef(null);
//     const inputRef = useRef(null);
//     const gradeDropdownRef = useRef(null);
//     const gradeInputRef = useRef(null);
//     const fileInputRef = useRef(null);
    
//     const grades = [
//         'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'
//     ];
    
//     const governorates = [
//         'Cairo', 'Giza', 'Alexandria', 'Dakahlia', 'Red Sea', 'Beheira',
//         'Fayoum', 'Gharbia', 'Ismailia', 'Menofia', 'Minya', 'Qaliubiya',
//         'New Valley', 'Suez', 'Aswan', 'Assiut', 'Beni Suef', 'Port Said',
//         'Damietta', 'Sharkia', 'South Sinai', 'Kafr El Sheikh', 'Matrouh',
//         'Luxor', 'Qena', 'North Sinai', 'Sohag'
//     ];
// console.log({activeTab});
//     // Validation schema
//     const validationSchema = Yup.object().shape({
//         fullName: Yup.string()
//             .required('Full name is required')
//             .max(100, 'Name too long'),
//         email: Yup.string()
//             .email('Invalid email')
//             .required('Email is required')
//             .max(100, 'Email too long'),
//         phone: Yup.string()
//             .required('Phone number is required')
//             .matches(/^[0-9]+$/, 'Must be only digits')
//             .min(11, 'Must be at least 11 digits')
//             .max(11, 'Must be  11 digits'),
//         governorate: Yup.string().required('Governorate is required'),
//         ...(activeTab === 'student' && {
//             grade: Yup.string().required('Grade is required')
//         }),
//         ...(activeTab === 'parent' && {
//             studentCode: Yup.string()
//                 .required('Student code is required')
//                 .matches(/^[A-Za-z0-9]+$/, 'Only alphanumeric characters allowed')
//         }),
//         password: Yup.string()
//             .min(8, 'Password must be at least 8 characters')
//             .max(50, 'Password too long')
//             .matches(/[a-z]/, 'Must contain at least one lowercase letter')
//             .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
//             .matches(/[0-9]/, 'Must contain at least one number')
//             .required('Password is required'),
//         confirmPassword: Yup.string()
//             .oneOf([Yup.ref('password'), null], 'Passwords must match')
//             .required('Please confirm your password'),
//         terms: Yup.boolean()
//             .oneOf([true], 'You must accept the terms and conditions')
//             .required('You must accept the terms and conditions')
//     });

//     // Formik setup with FormData submission
//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             email: '',
//             phone: '',
//             country_id: '',
//             governorate_id: '',
//             class: '',
//             password: '',
//             password_confirmation: '',
//             terms: false
           
//         },
//         validationSchema,
//         onSubmit: async (values, { setSubmitting, resetForm }) => {
//             setServerError('');
//             setSuccessMessage('');


            
//             try {
//                 const formData = new FormData();
                
//                 // Append all form values to FormData
//                 Object.entries(values).forEach(([key, value]) => {
//                     if (value !== null && value !== undefined && value !== '') {
//                         formData.append(key, value);
//                     }
//                 });
                
//                 // Add registration type
//                 formData.append('registrationType', activeTab);


                
                
                
//                 // Simulate API call (replace with actual fetch)
//                 console.log('Form data to be submitted:', Object.fromEntries(formData));
                
//                 // Mock successful submission
//                 setTimeout(() => {
//                     setSuccessMessage(`${activeTab === 'student' ? 'Student' : 'Parent'} registration successful!`);
//                     resetForm();
//                     setSelectedGovernorate('');
//                     setGovernorateInput('');
//                     setSelectedGrade('');
//                     setGradeInput('');
//                     setSubmitting(false);
//                 }, 1500);
                
//                 /* Actual API call would look like this:
//                 const response = await fetch('https://your-api-endpoint.com/register', {
//                     method: 'POST',
//                     body: formData,
//                 });
                
//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.message || 'Registration failed');
//                 }
                
//                 const data = await response.json();
//                 setSuccessMessage(data.message || 'Registration successful!');
//                 resetForm();
//                 */
                
//             } catch (error) {
//                 console.error('Registration error:', error);
//                 setServerError(error.message || 'Registration failed. Please try again.');
//                 setSubmitting(false);
//             }
//         }
//     });

//     // Handler functions
//     const handleGovernorateSelect = (gov) => {
//         setSelectedGovernorate(gov);
//         setGovernorateInput(gov);
//         setShowGovernorateDropdown(false);
//         setHighlightedIndex(-1);
//         formik.setFieldValue('governorate', gov);
//         formik.setFieldTouched('governorate', true);
//     };

//     const handleGovernorateInputChange = (e) => {
//         const value = e.target.value;
//         setGovernorateInput(value);
//         setSelectedGovernorate(value);
//         setShowGovernorateDropdown(true);
//         setHighlightedIndex(-1);
//         formik.setFieldValue('governorate', value);
//     };

//     const handleGradeSelect = (grade) => {
//         setSelectedGrade(grade);
//         setGradeInput(grade);
//         setShowGradeDropdown(false);
//         setHighlightedGradeIndex(-1);
//         formik.setFieldValue('grade', grade);
//         formik.setFieldTouched('grade', true);
//     };

//     const handleGradeInputChange = (e) => {
//         const value = e.target.value;
//         setGradeInput(value);
//         setSelectedGrade(value);
//         setShowGradeDropdown(true);
//         setHighlightedGradeIndex(-1);
//         formik.setFieldValue('grade', value);
//     };

//     const handleFileChange = (event) => {
//         const file = event.currentTarget.files[0];
//         formik.setFieldValue('studentPhoto', file);
//         formik.setFieldTouched('studentPhoto', true);
//     };

//     const handleGovernorateKeyDown = (e) => {
//         if (!showGovernorateDropdown || filteredGovernorates.length === 0) return;

//         switch (e.key) {
//             case 'ArrowDown':
//                 e.preventDefault();
//                 setHighlightedIndex(prev => (prev < filteredGovernorates.length - 1 ? prev + 1 : 0));
//                 break;
//             case 'ArrowUp':
//                 e.preventDefault();
//                 setHighlightedIndex(prev => (prev > 0 ? prev - 1 : filteredGovernorates.length - 1));
//                 break;
//             case 'Enter':
//                 e.preventDefault();
//                 if (highlightedIndex >= 0 && highlightedIndex < filteredGovernorates.length) {
//                     handleGovernorateSelect(filteredGovernorates[highlightedIndex]);
//                 }
//                 break;
//             case 'Escape':
//                 e.preventDefault();
//                 setShowGovernorateDropdown(false);
//                 setHighlightedIndex(-1);
//                 inputRef.current?.blur();
//                 break;
//             case 'Tab':
//                 setShowGovernorateDropdown(false);
//                 setHighlightedIndex(-1);
//                 break;
//         }
//     };

//     const handleGradeKeyDown = (e) => {
//         if (!showGradeDropdown || filteredGrades.length === 0) return;

//         switch (e.key) {
//             case 'ArrowDown':
//                 e.preventDefault();
//                 setHighlightedGradeIndex(prev => (prev < filteredGrades.length - 1 ? prev + 1 : 0));
//                 break;
//             case 'ArrowUp':
//                 e.preventDefault();
//                 setHighlightedGradeIndex(prev => (prev > 0 ? prev - 1 : filteredGrades.length - 1));
//                 break;
//             case 'Enter':
//                 e.preventDefault();
//                 if (highlightedGradeIndex >= 0 && highlightedGradeIndex < filteredGrades.length) {
//                     handleGradeSelect(filteredGrades[highlightedGradeIndex]);
//                 }
//                 break;
//             case 'Escape':
//                 e.preventDefault();
//                 setShowGradeDropdown(false);
//                 setHighlightedGradeIndex(-1);
//                 gradeInputRef.current?.blur();
//                 break;
//             case 'Tab':
//                 setShowGradeDropdown(false);
//                 setHighlightedGradeIndex(-1);
//                 break;
//         }
//     };

//     // Filter governorates and grades based on input
//     const filteredGovernorates = governorates.filter(gov =>
//         gov.toLowerCase().includes(governorateInput.toLowerCase())
//     );

//     const filteredGrades = grades.filter(grade =>
//         grade.toLowerCase().includes(gradeInput.toLowerCase())
//     );

//     // Scroll highlighted items into view
//     useEffect(() => {
//         if (highlightedIndex >= 0 && dropdownRef.current) {
//             const highlightedElement = dropdownRef.current.children[highlightedIndex];
//             if (highlightedElement) {
//                 highlightedElement.scrollIntoView({
//                     block: 'nearest',
//                     behavior: 'smooth'
//                 });
//             }
//         }
//     }, [highlightedIndex]);

//     useEffect(() => {
//         if (highlightedGradeIndex >= 0 && gradeDropdownRef.current) {
//             const highlightedElement = gradeDropdownRef.current.children[highlightedGradeIndex];
//             if (highlightedElement) {
//                 highlightedElement.scrollIntoView({
//                     block: 'nearest',
//                     behavior: 'smooth'
//                 });
//             }
//         }
//     }, [highlightedGradeIndex]);

//     // Reset form when switching tabs
//     useEffect(() => {
//         if (activeTab) {
//             formik.resetForm();
//             setSelectedGovernorate('');
//             setGovernorateInput('');
//             setSelectedGrade('');
//             setGradeInput('');
//             setServerError('');
//             setSuccessMessage('');
//         }
//     }, [activeTab]);

//     // Show only banners initially
//     if (activeTab === null) {
//         return (
//             <div className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
//                 <div className='w-full max-w-xl space-y-4'>
//                     <h2 className='text-xl sm:text-2xl mb-6 text-center font-medium'>Choose Registration Type</h2>
//                     <div className='grid grid-cols-12 gap-8'>
//                         <div 
//                             onClick={() => setActiveTab('student')}
//                             className='p-6 col-span-6 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-200 hover:border-yellow-300 hover:bg-yellow-50'
//                         >
//                             <img src={student} loading='lazy' className='w-16 h-16 rounded-full mx-auto' alt="student" />
//                             <h3 className='font-medium text-lg text-center'>Student Registration</h3>
//                             <p className='text-sm text-gray-600 text-center mt-2'>Register as a student to access learning materials</p>
//                         </div>
                        
//                         <div 
//                             onClick={() => setActiveTab('parent')}
//                             className='p-6 col-span-6 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-200 hover:border-yellow-300 hover:bg-yellow-50'
//                         >
//                             <img src={parent} loading='lazy' className='w-16 h-16 rounded-full mx-auto' alt="parent" />
//                             <h3 className='font-medium text-lg text-center'>Parent Registration</h3>
//                             <p className='text-sm text-gray-600 text-center mt-2'>Register as a parent to monitor your child's progress</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
//             <div className='border border-gray-300 px-4 sm:px-6 lg:px-8 rounded-lg py-6 sm:py-8 bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-sm'>
//                 <button 
//                     onClick={() => setActiveTab(null)}
//                     className='text-yellow-500 cursor-pointer hover:text-yellow-600 mb-4 flex items-center'
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//                     </svg>
//                     Back to selection
//                 </button>
                
//                 <h2 className='text-xl sm:text-2xl mb-4 sm:mb-6 text-center sm:text-left font-medium'>
//                     {activeTab === 'student' ? 'Student Registration' : 'Parent Registration'}
//                 </h2>
                
//                 {serverError && (
//                     <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//                         {serverError}
//                     </div>
//                 )}
                
//                 {successMessage && (
//                     <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
//                         {successMessage}
//                     </div>
//                 )}
                
//                 <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4" encType="multipart/form-data">
//                     <div>
//                         <input
//                             type="text"
//                             name="fullName"
//                             placeholder='Full Name *'
//                             className={`border ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.fullName}
//                         />
//                         {formik.touched.fullName && formik.errors.fullName && (
//                             <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
//                         )}
//                     </div>
                    
//                     <div>
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder='Email Address *'
//                             className={`border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.email}
//                         />
//                         {formik.touched.email && formik.errors.email && (
//                             <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
//                         )}
//                     </div>
                    
//                     <div>
//                         <input
//                             type="tel"
//                             name="phone"
//                             placeholder='Phone Number *'
//                             className={`border ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.phone}
//                         />
//                         {formik.touched.phone && formik.errors.phone && (
//                             <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
//                         )}
//                     </div>
                    
//                     {/* Governorate Dropdown */}
//                     <div className="relative">
//                         <input
//                             ref={inputRef}
//                             type="text"
//                             name="governorate"
//                             placeholder="Select Governorate *"
//                             value={governorateInput}
//                             onChange={handleGovernorateInputChange}
//                             onFocus={() => {
//                                 setShowGovernorateDropdown(true);
//                                 setHighlightedIndex(-1);
//                             }}
//                             onKeyDown={handleGovernorateKeyDown}
//                             className={`border ${formik.touched.governorate && formik.errors.governorate ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                             autoComplete="off"
//                             onBlur={() => {
//                                 setTimeout(() => setShowGovernorateDropdown(false), 200);
//                                 formik.setFieldTouched('governorate', true);
//                             }}
//                         />
                        
//                         {showGovernorateDropdown && filteredGovernorates.length > 0 && (
//                             <div 
//                                 ref={dropdownRef}
//                                 className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto"
//                             >
//                                 {filteredGovernorates.map((gov, index) => (
//                                     <div
//                                         key={gov}
//                                         onClick={() => handleGovernorateSelect(gov)}
//                                         onMouseEnter={() => setHighlightedIndex(index)}
//                                         className={`px-3 py-2 cursor-pointer text-gray-700 transition-colors duration-150 ${
//                                             index === highlightedIndex
//                                                 ? 'bg-yellow-100 text-yellow-700'
//                                                 : 'hover:bg-yellow-50 hover:text-yellow-600'
//                                         }`}
//                                     >
//                                         {gov}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                         {formik.touched.governorate && formik.errors.governorate && (
//                             <div className="text-red-500 text-sm mt-1">{formik.errors.governorate}</div>
//                         )}
//                     </div>
                    
//                     {/* Student-specific fields */}
//                     {activeTab === 'student' && (
//                         <>
//                             <div className="relative">
//                                 <input
//                                     ref={gradeInputRef}
//                                     type="text"
//                                     name="grade"
//                                     placeholder="Select Grade *"
//                                     value={gradeInput}
//                                     onChange={handleGradeInputChange}
//                                     onFocus={() => {
//                                         setShowGradeDropdown(true);
//                                         setHighlightedGradeIndex(-1);
//                                     }}
//                                     onKeyDown={handleGradeKeyDown}
//                                     className={`border ${formik.touched.grade && formik.errors.grade ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                                     autoComplete="off"
//                                     onBlur={() => {
//                                         setTimeout(() => setShowGradeDropdown(false), 200);
//                                         formik.setFieldTouched('grade', true);
//                                     }}
//                                 />
                                
//                                 {showGradeDropdown && filteredGrades.length > 0 && (
//                                     <div 
//                                         ref={gradeDropdownRef}
//                                         className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto"
//                                     >
//                                         {filteredGrades.map((grade, index) => (
//                                             <div
//                                                 key={grade}
//                                                 onClick={() => handleGradeSelect(grade)}
//                                                 onMouseEnter={() => setHighlightedGradeIndex(index)}
//                                                 className={`px-3 py-2 cursor-pointer text-gray-700 transition-colors duration-150 ${
//                                                     index === highlightedGradeIndex
//                                                         ? 'bg-yellow-100 text-yellow-700'
//                                                         : 'hover:bg-yellow-50 hover:text-yellow-600'
//                                                 }`}
//                                             >
//                                                 {grade}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                                 {formik.touched.grade && formik.errors.grade && (
//                                     <div className="text-red-500 text-sm mt-1">{formik.errors.grade}</div>
//                                 )}
//                             </div>
                         
//                         </>
//                     )}
                    
//                     {/* Parent-specific fields */}
//                     {activeTab === 'parent' && (
//                         <div>
//                             <input
//                                 type="text"
//                                 name="studentCode"
//                                 placeholder='Student Code *'
//                                 className={`border ${formik.touched.studentCode && formik.errors.studentCode ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.studentCode}
//                             />
//                             {formik.touched.studentCode && formik.errors.studentCode && (
//                                 <div className="text-red-500 text-sm mt-1">{formik.errors.studentCode}</div>
//                             )}
//                         </div>
//                     )}
                    
//                     <div>
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder='Password *'
//                             className={`border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.password}
//                         />
//                         {formik.touched.password && formik.errors.password && (
//                             <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
//                         )}
//                     </div>
                    
//                     <div>
//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             placeholder='Confirm Password *'
//                             className={`border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.confirmPassword}
//                         />
//                         {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//                             <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
//                         )}
//                     </div>
//                        {/* Terms and Conditions */}
//                     <div className='flex items-start justify-center space-x-3 pt-4 border-t border-gray-100'>
//                         <input
//                             type="checkbox"
//                             id="terms"
//                             name="terms"
//                             className={`w-4 h-4 mt-1 text-yellow-500 ${formik.touched.terms && formik.errors.terms ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-yellow-500 flex-shrink-0`}
//                             onChange={formik.handleChange}
//                             checked={formik.values.terms}
//                         />
//                         <label htmlFor="terms" className='text-sm text-gray-600 cursor-pointer leading-relaxed'>
//                             I agree to the{' '}
//                             <a href="#terms" className='text-yellow-500 hover:text-yellow-600 transition-colors duration-200'>
//                                 Terms of Service
//                             </a>
//                             {' '}and{' '}
//                             <a href="#privacy" className='text-yellow-500 hover:text-yellow-600 transition-colors duration-200'>
//                                 Privacy Policy
//                             </a>
//                         </label>
//                     </div>
//                     {formik.touched.terms && formik.errors.terms && (
//                         <div className="text-red-500 text-sm -mt-3 text-center">{formik.errors.terms}</div>
//                     )}
//                     <div className='flex items-center justify-center gap-4 pt-2'>
//                         <button
//                             type="submit"
//                             className='bg-yellow-500 w-full hover:bg-yellow-600 p-3 px-8 text-white rounded font-medium transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
//                             disabled={formik.isSubmitting}
//                         >
//                             {formik.isSubmitting ? (
//                                 <span className="flex items-center justify-center">
//                                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     Processing...
//                                 </span>
//                             ) : (
//                                 `Register as ${activeTab === 'student' ? 'Student' : 'Parent'}`
//                             )}
//                         </button>
//                     </div>
                    
//                     <div className='text-center'>
//                         <p className='text-sm text-gray-600'>
//                             Already have an account?{' '}
//                             <a href="#login" className='text-yellow-500 hover:text-yellow-600 font-medium transition-colors duration-200'>
//                                 Sign In
//                             </a>
//                         </p>
//                     </div>
                    
                 
//                 </form>
//             </div>
//         </div>
//     );
// }

//-------------------------------------------------------------------------------------


import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import student from "../../../assets/student.jpg";
import parent from "../../../assets/parent.jpg";

export default function RegisterPage() {
    const [activeTab, setActiveTab] = useState(null);
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const dispatch = useDispatch();

    // Initial values based on active tab
    const initialValues = activeTab === 'parent' 
        ? {
            name: '',
            phone: '',
            child_code: '',
            password: '',
            password_confirmation: '',
            terms: false 
        }
        : {
            name: '',
            email: '',
            phone: '',
            country_id: '',
            governorate_id: '',
            class: '',
            password: '',
            password_confirmation: '',
            terms: false
        };

    // Validation schema
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').max(100),
        phone: Yup.string()
            .required('Phone is required')
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(11, 'Must be at least 11 digits')
            .max(11, 'Must be 11 digits'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),
        terms: Yup.boolean()
            .oneOf([true], 'You must accept the terms and conditions')
            .required('Required'),
        ...(activeTab === 'student' && {
            email: Yup.string().email('Invalid email').required('Email is required'),
            country_id: Yup.string().required('Country is required'),
            governorate_id: Yup.string().required('Governorate is required'),
            class: Yup.string().required('Class is required')
        }),
        ...(activeTab === 'parent' && {
            child_code: Yup.string().required('Child code is required')
        })
    });

    // Formik setup
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setServerError('');
            setSuccessMessage('');
            
            try {
                const endpoint = activeTab === 'student' 
                    ? '/api/register/student' 
                    : '/api/register/guardian';
                
                dispatch(apiRequest({
                    entity: "auth",
                    url: endpoint,
                    method: "POST",
                    data: values,
                    onSuccess: (response) => {
                        setSuccessMessage(`Registration successful! ${response.message || ''}`);
                        resetForm();
                        setSubmitting(false);
                    },
                    onError: (error) => {
                        setServerError(error.message || 'Registration failed. Please try again.');
                        setSubmitting(false);
                    }
                }));
                
            } catch (error) {
                console.error('Registration error:', error);
                setServerError('An unexpected error occurred. Please try again.');
                setSubmitting(false);
            }
        }
    });

    // Show only banners initially
    if (activeTab === null) {
        return (
            <div className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
                <div className='w-full max-w-xl space-y-4'>
                    <h2 className='text-xl sm:text-2xl mb-6 text-center font-medium'>Choose Registration Type</h2>
                    <div className='grid grid-cols-12 gap-8'>
                        <div 
                            onClick={() => setActiveTab('student')}
                            className='p-6 col-span-6 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-200 hover:border-yellow-300 hover:bg-yellow-50'
                        >
                            <img src={student} loading='lazy' className='w-16 h-16 rounded-full mx-auto' alt="student" />
                            <h3 className='font-medium text-lg text-center'>Student Registration</h3>
                            <p className='text-sm text-gray-600 text-center mt-2'>Register as a student to access learning materials</p>
                        </div>
                        
                        <div 
                            onClick={() => setActiveTab('parent')}
                            className='p-6 col-span-6 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-200 hover:border-yellow-300 hover:bg-yellow-50'
                        >
                            <img src={parent} loading='lazy' className='w-16 h-16 rounded-full mx-auto' alt="parent" />
                            <h3 className='font-medium text-lg text-center'>Parent Registration</h3>
                            <p className='text-sm text-gray-600 text-center mt-2'>Register as a parent to monitor your child's progress</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
            <div className='border border-gray-300 px-4 sm:px-6 lg:px-8 rounded-lg py-6 sm:py-8 bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-sm'>
                <button 
                    onClick={() => setActiveTab(null)}
                    className='text-yellow-500 cursor-pointer hover:text-yellow-600 mb-4 flex items-center'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to selection
                </button>
                
                <h2 className='text-xl sm:text-2xl mb-4 sm:mb-6 text-center sm:text-left font-medium'>
                    {activeTab === 'student' ? 'Student Registration' : 'Parent Registration'}
                </h2>
                
                {serverError && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {serverError}
                    </div>
                )}
                
                {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                        {successMessage}
                    </div>
                )}
                
                <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
                    {/* Name Field */}
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder='Full Name *'
                            className={`border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                        )}
                    </div>
                    
                    {/* Email Field (Student only) */}
                    {activeTab === 'student' && (
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder='Email Address *'
                                className={`border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                            )}
                        </div>
                    )}
                    
                    {/* Phone Field */}
                    <div>
                        <input
                            type="tel"
                            name="phone"
                            placeholder='Phone Number *'
                            className={`border ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                        )}
                    </div>
                    
                    {/* Student-specific fields */}
                    {activeTab === 'student' && (
                        <>
                            <div>
                                <input
                                    type="text"
                                    name="country_id"
                                    placeholder='Country ID *'
                                    className={`border ${formik.touched.country_id && formik.errors.country_id ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.country_id}
                                />
                                {formik.touched.country_id && formik.errors.country_id && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.country_id}</div>
                                )}
                            </div>
                            
                            <div>
                                <input
                                    type="text"
                                    name="governorate_id"
                                    placeholder='Governorate ID *'
                                    className={`border ${formik.touched.governorate_id && formik.errors.governorate_id ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.governorate_id}
                                />
                                {formik.touched.governorate_id && formik.errors.governorate_id && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.governorate_id}</div>
                                )}
                            </div>
                            
                            <div>
                                <input
                                    type="text"
                                    name="class"
                                    placeholder='Class *'
                                    className={`border ${formik.touched.class && formik.errors.class ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.class}
                                />
                                {formik.touched.class && formik.errors.class && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.class}</div>
                                )}
                            </div>
                        </>
                    )}
                    
                    {/* Parent-specific fields */}
                    {activeTab === 'parent' && (
                        <div>
                            <input
                                type="text"
                                name="child_code"
                                placeholder='Child Code *'
                                className={`border ${formik.touched.child_code && formik.errors.child_code ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.child_code}
                            />
                            {formik.touched.child_code && formik.errors.child_code && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.child_code}</div>
                            )}
                        </div>
                    )}
                    
                    {/* Password Fields */}
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder='Password *'
                            className={`border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                        )}
                    </div>
                    
                    <div>
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder='Confirm Password *'
                            className={`border ${formik.touched.password_confirmation && formik.errors.password_confirmation ? 'border-red-500' : 'border-gray-200'} w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password_confirmation}
                        />
                        {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.password_confirmation}</div>
                        )}
                    </div>
                    
                    {/* Terms and Conditions */}
                    <div className='flex items-start justify-center space-x-3 pt-4 border-t border-gray-100'>
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            className={`w-4 h-4 mt-1 text-yellow-500 ${formik.touched.terms && formik.errors.terms ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-yellow-500 flex-shrink-0`}
                            onChange={formik.handleChange}
                            checked={formik.values.terms}
                        />
                        <label htmlFor="terms" className='text-sm text-gray-600 cursor-pointer leading-relaxed'>
                            I agree to the{' '}
                            <a href="#terms" className='text-yellow-500 hover:text-yellow-600 transition-colors duration-200'>
                                Terms of Service
                            </a>
                            {' '}and{' '}
                            <a href="#privacy" className='text-yellow-500 hover:text-yellow-600 transition-colors duration-200'>
                                Privacy Policy
                            </a>
                        </label>
                    </div>
                    {formik.touched.terms && formik.errors.terms && (
                        <div className="text-red-500 text-sm -mt-3 text-center">{formik.errors.terms}</div>
                    )}
                    
                    {/* Submit Button */}
                    <div className='flex items-center justify-center gap-4 pt-2'>
                        <button
                            type="submit"
                            className='bg-yellow-500 w-full hover:bg-yellow-600 p-3 px-8 text-white rounded font-medium transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                `Register as ${activeTab === 'student' ? 'Student' : 'Parent'}`
                            )}
                        </button>
                    </div>
                    
                    {/* Login Link */}
                    <div className='text-center'>
                        <p className='text-sm text-gray-600'>
                            Already have an account?{' '}
                            <a href="#login" className='text-yellow-500 hover:text-yellow-600 font-medium transition-colors duration-200'>
                                Sign In
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}