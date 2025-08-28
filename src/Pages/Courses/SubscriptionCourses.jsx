import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Play, Star, Clock, Users, ChevronRight, Check, Zap, Trophy, BookOpen, Target, ChevronLeft, Calendar, User, GraduationCap, Eye, FileText } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../../Redux/Apis/apiRequest';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Memoized components
const StatusBadge = memo(({ status }) => {
  const statusConfig = useMemo(() => ({
    'نشط' : { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
    'معلق': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
    'منتهي': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' }
  }), []);
  
  const config = statusConfig[status] || statusConfig['معلق'];
  return (
    <span className={`px-3 py-1 ${config.bg} ${config.text} ${config.border} border rounded-full text-sm font-medium`}>
      {status}
    </span>
  );
});

const CourseCard = memo(({ subscription, index, onHover, onNavigate, i18n }) => {
  const formatDate = useCallback((dateString) => {
    if (!dateString) return i18n.language === "ar" ? "غير محدد" : "Not defined";
    return new Date(dateString).toLocaleDateString(i18n.language === "ar" ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, [i18n.language]);

  const handleCourseClick = useCallback(() => {
    if (subscription.course) {
      onNavigate(`/courses/${subscription.course.id}`);
    }
  }, [subscription.course, onNavigate]);

  return (
    <div
      className="group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:scale-105 hover:bg-white/10"
      onMouseEnter={() => onHover(subscription.id)}
      onMouseLeave={() => onHover(null)}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {subscription.course?.image ? (
          <img 
            src={subscription.course.image} 
            alt={subscription.course.name || subscription.package_name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-700 to-gray-900 opacity-60"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <StatusBadge status={subscription.status} />
        </div>

        {/* Sessions */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
          {i18n.language === "ar" ? `${subscription.remaining_sessions} حصص متبقية` : `${subscription.remaining_sessions} sessions left`}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
          {subscription.course?.name || subscription.package_name}
        </h3>
        
        {subscription.course && (
          <>
            <p className="text-white/70 mb-2">
              {i18n.language === "ar" ? "المدرب: " : "Instructor: "} 
              {subscription.course.teacher}
            </p>
            <p className="text-white/60 mb-4 line-clamp-2">{subscription.course.description}</p>
          </>
        )}

        {/* Dates & Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-white/60">
            <Calendar className="w-4 h-4" />
            <div>
              <div>{i18n.language === "ar" ? "البداية: " : "Start: "} {formatDate(subscription.start_date)}</div>
              {subscription.end_date && <div>{i18n.language === "ar" ? "النهاية: " : "End: "} {formatDate(subscription.end_date)}</div>}
            </div>
          </div>
        </div>

        <button 
          className={`w-full backdrop-blur-sm border rounded-xl py-3 font-semibold transition-all duration-300 group-hover:shadow-lg ${
            subscription.course 
              ? 'bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border-yellow-500/30 text-yellow-300 hover:from-yellow-500/30 hover:to-amber-600/30'
              : 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!subscription.course}
          onClick={handleCourseClick}
        >
          {subscription.course 
            ? (i18n.language === "ar" ? "ابدأ" : "Start") 
            : (i18n.language === "ar" ? "لا يوجد محتوى متاح" : "No content available")}
        </button>
      </div>
    </div>
  );
});

export default function SubscriptionCourses() {
  const { i18n } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subscriptionCourse } = useSelector((state) => state.api);

  const language = useMemo(() => localStorage.getItem('language'), []);
  const token = useMemo(() => sessionStorage.getItem('token') || localStorage.getItem('token'), []);

  const fetchSubscriptionCourses = useCallback((page) => {
    dispatch(apiRequest({
      entity: "subscriptionCourse",
      url: `api/sub_scriptions?page=${page}`,
      headers: {
        "Authorization": token,
        "accept-language": localStorage.getItem('language') || 'en'
      }
    }));
  }, [dispatch, token , localStorage.getItem('language')]);

  useEffect(() => {
    fetchSubscriptionCourses(1);
  }, [fetchSubscriptionCourses]);

  const courseData = useMemo(() => subscriptionCourse?.data?.data || [], [subscriptionCourse?.data?.data]);
  const metaData = useMemo(() => subscriptionCourse?.data?.meta, [subscriptionCourse?.data?.meta]);

  return (
    <div className="min-h-screen bg-[#222222]/90">
      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-20 pb-4 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-8 border border-white/20">
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              {i18n.language === "ar" ? "اشتراكاتي التعليمية" : "My educational subscriptions"}
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {i18n.language === "ar" ? "كورساتك" : "Your Courses"}
              <span className="block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                {i18n.language === "ar" ? "المشترك بها" : "Subscribed"}
              </span>
            </h1>
            
            <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              {i18n.language === "ar" 
                ? "تابع تقدمك في الكورسات المشترك بها وواصل رحلتك التعليمية مع مصطفي النبوي" 
                : "Track your progress in the courses you’re subscribed to and continue your learning journey with Mostafa El Nabawy."}
            </p>
          </div>
        </section>

        {/* Courses */}
        <section className="pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            {courseData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {courseData.map((subscription, index) => (
                  <CourseCard
                    key={subscription.id}
                    subscription={subscription}
                    index={index}
                    onHover={setHoveredCard}
                    onNavigate={navigate}
                    i18n={i18n}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-24 h-24 text-gray-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  {i18n.language === "ar" ? "لا توجد اشتراكات حالياً" : "No subscriptions yet"}
                </h3>
                <p className="text-white/70 mb-8">
                  {i18n.language === "ar" ? "ابدأ رحلتك التعليمية واشترك في أول كورس" : "Start your learning journey by subscribing to your first course"}
                </p>
                <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl text-gray-900 font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/25 hover:scale-105">
                  {i18n.language === "ar" ? "تصفح الكورسات" : "Browse Courses"}
                  <ChevronRight className="w-5 h-5 mr-2" />
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}





// import React, { useState, useEffect, useMemo, useCallback, memo, useTransition } from 'react';
// import { Play, Star, Clock, Users, ChevronRight, Check, Zap, Trophy, BookOpen, Target, ChevronLeft, Calendar, User, GraduationCap, Eye, FileText } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiRequest } from '../../Redux/Apis/apiRequest';
// import { useNavigate } from 'react-router-dom';

// // Memoized components
// const StatusBadge = memo(({ status }) => {
//   const statusConfig = useMemo(() => ({
//     'نشط': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
//     'معلق': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
//     'منتهي': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' }
//   }), []);
  
//   const config = statusConfig[status] || statusConfig['معلق'];
//   return (
//     <span className={`px-3 py-1 ${config.bg} ${config.text} ${config.border} border rounded-full text-sm font-medium`}>
//       {status}
//     </span>
//   );
// });

// const AnimatedStat = memo(({ value, label, duration = 2000 }) => {
//   const [animatedValue, setAnimatedValue] = useState(0);
  
//   useEffect(() => {
//     const steps = 60;
//     const increment = duration / steps;
//     let step = 0;
    
//     const timer = setInterval(() => {
//       step++;
//       const progress = step / steps;
//       const easeOut = 1 - Math.pow(1 - progress, 3);
//       setAnimatedValue(Math.floor(value * easeOut));
      
//       if (step >= steps) clearInterval(timer);
//     }, increment);
    
//     return () => clearInterval(timer);
//   }, [value, duration]);
  
//   return (
//     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//       <div className="text-4xl font-bold text-white mb-2">{animatedValue.toLocaleString()}+</div>
//       <div className="text-white/70">{label}</div>
//     </div>
//   );
// });

// const CourseCard = memo(({ subscription, index, hoveredCard, onHover, onNavigate }) => {
//   const formatDate = useCallback((dateString) => {
//     if (!dateString) return 'غير محدد';
//     return new Date(dateString).toLocaleDateString('ar-EG', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   }, []);

//   const handleMouseEnter = useCallback(() => {
//     onHover(subscription.id);
//   }, [subscription.id, onHover]);

//   const handleMouseLeave = useCallback(() => {
//     onHover(null);
//   }, [onHover]);

//   const handleCourseClick = useCallback(() => {
//     if (subscription.course) {
//       onNavigate(`/courses/${subscription.course.id}`);
//     }
//   }, [subscription.course, onNavigate]);

//   return (
//     <div
//       className="group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:scale-105 hover:bg-white/10"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       style={{ animationDelay: `${index * 200}ms` }}
//     >
//       {/* Course Image */}
//       <div className="relative h-48 overflow-hidden">
//         {subscription.course?.image ? (
//           <img 
//             src={subscription.course.image} 
//             alt={subscription.course.name || subscription.package_name}
//             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             loading="lazy"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
//             <BookOpen className="w-16 h-16 text-gray-400" />
//           </div>
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-700 to-gray-900 opacity-60"></div>
        
//         {/* Status Badge */}
//         <div className="absolute top-4 left-4">
//           <StatusBadge status={subscription.status} />
//         </div>

//         {/* Sessions Badge */}
//         <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
//           {subscription.remaining_sessions} حصص متبقية
//         </div>
//       </div>

//       {/* Course Content */}
//       <div className="p-6">
//         <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
//           {subscription.course?.name || subscription.package_name}
//         </h3>
        
//         {subscription.course && (
//           <>
//             <p className="text-white/70 mb-2">المدرب: {subscription.course.teacher}</p>
//             <p className="text-white/60 mb-4 line-clamp-2">{subscription.course.description}</p>
//           </>
//         )}

//         {/* Course Stats */}
//         <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
//           <div className="flex items-center gap-2 text-white/60">
//             <Calendar className="w-4 h-4" />
//             <div>
//               <div>البداية: {formatDate(subscription.start_date)}</div>
//               {subscription.end_date && <div>النهاية: {formatDate(subscription.end_date)}</div>}
//             </div>
//           </div>

//           {subscription.course && (
//             <div className="space-y-1">
//               <div className="flex items-center gap-2 text-white/60">
//                 <GraduationCap className="w-4 h-4" />
//                 <span>{subscription.course.grade}</span>
//               </div>
//               <div className="flex items-center gap-2 text-white/60">
//                 <Eye className="w-4 h-4" />
//                 <span>{subscription.course.views} مشاهدة</span>
//               </div>
//               <div className="flex items-center gap-2 text-white/60">
//                 <Eye className="w-4 h-4" />
//                 <span>{subscription.course.comments_count} تعليقات</span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Course Details */}
//         {subscription.course && (
//           <div className="flex flex-wrap gap-2 mb-6">
//             <span className="px-3 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-300 text-sm border border-yellow-500/30">
//               {subscription.course.price} جنيه
//             </span>
//             <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-300 text-sm border border-blue-500/30">
//               {subscription.course.section}
//             </span>
//             {subscription.course.lessons?.length > 0 && (
//               <span className="px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-green-300 text-sm border border-green-500/30">
//                 {subscription.course.lessons.length} درس
//               </span>
//             )}
//           </div>
//         )}

//         <button 
//           className={`w-full backdrop-blur-sm border rounded-xl py-3 font-semibold transition-all duration-300 group-hover:shadow-lg ${
//             subscription.course 
//               ? 'bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border-yellow-500/30 text-yellow-300 hover:from-yellow-500/30 hover:to-amber-600/30'
//               : 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-400 cursor-not-allowed'
//           }`}
//           disabled={!subscription.course}
//           onClick={handleCourseClick}
//         >
//           {subscription.course ? 'بدأ ' : 'لا يوجد محتوى متاح'}
//         </button>
//       </div>
//     </div>
//   );
// });

// const PaginationButton = memo(({ onClick, disabled, children, className }) => (
//   <button
//     onClick={onClick}
//     disabled={disabled}
//     className={className}
//   >
//     {children}
//   </button>
// ));

// const Pagination = memo(({ currentPage, lastPage, onPageChange }) => {
//   const handlePrevious = useCallback(() => {
//     onPageChange(currentPage - 1);
//   }, [currentPage, onPageChange]);

//   const handleNext = useCallback(() => {
//     onPageChange(currentPage + 1);
//   }, [currentPage, onPageChange]);

//   const handlePageClick = useCallback((page) => {
//     onPageChange(page);
//   }, [onPageChange]);

//   const pages = useMemo(() => {
//     const pageArray = [];
//     for (let i = 1; i <= lastPage; i++) {
//       pageArray.push(i);
//     }
//     return pageArray;
//   }, [lastPage]);

//   if (lastPage <= 1) return null;

//   return (
//     <div className="flex items-center justify-center gap-4 mt-12">
//       <PaginationButton
//         onClick={handlePrevious}
//         disabled={currentPage === 1}
//         className={`p-2 rounded-lg border transition-all duration-300 ${
//           currentPage === 1 
//             ? 'border-gray-600 text-gray-500 cursor-not-allowed' 
//             : 'border-white/20 text-white hover:bg-white/10 hover:border-yellow-400'
//         }`}
//       >
//         <ChevronLeft className="w-5 h-5" />
//       </PaginationButton>

//       <div className="flex gap-2">
//         {pages.map(page => (
//           <PaginationButton
//             key={page}
//             onClick={() => handlePageClick(page)}
//             className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//               currentPage === page
//                 ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 font-semibold'
//                 : 'border border-white/20 text-white hover:bg-white/10 hover:border-yellow-400'
//             }`}
//           >
//             {page}
//           </PaginationButton>
//         ))}
//       </div>

//       <PaginationButton
//         onClick={handleNext}
//         disabled={currentPage === lastPage}
//         className={`p-2 rounded-lg border transition-all duration-300 ${
//           currentPage === lastPage 
//             ? 'border-gray-600 text-gray-500 cursor-not-allowed' 
//             : 'border-white/20 text-white hover:bg-white/10 hover:border-yellow-400'
//         }`}
//       >
//         <ChevronRight className="w-5 h-5" />
//       </PaginationButton>
//     </div>
//   );
// });

// const FeatureCard = memo(({ feature, index }) => (
//   <div
//     key={index}
//     className="text-center group hover:scale-105 transition-transform duration-300"
//   >
//     <div className="w-16 h-16 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
//       <feature.icon className={`w-8 h-8 ${feature.color}`} />
//     </div>
//     <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
//     <p className="text-white/70">{feature.description}</p>
//   </div>
// ));

// export default function SubscriptionCourses() {
//   let  [i18n] = useTransition()
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { subscriptionCourse } = useSelector((state) => state.api);

//   // Memoized values
//   const language = useMemo(() => localStorage.getItem('language'), []);
//   const token = useMemo(() => sessionStorage.getItem('token') || localStorage.getItem('token'), []);

//   // Memoized stats
//   const stats = useMemo(() => ({
//     students: 12500,
//     courses: 150,
//     hours: 2400
//   }), []);

//   // Memoized features
//   const features = useMemo(() => [
//     {
//       icon: Trophy,
//       title: "مدربون خبراء",
//       description: "تعلم من محترفين في المجال مع خبرة مثبتة",
//       color: "text-yellow-400"
//     },
//     {
//       icon: Target,
//       title: "تعلم مخصص",
//       description: "توصيات مدعومة بالذكاء الاصطناعي مناسبة لأسلوب تعلمك",
//       color: "text-yellow-400"
//     },
//     {
//       icon: BookOpen,
//       title: "مشاريع عملية",
//       description: "بناء مشاريع حقيقية تعرض مهاراتك الجديدة",
//       color: "text-amber-400"
//     },
//     {
//       icon: Zap,
//       title: "وصول مدى الحياة",
//       description: "احتفظ بكورساتك إلى الأبد، حتى بعد إلغاء الاشتراك",
//       color: "text-yellow-500"
//     }
//   ], []);

//   // Callback functions
//   const fetchSubscriptionCourses = useCallback((page) => {
//     dispatch(apiRequest({
//       entity: "subscriptionCourse",
//       url: `api/sub_scriptions?page=${page}`,
//       headers: {
//         "Authorization": token,
//         "accept-language": language || 'en'
//       }
//     }));
//   }, [dispatch, token, language]);

//   const handlePageChange = useCallback((page) => {
//     setCurrentPage(page);
//     fetchSubscriptionCourses(page);
//   }, [fetchSubscriptionCourses]);

//   const handleCardHover = useCallback((cardId) => {
//     setHoveredCard(cardId);
//   }, []);

//   const handleNavigate = useCallback((path) => {
//     navigate(path);
//   }, [navigate]);

//   // Effects
//   useEffect(() => {
//     fetchSubscriptionCourses(1);
//   }, [fetchSubscriptionCourses]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === 'ArrowLeft' && currentPage > 1) {
//         handlePageChange(currentPage - 1);
//       } else if (event.key === 'ArrowRight' && subscriptionCourse?.data?.meta?.last_page && currentPage < subscriptionCourse.data.meta.last_page) {
//         handlePageChange(currentPage + 1);
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [currentPage, handlePageChange, subscriptionCourse?.data?.meta?.last_page]);

//   // Memoized course data
//   const courseData = useMemo(() => 
//     subscriptionCourse?.data?.data || [], 
//     [subscriptionCourse?.data?.data]
//   );

//   const metaData = useMemo(() => 
//     subscriptionCourse?.data?.meta, 
//     [subscriptionCourse?.data?.meta]
//   );

//   console.log("Subscription Courses Data:", subscriptionCourse);

//   return (
//     <div className="min-h-screen bg-[#222222]/90">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-950 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-950 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
//       </div>

//       <div className="relative z-10">
//         {/* Hero Section */}
//         <section className="pt-20 pb-4 px-6">
//           <div className="max-w-7xl mx-auto text-center">
//             <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-8 border border-white/20">
//               <Zap className="w-4 h-4 mr-2 text-yellow-400" />
//               {/* اشتراكاتي التعليمية */}
//               {i18n.language=="ar" ?  "اشتراكاتي التعليمية"  : "My educational subscriptions" }
//             </div>
            
//             <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
//               {i18n.language=="ar" ?  "كورساتك"  : " Your Courses" }
              
//               <span className="block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
//               {i18n.language=="ar" ?  "المشترك بها"  : " Subscribed" }
                
//               </span>
//             </h1>
            
//             <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
//               {i18n.language=="ar" ?  "تابع تقدمك في الكورسات المشترك بها وواصل رحلتك التعليمية مع مصطفي النبوي "  : " Track your progress in the courses you’re subscribed to and continue your learning journey with Mostafa El Nabawy." }
              
//             </p>

//             {/* Animated Stats */}
//             {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//               <AnimatedStat value={stats.students} label="طلاب نشطون" />
//               <AnimatedStat value={stats.courses} label="كورسات متخصصة" />
//               <AnimatedStat value={stats.hours} label="ساعات تعليمية" />
//             </div> */}
//           </div>
//         </section>

//         {/* My Subscription Courses */}
//         <section className="pb-20 px-6">
//           <div className="max-w-7xl mx-auto">
//             {/* <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold text-white mb-6">كورساتي المشترك بها</h2>
//               <p className="text-xl text-white/70 max-w-2xl mx-auto">
//                 {metaData?.total 
//                   ? `لديك ${metaData.total} اشتراك تعليمي` 
//                   : 'جاري تحميل اشتراكاتك...'}
//               </p>
//             </div> */}

//             {courseData.length > 0 ? (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   {courseData.map((subscription, index) => (
//                     <CourseCard
//                       key={subscription.id}
//                       subscription={subscription}
//                       index={index}
//                       hoveredCard={hoveredCard}
//                       onHover={handleCardHover}
//                       onNavigate={handleNavigate}
//                     />
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {metaData && (
//                   <Pagination
//                     currentPage={metaData.current_page}
//                     lastPage={metaData.last_page}
//                     onPageChange={handlePageChange}
//                   />
//                 )}
//               </>
//             ) : (
//               <div className="text-center py-16">
//                 <BookOpen className="w-24 h-24 text-gray-500 mx-auto mb-6" />
//                 <h3 className="text-2xl font-bold text-white mb-4">لا توجد اشتراكات حالياً</h3>
//                 <p className="text-white/70 mb-8">ابدأ رحلتك التعليمية واشترك في أول كورس</p>
//                 <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl text-gray-900 font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/25 hover:scale-105">
//                   تصفح الكورسات
//                   <ChevronRight className="w-5 h-5 mr-2" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="py-20 px-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold text-white mb-6">لماذا تختار منصتنا؟</h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {features.map((feature, index) => (
//                 <FeatureCard key={index} feature={feature} index={index} />
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }