import React, { useState } from 'react';
import { Search, Users, BookOpen, Monitor } from 'lucide-react';

export default function LearningPlatformHero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Handle search logic here
  };

  return (
    <div className="min-h-clac(100vh-164px) py-6 bg-gray-100 flex items-center justify-center ">
      <div className="w-full max-w-6xl bg-[#222222] rounded-lg shadow-2xl overflow-hidden">
        <div className="px-8 py-16 md:py-8 md:px-16 ">
          {/* Main Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-3">
              Learn from the best. anywhere.
            </h1>
            <p className="text-md text-gray-300">
              Creative and business skills you can use today.
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <div className="flex max-w-4xl mx-auto">
              <input
                type="text"
                placeholder="What do you want to learn today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-4 text-lg text-gray-700 bg-white border-0 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50 rounded-l-md"
              />
              <button
                onClick={handleSearch}
                className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold rounded-r-md transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex gap-2 items-center space-y-3 justify-center">
              <Users className="w-4 h-4 mt-2 text-yellow-400" />
              <p className="text-gray-300 text-sm font-semibold">
                More than 320 Instructors
              </p>
            </div>
            
            <div className="flex gap-2 items-center space-y-3 justify-center">
              <BookOpen className="w-4 h-4 mt-2 text-yellow-400" />
              <p className="text-gray-300 text-sm font-semibold">
                25000+ online courses
              </p>
            </div>
            
            <div className="flex gap-2 items-center space-y-3 justify-center">
              <Monitor className="w-4 h-4 mt-2 text-yellow-400" />
              <p className="text-gray-300 text-sm font-semibold">
                Learn anything online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}