// // import React from 'react'

// // export default function SubscriptionCourses() {
// //   return (
// //     <div>
      
// //     </div>
// //   )
// // }


// import React, { useState, useEffect } from 'react';
// import { Play, Star, Clock, Users, ChevronRight, Check, Zap, Trophy, BookOpen, Target } from 'lucide-react';
// import CourseSlider from '../Home/CourseSlider';

// export default function SubscriptionCourses() {
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [selectedPlan, setSelectedPlan] = useState('premium');
//   const [animatedStats, setAnimatedStats] = useState({ students: 0, courses: 0, hours: 0 });

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
//       gradient: "from-blue-600 via-purple-600 to-indigo-800"
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
//       gradient: "from-emerald-500 via-teal-600 to-cyan-800"
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
//       gradient: "from-orange-500 via-red-500 to-pink-700"
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
//       gradient: "from-violet-600 via-purple-600 to-fuchsia-800"
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
//       gradient: 'from-gray-600 to-gray-800'
//     },
//     {
//       id: 'premium',
//       name: 'Premium',
//       price: 49,
//       period: 'month',
//       features: ['All Basic features', 'Access to ALL courses', '4K video quality', 'Downloadable content', 'Priority support', '1-on-1 mentoring sessions'],
//       popular: true,
//       gradient: 'from-purple-600 via-blue-600 to-indigo-800'
//     },
//     {
//       id: 'enterprise',
//       name: 'Enterprise',
//       price: 99,
//       period: 'month',
//       features: ['All Premium features', 'Team collaboration tools', 'Custom learning paths', 'Advanced analytics', 'Dedicated account manager'],
//       popular: false,
//       gradient: 'from-amber-500 via-orange-500 to-red-600'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900  to-slate-900">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
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
//               <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
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

//             <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105">
//               <span className="relative z-10">Start Learning Now</span>
//               <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
//                     <div className={`absolute inset-0 bg-gradient-to-t ${course.gradient} opacity-60`}></div>
                    
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
//                     <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
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

//         {/* Subscription Plans */}
//         {/* <section className="py-20 px-6">
//           <div className="max-w-6xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold text-white mb-6">Choose Your Plan</h2>
//               <p className="text-xl text-white/70 max-w-2xl mx-auto">
//                 Unlock unlimited learning potential with our flexible subscription options
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {plans.map((plan) => (
//                 <div
//                   key={plan.id}
//                   className={`relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-500 cursor-pointer ${
//                     selectedPlan === plan.id 
//                       ? 'border-purple-400 shadow-2xl shadow-purple-500/25 scale-105 bg-white/10' 
//                       : 'border-white/10 hover:border-white/30 hover:bg-white/10'
//                   } ${plan.popular ? 'ring-2 ring-purple-400' : ''}`}
//                   onClick={() => setSelectedPlan(plan.id)}
//                 >
//                   {plan.popular && (
//                     <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                       <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold border-2 border-purple-400">
//                         Most Popular
//                       </div>
//                     </div>
//                   )}

//                   <div className="text-center mb-8">
//                     <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
//                     <div className="mb-6">
//                       <span className="text-5xl font-bold text-white">${plan.price}</span>
//                       <span className="text-white/70">/{plan.period}</span>
//                     </div>
//                   </div>

//                   <ul className="space-y-4 mb-8">
//                     {plan.features.map((feature, index) => (
//                       <li key={index} className="flex items-center text-white/80">
//                         <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
//                         <span>{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <button className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
//                     selectedPlan === plan.id
//                       ? 'bg-gradient-to-r from-purple-600 to-yellow-600 text-white shadow-lg hover:shadow-xl'
//                       : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
//                   }`}>
//                     {selectedPlan === plan.id ? 'Selected Plan' : 'Select Plan'}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section> */}

//         <section className="py-20 px-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl  text-white font-semibold hover:from-white/20 hover:to-white/10 transition-all duration-300 group-hover:shadow-lg">
//             <CourseSlider/>
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
//                   color: "text-green-400"
//                 },
//                 {
//                   icon: BookOpen,
//                   title: "Practical Projects",
//                   description: "Build real-world projects that showcase your new skills",
//                   color: "text-blue-400"
//                 },
//                 {
//                   icon: Zap,
//                   title: "Lifetime Access",
//                   description: "Keep your courses forever, even after cancellation",
//                   color: "text-purple-400"
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

//         {/* CTA Section */}
//         <section className="py-20 px-6">
//           <div className="max-w-4xl mx-auto text-center">
//             <div className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
//               <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//                 Ready to Transform Your Career?
//               </h2>
//               <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
//                 Join our community of learners and start building the skills that matter most in today's digital world.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105">
//                   <span className="relative z-10">Start Free Trial</span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </button>
                
//                 <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300">
//                   View All Courses
//                 </button>
//               </div>

//               <p className="text-white/50 text-sm mt-6">
//                 No credit card required • Cancel anytime • 30-day money-back guarantee
//               </p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Play, Star, Clock, Users, ChevronRight, Check, Zap, Trophy, BookOpen, Target } from 'lucide-react';

export default function SubscriptionCourses() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [animatedStats, setAnimatedStats] = useState({ students: 0, courses: 0, hours: 0 });

  // Animate stats on load
  useEffect(() => {
    const targets = { students: 12500, courses: 150, hours: 2400 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedStats({
        students: Math.floor(targets.students * easeOut),
        courses: Math.floor(targets.courses * easeOut),
        hours: Math.floor(targets.hours * easeOut)
      });

      if (step >= steps) clearInterval(timer);
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const courses = [
    {
      id: 1,
      title: "Advanced React Mastery",
      instructor: "Sarah Chen",
      rating: 4.9,
      students: 3240,
      duration: "24 hours",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=240&fit=crop",
      skills: ["React 18", "Next.js", "TypeScript", "Performance"],
      gradient: "from-yellow-500 via-amber-600 to-yellow-700"
    },
    {
      id: 2,
      title: "AI & Machine Learning Fundamentals",
      instructor: "Dr. Marcus Rodriguez",
      rating: 4.8,
      students: 2890,
      duration: "32 hours",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop",
      skills: ["Python", "TensorFlow", "Neural Networks", "Data Science"],
      gradient: "from-amber-600 via-yellow-700 to-amber-800"
    },
    {
      id: 3,
      title: "Full-Stack Web Development",
      instructor: "Alex Thompson",
      rating: 4.9,
      students: 4120,
      duration: "45 hours",
      level: "Beginner to Advanced",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=240&fit=crop",
      skills: ["HTML/CSS", "JavaScript", "Node.js", "Database"],
      gradient: "from-gray-800 via-amber-700 to-yellow-900"
    },
    {
      id: 4,
      title: "Mobile App Development",
      instructor: "Jennifer Kim",
      rating: 4.7,
      students: 2156,
      duration: "28 hours",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=240&fit=crop",
      skills: ["React Native", "Flutter", "iOS", "Android"],
      gradient: "from-amber-700 via-yellow-700 to-amber-900"
    }
  ];

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      period: 'month',
      features: ['Access to 50+ courses', 'HD video quality', 'Mobile app access', 'Certificate of completion'],
      popular: false,
      gradient: 'from-gray-700 to-gray-800'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 49,
      period: 'month',
      features: ['All Basic features', 'Access to ALL courses', '4K video quality', 'Downloadable content', 'Priority support', '1-on-1 mentoring sessions'],
      popular: true,
      gradient: 'from-yellow-500 via-amber-600 to-yellow-700'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      period: 'month',
      features: ['All Premium features', 'Team collaboration tools', 'Custom learning paths', 'Advanced analytics', 'Dedicated account manager'],
      popular: false,
      gradient: 'from-amber-700 via-yellow-800 to-amber-900'
    }
  ];

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
              Premium Learning Experience
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Master New
              <span className="block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                Skills Today
              </span>
            </h1>
            
            <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals advancing their careers with our premium subscription courses. 
              Learn from industry experts and get unlimited access to cutting-edge content.
            </p>

            {/* Animated Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">{animatedStats.students.toLocaleString()}+</div>
                <div className="text-white/70">Active Students</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">{animatedStats.courses}+</div>
                <div className="text-white/70">Expert Courses</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">{animatedStats.hours}+</div>
                <div className="text-white/70">Learning Hours</div>
              </div>
            </div>

            <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl text-gray-900 font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/25 hover:scale-105">
              <span className="relative z-10">Start Learning Now</span>
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">Featured Courses</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Handpicked courses from industry leaders to accelerate your professional growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:scale-105 hover:bg-white/10"
                  onMouseEnter={() => setHoveredCard(course.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  {/* Course Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-700 to-gray-900 opacity-60`}></div>
                    
                    {/* Play Button Overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hoveredCard === course.id ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>

                    {/* Level Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
                      {course.level}
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                      {course.title}
                    </h3>
                    
                    <p className="text-white/70 mb-4">by {course.instructor}</p>

                    {/* Course Stats */}
                    <div className="flex items-center gap-6 mb-6 text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-medium">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/20">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl py-3 text-white font-semibold hover:from-white/20 hover:to-white/10 transition-all duration-300 group-hover:shadow-lg">
                      Start Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

       

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">Why Choose Our Platform?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Trophy,
                  title: "Expert Instructors",
                  description: "Learn from industry professionals with proven track records",
                  color: "text-yellow-400"
                },
                {
                  icon: Target,
                  title: "Personalized Learning",
                  description: "AI-powered recommendations tailored to your learning style",
                  color: "text-yellow-400"
                },
                {
                  icon: BookOpen,
                  title: "Practical Projects",
                  description: "Build real-world projects that showcase your new skills",
                  color: "text-amber-400"
                },
                {
                  icon: Zap,
                  title: "Lifetime Access",
                  description: "Keep your courses forever, even after cancellation",
                  color: "text-yellow-500"
                }
              ].map((feature, index) => (
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
              ))}
            </div>
          </div>
        </section>

      
      </div>
    </div>
  );
}