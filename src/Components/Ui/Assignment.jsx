// import { Clock, Calendar, FileText, AlertCircle } from "lucide-react";

// export default function AssignmentSubmission() {
//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       {/* Header */}
//       <div className="text-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">إبدأ حل الواجب</h1>
//         <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
//       </div>

//       {/* Assignment Info */}
//       <div className="bg-blue-50 p-4 rounded-lg mb-6">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center">
//             <FileText className="w-5 h-5 text-yellow-600 mr-2" />
//             <span className="font-medium text-gray-700">الأسئلة</span>
//           </div>
//           <span className="bg-blue-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">30</span>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <Clock className="w-5 h-5 text-yellow-600 mr-2" />
//             <span className="font-medium text-gray-700">اخر موعد للتسليم</span>
//           </div>
//           <div className="flex items-center">
//             <Calendar className="w-5 h-5 text-yellow-600 mr-2" />
//             <span className="text-gray-600">10:00 صباحاً</span>
//           </div>
//         </div>
//       </div>

//       {/* Warning */}
//       <div className="flex items-start bg-yellow-50 p-3 rounded-lg mb-6">
//         <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
//         <p className="text-sm text-yellow-700">
//           يرجى الانتباه إلى أن التأخير في التسليم قد يؤثر على درجتك النهائية
//         </p>
//       </div>

//       {/* Start Button */}
//       <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
//         <span className="ml-2">بدء</span>
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//         </svg>
//       </button>
//     </div>
//   );
// }


import { Clock, Calendar, FileText, AlertCircle, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AssignmentSubmission() {
  return (
    <div className="max-w-md  p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Start Assignment</h1>
        <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
      </div>

      {/* Assignment Info */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="font-medium text-gray-700">Questions</span>
          </div>
          <span className="bg-blue-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">30</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="font-medium text-gray-700">Submission Deadline</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="text-gray-600">10:00 AM</span>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="flex items-start bg-yellow-50 p-3 rounded-lg mb-6">
        <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-yellow-700">
          Please note that late submission may affect your final grade
        </p>
      </div>

      {/* Start Button */}
      <Link to={`/assignmentDetails/1`} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex gap-2 items-center justify-center">
        <span className="ml-2">Start</span>
       <MoveRight className="w-6 h-6 text-white" />
      </Link>
    </div>
  );
}