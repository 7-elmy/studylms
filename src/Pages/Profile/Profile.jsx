
// import  { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useTranslation } from 'react-i18next'
// import { apiRequest } from '../../Redux/Apis/apiRequest'
// import { getInitials } from '../../Utils/getInitials'
// import Autocomplete from '../../Components/Ui/Autocomplete'
// import toast from 'react-hot-toast';

// const mockReports = {
//     academicProgress: [
//         { subject: "Mathematics", grade: "A", percentage: 92, lastTest: "2024-08-10" },
//         { subject: "Science", grade: "B+", percentage: 87, lastTest: "2024-08-08" },
//         { subject: "English", grade: "A-", percentage: 89, lastTest: "2024-08-12" },
//         { subject: "Arabic", grade: "B", percentage: 83, lastTest: "2024-08-09" },
//         { subject: "History", grade: "A", percentage: 91, lastTest: "2024-08-11" }
//     ],
//     attendanceData: {
//         totalDays: 120,
//         presentDays: 112,
//         absentDays: 8,
//         percentage: 93.3
//     },
//     recentActivities: [
//         { activity: "Completed Math Quiz Chapter 5", date: "2024-08-12", score: "18/20" },
//         { activity: "Submitted Science Project", date: "2024-08-11", score: "Pending" },
//         { activity: "English Essay Assignment", date: "2024-08-10", score: "95%" },
//         { activity: "History Test - Ancient Egypt", date: "2024-08-09", score: "17/20" }
//     ]
// }

// export default function ProfilePage({ userType = 'student' }) {
//     const { t } = useTranslation()
//     const [activeTab, setActiveTab] = useState('profile')
//     const [isEditing, setIsEditing] = useState(false)
//     const [editedData, setEditedData] = useState({})
//     const [originalData, setOriginalData] = useState({}) // Track original data
//     const [loading, setLoading] = useState(false)
//     const [countrySearchLoading, setCountrySearchLoading] = useState(false)
//     const [touched, setTouched] = useState({})
//     const [errors, setErrors] = useState({})
//     const [profileImage, setProfileImage] = useState(null)
//     const [availableGovernorates, setAvailableGovernorates] = useState([])
//     const [allCountries, setAllCountries] = useState([])
    
//     const { profile, countries } = useSelector(state => state.api)
//     const dispatch = useDispatch()

//     console.log({profile});

//     // Load initial data
//     useEffect(() => {
//         dispatch(apiRequest({
//             entity: "profile",
//             url: "api/show_profile",
//             headers: {
//                 "Authorization": sessionStorage.getItem('token'),
//                 "Accept-Language": localStorage.getItem('language') || 'en',
//             },
//         }))
//         loadCountries()
//     }, [dispatch])

//     // Store all countries when loaded
//     useEffect(() => {
//         if (countries?.data?.data) {
//             setAllCountries(countries.data.data)
//         }
//     }, [countries])

//     // Set edited data when profile loads
//     useEffect(() => {
//         if (profile?.data?.data) {
//             const profileData = profile.data.data
//             const initialData = {
//                 name: profileData.name || '',
//                 email: profileData.email || '',
//                 phone: profileData.phone || '',
//                 country_id: profileData.country_id?.toString() || '',
//                 governorate_id: profileData.governorate_id?.toString() || '',
//                 class: profileData.class?.toString() || ''
//             }
//             setEditedData(initialData)
//             setOriginalData(initialData) // Store original data for comparison
//         }
//     }, [profile])

//     // Load governorates when country changes
//     useEffect(() => {
//         if (editedData.country_id && allCountries.length > 0) {
//             const selectedCountry = allCountries.find(
//                 country => country.id.toString() === editedData.country_id
//             )
            
//             if (selectedCountry && selectedCountry.governorates) {
//                 setAvailableGovernorates(selectedCountry.governorates)
//             } else {
//                 setAvailableGovernorates([])
//             }
            
//             // Reset governorate selection if country changes
//             if (editedData.governorate_id) {
//                 const governorateExists = selectedCountry?.governorates?.find(
//                     gov => gov.id.toString() === editedData.governorate_id
//                 )
//                 if (!governorateExists) {
//                     setEditedData(prev => ({
//                         ...prev,
//                         governorate_id: ''
//                     }))
//                 }
//             }
//         } else {
//             setAvailableGovernorates([])
//             setEditedData(prev => ({
//                 ...prev,
//                 governorate_id: ''
//             }))
//         }
//     }, [editedData.country_id, allCountries])

//     const loadCountries = async () => {
//         setLoading(true)
//         try {
//             await dispatch(apiRequest({ 
//                 url: "api/countries", 
//                 entity: "countries",
//                 headers: {
//                     "Accept-Language": localStorage.getItem('language') || 'en'
//                 }
//             }))
//         } finally {
//             setLoading(false)
//         }
//     }

//     // Search countries function - local filtering
//     const searchCountries = async (searchTerm) => {
//         setCountrySearchLoading(true)
//         try {
//             let filteredCountries = []
            
//             if (searchTerm) {
//                 filteredCountries = allCountries.filter(country => 
//                     country.name.toLowerCase().includes(searchTerm.toLowerCase())
//                 )
//             } else {
//                 filteredCountries = [...allCountries]
//             }
            
//             // Update the countries in Redux store with filtered results
//             dispatch({
//                 type: 'api/countries/fulfilled',
//                 payload: {
//                     data: {
//                         data: filteredCountries,
//                         status: true,
//                         message: 'Countries filtered successfully'
//                     }
//                 }
//             })
//         } catch (error) {
//             console.error('Error filtering countries:', error)
//         } finally {
//             setCountrySearchLoading(false)
//         }
//     }

//     // Fixed handleInputChange to properly handle autocomplete values
//     const handleInputChange = (field, value) => {
//         console.log('handleInputChange called:', { field, value })
        
//         setEditedData(prev => {
//             const newData = {
//                 ...prev,
//                 [field]: value
//             }
//             console.log('Updated editedData:', newData)
//             return newData
//         })

//         // Clear error when user starts typing
//         if (errors[field]) {
//             setErrors(prev => ({
//                 ...prev,
//                 [field]: ''
//             }))
//         }
//     }

//     const handleBlur = (field) => {
//         setTouched(prev => ({
//             ...prev,
//             [field]: true
//         }))
//         validateField(field, editedData[field])
//     }

//     const validateField = (field, value) => {
//         let error = ''
        
//         switch (field) {
//             case 'name':
//                 if (!value || value.trim().length < 2) {
//                     error = t('validation.nameRequired')
//                 }
//                 break
//             case 'email':
//                 if (!value || !/\S+@\S+\.\S+/.test(value)) {
//                     error = t('validation.emailInvalid')
//                 }
//                 break
//             case 'phone':
//                 if (!value || value.length < 10) {
//                     error = t('validation.phoneInvalid')
//                 }
//                 break
//             case 'country_id':
//                 if (!value) {
//                     error = t('validation.countryRequired')
//                 }
//                 break
//             case 'governorate_id':
//                 if (!value) {
//                     error = t('validation.governorateRequired')
//                 }
//                 break
//             case 'class':
//                 if (userType === 'student' && !value) {
//                     error = t('validation.classRequired')
//                 }
//                 break
//         }

//         setErrors(prev => ({
//             ...prev,
//             [field]: error
//         }))

//         return !error
//     }

//     const handleImageChange = (e) => {
//         const file = e.target.files[0]
//         if (file) {
//             setProfileImage(file)
//         }
//     }

//     // Function to get only changed fields
//     const getChangedFields = () => {
//         const changedFields = {}
        
//         Object.keys(editedData).forEach(key => {
//             if (editedData[key] !== originalData[key]) {
//                 changedFields[key] = editedData[key]
//             }
//         })

//         console.log('Original data:', originalData)
//         console.log('Edited data:', editedData)
//         console.log('Changed fields:', changedFields)
        
//         return changedFields
//     }

//     const handleSaveProfile = async () => {
//         // Validate all fields
//         const fieldsToValidate = ['name', 'email', 'phone', 'country_id', 'governorate_id']
//         if (userType === 'student') {
//             fieldsToValidate.push('class')
//         }

//         let isValid = true
//         fieldsToValidate.forEach(field => {
//             const fieldIsValid = validateField(field, editedData[field])
//             if (!fieldIsValid) isValid = false
//         })

//         if (!isValid) return

//         // Get only changed fields
//         const changedFields = getChangedFields()
        
//         // If no fields changed and no image, don't make API call
//         if (Object.keys(changedFields).length === 0 && !profileImage) {
//             toast.success(t('profile.noChangesToSave'))
//             setIsEditing(false)
//             return
//         }

//         setLoading(true)
//         try {
//             // Prepare form data with only changed fields
//             const formData = new FormData()
            
//             // Add only changed fields
//             Object.keys(changedFields).forEach(key => {
//                 if (changedFields[key]) {
//                     formData.append(key, changedFields[key])
//                 }
//             })

//             // Add image if selected
//             if (profileImage) {
//                 formData.append('image', profileImage)
//             }

//             // Log FormData entries
//             console.log('FormData entries:')
//             for (let [key, value] of formData.entries()) {
//                 console.log(`${key}:`, value);
//             }

//             // Make API request to update profile
//             await dispatch(apiRequest({
//                 url: "api/update_profile",
//                 method: "POST",
//                 entity: "updateProfile",
//                 data: formData,
//                 headers: {
//                     "Authorization": sessionStorage.getItem('token'),
//                     "Accept-Language": localStorage.getItem('language') || 'en',
//                     "Content-Type": "multipart/form-data"
//                 }
//             }))

//             // Refresh profile data
//             await dispatch(apiRequest({
//                 entity: "profile",
//                 url: "api/show_profile",
//                 headers: {
//                     "Authorization": sessionStorage.getItem('token'),
//                     "Accept-Language": localStorage.getItem('language') || 'en',
//                 }
//             }))

//             setIsEditing(false)
//             setProfileImage(null)
//             // toast.success(t('profile.profileUpdated'))
           
//         } catch (error) {
//             console.log({error});
//             console.error('Profile update error:', error)
//             // toast.error(t('profile.updateError'))
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleCancelEdit = () => {
//         // Reset to original profile data
//         setEditedData(originalData)
//         setIsEditing(false)
//         setErrors({})
//         setTouched({})
//         setProfileImage(null)
//     }

//     const getGradeColor = (grade) => {
//         if (grade.startsWith('A')) return 'text-green-600 bg-green-50'
//         if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50'
//         if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50'
//         return 'text-red-600 bg-red-50'
//     }

//     // Get governorate options based on selected country
//     const governorateOptions = availableGovernorates.map(g => ({ 
//         value: g.id.toString(), 
//         label: g.name 
//     }))

//     // Get country options for autocomplete
//     const countryOptions = (countries?.data?.data || []).map(c => ({ 
//         value: c.id.toString(), 
//         label: c.name 
//     }))

//     return (
//         <div className='min-h-[calc(100vh-230px)] px-4 py-8'>
//             <div className='max-w-6xl mx-auto'>
//                 {/* Header */}
//                 <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6'>
//                     <div className='flex flex-col sm:flex-row items-center gap-6'>
//                         <div className='relative'>
//                             <div className='w-20 h-20 text-yellow-400 font-bold text-2xl bg-yellow-100 rounded-full flex items-center justify-center'>
//                                 {getInitials(profile?.data?.data?.name)}
//                             </div>
//                             {isEditing && (
//                                 <div className='absolute -bottom-2 -right-2'>
//                                     <label className='bg-yellow-500 text-white p-2 rounded-full cursor-pointer hover:bg-yellow-600 transition-colors'>
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={handleImageChange}
//                                             className="hidden"
//                                         />
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                                         </svg>
//                                     </label>
//                                 </div>
//                             )}
//                         </div>
//                         <div className='text-center sm:text-left flex-1'>
//                             <h1 className='text-2xl font-semibold text-gray-900'>{profile?.data?.data?.name}</h1>
//                             <p className='text-gray-600'>
//                                 {profile?.data?.data?.type === 'student' 
//                                     ? `${t('profile.student')} - ${profile?.data?.data?.class || ""}` 
//                                     : `${t('profile.parentOf')} ${profile?.data?.data?.child_name || ''}`}
//                             </p>
//                         </div>
//                         <div className='flex gap-2'>
//                             <button
//                                 onClick={() => setIsEditing(!isEditing)}
//                                 disabled={loading}
//                                 className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200 disabled:opacity-50'
//                             >
//                                 {isEditing ? t('profile.cancel') : t('profile.edit')}
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Navigation Tabs */}
//                 <div className='bg-white rounded-lg shadow-sm border border-gray-200 mb-6'>
//                     <div className='border-b border-gray-200'>
//                         <nav className='flex space-x-8 px-6'>
//                             <button
//                                 onClick={() => setActiveTab('profile')}
//                                 className={`py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
//                                     activeTab === 'profile'
//                                         ? 'border-yellow-500 text-yellow-600'
//                                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                                 }`}
//                             >
//                                 {t('profile.profileInformation')}
//                             </button>
//                             {userType === 'student' && (
//                                 <button
//                                     onClick={() => setActiveTab('reports')}
//                                     className={`py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
//                                         activeTab === 'reports'
//                                             ? 'border-yellow-500 text-yellow-600'
//                                             : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                                     }`}
//                                 >
//                                     {t('profile.academicReports')}
//                                 </button>
//                             )}
//                         </nav>
//                     </div>

//                     <div className='p-6'>
//                         {/* Profile Tab */}
//                         {activeTab === 'profile' && (
//                             <div className='space-y-6'>
//                                 <h2 className='text-xl font-semibold text-gray-900'>{t('profile.personalInformation')}</h2>
                                
//                                 <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//                                     {/* Name Field */}
//                                     <div>
//                                         <label className='block text-sm font-medium text-gray-700 mb-2'>
//                                             {t('profile.fullName')}
//                                         </label>
//                                         {isEditing ? (
//                                             <>
//                                                 <input
//                                                     type='text'
//                                                     value={editedData.name || ''}
//                                                     onChange={(e) => handleInputChange('name', e.target.value)}
//                                                     onBlur={() => handleBlur('name')}
//                                                     className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
//                                                         touched.name && errors.name ? 'border-red-500' : 'border-gray-200'
//                                                     }`}
//                                                 />
//                                                 {touched.name && errors.name && (
//                                                     <div className="text-red-500 text-sm mt-1">{errors.name}</div>
//                                                 )}
//                                             </>
//                                         ) : (
//                                             <p className='p-3 bg-gray-50 rounded text-gray-900'>{profile?.data?.data?.name}</p>
//                                         )}
//                                     </div>

//                                     {/* Email Field */}
//                                     <div>
//                                         <label className='block text-sm font-medium text-gray-700 mb-2'>
//                                             {t('profile.email')}
//                                         </label>
//                                         {isEditing ? (
//                                             <>
//                                                 <input
//                                                     type='email'
//                                                     value={editedData.email || ''}
//                                                     onChange={(e) => handleInputChange('email', e.target.value)}
//                                                     onBlur={() => handleBlur('email')}
//                                                     className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
//                                                         touched.email && errors.email ? 'border-red-500' : 'border-gray-200'
//                                                     }`}
//                                                 />
//                                                 {touched.email && errors.email && (
//                                                     <div className="text-red-500 text-sm mt-1">{errors.email}</div>
//                                                 )}
//                                             </>
//                                         ) : (
//                                             <p className='p-3 bg-gray-50 rounded text-gray-900'>{profile?.data?.data?.email}</p>
//                                         )}
//                                     </div>

//                                     {/* Phone Field */}
//                                     <div>
//                                         <label className='block text-sm font-medium text-gray-700 mb-2'>
//                                             {t('profile.phone')}
//                                         </label>
//                                         {isEditing ? (
//                                             <>
//                                                 <input
//                                                     type='tel'
//                                                     value={editedData.phone || ''}
//                                                     onChange={(e) => handleInputChange('phone', e.target.value)}
//                                                     onBlur={() => handleBlur('phone')}
//                                                     className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
//                                                         touched.phone && errors.phone ? 'border-red-500' : 'border-gray-200'
//                                                     }`}
//                                                 />
//                                                 {touched.phone && errors.phone && (
//                                                     <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
//                                                 )}
//                                             </>
//                                         ) : (
//                                             <p className='p-3 bg-gray-50 rounded text-gray-900'>{profile?.data?.data?.phone}</p>
//                                         )}
//                                     </div>

//                                     {/* Country Field */}
//                                     <div>
//                                         <label className='block text-sm font-medium text-gray-700 mb-2'>
//                                             {t('profile.country')}
//                                         </label>
//                                         {isEditing ? (
//                                             <>
//                                                 <Autocomplete 
//                                                     name="country_id" 
//                                                     placeholder={t('profile.selectCountry')}
//                                                     className={`${touched.country_id && errors.country_id ? 'border-red-500' : 'border-gray-200'}`}
//                                                     items={countryOptions}
//                                                     value={editedData.country_id || ''} 
//                                                     onChange={handleInputChange} 
//                                                     onBlur={() => handleBlur('country_id')}
//                                                     disabled={loading} 
//                                                     loading={countrySearchLoading}
//                                                     onSearch={searchCountries} 
//                                                     searchPlaceholder={t('profile.searchCountries')}
//                                                 />
//                                                 {touched.country_id && errors.country_id && (
//                                                     <div className="text-red-500 text-sm mt-1">{errors.country_id}</div>
//                                                 )}
//                                                 <div className="text-sm text-gray-500 mt-1">
//                                                     Selected: {editedData.country_id || 'None'}
//                                                 </div>
//                                             </>
//                                         ) : (
//                                             <p className='p-3 bg-gray-50 rounded text-gray-900'>
//                                          {/* {availableGovernorates.find(g => g.id.toString() === editedData.governorate_id)?.name || ''} */}

//                                                 {profile?.data?.data?.country || t('profile.selectCountry')}
//                                             </p>
//                                         )}
//                                     </div>

//                                     {/* Governorate Field */}
//                                     <div>
//                                         <label className='block text-sm font-medium text-gray-700 mb-2'>
//                                             {t('profile.governorate')}
//                                         </label>
//                                         {isEditing ? (
//                                             <>
//                                                 <Autocomplete
//                                                     name="governorate_id" 
//                                                     placeholder={t('profile.selectGovernorate')}
//                                                     className={`${touched.governorate_id && errors.governorate_id ? 'border-red-500' : 'border-gray-200'}`}
//                                                     items={governorateOptions} 
//                                                     value={editedData.governorate_id || ''}
//                                                     onChange={handleInputChange} 
//                                                     onBlur={() => handleBlur('governorate_id')}
//                                                     disabled={!editedData.country_id || governorateOptions.length === 0}
//                                                     searchPlaceholder={t('profile.searchGovernorates')}
//                                                     noResultsText={!editedData.country_id ? t('profile.selectCountryFirst') : t('profile.noGovernorates')}
//                                                 />
//                                                 {touched.governorate_id && errors.governorate_id && (
//                                                     <div className="text-red-500 text-sm mt-1">{errors.governorate_id}</div>
//                                                 )}
//                                             </>
//                                         ) : (
//                                             <p className='p-3 bg-gray-50 rounded text-gray-900'>
//                                                 {/* {availableGovernorates.find(g => g.id.toString() === editedData.governorate_id)?.name || ''} */}
//                                                 {profile?.data?.data?.governorate }
//                                             </p>
//                                         )}
//                                     </div>

//                                     {/* Class Field - Only for students */}
//                                     {userType === 'student' && (
//                                         <div>
//                                             <label className='block text-sm font-medium text-gray-700 mb-2'>
//                                                 {t('profile.class')}
//                                             </label>
//                                             {isEditing ? (
//                                                 <>
//                                                     <Autocomplete
//                                                         name="class"
//                                                         placeholder={t('profile.selectClass')}
//                                                         className={`${touched.class && errors.class ? 'border-red-500' : 'border-gray-200'}`}
//                                                         items={t('slider.courses', { returnObjects: true }).map((course, index) => ({
//                                                             label: course,
//                                                             value: (index + 1).toString(),
//                                                         }))}
//                                                         value={editedData.class || ''}
//                                                         onChange={handleInputChange}
//                                                         onBlur={() => handleBlur('class')}
//                                                         searchPlaceholder={t('profile.searchClass')}
//                                                         noResultsText={t('profile.noClass')}
//                                                     />
//                                                     {touched.class && errors.class && (
//                                                         <div className="text-red-500 text-sm mt-1">{errors.class}</div>
//                                                     )}
//                                                 </>
//                                             ) : (
//                                                 <p className='p-3 bg-gray-50 rounded text-gray-900'>{profile?.data?.data?.class}</p>
//                                             )}
//                                         </div>
//                                     )}

//                                     {/* Student Code */}
//                                     <div>
//                                         <label className='block text-sm font-medium text-gray-700 mb-2'>
//                                             {userType === 'student' ? t('profile.studentCode') : t('profile.childStudentCode')}
//                                         </label>
//                                         <p className='p-3 bg-gray-50 rounded text-gray-900'>{profile?.data?.data?.child_code}</p>
//                                     </div>
//                                 </div>

//                                 {isEditing && (
//                                     <div className='flex gap-4 pt-6 border-t border-gray-200'>
//                                         <button
//                                             onClick={handleSaveProfile}
//                                             disabled={loading}
//                                             className='px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200 disabled:opacity-50'
//                                         >
//                                             {loading ? t('profile.saving') : t('profile.saveChanges')}
//                                         </button>
//                                         <button
//                                             onClick={handleCancelEdit}
//                                             disabled={loading}
//                                             className='px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50'
//                                         >
//                                             {t('profile.cancel')}
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         )}

//                         {/* Reports Tab (Students only) */}
//                         {activeTab === 'reports' && userType === 'student' && (
//                             <div className='space-y-8'>
//                                 {/* Academic Progress */}
//                                 <div>
//                                     <h2 className='text-xl font-semibold text-gray-900 mb-4'>{t('profile.academicProgress')}</h2>
//                                     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
//                                         {mockReports.academicProgress.map((subject, index) => (
//                                             <div key={index} className='bg-white border border-gray-200 rounded-lg p-4'>
//                                                 <div className='flex justify-between items-start mb-2'>
//                                                     <h3 className='font-medium text-gray-900'>{subject.subject}</h3>
//                                                     <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(subject.grade)}`}>
//                                                         {subject.grade}
//                                                     </span>
//                                                 </div>
//                                                 <div className='space-y-2'>
//                                                     <div className='flex justify-between text-sm text-gray-600'>
//                                                         <span>{t('profile.score')}:</span>
//                                                         <span>{subject.percentage}%</span>
//                                                     </div>
//                                                     <div className='w-full bg-gray-200 rounded-full h-2'>
//                                                         <div 
//                                                             className='bg-yellow-500 h-2 rounded-full transition-all duration-300'
//                                                             style={{ width: `${subject.percentage}%` }}
//                                                         ></div>
//                                                     </div>
//                                                     <p className='text-xs text-gray-500'>
//                                                         {t('profile.lastTest')}: {new Date(subject.lastTest).toLocaleDateString()}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Attendance */}
//                                 <div>
//                                     <h2 className='text-xl font-semibold text-gray-900 mb-4'>{t('profile.attendanceOverview')}</h2>
//                                     <div className='bg-white border border-gray-200 rounded-lg p-6'>
//                                         <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
//                                             <div className='text-center'>
//                                                 <div className='text-2xl font-bold text-gray-900'>{mockReports.attendanceData.totalDays}</div>
//                                                 <div className='text-sm text-gray-600'>{t('profile.totalDays')}</div>
//                                             </div>
//                                             <div className='text-center'>
//                                                 <div className='text-2xl font-bold text-green-600'>{mockReports.attendanceData.presentDays}</div>
//                                                 <div className='text-sm text-gray-600'>{t('profile.present')}</div>
//                                             </div>
//                                             <div className='text-center'>
//                                                 <div className='text-2xl font-bold text-red-600'>{mockReports.attendanceData.absentDays}</div>
//                                                 <div className='text-sm text-gray-600'>{t('profile.absent')}</div>
//                                             </div>
//                                             <div className='text-center'>
//                                                 <div className='text-2xl font-bold text-yellow-600'>{mockReports.attendanceData.percentage}%</div>
//                                                 <div className='text-sm text-gray-600'>{t('profile.attendanceRate')}</div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Recent Activities */}
//                                 <div>
//                                     <h2 className='text-xl font-semibold text-gray-900 mb-4'>{t('profile.recentActivities')}</h2>
//                                     <div className='bg-white border border-gray-200 rounded-lg divide-y divide-gray-200'>
//                                         {mockReports.recentActivities.map((activity, index) => (
//                                             <div key={index} className='p-4'>
//                                                 <div className='flex justify-between items-start'>
//                                                     <div>
//                                                         <h3 className='font-medium text-gray-900'>{activity.activity}</h3>
//                                                         <p className='text-sm text-gray-600'>{new Date(activity.date).toLocaleDateString()}</p>
//                                                     </div>
//                                                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                                                         activity.score === 'Pending' 
//                                                             ? 'bg-yellow-100 text-yellow-800'
//                                                             : 'bg-green-100 text-green-800'
//                                                     }`}>
//                                                         {activity.score}
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { apiRequest } from '../../Redux/Apis/apiRequest'
import { getInitials } from '../../Utils/getInitials'
import Autocomplete from '../../Components/Ui/Autocomplete'
import toast from 'react-hot-toast'

const mockReports = {
    academicProgress: [
        { subject: "Mathematics", grade: "A", percentage: 92, lastTest: "2024-08-10" },
        { subject: "Science", grade: "B+", percentage: 87, lastTest: "2024-08-08" },
        { subject: "English", grade: "A-", percentage: 89, lastTest: "2024-08-12" },
        { subject: "Arabic", grade: "B", percentage: 83, lastTest: "2024-08-09" },
        { subject: "History", grade: "A", percentage: 91, lastTest: "2024-08-11" }
    ],
    attendanceData: {
        totalDays: 120,
        presentDays: 112,
        absentDays: 8,
        percentage: 93.3
    },
    recentActivities: [
        { activity: "Completed Math Quiz Chapter 5", date: "2024-08-12", score: "18/20" },
        { activity: "Submitted Science Project", date: "2024-08-11", score: "Pending" },
        { activity: "English Essay Assignment", date: "2024-08-10", score: "95%" },
        { activity: "History Test - Ancient Egypt", date: "2024-08-09", score: "17/20" }
    ]
}

export default function ProfilePage({ userType = 'student' }) {
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState('profile')
    const [isEditing, setIsEditing] = useState(false)
    const [editedData, setEditedData] = useState({})
    const [originalData, setOriginalData] = useState({})
    const [loading, setLoading] = useState(false)
    const [countrySearchLoading, setCountrySearchLoading] = useState(false)
    const [touched, setTouched] = useState({})
    const [errors, setErrors] = useState({})
    const [profileImage, setProfileImage] = useState(null)
    const [availableGovernorates, setAvailableGovernorates] = useState([])
    const [allCountries, setAllCountries] = useState([])
    const [selectedCountryName, setSelectedCountryName] = useState('')
    const [selectedGovernorateName, setSelectedGovernorateName] = useState('')
    
    const { profile, countries } = useSelector(state => state.api)
    const dispatch = useDispatch()

    // Load initial data
    useEffect(() => {
        dispatch(apiRequest({
            entity: "profile",
            url: "api/show_profile",
            headers: {
                "Authorization": sessionStorage.getItem('token'),
                "Accept-Language": localStorage.getItem('language') || 'en',
            },
        }))
        loadCountries()
    }, [dispatch])

    console.log('Profile data:', profile?.data?.data);
    

    // Store all countries when loaded
    useEffect(() => {
        if (countries?.data?.data) {
            setAllCountries(countries.data.data)
        }
    }, [countries])

    // Set edited data when profile loads and initialize display names
    useEffect(() => {
        if (profile?.data?.data) {
            const profileData = profile.data.data
            const initialData = {
                name: profileData.name || '',
                email: profileData.email || '',
                phone: profileData.phone || '',
                country_id: profileData.country_id?.toString() || '',
                governorate_id: profileData.governorate_id?.toString() || '',
                class: profileData.class?.toString() || ''
            }
            setEditedData(initialData)
            setOriginalData(initialData)

            // Initialize display names
            if (allCountries.length > 0 && profileData.country_id) {
                const country = allCountries.find(c => c.id.toString() === profileData.country_id.toString())
                if (country) {
                    setSelectedCountryName(country.name)
                    setAvailableGovernorates(country.governorates || [])
                    
                    if (profileData.governorate_id && country.governorates) {
                        const governorate = country.governorates.find(
                            g => g.id.toString() === profileData.governorate_id.toString()
                        )
                        if (governorate) {
                            setSelectedGovernorateName(governorate.name)
                        }
                    }
                }
            }
        }
    }, [profile, allCountries])

    // Load governorates when country changes
    useEffect(() => {
        if (editedData.country_id && allCountries.length > 0) {
            const selectedCountry = allCountries.find(
                country => country.id.toString() === editedData.country_id
            )
            
            if (selectedCountry) {
                setSelectedCountryName(selectedCountry.name)
                setAvailableGovernorates(selectedCountry.governorates || [])
                
                // Reset governorate selection if country changes
                if (editedData.governorate_id) {
                    const governorateExists = selectedCountry.governorates?.find(
                        gov => gov.id.toString() === editedData.governorate_id
                    )
                    if (!governorateExists) {
                        setEditedData(prev => ({
                            ...prev,
                            governorate_id: ''
                        }))
                        setSelectedGovernorateName('')
                    }
                }
            }
        } else {
            setAvailableGovernorates([])
            setEditedData(prev => ({
                ...prev,
                governorate_id: ''
            }))
            setSelectedCountryName('')
            setSelectedGovernorateName('')
        }
    }, [editedData.country_id, allCountries])

    const loadCountries = async () => {
        setLoading(true)
        try {
            await dispatch(apiRequest({ 
                url: "api/countries", 
                entity: "countries",
                headers: {
                    "Accept-Language": localStorage.getItem('language') || 'en'
                }
            }))
        } finally {
            setLoading(false)
        }
    }

    // Search countries function - local filtering
    const searchCountries = async (searchTerm) => {
        setCountrySearchLoading(true)
        try {
            let filteredCountries = []
            
            if (searchTerm) {
                filteredCountries = allCountries.filter(country => 
                    country.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            } else {
                filteredCountries = [...allCountries]
            }
            
            return filteredCountries.map(country => ({
                value: country.id.toString(),
                label: country.name
            }))
        } catch (error) {
            console.error('Error filtering countries:', error)
            return []
        } finally {
            setCountrySearchLoading(false)
        }
    }

    const handleInputChange = (field, value) => {
        setEditedData(prev => {
            const newData = {
                ...prev,
                [field]: value
            }
            return newData
        })

        // Update display names when selections change
        if (field === 'country_id') {
            const country = allCountries.find(c => c.id.toString() === value)
            setSelectedCountryName(country?.name || '')
        } else if (field === 'governorate_id') {
            const governorate = availableGovernorates.find(g => g.id.toString() === value)
            setSelectedGovernorateName(governorate?.name || '')
        }

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }))
        }
    }

    const handleBlur = (field) => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }))
        validateField(field, editedData[field])
    }

    const validateField = (field, value) => {
        let error = ''
        
        switch (field) {
            case 'name':
                if (!value || value.trim().length < 2) {
                    error = t('validation.nameRequired')
                }
                break
            case 'email':
                if (!value || !/\S+@\S+\.\S+/.test(value)) {
                    error = t('validation.emailInvalid')
                }
                break
            case 'phone':
                if (!value || value.length < 10) {
                    error = t('validation.phoneInvalid')
                }
                break
            case 'country_id':
                if (!value) {
                    error = t('validation.countryRequired')
                }
                break
            case 'governorate_id':
                if (!value) {
                    error = t('validation.governorateRequired')
                }
                break
            case 'class':
                if (userType === 'student' && !value) {
                    error = t('validation.classRequired')
                }
                break
        }

        setErrors(prev => ({
            ...prev,
            [field]: error
        }))

        return !error
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProfileImage(file)
        }
    }

    const getChangedFields = () => {
        const changedFields = {}
        
        Object.keys(editedData).forEach(key => {
            if (editedData[key] !== originalData[key]) {
                changedFields[key] = editedData[key]
            }
        })
        
        return changedFields
    }

    const handleSaveProfile = async () => {
        // Validate all fields
        const fieldsToValidate = ['name', 'email', 'phone', 'country_id', 'governorate_id']
        if (userType === 'student') {
            fieldsToValidate.push('class')
        }

        let isValid = true
        fieldsToValidate.forEach(field => {
            const fieldIsValid = validateField(field, editedData[field])
            if (!fieldIsValid) isValid = false
        })

        if (!isValid) return

        // Get only changed fields
        const changedFields = getChangedFields()
        
        // If no fields changed and no image, don't make API call
        if (Object.keys(changedFields).length === 0 && !profileImage) {
            toast.success(t('profile.noChangesToSave'))
            setIsEditing(false)
            return
        }

        setLoading(true)
        try {
            // Prepare form data with only changed fields
            const formData = new FormData()
            
            // Add only changed fields
            Object.keys(changedFields).forEach(key => {
                formData.append(key, changedFields[key])
            })

            // Add image if selected
            if (profileImage) {
                formData.append('image', profileImage)
            }

            // Make API request to update profile
            await dispatch(apiRequest({
                url: "api/update_profile",
                method: "POST",
                entity: "updateProfile",
                data: formData,
                headers: {
                    "Authorization": sessionStorage.getItem('token'),
                    "Accept-Language": localStorage.getItem('language') || 'en',
                    "Content-Type": "multipart/form-data"
                }
            }))

            // Refresh profile data
            await dispatch(apiRequest({
                entity: "profile",
                url: "api/show_profile",
                headers: {
                    "Authorization": sessionStorage.getItem('token'),
                    "Accept-Language": localStorage.getItem('language') || 'en',
                }
            }))

            setIsEditing(false)
            setProfileImage(null)
            toast.success(t('profile.profileUpdated'))
           
        } catch (error) {
            console.error('Profile update error:', error)
            toast.error(t('profile.updateError'))
        } finally {
            setLoading(false)
        }
    }

    const handleCancelEdit = () => {
        // Reset to original profile data
        setEditedData(originalData)
        
        // Reset display names
        if (originalData.country_id && allCountries.length > 0) {
            const country = allCountries.find(c => c.id.toString() === originalData.country_id)
            if (country) {
                setSelectedCountryName(country.name)
                
                if (originalData.governorate_id && country.governorates) {
                    const governorate = country.governorates.find(
                        g => g.id.toString() === originalData.governorate_id
                    )
                    if (governorate) {
                        setSelectedGovernorateName(governorate.name)
                    }
                }
            }
        }
        
        setIsEditing(false)
        setErrors({})
        setTouched({})
        setProfileImage(null)
    }

    const getGradeColor = (grade) => {
        if (grade.startsWith('A')) return 'text-green-600 bg-green-50'
        if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50'
        if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50'
        return 'text-red-600 bg-red-50'
    }

    // Get governorate options based on selected country
    const governorateOptions = availableGovernorates.map(g => ({ 
        value: g.id.toString(), 
        label: g.name 
    }))

    // Get country options for autocomplete
    const countryOptions = allCountries.map(c => ({ 
        value: c.id.toString(), 
        label: c.name 
    }))

    return (
        <div className='min-h-[calc(100vh-230px)] px-4 py-8'>
            <div className='max-w-6xl mx-auto'>
                {/* Header */}
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6'>
                    <div className='flex flex-col sm:flex-row items-center gap-6'>
                        <div className='relative'>
                            <div className='w-20 h-20 text-yellow-400 font-bold text-2xl bg-yellow-100 rounded-full flex items-center justify-center'>
                                {getInitials(profile?.data?.data?.name)}
                            </div>
                            {isEditing && (
                                <div className='absolute -bottom-2 -right-2'>
                                    <label className='bg-yellow-500 text-white p-2 rounded-full cursor-pointer hover:bg-yellow-600 transition-colors'>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className='text-center sm:text-left flex-1'>
                            <h1 className='text-2xl font-semibold text-gray-900'>{profile?.data?.data?.name}</h1>
                            <p className='text-gray-600'>
                                {profile?.data?.data?.type === 'student' 
                                    ? `${t('profile.student')} - ${profile?.data?.data?.class || ""}` 
                                    : `${t('profile.parentOf')} ${profile?.data?.data?.child_name || ''}`}
                            </p>
                        </div>
                        <div className='flex gap-2'>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                disabled={loading}
                                className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200 disabled:opacity-50'
                            >
                                {isEditing ? t('profile.cancel') : t('profile.edit')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 mb-6'>
                    <div className='border-b border-gray-200'>
                        <nav className='flex space-x-8 px-6'>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                    activeTab === 'profile'
                                        ? 'border-yellow-500 text-yellow-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {t('profile.profileInformation')}
                            </button>
                            {userType === 'student' && (
                                <button
                                    onClick={() => setActiveTab('reports')}
                                    className={`py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                        activeTab === 'reports'
                                            ? 'border-yellow-500 text-yellow-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {t('profile.academicReports')}
                                </button>
                            )}
                        </nav>
                    </div>

                    <div className='p-6'>
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className='space-y-6'>
                                <h2 className='text-xl font-semibold text-gray-900'>{t('profile.personalInformation')}</h2>
                                
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    {/* Name Field */}
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            {t('profile.fullName')}
                                        </label>
                                        {isEditing ? (
                                            <>
                                                <input
                                                    type='text'
                                                    value={editedData.name || ''}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    onBlur={() => handleBlur('name')}
                                                    className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                                                        touched.name && errors.name ? 'border-red-500' : 'border-gray-200'
                                                    }`}
                                                />
                                                {touched.name && errors.name && (
                                                    <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                                                )}
                                            </>
                                        ) : (
                                            <p className='p-3 bg-gray-50 rounded text-gray-900'>{profile?.data?.data?.name}</p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            {t('profile.email')}
                                        </label>
                                        {isEditing ? (
                                            <>
                                                <input
                                                    type='email'
                                                    value={editedData.email || ''}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    onBlur={() => handleBlur('email')}
                                                    className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                                                        touched.email && errors.email ? 'border-red-500' : 'border-gray-200'
                                                    }`}
                                                />
                                                {touched.email && errors.email && (
                                                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                                                )}
                                            </>
                                        ) : (
                                            <p className='p-3 bg-gray-50 rounded text-gray-900'>{profile?.data?.data?.email}</p>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            {t('profile.phone')}
                                        </label>
                                        {isEditing ? (
                                            <>
                                                <input
                                                    type='tel'
                                                    value={editedData.phone || ''}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    onBlur={() => handleBlur('phone')}
                                                    className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                                                        touched.phone && errors.phone ? 'border-red-500' : 'border-gray-200'
                                                    }`}
                                                />
                                                {touched.phone && errors.phone && (
                                                    <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
                                                )}
                                            </>
                                        ) : (
                                            <p className='p-3 bg-gray-50 rounded text-gray-900'>{profile?.data?.data?.phone}</p>
                                        )}
                                    </div>

                                    {/* Country Field */}
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            {t('profile.country')}
                                        </label>
                                        {isEditing ? (
                                            <>
                                                <Autocomplete 
                                                    name="country_id" 
                                                    placeholder={t('profile.selectCountry')}
                                                    className={`${touched.country_id && errors.country_id ? 'border-red-500' : 'border-gray-200'}`}
                                                    items={countryOptions}
                                                    value={editedData.country_id || ''} 
                                                    onChange={(field, value) => {
                                                        handleInputChange('country_id', value)
                                                        handleInputChange('governorate_id', '')
                                                    }}
                                                    onBlur={() => handleBlur('country_id')}
                                                    disabled={loading} 
                                                    loading={countrySearchLoading}
                                                    onSearch={searchCountries} 
                                                    searchPlaceholder={t('profile.searchCountries')}
                                                />
                                                {touched.country_id && errors.country_id && (
                                                    <div className="text-red-500 text-sm mt-1">{errors.country_id}</div>
                                                )}
                                            </>
                                        ) : (
                                            <p className='p-3 bg-gray-50 rounded text-gray-900'>
                                                {selectedCountryName || t('profile.selectCountry')}
                                            </p>
                                        )}
                                    </div>

                                    {/* Governorate Field */}
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            {t('profile.governorate')}
                                        </label>
                                        {isEditing ? (
                                            <>
                                                <Autocomplete
                                                    name="governorate_id" 
                                                    placeholder={t('profile.selectGovernorate')}
                                                    className={`${touched.governorate_id && errors.governorate_id ? 'border-red-500' : 'border-gray-200'}`}
                                                    items={governorateOptions} 
                                                    value={editedData.governorate_id || ''}
                                                    onChange={handleInputChange} 
                                                    onBlur={() => handleBlur('governorate_id')}
                                                    disabled={!editedData.country_id || governorateOptions.length === 0}
                                                    searchPlaceholder={t('profile.searchGovernorates')}
                                                    noResultsText={!editedData.country_id ? t('profile.selectCountryFirst') : t('profile.noGovernorates')}
                                                />
                                                {touched.governorate_id && errors.governorate_id && (
                                                    <div className="text-red-500 text-sm mt-1">{errors.governorate_id}</div>
                                                )}
                                            </>
                                        ) : (
                                            <p className='p-3 bg-gray-50 rounded text-gray-900'>
                                                {selectedGovernorateName || t('profile.selectGovernorate')}
                                            </p>
                                        )}
                                    </div>

                                    {/* Class Field - Only for students */}
                                    {userType === 'student' && (
                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                                {t('profile.class')}
                                            </label>
                                            {isEditing ? (
                                                <>
                                                    <Autocomplete
                                                        name="class"
                                                        placeholder={t('profile.selectClass')}
                                                        className={`${touched.class && errors.class ? 'border-red-500' : 'border-gray-200'}`}
                                                        items={t('slider.courses', { returnObjects: true }).map((course, index) => ({
                                                            label: course,
                                                            value: (index + 1).toString(),
                                                        }))}
                                                        value={editedData.class || ''}
                                                        onChange={handleInputChange}
                                                        onBlur={() => handleBlur('class')}
                                                        searchPlaceholder={t('profile.searchClass')}
                                                        noResultsText={t('profile.noClass')}
                                                    />
                                                    {touched.class && errors.class && (
                                                        <div className="text-red-500 text-sm mt-1">{errors.class}</div>
                                                    )}
                                                </>
                                            ) : (
                                                <p className='p-3 bg-gray-50 rounded text-gray-900'>{profile?.data?.data?.class}</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Student Code */}
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            {userType === 'student' ? t('profile.studentCode') : t('profile.childStudentCode')}
                                        </label>
                                        <p className='p-3 bg-gray-50 rounded text-gray-900'>{profile?.data?.data?.child_code}</p>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className='flex gap-4 pt-6 border-t border-gray-200'>
                                        <button
                                            onClick={handleSaveProfile}
                                            disabled={loading}
                                            className='px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200 disabled:opacity-50'
                                        >
                                            {loading ? t('profile.saving') : t('profile.saveChanges')}
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            disabled={loading}
                                            className='px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50'
                                        >
                                            {t('profile.cancel')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Reports Tab (Students only) */}
                        {activeTab === 'reports' && userType === 'student' && (
                            <div className='space-y-8'>
                                {/* Academic Progress */}
                                <div>
                                    <h2 className='text-xl font-semibold text-gray-900 mb-4'>{t('profile.academicProgress')}</h2>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                        {mockReports.academicProgress.map((subject, index) => (
                                            <div key={index} className='bg-white border border-gray-200 rounded-lg p-4'>
                                                <div className='flex justify-between items-start mb-2'>
                                                    <h3 className='font-medium text-gray-900'>{subject.subject}</h3>
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(subject.grade)}`}>
                                                        {subject.grade}
                                                    </span>
                                                </div>
                                                <div className='space-y-2'>
                                                    <div className='flex justify-between text-sm text-gray-600'>
                                                        <span>{t('profile.score')}:</span>
                                                        <span>{subject.percentage}%</span>
                                                    </div>
                                                    <div className='w-full bg-gray-200 rounded-full h-2'>
                                                        <div 
                                                            className='bg-yellow-500 h-2 rounded-full transition-all duration-300'
                                                            style={{ width: `${subject.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <p className='text-xs text-gray-500'>
                                                        {t('profile.lastTest')}: {new Date(subject.lastTest).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Attendance */}
                                <div>
                                    <h2 className='text-xl font-semibold text-gray-900 mb-4'>{t('profile.attendanceOverview')}</h2>
                                    <div className='bg-white border border-gray-200 rounded-lg p-6'>
                                        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                                            <div className='text-center'>
                                                <div className='text-2xl font-bold text-gray-900'>{mockReports.attendanceData.totalDays}</div>
                                                <div className='text-sm text-gray-600'>{t('profile.totalDays')}</div>
                                            </div>
                                            <div className='text-center'>
                                                <div className='text-2xl font-bold text-green-600'>{mockReports.attendanceData.presentDays}</div>
                                                <div className='text-sm text-gray-600'>{t('profile.present')}</div>
                                            </div>
                                            <div className='text-center'>
                                                <div className='text-2xl font-bold text-red-600'>{mockReports.attendanceData.absentDays}</div>
                                                <div className='text-sm text-gray-600'>{t('profile.absent')}</div>
                                            </div>
                                            <div className='text-center'>
                                                <div className='text-2xl font-bold text-yellow-600'>{mockReports.attendanceData.percentage}%</div>
                                                <div className='text-sm text-gray-600'>{t('profile.attendanceRate')}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activities */}
                                <div>
                                    <h2 className='text-xl font-semibold text-gray-900 mb-4'>{t('profile.recentActivities')}</h2>
                                    <div className='bg-white border border-gray-200 rounded-lg divide-y divide-gray-200'>
                                        {mockReports.recentActivities.map((activity, index) => (
                                            <div key={index} className='p-4'>
                                                <div className='flex justify-between items-start'>
                                                    <div>
                                                        <h3 className='font-medium text-gray-900'>{activity.activity}</h3>
                                                        <p className='text-sm text-gray-600'>{new Date(activity.date).toLocaleDateString()}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                        activity.score === 'Pending' 
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-green-100 text-green-800'
                                                    }`}>
                                                        {activity.score}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useTranslation } from 'react-i18next'
// import { apiRequest } from '../../Redux/Apis/apiRequest'
// import { getInitials } from '../../Utils/getInitials'
// import Autocomplete from '../../Components/Ui/Autocomplete'
// import toast from 'react-hot-toast'

// const mockReports = {
//     academicProgress: [
//         { subject: "Mathematics", grade: "A", percentage: 92, lastTest: "2024-08-10" },
//         { subject: "Science", grade: "B+", percentage: 87, lastTest: "2024-08-08" },
//         { subject: "English", grade: "A-", percentage: 89, lastTest: "2024-08-12" },
//         { subject: "Arabic", grade: "B", percentage: 83, lastTest: "2024-08-09" },
//         { subject: "History", grade: "A", percentage: 91, lastTest: "2024-08-11" }
//     ],
//     attendanceData: {
//         totalDays: 120,
//         presentDays: 112,
//         absentDays: 8,
//         percentage: 93.3
//     },
//     recentActivities: [
//         { activity: "Completed Math Quiz Chapter 5", date: "2024-08-12", score: "18/20" },
//         { activity: "Submitted Science Project", date: "2024-08-11", score: "Pending" },
//         { activity: "English Essay Assignment", date: "2024-08-10", score: "95%" },
//         { activity: "History Test - Ancient Egypt", date: "2024-08-09", score: "17/20" }
//     ]
// }




