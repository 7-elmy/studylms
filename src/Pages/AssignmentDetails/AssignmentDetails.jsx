import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, Flag, AlertTriangle, FileText, Calendar, User, BookOpen } from 'lucide-react';
import DynamicBreadcrumb from '../../Components/Ui/DynamicBreadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { apiRequest } from '../../Redux/Apis/apiRequest';

export default function AssignmentDetails() {
let {id}= useParams()
  let {assignmentDetail} = useSelector(state=>state.api);
  console.log({assignmentDetail});
  let {data} = assignmentDetail?.data ||{};
  console.log({data});
  
let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(apiRequest({
      url:`api/homeworks/${id}`,
      entity:"assignmentDetail",
      headers:{
        "Authorization":`${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
        "Accept-Language": localStorage.getItem('language') || 'en',
      }
    }))
  },[ localStorage.getItem("language")])
  

  // Assignment metadata
  const assignmentInfo = {
    title: data?.name,
    course: "Third Preparatory - Complete International Curriculum",
    dueDate: data?.dateline,
    totalQuestions: data?.questions?.length,
    instructor: "Mostafa ElNabawy",
    points: 100, // أضفت النقاط
  };

  // State management for matching questions
  const [matchingConnections, setMatchingConnections] = useState({});
  const [svgLines, setSvgLines] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'all'

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleMatchingConnect = (questionId, leftId, rightId) => {
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

  const clearMatchingConnection = (questionId, leftId) => {
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
    if (currentQuestion < data?.questions?.length - 1) {
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
    data?.questions?.forEach((question) => {
      const userAnswer = selectedAnswers[question.id];
      
      if (question.format === 'MCQ') {
        // For MCQ, check if selected answer ID matches correct answer
        if (userAnswer === question.correctAnswerId) correct++;
      } else if (question.format === 'TRUE_FALSE') {
        // For True/False, check boolean value
        if (userAnswer === question.correctAnswer) correct++;
      } else if (question.format === 'TEXT') {
        // For text questions, check if answered (in real app, needs manual grading)
        if (userAnswer && userAnswer.trim().length > 10) correct++;
      } else if (question.format === 'MATCHING') {
        // For matching, check if all connections are correct
        const correctConnections = {};
        // تعديل هنا للتعامل مع structure الجديد
        if (Array.isArray(question.answers)) {
          question.answers.forEach(pair => {
            correctConnections[pair.id] = pair.id;
          });
        } else {
          // إذا كان answers object واحد (كما في المثال)
          correctConnections[question.answers.id] = question.answers.id;
        }
        
        const userConnections = userAnswer || {};
        let allCorrect = true;
        
        for (let leftId in correctConnections) {
          if (userConnections[leftId] !== correctConnections[leftId]) {
            allCorrect = false;
            break;
          }
        }
        
        if (allCorrect && Object.keys(userConnections).length === Object.keys(correctConnections).length) {
          correct++;
        }
      }
    });
    
    return {
      correct,
      total: data?.questions?.length,
      percentage: Math.round((correct / data?.questions?.length) * 100),
      points: Math.round((correct / data?.questions?.length) * assignmentInfo.points)
    };
  };

  const handleSubmitAssignment = () => {
    if (Object.keys(selectedAnswers).length !== data?.questions?.length) return;
    setIsSubmitted(true);
    setShowResults(true);
    setShowConfirmSubmit(false);
  };

  const getQuestionStatus = (questionIndex) => {
    const questionId = data?.questions?.[questionIndex]?.id; // تم إصلاح هذا
    if (selectedAnswers.hasOwnProperty(questionId)) {
      if (isSubmitted) {
        const question = data?.questions?.[questionIndex]; // تم إصلاح هذا
        const userAnswer = selectedAnswers[questionId];
        let isCorrect = false;
        
        if (question.format === 'MCQ' || question.format === 'TRUE_FALSE') {
          isCorrect = userAnswer === question.correctAnswer;
        } else if (question.format === 'TEXT') {
          isCorrect = userAnswer && userAnswer.trim().length > 10; // Simple check
        } else if (question.format === 'MATCHING') {
          // Check matching correctness
          isCorrect = true; // Simplified for demo
        }
        
        return isCorrect ? 'correct' : 'incorrect';
      }
      return 'answered';
    }
    return flaggedQuestions.has(questionIndex) ? 'flagged' : 'unanswered'; // تم إصلاح هذا
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
  const allQuestionsAnswered = Object.keys(selectedAnswers).length === data?.questions?.length;

  // Render different question types based on API format
  const renderQuestion = (question, isInAllView = false) => {
    console.log(question,question.id,data?.questions?.findIndex(q => q.id === question.id));
    
    const questionIndex = data?.questions?.findIndex(q => q.id === question.id);
    
    switch (question.format) {
      case 'MCQ':
        return (
          <div className="space-y-3">
            {question.answers.map((answer, index) => (
              <div
                key={answer.id}
                onClick={() => handleAnswerSelect(question.id, answer.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedAnswers[question.id] === answer.id
                    ? 'bg-yellow-400 border-yellow-300'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{answer.text}</span>
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'TRUE_FALSE':
        return (
          <div className="space-y-3">
            {[true, false].map((value, index) => (
              <div
                key={index}
                onClick={() => handleAnswerSelect(question.id, value)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedAnswers[question.id] === value
                    ? 'bg-yellow-400 border-yellow-300'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 mr-3">
                    {value ? 'T' : 'F'}
                  </span>
                  <span>{value ? 'True' : 'False'}</span>
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'TEXT':
        return (
          <div>
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                <strong>سؤال مقالي:</strong> اكتب إجابة مفصلة بكلماتك الخاصة.
              </p>
            </div>
            <textarea
              placeholder="اكتب إجابتك التفصيلية هنا..."
              value={selectedAnswers[question.id] || ''}
              onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-vertical"
            />
            <div className="mt-2 text-sm text-gray-600">
              {selectedAnswers[question.id] ? selectedAnswers[question.id].length : 0} حرف
            </div>
          </div>
        );

      case 'MATCHING':
        // تعديل هنا للتعامل مع structure الجديد من الAPI
        const answersArray = Array.isArray(question.answers) ? question.answers : [question.answers];
        
        return (
          <div>
            <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-purple-800">
                <strong>سؤال التوصيل:</strong> اربط كل عنصر من العمود الأيسر بالعنصر المناسب من العمود الأيمن.
              </p>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 mb-3">العمود الأيسر</h4>
                  {answersArray.map((pair, index) => {
                    const isConnected = matchingConnections[question.id]?.[pair.id];
                    return (
                      <div
                        key={pair.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                          isConnected
                            ? 'bg-blue-100 border-blue-300'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                        onClick={() => {
                          if (isConnected) {
                            clearMatchingConnection(question.id, pair.id);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{pair.left}</span>
                          {isConnected && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                clearMatchingConnection(question.id, pair.id);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Right Column */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 mb-3">العمود الأيمن</h4>
                  {answersArray.map((pair, index) => {
                    const isConnected = Object.values(matchingConnections[question.id] || {}).includes(pair.id);
                    return (
                      <div
                        key={`right-${pair.id}`}
                        className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                          isConnected
                            ? 'bg-green-100 border-green-300'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                        onClick={() => {
                          // Find which left item is currently being connected
                          const leftItems = answersArray.filter(p => 
                            !matchingConnections[question.id]?.[p.id]
                          );
                          
                          if (leftItems.length > 0 && !isConnected) {
                            // Connect the first unconnected left item to this right item
                            handleMatchingConnect(question.id, leftItems[0].id, pair.id);
                          }
                        }}
                      >
                        <span>{pair.right}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Connection Lines (Visual feedback) */}
              <svg 
                className="absolute inset-0 pointer-events-none w-full h-full"
                style={{ zIndex: 1 }}
              >
                {matchingConnections[question.id] && Object.entries(matchingConnections[question.id]).map(([leftId, rightId]) => {
                  const leftIndex = answersArray.findIndex(p => p.id.toString() === leftId);
                  const rightIndex = answersArray.findIndex(p => p.id.toString() === rightId);
                  
                  if (leftIndex === -1 || rightIndex === -1) return null;
                  
                  const leftY = 60 + (leftIndex * 60) + 25; // Approximate position
                  const rightY = 60 + (rightIndex * 60) + 25;
                  const leftX = 45; // Right edge of left column
                  const rightX = 55; // Left edge of right column (in percentage)
                  
                  return (
                    <line
                      key={`${leftId}-${rightId}`}
                      x1={`${leftX}%`}
                      y1={leftY}
                      x2={`${rightX}%`}
                      y2={rightY}
                      stroke="#3B82F6"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  );
                })}
              </svg>
            </div>
            
            {/* Connection Status */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">
                تم ربط {Object.keys(matchingConnections[question.id] || {}).length} من {answersArray.length} عناصر
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>نوع سؤال غير مدعوم</div>;
    }
  };

  const getQuestionTypeLabel = (format) => {
    switch (format) {
      case 'MCQ': return 'اختيار من متعدد';
      case 'TRUE_FALSE': return 'صح أم خطأ';
      case 'TEXT': return 'سؤال مقالي';
      case 'MATCHING': return 'سؤال التوصيل';
      default: return 'غير معروف';
    }
  };

  // Results View
  if (showResults) {
    const score = calculateScore();
    return (
      <div>
        <DynamicBreadcrumb
          MainTitle={assignmentInfo.course}
          BreadCrumbs={[
            {label:"Home" , href:"/"},
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">تم إكمال الواجب!</h1>
            <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{score.correct}</div>
                  <div className="text-gray-600">صحيح</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{score.total - score.correct}</div>
                  <div className="text-gray-600">خطأ</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${score.percentage >= 80 ? 'text-green-600' : score.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {score.percentage}%
                  </div>
                  <div className="text-gray-600">النتيجة</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{score.points}</div>
                  <div className="text-gray-600">النقاط</div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Answers */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">مراجعة إجاباتك</h2>
            {data?.questions?.map((question, index) => {
              const userAnswer = selectedAnswers[question.id];
              let isCorrect = false;
              let correctAnswerText = '';
              let userAnswerText = '';
              
              if (question.format === 'MCQ') {
                isCorrect = userAnswer === question.correctAnswer;
                correctAnswerText = question.answers[question.correctAnswer]?.text || '';
                userAnswerText = userAnswer !== undefined ? question.answers.find(a => a.id === userAnswer)?.text || 'لم تتم الإجابة' : 'لم تتم الإجابة';
              } else if (question.format === 'TRUE_FALSE') {
                isCorrect = userAnswer === question.correctAnswer;
                correctAnswerText = question.correctAnswer ? 'True' : 'False';
                userAnswerText = userAnswer !== undefined ? (userAnswer ? 'True' : 'False') : 'لم تتم الإجابة';
              } else if (question.format === 'TEXT') {
                isCorrect = userAnswer && userAnswer.trim().length > 10;
                correctAnswerText = 'انظر الشرح أدناه';
                userAnswerText = userAnswer || 'لم تتم الإجابة';
              } else if (question.format === 'MATCHING') {
                isCorrect = true; // Simplified for demo
                correctAnswerText = 'انظر الاتصالات الصحيحة';
                userAnswerText = 'تم التوصيل';
              }
              
              return (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-yellow-800">السؤال {index + 1}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mt-1 inline-block">
                        {getQuestionTypeLabel(question.format)}
                      </span>
                    </div>
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  
                  <p className="text-gray-700 mb-4">{question.question}</p>
                  
                  <div className="mb-4 space-y-2">
                    <div className={`p-3 rounded border ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                      <strong>إجابتك:</strong> {userAnswerText}
                    </div>
                    {question.format !== 'TEXT' && question.format !== 'MATCHING' && (
                      <div className="p-3 rounded border bg-blue-50 border-blue-300">
                        <strong>الإجابة الصحيحة:</strong> {correctAnswerText}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
            >
              إعادة الواجب
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
                <span className="text-blue-700 text-sm">Due: {assignmentInfo.dueDate}</span>
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
                    // onClick={() => setViewMode('single')}
                    className={`px-4 py-2 rounded-lg transition duration-200 ${
                      viewMode !== 'single' 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Your Questions
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

              {viewMode === 'single' && data?.questions?.length > 0 && (
                // Single Question View
                <div>
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Question {currentQuestion + 1} of {data?.questions?.length}</span>
                      <span>{getAnsweredCount()} answered</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / data?.questions?.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-yellow-800">
                        Question {currentQuestion + 1}
                      </h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {getQuestionTypeLabel(data?.questions?.[currentQuestion]?.format)}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-6">{data?.questions?.[currentQuestion]?.question}</p>
                    
                    {renderQuestion(data?.questions?.[currentQuestion])}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={previousQuestion}
                      disabled={currentQuestion === 0}
                      className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      السابق
                    </button>

                    <div className="flex space-x-3">
                      {currentQuestion === data?.questions?.length - 1 ? (
                        <button
                          onClick={() => allQuestionsAnswered && setShowConfirmSubmit(true)}
                          disabled={!allQuestionsAnswered}
                          className={`bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 ${
                            !allQuestionsAnswered ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          تسليم الواجب
                        </button>
                      ) : (
                        <button
                          onClick={nextQuestion}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center"
                        >
                          التالي
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) }
            </div>
          </div>

          {/* Question Navigator Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-6">
              <h3 className="font-medium text-gray-800 mb-4">نظرة عامة على الأسئلة</h3>
              
              {/* Progress Summary */}
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{getAnsweredCount()}/{data?.questions?.length}</div>
                  <div className="text-sm text-gray-600">مكتمل</div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
                {data?.questions?.map((question, index) => {
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
                  <span>تمت الإجابة</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                  <span>مؤشر عليه</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                  <span>لم تتم الإجابة</span>
                </div>
              </div>

              {/* Question Types Summary */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">أنواع الأسئلة:</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>اختيار من متعدد:</span>
                    <span>{data?.questions?.filter(q => q.format === 'MCQ').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>صح/خطأ:</span>
                    <span>{data?.questions?.filter(q => q.format === 'TRUE_FALSE').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>سؤال مقالي:</span>
                    <span>{data?.questions?.filter(q => q.format === 'TEXT').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>التوصيل:</span>
                    <span>{data?.questions?.filter(q => q.format === 'MATCHING').length}</span>
                  </div>
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
                تسليم الواجب
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {allQuestionsAnswered ? "تسليم الواجب؟" : "واجب غير مكتمل"}
            </h3>
            <p className="text-gray-600 mb-6">
              لقد أجبت على {getAnsweredCount()} من أصل {data?.questions?.length} أسئلة. 
              {!allQuestionsAnswered && " يرجى الإجابة على جميع الأسئلة قبل التسليم."}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                إلغاء
              </button>
              <button
                onClick={handleSubmitAssignment}
                disabled={!allQuestionsAnswered}
                className={`flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ${
                  !allQuestionsAnswered ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                تسليم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { useEffect, useState } from 'react';
// import { CheckCircle, XCircle, ArrowLeft, ArrowRight, Flag, AlertTriangle, FileText, Calendar, User, BookOpen } from 'lucide-react';
// import DynamicBreadcrumb from '../../Components/Ui/DynamicBreadcrumb';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { apiRequest } from '../../Redux/Apis/apiRequest';



// // Enhanced questions data with different question types (based on your API format)
// const questions = [
//   {
//     id: 70,
//     question: "توصيل",
//     format: "MATCHING",
//     answers: [
//       {
//         id: 72,
//         left: "اهلا",
//         right: "وسهلا"
//       },
//       {
//         id: 73,
//         left: "3456",
//         right: "33333"
//       },
//       {
//         id: 74,
//         left: "12ضص",
//         right: "44444"
//       }
//     ]
//   },
//   {
//     id: 71,
//     question: "صح وغلط",
//     format: "TRUE_FALSE",
//     answers: [
//       {
//         text: "True"
//       },
//       {
//         text: "False"
//       }
//     ]
//   },
//   {
//     id: 72,
//     question: "اختيارى",
//     format: "MCQ",
//     answers: [
//       {
//         id: 76,
//         text: "الاول"
//       },
//       {
//         id: 77,
//         text: "2"
//       },
//       {
//         id: 78,
//         text: "3"
//       },
//       {
//         id: 79,
//         text: "4"
//       }
//     ]
//   },
//   {
//     id: 73,
//     question: "سؤال مقالى",
//     format: "TEXT",
//     answers: {
//       text: "HTML, or HyperText Markup Language, is the standard markup language used to create web pages and web applications. It provides the structure of a web page by defining various elements and their relationships"
//     }
//   }
// ];
// export default function AssignmentDetails() {
// let {id}= useParams()
//   let {assignmentDetail} = useSelector(state=>state.api);
//   console.log({assignmentDetail});
//   let {data} = assignmentDetail?.data ||{};
//   console.log({data});
  
// let dispatch = useDispatch()
//   useEffect(()=>{
//     dispatch(apiRequest({
//       url:`api/homeworks/${id}`,
//       entity:"assignmentDetail",
//       headers:{
//         "Authorization":`${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
//         "Accept-Language": localStorage.getItem('language') || 'en',
//       }
//     }))
//   },[ localStorage.getItem("language")])
  

//   // Assignment metadata
//   const assignmentInfo = {
//     title: data?.name,
//     course: "Third Preparatory - Complete International Curriculum",
//     dueDate: data?.dateline,
//     totalQuestions: data?.questions?.length,
//     instructor: "Mostafa ElNabawy",
 
//   };
//   console.log({dueDate: data?.dateline?.split('')[1]});
  

//   // State management for matching questions
//   const [matchingConnections, setMatchingConnections] = useState({});
//   const [svgLines, setSvgLines] = useState({});
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
//   const [viewMode, setViewMode] = useState('single'); // 'single' or 'all'

//   const handleAnswerSelect = (questionId, answer) => {
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [questionId]: answer
//     }));
//   };

//   const handleMatchingConnect = (questionId, leftId, rightId) => {
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

//   const clearMatchingConnection = (questionId, leftId) => {
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
//     if (currentQuestion < data?.questions?.length - 1) {
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
//     data?.questions?.forEach((question) => {
//       const userAnswer = selectedAnswers[question.id];
      
//       if (question.format === 'MCQ') {
//         // For MCQ, check if selected answer ID matches correct answer
//         if (userAnswer === question.correctAnswerId) correct++;
//       } else if (question.format === 'TRUE_FALSE') {
//         // For True/False, check boolean value
//         if (userAnswer === question.correctAnswer) correct++;
//       } else if (question.format === 'TEXT') {
//         // For text questions, check if answered (in real app, needs manual grading)
//         if (userAnswer && userAnswer.trim().length > 10) correct++;
//       } else if (question.format === 'MATCHING') {
//         // For matching, check if all connections are correct
//         const correctConnections = {};
//         question.answers.forEach(pair => {
//           correctConnections[pair.id] = pair.id; // Assuming correct connection is same ID
//         });
        
//         const userConnections = userAnswer || {};
//         let allCorrect = true;
        
//         for (let leftId in correctConnections) {
//           if (userConnections[leftId] !== correctConnections[leftId]) {
//             allCorrect = false;
//             break;
//           }
//         }
        
//         if (allCorrect && Object.keys(userConnections).length === Object.keys(correctConnections).length) {
//           correct++;
//         }
//       }
//     });
    
//     return {
//       correct,
//       total: data?.questions?.length,
//       percentage: Math.round((correct / data?.questions?.length) * 100),
//       points: Math.round((correct / data?.questions?.length) * assignmentInfo.points)
//     };
//   };

//   const handleSubmitAssignment = () => {
//     if (Object.keys(selectedAnswers).length !== data?.questions?.length) return;
//     setIsSubmitted(true);
//     setShowResults(true);
//     setShowConfirmSubmit(false);
//   };

//   const getQuestionStatus = (questionIndex) => {
//     const questionId = questions[questionIndex]?.id;
//     if (selectedAnswers.hasOwnProperty(questionId)) {
//       if (isSubmitted) {
//         const question = questions[questionIndex];
//         const userAnswer = selectedAnswers[questionId];
//         let isCorrect = false;
        
//         if (question.format === 'MCQ' || question.format === 'TRUE_FALSE') {
//           isCorrect = userAnswer === question.correctAnswer;
//         } else if (question.format === 'TEXT') {
//           isCorrect = userAnswer && userAnswer.trim().length > 10; // Simple check
//         } else if (question.format === 'MATCHING') {
//           // Check matching correctness
//           isCorrect = true; // Simplified for demo
//         }
        
//         return isCorrect ? 'correct' : 'incorrect';
//       }
//       return 'answered';
//     }
//     return flaggedQuestions?.questions?.has(questionIndex) ? 'flagged' : 'unanswered';
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

//   // Check if all questions are answered
//   const allQuestionsAnswered = Object.keys(selectedAnswers).length === data?.questions?.length;

//   // Render different question types based on API format
//   const renderQuestion = (question, isInAllView = false) => {
//     console.log(question,question.id,data?.questions?.findIndex(q => q.id === question.id));
    
//     const questionIndex = data?.questions?.findIndex(q => q.id === question.id);
    
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
//                     ? 'bg-yellow-400 border-yellow-300'
//                     : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 mr-3">
//                     {String.fromCharCode(65 + index)}
//                   </span>
//                   <span>{answer.text}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
        
//       case 'TRUE_FALSE':
//         return (
//           <div className="space-y-3">
//             {[true, false].map((value, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleAnswerSelect(question.id, value)}
//                 className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
//                   selectedAnswers[question.id] === value
//                     ? 'bg-yellow-400 border-yellow-300'
//                     : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 mr-3">
//                     {value ? 'T' : 'F'}
//                   </span>
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
//                 <strong>سؤال مقالي:</strong> اكتب إجابة مفصلة بكلماتك الخاصة.
//               </p>
//             </div>
//             <textarea
//               placeholder="اكتب إجابتك التفصيلية هنا..."
//               value={selectedAnswers[question.id] || ''}
//               onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
//               rows={6}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-vertical"
//             />
//             <div className="mt-2 text-sm text-gray-600">
//               {selectedAnswers[question.id] ? selectedAnswers[question.id].length : 0} حرف
//             </div>
//           </div>
//         );

//       case 'MATCHING':
//         return (
//           <div>
//             <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
//               <p className="text-purple-800">
//                 <strong>سؤال التوصيل:</strong> اربط كل عنصر من العمود الأيسر بالعنصر المناسب من العمود الأيمن.
//               </p>
//             </div>
            
//             <div className="relative">
//               <div className="grid grid-cols-2 gap-8">
//                 {/* Left Column */}
//                 <div className="space-y-3">
//                   <h4 className="font-medium text-gray-700 mb-3">العمود الأيسر</h4>
//                   {question.answers.map((pair, index) => {
//                     const isConnected = matchingConnections[question.id]?.[pair.id];
//                     return (
//                       <div
//                         key={pair.id}
//                         className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
//                           isConnected
//                             ? 'bg-blue-100 border-blue-300'
//                             : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//                         }`}
//                         onClick={() => {
//                           if (isConnected) {
//                             clearMatchingConnection(question.id, pair.id);
//                           }
//                         }}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span>{pair.left}</span>
//                           {isConnected && (
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 clearMatchingConnection(question.id, pair.id);
//                               }}
//                               className="text-red-500 hover:text-red-700"
//                             >
//                               ✕
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 {/* Right Column */}
//                 <div className="space-y-3">
//                   <h4 className="font-medium text-gray-700 mb-3">العمود الأيمن</h4>
//                   {question.answers.map((pair, index) => {
//                     const isConnected = Object.values(matchingConnections[question.id] || {}).includes(pair.id);
//                     return (
//                       <div
//                         key={`right-${pair.id}`}
//                         className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
//                           isConnected
//                             ? 'bg-green-100 border-green-300'
//                             : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//                         }`}
//                         onClick={() => {
//                           // Find which left item is currently being connected
//                           const leftItems = question.answers.filter(p => 
//                             !matchingConnections[question.id]?.[p.id]
//                           );
                          
//                           if (leftItems.length > 0 && !isConnected) {
//                             // Connect the first unconnected left item to this right item
//                             handleMatchingConnect(question.id, leftItems[0].id, pair.id);
//                           }
//                         }}
//                       >
//                         <span>{pair.right}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
              
//               {/* Connection Lines (Visual feedback) */}
//               <svg 
//                 className="absolute inset-0 pointer-events-none w-full h-full"
//                 style={{ zIndex: 1 }}
//               >
//                 {matchingConnections[question.id] && Object.entries(matchingConnections[question.id]).map(([leftId, rightId]) => {
//                   const leftIndex = question.answers.findIndex(p => p.id.toString() === leftId);
//                   const rightIndex = question.answers.findIndex(p => p.id.toString() === rightId);
                  
//                   if (leftIndex === -1 || rightIndex === -1) return null;
                  
//                   const leftY = 60 + (leftIndex * 60) + 25; // Approximate position
//                   const rightY = 60 + (rightIndex * 60) + 25;
//                   const leftX = 45; // Right edge of left column
//                   const rightX = 55; // Left edge of right column (in percentage)
                  
//                   return (
//                     <line
//                       key={`${leftId}-${rightId}`}
//                       x1={`${leftX}%`}
//                       y1={leftY}
//                       x2={`${rightX}%`}
//                       y2={rightY}
//                       stroke="#3B82F6"
//                       strokeWidth="3"
//                       strokeDasharray="5,5"
//                       className="animate-pulse"
//                     />
//                   );
//                 })}
//               </svg>
//             </div>
            
//             {/* Connection Status */}
//             <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//               <div className="text-sm text-gray-600">
//                 تم ربط {Object.keys(matchingConnections[question.id] || {}).length} من {question.answers.length} عناصر
//               </div>
//             </div>
//           </div>
//         );
        
//       default:
//         return <div>نوع سؤال غير مدعوم</div>;
//     }
//   };

//   const getQuestionTypeLabel = (format) => {
//     switch (format) {
//       case 'MCQ': return 'اختيار من متعدد';
//       case 'TRUE_FALSE': return 'صح أم خطأ';
//       case 'TEXT': return 'سؤال مقالي';
//       case 'MATCHING': return 'سؤال التوصيل';
//       default: return 'غير معروف';
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
//             {label:"Home" , href:"/"},
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
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">تم إكمال الواجب!</h1>
//             <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
            
//             <div className="bg-gray-50 p-6 rounded-lg mb-6">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-900">{score.correct}</div>
//                   <div className="text-gray-600">صحيح</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-900">{score.total - score.correct}</div>
//                   <div className="text-gray-600">خطأ</div>
//                 </div>
//                 <div className="text-center">
//                   <div className={`text-3xl font-bold ${score.percentage >= 80 ? 'text-green-600' : score.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
//                     {score.percentage}%
//                   </div>
//                   <div className="text-gray-600">النتيجة</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-yellow-600">{score.points}</div>
//                   <div className="text-gray-600">النقاط</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Review Answers */}
//           <div className="space-y-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">مراجعة إجاباتك</h2>
//             {data?.questions?.map((question, index) => {
//               const userAnswer = selectedAnswers[question.id];
//               let isCorrect = false;
//               let correctAnswerText = '';
//               let userAnswerText = '';
              
//               if (question.format === 'MCQ') {
//                 isCorrect = userAnswer === question.correctAnswer;
//                 correctAnswerText = question.answers[question.correctAnswer]?.text || '';
//                 userAnswerText = userAnswer !== undefined ? question.answers.find(a => a.id === userAnswer)?.text || 'لم تتم الإجابة' : 'لم تتم الإجابة';
//               } else if (question.format === 'TRUE_FALSE') {
//                 isCorrect = userAnswer === question.correctAnswer;
//                 correctAnswerText = question.correctAnswer ? 'True' : 'False';
//                 userAnswerText = userAnswer !== undefined ? (userAnswer ? 'True' : 'False') : 'لم تتم الإجابة';
//               } else if (question.format === 'TEXT') {
//                 isCorrect = userAnswer && userAnswer.trim().length > 10;
//                 correctAnswerText = 'انظر الشرح أدناه';
//                 userAnswerText = userAnswer || 'لم تتم الإجابة';
//               } else if (question.format === 'MATCHING') {
//                 isCorrect = true; // Simplified for demo
//                 correctAnswerText = 'انظر الاتصالات الصحيحة';
//                 userAnswerText = 'تم التوصيل';
//               }
              
//               return (
//                 <div key={question.id} className="border border-gray-200 rounded-lg p-4">
//                   <div className="flex items-start justify-between mb-3">
//                     <div>
//                       <h3 className="font-medium text-yellow-800">السؤال {index + 1}</h3>
//                       <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mt-1 inline-block">
//                         {getQuestionTypeLabel(question.format)}
//                       </span>
//                     </div>
//                     {isCorrect ? (
//                       <CheckCircle className="w-5 h-5 text-green-500" />
//                     ) : (
//                       <XCircle className="w-5 h-5 text-red-500" />
//                     )}
//                   </div>
                  
//                   <p className="text-gray-700 mb-4">{question.question}</p>
                  
//                   <div className="mb-4 space-y-2">
//                     <div className={`p-3 rounded border ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
//                       <strong>إجابتك:</strong> {userAnswerText}
//                     </div>
//                     {question.format !== 'TEXT' && question.format !== 'MATCHING' && (
//                       <div className="p-3 rounded border bg-blue-50 border-blue-300">
//                         <strong>الإجابة الصحيحة:</strong> {correctAnswerText}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
          
//           <div className="mt-8 text-center">
//             <button
//               onClick={() => window.location.reload()}
//               className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
//             >
//               إعادة الواجب
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

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
//                 <span className="text-blue-700 text-sm">Due: {assignmentInfo.dueDate}</span>
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
//                     // onClick={() => setViewMode('single')}
//                     className={`px-4 py-2 rounded-lg transition duration-200 ${
//                       viewMode !== 'single' 
//                         ? 'bg-yellow-500 text-white' 
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     Your Questions
//                   </button>
                
//                 </div>

//                 {viewMode === 'single' && (
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={handleFlagQuestion}
//                       className={`p-2 rounded-lg transition duration-200 ${
//                         flaggedQuestions?.questions?.has(currentQuestion)
//                           ? 'bg-blue-500 text-white'
//                           : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//                       }`}
//                     >
//                       <Flag className="w-5 h-5" />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {viewMode === 'single' && (
//                 // Single Question View
//                 <div>
//                   {/* Progress Bar */}
//                   <div className="mb-6">
//                     <div className="flex justify-between text-sm text-gray-600 mb-2">
//                       <span>Question {currentQuestion + 1} of {data?.questions?.length}</span>
//                       <span>{getAnsweredCount()} answered</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
//                         style={{ width: `${((currentQuestion + 1) / data?.questions?.length) * 100}%` }}
//                       ></div>
//                     </div>
//                   </div>

//                   {/* Question */}
//                   <div className="mb-8">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-medium text-yellow-800">
//                         Question {currentQuestion + 1}
//                       </h3>
//                       <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
//                         {getQuestionTypeLabel(questions[currentQuestion]?.format)}
//                       </span>
//                     </div>
//                     <p className="text-gray-700 mb-6">{questions[currentQuestion]?.question}</p>
                    
//                     {renderQuestion(questions[currentQuestion])}
//                   </div>

//                   {/* Navigation */}
//                   <div className="flex justify-between items-center">
//                     <button
//                       onClick={previousQuestion}
//                       disabled={currentQuestion === 0}
//                       className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
//                     >
//                       <ArrowLeft className="w-5 h-5 mr-2" />
//                       السابق
//                     </button>

//                     <div className="flex space-x-3">
//                       {currentQuestion === data?.questions?.length - 1 ? (
//                         <button
//                           onClick={() => allQuestionsAnswered && setShowConfirmSubmit(true)}
//                           disabled={!allQuestionsAnswered}
//                           className={`bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 ${
//                             !allQuestionsAnswered ? 'opacity-50 cursor-not-allowed' : ''
//                           }`}
//                         >
//                           تسليم الواجب
//                         </button>
//                       ) : (
//                         <button
//                           onClick={nextQuestion}
//                           className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center"
//                         >
//                           التالي
//                           <ArrowRight className="w-5 h-5 ml-2" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ) }
//             </div>
//           </div>

//           {/* Question Navigator Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-6">
//               <h3 className="font-medium text-gray-800 mb-4">نظرة عامة على الأسئلة</h3>
              
//               {/* Progress Summary */}
//               <div className="bg-gray-50 p-3 rounded-lg mb-4">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-yellow-600">{getAnsweredCount()}/{data?.questions?.length}</div>
//                   <div className="text-sm text-gray-600">مكتمل</div>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
//                 {data?.questions?.map((question, index) => {
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
//                       {flaggedQuestions?.questions?.has(index) && (
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
//                   <span>تمت الإجابة</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
//                   <span>مؤشر عليه</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
//                   <span>لم تتم الإجابة</span>
//                 </div>
//               </div>

//               {/* Question Types Summary */}
//               <div className="mb-4">
//                 <h4 className="text-sm font-medium text-gray-700 mb-2">أنواع الأسئلة:</h4>
//                 <div className="space-y-1 text-xs text-gray-600">
//                   <div className="flex justify-between">
//                     <span>اختيار من متعدد:</span>
//                     <span>{data?.questions?.filter(q => q.format === 'MCQ').length}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>صح/خطأ:</span>
//                     <span>{data?.questions?.filter(q => q.format === 'TRUE_FALSE').length}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>سؤال مقالي:</span>
//                     <span>{data?.questions?.filter(q => q.format === 'TEXT').length}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>التوصيل:</span>
//                     <span>{data?.questions?.filter(q => q.format === 'MATCHING').length}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Quick Submit */}
//               <button
//                 onClick={() => setShowConfirmSubmit(true)}
//                 disabled={!allQuestionsAnswered}
//                 className={`w-full py-2 px-4 rounded-lg font-medium transition duration-200 ${
//                   allQuestionsAnswered
//                     ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 تسليم الواجب
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Confirm Submit Modal */}
//       {showConfirmSubmit && (
//         <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">
//               {allQuestionsAnswered ? "تسليم الواجب؟" : "واجب غير مكتمل"}
//             </h3>
//             <p className="text-gray-600 mb-6">
//               لقد أجبت على {getAnsweredCount()} من أصل {data?.questions?.length} أسئلة. 
//               {!allQuestionsAnswered && " يرجى الإجابة على جميع الأسئلة قبل التسليم."}
//             </p>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setShowConfirmSubmit(false)}
//                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
//               >
//                 إلغاء
//               </button>
//               <button
//                 onClick={handleSubmitAssignment}
//                 disabled={!allQuestionsAnswered}
//                 className={`flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ${
//                   !allQuestionsAnswered ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 تسليم
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// import { useState } from 'react';
// import { CheckCircle, XCircle, ArrowLeft, ArrowRight, Flag, AlertTriangle, FileText, Calendar, User, BookOpen } from 'lucide-react';

// // Mock DynamicBreadcrumb component for demo
// const DynamicBreadcrumb = ({ MainTitle, BreadCrumbs }) => (
//   <div className="mb-6">
//     <h2 className="text-xl font-semibold text-gray-800">{MainTitle}</h2>
//     <div className="text-sm text-gray-600">
//       {BreadCrumbs.map((crumb, index) => (
//         <span key={index}>
//           {crumb.label}
//           {index < BreadCrumbs.length - 1 && ' > '}
//         </span>
//       ))}
//     </div>
//   </div>
// );

// export default function AssignmentDetails() {
//   // Enhanced questions data with different question types (based on your API format)
//   const questions = [
//     {
//       id: 70,
//       question: "توصيل",
//       format: "MATCHING",
//       answers: [
//         {
//           id: 72,
//           left: "اهلا",
//           right: "وسهلا"
//         },
//         {
//           id: 73,
//           left: "3456",
//           right: "33333"
//         },
//         {
//           id: 74,
//           left: "12ضص",
//           right: "44444"
//         }
//       ]
//     },
//     {
//       id: 71,
//       question: "صح وغلط",
//       format: "TRUE_FALSE",
//       answers: [
//         {
//           text: "True"
//         },
//         {
//           text: "False"
//         }
//       ]
//     },
//     {
//       id: 72,
//       question: "اختيارى",
//       format: "MCQ",
//       answers: [
//         {
//           id: 76,
//           text: "الاول"
//         },
//         {
//           id: 77,
//           text: "2"
//         },
//         {
//           id: 78,
//           text: "3"
//         },
//         {
//           id: 79,
//           text: "4"
//         }
//       ]
//     },
//     {
//       id: 73,
//       question: "سؤال مقالى",
//       format: "TEXT",
//       answers: {
//         text: "HTML, or HyperText Markup Language, is the standard markup language used to create web pages and web applications. It provides the structure of a web page by defining various elements and their relationships"
//       }
//     }
//   ];

//   // Assignment metadata
//   const assignmentInfo = {
//     title: "Physics - Light and Optics Assignment",
//     course: "Third Preparatory - Complete International Curriculum",
//     dueDate: "2024-08-15",
//     totalQuestions: data?.questions?.length,
//     instructor: "Dr. Sarah Ahmed",
//     points: 70
//   };

//   // State management for matching questions
//   const [matchingConnections, setMatchingConnections] = useState({});
//   const [svgLines, setSvgLines] = useState({});
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
//   const [viewMode, setViewMode] = useState('single'); // 'single' or 'all'

//   const handleAnswerSelect = (questionId, answer) => {
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [questionId]: answer
//     }));
//   };

//   const handleMatchingConnect = (questionId, leftId, rightId) => {
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

//   const clearMatchingConnection = (questionId, leftId) => {
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
//     if (currentQuestion < data?.questions?.length - 1) {
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
//     data?.questions?.forEach((question) => {
//       const userAnswer = selectedAnswers[question.id];
      
//       if (question.format === 'MCQ') {
//         // For MCQ, check if selected answer ID matches correct answer
//         if (userAnswer === question.correctAnswerId) correct++;
//       } else if (question.format === 'TRUE_FALSE') {
//         // For True/False, check boolean value
//         if (userAnswer === question.correctAnswer) correct++;
//       } else if (question.format === 'TEXT') {
//         // For text questions, check if answered (in real app, needs manual grading)
//         if (userAnswer && userAnswer.trim().length > 10) correct++;
//       } else if (question.format === 'MATCHING') {
//         // For matching, check if all connections are correct
//         const correctConnections = {};
//         question.answers.forEach(pair => {
//           correctConnections[pair.id] = pair.id; // Assuming correct connection is same ID
//         });
        
//         const userConnections = userAnswer || {};
//         let allCorrect = true;
        
//         for (let leftId in correctConnections) {
//           if (userConnections[leftId] !== correctConnections[leftId]) {
//             allCorrect = false;
//             break;
//           }
//         }
        
//         if (allCorrect && Object.keys(userConnections).length === Object.keys(correctConnections).length) {
//           correct++;
//         }
//       }
//     });
    
//     return {
//       correct,
//       total: data?.questions?.length,
//       percentage: Math.round((correct / data?.questions?.length) * 100),
//       points: Math.round((correct / data?.questions?.length) * assignmentInfo.points)
//     };
//   };

//   const handleSubmitAssignment = () => {
//     if (Object.keys(selectedAnswers).length !== data?.questions?.length) return;
//     setIsSubmitted(true);
//     setShowResults(true);
//     setShowConfirmSubmit(false);
//   };

//   const getQuestionStatus = (questionIndex) => {
//     const questionId = questions[questionIndex].id;
//     if (selectedAnswers.hasOwnProperty(questionId)) {
//       if (isSubmitted) {
//         const question = questions[questionIndex];
//         const userAnswer = selectedAnswers[questionId];
//         let isCorrect = false;
        
//         if (question.format === 'MCQ' || question.format === 'TRUE_FALSE') {
//           isCorrect = userAnswer === question.correctAnswer;
//         } else if (question.format === 'TEXT') {
//           isCorrect = userAnswer && userAnswer.trim().length > 10; // Simple check
//         } else if (question.format === 'MATCHING') {
//           // Check matching correctness
//           isCorrect = true; // Simplified for demo
//         }
        
//         return isCorrect ? 'correct' : 'incorrect';
//       }
//       return 'answered';
//     }
//     return flaggedQuestions?.questions?.has(questionIndex) ? 'flagged' : 'unanswered';
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

//   // Check if all questions are answered
//   const allQuestionsAnswered = Object.keys(selectedAnswers).length === data?.questions?.length;

//   // Render different question types based on API format
//   const renderQuestion = (question, isInAllView = false) => {
//     const questionIndex = data?.questions?.findIndex(q => q.id === question.id);
    
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
//                     ? 'bg-yellow-400 border-yellow-300'
//                     : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 mr-3">
//                     {String.fromCharCode(65 + index)}
//                   </span>
//                   <span>{answer.text}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
        
//       case 'TRUE_FALSE':
//         return (
//           <div className="space-y-3">
//             {[true, false].map((value, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleAnswerSelect(question.id, value)}
//                 className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
//                   selectedAnswers[question.id] === value
//                     ? 'bg-yellow-400 border-yellow-300'
//                     : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 mr-3">
//                     {value ? 'T' : 'F'}
//                   </span>
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
//                 <strong>سؤال مقالي:</strong> اكتب إجابة مفصلة بكلماتك الخاصة.
//               </p>
//             </div>
//             <textarea
//               placeholder="اكتب إجابتك التفصيلية هنا..."
//               value={selectedAnswers[question.id] || ''}
//               onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
//               rows={6}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-vertical"
//             />
//             <div className="mt-2 text-sm text-gray-600">
//               {selectedAnswers[question.id] ? selectedAnswers[question.id].length : 0} حرف
//             </div>
//           </div>
//         );

//       case 'MATCHING':
//         return (
//           <div>
//             <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
//               <p className="text-purple-800">
//                 <strong>سؤال التوصيل:</strong> اربط كل عنصر من العمود الأيسر بالعنصر المناسب من العمود الأيمن.
//               </p>
//             </div>
            
//             <div className="relative">
//               <div className="grid grid-cols-2 gap-8">
//                 {/* Left Column */}
//                 <div className="space-y-3">
//                   <h4 className="font-medium text-gray-700 mb-3">العمود الأيسر</h4>
//                   {question.answers.map((pair, index) => {
//                     const isConnected = matchingConnections[question.id]?.[pair.id];
//                     return (
//                       <div
//                         key={pair.id}
//                         className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
//                           isConnected
//                             ? 'bg-blue-100 border-blue-300'
//                             : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//                         }`}
//                         onClick={() => {
//                           if (isConnected) {
//                             clearMatchingConnection(question.id, pair.id);
//                           }
//                         }}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span>{pair.left}</span>
//                           {isConnected && (
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 clearMatchingConnection(question.id, pair.id);
//                               }}
//                               className="text-red-500 hover:text-red-700"
//                             >
//                               ✕
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 {/* Right Column */}
//                 <div className="space-y-3">
//                   <h4 className="font-medium text-gray-700 mb-3">العمود الأيمن</h4>
//                   {question.answers.map((pair, index) => {
//                     const isConnected = Object.values(matchingConnections[question.id] || {}).includes(pair.id);
//                     return (
//                       <div
//                         key={`right-${pair.id}`}
//                         className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
//                           isConnected
//                             ? 'bg-green-100 border-green-300'
//                             : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//                         }`}
//                         onClick={() => {
//                           // Find which left item is currently being connected
//                           const leftItems = question.answers.filter(p => 
//                             !matchingConnections[question.id]?.[p.id]
//                           );
                          
//                           if (leftItems.length > 0 && !isConnected) {
//                             // Connect the first unconnected left item to this right item
//                             handleMatchingConnect(question.id, leftItems[0].id, pair.id);
//                           }
//                         }}
//                       >
//                         <span>{pair.right}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
              
//               {/* Connection Lines (Visual feedback) */}
//               <svg 
//                 className="absolute inset-0 pointer-events-none w-full h-full"
//                 style={{ zIndex: 1 }}
//               >
//                 {matchingConnections[question.id] && Object.entries(matchingConnections[question.id]).map(([leftId, rightId]) => {
//                   const leftIndex = question.answers.findIndex(p => p.id.toString() === leftId);
//                   const rightIndex = question.answers.findIndex(p => p.id.toString() === rightId);
                  
//                   if (leftIndex === -1 || rightIndex === -1) return null;
                  
//                   const leftY = 60 + (leftIndex * 60) + 25; // Approximate position
//                   const rightY = 60 + (rightIndex * 60) + 25;
//                   const leftX = 45; // Right edge of left column
//                   const rightX = 55; // Left edge of right column (in percentage)
                  
//                   return (
//                     <line
//                       key={`${leftId}-${rightId}`}
//                       x1={`${leftX}%`}
//                       y1={leftY}
//                       x2={`${rightX}%`}
//                       y2={rightY}
//                       stroke="#3B82F6"
//                       strokeWidth="3"
//                       strokeDasharray="5,5"
//                       className="animate-pulse"
//                     />
//                   );
//                 })}
//               </svg>
//             </div>
            
//             {/* Connection Status */}
//             <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//               <div className="text-sm text-gray-600">
//                 تم ربط {Object.keys(matchingConnections[question.id] || {}).length} من {question.answers.length} عناصر
//               </div>
//             </div>
//           </div>
//         );
        
//       default:
//         return <div>نوع سؤال غير مدعوم</div>;
//     }
//   };

//   const getQuestionTypeLabel = (format) => {
//     switch (format) {
//       case 'MCQ': return 'اختيار من متعدد';
//       case 'TRUE_FALSE': return 'صح أم خطأ';
//       case 'TEXT': return 'سؤال مقالي';
//       case 'MATCHING': return 'سؤال التوصيل';
//       default: return 'غير معروف';
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
//             {label:"Home" , href:"/"},
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
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">تم إكمال الواجب!</h1>
//             <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
            
//             <div className="bg-gray-50 p-6 rounded-lg mb-6">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-900">{score.correct}</div>
//                   <div className="text-gray-600">صحيح</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-900">{score.total - score.correct}</div>
//                   <div className="text-gray-600">خطأ</div>
//                 </div>
//                 <div className="text-center">
//                   <div className={`text-3xl font-bold ${score.percentage >= 80 ? 'text-green-600' : score.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
//                     {score.percentage}%
//                   </div>
//                   <div className="text-gray-600">النتيجة</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-yellow-600">{score.points}</div>
//                   <div className="text-gray-600">النقاط</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Review Answers */}
//           <div className="space-y-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">مراجعة إجاباتك</h2>
//             {data?.questions?.map((question, index) => {
//               const userAnswer = selectedAnswers[question.id];
//               let isCorrect = false;
//               let correctAnswerText = '';
//               let userAnswerText = '';
              
//               if (question.format === 'MCQ') {
//                 isCorrect = userAnswer === question.correctAnswer;
//                 correctAnswerText = question.answers[question.correctAnswer]?.text || '';
//                 userAnswerText = userAnswer !== undefined ? question.answers.find(a => a.id === userAnswer)?.text || 'لم تتم الإجابة' : 'لم تتم الإجابة';
//               } else if (question.format === 'TRUE_FALSE') {
//                 isCorrect = userAnswer === question.correctAnswer;
//                 correctAnswerText = question.correctAnswer ? 'True' : 'False';
//                 userAnswerText = userAnswer !== undefined ? (userAnswer ? 'True' : 'False') : 'لم تتم الإجابة';
//               } else if (question.format === 'TEXT') {
//                 isCorrect = userAnswer && userAnswer.trim().length > 10;
//                 correctAnswerText = 'انظر الشرح أدناه';
//                 userAnswerText = userAnswer || 'لم تتم الإجابة';
//               } else if (question.format === 'MATCHING') {
//                 isCorrect = true; // Simplified for demo
//                 correctAnswerText = 'انظر الاتصالات الصحيحة';
//                 userAnswerText = 'تم التوصيل';
//               }
              
//               return (
//                 <div key={question.id} className="border border-gray-200 rounded-lg p-4">
//                   <div className="flex items-start justify-between mb-3">
//                     <div>
//                       <h3 className="font-medium text-yellow-800">السؤال {index + 1}</h3>
//                       <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mt-1 inline-block">
//                         {getQuestionTypeLabel(question.format)}
//                       </span>
//                     </div>
//                     {isCorrect ? (
//                       <CheckCircle className="w-5 h-5 text-green-500" />
//                     ) : (
//                       <XCircle className="w-5 h-5 text-red-500" />
//                     )}
//                   </div>
                  
//                   <p className="text-gray-700 mb-4">{question.question}</p>
                  
//                   <div className="mb-4 space-y-2">
//                     <div className={`p-3 rounded border ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
//                       <strong>إجابتك:</strong> {userAnswerText}
//                     </div>
//                     {question.format !== 'TEXT' && question.format !== 'MATCHING' && (
//                       <div className="p-3 rounded border bg-blue-50 border-blue-300">
//                         <strong>الإجابة الصحيحة:</strong> {correctAnswerText}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
          
//           <div className="mt-8 text-center">
//             <button
//               onClick={() => window.location.reload()}
//               className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
//             >
//               إعادة الواجب
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

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
//                         flaggedQuestions?.questions?.has(currentQuestion)
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
//                       <span>Question {currentQuestion + 1} of {data?.questions?.length}</span>
//                       <span>{getAnsweredCount()} answered</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
//                         style={{ width: `${((currentQuestion + 1) / data?.questions?.length) * 100}%` }}
//                       ></div>
//                     </div>
//                   </div>

//                   {/* Question */}
//                   <div className="mb-8">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-medium text-yellow-800">
//                         Question {currentQuestion + 1}
//                       </h3>
//                       <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
//                         {getQuestionTypeLabel(questions[currentQuestion].format)}
//                       </span>
//                     </div>
//                     <p className="text-gray-700 mb-6">{questions[currentQuestion].question}</p>
                    
//                     {renderQuestion(questions[currentQuestion])}
//                   </div>

//                   {/* Navigation */}
//                   <div className="flex justify-between items-center">
//                     <button
//                       onClick={previousQuestion}
//                       disabled={currentQuestion === 0}
//                       className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
//                     >
//                       <ArrowLeft className="w-5 h-5 mr-2" />
//                       السابق
//                     </button>

//                     <div className="flex space-x-3">
//                       {currentQuestion === data?.questions?.length - 1 ? (
//                         <button
//                           onClick={() => allQuestionsAnswered && setShowConfirmSubmit(true)}
//                           disabled={!allQuestionsAnswered}
//                           className={`bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 ${
//                             !allQuestionsAnswered ? 'opacity-50 cursor-not-allowed' : ''
//                           }`}
//                         >
//                           تسليم الواجب
//                         </button>
//                       ) : (
//                         <button
//                           onClick={nextQuestion}
//                           className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center"
//                         >
//                           التالي
//                           <ArrowRight className="w-5 h-5 ml-2" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 // All Questions View
//                 <div>
//                   {data?.questions?.map((question, index) => (
//                     <div key={question.id} className="mb-8 pb-8 border-b border-gray-200 last:border-b-0">
//                       <div className="flex items-center justify-between mb-4">
//                         <h3 className="text-lg font-medium text-yellow-800">Question {index + 1}</h3>
//                         <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
//                           {getQuestionTypeLabel(question.format)}
//                         </span>
//                       </div>
//                       <p className="text-gray-700 mb-6">{question.question}</p>
                      
//                       {renderQuestion(question, true)}
//                     </div>
//                   ))}

//                   {/* Submit Button for All Questions View */}
//                   <div className='flex justify-center items-center mt-8'>
//                     <button
//                       onClick={() => setShowConfirmSubmit(true)}
//                       disabled={!allQuestionsAnswered}
//                       className={`w-full max-w-3xl py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
//                         allQuestionsAnswered
//                           ? 'bg-yellow-600 hover:bg-yellow-800 text-white'
//                           : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       }`}
//                     >
//                       تسليم الواجب
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Question Navigator Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-6">
//               <h3 className="font-medium text-gray-800 mb-4">نظرة عامة على الأسئلة</h3>
              
//               {/* Progress Summary */}
//               <div className="bg-gray-50 p-3 rounded-lg mb-4">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-yellow-600">{getAnsweredCount()}/{data?.questions?.length}</div>
//                   <div className="text-sm text-gray-600">مكتمل</div>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
//                 {data?.questions?.map((question, index) => {
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
//                       {flaggedQuestions?.questions?.has(index) && (
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
//                   <span>تمت الإجابة</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
//                   <span>مؤشر عليه</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
//                   <span>لم تتم الإجابة</span>
//                 </div>
//               </div>

//               {/* Question Types Summary */}
//               <div className="mb-4">
//                 <h4 className="text-sm font-medium text-gray-700 mb-2">أنواع الأسئلة:</h4>
//                 <div className="space-y-1 text-xs text-gray-600">
//                   <div className="flex justify-between">
//                     <span>اختيار من متعدد:</span>
//                     <span>{data?.questions?.filter(q => q.format === 'MCQ').length}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>صح/خطأ:</span>
//                     <span>{data?.questions?.filter(q => q.format === 'TRUE_FALSE').length}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>سؤال مقالي:</span>
//                     <span>{data?.questions?.filter(q => q.format === 'TEXT').length}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>التوصيل:</span>
//                     <span>{data?.questions?.filter(q => q.format === 'MATCHING').length}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Quick Submit */}
//               <button
//                 onClick={() => setShowConfirmSubmit(true)}
//                 disabled={!allQuestionsAnswered}
//                 className={`w-full py-2 px-4 rounded-lg font-medium transition duration-200 ${
//                   allQuestionsAnswered
//                     ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 تسليم الواجب
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Confirm Submit Modal */}
//       {showConfirmSubmit && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">
//               {allQuestionsAnswered ? "تسليم الواجب؟" : "واجب غير مكتمل"}
//             </h3>
//             <p className="text-gray-600 mb-6">
//               لقد أجبت على {getAnsweredCount()} من أصل {data?.questions?.length} أسئلة. 
//               {!allQuestionsAnswered && " يرجى الإجابة على جميع الأسئلة قبل التسليم."}
//             </p>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setShowConfirmSubmit(false)}
//                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
//               >
//                 إلغاء
//               </button>
//               <button
//                 onClick={handleSubmitAssignment}
//                 disabled={!allQuestionsAnswered}
//                 className={`flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ${
//                   !allQuestionsAnswered ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 تسليم
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }