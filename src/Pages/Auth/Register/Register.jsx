// import React, { useState, useRef, useEffect } from 'react'

// export default function RegisterPage() {
//     const [activeTab, setActiveTab] = useState('student')
//     const [selectedGovernorate, setSelectedGovernorate] = useState('')
//     const [governorateInput, setGovernorateInput] = useState('')
//     const [showGovernorateDropdown, setShowGovernorateDropdown] = useState(false)
//     const [selectedGrade, setSelectedGrade] = useState('')
//     const [highlightedIndex, setHighlightedIndex] = useState(-1)
    
//     const dropdownRef = useRef(null)
//     const inputRef = useRef(null)
    
//     const grades = [
//         'Grade 1',
//         'Grade 2', 
//         'Grade 3',
//         'Grade 4',
//         'Grade 5',
//         'Grade 6',
//         'Grade 7',
//         'Grade 8',
//         'Grade 9',
//         'Grade 10',
//         'Grade 11',
//         'Grade 12'
//     ]
    
//     const governorates = [
//         'Cairo',
//         'Giza',
//         'Alexandria',
//         'Dakahlia',
//         'Red Sea',
//         'Beheira',
//         'Fayoum',
//         'Gharbia',
//         'Ismailia',
//         'Menofia',
//         'Minya',
//         'Qaliubiya',
//         'New Valley',
//         'Suez',
//         'Aswan',
//         'Assiut',
//         'Beni Suef',
//         'Port Said',
//         'Damietta',
//         'Sharkia',
//         'South Sinai',
//         'Kafr El Sheikh',
//         'Matrouh',
//         'Luxor',
//         'Qena',
//         'North Sinai',
//         'Sohag'
//     ]
    
//     // Filter governorates based on input
//     const filteredGovernorates = governorates.filter(gov =>
//         gov.toLowerCase().includes(governorateInput.toLowerCase())
//     )

//     const handleGovernorateSelect = (gov) => {
//         setSelectedGovernorate(gov)
//         setGovernorateInput(gov)
//         setShowGovernorateDropdown(false)
//         setHighlightedIndex(-1)
//     }

//     const handleGovernorateInputChange = (e) => {
//         const value = e.target.value
//         setGovernorateInput(value)
//         setSelectedGovernorate(value)
//         setShowGovernorateDropdown(true)
//         setHighlightedIndex(-1) // Reset highlight when typing
//     }

//     // Keyboard navigation handler
//     const handleKeyDown = (e) => {
//         if (!showGovernorateDropdown || filteredGovernorates.length === 0) return

//         switch (e.key) {
//             case 'ArrowDown':
//                 e.preventDefault()
//                 setHighlightedIndex(prev => {
//                     const next = prev < filteredGovernorates.length - 1 ? prev + 1 : 0
//                     return next
//                 })
//                 break
//             case 'ArrowUp':
//                 e.preventDefault()
//                 setHighlightedIndex(prev => {
//                     const next = prev > 0 ? prev - 1 : filteredGovernorates.length - 1
//                     return next
//                 })
//                 break
//             case 'Enter':
//                 e.preventDefault()
//                 if (highlightedIndex >= 0 && highlightedIndex < filteredGovernorates.length) {
//                     handleGovernorateSelect(filteredGovernorates[highlightedIndex])
//                 }
//                 break
//             case 'Escape':
//                 e.preventDefault()
//                 setShowGovernorateDropdown(false)
//                 setHighlightedIndex(-1)
//                 inputRef.current?.blur()
//                 break
//             case 'Tab':
//                 setShowGovernorateDropdown(false)
//                 setHighlightedIndex(-1)
//                 break
//         }
//     }

//     // Scroll highlighted item into view
//     useEffect(() => {
//         if (highlightedIndex >= 0 && dropdownRef.current) {
//             const highlightedElement = dropdownRef.current.children[highlightedIndex]
//             if (highlightedElement) {
//                 highlightedElement.scrollIntoView({
//                     block: 'nearest',
//                     behavior: 'smooth'
//                 })
//             }
//         }
//     }, [highlightedIndex])

//     return (
//         <div className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
//             <div className='border border-gray-300 px-4 sm:px-6 lg:px-8 rounded-lg py-6 sm:py-8 bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-sm'>
//                 <h2 className='text-xl sm:text-2xl mb-4 sm:mb-6 text-center sm:text-left font-medium'>Register Form</h2>
                
//                 {/* Tabs */}
//                 <div className='mb-6'>
//                     <div className='flex border-b border-gray-200'>
//                         <button
//                             onClick={() => setActiveTab('student')}
//                             className={`flex-1 py-2 px-4 text-sm font-medium text-center border-b-2 transition-colors duration-200 ${
//                                 activeTab === 'student'
//                                     ? 'border-yellow-500 text-yellow-600'
//                                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                             }`}
//                         >
//                             Student
//                         </button>
//                         <button
//                             onClick={() => setActiveTab('parent')}
//                             className={`flex-1 py-2 px-4 text-sm font-medium text-center border-b-2 transition-colors duration-200 ${
//                                 activeTab === 'parent'
//                                     ? 'border-yellow-500 text-yellow-600'
//                                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                             }`}
//                         >
//                             Parent of Student
//                         </button>
//                     </div>
//                 </div>
                
//                 <div className="flex flex-col space-y-4" onClick={(e) => {
//                     if (!e.target.closest('.relative')) {
//                         setShowGovernorateDropdown(false)
//                     }
//                 }}>
//                     <input
//                         type="text"
//                         placeholder='Full Name *'
//                         className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
//                     />
                    
//                     <input
//                         type="email"
//                         placeholder='Email Address *'
//                         className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
//                     />
                    
//                     <input
//                         type="tel"
//                         placeholder='Phone Number *'
//                         className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
//                     />
                    
//                     {/* Custom Autocomplete Governorate Field */}
//                     <div className="relative">
//                         <input
//                             ref={inputRef}
//                             type="text"
//                             placeholder="Select Governorate *"
//                             value={governorateInput}
//                             onChange={handleGovernorateInputChange}
//                             onFocus={() => {
//                                 setShowGovernorateDropdown(true)
//                                 setHighlightedIndex(-1)
//                             }}
//                             onKeyDown={handleKeyDown}
//                             className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
//                             autoComplete="off"
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
//                     </div>
                    
//                     {/* Conditional Fields Based on Tab */}
//                     {activeTab === 'student' ? (
//                         <select
//                             value={selectedGrade}
//                             onChange={(e) => setSelectedGrade(e.target.value)}
//                             className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 bg-white'
//                         >
//                             <option value="" disabled>Select Grade *</option>
//                             {grades.map((grade) => (
//                                 <option key={grade} value={grade}>{grade}</option>
//                             ))}
//                         </select>
//                     ) : (
//                         <input
//                             type="text"
//                             placeholder='Student Code *'
//                             className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
//                         />
//                     )}
                    
//                     <input
//                         type="password"
//                         placeholder='Password *'
//                         className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
//                     />
                    
//                     <input
//                         type="password"
//                         placeholder='Confirm Password *'
//                         className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
//                     />
                    
//                     <div className='flex items-center justify-center gap-4 pt-2'>
//                         <button
//                             className='bg-yellow-500 w-full hover:bg-yellow-600 p-3 px-8 text-white rounded font-medium transition-colors duration-200 shadow-sm hover:shadow-md'
//                         >
//                             Register as {activeTab === 'student' ? 'Student' : 'Parent'}
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
                    
//                     {/* Terms and Conditions */}
//                     <div className='flex items-center justify-center space-x-3 pt-4 border-t border-gray-100'>
//                         <input
//                             type="checkbox"
//                             id="terms"
//                             className="w-4 h-4 mt-1 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500 flex-shrink-0"
//                             required
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
//                 </div>
//             </div>
//         </div>
//     )
// }



import React, { useState, useRef, useEffect } from 'react'

export default function RegisterPage() {
    const [activeTab, setActiveTab] = useState('student')
    const [selectedGovernorate, setSelectedGovernorate] = useState('')
    const [governorateInput, setGovernorateInput] = useState('')
    const [showGovernorateDropdown, setShowGovernorateDropdown] = useState(false)
    const [selectedGrade, setSelectedGrade] = useState('')
    const [gradeInput, setGradeInput] = useState('')
    const [showGradeDropdown, setShowGradeDropdown] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [highlightedGradeIndex, setHighlightedGradeIndex] = useState(-1)
    
    const dropdownRef = useRef(null)
    const inputRef = useRef(null)
    const gradeDropdownRef = useRef(null)
    const gradeInputRef = useRef(null)
    
    const grades = [
        'Grade 1',
        'Grade 2', 
        'Grade 3',
        'Grade 4',
        'Grade 5',
        'Grade 6',
        'Grade 7',
        'Grade 8',
        'Grade 9',
        'Grade 10',
        'Grade 11',
        'Grade 12'
    ]
    
    const governorates = [
        'Cairo',
        'Giza',
        'Alexandria',
        'Dakahlia',
        'Red Sea',
        'Beheira',
        'Fayoum',
        'Gharbia',
        'Ismailia',
        'Menofia',
        'Minya',
        'Qaliubiya',
        'New Valley',
        'Suez',
        'Aswan',
        'Assiut',
        'Beni Suef',
        'Port Said',
        'Damietta',
        'Sharkia',
        'South Sinai',
        'Kafr El Sheikh',
        'Matrouh',
        'Luxor',
        'Qena',
        'North Sinai',
        'Sohag'
    ]
    
    // Filter governorates based on input
    const filteredGovernorates = governorates.filter(gov =>
        gov.toLowerCase().includes(governorateInput.toLowerCase())
    )

    // Filter grades based on input
    const filteredGrades = grades.filter(grade =>
        grade.toLowerCase().includes(gradeInput.toLowerCase())
    )

    const handleGovernorateSelect = (gov) => {
        setSelectedGovernorate(gov)
        setGovernorateInput(gov)
        setShowGovernorateDropdown(false)
        setHighlightedIndex(-1)
    }

    const handleGovernorateInputChange = (e) => {
        const value = e.target.value
        setGovernorateInput(value)
        setSelectedGovernorate(value)
        setShowGovernorateDropdown(true)
        setHighlightedIndex(-1) // Reset highlight when typing
    }

    const handleGradeSelect = (grade) => {
        setSelectedGrade(grade)
        setGradeInput(grade)
        setShowGradeDropdown(false)
        setHighlightedGradeIndex(-1)
    }

    const handleGradeInputChange = (e) => {
        const value = e.target.value
        setGradeInput(value)
        setSelectedGrade(value)
        setShowGradeDropdown(true)
        setHighlightedGradeIndex(-1) // Reset highlight when typing
    }

    // Keyboard navigation handler for governorate
    const handleGovernorateKeyDown = (e) => {
        if (!showGovernorateDropdown || filteredGovernorates.length === 0) return

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setHighlightedIndex(prev => {
                    const next = prev < filteredGovernorates.length - 1 ? prev + 1 : 0
                    return next
                })
                break
            case 'ArrowUp':
                e.preventDefault()
                setHighlightedIndex(prev => {
                    const next = prev > 0 ? prev - 1 : filteredGovernorates.length - 1
                    return next
                })
                break
            case 'Enter':
                e.preventDefault()
                if (highlightedIndex >= 0 && highlightedIndex < filteredGovernorates.length) {
                    handleGovernorateSelect(filteredGovernorates[highlightedIndex])
                }
                break
            case 'Escape':
                e.preventDefault()
                setShowGovernorateDropdown(false)
                setHighlightedIndex(-1)
                inputRef.current?.blur()
                break
            case 'Tab':
                setShowGovernorateDropdown(false)
                setHighlightedIndex(-1)
                break
        }
    }

    // Keyboard navigation handler for grade
    const handleGradeKeyDown = (e) => {
        if (!showGradeDropdown || filteredGrades.length === 0) return

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setHighlightedGradeIndex(prev => {
                    const next = prev < filteredGrades.length - 1 ? prev + 1 : 0
                    return next
                })
                break
            case 'ArrowUp':
                e.preventDefault()
                setHighlightedGradeIndex(prev => {
                    const next = prev > 0 ? prev - 1 : filteredGrades.length - 1
                    return next
                })
                break
            case 'Enter':
                e.preventDefault()
                if (highlightedGradeIndex >= 0 && highlightedGradeIndex < filteredGrades.length) {
                    handleGradeSelect(filteredGrades[highlightedGradeIndex])
                }
                break
            case 'Escape':
                e.preventDefault()
                setShowGradeDropdown(false)
                setHighlightedGradeIndex(-1)
                gradeInputRef.current?.blur()
                break
            case 'Tab':
                setShowGradeDropdown(false)
                setHighlightedGradeIndex(-1)
                break
        }
    }

    // Scroll highlighted item into view for governorate
    useEffect(() => {
        if (highlightedIndex >= 0 && dropdownRef.current) {
            const highlightedElement = dropdownRef.current.children[highlightedIndex]
            if (highlightedElement) {
                highlightedElement.scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth'
                })
            }
        }
    }, [highlightedIndex])

    // Scroll highlighted item into view for grade
    useEffect(() => {
        if (highlightedGradeIndex >= 0 && gradeDropdownRef.current) {
            const highlightedElement = gradeDropdownRef.current.children[highlightedGradeIndex]
            if (highlightedElement) {
                highlightedElement.scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth'
                })
            }
        }
    }, [highlightedGradeIndex])

    return (
        <div className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
            <div className='border border-gray-300 px-4 sm:px-6 lg:px-8 rounded-lg py-6 sm:py-8 bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-sm'>
                <h2 className='text-xl sm:text-2xl mb-4 sm:mb-6 text-center sm:text-left font-medium'>Register Form</h2>
                
                {/* Tabs */}
                <div className='mb-6'>
                    <div className='flex border-b border-gray-200'>
                        <button
                            onClick={() => setActiveTab('student')}
                            className={`flex-1 py-2 px-4 text-sm font-medium text-center border-b-2 transition-colors duration-200 ${
                                activeTab === 'student'
                                    ? 'border-yellow-500 text-yellow-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Student
                        </button>
                        <button
                            onClick={() => setActiveTab('parent')}
                            className={`flex-1 py-2 px-4 text-sm font-medium text-center border-b-2 transition-colors duration-200 ${
                                activeTab === 'parent'
                                    ? 'border-yellow-500 text-yellow-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Parent of Student
                        </button>
                    </div>
                </div>
                
                <div className="flex flex-col space-y-4" onClick={(e) => {
                    if (!e.target.closest('.relative')) {
                        setShowGovernorateDropdown(false)
                        setShowGradeDropdown(false)
                    }
                }}>
                    <input
                        type="text"
                        placeholder='Full Name *'
                        className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
                    />
                    
                    <input
                        type="email"
                        placeholder='Email Address *'
                        className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
                    />
                    
                    <input
                        type="tel"
                        placeholder='Phone Number *'
                        className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
                    />
                    
                    {/* Custom Autocomplete Governorate Field */}
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Select Governorate *"
                            value={governorateInput}
                            onChange={handleGovernorateInputChange}
                            onFocus={() => {
                                setShowGovernorateDropdown(true)
                                setHighlightedIndex(-1)
                            }}
                            onKeyDown={handleGovernorateKeyDown}
                            className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
                            autoComplete="off"
                        />
                        
                        {showGovernorateDropdown && filteredGovernorates.length > 0 && (
                            <div 
                                ref={dropdownRef}
                                className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto"
                            >
                                {filteredGovernorates.map((gov, index) => (
                                    <div
                                        key={gov}
                                        onClick={() => handleGovernorateSelect(gov)}
                                        onMouseEnter={() => setHighlightedIndex(index)}
                                        className={`px-3 py-2 cursor-pointer text-gray-700 transition-colors duration-150 ${
                                            index === highlightedIndex
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'hover:bg-yellow-50 hover:text-yellow-600'
                                        }`}
                                    >
                                        {gov}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Conditional Fields Based on Tab */}
                    {activeTab === 'student' ? (
                        <div className="relative">
                            <input
                                ref={gradeInputRef}
                                type="text"
                                placeholder="Select Grade *"
                                value={gradeInput}
                                onChange={handleGradeInputChange}
                                onFocus={() => {
                                    setShowGradeDropdown(true)
                                    setHighlightedGradeIndex(-1)
                                }}
                                onKeyDown={handleGradeKeyDown}
                                className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
                                autoComplete="off"
                            />
                            
                            {showGradeDropdown && filteredGrades.length > 0 && (
                                <div 
                                    ref={gradeDropdownRef}
                                    className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto"
                                >
                                    {filteredGrades.map((grade, index) => (
                                        <div
                                            key={grade}
                                            onClick={() => handleGradeSelect(grade)}
                                            onMouseEnter={() => setHighlightedGradeIndex(index)}
                                            className={`px-3 py-2 cursor-pointer text-gray-700 transition-colors duration-150 ${
                                                index === highlightedGradeIndex
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'hover:bg-yellow-50 hover:text-yellow-600'
                                            }`}
                                        >
                                            {grade}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <input
                            type="text"
                            placeholder='Student Code *'
                            className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
                        />
                    )}
                    
                    <input
                        type="password"
                        placeholder='Password *'
                        className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
                    />
                    
                    <input
                        type="password"
                        placeholder='Confirm Password *'
                        className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
                    />
                    
                    <div className='flex items-center justify-center gap-4 pt-2'>
                        <button
                            className='bg-yellow-500 w-full hover:bg-yellow-600 p-3 px-8 text-white rounded font-medium transition-colors duration-200 shadow-sm hover:shadow-md'
                        >
                            Register as {activeTab === 'student' ? 'Student' : 'Parent'}
                        </button>
                    </div>
                    
                    <div className='text-center'>
                        <p className='text-sm text-gray-600'>
                            Already have an account?{' '}
                            <a href="#login" className='text-yellow-500 hover:text-yellow-600 font-medium transition-colors duration-200'>
                                Sign In
                            </a>
                        </p>
                    </div>
                    
                    {/* Terms and Conditions */}
                    <div className='flex items-center justify-center space-x-3 pt-4 border-t border-gray-100'>
                        <input
                            type="checkbox"
                            id="terms"
                            className="w-4 h-4 mt-1 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500 flex-shrink-0"
                            required
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
                </div>
            </div>
        </div>
    )
}