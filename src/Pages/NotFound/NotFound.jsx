import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        {/* Error code with animation */}
        <div className="text-9xl font-bold text-gray-800 mb-4 animate-bounce">
          404
        </div>
        
        {/* Error message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Illustration */}
        <div className="mb-8">
          <svg
            className="w-32 h-32 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-200"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Return Home
          </button>
        </div>
        
        {/* Additional help */}
        <div className="mt-8 text-sm text-gray-500">
          <p>If you believe this is an error, please <a href="/contact" className="text-yellow-500 hover:underline">contact support</a>.</p>
        </div>
      </div>
    </div>
  )
}