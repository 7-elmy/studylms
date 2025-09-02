




import React, { use } from 'react';
import SubscriptionModal from './SubscriptionModal';
import { Link } from 'react-router-dom';
import { MessageSquare, Users, Star, Clock, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

export default function CourseCard({ course, renderStars }) {
  const { t, i18n } = useTranslation();

  return (
    <div className={`group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 min-h-[480px] ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Course Image */}
      <div className="relative overflow-hidden">
        <div className="w-full h-52 bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-xl">
          <img 
            src={course.image} 
            alt={course.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Price Badge */}
        <div className={`absolute top-4 ${i18n.language === 'ar' ? 'right-4' : 'left-4'}`}>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
              course.price === 'FREE' 
                ? 'bg-green-500 text-white' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
            }`}>
              {course.price }  {(i18n.language === "ar" ? " جنيه " : " EGP ")}
            </span>
          {/* {course.subscriber === 1 ? (
          ) : null} */}
        </div>
        
        {/* Subscription Status */}
        <div className={`absolute top-4 ${i18n.language === 'ar' ? 'left-4' : 'right-4'}`}>
          {course.subscriber === 0 ? (
            <SubscriptionModal course={course} />
          ) : (
            <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold">
              {i18n.language === 'ar' ? "مفتوح" : "Open"}
            </div>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/70 text-white px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm">
            {course.category || "Course"}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Rating and Grade */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {renderStars(course.average_rating || 0)}
            <span className="text-sm text-gray-500 ml-2">
              ({course.average_rating || 0})
            </span>
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
            {course.grade}
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
          {course.name}
        </h3>
        
        {/* Instructor */}
        <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
          <div className={`w-8 h-8 bg-gray-300 rounded-full ${i18n.language === 'ar' ? 'mx-3' : 'mx-3'} overflow-hidden flex items-center justify-center`}>
            {course.teacher_image ? (
              <img 
                src={course.teacher_image } 
                alt={course.teacher} 
                className="w-full h-full object-cover"
              />
            ) : (
              <Users className="w-4 h-4 text-gray-600" />
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">{t('course.instructor')}</p>
            <p className="text-sm font-medium text-gray-900">{course.teacher || t('course.notSpecified')}</p>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2 text-blue-500" />
            <span>{course.views} {t('course.students')}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MessageSquare className="w-4 h-4 mr-2 text-green-500" />
            <span>{course.comments_count} {t('course.comments')}</span>
          </div>
        </div>

        {/* View Details Link */}
        {course.subscriber !== 0 && (
          <div className="border-t border-gray-100 pt-4">
            <Link 
              to={`/class-specific-lesson/${course.id}`} 
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {t("course.viewDetails")}
              <BookOpen className="w-4 h-4 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}