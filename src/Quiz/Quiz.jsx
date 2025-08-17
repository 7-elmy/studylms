

// import React, { useState, useEffect } from 'react';
// import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight, Flag, AlertTriangle } from 'lucide-react';

// // Mock quiz data
// const mockQuizData = {
//   title: "Mathematics Quiz - Chapter 5",
//   totalQuestions: 8,
//   timeLimit: 5, // minutes
//   questions: [
//     {
//       id: 1,
//       question: "What is the value of x in the equation: 2x + 5 = 15?",
//       type: "multiple-choice",
//       options: ["x = 5", "x = 10", "x = 7", "x = 3"],
//       correctAnswer: 0,
//       explanation: "Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5"
//     },
//     {
//       id: 2,
//       question: "If a triangle has angles of 60° and 70°, what is the third angle?",
//       type: "multiple-choice", 
//       options: ["40°", "50°", "60°", "70°"],
//       correctAnswer: 1,
//       explanation: "The sum of angles in a triangle is 180°. So 180° - 60° - 70° = 50°"
//     },
//     {
//       id: 3,
//       question: "What is the area of a circle with radius 4 units? (π ≈ 3.14)",
//       type: "multiple-choice",
//       options: ["12.56 sq units", "50.24 sq units", "25.12 sq units", "16 sq units"],
//       correctAnswer: 1,
//       explanation: "Area = πr² = 3.14 × 4² = 3.14 × 16 = 50.24 sq units"
//     },
//     {
//       id: 4,
//       question: "Solve: √(64) + √(36) = ?",
//       type: "multiple-choice",
//       options: ["14", "10", "12", "16"],
//       correctAnswer: 0,
//       explanation: "√64 = 8 and √36 = 6, so 8 + 6 = 14"
//     },
//     {
//       id: 5,
//       question: "What is 15% of 200?",
//       type: "multiple-choice",
//       options: ["25", "30", "35", "20"],
//       correctAnswer: 1,
//       explanation: "15% of 200 = (15/100) × 200 = 0.15 × 200 = 30"
//     }
//     ,
//     {
//       id: 6,
//       question: "What is 15% of 200?",
//       type: "multiple-choice",
//       options: ["25", "30", "35", "20"],
//       correctAnswer: 1,
//       explanation: "15% of 200 = (15/100) × 200 = 0.15 × 200 = 30"
//     }
//     ,
//     {
//       id: 7,
//       question: "What is 15% of 200?",
//       type: "multiple-choice",
//       options: ["25", "30", "35", "20"],
//       correctAnswer: 1,
//       explanation: "15% of 200 = (15/100) × 200 = 0.15 × 200 = 30"
//     }
//     ,
//     {
//       id: 8,
//       question: "What is 15% of 200?",
//       type: "multiple-choice",
//       options: ["25", "30", "35", "20"],
//       correctAnswer: 1,
//       explanation: "15% of 200 = (15/100) × 200 = 0.15 × 200 = 30"
//     }
//   ]
// };

// export default function QuizComponent() {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
//   const [timeRemaining, setTimeRemaining] = useState(mockQuizData.timeLimit * 60); // Convert to seconds
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

//   const handleAnswerSelect = (answerIndex) => {
//     setSelectedAnswers({
//       ...selectedAnswers,
//       [currentQuestion]: answerIndex
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
//       if (selectedAnswers[index] === question.correctAnswer) {
//         correct++;
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
//         return selectedAnswers[questionIndex] === mockQuizData.questions[questionIndex].correctAnswer ? 'correct' : 'incorrect';
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
//             const isCorrect = userAnswer === question.correctAnswer;
            
//             return (
//               <div key={question.id} className="border border-gray-200 rounded-lg p-4">
//                 <div className="flex items-start justify-between mb-3">
//                   <h3 className="font-medium text-gray-900">Question {index + 1}</h3>
//                   {isCorrect ? (
//                     <CheckCircle className="w-5 h-5 text-green-500" />
//                   ) : (
//                     <XCircle className="w-5 h-5 text-red-500" />
//                   )}
//                 </div>
                
//                 <p className="text-gray-700 mb-4">{question.question}</p>
                
//                 <div className="space-y-2 mb-4">
//                   {question.options.map((option, optionIndex) => (
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

//             {/* Question */}
//             <div className="mb-8">
//               <h2 className="text-xl font-medium text-gray-900 mb-6">
//                 {mockQuizData.questions[currentQuestion].question}
//               </h2>

//               {/* Answer Options */}
//               <div className="space-y-3">
//                 {mockQuizData.questions[currentQuestion].options.map((option, index) => (
//                   <label
//                     key={index}
//                     className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition duration-200 ${
//                       selectedAnswers[currentQuestion] === index
//                         ? 'border-yellow-500 bg-yellow-50'
//                         : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name={`question-${currentQuestion}`}
//                       value={index}
//                       checked={selectedAnswers[currentQuestion] === index}
//                       onChange={() => handleAnswerSelect(index)}
//                       className="sr-only"
//                     />
//                     <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
//                       selectedAnswers[currentQuestion] === index
//                         ? 'border-yellow-500 bg-yellow-500'
//                         : 'border-gray-300'
//                     }`}>
//                       {selectedAnswers[currentQuestion] === index && (
//                         <div className="w-2 h-2 bg-white rounded-full"></div>
//                       )}
//                     </div>
//                     <span className="text-gray-700">{option}</span>
//                   </label>
//                 ))}
//               </div>
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


import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight, Flag, AlertTriangle } from 'lucide-react';

// Mock quiz data with different question types
const mockQuizData = {
  title: "Mathematics Quiz - Chapter 5",
  totalQuestions: 8,
  timeLimit: 5, // minutes
  questions: [
    {
      id: 1,
      question: "What is the value of x in the equation: 2x + 5 = 15?",
      type: "mcq", // multiple choice question
      options: ["x = 5", "x = 10", "x = 7", "x = 3"],
      correctAnswer: 0,
      explanation: "Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5"
    },
    {
      id: 2,
      question: "The sum of angles in any triangle is always 180 degrees.",
      type: "true-false",
      correctAnswer: true,
      explanation: "This is a fundamental property of triangles in Euclidean geometry."
    },
    {
      id: 3,
      question: "The formula for the area of a circle is _____ where r is the radius.",
      type: "complete-sentence",
      completionPosition: "end", // can be "start", "middle", "end"
      correctAnswer: "πr²",
      explanation: "The area of a circle is π times the radius squared (πr²)."
    },
    {
      id: 4,
      question: "Zero is a _____ number.",
      type: "complete-sentence",
      completionPosition: "middle",
      correctAnswer: "rational",
      explanation: "Zero is considered a rational number because it can be expressed as a fraction (0/1)."
    },
    {
      id: 5,
      question: "_____ is the mathematical constant approximately equal to 3.14159.",
      type: "complete-sentence",
      completionPosition: "start",
      correctAnswer: "Pi",
      explanation: "Pi (π) is the ratio of a circle's circumference to its diameter."
    },
    {
      id: 6,
      question: "What is 15% of 200?",
      type: "mcq",
      options: ["25", "30", "35", "20"],
      correctAnswer: 1,
      explanation: "15% of 200 = (15/100) × 200 = 0.15 × 200 = 30"
    },
    {
      id: 7,
      question: "Explain the Pythagorean theorem and provide an example of how to use it.",
      type: "textarea",
      correctAnswer: "The Pythagorean theorem states that in a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides (a² + b² = c²). Example: if legs are 3 and 4, then hypotenuse = √(3² + 4²) = √(9 + 16) = √25 = 5.",
      explanation: "The Pythagorean theorem is fundamental for calculating distances and solving right triangle problems."
    },
    {
      id: 8,
      question: "A prime number has exactly two factors: 1 and itself.",
      type: "true-false",
      correctAnswer: true,
      explanation: "By definition, a prime number is a natural number greater than 1 with exactly two distinct positive divisors."
    }
  ]
};

export default function QuizComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(mockQuizData.timeLimit * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isSubmitted) {
      handleSubmitQuiz();
    }
  }, [timeRemaining, isSubmitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer
    });
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
  };

  const nextQuestion = () => {
    if (currentQuestion < mockQuizData.questions.length - 1) {
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
    mockQuizData.questions.forEach((question, index) => {
      const userAnswer = selectedAnswers[index];
      if (question.type === 'mcq') {
        if (userAnswer === question.correctAnswer) correct++;
      } else if (question.type === 'true-false') {
        if (userAnswer === question.correctAnswer) correct++;
      } else if (question.type === 'complete-sentence') {
        if (userAnswer && userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
          correct++;
        }
      } else if (question.type === 'textarea') {
        // For textarea, we'll give credit if the answer contains key concepts
        // In a real app, this would need more sophisticated evaluation
        if (userAnswer && userAnswer.length > 20) correct++;
      }
    });
    return {
      correct,
      total: mockQuizData.questions.length,
      percentage: Math.round((correct / mockQuizData.questions.length) * 100)
    };
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    setShowResults(true);
    setShowConfirmSubmit(false);
  };

  const getQuestionStatus = (questionIndex) => {
    if (selectedAnswers.hasOwnProperty(questionIndex)) {
      if (isSubmitted) {
        const question = mockQuizData.questions[questionIndex];
        const userAnswer = selectedAnswers[questionIndex];
        let isCorrect = false;

        if (question.type === 'mcq' || question.type === 'true-false') {
          isCorrect = userAnswer === question.correctAnswer;
        } else if (question.type === 'complete-sentence') {
          isCorrect = userAnswer && userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
        } else if (question.type === 'textarea') {
          isCorrect = userAnswer && userAnswer.length > 20;
        }

        return isCorrect ? 'correct' : 'incorrect';
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

  const renderQuestionInput = () => {
    const question = mockQuizData.questions[currentQuestion];
    const currentAnswer = selectedAnswers[currentQuestion];

    switch (question.type) {
      case 'mcq':
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition duration-200 ${
                  currentAnswer === index
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={index}
                  checked={currentAnswer === index}
                  onChange={() => handleAnswerSelect(index)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                  currentAnswer === index
                    ? 'border-yellow-500 bg-yellow-500'
                    : 'border-gray-300'
                }`}>
                  {currentAnswer === index && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-3">
            {[true, false].map((option) => (
              <label
                key={option.toString()}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition duration-200 ${
                  currentAnswer === option
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option.toString()}
                  checked={currentAnswer === option}
                  onChange={() => handleAnswerSelect(option)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                  currentAnswer === option
                    ? 'border-yellow-500 bg-yellow-500'
                    : 'border-gray-300'
                }`}>
                  {currentAnswer === option && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-700">{option ? 'True' : 'False'}</span>
              </label>
            ))}
          </div>
        );

      case 'complete-sentence':
        const renderSentenceCompletion = () => {
          const parts = question.question.split('_____');
          
          if (question.completionPosition === 'start') {
            return (
              <div className="flex items-center space-x-2 text-lg">
                <input
                  type="text"
                  value={currentAnswer || ''}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none min-w-32"
                  placeholder="Your answer..."
                />
                <span className="text-gray-700">{parts[1]}</span>
              </div>
            );
          } else if (question.completionPosition === 'end') {
            return (
              <div className="flex items-center space-x-2 text-lg">
                <span className="text-gray-700">{parts[0]}</span>
                <input
                  type="text"
                  value={currentAnswer || ''}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none min-w-32"
                  placeholder="Your answer..."
                />
              </div>
            );
          } else { // middle
            return (
              <div className="flex items-center space-x-2 text-lg">
                <span className="text-gray-700">{parts[0]}</span>
                <input
                  type="text"
                  value={currentAnswer || ''}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none min-w-32"
                  placeholder="Your answer..."
                />
                <span className="text-gray-700">{parts[1]}</span>
              </div>
            );
          }
        };

        return (
          <div className="p-4 bg-gray-50 rounded-lg">
            {renderSentenceCompletion()}
          </div>
        );

      case 'textarea':
        return (
          <div className="space-y-3">
            <textarea
              value={currentAnswer || ''}
              onChange={(e) => handleAnswerSelect(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none resize-vertical min-h-32"
              placeholder="Type your detailed answer here..."
              rows={6}
            />
            <div className="text-sm text-gray-500">
              Characters: {(currentAnswer || '').length}
            </div>
          </div>
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  const getQuestionTypeLabel = (type) => {
    switch (type) {
      case 'mcq': return 'Multiple Choice';
      case 'true-false': return 'True/False';
      case 'complete-sentence': return 'Complete the Sentence';
      case 'textarea': return 'Essay Question';
      default: return 'Unknown';
    }
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h1>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{score.correct}</div>
                <div className="text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{score.total - score.correct}</div>
                <div className="text-gray-600">Incorrect Answers</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${score.percentage >= 80 ? 'text-green-600' : score.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {score.percentage}%
                </div>
                <div className="text-gray-600">Final Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Answers */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Review Your Answers</h2>
          {mockQuizData.questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            let isCorrect = false;
            
            if (question.type === 'mcq' || question.type === 'true-false') {
              isCorrect = userAnswer === question.correctAnswer;
            } else if (question.type === 'complete-sentence') {
              isCorrect = userAnswer && userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
            } else if (question.type === 'textarea') {
              isCorrect = userAnswer && userAnswer.length > 20;
            }
            
            return (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">Question {index + 1}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {getQuestionTypeLabel(question.type)}
                    </span>
                  </div>
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                
                <p className="text-gray-700 mb-4">{question.question}</p>
                
                <div className="space-y-2 mb-4">
                  {question.type === 'mcq' && question.options.map((option, optionIndex) => (
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
                      {option}
                      {optionIndex === question.correctAnswer && (
                        <span className="ml-2 text-green-600 font-medium">✓ Correct</span>
                      )}
                      {optionIndex === userAnswer && !isCorrect && (
                        <span className="ml-2 text-red-600 font-medium">✗ Your answer</span>
                      )}
                    </div>
                  ))}
                  
                  {question.type === 'true-false' && (
                    <div className="space-y-2">
                      <div className={`p-3 rounded border ${question.correctAnswer ? 'bg-green-50 border-green-300 text-green-800' : 'bg-gray-50 border-gray-200'}`}>
                        True {question.correctAnswer === true && <span className="ml-2 text-green-600 font-medium">✓ Correct</span>}
                        {userAnswer === true && !isCorrect && <span className="ml-2 text-red-600 font-medium">✗ Your answer</span>}
                      </div>
                      <div className={`p-3 rounded border ${!question.correctAnswer ? 'bg-green-50 border-green-300 text-green-800' : 'bg-gray-50 border-gray-200'}`}>
                        False {question.correctAnswer === false && <span className="ml-2 text-green-600 font-medium">✓ Correct</span>}
                        {userAnswer === false && !isCorrect && <span className="ml-2 text-red-600 font-medium">✗ Your answer</span>}
                      </div>
                    </div>
                  )}
                  
                  {(question.type === 'complete-sentence' || question.type === 'textarea') && (
                    <div className="space-y-2">
                      <div className="p-3 bg-green-50 border border-green-300 rounded">
                        <span className="text-green-800 font-medium">Correct Answer: </span>
                        <span className="text-green-700">{question.correctAnswer}</span>
                      </div>
                      {userAnswer && (
                        <div className={`p-3 rounded border ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                          <span className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                            Your Answer: 
                          </span>
                          <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                            {userAnswer}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
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
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Quiz Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Quiz Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{mockQuizData.title}</h1>
                <div className="w-16 h-1 bg-yellow-500"></div>
              </div>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="flex items-center bg-red-50 px-3 py-2 rounded-lg">
                  <Clock className="w-5 h-5 text-red-600 mr-2" />
                  <span className={`font-mono font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-700'}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
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
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestion + 1} of {mockQuizData.totalQuestions}</span>
                <span>{getAnsweredCount()} answered</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / mockQuizData.totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Type Badge */}
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {getQuestionTypeLabel(mockQuizData.questions[currentQuestion].type)}
              </span>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-6">
                {mockQuizData.questions[currentQuestion].question}
              </h2>

              {/* Answer Input */}
              {renderQuestionInput()}
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
                {currentQuestion === mockQuizData.questions.length - 1 ? (
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
        </div>

        {/* Question Navigator Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-6">
            <h3 className="font-medium text-gray-800 mb-4">Question Navigator</h3>
            
            <div className="grid grid-cols-5 lg:grid-cols-4 gap-2 mb-4">
              {mockQuizData.questions.map((_, index) => {
                const status = getQuestionStatus(index);
                return (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`w-10 h-10 rounded text-sm font-medium transition duration-200 ${getStatusColor(status)} ${
                      currentQuestion === index ? 'ring-2 ring-blue-400' : ''
                    }`}
                  >
                    {index + 1}
                    {flaggedQuestions.has(index) && (
                      <Flag className="w-3 h-3 absolute transform translate-x-1 -translate-y-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs">
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
              className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
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
              You have answered {getAnsweredCount()} out of {mockQuizData.totalQuestions} questions. 
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
  );
}