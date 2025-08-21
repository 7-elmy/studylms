

// import React, { useState, useEffect } from 'react';
// import { Play, Star, Clock, Users, ChevronRight, Check, Zap, Trophy, BookOpen, Target } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiRequest } from '../../Redux/Apis/apiRequest';

// export default function SubscriptionCourses() {
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [animatedStats, setAnimatedStats] = useState({ students: 0, courses: 0, hours: 0 });
//   let dispatch = useDispatch();
//   let {subscriptionCourse} = useSelector((state) => state.api);

//   console.log("Subscription Courses Data:", subscriptionCourse);
  


//   useEffect(()=>{
//     dispatch(apiRequest({
//       entity:"subscriptionCourse",
//       url:"api/sub_scriptions",
//       headers:{
//         "Aurhorization":`${sessionStorage.getItem('token') || localStorage.getItem('token') }`,
//         "accept-language":localStorage.getItem('language') || 'en'
//       }
//     }))
//   },[dispatch , localStorage.getItem('language')]);

//   // Animate stats on load
//   useEffect(() => {
//     const targets = { students: 12500, courses: 150, hours: 2400 };
//     const duration = 2000;
//     const steps = 60;
//     const increment = duration / steps;

//     let step = 0;
//     const timer = setInterval(() => {
//       step++;
//       const progress = step / steps;
//       const easeOut = 1 - Math.pow(1 - progress, 3);
      
//       setAnimatedStats({
//         students: Math.floor(targets.students * easeOut),
//         courses: Math.floor(targets.courses * easeOut),
//         hours: Math.floor(targets.hours * easeOut)
//       });

//       if (step >= steps) clearInterval(timer);
//     }, increment);

//     return () => clearInterval(timer);
//   }, []);

//   const courses = [
//     {
//       id: 1,
//       title: "Advanced React Mastery",
//       instructor: "Sarah Chen",
//       rating: 4.9,
//       students: 3240,
//       duration: "24 hours",
//       level: "Advanced",
//       image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=240&fit=crop",
//       skills: ["React 18", "Next.js", "TypeScript", "Performance"],
//       gradient: "from-yellow-500 via-amber-600 to-yellow-700"
//     },
//     {
//       id: 2,
//       title: "AI & Machine Learning Fundamentals",
//       instructor: "Dr. Marcus Rodriguez",
//       rating: 4.8,
//       students: 2890,
//       duration: "32 hours",
//       level: "Intermediate",
//       image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop",
//       skills: ["Python", "TensorFlow", "Neural Networks", "Data Science"],
//       gradient: "from-amber-600 via-yellow-700 to-amber-800"
//     },
//     {
//       id: 3,
//       title: "Full-Stack Web Development",
//       instructor: "Alex Thompson",
//       rating: 4.9,
//       students: 4120,
//       duration: "45 hours",
//       level: "Beginner to Advanced",
//       image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=240&fit=crop",
//       skills: ["HTML/CSS", "JavaScript", "Node.js", "Database"],
//       gradient: "from-gray-800 via-amber-700 to-yellow-900"
//     },
//     {
//       id: 4,
//       title: "Mobile App Development",
//       instructor: "Jennifer Kim",
//       rating: 4.7,
//       students: 2156,
//       duration: "28 hours",
//       level: "Intermediate",
//       image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=240&fit=crop",
//       skills: ["React Native", "Flutter", "iOS", "Android"],
//       gradient: "from-amber-700 via-yellow-700 to-amber-900"
//     }
//   ];

//   const plans = [
//     {
//       id: 'basic',
//       name: 'Basic',
//       price: 29,
//       period: 'month',
//       features: ['Access to 50+ courses', 'HD video quality', 'Mobile app access', 'Certificate of completion'],
//       popular: false,
//       gradient: 'from-gray-700 to-gray-800'
//     },
//     {
//       id: 'premium',
//       name: 'Premium',
//       price: 49,
//       period: 'month',
//       features: ['All Basic features', 'Access to ALL courses', '4K video quality', 'Downloadable content', 'Priority support', '1-on-1 mentoring sessions'],
//       popular: true,
//       gradient: 'from-yellow-500 via-amber-600 to-yellow-700'
//     },
//     {
//       id: 'enterprise',
//       name: 'Enterprise',
//       price: 99,
//       period: 'month',
//       features: ['All Premium features', 'Team collaboration tools', 'Custom learning paths', 'Advanced analytics', 'Dedicated account manager'],
//       popular: false,
//       gradient: 'from-amber-700 via-yellow-800 to-amber-900'
//     }
//   ];

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
//         <section className="pt-20 pb-32 px-6">
//           <div className="max-w-7xl mx-auto text-center">
//             <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-8 border border-white/20">
//               <Zap className="w-4 h-4 mr-2 text-yellow-400" />
//               Premium Learning Experience
//             </div>
            
//             <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
//               Master New
//               <span className="block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
//                 Skills Today
//               </span>
//             </h1>
            
//             <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
//               Join thousands of professionals advancing their careers with our premium subscription courses. 
//               Learn from industry experts and get unlimited access to cutting-edge content.
//             </p>

//             {/* Animated Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//                 <div className="text-4xl font-bold text-white mb-2">{animatedStats.students.toLocaleString()}+</div>
//                 <div className="text-white/70">Active Students</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//                 <div className="text-4xl font-bold text-white mb-2">{animatedStats.courses}+</div>
//                 <div className="text-white/70">Expert Courses</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//                 <div className="text-4xl font-bold text-white mb-2">{animatedStats.hours}+</div>
//                 <div className="text-white/70">Learning Hours</div>
//               </div>
//             </div>

//             <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl text-gray-900 font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/25 hover:scale-105">
//               <span className="relative z-10">Start Learning Now</span>
//               <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
//               <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </button>
//           </div>
//         </section>

//         {/* Featured Courses */}
//         <section className="py-20 px-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold text-white mb-6">Featured Courses</h2>
//               <p className="text-xl text-white/70 max-w-2xl mx-auto">
//                 Handpicked courses from industry leaders to accelerate your professional growth
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {courses.map((course, index) => (
//                 <div
//                   key={course.id}
//                   className="group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:scale-105 hover:bg-white/10"
//                   onMouseEnter={() => setHoveredCard(course.id)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                   style={{
//                     animationDelay: `${index * 200}ms`
//                   }}
//                 >
//                   {/* Course Image */}
//                   <div className="relative h-48 overflow-hidden">
//                     <img 
//                       src={course.image} 
//                       alt={course.title}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div className={`absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-700 to-gray-900 opacity-60`}></div>
                    
//                     {/* Play Button Overlay */}
//                     <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hoveredCard === course.id ? 'opacity-100' : 'opacity-0'}`}>
//                       <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:scale-110 transition-transform duration-300 cursor-pointer">
//                         <Play className="w-6 h-6 text-white ml-1" />
//                       </div>
//                     </div>

//                     {/* Level Badge */}
//                     <div className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
//                       {course.level}
//                     </div>
//                   </div>

//                   {/* Course Content */}
//                   <div className="p-6">
//                     <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
//                       {course.title}
//                     </h3>
                    
//                     <p className="text-white/70 mb-4">by {course.instructor}</p>

//                     {/* Course Stats */}
//                     <div className="flex items-center gap-6 mb-6 text-sm text-white/60">
//                       <div className="flex items-center gap-1">
//                         <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                         <span className="text-white font-medium">{course.rating}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Users className="w-4 h-4" />
//                         <span>{course.students.toLocaleString()}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-4 h-4" />
//                         <span>{course.duration}</span>
//                       </div>
//                     </div>

//                     {/* Skills Tags */}
//                     <div className="flex flex-wrap gap-2 mb-6">
//                       {course.skills.map((skill) => (
//                         <span key={skill} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/20">
//                           {skill}
//                         </span>
//                       ))}
//                     </div>

//                     <button className="w-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl py-3 text-white font-semibold hover:from-white/20 hover:to-white/10 transition-all duration-300 group-hover:shadow-lg">
//                       Start Course
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

       

//         {/* Features Section */}
//         <section className="py-20 px-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold text-white mb-6">Why Choose Our Platform?</h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {[
//                 {
//                   icon: Trophy,
//                   title: "Expert Instructors",
//                   description: "Learn from industry professionals with proven track records",
//                   color: "text-yellow-400"
//                 },
//                 {
//                   icon: Target,
//                   title: "Personalized Learning",
//                   description: "AI-powered recommendations tailored to your learning style",
//                   color: "text-yellow-400"
//                 },
//                 {
//                   icon: BookOpen,
//                   title: "Practical Projects",
//                   description: "Build real-world projects that showcase your new skills",
//                   color: "text-amber-400"
//                 },
//                 {
//                   icon: Zap,
//                   title: "Lifetime Access",
//                   description: "Keep your courses forever, even after cancellation",
//                   color: "text-yellow-500"
//                 }
//               ].map((feature, index) => (
//                 <div
//                   key={index}
//                   className="text-center group hover:scale-105 transition-transform duration-300"
//                 >
//                   <div className="w-16 h-16 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
//                     <feature.icon className={`w-8 h-8 ${feature.color}`} />
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
//                   <p className="text-white/70">{feature.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

      
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { Play, Star, Clock, Users, ChevronRight, Check, Zap, Trophy, BookOpen, Target, ChevronLeft, Calendar, User, GraduationCap, Eye, FileText } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiRequest } from '../../Redux/Apis/apiRequest';
// import { useNavigate } from 'react-router-dom';

// export default function SubscriptionCourses() {
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [animatedStats, setAnimatedStats] = useState({ students: 0, courses: 0, hours: 0 });
//   const [currentPage, setCurrentPage] = useState(1);
//   let navigate = useNavigate();
//   let dispatch = useDispatch();
//   let { subscriptionCourse } = useSelector((state) => state.api);

//   console.log("Subscription Courses Data:", subscriptionCourse);

//   useEffect(() => {
//     fetchSubscriptionCourses(1);
//   }, [dispatch, localStorage.getItem('language')]);

//   const fetchSubscriptionCourses = (page) => {
//     dispatch(apiRequest({
//       entity: "subscriptionCourse",
//       url: `api/sub_scriptions?page=${page}`,
//       headers: {
//         "Authorization": `${sessionStorage.getItem('token') || localStorage.getItem('token')}`,
//         "accept-language": localStorage.getItem('language') || 'en'
//       }
//     }));
//   };

//   // Animate stats on load
//   useEffect(() => {
//     const targets = { students: 12500, courses: 150, hours: 2400 };
//     const duration = 2000;
//     const steps = 60;
//     const increment = duration / steps;

//     let step = 0;
//     const timer = setInterval(() => {
//       step++;
//       const progress = step / steps;
//       const easeOut = 1 - Math.pow(1 - progress, 3);
      
//       setAnimatedStats({
//         students: Math.floor(targets.students * easeOut),
//         courses: Math.floor(targets.courses * easeOut),
//         hours: Math.floor(targets.hours * easeOut)
//       });

//       if (step >= steps) clearInterval(timer);
//     }, increment);

//     return () => clearInterval(timer);
//   }, []);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     fetchSubscriptionCourses(page);
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       'نشط': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
//       'معلق': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
//       'منتهي': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' }
//     };
    
//     const config = statusConfig[status] || statusConfig['معلق'];
//     return (
//       <span className={`px-3 py-1 ${config.bg} ${config.text} ${config.border} border rounded-full text-sm font-medium`}>
//         {status}
//       </span>
//     );
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'غير محدد';
//     return new Date(dateString).toLocaleDateString('ar-EG', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const renderPagination = () => {
//     if (!subscriptionCourse?.data?.meta) return null;
    
//     const { current_page, last_page, total } = subscriptionCourse?.data?.meta;
    
//     if (last_page <= 1) return null;

//     const pages = [];
//     for (let i = 1; i <= last_page; i++) {
//       pages.push(i);
//     }

//     return (
//       <div className="flex items-center justify-center gap-4 mt-12">
//         <button
//           onClick={() => handlePageChange(current_page - 1)}
//           disabled={current_page === 1}
//           className={`p-2 rounded-lg border transition-all duration-300 ${
//             current_page === 1 
//               ? 'border-gray-600 text-gray-500 cursor-not-allowed' 
//               : 'border-white/20 text-white hover:bg-white/10 hover:border-yellow-400'
//           }`}
//         >
//           <ChevronLeft className="w-5 h-5" />
//         </button>

//         <div className="flex gap-2">
//           {pages.map(page => (
//             <button
//               key={page}
//               onClick={() => handlePageChange(page)}
//               className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//                 current_page === page
//                   ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 font-semibold'
//                   : 'border border-white/20 text-white hover:bg-white/10 hover:border-yellow-400'
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//         </div>

//         <button
//           onClick={() => handlePageChange(current_page + 1)}
//           disabled={current_page === last_page}
//           className={`p-2 rounded-lg border transition-all duration-300 ${
//             current_page === last_page 
//               ? 'border-gray-600 text-gray-500 cursor-not-allowed' 
//               : 'border-white/20 text-white hover:bg-white/10 hover:border-yellow-400'
//           }`}
//         >
//           <ChevronRight className="w-5 h-5" />
//         </button>
//       </div>
//     );
//   };

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
//         <section className="pt-20 pb-32 px-6">
//           <div className="max-w-7xl mx-auto text-center">
//             <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-8 border border-white/20">
//               <Zap className="w-4 h-4 mr-2 text-yellow-400" />
//               اشتراكاتي التعليمية
//             </div>
            
//             <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
//               كورساتك
//               <span className="block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
//                 المشترك بها
//               </span>
//             </h1>
            
//             <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
//               تابع تقدمك في الكورسات المشترك بها وواصل رحلتك التعليمية مع أفضل المدربين
//             </p>

//             {/* Animated Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//                 <div className="text-4xl font-bold text-white mb-2">{animatedStats.students.toLocaleString()}+</div>
//                 <div className="text-white/70">طلاب نشطون</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//                 <div className="text-4xl font-bold text-white mb-2">{animatedStats.courses}+</div>
//                 <div className="text-white/70">كورسات متخصصة</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//                 <div className="text-4xl font-bold text-white mb-2">{animatedStats.hours}+</div>
//                 <div className="text-white/70">ساعات تعليمية</div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* My Subscription Courses */}
//         <section className="py-20 px-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold text-white mb-6">كورساتي المشترك بها</h2>
//               <p className="text-xl text-white/70 max-w-2xl mx-auto">
//                 {subscriptionCourse?.data?.meta?.total 
//                   ? `لديك ${subscriptionCourse?.data?.meta?.total} اشتراك تعليمي` 
//                   : 'جاري تحميل اشتراكاتك...'}
//               </p>
//             </div>

//             {subscriptionCourse?.data?.data?.length > 0 ? (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   {subscriptionCourse?.data?.data.map((subscription, index) => (
//                     <div
//                       key={subscription.id}
//                       className="group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:scale-105 hover:bg-white/10"
//                       onMouseEnter={() => setHoveredCard(subscription.id)}
//                       onMouseLeave={() => setHoveredCard(null)}
//                       style={{
//                         animationDelay: `${index * 200}ms`
//                       }}
//                     >
//                       {console.log("Subscription Data:", subscription)
//                       }
//                       {/* Course Image */}
//                       <div className="relative h-48 overflow-hidden">
//                         {subscription.course?.image ? (
//                           <img 
//                             src={subscription.course.image} 
//                             alt={subscription.course.name || subscription.package_name}
//                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                           />
//                         ) : (
//                           <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
//                             <BookOpen className="w-16 h-16 text-gray-400" />
//                           </div>
//                         )}
//                         <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-700 to-gray-900 opacity-60"></div>
                        
//                         {/* Play Button Overlay - only show if course has content */}
//                         {/* {subscription.course && (
//                           <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hoveredCard === subscription.id ? 'opacity-100' : 'opacity-0'}`}>
//                             <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:scale-110 transition-transform duration-300 cursor-pointer">
//                               <Play className="w-6 h-6 text-white ml-1" />
//                             </div>
//                           </div>
//                         )} */}

//                         {/* Status Badge */}
//                         <div className="absolute top-4 left-4">
//                           {getStatusBadge(subscription.status)}
//                         </div>

//                         {/* Sessions Badge */}
//                         <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
//                           {subscription.remaining_sessions} حصص متبقية
//                         </div>
//                       </div>

//                       {/* Course Content */}
//                       <div className="p-6">
//                         <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
//                           {subscription.course?.name || subscription.package_name}
//                         </h3>
                        
//                         {subscription.course && (
//                           <>
//                             <p className="text-white/70 mb-2">المدرب: {subscription.course.teacher}</p>
//                             <p className="text-white/60 mb-4 line-clamp-2">{subscription.course.description}</p>
//                           </>
//                         )}

//                         {/* Course Stats */}
//                         <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
//                           <div className="flex items-center gap-2 text-white/60">
//                             <Calendar className="w-4 h-4" />
//                             <div>
//                               <div>البداية: {formatDate(subscription.start_date)}</div>
//                               {subscription.end_date && <div>النهاية: {formatDate(subscription.end_date)}</div>}
//                             </div>
//                           </div>

//                           {subscription.course && (
//                             <div className="space-y-1">
//                               <div className="flex items-center gap-2 text-white/60">
//                                 <GraduationCap className="w-4 h-4" />
//                                 <span>{subscription.course.grade}</span>
//                               </div>
//                               <div className="flex items-center gap-2 text-white/60">
//                                 <Eye className="w-4 h-4" />
//                                 <span>{subscription.course.views} مشاهدة</span>
//                               </div>
//                               <div className="flex items-center gap-2 text-white/60">
//                                 <Eye className="w-4 h-4" />
//                                 <span>{subscription.course.comments_count} تعليقات</span>
//                               </div>
//                             </div>
//                           )}
//                         </div>

//                         {/* Course Details */}
//                         {subscription.course && (
//                           <div className="flex flex-wrap gap-2 mb-6">
//                             <span className="px-3 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-300 text-sm border border-yellow-500/30">
//                               {subscription.course.price} جنيه
//                             </span>
//                             <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-300 text-sm border border-blue-500/30">
//                               {subscription.course.section}
//                             </span>
//                             {subscription.course.lessons?.length > 0 && (
//                               <span className="px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-green-300 text-sm border border-green-500/30">
//                                 {subscription.course.lessons.length} درس
//                               </span>
//                             )}
//                           </div>
//                         )}

//                         <button 
//                           className={`w-full backdrop-blur-sm border rounded-xl py-3 font-semibold transition-all duration-300 group-hover:shadow-lg ${
//                             subscription.course 
//                               ? 'bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border-yellow-500/30 text-yellow-300 hover:from-yellow-500/30 hover:to-amber-600/30'
//                               : 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-400 cursor-not-allowed'
//                           }`}
//                           disabled={!subscription.course}
//                           onClick={() => {
//                             if (subscription.course) {
//                              navigate(`/courses/${subscription.course.id}` );
//                             }
//                           }}
//                         >
//                           {subscription.course ? 'بدأ ' : 'لا يوجد محتوى متاح'}
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {renderPagination()}
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
//               {[
//                 {
//                   icon: Trophy,
//                   title: "مدربون خبراء",
//                   description: "تعلم من محترفين في المجال مع خبرة مثبتة",
//                   color: "text-yellow-400"
//                 },
//                 {
//                   icon: Target,
//                   title: "تعلم مخصص",
//                   description: "توصيات مدعومة بالذكاء الاصطناعي مناسبة لأسلوب تعلمك",
//                   color: "text-yellow-400"
//                 },
//                 {
//                   icon: BookOpen,
//                   title: "مشاريع عملية",
//                   description: "بناء مشاريع حقيقية تعرض مهاراتك الجديدة",
//                   color: "text-amber-400"
//                 },
//                 {
//                   icon: Zap,
//                   title: "وصول مدى الحياة",
//                   description: "احتفظ بكورساتك إلى الأبد، حتى بعد إلغاء الاشتراك",
//                   color: "text-yellow-500"
//                 }
//               ].map((feature, index) => (
//                 <div
//                   key={index}
//                   className="text-center group hover:scale-105 transition-transform duration-300"
//                 >
//                   <div className="w-16 h-16 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
//                     <feature.icon className={`w-8 h-8 ${feature.color}`} />
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
//                   <p className="text-white/70">{feature.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Play, Star, Clock, Users, ChevronRight, Check, Zap, Trophy, BookOpen, Target, ChevronLeft, Calendar, User, GraduationCap, Eye, FileText } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../../Redux/Apis/apiRequest';
import { useNavigate } from 'react-router-dom';

// Memoized components
const StatusBadge = memo(({ status }) => {
  const statusConfig = useMemo(() => ({
    'نشط': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
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

const AnimatedStat = memo(({ value, label, duration = 2000 }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    const steps = 60;
    const increment = duration / steps;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(Math.floor(value * easeOut));
      
      if (step >= steps) clearInterval(timer);
    }, increment);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="text-4xl font-bold text-white mb-2">{animatedValue.toLocaleString()}+</div>
      <div className="text-white/70">{label}</div>
    </div>
  );
});

const CourseCard = memo(({ subscription, index, hoveredCard, onHover, onNavigate }) => {
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'غير محدد';
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    onHover(subscription.id);
  }, [subscription.id, onHover]);

  const handleMouseLeave = useCallback(() => {
    onHover(null);
  }, [onHover]);

  const handleCourseClick = useCallback(() => {
    if (subscription.course) {
      onNavigate(`/courses/${subscription.course.id}`);
    }
  }, [subscription.course, onNavigate]);

  return (
    <div
      className="group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:scale-105 hover:bg-white/10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Course Image */}
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

        {/* Sessions Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
          {subscription.remaining_sessions} حصص متبقية
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
          {subscription.course?.name || subscription.package_name}
        </h3>
        
        {subscription.course && (
          <>
            <p className="text-white/70 mb-2">المدرب: {subscription.course.teacher}</p>
            <p className="text-white/60 mb-4 line-clamp-2">{subscription.course.description}</p>
          </>
        )}

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-white/60">
            <Calendar className="w-4 h-4" />
            <div>
              <div>البداية: {formatDate(subscription.start_date)}</div>
              {subscription.end_date && <div>النهاية: {formatDate(subscription.end_date)}</div>}
            </div>
          </div>

          {subscription.course && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white/60">
                <GraduationCap className="w-4 h-4" />
                <span>{subscription.course.grade}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Eye className="w-4 h-4" />
                <span>{subscription.course.views} مشاهدة</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Eye className="w-4 h-4" />
                <span>{subscription.course.comments_count} تعليقات</span>
              </div>
            </div>
          )}
        </div>

        {/* Course Details */}
        {subscription.course && (
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-300 text-sm border border-yellow-500/30">
              {subscription.course.price} جنيه
            </span>
            <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-300 text-sm border border-blue-500/30">
              {subscription.course.section}
            </span>
            {subscription.course.lessons?.length > 0 && (
              <span className="px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-green-300 text-sm border border-green-500/30">
                {subscription.course.lessons.length} درس
              </span>
            )}
          </div>
        )}

        <button 
          className={`w-full backdrop-blur-sm border rounded-xl py-3 font-semibold transition-all duration-300 group-hover:shadow-lg ${
            subscription.course 
              ? 'bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border-yellow-500/30 text-yellow-300 hover:from-yellow-500/30 hover:to-amber-600/30'
              : 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!subscription.course}
          onClick={handleCourseClick}
        >
          {subscription.course ? 'بدأ ' : 'لا يوجد محتوى متاح'}
        </button>
      </div>
    </div>
  );
});

const PaginationButton = memo(({ onClick, disabled, children, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={className}
  >
    {children}
  </button>
));

const Pagination = memo(({ currentPage, lastPage, onPageChange }) => {
  const handlePrevious = useCallback(() => {
    onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    onPageChange(currentPage + 1);
  }, [currentPage, onPageChange]);

  const handlePageClick = useCallback((page) => {
    onPageChange(page);
  }, [onPageChange]);

  const pages = useMemo(() => {
    const pageArray = [];
    for (let i = 1; i <= lastPage; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }, [lastPage]);

  if (lastPage <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <PaginationButton
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border transition-all duration-300 ${
          currentPage === 1 
            ? 'border-gray-600 text-gray-500 cursor-not-allowed' 
            : 'border-white/20 text-white hover:bg-white/10 hover:border-yellow-400'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </PaginationButton>

      <div className="flex gap-2">
        {pages.map(page => (
          <PaginationButton
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              currentPage === page
                ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 font-semibold'
                : 'border border-white/20 text-white hover:bg-white/10 hover:border-yellow-400'
            }`}
          >
            {page}
          </PaginationButton>
        ))}
      </div>

      <PaginationButton
        onClick={handleNext}
        disabled={currentPage === lastPage}
        className={`p-2 rounded-lg border transition-all duration-300 ${
          currentPage === lastPage 
            ? 'border-gray-600 text-gray-500 cursor-not-allowed' 
            : 'border-white/20 text-white hover:bg-white/10 hover:border-yellow-400'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </PaginationButton>
    </div>
  );
});

const FeatureCard = memo(({ feature, index }) => (
  <div
    key={index}
    className="text-center group hover:scale-105 transition-transform duration-300"
  >
    <div className="w-16 h-16 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
      <feature.icon className={`w-8 h-8 ${feature.color}`} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
    <p className="text-white/70">{feature.description}</p>
  </div>
));

export default function SubscriptionCourses() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subscriptionCourse } = useSelector((state) => state.api);

  // Memoized values
  const language = useMemo(() => localStorage.getItem('language'), []);
  const token = useMemo(() => sessionStorage.getItem('token') || localStorage.getItem('token'), []);

  // Memoized stats
  const stats = useMemo(() => ({
    students: 12500,
    courses: 150,
    hours: 2400
  }), []);

  // Memoized features
  const features = useMemo(() => [
    {
      icon: Trophy,
      title: "مدربون خبراء",
      description: "تعلم من محترفين في المجال مع خبرة مثبتة",
      color: "text-yellow-400"
    },
    {
      icon: Target,
      title: "تعلم مخصص",
      description: "توصيات مدعومة بالذكاء الاصطناعي مناسبة لأسلوب تعلمك",
      color: "text-yellow-400"
    },
    {
      icon: BookOpen,
      title: "مشاريع عملية",
      description: "بناء مشاريع حقيقية تعرض مهاراتك الجديدة",
      color: "text-amber-400"
    },
    {
      icon: Zap,
      title: "وصول مدى الحياة",
      description: "احتفظ بكورساتك إلى الأبد، حتى بعد إلغاء الاشتراك",
      color: "text-yellow-500"
    }
  ], []);

  // Callback functions
  const fetchSubscriptionCourses = useCallback((page) => {
    dispatch(apiRequest({
      entity: "subscriptionCourse",
      url: `api/sub_scriptions?page=${page}`,
      headers: {
        "Authorization": token,
        "accept-language": language || 'en'
      }
    }));
  }, [dispatch, token, language]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    fetchSubscriptionCourses(page);
  }, [fetchSubscriptionCourses]);

  const handleCardHover = useCallback((cardId) => {
    setHoveredCard(cardId);
  }, []);

  const handleNavigate = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  // Effects
  useEffect(() => {
    fetchSubscriptionCourses(1);
  }, [fetchSubscriptionCourses]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft' && currentPage > 1) {
        handlePageChange(currentPage - 1);
      } else if (event.key === 'ArrowRight' && subscriptionCourse?.data?.meta?.last_page && currentPage < subscriptionCourse.data.meta.last_page) {
        handlePageChange(currentPage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, handlePageChange, subscriptionCourse?.data?.meta?.last_page]);

  // Memoized course data
  const courseData = useMemo(() => 
    subscriptionCourse?.data?.data || [], 
    [subscriptionCourse?.data?.data]
  );

  const metaData = useMemo(() => 
    subscriptionCourse?.data?.meta, 
    [subscriptionCourse?.data?.meta]
  );

  console.log("Subscription Courses Data:", subscriptionCourse);

  return (
    <div className="min-h-screen bg-[#222222]/90">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-950 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-950 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-8 border border-white/20">
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              اشتراكاتي التعليمية
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              كورساتك
              <span className="block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                المشترك بها
              </span>
            </h1>
            
            <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              تابع تقدمك في الكورسات المشترك بها وواصل رحلتك التعليمية مع أفضل المدربين
            </p>

            {/* Animated Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <AnimatedStat value={stats.students} label="طلاب نشطون" />
              <AnimatedStat value={stats.courses} label="كورسات متخصصة" />
              <AnimatedStat value={stats.hours} label="ساعات تعليمية" />
            </div>
          </div>
        </section>

        {/* My Subscription Courses */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">كورساتي المشترك بها</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                {metaData?.total 
                  ? `لديك ${metaData.total} اشتراك تعليمي` 
                  : 'جاري تحميل اشتراكاتك...'}
              </p>
            </div>

            {courseData.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {courseData.map((subscription, index) => (
                    <CourseCard
                      key={subscription.id}
                      subscription={subscription}
                      index={index}
                      hoveredCard={hoveredCard}
                      onHover={handleCardHover}
                      onNavigate={handleNavigate}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {metaData && (
                  <Pagination
                    currentPage={metaData.current_page}
                    lastPage={metaData.last_page}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-24 h-24 text-gray-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">لا توجد اشتراكات حالياً</h3>
                <p className="text-white/70 mb-8">ابدأ رحلتك التعليمية واشترك في أول كورس</p>
                <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl text-gray-900 font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/25 hover:scale-105">
                  تصفح الكورسات
                  <ChevronRight className="w-5 h-5 mr-2" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">لماذا تختار منصتنا؟</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}