


// import React, { useState, useEffect } from 'react';
// import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight, Flag, AlertTriangle } from 'lucide-react';

// // Mock quiz data with different question types
// const mockQuizData = {
//   title: "Mathematics Quiz - Chapter 5",
//   totalQuestions: 8,
//   timeLimit: 5, // minutes
//   questions: [
//     {
//       id: 1,
//       question: "What is the value of x in the equation: 2x + 5 = 15?",
//       type: "mcq", // multiple choice question
//       options: ["x = 5", "x = 10", "x = 7", "x = 3"],
//       correctAnswer: 0,
//       explanation: "Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5"
//     },
//     {
//       id: 2,
//       question: "The sum of angles in any triangle is always 180 degrees.",
//       type: "true-false",
//       correctAnswer: true,
//       explanation: "This is a fundamental property of triangles in Euclidean geometry."
//     },
//     {
//       id: 3,
//       question: "The formula for the area of a circle is _____ where r is the radius.",
//       type: "complete-sentence",
//       completionPosition: "end", // can be "start", "middle", "end"
//       correctAnswer: "πr²",
//       explanation: "The area of a circle is π times the radius squared (πr²)."
//     },
//     {
//       id: 4,
//       question: "Zero is a _____ number.",
//       type: "complete-sentence",
//       completionPosition: "middle",
//       correctAnswer: "rational",
//       explanation: "Zero is considered a rational number because it can be expressed as a fraction (0/1)."
//     },
//     {
//       id: 5,
//       question: "_____ is the mathematical constant approximately equal to 3.14159.",
//       type: "complete-sentence",
//       completionPosition: "start",
//       correctAnswer: "Pi",
//       explanation: "Pi (π) is the ratio of a circle's circumference to its diameter."
//     },
//     {
//       id: 6,
//       question: "What is 15% of 200?",
//       type: "mcq",
//       options: ["25", "30", "35", "20"],
//       correctAnswer: 1,
//       explanation: "15% of 200 = (15/100) × 200 = 0.15 × 200 = 30"
//     },
//     {
//       id: 7,
//       question: "Explain the Pythagorean theorem and provide an example of how to use it.",
//       type: "textarea",
//       correctAnswer: "The Pythagorean theorem states that in a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides (a² + b² = c²). Example: if legs are 3 and 4, then hypotenuse = √(3² + 4²) = √(9 + 16) = √25 = 5.",
//       explanation: "The Pythagorean theorem is fundamental for calculating distances and solving right triangle problems."
//     },
//     {
//       id: 8,
//       question: "A prime number has exactly two factors: 1 and itself.",
//       type: "true-false",
//       correctAnswer: true,
//       explanation: "By definition, a prime number is a natural number greater than 1 with exactly two distinct positive divisors."
//     }
//   ]
// };

// export default function QuizComponent() {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
//   const [timeRemaining, setTimeRemaining] = useState(mockQuizData.timeLimit * 60);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

//   // Timer effect
//   useEffect(() => {
//     if (timeRemaining > 0 && !isSubmitted) {
//       const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (timeRemaining === 0 && !isSubmitted) {
//       handleSubmitQuiz();
//     }
//   }, [timeRemaining, isSubmitted]);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   const handleAnswerSelect = (answer) => {
//     setSelectedAnswers({
//       ...selectedAnswers,
//       [currentQuestion]: answer
//     });
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
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < mockQuizData.questions.length - 1) {
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
//     mockQuizData.questions.forEach((question, index) => {
//       const userAnswer = selectedAnswers[index];
//       if (question.type === 'mcq') {
//         if (userAnswer === question.correctAnswer) correct++;
//       } else if (question.type === 'true-false') {
//         if (userAnswer === question.correctAnswer) correct++;
//       } else if (question.type === 'complete-sentence') {
//         if (userAnswer && userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
//           correct++;
//         }
//       } else if (question.type === 'textarea') {
//         // For textarea, we'll give credit if the answer contains key concepts
//         // In a real app, this would need more sophisticated evaluation
//         if (userAnswer && userAnswer.length > 20) correct++;
//       }
//     });
//     return {
//       correct,
//       total: mockQuizData.questions.length,
//       percentage: Math.round((correct / mockQuizData.questions.length) * 100)
//     };
//   };

//   const handleSubmitQuiz = () => {
//     setIsSubmitted(true);
//     setShowResults(true);
//     setShowConfirmSubmit(false);
//   };

//   const getQuestionStatus = (questionIndex) => {
//     if (selectedAnswers.hasOwnProperty(questionIndex)) {
//       if (isSubmitted) {
//         const question = mockQuizData.questions[questionIndex];
//         const userAnswer = selectedAnswers[questionIndex];
//         let isCorrect = false;

//         if (question.type === 'mcq' || question.type === 'true-false') {
//           isCorrect = userAnswer === question.correctAnswer;
//         } else if (question.type === 'complete-sentence') {
//           isCorrect = userAnswer && userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
//         } else if (question.type === 'textarea') {
//           isCorrect = userAnswer && userAnswer.length > 20;
//         }

//         return isCorrect ? 'correct' : 'incorrect';
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

//   const renderQuestionInput = () => {
//     const question = mockQuizData.questions[currentQuestion];
//     const currentAnswer = selectedAnswers[currentQuestion];

//     switch (question.type) {
//       case 'mcq':
//         return (
//           <div className="space-y-3">
//             {question.options.map((option, index) => (
//               <label
//                 key={index}
//                 className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition duration-200 ${
//                   currentAnswer === index
//                     ? 'border-yellow-500 bg-yellow-50'
//                     : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name={`question-${currentQuestion}`}
//                   value={index}
//                   checked={currentAnswer === index}
//                   onChange={() => handleAnswerSelect(index)}
//                   className="sr-only"
//                 />
//                 <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
//                   currentAnswer === index
//                     ? 'border-yellow-500 bg-yellow-500'
//                     : 'border-gray-300'
//                 }`}>
//                   {currentAnswer === index && (
//                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                   )}
//                 </div>
//                 <span className="text-gray-700">{option}</span>
//               </label>
//             ))}
//           </div>
//         );

//       case 'true-false':
//         return (
//           <div className="space-y-3">
//             {[true, false].map((option) => (
//               <label
//                 key={option.toString()}
//                 className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition duration-200 ${
//                   currentAnswer === option
//                     ? 'border-yellow-500 bg-yellow-50'
//                     : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name={`question-${currentQuestion}`}
//                   value={option.toString()}
//                   checked={currentAnswer === option}
//                   onChange={() => handleAnswerSelect(option)}
//                   className="sr-only"
//                 />
//                 <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
//                   currentAnswer === option
//                     ? 'border-yellow-500 bg-yellow-500'
//                     : 'border-gray-300'
//                 }`}>
//                   {currentAnswer === option && (
//                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                   )}
//                 </div>
//                 <span className="text-gray-700">{option ? 'True' : 'False'}</span>
//               </label>
//             ))}
//           </div>
//         );

//       case 'complete-sentence':
//         const renderSentenceCompletion = () => {
//           const parts = question.question.split('_____');
          
//           if (question.completionPosition === 'start') {
//             return (
//               <div className="flex items-center space-x-2 text-lg">
//                 <input
//                   type="text"
//                   value={currentAnswer || ''}
//                   onChange={(e) => handleAnswerSelect(e.target.value)}
//                   className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none min-w-32"
//                   placeholder="Your answer..."
//                 />
//                 <span className="text-gray-700">{parts[1]}</span>
//               </div>
//             );
//           } else if (question.completionPosition === 'end') {
//             return (
//               <div className="flex items-center space-x-2 text-lg">
//                 <span className="text-gray-700">{parts[0]}</span>
//                 <input
//                   type="text"
//                   value={currentAnswer || ''}
//                   onChange={(e) => handleAnswerSelect(e.target.value)}
//                   className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none min-w-32"
//                   placeholder="Your answer..."
//                 />
//               </div>
//             );
//           } else { // middle
//             return (
//               <div className="flex items-center space-x-2 text-lg">
//                 <span className="text-gray-700">{parts[0]}</span>
//                 <input
//                   type="text"
//                   value={currentAnswer || ''}
//                   onChange={(e) => handleAnswerSelect(e.target.value)}
//                   className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none min-w-32"
//                   placeholder="Your answer..."
//                 />
//                 <span className="text-gray-700">{parts[1]}</span>
//               </div>
//             );
//           }
//         };

//         return (
//           <div className="p-4 bg-gray-50 rounded-lg">
//             {renderSentenceCompletion()}
//           </div>
//         );

//       case 'textarea':
//         return (
//           <div className="space-y-3">
//             <textarea
//               value={currentAnswer || ''}
//               onChange={(e) => handleAnswerSelect(e.target.value)}
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none resize-vertical min-h-32"
//               placeholder="Type your detailed answer here..."
//               rows={6}
//             />
//             <div className="text-sm text-gray-500">
//               Characters: {(currentAnswer || '').length}
//             </div>
//           </div>
//         );

//       default:
//         return <div>Unsupported question type</div>;
//     }
//   };

//   const getQuestionTypeLabel = (type) => {
//     switch (type) {
//       case 'mcq': return 'Multiple Choice';
//       case 'true-false': return 'True/False';
//       case 'complete-sentence': return 'Complete the Sentence';
//       case 'textarea': return 'Essay Question';
//       default: return 'Unknown';
//     }
//   };

//   if (showResults) {
//     const score = calculateScore();
//     return (
//       <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//         <div className="text-center mb-8">
//           <div className="mb-4">
//             {score.percentage >= 80 ? (
//               <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//             ) : score.percentage >= 60 ? (
//               <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
//             ) : (
//               <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//             )}
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h1>
//           <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
          
//           <div className="bg-gray-50 p-6 rounded-lg mb-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-gray-900">{score.correct}</div>
//                 <div className="text-gray-600">Correct Answers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-gray-900">{score.total - score.correct}</div>
//                 <div className="text-gray-600">Incorrect Answers</div>
//               </div>
//               <div className="text-center">
//                 <div className={`text-3xl font-bold ${score.percentage >= 80 ? 'text-green-600' : score.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
//                   {score.percentage}%
//                 </div>
//                 <div className="text-gray-600">Final Score</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Review Answers */}
//         <div className="space-y-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Review Your Answers</h2>
//           {mockQuizData.questions.map((question, index) => {
//             const userAnswer = selectedAnswers[index];
//             let isCorrect = false;
            
//             if (question.type === 'mcq' || question.type === 'true-false') {
//               isCorrect = userAnswer === question.correctAnswer;
//             } else if (question.type === 'complete-sentence') {
//               isCorrect = userAnswer && userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
//             } else if (question.type === 'textarea') {
//               isCorrect = userAnswer && userAnswer.length > 20;
//             }
            
//             return (
//               <div key={question.id} className="border border-gray-200 rounded-lg p-4">
//                 <div className="flex items-start justify-between mb-3">
//                   <div>
//                     <h3 className="font-medium text-gray-900">Question {index + 1}</h3>
//                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                       {getQuestionTypeLabel(question.type)}
//                     </span>
//                   </div>
//                   {isCorrect ? (
//                     <CheckCircle className="w-5 h-5 text-green-500" />
//                   ) : (
//                     <XCircle className="w-5 h-5 text-red-500" />
//                   )}
//                 </div>
                
//                 <p className="text-gray-700 mb-4">{question.question}</p>
                
//                 <div className="space-y-2 mb-4">
//                   {question.type === 'mcq' && question.options.map((option, optionIndex) => (
//                     <div
//                       key={optionIndex}
//                       className={`p-3 rounded border ${
//                         optionIndex === question.correctAnswer
//                           ? 'bg-green-50 border-green-300 text-green-800'
//                           : optionIndex === userAnswer && !isCorrect
//                           ? 'bg-red-50 border-red-300 text-red-800'
//                           : 'bg-gray-50 border-gray-200'
//                       }`}
//                     >
//                       {option}
//                       {optionIndex === question.correctAnswer && (
//                         <span className="ml-2 text-green-600 font-medium">✓ Correct</span>
//                       )}
//                       {optionIndex === userAnswer && !isCorrect && (
//                         <span className="ml-2 text-red-600 font-medium">✗ Your answer</span>
//                       )}
//                     </div>
//                   ))}
                  
//                   {question.type === 'true-false' && (
//                     <div className="space-y-2">
//                       <div className={`p-3 rounded border ${question.correctAnswer ? 'bg-green-50 border-green-300 text-green-800' : 'bg-gray-50 border-gray-200'}`}>
//                         True {question.correctAnswer === true && <span className="ml-2 text-green-600 font-medium">✓ Correct</span>}
//                         {userAnswer === true && !isCorrect && <span className="ml-2 text-red-600 font-medium">✗ Your answer</span>}
//                       </div>
//                       <div className={`p-3 rounded border ${!question.correctAnswer ? 'bg-green-50 border-green-300 text-green-800' : 'bg-gray-50 border-gray-200'}`}>
//                         False {question.correctAnswer === false && <span className="ml-2 text-green-600 font-medium">✓ Correct</span>}
//                         {userAnswer === false && !isCorrect && <span className="ml-2 text-red-600 font-medium">✗ Your answer</span>}
//                       </div>
//                     </div>
//                   )}
                  
//                   {(question.type === 'complete-sentence' || question.type === 'textarea') && (
//                     <div className="space-y-2">
//                       <div className="p-3 bg-green-50 border border-green-300 rounded">
//                         <span className="text-green-800 font-medium">Correct Answer: </span>
//                         <span className="text-green-700">{question.correctAnswer}</span>
//                       </div>
//                       {userAnswer && (
//                         <div className={`p-3 rounded border ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
//                           <span className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
//                             Your Answer: 
//                           </span>
//                           <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
//                             {userAnswer}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
                
//                 {question.explanation && (
//                   <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
//                     <p className="text-blue-800 text-sm">
//                       <strong>Explanation:</strong> {question.explanation}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
        
//         <div className="mt-8 text-center">
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
//           >
//             Take Quiz Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Main Quiz Area */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             {/* Quiz Header */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800 mb-2">{mockQuizData.title}</h1>
//                 <div className="w-16 h-1 bg-yellow-500"></div>
//               </div>
//               <div className="flex items-center space-x-4 mt-4 sm:mt-0">
//                 <div className="flex items-center bg-red-50 px-3 py-2 rounded-lg">
//                   <Clock className="w-5 h-5 text-red-600 mr-2" />
//                   <span className={`font-mono font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-700'}`}>
//                     {formatTime(timeRemaining)}
//                   </span>
//                 </div>
//                 <button
//                   onClick={handleFlagQuestion}
//                   className={`p-2 rounded-lg transition duration-200 ${
//                     flaggedQuestions.has(currentQuestion)
//                       ? 'bg-blue-500 text-white'
//                       : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//                   }`}
//                 >
//                   <Flag className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             {/* Progress Bar */}
//             <div className="mb-6">
//               <div className="flex justify-between text-sm text-gray-600 mb-2">
//                 <span>Question {currentQuestion + 1} of {mockQuizData.totalQuestions}</span>
//                 <span>{getAnsweredCount()} answered</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
//                   style={{ width: `${((currentQuestion + 1) / mockQuizData.totalQuestions) * 100}%` }}
//                 ></div>
//               </div>
//             </div>

//             {/* Question Type Badge */}
//             <div className="mb-4">
//               <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//                 {getQuestionTypeLabel(mockQuizData.questions[currentQuestion].type)}
//               </span>
//             </div>

//             {/* Question */}
//             <div className="mb-8">
//               <h2 className="text-xl font-medium text-gray-900 mb-6">
//                 {mockQuizData.questions[currentQuestion].question}
//               </h2>

//               {/* Answer Input */}
//               {renderQuestionInput()}
//             </div>

//             {/* Navigation */}
//             <div className="flex justify-between items-center">
//               <button
//                 onClick={previousQuestion}
//                 disabled={currentQuestion === 0}
//                 className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
//               >
//                 <ArrowLeft className="w-5 h-5 mr-2" />
//                 Previous
//               </button>

//               <div className="flex space-x-3">
//                 {currentQuestion === mockQuizData.questions.length - 1 ? (
//                   <button
//                     onClick={() => setShowConfirmSubmit(true)}
//                     className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
//                   >
//                     Submit Quiz
//                   </button>
//                 ) : (
//                   <button
//                     onClick={nextQuestion}
//                     className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center"
//                   >
//                     Next
//                     <ArrowRight className="w-5 h-5 ml-2" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Question Navigator Sidebar */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow-md p-4 sticky top-6">
//             <h3 className="font-medium text-gray-800 mb-4">Question Navigator</h3>
            
//             <div className="grid grid-cols-5 lg:grid-cols-4 gap-2 mb-4">
//               {mockQuizData.questions.map((_, index) => {
//                 const status = getQuestionStatus(index);
//                 return (
//                   <button
//                     key={index}
//                     onClick={() => goToQuestion(index)}
//                     className={`w-10 h-10 rounded text-sm font-medium transition duration-200 ${getStatusColor(status)} ${
//                       currentQuestion === index ? 'ring-2 ring-blue-400' : ''
//                     }`}
//                   >
//                     {index + 1}
//                     {flaggedQuestions.has(index) && (
//                       <Flag className="w-3 h-3 absolute transform translate-x-1 -translate-y-1" />
//                     )}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Legend */}
//             <div className="space-y-2 text-xs">
//               <div className="flex items-center">
//                 <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
//                 <span>Answered</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
//                 <span>Flagged</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
//                 <span>Not answered</span>
//               </div>
//             </div>

//             {/* Quick Submit */}
//             <button
//               onClick={() => setShowConfirmSubmit(true)}
//               className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
//             >
//               Submit Quiz
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Confirm Submit Modal */}
//       {showConfirmSubmit && (
//         <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Submit Quiz?</h3>
//             <p className="text-gray-600 mb-6">
//               You have answered {getAnsweredCount()} out of {mockQuizData.totalQuestions} questions. 
//               Are you sure you want to submit your quiz?
//             </p>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setShowConfirmSubmit(false)}
//                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmitQuiz}
//                 className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
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


import React, { useState, useEffect, useRef } from 'react';
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight, Flag, AlertTriangle, FileText, Calendar, User, BookOpen } from 'lucide-react';
import { apiRequest } from '../Redux/Apis/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

// Enhanced Matching Question Component with SVG Lines
const EnhancedMatchingQuestion = ({ question, questionId, matchingConnections, setMatchingConnections, selectedAnswers, setSelectedAnswers }) => {
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const svgRef = useRef(null);
  const [linePositions, setLinePositions] = useState({});

  const answersArray = Array.isArray(question.answers) ? question.answers : [question.answers];

  // Update line positions when connections change
  useEffect(() => {
    if (!matchingConnections[questionId] || !leftColumnRef.current || !rightColumnRef.current) return;

    const newLinePositions = {};
    const leftItems = leftColumnRef.current.children;
    const rightItems = rightColumnRef.current.children;

    Object.entries(matchingConnections[questionId]).forEach(([leftId, rightId]) => {
      const leftIndex = answersArray.findIndex(item => item.id.toString() === leftId);
      const rightIndex = answersArray.findIndex(item => item.id.toString() === rightId || item.right_id?.toString() === rightId);

      if (leftIndex !== -1 && rightIndex !== -1 && leftItems[leftIndex] && rightItems[rightIndex]) {
        const leftRect = leftItems[leftIndex].getBoundingClientRect();
        const rightRect = rightItems[rightIndex].getBoundingClientRect();
        const containerRect = svgRef.current?.getBoundingClientRect();

        if (containerRect) {
          newLinePositions[`${leftId}-${rightId}`] = {
            x1: leftRect.right - containerRect.left,
            y1: leftRect.top - containerRect.top + leftRect.height / 2,
            x2: rightRect.left - containerRect.left,
            y2: rightRect.top - containerRect.top + rightRect.height / 2
          };
        }
      }
    });

    setLinePositions(newLinePositions);
  }, [matchingConnections[questionId], answersArray, questionId]);

  const handleMatchingConnect = (leftId, rightId) => {
    setMatchingConnections(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [leftId]: rightId
      }
    }));

    // Update selected answers for matching questions
    const currentConnections = { ...matchingConnections[questionId], [leftId]: rightId };
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: currentConnections
    }));
  };

  const clearMatchingConnection = (leftId) => {
    setMatchingConnections(prev => {
      const newConnections = { ...prev };
      if (newConnections[questionId]) {
        delete newConnections[questionId][leftId];
      }
      return newConnections;
    });

    // Update selected answers
    const currentConnections = { ...matchingConnections[questionId] };
    delete currentConnections[leftId];
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: currentConnections
    }));
  };

  return (
    <div>
      <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-purple-800">
          <strong>Matching Question:</strong> Connect each item from the left column with the appropriate item from the right column.
        </p>
      </div>
      
      <div className="relative" style={{ minHeight: '300px' }}>
        {/* SVG for connection lines */}
        <svg 
          ref={svgRef}
          className="absolute inset-0 pointer-events-none w-full h-full"
          style={{ zIndex: 10 }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#3B82F6"
              />
            </marker>
          </defs>
          
          {Object.entries(linePositions).map(([connectionId, position]) => (
            <g key={connectionId}>
              {/* Connection line */}
              <line
                x1={position.x1}
                y1={position.y1}
                x2={position.x2}
                y2={position.y2}
                stroke="#3B82F6"
                strokeWidth="3"
                markerEnd="url(#arrowhead)"
                className="drop-shadow-sm"
              />
              
              {/* Connection dots */}
              <circle
                cx={position.x1}
                cy={position.y1}
                r="4"
                fill="#3B82F6"
                className="drop-shadow-sm"
              />
              <circle
                cx={position.x2}
                cy={position.y2}
                r="4"
                fill="#10B981"
                className="drop-shadow-sm"
              />
            </g>
          ))}
        </svg>

        <div className="grid grid-cols-2 gap-8 relative z-20">
          {/* Left Column */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700 mb-3">Left Column</h4>
            <div ref={leftColumnRef} className="space-y-3">
              {answersArray.map((pair) => {
                const isConnected = matchingConnections[questionId]?.[pair.id];
                return (
                  <div
                    key={pair.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      isConnected
                        ? 'bg-blue-100 border-blue-400 shadow-md'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:shadow-sm'
                    }`}
                    onClick={() => {
                      if (isConnected) {
                        clearMatchingConnection(pair.id);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${isConnected ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <span className="font-medium">{pair.left || pair.text}</span>
                      </div>
                      {isConnected && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            clearMatchingConnection(pair.id);
                          }}
                          className="text-red-500 hover:text-red-700 font-bold text-lg"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700 mb-3">Right Column</h4>
            <div ref={rightColumnRef} className="space-y-3">
              {answersArray.map((pair) => {
                const isConnected = Object.values(matchingConnections[questionId] || {}).includes(pair.right_id || pair.id);
                return (
                  <div
                    key={`right-${pair.id}`}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      isConnected
                        ? 'bg-green-100 border-green-400 shadow-md'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:shadow-sm'
                    }`}
                    onClick={() => {
                      // Find the first unconnected left item
                      const unconnectedLeftItem = answersArray.find(item => 
                        !matchingConnections[questionId]?.[item.id]
                      );
                      
                      if (unconnectedLeftItem && !isConnected) {
                        handleMatchingConnect(unconnectedLeftItem.id, pair.right_id || pair.id);
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="font-medium">{pair.right || pair.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Connection Status */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Connected <span className="font-bold text-blue-600">{Object.keys(matchingConnections[questionId] || {}).length}</span> of <span className="font-bold">{answersArray.length}</span> items
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Left connected</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Right connected</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(Object.keys(matchingConnections[questionId] || {}).length / answersArray.length) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function QuizComponent() {
  const { id } = useParams();
  const { quizDetail, quizDetailAnswer } = useSelector(state => state.api);
  const dispatch = useDispatch();
  console.log({quizDetailAnswer});
  
  // State management
  const [matchingConnections, setMatchingConnections] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // Default 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [viewMode, setViewMode] = useState('single');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract quiz data from API response
  const quizData = quizDetail?.data?.data;
  console.log({quizData , quizDetail});
  
  let navigate = useNavigate()
  // Timer effect
  useEffect(() => {
    if (quizData?.start_time && quizData?.end_time) {
      const now = new Date();
      const endTime = new Date(quizData.end_time);
      const remainingTime = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeRemaining(remainingTime);
    }
  }, [quizData]);

  useEffect(() => {
   
    if (timeRemaining > 0 ) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    // } else if (timeRemaining === 0 && !isSubmitted) {
    } else if (timeRemaining === 0) {
      handleSubmitQuiz();
    }
  }, [timeRemaining, isSubmitted]);

  // API integration - Load quiz data
  useEffect(() => {
    const loadQuizData = async () => {
      try {
        setLoading(true);
        setError(null);
        
       dispatch(apiRequest({
          url: `api/tests/${id}`,
          entity: "quizDetail",
          headers: {
            "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
            "Accept-Language": localStorage.getItem('language') || 'en',
          }
        }));
      
        
      } catch (err) {
        setError('Failed to load quiz data');
        console.error('Error loading quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadQuizData();
    }
  }, [id, dispatch]);

  // Submit quiz answers
  const sendQuizAnswersAfterSubmit = async () => {
    if (!quizData?.questions) return;

    const formattedAnswers = quizData.questions.map(question => {
      const userAnswer = selectedAnswers[question.id];

      switch (question.format) {
        case 'MATCHING':
          return {
            question_id: question.id,
            format: "MATCHING",
            answers: Object.entries(userAnswer || {}).map(([leftId, rightId]) => ({
              left_id: parseInt(leftId),
              right_id: parseInt(rightId)
            }))
          };

        case 'TRUE_FALSE':
          const trueOption = question.answers.find(a => a.text === 'True');
          const falseOption = question.answers.find(a => a.text === 'False');
          return {
            question_id: question.id,
            format: "TRUE_FALSE",
            answers: [{
              value: userAnswer !== undefined 
                ? (userAnswer ? trueOption?.id : falseOption?.id)
                : null
            }]
          };

        case 'MCQ':
          return {
            question_id: question.id,
            format: "MCQ",
            answers: [{
              selected_option: parseInt(userAnswer)
            }]
          };

        case 'TEXT':
          return {
            question_id: question.id,
            format: "TEXT",
            answers: [{
              text_answer: userAnswer || ""
            }]
          };

        default:
          return null;
      }
    }).filter(answer => answer !== null);

    console.log("Final quiz payload:", { answers: formattedAnswers });

    try {
      await dispatch(apiRequest({
        url: `api/tests/${id}/submit`,
        entity: "quizDetailAnswer",
        method: "POST",
        data: { answers: formattedAnswers },
        headers: {
          "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
          "Accept-Language": localStorage.getItem('language') || 'en',
        }
      }));
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError('Failed to submit quiz');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
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
    if (quizData?.questions && currentQuestion < quizData.questions.length - 1) {
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
    if (!quizData?.questions) return { correct: 0, total: 0, percentage: 0, points: 0 };
    
    let correct = 0;
    quizData.questions.forEach((question) => {
      const userAnswer = selectedAnswers[question.id];
      
      if (question.format === 'MCQ') {
        if (userAnswer === question.correctAnswer) correct++;
      } else if (question.format === 'TRUE_FALSE') {
        if (userAnswer === question.correctAnswer) correct++;
      } else if (question.format === 'TEXT') {
        if (userAnswer && userAnswer.trim().length > 10) correct++;
      } else if (question.format === 'MATCHING') {
        let allCorrect = true;
        const userConnections = userAnswer || {};
        const expectedConnections = {};
        
        if (Array.isArray(question.answers)) {
          question.answers.forEach(pair => {
            expectedConnections[pair.id] = pair.right_id || pair.id;
          });
        }
        
        for (let leftId in expectedConnections) {
          if (userConnections[leftId] !== expectedConnections[leftId]) {
            allCorrect = false;
            break;
          }
        }
        
        if (allCorrect && Object.keys(userConnections).length === Object.keys(expectedConnections).length) {
          correct++;
        }
      }
    });
    
    const total = quizData.questions.length;
    const percentage = Math.round((correct / total) * 100);
    
    return {
      correct,
      total,
      percentage,
      points: Math.round((correct / total) * 100) // Using percentage as points for now
    };
  };

  const handleSubmitQuiz = async () => {
    await sendQuizAnswersAfterSubmit();
    setIsSubmitted(true);
    setShowResults(true);
    setShowConfirmSubmit(false);
  };

  const getQuestionStatus = (questionIndex) => {
    if (!quizData?.questions || !quizData.questions[questionIndex]) return 'unanswered';
    
    const questionId = quizData.questions[questionIndex].id;
    if (selectedAnswers.hasOwnProperty(questionId)) {
      if (isSubmitted) {
        // For demo purposes, assume all answered questions are correct
        // In real implementation, you'd get this from the API response
        return 'correct';
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

  const renderQuestion = (question) => {
    if (!question || !question.answers) return null;

    switch (question.format) {
      case 'MCQ':
        return (
          <div className="space-y-3">
            {question.answers.map((answer) => (
              <div
                key={answer.id}
                onClick={() => handleAnswerSelect(question.id, answer.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedAnswers[question.id] === answer.id
                    ? 'bg-yellow-50 border-yellow-500'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswers[question.id] === answer.id
                      ? 'border-yellow-500 bg-yellow-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[question.id] === answer.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span>{answer.text}</span>
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'TRUE_FALSE':
        return (
          <div className="space-y-3">
            {question.answers.map((answer) => {
              const isTrue = answer.text === 'True';
              return (
                <div
                  key={answer.id}
                  onClick={() => handleAnswerSelect(question.id, isTrue)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedAnswers[question.id] === isTrue
                      ? 'bg-yellow-50 border-yellow-500'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedAnswers[question.id] === isTrue
                        ? 'border-yellow-500 bg-yellow-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[question.id] === isTrue && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span>{answer.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        );
        
      case 'TEXT':
        return (
          <div>
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                <strong>Essay Question:</strong> Write a detailed answer in your own words.
              </p>
            </div>
            <textarea
              placeholder="Write your detailed answer here..."
              value={selectedAnswers[question.id] || ''}
              onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-vertical"
            />
            <div className="mt-2 text-sm text-gray-600">
              {selectedAnswers[question.id] ? selectedAnswers[question.id].length : 0} characters
            </div>
          </div>
        );

      case 'MATCHING':
        return (
          <EnhancedMatchingQuestion
            question={question}
            questionId={question.id}
            matchingConnections={matchingConnections}
            setMatchingConnections={setMatchingConnections}
            selectedAnswers={selectedAnswers}
            setSelectedAnswers={setSelectedAnswers}
          />
        );
        
      default:
        return <div>Unsupported question type: {question.format}</div>;
    }
  };

  const getQuestionTypeLabel = (format) => {
    switch (format) {
      case 'MCQ': return 'Multiple Choice';
      case 'TRUE_FALSE': return 'True/False';
      case 'TEXT': return 'Essay Question';
      case 'MATCHING': return 'Matching';
      default: return 'Unknown';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !quizData) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="text-center py-12">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Quiz</h2>
          <p className="text-gray-600 mb-4">{error || 'Quiz not found'}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const allQuestionsAnswered = quizData?.questions ? Object.keys(selectedAnswers).length === quizData.questions.length : false;

  // Results View
  if (quizDetailAnswer?.data?.percentage) {
    const score = calculateScore();
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="text-center mb-8">
         
          <div className="mb-4">
            {quizDetailAnswer?.data?.percentage >= 80 ? (
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            ) : quizDetailAnswer?.data?.percentage >= 60 ? (
              <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            )}
          </div> 
           <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed</h1>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{quizDetailAnswer?.data?.correct_answers}</div>
                <div className="text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{quizDetailAnswer?.data?.wrong_answers}</div>
                <div className="text-gray-600">Incorrect</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${quizDetailAnswer?.data?.percentage >= 80 ? 'text-green-600' : quizDetailAnswer?.data?.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {quizDetailAnswer?.data?.percentage}%
                </div>
                <div className="text-gray-600">Final percentage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{quizDetailAnswer?.data?.percentage}%</div>
                
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => "/class-specific-lesson"}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
          >
            go to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
     {quizDetail.error? <div className='flex justify-center items-center'>
          <p>{quizDetail.error}</p>
        </div> :    

    <div className="max-w-7xl mx-auto p-6">
      {/* Quiz Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{quizData.name || 'Quiz'}</h1>
            <div className="w-16 h-1 bg-yellow-500 mb-4"></div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                {quizData.questions?.length || 0} Questions
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                Quiz
              </div>
            </div>
            {quizData.description && (
              <p className="text-gray-600 mt-2">{quizData.description}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-red-50 px-3 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-red-600 mr-2" />
              <span className={`font-mono font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-700'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            {quizData.end_time && (
              <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-700 text-sm">
                  Due: {new Date(quizData.end_time).toLocaleString()}
                </span>
              </div>
            )}
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

            {viewMode === 'single' && quizData.questions && (
              // Single Question View
              <div>
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
                    <span>{getAnsweredCount()} answered</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question Type Badge */}
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {getQuestionTypeLabel(quizData.questions[currentQuestion].format)}
                  </span>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">
                    {quizData.questions[currentQuestion].question}
                  </h2>

                  {/* Answer Input */}
                  {renderQuestion(quizData.questions[currentQuestion])}
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
                    {currentQuestion === quizData.questions.length - 1 ? (
                      <button
                        onClick={() => setShowConfirmSubmit(true)}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                      >
                        Submit Quiz
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
            )}

            {viewMode === 'all' && quizData.questions && (
              // All Questions View
              <div className="space-y-8">
                {quizData.questions.map((question, index) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Question {index + 1}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {getQuestionTypeLabel(question.format)}
                        </span>
                        <button
                          onClick={() => {
                            const newFlagged = new Set(flaggedQuestions);
                            if (newFlagged.has(index)) {
                              newFlagged.delete(index);
                            } else {
                              newFlagged.add(index);
                            }
                            setFlaggedQuestions(newFlagged);
                          }}
                          className={`p-1 rounded transition duration-200 ${
                            flaggedQuestions.has(index)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{question.question}</p>
                    
                    {renderQuestion(question)}
                  </div>
                ))}
                
                {/* Submit Button for All Questions View */}
                <div className="text-center">
                  <button
                    onClick={() => setShowConfirmSubmit(true)}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
                  >
                    Submit Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Question Navigator Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-6">
            <h3 className="font-medium text-gray-800 mb-4">Question Navigator</h3>
            
            {/* Progress Summary */}
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {getAnsweredCount()}/{quizData.questions?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${quizData.questions ? (getAnsweredCount() / quizData.questions.length) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            {quizData.questions && (
              <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
                {quizData.questions.map((_, index) => {
                  const status = getQuestionStatus(index);
                  return (
                    <button
                      key={index}
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
            )}

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

            {/* Question Types Summary */}
            {quizData.questions && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Question Types:</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Multiple Choice:</span>
                    <span>{quizData.questions.filter(q => q.format === 'MCQ').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>True/False:</span>
                    <span>{quizData.questions.filter(q => q.format === 'TRUE_FALSE').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Essay:</span>
                    <span>{quizData.questions.filter(q => q.format === 'TEXT').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Matching:</span>
                    <span>{quizData.questions.filter(q => q.format === 'MATCHING').length}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Submit */}
            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Submit Quiz?</h3>
            <p className="text-gray-600 mb-6">
              You have answered {getAnsweredCount()} out of {quizData.questions?.length || 0} questions. 
              {!allQuestionsAnswered && " Some questions are still unanswered."}
              {timeRemaining > 0 && ` You have ${formatTime(timeRemaining)} remaining.`}
              Are you sure you want to submit your quiz?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitQuiz}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
        }
    </>
  );
}



// import React, { useState, useEffect, useRef } from 'react';
// import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight, Flag, AlertTriangle, FileText, Calendar, User, BookOpen } from 'lucide-react';
// import { apiRequest } from '../Redux/Apis/apiRequest';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';

// // Enhanced Matching Question Component with SVG Lines
// const EnhancedMatchingQuestion = ({ question, questionId, matchingConnections, setMatchingConnections, selectedAnswers, setSelectedAnswers }) => {
//   const leftColumnRef = useRef(null);
//   const rightColumnRef = useRef(null);
//   const svgRef = useRef(null);
//   const [linePositions, setLinePositions] = useState({});

//   const answersArray = Array.isArray(question.answers) ? question.answers : [question.answers];

//   // Update line positions when connections change
//   useEffect(() => {
//     if (!matchingConnections[questionId] || !leftColumnRef.current || !rightColumnRef.current) return;

//     const newLinePositions = {};
//     const leftItems = leftColumnRef.current.children;
//     const rightItems = rightColumnRef.current.children;

//     Object.entries(matchingConnections[questionId]).forEach(([leftId, rightId]) => {
//       const leftIndex = answersArray.findIndex(item => item.id.toString() === leftId);
//       const rightIndex = answersArray.findIndex(item => item.id.toString() === rightId || item.right_id?.toString() === rightId);

//       if (leftIndex !== -1 && rightIndex !== -1 && leftItems[leftIndex] && rightItems[rightIndex]) {
//         const leftRect = leftItems[leftIndex].getBoundingClientRect();
//         const rightRect = rightItems[rightIndex].getBoundingClientRect();
//         const containerRect = svgRef.current?.getBoundingClientRect();

//         if (containerRect) {
//           newLinePositions[`${leftId}-${rightId}`] = {
//             x1: leftRect.right - containerRect.left,
//             y1: leftRect.top - containerRect.top + leftRect.height / 2,
//             x2: rightRect.left - containerRect.left,
//             y2: rightRect.top - containerRect.top + rightRect.height / 2
//           };
//         }
//       }
//     });

//     setLinePositions(newLinePositions);
//   }, [matchingConnections[questionId], answersArray, questionId]);

//   const handleMatchingConnect = (leftId, rightId) => {
//     setMatchingConnections(prev => ({
//       ...prev,
//       [questionId]: {
//         ...prev[questionId],
//         [leftId]: rightId
//       }
//     }));

//     // Update selected answers for matching questions
//     const currentConnections = { ...matchingConnections[questionId], [leftId]: rightId };
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [questionId]: currentConnections
//     }));
//   };

//   const clearMatchingConnection = (leftId) => {
//     setMatchingConnections(prev => {
//       const newConnections = { ...prev };
//       if (newConnections[questionId]) {
//         delete newConnections[questionId][leftId];
//       }
//       return newConnections;
//     });

//     // Update selected answers
//     const currentConnections = { ...matchingConnections[questionId] };
//     delete currentConnections[leftId];
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [questionId]: currentConnections
//     }));
//   };

//   return (
//     <div>
//       <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
//         <p className="text-purple-800">
//           <strong>Matching Question:</strong> Connect each item from the left column with the appropriate item from the right column.
//         </p>
//       </div>
      
//       <div className="relative" style={{ minHeight: '300px' }}>
//         {/* SVG for connection lines */}
//         <svg 
//           ref={svgRef}
//           className="absolute inset-0 pointer-events-none w-full h-full"
//           style={{ zIndex: 10 }}
//         >
//           <defs>
//             <marker
//               id="arrowhead"
//               markerWidth="10"
//               markerHeight="7"
//               refX="10"
//               refY="3.5"
//               orient="auto"
//             >
//               <polygon
//                 points="0 0, 10 3.5, 0 7"
//                 fill="#3B82F6"
//               />
//             </marker>
//           </defs>
          
//           {Object.entries(linePositions).map(([connectionId, position]) => (
//             <g key={connectionId}>
//               {/* Connection line */}
//               <line
//                 x1={position.x1}
//                 y1={position.y1}
//                 x2={position.x2}
//                 y2={position.y2}
//                 stroke="#3B82F6"
//                 strokeWidth="3"
//                 markerEnd="url(#arrowhead)"
//                 className="drop-shadow-sm"
//               />
              
//               {/* Connection dots */}
//               <circle
//                 cx={position.x1}
//                 cy={position.y1}
//                 r="4"
//                 fill="#3B82F6"
//                 className="drop-shadow-sm"
//               />
//               <circle
//                 cx={position.x2}
//                 cy={position.y2}
//                 r="4"
//                 fill="#10B981"
//                 className="drop-shadow-sm"
//               />
//             </g>
//           ))}
//         </svg>

//         <div className="grid grid-cols-2 gap-8 relative z-20">
//           {/* Left Column */}
//           <div className="space-y-3">
//             <h4 className="font-medium text-gray-700 mb-3">Left Column</h4>
//             <div ref={leftColumnRef} className="space-y-3">
//               {answersArray.map((pair) => {
//                 const isConnected = matchingConnections[questionId]?.[pair.id];
//                 return (
//                   <div
//                     key={pair.id}
//                     className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
//                       isConnected
//                         ? 'bg-blue-100 border-blue-400 shadow-md'
//                         : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:shadow-sm'
//                     }`}
//                     onClick={() => {
//                       if (isConnected) {
//                         clearMatchingConnection(pair.id);
//                       }
//                     }}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div className={`w-3 h-3 rounded-full mr-3 ${isConnected ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
//                         <span className="font-medium">{pair.left || pair.text}</span>
//                       </div>
//                       {isConnected && (
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             clearMatchingConnection(pair.id);
//                           }}
//                           className="text-red-500 hover:text-red-700 font-bold text-lg"
//                         >
//                           ✕
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
          
//           {/* Right Column */}
//           <div className="space-y-3">
//             <h4 className="font-medium text-gray-700 mb-3">Right Column</h4>
//             <div ref={rightColumnRef} className="space-y-3">
//               {answersArray.map((pair) => {
//                 const isConnected = Object.values(matchingConnections[questionId] || {}).includes(pair.right_id || pair.id);
//                 return (
//                   <div
//                     key={`right-${pair.id}`}
//                     className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
//                       isConnected
//                         ? 'bg-green-100 border-green-400 shadow-md'
//                         : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:shadow-sm'
//                     }`}
//                     onClick={() => {
//                       // Find the first unconnected left item
//                       const unconnectedLeftItem = answersArray.find(item => 
//                         !matchingConnections[questionId]?.[item.id]
//                       );
                      
//                       if (unconnectedLeftItem && !isConnected) {
//                         handleMatchingConnect(unconnectedLeftItem.id, pair.right_id || pair.id);
//                       }
//                     }}
//                   >
//                     <div className="flex items-center">
//                       <div className={`w-3 h-3 rounded-full mr-3 ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
//                       <span className="font-medium">{pair.right || pair.text}</span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
        
//         {/* Connection Status */}
//         <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
//           <div className="flex items-center justify-between">
//             <div className="text-sm text-gray-600">
//               Connected <span className="font-bold text-blue-600">{Object.keys(matchingConnections[questionId] || {}).length}</span> of <span className="font-bold">{answersArray.length}</span> items
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center">
//                 <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
//                 <span className="text-xs text-gray-600">Left connected</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//                 <span className="text-xs text-gray-600">Right connected</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Progress Bar */}
//           <div className="mt-3">
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
//                 style={{ 
//                   width: `${(Object.keys(matchingConnections[questionId] || {}).length / answersArray.length) * 100}%` 
//                 }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default function QuizComponent() {
//   let {id}= useParams()
//   // Replace with your actual API data
//   let {quizDetail, quizDetailAnswer}= useSelector(state=>state.api);
//   const [quizData, setQuizData] = useState(quizDetail?.data?.data);
//   console.log({quizDetail});
//   let dispatch = useDispatch()
//   // State management
//   const [matchingConnections, setMatchingConnections] = useState({});
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
//   // const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit||30 * 60);
//   const [timeRemaining, setTimeRemaining] = useState(30 * 60);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
//   const [viewMode, setViewMode] = useState('single');
//   // Timer effect
//   // useEffect(() => {
//   //   if (timeRemaining > 0 && !isSubmitted) {
//   //     const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
//   //     return () => clearTimeout(timer);
//   //   } else if (timeRemaining === 0 && !isSubmitted) {
//   //     handleSubmitQuiz();
//   //   }
//   // }, [timeRemaining, isSubmitted]);

//   // API integration functions - replace with your actual API calls
//   useEffect(() => {
//     // Replace this with your actual API call
   

//     dispatch(apiRequest({
//       url: `api/tests/${id}`,
//           entity: "quizDetail",
//           headers: {
//             "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
//             "Accept-Language": localStorage.getItem('language') || 'en',
//           }
//     }))
//   }, []);

//   const sendQuizAnswersAfterSubmit = () => {
//     const formattedAnswers = quizData.questions.map(question => {
//       const userAnswer = selectedAnswers[question.id];

//       switch (question.format) {
//         case 'MATCHING':
//           return {
//             question_id: question.id,
//             format: "MATCHING",
//             answers: Object.entries(userAnswer || {}).map(([leftId, rightId]) => ({
//               left_id: parseInt(leftId),
//               right_id: parseInt(rightId)
//             }))
//           };

//         case 'TRUE_FALSE':
//           return {
//             question_id: question.id,
//             format: "TRUE_FALSE",
//             answers: [
//               {
//                 value: userAnswer !== undefined
//                   ? (userAnswer
//                       ? question.answers.find(a => a.text === 'True')?.id
//                       : question.answers.find(a => a.text === 'False')?.id)
//                   : null
//               }
//             ]
//           };

//         case 'MCQ':
//           return {
//             question_id: question.id,
//             format: "MCQ",
//             answers: [
//               {
//                 selected_option: parseInt(userAnswer)
//               }
//             ]
//           };

//         case 'TEXT':
//           return {
//             question_id: question.id,
//             format: "TEXT",
//             answers: [
//               {
//                 text_answer: userAnswer || ""
//               }
//             ]
//           };

//         default:
//           return null;
//       }
//     }).filter(answer => answer !== null);

//     console.log("Final quiz payload:", { answers: formattedAnswers });

//     // Replace with your actual API call
//     dispatch(apiRequest({
//       url: `api/tests/${id}/submit`,
//       entity: "quizDetailAnswer",
//       method: "POST",
//       data: { answers: formattedAnswers },
//       headers: {
//         "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
//         "Accept-Language": localStorage.getItem('language') || 'en',
//       }
//     }));
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   const handleAnswerSelect = (questionId, answer) => {
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [questionId]: answer
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
//     if (currentQuestion < quizData.questions.length - 1) {
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
//     quizData.questions.forEach((question) => {
//       const userAnswer = selectedAnswers[question.id];
      
//       if (question.format === 'MCQ') {
//         if (userAnswer === question.correctAnswer) correct++;
//       } else if (question.format === 'TRUE_FALSE') {
//         if (userAnswer === question.correctAnswer) correct++;
//       } else if (question.format === 'TEXT') {
//         if (userAnswer && userAnswer.trim().length > 10) correct++;
//       } else if (question.format === 'MATCHING') {
//         let allCorrect = true;
//         const userConnections = userAnswer || {};
//         const expectedConnections = {};
        
//         if (Array.isArray(question.answers)) {
//           question.answers.forEach(pair => {
//             expectedConnections[pair.id] = pair.right_id || pair.id;
//           });
//         }
        
//         for (let leftId in expectedConnections) {
//           if (userConnections[leftId] !== expectedConnections[leftId]) {
//             allCorrect = false;
//             break;
//           }
//         }
        
//         if (allCorrect && Object.keys(userConnections).length === Object.keys(expectedConnections).length) {
//           correct++;
//         }
//       }
//     });
    
//     return {
//       correct,
//       total: quizData.questions.length,
//       percentage: Math.round((correct / quizData.questions.length) * 100),
//       points: Math.round((correct / quizData.questions.length) * quizData.points)
//     };
//   };

//   const handleSubmitQuiz = () => {
//     sendQuizAnswersAfterSubmit();
//     setIsSubmitted(true);
//     setShowResults(true);
//     setShowConfirmSubmit(false);
//   };

//   const getQuestionStatus = (questionIndex) => {
//     const questionId = quizData.questions[questionIndex].id;
//     if (selectedAnswers.hasOwnProperty(questionId)) {
//       if (isSubmitted) {
//         // Calculate if answer is correct for results view
//         const question = quizData.questions[questionIndex];
//         const userAnswer = selectedAnswers[questionId];
//         let isCorrect = false;
        
//         if (question.format === 'MCQ' || question.format === 'TRUE_FALSE') {
//           isCorrect = userAnswer === question.correctAnswer;
//         } else if (question.format === 'TEXT') {
//           isCorrect = userAnswer && userAnswer.trim().length > 10;
//         } else if (question.format === 'MATCHING') {
//           isCorrect = true; // Simplified for demo
//         }
        
//         return isCorrect ? 'correct' : 'incorrect';
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

//   // Render different question types
//   const renderQuestion = (question) => {
//     switch (question.format) {
//       case 'MCQ':
//         return (
//           <div className="space-y-3">
//             {question.answers.map((answer, index) => (
//               <div
//                 key={answer.id}
//                 onClick={() => handleAnswerSelect(question.id, answer.id)}
//                 className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
//                   selectedAnswers[question.id] === answer.id
//                     ? 'bg-yellow-50 border-yellow-500'
//                     : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
//                     selectedAnswers[question.id] === answer.id
//                       ? 'border-yellow-500 bg-yellow-500'
//                       : 'border-gray-300'
//                   }`}>
//                     {selectedAnswers[question.id] === answer.id && (
//                       <div className="w-2 h-2 bg-white rounded-full"></div>
//                     )}
//                   </div>
//                   <span>{answer.text}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
        
//       case 'TRUE_FALSE':
//         return (
//           <div className="space-y-3">
//             {[true, false].map((value) => (
//               <div
//                 key={value.toString()}
//                 onClick={() => handleAnswerSelect(question.id, value)}
//                 className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
//                   selectedAnswers[question.id] === value
//                     ? 'bg-yellow-50 border-yellow-500'
//                     : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
//                     selectedAnswers[question.id] === value
//                       ? 'border-yellow-500 bg-yellow-500'
//                       : 'border-gray-300'
//                   }`}>
//                     {selectedAnswers[question.id] === value && (
//                       <div className="w-2 h-2 bg-white rounded-full"></div>
//                     )}
//                   </div>
//                   <span>{value ? 'True' : 'False'}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
        
//       case 'TEXT':
//         return (
//           <div>
//             <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
//               <p className="text-green-800">
//                 <strong>Essay Question:</strong> Write a detailed answer in your own words.
//               </p>
//             </div>
//             <textarea
//               placeholder="Write your detailed answer here..."
//               value={selectedAnswers[question.id] || ''}
//               onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
//               rows={6}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-vertical"
//             />
//             <div className="mt-2 text-sm text-gray-600">
//               {selectedAnswers[question.id] ? selectedAnswers[question.id].length : 0} characters
//             </div>
//           </div>
//         );

//       case 'MATCHING':
//         return (
//           <EnhancedMatchingQuestion
//             question={question}
//             questionId={question.id}
//             matchingConnections={matchingConnections}
//             setMatchingConnections={setMatchingConnections}
//             selectedAnswers={selectedAnswers}
//             setSelectedAnswers={setSelectedAnswers}
//           />
//         );
        
//       default:
//         return <div>Unsupported question type</div>;
//     }
//   };

//   const getQuestionTypeLabel = (format) => {
//     switch (format) {
//       case 'MCQ': return 'Multiple Choice';
//       case 'TRUE_FALSE': return 'True/False';
//       case 'TEXT': return 'Essay Question';
//       case 'MATCHING': return 'Matching';
//       default: return 'Unknown';
//     }
//   };

//   const allQuestionsAnswered = Object.keys(selectedAnswers).length === quizData?.questions?.length;

//   // Results View
//   if (showResults) {
//     const score = calculateScore();
//     return (
//       <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
//         <div className="text-center mb-8">
//           <div className="mb-4">
//             {score.percentage >= 80 ? (
//               <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//             ) : score.percentage >= 60 ? (
//               <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
//             ) : (
//               <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//             )}
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h1>
//           <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
          
//           <div className="bg-gray-50 p-6 rounded-lg mb-6">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-gray-900">{score.correct}</div>
//                 <div className="text-gray-600">Correct</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-gray-900">{score.total - score.correct}</div>
//                 <div className="text-gray-600">Incorrect</div>
//               </div>
//               <div className="text-center">
//                 <div className={`text-3xl font-bold ${score.percentage >= 80 ? 'text-green-600' : score.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
//                   {score.percentage}%
//                 </div>
//                 <div className="text-gray-600">Final Score</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-yellow-600">{score.points}</div>
//                 <div className="text-gray-600">Points</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Review Answers */}
//         <div className="space-y-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Review Your Answers</h2>
//           {quizData.questions.map((question, index) => {
//             const userAnswer = selectedAnswers[question.id];
//             let isCorrect = false;
//             let correctAnswerText = '';
//             let userAnswerText = '';
            
//             if (question.format === 'MCQ') {
//               isCorrect = userAnswer === question.correctAnswer;
//               correctAnswerText = question.answers.find(a => a.id === question.correctAnswer)?.text || '';
//               userAnswerText = userAnswer !== undefined ? question.answers.find(a => a.id === userAnswer)?.text || 'Not answered' : 'Not answered';
//             } else if (question.format === 'TRUE_FALSE') {
//               isCorrect = userAnswer === question.correctAnswer;
//               correctAnswerText = question.correctAnswer ? 'True' : 'False';
//               userAnswerText = userAnswer !== undefined ? (userAnswer ? 'True' : 'False') : 'Not answered';
//             } else if (question.format === 'TEXT') {
//               isCorrect = userAnswer && userAnswer.trim().length > 10;
//               correctAnswerText = 'See explanation below';
//               userAnswerText = userAnswer || 'Not answered';
//             } else if (question.format === 'MATCHING') {
//               isCorrect = true;
//               correctAnswerText = 'See correct connections';
//               userAnswerText = 'Connections made';
//             }
            
//             return (
//               <div key={question.id} className="border border-gray-200 rounded-lg p-4">
//                 <div className="flex items-start justify-between mb-3">
//                   <div>
//                     <h3 className="font-medium text-gray-900">Question {index + 1}</h3>
//                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                       {getQuestionTypeLabel(question.format)}
//                     </span>
//                   </div>
//                   {isCorrect ? (
//                     <CheckCircle className="w-5 h-5 text-green-500" />
//                   ) : (
//                     <XCircle className="w-5 h-5 text-red-500" />
//                   )}
//                 </div>
                
//                 <p className="text-gray-700 mb-4">{question.question}</p>
                
//                 <div className="space-y-2 mb-4">
//                   <div className={`p-3 rounded border ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
//                     <span className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>Your Answer: </span>
//                     <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>{userAnswerText}</span>
//                   </div>
//                   {question.format !== 'TEXT' && question.format !== 'MATCHING' && (
//                     <div className="p-3 bg-blue-50 border border-blue-300 rounded">
//                       <span className="text-blue-800 font-medium">Correct Answer: </span>
//                       <span className="text-blue-700">{correctAnswerText}</span>
//                     </div>
//                   )}
//                 </div>
                
//                 {question.explanation && (
//                   <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
//                     <p className="text-blue-800 text-sm">
//                       <strong>Explanation:</strong> {question.explanation}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
        
//         <div className="mt-8 text-center">
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
//           >
//             Take Quiz Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* Quiz Header */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//           <div>
//             {/* <h1 className="text-2xl font-bold text-gray-800 mb-2">{quizData.title}</h1> */}
//             <h1 className="text-2xl font-bold text-gray-800 mb-2">"test</h1>
//             <div className="w-16 h-1 bg-yellow-500 mb-4"></div>
//             <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//               <div className="flex items-center">
//                 <User className="w-4 h-4 mr-1" />
//                 {/* {quizData.instructor} */}
//                 ali
//               </div>
//               <div className="flex items-center">
//                 <FileText className="w-4 h-4 mr-1" />
//                 {quizData.questions.length}
               
//               </div>
//               <div className="flex items-center">
//                 <BookOpen className="w-4 h-4 mr-1" />

//                 {/* {quizData.points}  */}
//                 10 Points
//               </div>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center bg-red-50 px-3 py-2 rounded-lg">
//               <Clock className="w-5 h-5 text-red-600 mr-2" />
//               <span className={`font-mono font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-700'}`}>
//                 {formatTime(timeRemaining)}
//               </span>
//             </div>
//             <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
//               <Calendar className="w-5 h-5 text-blue-600 mr-2" />
//               <span className="text-blue-700 text-sm">Due: 
//                 {quizData.dueDate}
              
//                 </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Main Content Area */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             {/* View Toggle */}
//             <div className="flex justify-between items-center mb-6">
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => setViewMode('single')}
//                   className={`px-4 py-2 rounded-lg transition duration-200 ${
//                     viewMode === 'single' 
//                       ? 'bg-yellow-500 text-white' 
//                       : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                   }`}
//                 >
//                   Single Question
//                 </button>
//                 <button
//                   onClick={() => setViewMode('all')}
//                   className={`px-4 py-2 rounded-lg transition duration-200 ${
//                     viewMode === 'all' 
//                       ? 'bg-yellow-500 text-white' 
//                       : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                   }`}
//                 >
//                   All Questions
//                 </button>
//               </div>

//               {viewMode === 'single' && (
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={handleFlagQuestion}
//                     className={`p-2 rounded-lg transition duration-200 ${
//                       flaggedQuestions.has(currentQuestion)
//                         ? 'bg-blue-500 text-white'
//                         : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//                     }`}
//                   >
//                     <Flag className="w-5 h-5" />
//                   </button>
//                 </div>
//               )}
//             </div>

//             {viewMode === 'single' && (
//               // Single Question View
//               <div>
//                 {/* Progress Bar */}
//                 <div className="mb-6">
//                   <div className="flex justify-between text-sm text-gray-600 mb-2">
//                     <span>Question {currentQuestion + 1} of 10 
//                       {/* {quizData.totalQuestions} */}
//                       </span>
//                     <span>{getAnsweredCount()} answered</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div
//                       className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
//                       style={{ width: `${((currentQuestion + 1) / 
//                         quizData.totalQuestions) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>

//                 {/* Question Type Badge */}
//                 <div className="mb-4">
//                   <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//                     {getQuestionTypeLabel(quizData?.questions[currentQuestion].format)}
//                   </span>
//                 </div>

//                 {/* Question */}
//                 <div className="mb-8">
//                   <h2 className="text-xl font-medium text-gray-900 mb-6">
//                     {quizData.questions[currentQuestion].question}
//                   </h2>

//                   {/* Answer Input */}
//                   {renderQuestion(quizData.questions[currentQuestion])}
//                 </div>

//                 {/* Navigation */}
//                 <div className="flex justify-between items-center">
//                   <button
//                     onClick={previousQuestion}
//                     disabled={currentQuestion === 0}
//                     className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
//                   >
//                     <ArrowLeft className="w-5 h-5 mr-2" />
//                     Previous
//                   </button>

//                   <div className="flex space-x-3">
//                     {currentQuestion === quizData.questions.length - 1 ? (
//                       <button
//                         onClick={() => setShowConfirmSubmit(true)}
//                         className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
//                       >
//                         Submit Quiz
//                       </button>
//                     ) : (
//                       <button
//                         onClick={nextQuestion}
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center"
//                       >
//                         Next
//                         <ArrowRight className="w-5 h-5 ml-2" />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {viewMode === 'all' && (
//               // All Questions View
//               <div className="space-y-8">
//                 {quizData.questions.map((question, index) => (
//                   <div key={question.id} className="border border-gray-200 rounded-lg p-6">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-medium text-gray-900">
//                         Question {index + 1}
//                       </h3>
//                       <div className="flex items-center space-x-2">
//                         <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
//                           {getQuestionTypeLabel(question.format)}
//                         </span>
//                         <button
//                           onClick={() => {
//                             const newFlagged = new Set(flaggedQuestions);
//                             if (newFlagged.has(index)) {
//                               newFlagged.delete(index);
//                             } else {
//                               newFlagged.add(index);
//                             }
//                             setFlaggedQuestions(newFlagged);
//                           }}
//                           className={`p-1 rounded transition duration-200 ${
//                             flaggedQuestions.has(index)
//                               ? 'bg-blue-500 text-white'
//                               : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//                           }`}
//                         >
//                           <Flag className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
                    
//                     <p className="text-gray-700 mb-6">{question.question}</p>
                    
//                     {renderQuestion(question)}
//                   </div>
//                 ))}
                
//                 {/* Submit Button for All Questions View */}
//                 <div className="text-center">
//                   <button
//                     onClick={() => setShowConfirmSubmit(true)}
//                     className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
//                   >
//                     Submit Quiz
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Question Navigator Sidebar */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-6">
//             <h3 className="font-medium text-gray-800 mb-4">Question Navigator</h3>
            
//             {/* Progress Summary */}
//             <div className="bg-gray-50 p-3 rounded-lg mb-4">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-yellow-600">{getAnsweredCount()}/{quizData.totalQuestions}</div>
//                 <div className="text-sm text-gray-600">Completed</div>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                 <div
//                   className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
//                   style={{ width: `${(getAnsweredCount() / quizData.totalQuestions) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
//               {quizData.questions.map((_, index) => {
//                 const status = getQuestionStatus(index);
//                 return (
//                   <button
//                     key={index}
//                     onClick={() => goToQuestion(index)}
//                     className={`relative w-10 h-10 rounded text-sm font-medium transition duration-200 ${getStatusColor(status)} ${
//                       currentQuestion === index && viewMode === 'single' ? 'ring-2 ring-blue-400' : ''
//                     }`}
//                   >
//                     {index + 1}
//                     {flaggedQuestions.has(index) && (
//                       <Flag className="w-3 h-3 absolute -top-1 -right-1 text-blue-600" />
//                     )}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Legend */}
//             <div className="space-y-2 text-xs mb-4">
//               <div className="flex items-center">
//                 <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
//                 <span>Answered</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
//                 <span>Flagged</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
//                 <span>Not answered</span>
//               </div>
//             </div>

//             {/* Question Types Summary */}
//             <div className="mb-4">
//               <h4 className="text-sm font-medium text-gray-700 mb-2">Question Types:</h4>
//               <div className="space-y-1 text-xs text-gray-600">
//                 <div className="flex justify-between">
//                   <span>Multiple Choice:</span>
//                   <span>{quizData.questions.filter(q => q.format === 'MCQ').length}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>True/False:</span>
//                   <span>{quizData.questions.filter(q => q.format === 'TRUE_FALSE').length}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Essay:</span>
//                   <span>{quizData.questions.filter(q => q.format === 'TEXT').length}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Matching:</span>
//                   <span>{quizData.questions.filter(q => q.format === 'MATCHING').length}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Submit */}
//             <button
//               onClick={() => setShowConfirmSubmit(true)}
//               className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
//             >
//               Submit Quiz
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Confirm Submit Modal */}
//       {showConfirmSubmit && (
//         <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Submit Quiz?</h3>
//             <p className="text-gray-600 mb-6">
//               You have answered {getAnsweredCount()} out of {quizData.totalQuestions} questions. 
//               {!allQuestionsAnswered && " Some questions are still unanswered."}
//               {timeRemaining > 0 && ` You have ${formatTime(timeRemaining)} remaining.`}
//               Are you sure you want to submit your quiz?
//             </p>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setShowConfirmSubmit(false)}
//                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmitQuiz}
//                 className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
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