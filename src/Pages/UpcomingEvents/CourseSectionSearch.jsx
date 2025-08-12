// import React, { useState } from 'react';
// import { ChevronDown, Search, Briefcase, Languages, Code, Film, Camera, Palette, BriefcaseBusiness, SquarePen, Video } from 'lucide-react';

// const CourseSearch = () => {
//   const [selectedCategory, setSelectedCategory] = useState('Category');
//   const [selectedCost, setSelectedCost] = useState('Course Cost');
//   const [searchText, setSearchText] = useState('Search Text');
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [showCostDropdown, setShowCostDropdown] = useState(false);
//   const [showSearchDropdown, setShowSearchDropdown] = useState(false);

//   const categories = [
//     'All Categories',
//     'Business',
//     'Language',
//     'Programming',
//     'Film & Video',
//     'Photography',
//     'Web Design',
//     'Marketing',
//     'Music'
//   ];

//   const costs = [
//     'All Prices',
//     'Free',
//     'Under $50',
//     '$50 - $100',
//     '$100 - $200',
//     'Over $200'
//   ];

//   const searchSuggestions = [
//     'JavaScript',
//     'Python',
//     'React',
//     'Web Development',
//     'Digital Marketing',
//     'Photography Basics',
//     'Business Strategy'
//   ];

//   const courseCategories = [
//     {
//       icon: BriefcaseBusiness, 
//       title: 'BUSINESS',
//       description: 'Business strategy and management'
//     },
//     {
//       icon: SquarePen ,
//       title: 'LANGUAGE',
//       description: 'Learn new languages'
//     },
//     {
//       icon: Code,
//       title: 'PROGRAMMING',
//       description: 'Coding and development'
//     },
//     {
//       icon: Video,
//       title: 'FILM & VIDEO',
//       description: 'Video production and editing'
//     },
//     {
//       icon: Camera,
//       title: 'PHOTOGRAPHY',
//       description: 'Photography techniques'
//     },
//     {
//       icon: Palette,
//       title: 'WEB DESIGN',
//       description: 'Design and user experience'
//     }
//   ];

//   const Dropdown = ({ 
//     isOpen, 
//     onToggle, 
//     selectedValue, 
//     options, 
//     onSelect, 
//     placeholder 
//   }) => (
//     <div className="relative flex-1">
//       <button
//         onClick={onToggle}
//         className="w-full px-6 py-3 bg-white border border-gray-200 rounded-lg text-left flex items-center justify-between hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
//       >
//         <span className={selectedValue === placeholder ? 'text-gray-400' : 'text-gray-700'}>
//           {selectedValue}
//         </span>
//         <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//       </button>
      
//       {isOpen && (
//         <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
//           {options.map((option, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 onSelect(option);
//                 onToggle();
//               }}
//               className="w-full px-6 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="bg-gray-100 py-16">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Search Section */}
//         <div className="bg-white rounded-2xl p-8 shadow-sm mb-16">
//           <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Search For Course</h2>
          
//           {/* Search Form */}
//           <div className="flex gap-4 items-end">
//             <Dropdown
//               isOpen={showCategoryDropdown}
//               onToggle={() => setShowCategoryDropdown(!showCategoryDropdown)}
//               selectedValue={selectedCategory}
//               options={categories}
//               onSelect={setSelectedCategory}
//               placeholder="Category"
//             />
            
//             <Dropdown
//               isOpen={showCostDropdown}
//               onToggle={() => setShowCostDropdown(!showCostDropdown)}
//               selectedValue={selectedCost}
//               options={costs}
//               onSelect={setSelectedCost}
//               placeholder="Course Cost"
//             />
            
//             <Dropdown
//               isOpen={showSearchDropdown}
//               onToggle={() => setShowSearchDropdown(!showSearchDropdown)}
//               selectedValue={searchText}
//               options={searchSuggestions}
//               onSelect={setSearchText}
//               placeholder="Search Text"
//             />
            
//             <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center space-x-2">
//               <Search className="w-5 h-5" />
//               <span>SEARCH</span>
//             </button>
//           </div>
//         </div>

//         {/* Course Categories */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
//           {courseCategories.map((category, index) => {
//             const IconComponent = category.icon;
//             return (
//               <div 
//                 key={index} 
//                 className="group cursor-pointer text-center bg-gray-300 p-2 rounded-md flex flex-col items-center hover:bg-opacity-20 transition-all duration-300"
//               >
//                 <div className="w-20 h-20 mx-auto mb-4  mt-6  bg-opacity-20 rounded-lg  flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
//                   <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
//                 </div>
//                 <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-yellow-300 transition-colors duration-200">
//                   {category.title}
//                 </h3>
//                 <p className="text-gray-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                   {category.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseSearch;




import React, { useState } from 'react';
import {
  ChevronDown,
  Search,
  BriefcaseBusiness,
  SquarePen,
  Code,
  Video,
  Camera,
  Palette
} from 'lucide-react';

const CourseSearch = () => {
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [selectedCost, setSelectedCost] = useState('Course Cost');
  const [searchText, setSearchText] = useState('Search Text');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCostDropdown, setShowCostDropdown] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const categories = [
    'All Categories',
    'Business',
    'Language',
    'Programming',
    'Film & Video',
    'Photography',
    'Web Design',
    'Marketing',
    'Music'
  ];

  const costs = [
    'All Prices',
    'Free',
    'Under $50',
    '$50 - $100',
    '$100 - $200',
    'Over $200'
  ];

  const searchSuggestions = [
    'JavaScript',
    'Python',
    'React',
    'Web Development',
    'Digital Marketing',
    'Photography Basics',
    'Business Strategy'
  ];

  const courseCategories = [
    {
      icon: BriefcaseBusiness,
      title: 'BUSINESS',
      description: 'Business strategy and management'
    },
    {
      icon: SquarePen,
      title: 'LANGUAGE',
      description: 'Learn new languages'
    },
    {
      icon: Code,
      title: 'PROGRAMMING',
      description: 'Coding and development'
    },
    {
      icon: Video,
      title: 'FILM & VIDEO',
      description: 'Video production and editing'
    },
    {
      icon: Camera,
      title: 'PHOTOGRAPHY',
      description: 'Photography techniques'
    },
    {
      icon: Palette,
      title: 'WEB DESIGN',
      description: 'Design and user experience'
    }
  ];

  const Dropdown = ({
    isOpen,
    onToggle,
    selectedValue,
    options,
    onSelect,
    placeholder
  }) => (
    <div className="relative w-full">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-left flex items-center justify-between hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
      >
        <span
          className={
            selectedValue === placeholder ? 'text-gray-400' : 'text-gray-700'
          }
        >
          {selectedValue}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(option);
                onToggle();
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Search Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            Search For Course
          </h2>

          {/* Search Form */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Dropdown
              isOpen={showCategoryDropdown}
              onToggle={() => setShowCategoryDropdown(!showCategoryDropdown)}
              selectedValue={selectedCategory}
              options={categories}
              onSelect={setSelectedCategory}
              placeholder="Category"
            />

            <Dropdown
              isOpen={showCostDropdown}
              onToggle={() => setShowCostDropdown(!showCostDropdown)}
              selectedValue={selectedCost}
              options={costs}
              onSelect={setSelectedCost}
              placeholder="Course Cost"
            />

            <Dropdown
              isOpen={showSearchDropdown}
              onToggle={() => setShowSearchDropdown(!showSearchDropdown)}
              selectedValue={searchText}
              options={searchSuggestions}
              onSelect={setSearchText}
              placeholder="Search Text"
            />

            <button className="w-full sm:w-auto px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <Search className="w-5 h-5" />
              <span>SEARCH</span>
            </button>
          </div>
        </div>

        {/* Course Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {courseCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="group cursor-pointer text-center bg-gray-300 p-4 rounded-md flex flex-col items-center hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 mt-2 bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                  <IconComponent
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 group-hover:text-yellow-300 transition-colors duration-200">
                  {category.title}
                </h3>
                <p className="text-gray-300 text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseSearch;
