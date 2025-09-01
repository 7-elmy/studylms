// import React from 'react'
// import SubscriptionModal from './SubscriptionModal'
// import { Link } from 'react-router-dom'
// import { MessageSquare, Users } from 'lucide-react'
// import { useTranslation } from 'react-i18next'


// export default function CourseCard({course , renderStars }) {
//   const {t , i18n} = useTranslation()
//   return (
//     <div  className='border border-gray-300  rounded-lg min-h-[420px]'>
//                 {/* Course Image */}
//                   <div className="relative">
//                     <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg"></div>
//                     {/* Price Badge */}
//                     <div className="absolute top-4 left-4">
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         course.price === 'FREE' 
//                           ? 'bg-green-500 text-white' 
//                           : 'bg-cyan-500 text-white'
//                       }`}>
//                         {course.price}
//                       </span>
//                     </div>
//                     <div className="absolute top-4 right-4">
//                       <SubscriptionModal/>
//                         {/* <button className="px-3 py-1 cursor-pointer text-sm font-medium bg-amber-400 p-1  rounded-md">subscription</button> */}
                      
//                     </div>
//                   </div>

//                   {/* Course Content */}
//                   <div className="p-6 ">
                    
                    
//    {/* Rating */}
//                       <div className="flex items-center">
//                         {renderStars(course.rating)}
//                       </div>

//                     <h3 className="text-lg font-semibold text-gray-900 my-3 line-clamp-2">
//                       {course.title}
//                     </h3>
                    
//                     {/* Instructor */}
//                     <div className="flex items-center mb-4">
//                       <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
//                       <span className="text-sm text-gray-600">{course.instructor}</span>
//                     </div>

//                     {/* Course Stats */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-4 text-sm text-gray-500">
//                         <div dir={i18n.language=="ar"? "rtl":"ltr"} className="flex items-center">
//                           <Users className="w-4 h-4 mr-1" />
//                           <span>{course.students}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <MessageSquare className="w-4 h-4 mr-1" />
//                           <span>{course.comments}</span>
//                         </div>
//                       </div>
//                       {/* view */}
                   
//                                           <Link to={`/courses/${course.id}`} className="text-custom-yellow underline text-right">{t("course.viewDetails")}</Link>

//                     </div>
//                   </div>
//                 </div>
//   )
// }

// import React, { use } from 'react';
// import SubscriptionModal from './SubscriptionModal';
// import { Link } from 'react-router-dom';
// import { MessageSquare, Users } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';

// export default function CourseCard({ course, renderStars }) {
//   const { t, i18n } = useTranslation();
//   let dispatch = useDispatch();
//   const [packageId, setPackageId] = React.useState(null);

//   console.log({packageId});
  

//   let {subscription}= useSelector((state) => state.api);


//  const handlesubscriptionApi = async (courseId) => {
//     let response = await dispatch(apiRequest({
//       entity: "subscription",
//       url: `api/sub_scriptions/subscriptions`,
//       method: "POST",
//       data: formData,
//       headers: {
//         "Accept-Language": localStorage.getItem('language') || 'en',
//         "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
//       },
//     }));
//   }

  
  
  
//   return (
//     <div className={`border border-gray-300 rounded-lg min-h-[420px] ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
//       {/* Course Image */}
//       <div className="relative">
//         <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg">
//           <img src={course.image} alt={course.price+ 1} />
//         </div>
//         {/* Price Badge */}
//         <div className={`absolute top-4 ${i18n.language === 'ar' ? 'right-4' : 'left-4'}`}>
//           <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//             course.price === 'FREE' 
//               ? 'bg-green-500 text-white' 
//               : 'bg-cyan-500 text-white'
//           }`}>
//             {course.price === 'FREE' ? t('course.free') : course.price}
//           </span>
//         </div>
//         <div className={`absolute top-4 ${i18n.language === 'ar' ? 'left-4' : 'right-4'}`}>
//           <SubscriptionModal setPackageId={setPackageId} />
//         </div>
//       </div>

//       {/* Course Content */}
//       <div className="p-6">
//         {/* Rating */}
//         <div className="flex items-center">
//           {renderStars(course.rating)}
//         </div>

//         <h3 className="text-lg font-semibold text-gray-900 my-3 line-clamp-2">
//           {course.name}
//         </h3>
        
//         {/* Instructor */}
//         <div className="flex items-center mb-4">
//           <div className={`w-6 h-6 bg-gray-300 rounded-full ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`}>
//             <img src={course.teacher_image} alt={course.name} />
//           </div>
//           <span className="text-sm text-gray-600">{course.teacher}</span>
//         </div>

//         {/* Course Stats */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4 text-sm text-gray-500">
//             <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="flex items-center">
//               <Users className="w-4 h-4" />
//               <span className={i18n.language === 'ar' ? 'mr-1' : 'ml-1'}>
//                 {course.views} {t('course.students')}
//               </span>
//             </div>
//             <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="flex items-center">
//               <MessageSquare className="w-4 h-4" />
//               <span className={i18n.language === 'ar' ? 'mr-1' : 'ml-1'}>
//                 {course.comments_count} {t('course.comments')}
//               </span>
//             </div>
//           </div>
          
//           {/* View Details Link */}
//           <Link 
//             to={`/courses/${course.id}`} 
//             className="text-custom-yellow underline"
//           >
//             {t("course.viewDetails")}
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { use } from 'react';
import SubscriptionModal from './SubscriptionModal';
import { Link } from 'react-router-dom';
import { MessageSquare, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

export default function CourseCard({ course, renderStars }) {
  const { t, i18n } = useTranslation();


 
  
  return (
    <div className={`border border-gray-300 rounded-lg min-h-[420px] ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Course Image */}
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg">
          <img src={course.image} alt={course.price+ 1} />
        </div>
        {/* Price Badge */}
        <div className={`absolute top-4 ${i18n.language === 'ar' ? 'right-4' : 'left-4'}`}>
          {course.subscriber==false ? 
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            course.price === 'FREE' 
              ? 'bg-green-500 text-white' 
              : 'bg-cyan-500 text-white'
          }`}>
            {course.price === 'FREE' ? t('course.free') : course.price + (i18n.language =="ar"?  "  جنيه  " : " EGP ")}
          </span>:""
          
        }
        </div>
        <div className={`absolute top-4 ${i18n.language === 'ar' ? 'left-4' : 'right-4'}`}>
          {course.subscriber==false ?<SubscriptionModal course={course} />  :        <div className="inline-block bg-green-700 text-white px-3 py-1 rounded-2xl my-3">
  {i18n.language === 'ar' ? "مفتوح" : "Open"}
</div>}   
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6 ">
        {/* Rating */}
        <div className="flex items-center">
          {renderStars(course.average_rating)}
        </div>

        <div className="inline-block bg-yellow-100 px-3 py-1 rounded-2xl my-3">
  {course.grade}
</div>

        <h3 className="text-lg font-semibold text-gray-900 my-3 line-clamp-2">
          {course.name}
        </h3>
        
        {/* Instructor */}
        <div className="flex items-center mb-4">
          <div className={`w-6 h-6 bg-gray-300 rounded-full ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`}>
            <img src={course.teacher_image} alt={course.name} />
          </div>
          <span className="text-sm text-gray-600">{course.teacher}</span>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="flex items-center">
              <Users className="w-4 h-4" />
              <span className={i18n.language === 'ar' ? 'mr-1' : 'ml-1'}>
                {course.views} {t('course.students')}
              </span>
            </div>
            <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="flex items-center">
              <MessageSquare className="w-4 h-4" />
              <span className={i18n.language === 'ar' ? 'mr-1' : 'ml-1'}>
                {course.comments_count} {t('course.comments')}
              </span>
            </div>
          </div>
          
          {/* View Details Link */}
                    {course.subscriber==0 ?"" :        <>
 
          <Link 
            to={`/class-specific-lesson/${course.id}`} 
            className="text-custom-yellow underline"
          >
            {t("course.viewDetails")}
          </Link>
</>} 
        </div>
      </div>
    </div>
  );
}