// //with arabic

// import { useState } from 'react';

// export default function AssignmentDetails() {

//     // Sample questions data
//   const questions = [
//     {
//       id: 1,
//       text: "لماذا تظهر السماء باللون الأزرق خلال النهار ولكن تتحول إلى اللون الأحمر عند غروب الشمس؟",
//       answers: ["إجابة 1", "إجابة 2", "إجابة 3", "إجابة 4"]
//     },
//     {
//       id: 2,
//       text: "ما هي ظاهرة انكسار الضوء؟",
//       answers: ["إجابة 1", "إجابة 2", "إجابة 3", "إجابة 4"]
//     },
//     {
//       id: 3,
//       text: "كيف تتكون قوس قزح؟",
//       answers: ["إجابة 1", "إجابة 2", "إجابة 3", "إجابة 4"]
//     },
//     {
//       id: 4,
//       text: "ما الفرق بين الانعكاس والانكسار؟",
//       answers: ["إجابة 1", "إجابة 2", "إجابة 3", "إجابة 4"]
//     },
//     {
//       id: 5,
//       text: "كيف يعمل العدسات المكبرة؟",
//       answers: ["إجابة 1", "إجابة 2", "إجابة 3", "إجابة 4"]
//     }
//   ];

//   // State to track selected answers for each question
//   const [selectedAnswers, setSelectedAnswers] = useState({});

//   const handleAnswerSelect = (questionId, answerIndex) => {
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [questionId]: answerIndex
//     }));
//   };

//   // Check if all questions are answered
//   const allQuestionsAnswered = Object.keys(selectedAnswers).length === questions.length;

//   return (
//     <div>
//       <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       {/* Breadcrumb */}
//       <div className="text-sm text-gray-600 mb-6">
//         <span className="text-yellow-600">الرئيسية</span> / 
//         <span className="text-yellow-600"> الخصص الدراسية</span> / 
//         <span> الواجب</span>
//       </div>

//       {/* Assignment Title */}
//       <h1 className="text-2xl font-bold text-gray-800 mb-2">الواجب</h1>
//       <h2 className="text-xl font-semibold text-gray-700 mb-6">الدخترات الثالث - الوحدة الدولي المنهج كامل</h2>

//       {/* Questions List */}
//       {questions.map((question) => (
//         <div key={question.id} className="mb-8">
//           <h3 className="text-lg font-medium text-gray-800 mb-4">السؤال {question.id}</h3>
//           <p className="text-gray-700 mb-6">{question.text}</p>
          
//           {/* Answers */}
//           <div className="space-y-3">
//             {question.answers.map((answer, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleAnswerSelect(question.id, index)}
//                 className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
//                   selectedAnswers[question.id] === index
//                     ? 'bg-yellow-100 border-yellow-300'
//                     : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 mr-3">
//                     {index + 1}
//                   </span>
//                   <span>{answer}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}

//       {/* Submit Button */}
//       <button
//         className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
//           allQuestionsAnswered
//             ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
//             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//         }`}
//         disabled={!allQuestionsAnswered}
//       >
//         تسليم الواجب
//       </button>
//     </div>
//     </div>
//   );
// }

//-------------------------------------------------------------------------------------------------------------------



import { useState } from 'react';
import DynamicBreadcrumb from '../../Components/Ui/DynamicBreadcrumb';



export default function AssignmentDetails() {
  // Sample questions data
  const questions = [
    {
      id: 1,
      text: "Why does the sky appear blue during the day but turns red at sunset?",
      answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"]
    },
    {
      id: 2,
      text: "What is the phenomenon of light refraction?",
      answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"]
    },
    {
      id: 3,
      text: "How is a rainbow formed?",
      answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"]
    },
    {
      id: 4,
      text: "What is the difference between reflection and refraction?",
      answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"]
    },
    {
      id: 5,
      text: "How do magnifying lenses work?",
      answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"]
    }
  ];

  // State to track selected answers for each question
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  // Check if all questions are answered
  const allQuestionsAnswered = Object.keys(selectedAnswers).length === questions.length;

  return (
   <div>

<DynamicBreadcrumb
MainTitle={"Assignment : Third Preparatory - Complete International Curriculum"}
BreadCrumbs={[
    {label:"Home" , href:"/home"},
    {label:"course Name" , href:"/courseId"},
    {label:"Assignment" , href:"/assignmentDetails"},


]}
/>
     <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg ">
      {/* Breadcrumb */}
      {/* <div className="text-sm text-gray-600 mb-6">
        <span className="text-yellow-600">Home</span> / 
        <span className="text-yellow-600"> Courses</span> / 
        <span> Assignment</span>
      </div> */}

      {/* Assignment Title */}
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-2">Assignment</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Third Preparatory - Complete International Curriculum</h2> */}
      {/* Questions List */}
      {questions.map((question) => (
        <div key={question.id} className="mb-8  max-w-3xl mx-auto">
          <h3 className="text-lg font-medium text-yellow-800 mb-4 ">Question {question.id}</h3>
          <p className="text-gray-700 mb-6">{question.text}</p>
          
          {/* Answers */}
          <div className="space-y-3 ">
            {question.answers.map((answer, index) => (
              <div
                key={index}
                onClick={() => handleAnswerSelect(question.id, index)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedAnswers[question.id] === index
                    ? 'bg-yellow-400 border-yellow-300'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 mr-3">
                    {index + 1}
                  </span>
                  <span>{answer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Submit Button */}
      <div className='flex justify-center items-center'>
      <button
        className={`w-full  max-w-3xl  py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
          allQuestionsAnswered
            ? 'bg-yellow-600 hover:bg-yellow-800 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!allQuestionsAnswered}
      >
        Submit 
      </button>

      </div>
    </div>
   </div>
  );
}