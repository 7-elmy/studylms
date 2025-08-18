

import { Search, Users, MessageSquare, Star, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import DynamicBreadcrumb from "../Components/Ui/DynamicBreadcrumb";
import SubscriptionModal from "../Components/Ui/SubscriptionModal";
import CourseCard from "../Components/Ui/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../Redux/Apis/apiRequest";
import { useTranslation } from "react-i18next";
import FallingIconsBackground from "../Components/Ui/FallingIconsBackground";
// import FallingIconsBackground from "../Components/Ui/FallingIconsBackground";

export default function CourseLayout({
  courses, 
  popularCourses, 
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

  //console.log({ categories: categories?.data });

  // Load categories with pagination
  const loadCategories = (page = 1) => {
    dispatch(apiRequest({
      entity: "categories",
      url: `api/categories?page=${page}`,
      method: "GET",
      headers: {
             "Accept-Language": localStorage.getItem('language') || 'en',
              "Content-Type": "application/json",
              "Authorization": `${sessionStorage.getItem("token")}`
        }

    }));
  };

  useEffect(() => {
    loadCategories(currentCategoryPage);
  }, [dispatch, currentCategoryPage ,localStorage.getItem('language') ]);

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

  // Filter courses based on selected category ID
  const filteredCourses = selectedCategoryId 
    ? courses.filter(course => course.category_id === selectedCategoryId)
    : courses;

  // Further filter by search term
  const searchFilteredCourses = searchTerm
    ? filteredCourses.filter(course => 
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredCourses;

  // Load more categories if needed
  const loadMoreCategories = () => {
    if (categoriesMeta && currentCategoryPage < categoriesMeta.last_page) {
      setCurrentCategoryPage(prev => prev + 1);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    // Also update the parent component's selectedCategory if needed
    const categoryName = categoryId 
      ? categoriesData.find(cat => cat.id === categoryId)?.name || "All Courses"
      : "All Courses";
    setSelectedCategory(categoryName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <DynamicBreadcrumb 
        MainTitle={MainTitle}
        BreadCrumbs={[
          { label: `${Breadcrumb1}`, href: `/${Breadcrumb1}` },
          { label: `${Breadcrumb2}` },
        ]} 
      /> */}
      <DynamicBreadcrumb 
  MainTitle={t('pageTitles.courses')}
  BreadCrumbs={[
    {label: t('breadcrumbs.home'), href: "/"},
    {label: t('breadcrumbs.courses')}
  ]}
/>

  {/* <FallingIconsBackground zIndex={0} opacity={0.28} /> */}

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
                placeholder={i18n.language=="ar"?   "  ابحث عن الدروس" : "Search for lessons..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
        showing: categoriesData.length, 
        total: categoriesMeta.total 
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
                    {/* All Courses */}
                    {t('categories.allCategories')}
                    <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {courses.length}
                    </span>
                  </button>

                  {/* Category Tabs */}
                  {categoriesData.map((category,index) => {
                    const categoryCoursesCount = courses.filter(course => 
                      course.category_id === category.id
                    ).length;

                    return (
                      <button
                        key={category.id + category.name +index}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                          selectedCategoryId === category.id
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

                  {/* Load More Categories Button */}
                  {categoriesMeta && currentCategoryPage < categoriesMeta.last_page && (
                    <button
                      onClick={loadMoreCategories}
                      className="px-6 py-3 text-sm font-medium text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-t-lg transition-colors duration-200 border border-yellow-200 border-dashed"
                    >
                      {/* Load More Categories */}
                      {t('categories.showingResults')}
                      <ChevronDown className="inline-block ml-2 w-4 h-4"/>
                      <span className="ml-2 text-xs">
                        ({categoriesMeta.total - categoriesData.length} more)
                      </span>
                    </button>
                  )}
                </nav>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="text-gray-600">
                {/* <p>
                  Showing {searchFilteredCourses.length} of {filteredCourses.length} courses
                  {selectedCategoryId && (
                    <span className="ml-2 text-sm">
                      in "{categoriesData.find(cat => cat.id === selectedCategoryId)?.name}"
                    </span>
                  )}
                  {searchTerm && (
                    <span className="ml-2 text-sm">
                      for "{searchTerm}"
                    </span>
                  )}
                </p> */}

                <p>
  {t('courses.showingResults', {
    showing: searchFilteredCourses.length,
    total: filteredCourses.length
  })}
  {selectedCategoryId && (
    <span className="ml-2 text-sm">
      {t('courses.inCategory', {
        category: categoriesData.find(cat => cat.id === selectedCategoryId)?.name
      })}
    </span>
  )}
  {searchTerm && (
    <span className="ml-2 text-sm">
      {t('courses.forSearchTerm', {
        term: searchTerm
      })}
    </span>
  )}
</p>
              </div>
            </div>

            {/* Courses Grid */}
            {searchFilteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {searchFilteredCourses.map((course) => (
                  <div 
                    key={course.id} 
                    className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
                  >
                    <CourseCard course={course} renderStars={renderStars} />
                  </div>
                ))}
              </div>
            ) : (
              // No courses found message
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto mb-4" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? `No courses match your search "${searchTerm}"`
                    : selectedCategoryId 
                      ? `No courses available in "${categoriesData.find(cat => cat.id === selectedCategoryId)?.name}" category`
                      : "No courses available"
                  }
                </p>
                {(searchTerm || selectedCategoryId) && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      handleCategoryClick(null);
                    }}
                    className="text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}

            {/* Pagination - Only show if there are courses */}
            {searchFilteredCourses.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold">
                    1
                  </button>
                  <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                    2
                  </button>
                  <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                    ›
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}