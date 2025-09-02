
// import { Clock, Calendar, FileText, AlertCircle, MoveRight } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function QuizSubmission({ courseDetails }) {
//   // Safely access nested data with optional chaining and provide fallbacks
//   const lessons = courseDetails?.data?.data?.lessons || [];
  
//   // Format time function
//   const formatTime = (dateString) => {
//     if (!dateString) return "Not specified";
    
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } catch (error) {
//       return "Invalid time";
//     }
//   };

//   return (
//     <div className="w-full">
//       {lessons.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full">
//           {lessons.map((lesson, index) => (
//             lesson?.tests?.map((test) => (
//               <div key={`${lesson.id}-${test.id}`}>
//                 {console.log({test})}
//                 <div className="w-full p-6 bg-white rounded-lg shadow-md">
//                   {/* Header */}
//                   <div className="text-center mb-6">
//                     <h1 className="text-2xl font-bold text-gray-800 mb-2">
//                       {test.name || "Unnamed Quiz"}
//                     </h1>
//                     <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
//                   </div>

//                   {/* Assignment Info */}
//                   <div className="bg-blue-50 p-4 rounded-lg mb-6">
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="flex items-center">
//                         <FileText className="w-5 h-5 text-yellow-600 mr-2" />
//                         <span className="font-medium text-gray-700">Status</span>
//                       </div>
//                       <span
//                         className={`${
//                           test.status === 0
//                             ? "bg-blue-100 text-yellow-800"
//                             : "text-green-800 bg-green-100"
//                         } px-3 py-1 rounded-full text-sm font-medium`}
//                       >
//                         {test.status === 0 ? "غير مسموح به الان" : "مسموح به"}
//                       </span>
//                     </div>

//                     <div className="flex items-center justify-between mb-2">
//                       <div className="flex items-center">
//                         <Clock className="w-5 h-5 text-yellow-600 mr-2" />
//                         <span className="font-medium text-gray-700">Start Time</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Calendar className="w-5 h-5 text-yellow-600 mr-2" />
//                         <span className="text-gray-600">
//                           {formatTime(test.start_time)}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <Clock className="w-5 h-5 text-yellow-600 mr-2" />
//                         <span className="font-medium text-gray-700">End Time</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Calendar className="w-5 h-5 text-yellow-600 mr-2" />
//                         <span className="text-gray-600">
//                           {formatTime(test.end_time)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Warning */}
//                   <div className="flex items-start bg-yellow-50 p-3 rounded-lg mb-6">
//                     <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
//                     <p className="text-sm text-yellow-700">
//                       Please note that late submission may affect your final grade
//                     </p>
//                   </div>

//                   {/* Start Button */}
//                   {test.status !== 0 && (
//                     <Link
//                       to={`/QuizDetails/${test.id}`}
//                       className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex gap-2 items-center justify-center"
//                     >
//                       <span className="ml-2">Start</span>
//                       <MoveRight className="w-6 h-6 text-white" />
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             ))
//           ))}
//         </div>
//       ) : (
//         <div className="col-span-full text-center py-10">
//           <p className="text-gray-500">No quizzes available at this time.</p>
//         </div>
//       )}
//     </div>
//   );
// } 

import { Clock, Calendar, FileText, AlertCircle, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function QuizSubmission({ courseDetails }) {
  const { t } = useTranslation();

  // Safely access nested data with optional chaining and provide fallbacks
  const lessons = courseDetails?.data?.data?.lessons || [];
  
  // Format time function
  const formatTime = (dateString) => {
    if (!dateString) return t("quiz.notSpecified");
    
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (error) {
      return t("quiz.invalidTime");
    }
  };

  return (
    <div className="w-full">
      {lessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full">
          {lessons.map((lesson) =>
            lesson?.tests?.map((test) => (
              <div key={`${lesson.id}-${test.id}`}>
                <div className="w-full p-6 bg-white rounded-lg shadow-md">
                  {/* Header */}
                  {console.log({test})}
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      {test.name || t("quiz.unnamedQuiz")}
                    </h1>
                    <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
                  </div>

                  {/* Assignment Info */}
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="font-medium text-gray-700">
                          {t("quiz.status")}
                        </span>
                      </div>
                      <span
                        className={`${
                          test.status === 0
                            ? "bg-blue-100 text-yellow-800"
                            : "text-green-800 bg-green-100"
                        } px-3 py-1 rounded-full text-sm font-medium`}
                      >
                        {test.status === 0
                          ? t("quiz.notAllowed")
                          : t("quiz.allowed")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="font-medium text-gray-700">
                          {t("quiz.startTime")}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="text-gray-600">
                          {formatTime(test.start_time)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="font-medium text-gray-700">
                          {t("quiz.endTime")}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="text-gray-600">
                          {formatTime(test.end_time)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="flex items-start bg-yellow-50 p-3 rounded-lg mb-6">
                    <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-yellow-700">
                      {t("quiz.warning")}
                    </p>
                  </div>

                  {/* Start Button */}
                  {test.status !== 0 && (
                    <Link
                      to={`/QuizDetails/${test.id}`}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex gap-2 items-center justify-center"
                    >
                      <span className="ml-2">{t("quiz.startBtn")}</span>
                      <MoveRight className="w-6 h-6 text-white" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">{t("quiz.noQuizzes")}</p>
        </div>
      )}
    </div>
  );
}
