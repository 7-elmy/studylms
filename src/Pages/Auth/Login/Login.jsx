


import React from 'react'

export default function LoginPage() {
  return (
    <div className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
        <div className='border border-gray-300 px-4 sm:px-6 lg:px-8 rounded-lg py-6 sm:py-8 bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-sm'>
            <h2 className='text-xl sm:text-2xl mb-4 sm:mb-6 text-center sm:text-left font-medium'>Login form</h2>

            <div className="flex flex-col space-y-4">
                <input 
                    type="text" 
                    placeholder='Username or email address *' 
                    className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent' 
                />
                
                <input 
                    type="password" 
                    placeholder='Password *' 
                    className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent' 
                />

                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 pt-2'>
                    <button 
                        className='bg-yellow-500 hover:bg-yellow-600 p-2 px-6 text-white rounded font-medium transition-colors order-3 sm:order-1'
                    > 
                        Login 
                    </button>

                    <div className='flex items-center order-1 sm:order-2'>
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                        />
                        <label htmlFor="remember" className='text-yellow-500 ml-2 text-xs sm:text-sm cursor-pointer'>
                            REMEMBER ME
                        </label>
                    </div>

                    <p className='text-yellow-500 text-xs sm:text-sm hover:underline cursor-pointer order-2 sm:order-3'>
                        Lost your password?
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}