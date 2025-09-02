

// import { Search, Users, MessageSquare, Star, ChevronDown } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import DynamicBreadcrumb from "../Components/Ui/DynamicBreadcrumb";
// import SubscriptionModal from "../Components/Ui/SubscriptionModal";
// import CourseCard from "../Components/Ui/CourseCard";
// import { useDispatch, useSelector } from "react-redux";
// import { apiRequest } from "../Redux/Apis/apiRequest";
// import { useTranslation } from "react-i18next";
// import FallingIconsBackground from "../Components/Ui/FallingIconsBackground";
// // import FallingIconsBackground from "../Components/Ui/FallingIconsBackground";

// export default function CourseLayout({
//   courses, 
//   renderStars, 
//   MainTitle, 
//   Breadcrumb1, 
//   Breadcrumb2, 
//   selectedCategory, 
//   setSelectedCategory, 
//   searchTerm, 
//   setSearchTerm, 
//   type = "course"
// }) {
//   let dispatch = useDispatch();
//   let { categories } = useSelector((state) => state.api);
//   const [t, i18n] = useTranslation();
//   // Local state for selected category ID and pagination
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [currentCategoryPage, setCurrentCategoryPage] = useState(1);
//   const [allCategories, setAllCategories] = useState([]);

//   //console.log({ categories: categories?.data });

//   // Load categories with pagination
//   const loadCategories = (page = 1) => {
//     dispatch(apiRequest({
//       entity: "categories",
//       url: `api/categories?page=${page}`,
//       method: "GET",
//       headers: {
//              "Accept-Language": localStorage.getItem('language') || 'en',
//               "Content-Type": "application/json",
//               "Authorization": `${sessionStorage.getItem("token")|| localStorage.getItem("token")}`,
//         }

//     }));
//   };

//   useEffect(() => {
//     loadCategories(currentCategoryPage);
//   }, [dispatch, currentCategoryPage ,localStorage.getItem('language') ]);

//   // Update all categories when new data arrives
//   useEffect(() => {
//     if (categories?.data?.data) {
//       if (currentCategoryPage === 1) {
//         // First page, replace all categories
//         setAllCategories(categories.data.data);
//       } else {
//         // Additional page, append to existing categories
//         setAllCategories(prev => [...prev, ...categories.data.data]);
//       }
//     }
//   }, [categories?.data, currentCategoryPage]);

//   // Get categories data and meta information
//   const categoriesData = allCategories;
//   const categoriesMeta = categories?.data?.meta;

//   // Filter courses based on selected category ID
//   const filteredCourses = selectedCategoryId 
//     ? courses?.data?.filter(course => course.category_id === selectedCategoryId)
//     : courses?.data;

//   // Further filter by search term
//   const searchFilteredCourses = searchTerm
//     ? filteredCourses.filter(course => 
//         course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         course.description?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : filteredCourses;

//   // Load more categories if needed
//   const loadMoreCategories = () => {
//     if (categoriesMeta && currentCategoryPage < categoriesMeta.last_page) {
//       setCurrentCategoryPage(prev => prev + 1);
//     }
//   };

//   const handleCategoryClick = (categoryId) => {
//     setSelectedCategoryId(categoryId);
//     // Also update the parent component's selectedCategory if needed
//     const categoryName = categoryId 
//       ? categoriesData.find(cat => cat.id === categoryId)?.name || "All Courses"
//       : "All Courses";
//     setSelectedCategory(categoryName);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* <DynamicBreadcrumb 
//         MainTitle={MainTitle}
//         BreadCrumbs={[
//           { label: `${Breadcrumb1}`, href: `/${Breadcrumb1}` },
//           { label: `${Breadcrumb2}` },
//         ]} 
//       /> */}
//       <DynamicBreadcrumb 
//   MainTitle={t('pageTitles.courses')}
//   BreadCrumbs={[
//     {label: t('breadcrumbs.home'), href: "/"},
//     {label: t('breadcrumbs.courses')}
//   ]}
// />

//   {/* <FallingIconsBackground zIndex={0} opacity={0.28} /> */}

//    <FallingIconsBackground 
//         opacity={0.2}
//         count={35}
//         zIndex={0}
//       />
//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Main Content Area */}
//           <div className="w-full">
//             {/* Search Bar */}
//             <div className="relative my-4">
//               <input
//                 type="text"
//                 placeholder={i18n.language=="ar"?   "  ابحث عن الدروس" : "Search for lessons..."}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
//               />
//               <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             </div>

//             {/* Category Tabs */}
//             <div className="mb-8">
//               <div className="border-b border-gray-200">
//               <div className="flex items-center justify-between mb-4">
//   <h3 className="text-lg font-medium text-gray-900">
//     {t('categories.title')}
//   </h3>
//   {categoriesMeta && (
//     <span className="text-sm text-gray-500">
//       {t('categories.showingResults', { 
//         showing: categoriesData.length, 
//         total: categoriesMeta.total 
//       })}
//     </span>
//   )}
// </div>
                
//                 <nav className="-mb-px flex flex-wrap gap-2">
//                   {/* All Courses Tab */}
//                   <button
//                     onClick={() => handleCategoryClick(null)}
//                     className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
//                       selectedCategoryId === null
//                         ? 'border-b-2 border-yellow-500 text-yellow-600 bg-yellow-50'
//                         : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
//                     }`}
//                   >
//                     {/* All Courses */}
//                     {t('categories.allCategories')}
//                     <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
//                       {courses?.data?.length}
//                     </span>
//                   </button>

//                   {/* Category Tabs */}
//                   {categoriesData.map((category,index) => {
//                     const categoryCoursesCount = courses?.data?.filter(course => 
//                       course.category_id === category.id
//                     ).length;

//                     return (
//                       <button
//                         key={category.id + category.name +index}
//                         onClick={() => handleCategoryClick(category.id)}
//                         className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
//                           selectedCategoryId === category.id
//                             ? 'border-b-2 border-yellow-500 text-yellow-600 bg-yellow-50'
//                             : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
//                         }`}
//                       >
//                         {category.name}
//                         <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
//                           {categoryCoursesCount}
//                         </span>
//                       </button>
//                     );
//                   })}

//                   {/* Load More Categories Button */}
//                   {categoriesMeta && currentCategoryPage < categoriesMeta.last_page && (
//                     <button
//                       onClick={loadMoreCategories}
//                       className="px-6 py-3 text-sm font-medium text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-t-lg transition-colors duration-200 border border-yellow-200 border-dashed"
//                     >
//                       {/* Load More Categories */}
//                       {t('categories.showingResults')}
//                       <ChevronDown className="inline-block ml-2 w-4 h-4"/>
//                       <span className="ml-2 text-xs">
//                         ({categoriesMeta.total - categoriesData.length} more)
//                       </span>
//                     </button>
//                   )}
//                 </nav>
//               </div>
//             </div>

//             {/* Results Header */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//               <div className="text-gray-600">
//                 {/* <p>
//                   Showing {searchFilteredCourses.length} of {filteredCourses.length} courses
//                   {selectedCategoryId && (
//                     <span className="ml-2 text-sm">
//                       in "{categoriesData.find(cat => cat.id === selectedCategoryId)?.name}"
//                     </span>
//                   )}
//                   {searchTerm && (
//                     <span className="ml-2 text-sm">
//                       for "{searchTerm}"
//                     </span>
//                   )}
//                 </p> */}

//                 <p>
//   {t('courses.showingResults', {
//     showing: searchFilteredCourses?.length,
//     total: filteredCourses?.length
//   })}
//   {selectedCategoryId && (
//     <span className="ml-2 text-sm">
//       {t('courses.inCategory', {
//         category: categoriesData.find(cat => cat.id === selectedCategoryId)?.name
//       })}
//     </span>
//   )}
//   {searchTerm && (
//     <span className="ml-2 text-sm">
//       {t('courses.forSearchTerm', {
//         term: searchTerm
//       })}
//     </span>
//   )}
// </p>
//               </div>
//             </div>

//             {/* Courses Grid */}
//             {searchFilteredCourses?.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {searchFilteredCourses.map((course) => (
//                   <div 
//                     key={course.id} 
//                     className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
//                   >
//                     <CourseCard course={course} renderStars={renderStars} />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               // No courses found message
//               <div className="text-center py-12">
//                 <div className="text-gray-400 mb-4">
//                   <Search className="w-12 h-12 mx-auto mb-4" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   No courses found
//                 </h3>
//                 <p className="text-gray-500 mb-4">
//                   {searchTerm 
//                     ? `No courses match your search "${searchTerm}"`
//                     : selectedCategoryId 
//                       ? `No courses available in "${categoriesData.find(cat => cat.id === selectedCategoryId)?.name}" category`
//                       : "No courses available"
//                   }
//                 </p>
//                 {(searchTerm || selectedCategoryId) && (
//                   <button
//                     onClick={() => {
//                       setSearchTerm("");
//                       handleCategoryClick(null);
//                     }}
//                     className="text-yellow-600 hover:text-yellow-700 font-medium"
//                   >
//                     Clear filters
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* Pagination - Only show if there are courses */}
//             {searchFilteredCourses?.length > 0 && (
//               <div className="flex justify-center mt-12">
//                 <div className="flex items-center space-x-2">
//                   <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold">
//                     1
//                   </button>
//                   <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
//                     2
//                   </button>
//                   <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
//                     ›
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { Search, Users, MessageSquare, Star, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import DynamicBreadcrumb from "../Components/Ui/DynamicBreadcrumb";
// import SubscriptionModal from "../Components/Ui/SubscriptionModal";
// import CourseCard from "../Components/Ui/CourseCard";
// import { useDispatch, useSelector } from "react-redux";
// import { apiRequest } from "../Redux/Apis/apiRequest";
// import { useTranslation } from "react-i18next";
// import FallingIconsBackground from "../Components/Ui/FallingIconsBackground";

// export default function CourseLayout({
//   courses = [], 
//   renderStars, 
//   MainTitle, 
//   Breadcrumb1, 
//   Breadcrumb2, 
//   selectedCategory, 
//   setSelectedCategory, 
//   searchTerm, 
//   setSearchTerm, 
//   type = "course"
// }) {
//   let dispatch = useDispatch();
//   let { categories } = useSelector((state) => state.api);
//   const [t, i18n] = useTranslation();
  
//   // Local state for selected category ID and pagination
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [currentCategoryPage, setCurrentCategoryPage] = useState(1);
//   const [allCategories, setAllCategories] = useState([]);
  
//   // Pagination for courses - Fixed: Make coursesPerPage stateful
//   const [currentCoursePage, setCurrentCoursePage] = useState(1);
//   const [coursesPerPage, setCoursesPerPage] = useState(6); // Fixed: Make this stateful
  
//   // Debounced search to improve performance
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  
//   // Debounce search term
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm);
//       setCurrentCoursePage(1); // Reset to first page when searching
//     }, 300);
    
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // Load categories with pagination
//   const loadCategories = (page = 1) => {
//     dispatch(apiRequest({
//       entity: "categories",
//       url: `api/categories?page=${page}`,
//       method: "GET",
//       headers: {
//         "Accept-Language": localStorage.getItem('language') || 'en',
//         "Content-Type": "application/json",
//         "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
//       }
//     }));
//   };

//   useEffect(() => {
//     loadCategories(currentCategoryPage);
//   }, [dispatch, currentCategoryPage, localStorage.getItem('language')]);

//   // Update all categories when new data arrives
//   useEffect(() => {
//     if (categories?.data?.data) {
//       if (currentCategoryPage === 1) {
//         // First page, replace all categories
//         setAllCategories(categories.data.data);
//       } else {
//         // Additional page, append to existing categories
//         setAllCategories(prev => [...prev, ...categories.data.data]);
//       }
//     }
//   }, [categories?.data, currentCategoryPage]);

//   // Get categories data and meta information
//   const categoriesData = allCategories;
//   const categoriesMeta = categories?.data?.meta;

//   // Debug: Log the courses data structure
//   console.log('Original courses prop:', courses);
//   console.log('Type of courses:', typeof courses);
//   console.log('Is courses an array?', Array.isArray(courses));

//   // Fixed: Handle different possible data structures for courses
//   let coursesArray = [];
//   if (Array.isArray(courses)) {
//     coursesArray = courses;
//   } else if (courses?.data && Array.isArray(courses.data)) {
//     coursesArray = courses.data;
//   } else if (courses?.data?.data && Array.isArray(courses.data.data)) {
//     coursesArray = courses.data.data;
//   }

//   console.log('Processed coursesArray:', coursesArray);

//   // Filter courses based on selected category ID
//   const filteredCourses = selectedCategoryId 
//     ? coursesArray.filter(course => {
//         // Handle both string and number category IDs
//         return String(course.category_id) === String(selectedCategoryId);
//       })
//     : coursesArray;

//   console.log('Filtered courses:', filteredCourses);

//   // Further filter by search term (debounced)
//   const searchFilteredCourses = debouncedSearchTerm
//     ? filteredCourses.filter(course => {
//         const searchLower = debouncedSearchTerm.toLowerCase();
//         return (
//           course.name?.toLowerCase().includes(searchLower) ||
//           course.description?.toLowerCase().includes(searchLower) ||
//           course.teacher?.toLowerCase().includes(searchLower) ||
//           course.category?.toLowerCase().includes(searchLower)
//         );
//       })
//     : filteredCourses;

//   console.log('Search filtered courses:', searchFilteredCourses);

//   // Fixed: Pagination calculations
//   const totalCourses = searchFilteredCourses?.length || 0; // Fixed: Remove .data
//   const totalPages = Math.ceil(totalCourses / coursesPerPage);
//   const startIndex = (currentCoursePage - 1) * coursesPerPage;
//   const endIndex = startIndex + coursesPerPage;
  
//   const paginatedCourses = searchFilteredCourses?.slice(startIndex, endIndex); // Fixed: Remove .data

//   console.log('Paginated courses:', paginatedCourses);
//   console.log('Total courses:', totalCourses);
//   console.log('Total pages:', totalPages);

//   // Load more categories if needed
//   const loadMoreCategories = () => {
//     if (categoriesMeta && currentCategoryPage < categoriesMeta.last_page) {
//       setCurrentCategoryPage(prev => prev + 1);
//     }
//   };

//   const handleCategoryClick = (categoryId) => {
//     setSelectedCategoryId(categoryId);
//     setCurrentCoursePage(1); // Reset to first page when changing category
    
//     // Also update the parent component's selectedCategory if needed
//     const categoryName = categoryId 
//       ? categoriesData.find(cat => cat.id === categoryId)?.name || "All Courses"
//       : "All Courses";
//     if (setSelectedCategory) {
//       setSelectedCategory(categoryName);
//     }
//   };

//   // Pagination handlers
//   const goToPage = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentCoursePage(pageNumber);
//       // Scroll to top when changing pages
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const goToPreviousPage = () => {
//     if (currentCoursePage > 1) {
//       goToPage(currentCoursePage - 1);
//     }
//   };

//   const goToNextPage = () => {
//     if (currentCoursePage < totalPages) {
//       goToPage(currentCoursePage + 1);
//     }
//   };

//   // Generate page numbers for pagination
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     if (totalPages <= maxVisiblePages) {
//       // Show all pages if total is small
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Show ellipsis logic for many pages
//       if (currentCoursePage <= 3) {
//         pages.push(1, 2, 3, 4, '...', totalPages);
//       } else if (currentCoursePage >= totalPages - 2) {
//         pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
//       } else {
//         pages.push(1, '...', currentCoursePage - 1, currentCoursePage, currentCoursePage + 1, '...', totalPages);
//       }
//     }
    
//     return pages;
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     if (setSearchTerm) {
//       setSearchTerm("");
//     }
//     setDebouncedSearchTerm("");
//     handleCategoryClick(null);
//     setCurrentCoursePage(1);
//   };

//   // Fixed: Add category count calculation
//   const getCategoryCount = (categoryId) => {
//     if (!categoryId) {
//       return coursesArray?.length || 0;
//     }
//     return coursesArray?.filter(course => 
//       String(course.category_id) === String(categoryId)
//     )?.length || 0;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <DynamicBreadcrumb 
//         MainTitle={t('pageTitles.courses')}
//         BreadCrumbs={[
//           {label: t('breadcrumbs.home'), href: "/"},
//           {label: t('breadcrumbs.courses')}
//         ]}
//       />

//       <FallingIconsBackground 
//         opacity={0.2}
//         count={35}
//         zIndex={0}
//       />
      
//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Main Content Area */}
//           <div className="w-full">
//             {/* Search Bar */}
//             <div className="relative my-4">
//               <input
//                 type="text"
//                 placeholder={i18n.language === "ar" ? "ابحث عن الدروس" : "Search for lessons..."}
//                 value={searchTerm || ""}
//                 onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
//                 className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
//               />
//               <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             </div>

//             {/* Category Tabs */}
//             <div className="mb-8">
//               <div className="border-b border-gray-200">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-medium text-gray-900">
//                     {t('categories.title')}
//                   </h3>
//                   {categoriesMeta && (
//                     <span className="text-sm text-gray-500">
//                       {t('categories.showingResults', { 
//                         showing: categoriesData?.length, 
//                         total: categoriesMeta?.total 
//                       })}
//                     </span>
//                   )}
//                 </div>
                
//                 <nav className="-mb-px flex flex-wrap gap-2">
//                   {/* All Courses Tab */}
//                   <button
//                     onClick={() => handleCategoryClick(null)}
//                     className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
//                       selectedCategoryId === null
//                         ? 'border-b-2 border-yellow-500 text-yellow-600 bg-yellow-50'
//                         : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
//                     }`}
//                   >
//                     {t('categories.allCategories')}
//                     <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
//                       {getCategoryCount(null)}
//                     </span>
//                   </button>

//                   {/* Category Tabs */}
//                   {categoriesData.map((category, index) => {
//                     const categoryCoursesCount = getCategoryCount(category.id);

//                     return (
//                       <button
//                         key={`${category.id}-${category.name}-${index}`}
//                         onClick={() => handleCategoryClick(category.id)}
//                         className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
//                           String(selectedCategoryId) === String(category.id)
//                             ? 'border-b-2 border-yellow-500 text-yellow-600 bg-yellow-50'
//                             : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
//                         }`}
//                       >
//                         {category.name}
//                         <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
//                           {categoryCoursesCount}
//                         </span>
//                       </button>
//                     );
//                   })}

//                   {/* Load More Categories Button */}
//                   {categoriesMeta && currentCategoryPage < categoriesMeta.last_page && (
//                     <button
//                       onClick={loadMoreCategories}
//                       className="px-6 py-3 text-sm font-medium text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-t-lg transition-colors duration-200 border border-yellow-200 border-dashed"
//                     >
//                       {t('categories.loadMore') || 'Load More Categories'}
//                       <ChevronDown className="inline-block ml-2 w-4 h-4"/>
//                       <span className="ml-2 text-xs">
//                         ({categoriesMeta.total - categoriesData?.length} more)
//                       </span>
//                     </button>
//                   )}
//                 </nav>
//               </div>
//             </div>

//             {/* Debug Information - Remove this after fixing */}
//             {/* <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//               <h4 className="font-medium text-blue-900 mb-2">Debug Info:</h4>
//               <p className="text-sm text-blue-800">
//                 - Courses Array Length: {coursesArray?.length || 0}<br/>
//                 - Filtered Courses: {filteredCourses?.length || 0}<br/>
//                 - Search Filtered: {searchFilteredCourses?.length || 0}<br/>
//                 - Paginated Courses: {paginatedCourses?.length || 0}<br/>
//                 - Current Page: {currentCoursePage}<br/>
//                 - Total Pages: {totalPages}<br/>
//                 - Search Term: "{debouncedSearchTerm}"<br/>
//                 - Selected Category ID: {selectedCategoryId}
//               </p>
//             </div> */}

//             {/* Results Header */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//               <div className="text-gray-600">
//                 <p>
//                   {t('courses.showingResults', {
//                     showing: paginatedCourses?.length || 0,
//                     total: totalCourses
//                   }) || `Showing ${paginatedCourses?.length || 0} of ${totalCourses} courses`}
//                   {selectedCategoryId && (
//                     <span className="ml-2 text-sm">
//                       {t('courses.inCategory', {
//                         category: categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name
//                       }) || `in "${categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name}"`}
//                     </span>
//                   )}
//                   {debouncedSearchTerm && (
//                     <span className="ml-2 text-sm">
//                       {t('courses.forSearchTerm', {
//                         term: debouncedSearchTerm
//                       }) || `for "${debouncedSearchTerm}"`}
//                     </span>
//                   )}
//                 </p>
                
//                 {/* Active filters display */}
//                 {(selectedCategoryId || debouncedSearchTerm) && (
//                   <div className="flex flex-wrap items-center gap-2 mt-2">
//                     <span className="text-sm text-gray-500">Active filters:</span>
//                     {selectedCategoryId && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                         {categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name}
//                         <button
//                           onClick={() => handleCategoryClick(null)}
//                           className="ml-2 hover:text-yellow-600"
//                         >
//                           ×
//                         </button>
//                       </span>
//                     )}
//                     {debouncedSearchTerm && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                         "{debouncedSearchTerm}"
//                         <button
//                           onClick={() => setSearchTerm && setSearchTerm("")}
//                           className="ml-2 hover:text-blue-600"
//                         >
//                           ×
//                         </button>
//                       </span>
//                     )}
//                     <button
//                       onClick={clearAllFilters}
//                       className="text-xs text-red-600 hover:text-red-700 underline"
//                     >
//                       Clear all
//                     </button>
//                   </div>
//                 )}
//               </div>
              
//               {/* Results summary */}
//               {totalPages > 1 && (
//                 <div className="text-sm text-gray-500">
//                   Page {currentCoursePage} of {totalPages}
//                 </div>
//               )}
//             </div>

//             {/* Courses Grid */}
//             {paginatedCourses?.length > 0 ? (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                   {paginatedCourses.map((course, index) => (
//                     <div 
//                       key={`${course.id}-${index}`} // Fixed: More robust key
//                       className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
//                     >
//                       <CourseCard course={course} renderStars={renderStars} />
//                     </div>
//                   ))}
//                 </div>

//                 {/* Enhanced Pagination */}
//                 {totalPages > 1 && (
//                   <div className="flex flex-col items-center mt-12 space-y-4">
//                     {/* Page info */}
//                     <div className="text-sm text-gray-600">
//                       Showing {startIndex + 1}-{Math.min(endIndex, totalCourses)} of {totalCourses} results
//                     </div>
                    
//                     {/* Pagination controls */}
//                     <div className="flex items-center space-x-2">
//                       {/* Previous button */}
//                       <button
//                         onClick={goToPreviousPage}
//                         disabled={currentCoursePage === 1}
//                         className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
//                           currentCoursePage === 1
//                             ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                             : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//                         }`}
//                       >
//                         <ChevronLeft className="w-4 h-4 mr-1" />
//                         Previous
//                       </button>

//                       {/* Page numbers */}
//                       {getPageNumbers().map((pageNum, index) => (
//                         <div key={index}>
//                           {pageNum === '...' ? (
//                             <span className="px-3 py-2 text-gray-400">...</span>
//                           ) : (
//                             <button
//                               onClick={() => goToPage(pageNum)}
//                               className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
//                                 currentCoursePage === pageNum
//                                   ? 'bg-yellow-500 text-white'
//                                   : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//                               }`}
//                             >
//                               {pageNum}
//                             </button>
//                           )}
//                         </div>
//                       ))}

//                       {/* Next button */}
//                       <button
//                         onClick={goToNextPage}
//                         disabled={currentCoursePage === totalPages}
//                         className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
//                           currentCoursePage === totalPages
//                             ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                             : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//                         }`}
//                       >
//                         Next
//                         <ChevronRight className="w-4 h-4 ml-1" />
//                       </button>
//                     </div>

//                     {/* Items per page selector */}
//                     <div className="flex items-center space-x-2">
//                       <span className="text-sm text-gray-600">Items per page:</span>
//                       <select
//                         value={coursesPerPage}
//                         onChange={(e) => {
//                           const newPerPage = parseInt(e.target.value);
//                           setCoursesPerPage(newPerPage);
//                           setCurrentCoursePage(1);
//                         }}
//                         className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                       >
//                         <option value={6}>6</option>
//                         <option value={12}>12</option>
//                         <option value={18}>18</option>
//                         <option value={24}>24</option>
//                       </select>
//                     </div>
//                   </div>
//                 )}
//               </>
//             ) : (
//               // No courses found message
//               <div className="text-center py-12">
//                 <div className="text-gray-400 mb-4">
//                   <Search className="w-12 h-12 mx-auto mb-4" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   {t('courses.noCoursesFound') || 'No courses found'}
//                 </h3>
//                 <p className="text-gray-500 mb-4">
//                   {debouncedSearchTerm 
//                     ? (t('courses.noMatchingSearch', { term: debouncedSearchTerm }) || `No courses match your search "${debouncedSearchTerm}"`)
//                     : selectedCategoryId 
//                       ? (t('courses.noCategoryResults', { 
//                           category: categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name 
//                         }) || `No courses available in "${categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name}" category`)
//                       : (t('courses.noCoursesAvailable') || "No courses available")
//                   }
//                 </p>
//                 {(debouncedSearchTerm || selectedCategoryId) && (
//                   <button
//                     onClick={clearAllFilters}
//                     className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200"
//                   >
//                     {t('courses.clearFilters') || 'Clear filters'}
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Search, Users, MessageSquare, Star, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import DynamicBreadcrumb from "../Components/Ui/DynamicBreadcrumb";
import SubscriptionModal from "../Components/Ui/SubscriptionModal";
import CourseCard from "../Components/Ui/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../Redux/Apis/apiRequest";
import { useTranslation } from "react-i18next";
import FallingIconsBackground from "../Components/Ui/FallingIconsBackground";
import ScrollToTop from "../Utils/ScrollTop";

export default function CourseLayout({
  courses = [], 
  renderStars, 
  MainTitle, 
  Breadcrumb1, 
  Breadcrumb2, 
  selectedCategory, 
  setSelectedCategory, 
  searchTerm, 
  setSearchTerm, 
  type = "course"
}) {
  let dispatch = useDispatch();
  let { categories } = useSelector((state) => state.api);
  const [t, i18n] = useTranslation();
  
  // Local state for selected category ID and pagination
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentCategoryPage, setCurrentCategoryPage] = useState(1);
  const [allCategories, setAllCategories] = useState([]);
  
  // Pagination for courses - Fixed: Make coursesPerPage stateful
  const [currentCoursePage, setCurrentCoursePage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(6); // Fixed: Make this stateful
  
  // Debounced search to improve performance
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  
  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentCoursePage(1); // Reset to first page when searching
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load categories with pagination
  const loadCategories = (page = 1) => {
    console.log({ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp:page});
    
    dispatch(apiRequest({
      entity: "categories",
      url: `api/categories?page=${page}`,
      method: "GET",
      headers: {
        "Accept-Language": localStorage.getItem('language') || 'en',
        "Content-Type": "application/json",
        "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
      }
    }));
  };

  useEffect(() => {
    loadCategories(currentCategoryPage);
  }, [dispatch, currentCategoryPage, localStorage.getItem('language')]);

  // Update all categories when new data arrives
  useEffect(() => {
    if (categories?.data?.data) {
      if (currentCategoryPage === 1) {
        // First page, replace all categories
        setAllCategories(categories.data.data);
      } else {
        // Additional page, append to existing categories
        setAllCategories(prev => [...prev, ...categories.data.data]);
      }
    }
  }, [categories?.data, currentCategoryPage]);

  // Get categories data and meta information
  const categoriesData = allCategories;
  const categoriesMeta = categories?.data?.meta;

  // // Debug: Log the courses data structure
  // console.log('Original courses prop:', courses);
  // console.log('Type of courses:', typeof courses);
  // console.log('Is courses an array?', Array.isArray(courses));

  // Fixed: Handle different possible data structures for courses
  let coursesArray = [];
  if (Array.isArray(courses)) {
    coursesArray = courses;
  } else if (courses?.data && Array.isArray(courses.data)) {
    coursesArray = courses.data;
  } else if (courses?.data?.data && Array.isArray(courses.data.data)) {
    coursesArray = courses.data.data;
  }

  // console.log('Processed coursesArray:', coursesArray);

  // Filter courses based on selected category ID
  const filteredCourses = selectedCategoryId 
    ? coursesArray.filter(course => {
        // Handle both string and number category IDs
        return String(course.category_id) === String(selectedCategoryId);
      })
    : coursesArray;

  // console.log('Filtered courses:', filteredCourses);

  // Further filter by search term (debounced)
  const searchFilteredCourses = debouncedSearchTerm
    ? filteredCourses.filter(course => {
        const searchLower = debouncedSearchTerm.toLowerCase();
        return (
          course.name?.toLowerCase().includes(searchLower) ||
          course.description?.toLowerCase().includes(searchLower) ||
          course.teacher?.toLowerCase().includes(searchLower) ||
          course.category?.toLowerCase().includes(searchLower)
        );
      })
    : filteredCourses;

  // console.log('Search filtered courses:', searchFilteredCourses);

  // Fixed: Pagination calculations
  const totalCourses = searchFilteredCourses?.length || 0; // Fixed: Remove .data
  const totalPages = Math.ceil(totalCourses / coursesPerPage);
  const startIndex = (currentCoursePage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  
  const paginatedCourses = searchFilteredCourses?.slice(startIndex, endIndex); // Fixed: Remove .data

  console.log('Paginated courses:', paginatedCourses);
  console.log('Total courses:', totalCourses);
  console.log('Total pages:', totalPages);

  // Load more categories if needed
  const loadMoreCategories = () => {
    if (categoriesMeta && currentCategoryPage < categoriesMeta.last_page) {
      setCurrentCategoryPage(prev => prev + 1);
    }
  };

  // FIXED: Calculate remaining categories properly
  const getRemainingCategoriesCount = () => {
    if (!categoriesMeta || !categoriesData) return 0;
    const remaining = categoriesMeta.total - categoriesData.length;
    return Math.max(0, remaining); // Ensure it's never negative
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentCoursePage(1); // Reset to first page when changing category
    
    // Also update the parent component's selectedCategory if needed
    const categoryName = categoryId 
      ? categoriesData.find(cat => cat.id === categoryId)?.name || "All Lessons"
      : "All Courses";
    if (setSelectedCategory) {
      setSelectedCategory(categoryName);
    }
  };

  // Pagination handlers
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentCoursePage(pageNumber);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentCoursePage > 1) {
      goToPage(currentCoursePage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentCoursePage < totalPages) {
      goToPage(currentCoursePage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show ellipsis logic for many pages
      if (currentCoursePage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentCoursePage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentCoursePage - 1, currentCoursePage, currentCoursePage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  // Clear all filters
  const clearAllFilters = () => {
    if (setSearchTerm) {
      setSearchTerm("");
    }
    setDebouncedSearchTerm("");
    handleCategoryClick(null);
    setCurrentCoursePage(1);
  };

  // Fixed: Add category count calculation
  const getCategoryCount = (categoryId) => {
    if (!categoryId) {
      return coursesArray?.length || 0;
    }
    return coursesArray?.filter(course => 
      String(course.category_id) === String(categoryId)
    )?.length || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop/>
      <DynamicBreadcrumb 
        MainTitle={t('pageTitles.courses')}
        BreadCrumbs={[
          {label: t('breadcrumbs.home'), href: "/"},
          {label: t('breadcrumbs.courses')}
        ]}
      />

      <FallingIconsBackground 
        opacity={0.2}
        count={35}
        zIndex={0}
      />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="w-full">
            {/* Search Bar */}
            <div className="relative my-4">
              <input
                type="text"
                placeholder={i18n.language === "ar" ? "ابحث عن الدروس" : "Search for lessons..."}
                value={searchTerm || ""}
                onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Category Tabs */}
            <div className="mb-8">
              <div className="border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {t('categories.title')}
                  </h3>
                  {categoriesMeta && (
                    <span className="text-sm text-gray-500">
                      {t('categories.showingResults', { 
                        showing: categoriesData?.length, 
                        total: categoriesMeta?.total 
                      })}
                    </span>
                  )}
                </div>
                
                <nav className="-mb-px flex flex-wrap gap-2">
                  {/* All Courses Tab */}
                  <button
                    onClick={() => handleCategoryClick(null)}
                    className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                      selectedCategoryId === null
                        ? 'border-b-2 border-yellow-500 text-yellow-600 bg-yellow-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {t('categories.allCategories')}
                    <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {getCategoryCount(null)}
                    </span>
                  </button>

                  {/* Category Tabs */}
                  {categoriesData.map((category, index) => {
                    const categoryCoursesCount = getCategoryCount(category.id);

                    return (
                      <button
                        key={`${category.id}-${category.name}-${index}`}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                          String(selectedCategoryId) === String(category.id)
                            ? 'border-b-2 border-yellow-500 text-yellow-600 bg-yellow-50'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {category.name}
                        <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          {categoryCoursesCount}
                        </span>
                      </button>
                    );
                  })}

                  {/* FIXED: Load More Categories Button */}
                  {categoriesMeta && currentCategoryPage < categoriesMeta.last_page && getRemainingCategoriesCount() > 0 && (
                    <button
                      onClick={loadMoreCategories}
                      className="px-6 py-3 text-sm font-medium text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-t-lg transition-colors duration-200 border border-yellow-200 border-dashed"
                    >
                      {t('categories.loadMore') || 'Load More Categories'}
                      <ChevronDown className="inline-block ml-2 w-4 h-4"/>
                      <span className="ml-2 text-xs">
                        (+{getRemainingCategoriesCount()} more)
                      </span>
                    </button>
                  )}
                </nav>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="text-gray-600">
                <p>
                  {t('courses.showingResults', {
                    showing: paginatedCourses?.length || 0,
                    total: totalCourses
                  }) || `Showing ${paginatedCourses?.length || 0} of ${totalCourses} courses`}
                  {selectedCategoryId && (
                    <span className="ml-2 text-sm">
                      {t('courses.inCategory', {
                        category: categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name
                      }) || `in "${categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name}"`}
                    </span>
                  )}
                  {debouncedSearchTerm && (
                    <span className="ml-2 text-sm">
                      {t('courses.forSearchTerm', {
                        term: debouncedSearchTerm
                      }) || `for "${debouncedSearchTerm}"`}
                    </span>
                  )}
                </p>
                
                {/* Active filters display */}
                {(selectedCategoryId || debouncedSearchTerm) && (
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">Active filters:</span>
                    {selectedCategoryId && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name}
                        <button
                          onClick={() => handleCategoryClick(null)}
                          className="ml-2 hover:text-yellow-600"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {debouncedSearchTerm && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        "{debouncedSearchTerm}"
                        <button
                          onClick={() => setSearchTerm && setSearchTerm("")}
                          className="ml-2 hover:text-blue-600"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-red-600 hover:text-red-700 underline"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>
              
              {/* Results summary */}
              {totalPages > 1 && (
                <div className="text-sm text-gray-500">
                  Page {currentCoursePage} of {totalPages}
                </div>
              )}
            </div>

            {/* Courses Grid */}
            {paginatedCourses?.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedCourses.map((course, index) => (
                    <div 
                      key={`${course.id}-${index}`} // Fixed: More robust key
                      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
                    >
                      <CourseCard course={course} renderStars={renderStars} />
                    </div>
                  ))}
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col items-center mt-12 space-y-4">
                    {/* Page info */}
                    {/* <div className="text-sm text-gray-600">
                      {i18n.language=="en" ?  `Showing ${startIndex + 1}-${Math.min(endIndex, totalCourses)} of ${totalCourses} results  `:` ${totalCourses} من ${startIndex + 1}-${Math.min(endIndex, totalCourses)} عرض`}
                     
                    </div> */}
                    <div className="text-sm text-gray-600">
  {i18n.language === "en"
    ? `Showing ${startIndex + 1}-${Math.min(endIndex, totalCourses)} of ${totalCourses} results`
    : `عرض ${startIndex + 1}-${Math.min(endIndex, totalCourses)} من ${totalCourses}`}
</div>

                    
                    {/* Pagination controls */}
                    <div className="flex items-center space-x-2">
                      {/* Previous button */}
                      <button
                        onClick={goToPreviousPage}
                        disabled={currentCoursePage === 1}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          currentCoursePage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        
                        {i18n.language=="ar"? "السابق" :"Previous"}
                      </button>

                      {/* Page numbers */}
                      {getPageNumbers().map((pageNum, index) => (
                        <div key={index}>
                          {pageNum === '...' ? (
                            <span className="px-3 py-2 text-gray-400">...</span>
                          ) : (
                            <button
                              onClick={() => goToPage(pageNum)}
                              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                currentCoursePage === pageNum
                                  ? 'bg-yellow-500 text-white'
                                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          )}
                        </div>
                      ))}

                      {/* Next button */}
                      <button
                        onClick={goToNextPage}
                        disabled={currentCoursePage === totalPages}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          currentCoursePage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {i18n.language=="ar"? "التالي" :"Next"}
                        
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>

                    {/* Items per page selector */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{i18n.language=="en"?"Items per page:"  :"عدد العناصر في كل صفحة"}</span>
                      <select
                        value={coursesPerPage}
                        onChange={(e) => {
                          const newPerPage = parseInt(e.target.value);
                          setCoursesPerPage(newPerPage);
                          setCurrentCoursePage(1);
                        }}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value={6}>6</option>
                        <option value={12}>12</option>
                        <option value={18}>18</option>
                        <option value={24}>24</option>
                      </select>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // No courses found message
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto mb-4" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('courses.noCoursesFound') || 'No courses found'}
                </h3>
                {/* <p className="text-gray-500 mb-4">
                  {debouncedSearchTerm 
                    ? (t('courses.noMatchingSearch', { term: debouncedSearchTerm }) || `No courses match your search "${debouncedSearchTerm}"`)
                    : selectedCategoryId 
                      ? (t('courses.noCategoryResults', { 
                          category: categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name 
                        }) || `No courses available in "${categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name}" category`)
                      : (t('courses.noCoursesAvailable') || "No courses available")
                  }
                </p> */}
                {(debouncedSearchTerm || selectedCategoryId) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200"
                  >
                    {i18n.language=="en" ?  "clear" :"اعادة"|| 'Clear filters'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// import { Search, Users, MessageSquare, Star, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import DynamicBreadcrumb from "../Components/Ui/DynamicBreadcrumb";
// import SubscriptionModal from "../Components/Ui/SubscriptionModal";
// import CourseCard from "../Components/Ui/CourseCard";
// import { useDispatch, useSelector } from "react-redux";
// import { apiRequest } from "../Redux/Apis/apiRequest";
// import { useTranslation } from "react-i18next";
// import FallingIconsBackground from "../Components/Ui/FallingIconsBackground";

// export default function CourseLayout({
//   courses = [], 
//   renderStars, 
//   MainTitle, 
//   Breadcrumb1, 
//   Breadcrumb2, 
//   selectedCategory, 
//   setSelectedCategory, 
//   searchTerm, 
//   setSearchTerm, 
//   type = "course"
// }) {
//   let dispatch = useDispatch();
//   let { categories } = useSelector((state) => state.api);
//   const [t, i18n] = useTranslation();
  
//   // Local state for selected category ID and pagination
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [currentCategoryPage, setCurrentCategoryPage] = useState(1);
//   const [allCategories, setAllCategories] = useState([]);
  
//   // Pagination for courses
//   const [currentCoursePage, setCurrentCoursePage] = useState(1);
//   const [coursesPerPage] = useState(6); // Adjustable items per page
  
//   // Debounced search to improve performance
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  
//   // Debounce search term
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm);
//       setCurrentCoursePage(1); // Reset to first page when searching
//     }, 300);
    
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // Load categories with pagination
//   const loadCategories = (page = 1) => {
//     dispatch(apiRequest({
//       entity: "categories",
//       url: `api/categories?page=${page}`,
//       method: "GET",
//       headers: {
//         "Accept-Language": localStorage.getItem('language') || 'en',
//         "Content-Type": "application/json",
//         "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
//       }
//     }));
//   };

//   useEffect(() => {
//     loadCategories(currentCategoryPage);
//   }, [dispatch, currentCategoryPage, localStorage.getItem('language')]);

//   // Update all categories when new data arrives
//   useEffect(() => {
//     if (categories?.data?.data) {
//       if (currentCategoryPage === 1) {
//         // First page, replace all categories
//         setAllCategories(categories.data.data);
//       } else {
//         // Additional page, append to existing categories
//         setAllCategories(prev => [...prev, ...categories.data.data]);
//       }
//     }
//   }, [categories?.data, currentCategoryPage]);

//   // Get categories data and meta information
//   const categoriesData = allCategories;
//   const categoriesMeta = categories?.data?.meta;

//   // Filter courses based on selected category ID
//   const filteredCourses = selectedCategoryId 
//     ? courses?.data.filter(course => {
//         // Handle both string and number category IDs
//         return String(course.category_id) === String(selectedCategoryId);
//       })
//     : courses;

//   // Further filter by search term (debounced)
//   const searchFilteredCourses = debouncedSearchTerm
//     ? filteredCourses.filter(course => {
//         const searchLower = debouncedSearchTerm.toLowerCase();
//         return (
//           course.name?.toLowerCase().includes(searchLower) ||
//           course.description?.toLowerCase().includes(searchLower) ||
//           course.teacher?.toLowerCase().includes(searchLower) ||
//           course.category?.toLowerCase().includes(searchLower)
//         );
//       })
//     : filteredCourses;

//   // Pagination calculations
//   const totalCourses = searchFilteredCourses?.data?.length;
//   const totalPages = Math.ceil(totalCourses / coursesPerPage);
//   const startIndex = (currentCoursePage - 1) * coursesPerPage;
//   const endIndex = startIndex + coursesPerPage;
//   console.log({searchFilteredCourses});
  
//   const paginatedCourses = searchFilteredCourses?.data?.slice(startIndex, endIndex);

//   // Load more categories if needed
//   const loadMoreCategories = () => {
//     if (categoriesMeta && currentCategoryPage < categoriesMeta.last_page) {
//       setCurrentCategoryPage(prev => prev + 1);
//     }
//   };

//   const handleCategoryClick = (categoryId) => {
//     setSelectedCategoryId(categoryId);
//     setCurrentCoursePage(1); // Reset to first page when changing category
    
//     // Also update the parent component's selectedCategory if needed
//     const categoryName = categoryId 
//       ? categoriesData.find(cat => cat.id === categoryId)?.name || "All Courses"
//       : "All Courses";
//     setSelectedCategory(categoryName);
//   };

//   // Pagination handlers
//   const goToPage = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentCoursePage(pageNumber);
//       // Scroll to top when changing pages
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const goToPreviousPage = () => {
//     if (currentCoursePage > 1) {
//       goToPage(currentCoursePage - 1);
//     }
//   };

//   const goToNextPage = () => {
//     if (currentCoursePage < totalPages) {
//       goToPage(currentCoursePage + 1);
//     }
//   };

//   // Generate page numbers for pagination
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     if (totalPages <= maxVisiblePages) {
//       // Show all pages if total is small
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Show ellipsis logic for many pages
//       if (currentCoursePage <= 3) {
//         pages.push(1, 2, 3, 4, '...', totalPages);
//       } else if (currentCoursePage >= totalPages - 2) {
//         pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
//       } else {
//         pages.push(1, '...', currentCoursePage - 1, currentCoursePage, currentCoursePage + 1, '...', totalPages);
//       }
//     }
    
//     return pages;
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSearchTerm("");
//     setDebouncedSearchTerm("");
//     handleCategoryClick(null);
//     setCurrentCoursePage(1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <DynamicBreadcrumb 
//         MainTitle={t('pageTitles.courses')}
//         BreadCrumbs={[
//           {label: t('breadcrumbs.home'), href: "/"},
//           {label: t('breadcrumbs.courses')}
//         ]}
//       />

//       <FallingIconsBackground 
//         opacity={0.2}
//         count={35}
//         zIndex={0}
//       />
      
//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Main Content Area */}
//           <div className="w-full">
//             {/* Search Bar */}
//             <div className="relative my-4">
//               <input
//                 type="text"
//                 placeholder={i18n.language === "ar" ? "ابحث عن الدروس" : "Search for lessons..."}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
//               />
//               <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             </div>

//             {/* Category Tabs */}
//             <div className="mb-8">
//               <div className="border-b border-gray-200">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-medium text-gray-900">
//                     {t('categories.title')}
//                   </h3>
//                   {categoriesMeta && (
//                     <span className="text-sm text-gray-500">
//                       {t('categories.showingResults', { 
//                         showing: categoriesData?.length, 
//                         total: categoriesMeta?.total 
//                       })}
//                     </span>
//                   )}
//                 </div>
                
//                 <nav className="-mb-px flex flex-wrap gap-2">
//                   {/* All Courses Tab */}
//                   <button
//                     onClick={() => handleCategoryClick(null)}
//                     className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
//                       selectedCategoryId === null
//                         ? 'border-b-2 border-yellow-500 text-yellow-600 bg-yellow-50'
//                         : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
//                     }`}
//                   >
//                     {t('categories.allCategories')}
//                     <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
//                       {courses?.length || 0}
//                     </span>
//                   </button>

//                   {/* Category Tabs */}
//                   {categoriesData.map((category, index) => {
//                     const categoryCoursesCount = courses?.data?.filter(course => 
//                       String(course.category_id) === String(category.id)
//                     )?.length || 0;

//                     return (
//                       <button
//                         key={`${category.id}-${category.name}-${index}`}
//                         onClick={() => handleCategoryClick(category.id)}
//                         className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
//                           String(selectedCategoryId) === String(category.id)
//                             ? 'border-b-2 border-yellow-500 text-yellow-600 bg-yellow-50'
//                             : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
//                         }`}
//                       >
//                         {category.name}
//                         <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
//                           {categoryCoursesCount}
//                         </span>
//                       </button>
//                     );
//                   })}

//                   {/* Load More Categories Button */}
//                   {categoriesMeta && currentCategoryPage < categoriesMeta.last_page && (
//                     <button
//                       onClick={loadMoreCategories}
//                       className="px-6 py-3 text-sm font-medium text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-t-lg transition-colors duration-200 border border-yellow-200 border-dashed"
//                     >
//                       {t('categories.loadMore') || 'Load More Categories'}
//                       <ChevronDown className="inline-block ml-2 w-4 h-4"/>
//                       <span className="ml-2 text-xs">
//                         ({categoriesMeta.total - categoriesData?.length} more)
//                       </span>
//                     </button>
//                   )}
//                 </nav>
//               </div>
//             </div>

//             {/* Results Header */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//               <div className="text-gray-600">
//                 <p>
//                   {t('courses.showingResults', {
//                     showing: paginatedCourses?.length || 0,
//                     total: totalCourses
//                   }) || `Showing ${paginatedCourses?.length || 0} of ${totalCourses} courses`}
//                   {selectedCategoryId && (
//                     <span className="ml-2 text-sm">
//                       {t('courses.inCategory', {
//                         category: categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name
//                       }) || `in "${categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name}"`}
//                     </span>
//                   )}
//                   {debouncedSearchTerm && (
//                     <span className="ml-2 text-sm">
//                       {t('courses.forSearchTerm', {
//                         term: debouncedSearchTerm
//                       }) || `for "${debouncedSearchTerm}"`}
//                     </span>
//                   )}
//                 </p>
                
//                 {/* Active filters display */}
//                 {(selectedCategoryId || debouncedSearchTerm) && (
//                   <div className="flex flex-wrap items-center gap-2 mt-2">
//                     <span className="text-sm text-gray-500">Active filters:</span>
//                     {selectedCategoryId && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                         {categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name}
//                         <button
//                           onClick={() => handleCategoryClick(null)}
//                           className="ml-2 hover:text-yellow-600"
//                         >
//                           ×
//                         </button>
//                       </span>
//                     )}
//                     {debouncedSearchTerm && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                         "{debouncedSearchTerm}"
//                         <button
//                           onClick={() => setSearchTerm("")}
//                           className="ml-2 hover:text-blue-600"
//                         >
//                           ×
//                         </button>
//                       </span>
//                     )}
//                     <button
//                       onClick={clearAllFilters}
//                       className="text-xs text-red-600 hover:text-red-700 underline"
//                     >
//                       Clear all
//                     </button>
//                   </div>
//                 )}
//               </div>
              
//               {/* Results summary */}
//               {totalPages > 1 && (
//                 <div className="text-sm text-gray-500">
//                   Page {currentCoursePage} of {totalPages}
//                 </div>
//               )}
//             </div>

//             {/* Courses Grid */}
//             {paginatedCourses?.length > 0 ? (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                   {paginatedCourses.map((course) => (
//                     <div 
//                       key={course.id} 
//                       className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
//                     >
//                       <CourseCard course={course} renderStars={renderStars} />
//                     </div>
//                   ))}
//                 </div>

//                 {/* Enhanced Pagination */}
//                 {totalPages > 1 && (
//                   <div className="flex flex-col items-center mt-12 space-y-4">
//                     {/* Page info */}
//                     <div className="text-sm text-gray-600">
//                       Showing {startIndex + 1}-{Math.min(endIndex, totalCourses)} of {totalCourses} results
//                     </div>
                    
//                     {/* Pagination controls */}
//                     <div className="flex items-center space-x-2">
//                       {/* Previous button */}
//                       <button
//                         onClick={goToPreviousPage}
//                         disabled={currentCoursePage === 1}
//                         className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
//                           currentCoursePage === 1
//                             ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                             : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//                         }`}
//                       >
//                         <ChevronLeft className="w-4 h-4 mr-1" />
//                         Previous
//                       </button>

//                       {/* Page numbers */}
//                       {getPageNumbers().map((pageNum, index) => (
//                         <div key={index}>
//                           {pageNum === '...' ? (
//                             <span className="px-3 py-2 text-gray-400">...</span>
//                           ) : (
//                             <button
//                               onClick={() => goToPage(pageNum)}
//                               className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
//                                 currentCoursePage === pageNum
//                                   ? 'bg-yellow-500 text-white'
//                                   : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//                               }`}
//                             >
//                               {pageNum}
//                             </button>
//                           )}
//                         </div>
//                       ))}

//                       {/* Next button */}
//                       <button
//                         onClick={goToNextPage}
//                         disabled={currentCoursePage === totalPages}
//                         className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
//                           currentCoursePage === totalPages
//                             ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                             : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//                         }`}
//                       >
//                         Next
//                         <ChevronRight className="w-4 h-4 ml-1" />
//                       </button>
//                     </div>

//                     {/* Items per page selector */}
//                     <div className="flex items-center space-x-2">
//                       <span className="text-sm text-gray-600">Items per page:</span>
//                       <select
//                         value={coursesPerPage}
//                         onChange={(e) => {
//                           const newPerPage = parseInt(e.target.value);
//                           setCoursesPerPage(newPerPage);
//                           setCurrentCoursePage(1);
//                         }}
//                         className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                       >
//                         <option value={6}>6</option>
//                         <option value={12}>12</option>
//                         <option value={18}>18</option>
//                         <option value={24}>24</option>
//                       </select>
//                     </div>
//                   </div>
//                 )}
//               </>
//             ) : (
//               // No courses found message
//               <div className="text-center py-12">
//                 <div className="text-gray-400 mb-4">
//                   <Search className="w-12 h-12 mx-auto mb-4" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   {t('courses.noCoursesFound') || 'No courses found'}
//                 </h3>
//                 <p className="text-gray-500 mb-4">
//                   {debouncedSearchTerm 
//                     ? (t('courses.noMatchingSearch', { term: debouncedSearchTerm }) || `No courses match your search "${debouncedSearchTerm}"`)
//                     : selectedCategoryId 
//                       ? (t('courses.noCategoryResults', { 
//                           category: categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name 
//                         }) || `No courses available in "${categoriesData.find(cat => String(cat.id) === String(selectedCategoryId))?.name}" category`)
//                       : (t('courses.noCoursesAvailable') || "No courses available")
//                   }
//                 </p>
//                 {(debouncedSearchTerm || selectedCategoryId) && (
//                   <button
//                     onClick={clearAllFilters}
//                     className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200"
//                   >
//                     {t('courses.clearFilters') || 'Clear filters'}
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }