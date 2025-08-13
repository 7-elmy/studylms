

// import { useState } from 'react';
// import { CheckCircle, XCircle, ArrowLeft, ArrowRight, Flag, AlertTriangle, FileText, Calendar, User, BookOpen } from 'lucide-react';
// import DynamicBreadcrumb from '../../Components/Ui/DynamicBreadcrumb';

// export default function AssignmentDetails() {
//   // Enhanced questions data with more realistic content
//   const questions = [
//     {
//       id: 1,
//       text: "Why does the sky appear blue during the day but turns red at sunset?",
//       answers: [
//         "Blue light has shorter wavelengths and scatters more in the atmosphere",
//         "The sun emits more blue light during the day",
//         "Earth's magnetic field affects light colors",
//         "Oxygen molecules absorb red light during the day"
//       ],
//       correctAnswer: 0,
//       explanation: "Blue light has a shorter wavelength and gets scattered more by particles in the atmosphere, making the sky appear blue during the day."
//     },
//     {
//       id: 6,
//       text: "Why does the sky appear blue during the day but turns red at sunset?",
//       answers: [
//         "Blue light has shorter wavelengths and scatters more in the atmosphere",
//         "The sun emits more blue light during the day",
//         "Earth's magnetic field affects light colors",
//         "Oxygen molecules absorb red light during the day"
//       ],
//       correctAnswer: 0,
//       explanation: "Blue light has a shorter wavelength and gets scattered more by particles in the atmosphere, making the sky appear blue during the day."
//     },
//     {
//       id: 7,
//       text: "Why does the sky appear blue during the day but turns red at sunset?",
//       answers: [
//         "Blue light has shorter wavelengths and scatters more in the atmosphere",
//         "The sun emits more blue light during the day",
//         "Earth's magnetic field affects light colors",
//         "Oxygen molecules absorb red light during the day"
//       ],
//       correctAnswer: 0,
//       explanation: "Blue light has a shorter wavelength and gets scattered more by particles in the atmosphere, making the sky appear blue during the day."
//     },
//     {
//       id: 2,
//       text: "What is the phenomenon of light refraction?",
//       answers: [
//         "Light bouncing off surfaces",
//         "Light bending when passing through different mediums",
//         "Light being absorbed by materials",
//         "Light splitting into different colors"
//       ],
//       correctAnswer: 1,
//       explanation: "Refraction occurs when light passes from one medium to another with different optical densities, causing the light to bend."
//     },
//     {
//       id: 3,
//       text: "How is a rainbow formed?",
//       answers: [
//         "Sunlight reflecting off water surfaces",
//         "Light refracting and reflecting inside water droplets",
//         "Clouds filtering different colors of light",
//         "Atmospheric pressure creating color bands"
//       ],
//       correctAnswer: 1,
//       explanation: "Rainbows form when sunlight enters water droplets, refracts, reflects off the back of the droplet, and refracts again as it exits."
//     },
//     {
//       id: 4,
//       text: "What is the difference between reflection and refraction?",
//       answers: [
//         "Reflection changes light color, refraction doesn't",
//         "Reflection bounces light back, refraction bends light through materials",
//         "Reflection only works with mirrors, refraction with glass",
//         "There is no difference between them"
//       ],
//       correctAnswer: 1,
//       explanation: "Reflection occurs when light bounces off a surface, while refraction occurs when light bends as it passes through different materials."
//     },
//     {
//       id: 5,
//       text: "How do magnifying lenses work?",
//       answers: [
//         "They increase the amount of light entering the eye",
//         "They use convex lenses to bend light rays and create enlarged images",
//         "They filter out unwanted light frequencies",
//         "They reflect light at different angles"
//       ],
//       correctAnswer: 1,
//       explanation: "Magnifying lenses use convex (converging) lenses that bend light rays to create a virtual, enlarged image of the object."
//     }
//   ];

//   // Assignment metadata
//   const assignmentInfo = {
//     title: "Arabic - Light and Optics Assignment",
//     course: "Third Preparatory - Complete International Curriculum",
//     dueDate: "2024-08-15",
//     totalQuestions: questions.length,
//     instructor: "Dr. Mostafa Ahmed",
//     points: 50
//   };

//   // State management
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
//   const [viewMode, setViewMode] = useState('single'); // 'single' or 'all'

//   const handleAnswerSelect = (questionId, answerIndex) => {
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [questionId]: answerIndex
//     }));
//   };

//   const handleFlagQuestion = () => {
//     const newFlagged = new Set(flaggedQuestions);
//     if (newFlagged.has(currentQuestion)) {
//       newFlagged.delete(currentQuestion);
//     } else {
//       newFlagged.add(currentQuestion);
//     }
//     setFlaggedQuestions(newFlagged);
//   };

//   const goToQuestion = (questionIndex) => {
//     setCurrentQuestion(questionIndex);
//     setViewMode('single');
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const previousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const getAnsweredCount = () => {
//     return Object.keys(selectedAnswers).length;
//   };

//   const calculateScore = () => {
//     let correct = 0;
//     questions.forEach((question, index) => {
//       if (selectedAnswers[question.id] === question.correctAnswer) {
//         correct++;
//       }
//     });
//     return {
//       correct,
//       total: questions.length,
//       percentage: Math.round((correct / questions.length) * 100),
//       points: Math.round((correct / questions.length) * assignmentInfo.points)
//     };
//   };

//   const handleSubmitAssignment = () => {
//     setIsSubmitted(true);
//     setShowResults(true);
//     setShowConfirmSubmit(false);
//   };

//   const getQuestionStatus = (questionIndex) => {
//     const questionId = questions[questionIndex].id;
//     if (selectedAnswers.hasOwnProperty(questionId)) {
//       if (isSubmitted) {
//         return selectedAnswers[questionId] === questions[questionIndex].correctAnswer ? 'correct' : 'incorrect';
//       }
//       return 'answered';
//     }
//     return flaggedQuestions.has(questionIndex) ? 'flagged' : 'unanswered';
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'correct': return 'bg-green-500 text-white';
//       case 'incorrect': return 'bg-red-500 text-white';
//       case 'answered': return 'bg-yellow-500 text-white';
//       case 'flagged': return 'bg-blue-500 text-white';
//       default: return 'bg-gray-200 text-gray-700 hover:bg-gray-300';
//     }
//   };

//   // Results View
//   if (showResults) {
//     const score = calculateScore();
//     return (
//       <div>
//         <DynamicBreadcrumb
//           MainTitle={assignmentInfo.course}
//           BreadCrumbs={[
//             {label:"Home" , href:"/home"},
//             {label:"course Name" , href:"/courseId"},
//             {label:"Assignment Results" , href:"/assignmentDetails"},
//           ]}
//         />
        
//         <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
//           <div className="text-center mb-8">
//             <div className="mb-4">
//               {score.percentage >= 80 ? (
//                 <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//               ) : score.percentage >= 60 ? (
//                 <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
//               ) : (
//                 <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//               )}
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Assignment Completed!</h1>
//             <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
            
//             <div className="bg-gray-50 p-6 rounded-lg mb-6">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-900">{score.correct}</div>
//                   <div className="text-gray-600">Correct</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-900">{score.total - score.correct}</div>
//                   <div className="text-gray-600">Incorrect</div>
//                 </div>
//                 <div className="text-center">
//                   <div className={`text-3xl font-bold ${score.percentage >= 80 ? 'text-green-600' : score.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
//                     {score.percentage}%
//                   </div>
//                   <div className="text-gray-600">Score</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-yellow-600">{score.points}</div>
//                   <div className="text-gray-600">Points</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Review Answers */}
//           <div className="space-y-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Review Your Answers</h2>
//             {questions.map((question, index) => {
//               const userAnswer = selectedAnswers[question.id];
//               const isCorrect = userAnswer === question.correctAnswer;
              
//               return (
//                 <div key={question.id} className="border border-gray-200 rounded-lg p-4">
//                   <div className="flex items-start justify-between mb-3">
//                     <h3 className="font-medium text-yellow-800">Question {index + 1}</h3>
//                     {isCorrect ? (
//                       <CheckCircle className="w-5 h-5 text-green-500" />
//                     ) : (
//                       <XCircle className="w-5 h-5 text-red-500" />
//                     )}
//                   </div>
                  
//                   <p className="text-gray-700 mb-4">{question.text}</p>
                  
//                   <div className="space-y-2 mb-4">
//                     {question.answers.map((answer, optionIndex) => (
//                       <div
//                         key={optionIndex}
//                         className={`p-3 rounded border ${
//                           optionIndex === question.correctAnswer
//                             ? 'bg-green-50 border-green-300 text-green-800'
//                             : optionIndex === userAnswer && !isCorrect
//                             ? 'bg-red-50 border-red-300 text-red-800'
//                             : 'bg-gray-50 border-gray-200'
//                         }`}
//                       >
//                         <div className="flex items-center">
//                           <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 mr-3 text-sm">
//                             {optionIndex + 1}
//                           </span>
//                           {answer}
//                           {optionIndex === question.correctAnswer && (
//                             <span className="ml-auto text-green-600 font-medium">✓ Correct</span>
//                           )}
//                           {optionIndex === userAnswer && !isCorrect && (
//                             <span className="ml-auto text-red-600 font-medium">✗ Your answer</span>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
//                   {question.explanation && (
//                     <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
//                       <p className="text-blue-800 text-sm">
//                         <strong>Explanation:</strong> {question.explanation}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
          
//           <div className="mt-8 text-center">
//             <button
//               onClick={() => window.location.reload()}
//               className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
//             >
//               Retake Assignment
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Check if all questions are answered
//   const allQuestionsAnswered = getAnsweredCount() === questions.length;

//   return (
//     <div>
//       <DynamicBreadcrumb
//         MainTitle={assignmentInfo.course}
//         BreadCrumbs={[
//           {label:"Home" , href:"/home"},
//           {label:"course Name" , href:"/courseId"},
//           {label:"Assignment" , href:"/assignmentDetails"},
//         ]}
//       />

//       <div className="max-w-7xl mx-auto p-6">
//         {/* Assignment Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800 mb-2">{assignmentInfo.title}</h1>
//               <div className="w-16 h-1 bg-yellow-500 mb-4"></div>
//               <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                 <div className="flex items-center">
//                   <User className="w-4 h-4 mr-1" />
//                   {assignmentInfo.instructor}
//                 </div>
//                 <div className="flex items-center">
//                   <FileText className="w-4 h-4 mr-1" />
//                   {assignmentInfo.totalQuestions} Questions
//                 </div>
//                 <div className="flex items-center">
//                   <BookOpen className="w-4 h-4 mr-1" />
//                   {assignmentInfo.points} Points
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
//                 <Calendar className="w-5 h-5 text-blue-600 mr-2" />
//                 <span className="text-blue-700 text-sm">Due: {new Date(assignmentInfo.dueDate).toLocaleDateString()}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Main Content Area */}
//           <div className="lg:col-span-3">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               {/* View Toggle */}
//               <div className="flex justify-between items-center mb-6">
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => setViewMode('single')}
//                     className={`px-4 py-2 rounded-lg transition duration-200 ${
//                       viewMode === 'single' 
//                         ? 'bg-yellow-500 text-white' 
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     Single Question
//                   </button>
//                   <button
//                     onClick={() => setViewMode('all')}
//                     className={`px-4 py-2 rounded-lg transition duration-200 ${
//                       viewMode === 'all' 
//                         ? 'bg-yellow-500 text-white' 
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     All Questions
//                   </button>
//                 </div>

//                 {viewMode === 'single' && (
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={handleFlagQuestion}
//                       className={`p-2 rounded-lg transition duration-200 ${
//                         flaggedQuestions.has(currentQuestion)
//                           ? 'bg-blue-500 text-white'
//                           : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//                       }`}
//                     >
//                       <Flag className="w-5 h-5" />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {viewMode === 'single' ? (
//                 // Single Question View
//                 <div>
//                   {/* Progress Bar */}
//                   <div className="mb-6">
//                     <div className="flex justify-between text-sm text-gray-600 mb-2">
//                       <span>Question {currentQuestion + 1} of {questions.length}</span>
//                       <span>{getAnsweredCount()} answered</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
//                         style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
//                       ></div>
//                     </div>
//                   </div>

//                   {/* Question */}
//                   <div className="mb-8">
//                     <h3 className="text-lg font-medium text-yellow-800 mb-4">
//                       Question {currentQuestion + 1}
//                     </h3>
//                     <p className="text-gray-700 mb-6">{questions[currentQuestion].text}</p>
                    
//                     <div className="space-y-3">
//                       {questions[currentQuestion].answers.map((answer, index) => (
//                         <div
//                           key={index}
//                           onClick={() => handleAnswerSelect(questions[currentQuestion].id, index)}
//                           className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
//                             selectedAnswers[questions[currentQuestion].id] === index
//                               ? 'bg-yellow-400 border-yellow-300'
//                               : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//                           }`}
//                         >
//                           <div className="flex items-center">
//                             <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 mr-3">
//                               {index + 1}
//                             </span>
//                             <span>{answer}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Navigation */}
//                   <div className="flex justify-between items-center">
//                     <button
//                       onClick={previousQuestion}
//                       disabled={currentQuestion === 0}
//                       className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
//                     >
//                       <ArrowLeft className="w-5 h-5 mr-2" />
//                       Previous
//                     </button>

//                     <div className="flex space-x-3">
//                       {currentQuestion === questions.length - 1 ? (
//                         <button
//                           onClick={() => setShowConfirmSubmit(true)}
//                           className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
//                         >
//                           Submit Assignment
//                         </button>
//                       ) : (
//                         <button
//                           onClick={nextQuestion}
//                           className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center"
//                         >
//                           Next
//                           <ArrowRight className="w-5 h-5 ml-2" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 // All Questions View
//                 <div>
//                   {questions.map((question) => (
//                     <div key={question.id} className="mb-8 pb-8 border-b border-gray-200 last:border-b-0">
//                       <h3 className="text-lg font-medium text-yellow-800 mb-4">Question {question.id}</h3>
//                       <p className="text-gray-700 mb-6">{question.text}</p>
                      
//                       <div className="space-y-3">
//                         {question.answers.map((answer, index) => (
//                           <div
//                             key={index}
//                             onClick={() => handleAnswerSelect(question.id, index)}
//                             className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
//                               selectedAnswers[question.id] === index
//                                 ? 'bg-yellow-400 border-yellow-300'
//                                 : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//                             }`}
//                           >
//                             <div className="flex items-center">
//                               <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 mr-3">
//                                 {index + 1}
//                               </span>
//                               <span>{answer}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}

//                   {/* Submit Button for All Questions View */}
//                   <div className='flex justify-center items-center mt-8'>
//                     <button
//                       onClick={() => setShowConfirmSubmit(true)}
//                       className={`w-full max-w-3xl py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
//                         allQuestionsAnswered
//                           ? 'bg-yellow-600 hover:bg-yellow-800 text-white'
//                           : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       }`}
//                       disabled={!allQuestionsAnswered}
//                     >
//                       Submit Assignment
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Question Navigator Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-6">
//               <h3 className="font-medium text-gray-800 mb-4">Questions Overview</h3>
              
//               {/* Progress Summary */}
//               <div className="bg-gray-50 p-3 rounded-lg mb-4">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-yellow-600">{getAnsweredCount()}/{questions.length}</div>
//                   <div className="text-sm text-gray-600">Completed</div>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
//                 {questions.map((question, index) => {
//                   const status = getQuestionStatus(index);
//                   return (
//                     <button
//                       key={question.id}
//                       onClick={() => goToQuestion(index)}
//                       className={`relative w-10 h-10 rounded text-sm font-medium transition duration-200 ${getStatusColor(status)} ${
//                         currentQuestion === index && viewMode === 'single' ? 'ring-2 ring-blue-400' : ''
//                       }`}
//                     >
//                       {index + 1}
//                       {flaggedQuestions.has(index) && (
//                         <Flag className="w-3 h-3 absolute -top-1 -right-1 text-blue-600" />
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* Legend */}
//               <div className="space-y-2 text-xs mb-4">
//                 <div className="flex items-center">
//                   <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
//                   <span>Answered</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
//                   <span>Flagged</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
//                   <span>Not answered</span>
//                 </div>
//               </div>

//               {/* Quick Submit */}
//               <button
//                 onClick={() => setShowConfirmSubmit(true)}
//                 className={`w-full py-2 px-4 rounded-lg font-medium transition duration-200 ${
//                   allQuestionsAnswered
//                     ? 'bg-green-500 hover:bg-green-600 text-white'
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//                 disabled={!allQuestionsAnswered}
//               >
//                 Submit Assignment
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Confirm Submit Modal */}
//       {showConfirmSubmit && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Submit Assignment?</h3>
//             <p className="text-gray-600 mb-6">
//               You have answered {getAnsweredCount()} out of {questions.length} questions. 
//               {!allQuestionsAnswered && " Some questions remain unanswered."} Are you sure you want to submit your assignment?
//             </p>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setShowConfirmSubmit(false)}
//                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmitAssignment}
//                 className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from 'react';
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, Flag, AlertTriangle, FileText, Calendar, User, BookOpen } from 'lucide-react';
import DynamicBreadcrumb from '../../Components/Ui/DynamicBreadcrumb';

export default function AssignmentDetails() {
  // Enhanced questions data with more realistic content
  const questions = [
    {
      id: 1,
      text: "Why does the sky appear blue during the day but turns red at sunset?",
      answers: [
        "Blue light has shorter wavelengths and scatters more in the atmosphere",
        "The sun emits more blue light during the day",
        "Earth's magnetic field affects light colors",
        "Oxygen molecules absorb red light during the day"
      ],
      correctAnswer: 0,
      explanation: "Blue light has a shorter wavelength and gets scattered more by particles in the atmosphere, making the sky appear blue during the day."
    },
    {
      id: 2,
      text: "What is the phenomenon of light refraction?",
      answers: [
        "Light bouncing off surfaces",
        "Light bending when passing through different mediums",
        "Light being absorbed by materials",
        "Light splitting into different colors"
      ],
      correctAnswer: 1,
      explanation: "Refraction occurs when light passes from one medium to another with different optical densities, causing the light to bend."
    },
    {
      id: 3,
      text: "How is a rainbow formed?",
      answers: [
        "Sunlight reflecting off water surfaces",
        "Light refracting and reflecting inside water droplets",
        "Clouds filtering different colors of light",
        "Atmospheric pressure creating color bands"
      ],
      correctAnswer: 1,
      explanation: "Rainbows form when sunlight enters water droplets, refracts, reflects off the back of the droplet, and refracts again as it exits."
    },
    {
      id: 4,
      text: "What is the difference between reflection and refraction?",
      answers: [
        "Reflection changes light color, refraction doesn't",
        "Reflection bounces light back, refraction bends light through materials",
        "Reflection only works with mirrors, refraction with glass",
        "There is no difference between them"
      ],
      correctAnswer: 1,
      explanation: "Reflection occurs when light bounces off a surface, while refraction occurs when light bends as it passes through different materials."
    },
    {
      id: 5,
      text: "How do magnifying lenses work?",
      answers: [
        "They increase the amount of light entering the eye",
        "They use convex lenses to bend light rays and create enlarged images",
        "They filter out unwanted light frequencies",
        "They reflect light at different angles"
      ],
      correctAnswer: 1,
      explanation: "Magnifying lenses use convex (converging) lenses that bend light rays to create a virtual, enlarged image of the object."
    }
  ];

  // Assignment metadata
  const assignmentInfo = {
    title: "Physics - Light and Optics Assignment",
    course: "Third Preparatory - Complete International Curriculum",
    dueDate: "2024-08-15",
    totalQuestions: questions.length,
    instructor: "Dr. Sarah Ahmed",
    points: 50
  };

  // State management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'all'

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleFlagQuestion = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlaggedQuestions(newFlagged);
  };

  const goToQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    setViewMode('single');
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getAnsweredCount = () => {
    return Object.keys(selectedAnswers).length;
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
      points: Math.round((correct / questions.length) * assignmentInfo.points)
    };
  };

  const handleSubmitAssignment = () => {
    if (Object.keys(selectedAnswers).length !== questions.length) return;
    setIsSubmitted(true);
    setShowResults(true);
    setShowConfirmSubmit(false);
  };

  const getQuestionStatus = (questionIndex) => {
    const questionId = questions[questionIndex].id;
    if (selectedAnswers.hasOwnProperty(questionId)) {
      if (isSubmitted) {
        return selectedAnswers[questionId] === questions[questionIndex].correctAnswer ? 'correct' : 'incorrect';
      }
      return 'answered';
    }
    return flaggedQuestions.has(questionIndex) ? 'flagged' : 'unanswered';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'correct': return 'bg-green-500 text-white';
      case 'incorrect': return 'bg-red-500 text-white';
      case 'answered': return 'bg-yellow-500 text-white';
      case 'flagged': return 'bg-blue-500 text-white';
      default: return 'bg-gray-200 text-gray-700 hover:bg-gray-300';
    }
  };

  // Check if all questions are answered
  const allQuestionsAnswered = Object.keys(selectedAnswers).length === questions.length;

  // Results View
  if (showResults) {
    const score = calculateScore();
    return (
      <div>
        <DynamicBreadcrumb
          MainTitle={assignmentInfo.course}
          BreadCrumbs={[
            {label:"Home" , href:"/home"},
            {label:"course Name" , href:"/courseId"},
            {label:"Assignment Results" , href:"/assignmentDetails"},
          ]}
        />
        
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
          <div className="text-center mb-8">
            <div className="mb-4">
              {score.percentage >= 80 ? (
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              ) : score.percentage >= 60 ? (
                <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              ) : (
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Assignment Completed!</h1>
            <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{score.correct}</div>
                  <div className="text-gray-600">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{score.total - score.correct}</div>
                  <div className="text-gray-600">Incorrect</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${score.percentage >= 80 ? 'text-green-600' : score.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {score.percentage}%
                  </div>
                  <div className="text-gray-600">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{score.points}</div>
                  <div className="text-gray-600">Points</div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Answers */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Review Your Answers</h2>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-yellow-800">Question {index + 1}</h3>
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  
                  <p className="text-gray-700 mb-4">{question.text}</p>
                  
                  <div className="space-y-2 mb-4">
                    {question.answers.map((answer, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded border ${
                          optionIndex === question.correctAnswer
                            ? 'bg-green-50 border-green-300 text-green-800'
                            : optionIndex === userAnswer && !isCorrect
                            ? 'bg-red-50 border-red-300 text-red-800'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 mr-3 text-sm">
                            {optionIndex + 1}
                          </span>
                          {answer}
                          {optionIndex === question.correctAnswer && (
                            <span className="ml-auto text-green-600 font-medium">✓ Correct</span>
                          )}
                          {optionIndex === userAnswer && !isCorrect && (
                            <span className="ml-auto text-red-600 font-medium">✗ Your answer</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {question.explanation && (
                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                      <p className="text-blue-800 text-sm">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
            >
              Retake Assignment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DynamicBreadcrumb
        MainTitle={assignmentInfo.course}
        BreadCrumbs={[
          {label:"Home" , href:"/home"},
          {label:"course Name" , href:"/courseId"},
          {label:"Assignment" , href:"/assignmentDetails"},
        ]}
      />

      <div className="max-w-7xl mx-auto p-6">
        {/* Assignment Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{assignmentInfo.title}</h1>
              <div className="w-16 h-1 bg-yellow-500 mb-4"></div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {assignmentInfo.instructor}
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  {assignmentInfo.totalQuestions} Questions
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {assignmentInfo.points} Points
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-700 text-sm">Due: {new Date(assignmentInfo.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* View Toggle */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('single')}
                    className={`px-4 py-2 rounded-lg transition duration-200 ${
                      viewMode === 'single' 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Single Question
                  </button>
                  <button
                    onClick={() => setViewMode('all')}
                    className={`px-4 py-2 rounded-lg transition duration-200 ${
                      viewMode === 'all' 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All Questions
                  </button>
                </div>

                {viewMode === 'single' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleFlagQuestion}
                      className={`p-2 rounded-lg transition duration-200 ${
                        flaggedQuestions.has(currentQuestion)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      <Flag className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {viewMode === 'single' ? (
                // Single Question View
                <div>
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Question {currentQuestion + 1} of {questions.length}</span>
                      <span>{getAnsweredCount()} answered</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-yellow-800 mb-4">
                      Question {currentQuestion + 1}
                    </h3>
                    <p className="text-gray-700 mb-6">{questions[currentQuestion].text}</p>
                    
                    <div className="space-y-3">
                      {questions[currentQuestion].answers.map((answer, index) => (
                        <div
                          key={index}
                          onClick={() => handleAnswerSelect(questions[currentQuestion].id, index)}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                            selectedAnswers[questions[currentQuestion].id] === index
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

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={previousQuestion}
                      disabled={currentQuestion === 0}
                      className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Previous
                    </button>

                    <div className="flex space-x-3">
                      {currentQuestion === questions.length - 1 ? (
                        <button
                          onClick={() => allQuestionsAnswered && setShowConfirmSubmit(true)}
                          disabled={!allQuestionsAnswered}
                          className={`bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 ${
                            !allQuestionsAnswered ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          Submit Assignment
                        </button>
                      ) : (
                        <button
                          onClick={nextQuestion}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center"
                        >
                          Next
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // All Questions View
                <div>
                  {questions.map((question) => (
                    <div key={question.id} className="mb-8 pb-8 border-b border-gray-200 last:border-b-0">
                      <h3 className="text-lg font-medium text-yellow-800 mb-4">Question {question.id}</h3>
                      <p className="text-gray-700 mb-6">{question.text}</p>
                      
                      <div className="space-y-3">
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

                  {/* Submit Button for All Questions View */}
                  <div className='flex justify-center items-center mt-8'>
                    <button
                      onClick={() => setShowConfirmSubmit(true)}
                      disabled={!allQuestionsAnswered}
                      className={`w-full max-w-3xl py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                        allQuestionsAnswered
                          ? 'bg-yellow-600 hover:bg-yellow-800 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Submit Assignment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Question Navigator Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-6">
              <h3 className="font-medium text-gray-800 mb-4">Questions Overview</h3>
              
              {/* Progress Summary */}
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{getAnsweredCount()}/{questions.length}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
                {questions.map((question, index) => {
                  const status = getQuestionStatus(index);
                  return (
                    <button
                      key={question.id}
                      onClick={() => goToQuestion(index)}
                      className={`relative w-10 h-10 rounded text-sm font-medium transition duration-200 ${getStatusColor(status)} ${
                        currentQuestion === index && viewMode === 'single' ? 'ring-2 ring-blue-400' : ''
                      }`}
                    >
                      {index + 1}
                      {flaggedQuestions.has(index) && (
                        <Flag className="w-3 h-3 absolute -top-1 -right-1 text-blue-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="space-y-2 text-xs mb-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                  <span>Flagged</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                  <span>Not answered</span>
                </div>
              </div>

              {/* Quick Submit */}
              <button
                onClick={() => setShowConfirmSubmit(true)}
                disabled={!allQuestionsAnswered}
                className={`w-full py-2 px-4 rounded-lg font-medium transition duration-200 ${
                  allQuestionsAnswered
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Assignment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {allQuestionsAnswered ? "Submit Assignment?" : "Incomplete Assignment"}
            </h3>
            <p className="text-gray-600 mb-6">
              You have answered {getAnsweredCount()} out of {questions.length} questions. 
              {!allQuestionsAnswered && " Please answer all questions before submitting."}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAssignment}
                disabled={!allQuestionsAnswered}
                className={`flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ${
                  !allQuestionsAnswered ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}