import React, { useState, useEffect } from 'react'

// Mock data - in real app, this would come from your backend/database
const mockUserData = {
    student: {
        id: "STU001",
        name: "Ahmed Mohamed",
        email: "ahmed.mohamed@email.com",
        phone: "01234567890",
        governorate: "Cairo",
        grade: "Grade 10",
        studentCode: "STU001",
        joinDate: "2024-01-15",
        profileImage: null
    },
    parent: {
        id: "PAR001", 
        name: "Fatima Hassan",
        email: "fatima.hassan@email.com",
        phone: "01987654321",
        governorate: "Giza",
        studentCode: "STU001",
        childName: "Ahmed Mohamed",
        joinDate: "2024-01-15",
        profileImage: null
    }
}

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
    const [activeTab, setActiveTab] = useState('profile')
    const [isEditing, setIsEditing] = useState(false)
    const [userData, setUserData] = useState(mockUserData[userType])
    const [editedData, setEditedData] = useState(mockUserData[userType])

    const handleInputChange = (field, value) => {
        setEditedData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSaveProfile = () => {
        setUserData(editedData)
        setIsEditing(false)
        // Here you would typically make an API call to update the profile
        alert('Profile updated successfully!')
    }

    const handleCancelEdit = () => {
        setEditedData(userData)
        setIsEditing(false)
    }

    const getGradeColor = (grade) => {
        if (grade.startsWith('A')) return 'text-green-600 bg-green-50'
        if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50'
        if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50'
        return 'text-red-600 bg-red-50'
    }

    return (
        <div className='min-h-[calc(100vh-230px)] px-4 py-8'>
            <div className='max-w-6xl mx-auto'>
                {/* Header */}
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6'>
                    <div className='flex flex-col sm:flex-row items-center gap-6'>
                        <div className='w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center'>
                            <svg className='w-10 h-10 text-yellow-500' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
                            </svg>
                        </div>
                        <div className='text-center sm:text-left flex-1'>
                            <h1 className='text-2xl font-semibold text-gray-900'>{userData.name}</h1>
                            <p className='text-gray-600'>{userType === 'student' ? `Student - ${userData.grade}` : `Parent of ${userData.childName}`}</p>
                            <p className='text-sm text-gray-500'>Member since {new Date(userData.joinDate).toLocaleDateString()}</p>
                        </div>
                        <div className='flex gap-2'>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200'
                            >
                                {isEditing ? 'Cancel' : 'Edit Profile'}
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
                                Profile Information
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
                                    Academic Reports
                                </button>
                            )}
                        </nav>
                    </div>

                    <div className='p-6'>
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className='space-y-6'>
                                <h2 className='text-xl font-semibold text-gray-900'>Personal Information</h2>
                                
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type='text'
                                                value={editedData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className='w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                            />
                                        ) : (
                                            <p className='p-3 bg-gray-50 rounded text-gray-900'>{userData.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                                        {isEditing ? (
                                            <input
                                                type='email'
                                                value={editedData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className='w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                            />
                                        ) : (
                                            <p className='p-3 bg-gray-50 rounded text-gray-900'>{userData.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
                                        {isEditing ? (
                                            <input
                                                type='tel'
                                                value={editedData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className='w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                            />
                                        ) : (
                                            <p className='p-3 bg-gray-50 rounded text-gray-900'>{userData.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>Governorate</label>
                                        {isEditing ? (
                                            <input
                                                type='text'
                                                value={editedData.governorate}
                                                onChange={(e) => handleInputChange('governorate', e.target.value)}
                                                className='w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                            />
                                        ) : (
                                            <p className='p-3 bg-gray-50 rounded text-gray-900'>{userData.governorate}</p>
                                        )}
                                    </div>

                                    {userType === 'student' && (
                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-2'>Grade</label>
                                            <p className='p-3 bg-gray-50 rounded text-gray-900'>{userData.grade}</p>
                                        </div>
                                    )}

                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            {userType === 'student' ? 'Student Code' : 'Child\'s Student Code'}
                                        </label>
                                        <p className='p-3 bg-gray-50 rounded text-gray-900'>{userData.studentCode}</p>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className='flex gap-4 pt-6 border-t border-gray-200'>
                                        <button
                                            onClick={handleSaveProfile}
                                            className='px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200'
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className='px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors duration-200'
                                        >
                                            Cancel
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
                                    <h2 className='text-xl font-semibold text-gray-900 mb-4'>Academic Progress</h2>
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
                                                        <span>Score:</span>
                                                        <span>{subject.percentage}%</span>
                                                    </div>
                                                    <div className='w-full bg-gray-200 rounded-full h-2'>
                                                        <div 
                                                            className='bg-yellow-500 h-2 rounded-full transition-all duration-300'
                                                            style={{ width: `${subject.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <p className='text-xs text-gray-500'>Last test: {new Date(subject.lastTest).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Attendance */}
                                <div>
                                    <h2 className='text-xl font-semibold text-gray-900 mb-4'>Attendance Overview</h2>
                                    <div className='bg-white border border-gray-200 rounded-lg p-6'>
                                        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                                            <div className='text-center'>
                                                <div className='text-2xl font-bold text-gray-900'>{mockReports.attendanceData.totalDays}</div>
                                                <div className='text-sm text-gray-600'>Total Days</div>
                                            </div>
                                            <div className='text-center'>
                                                <div className='text-2xl font-bold text-green-600'>{mockReports.attendanceData.presentDays}</div>
                                                <div className='text-sm text-gray-600'>Present</div>
                                            </div>
                                            <div className='text-center'>
                                                <div className='text-2xl font-bold text-red-600'>{mockReports.attendanceData.absentDays}</div>
                                                <div className='text-sm text-gray-600'>Absent</div>
                                            </div>
                                            <div className='text-center'>
                                                <div className='text-2xl font-bold text-yellow-600'>{mockReports.attendanceData.percentage}%</div>
                                                <div className='text-sm text-gray-600'>Attendance Rate</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activities */}
                                <div>
                                    <h2 className='text-xl font-semibold text-gray-900 mb-4'>Recent Activities</h2>
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