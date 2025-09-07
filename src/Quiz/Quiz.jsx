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
  
    useEffect(() => {
         window.scrollTo(0, 0);
      });
  // State management
  const [matchingConnections, setMatchingConnections] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [viewMode, setViewMode] = useState('single');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizEnded, setQuizEnded] = useState(false);

  // Extract quiz data from API response
  const quizData = quizDetail?.data?.data;
  console.log({quizData , quizDetail});
  
  let navigate = useNavigate()

  // Handle quiz already solved error
  useEffect(() => {
    if (quizDetail?.error && quizDetail.error.includes("لقد تم حل هذا الامتحان مسبقًا")) {
      // toast.error("لقد تم حل هذا الامتحان مسبقًا");
      // Redirect to previous page after 2 seconds
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  }, [quizDetail?.error, navigate]);

  // Handle quiz submission error
  useEffect(() => {
    if (quizDetailAnswer?.error) {
      if (quizDetailAnswer.error.includes("لقد تم حل هذا الامتحان مسبقًا")) {
        // toast.error("لقد تم حل هذا الامتحان مسبقًا");
        // Redirect to previous page after 2 seconds
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        toast.error(quizDetailAnswer.error);
      }
    }
  }, [quizDetailAnswer?.error, navigate]);

  // Check if quiz has ended
  useEffect(() => {
    if (quizData?.end_time) {
      const now = new Date();
      const endTime = new Date(quizData.end_time);
      console.log('Quiz End Check:', {
        now: now.toISOString(),
        endTime: endTime.toISOString(),
        isEnded: now > endTime
      });
      
      if (now > endTime) {
        console.log('Quiz has ended - current time is after end time');
        setQuizEnded(true);
        setTimeRemaining(0);
      }
    }
  }, [quizData]);

  // Timer effect - Calculate remaining time from start_time and end_time
  useEffect(() => {
    if (quizData?.start_time && quizData?.end_time && !quizEnded) {
      const now = new Date();
      const startTime = new Date(quizData.start_time);
      const endTime = new Date(quizData.end_time);
      
      console.log('Timer Debug:', {
        now: now.toISOString(),
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        nowTime: now.getTime(),
        startTimeMs: startTime.getTime(),
        endTimeMs: endTime.getTime(),
        timeDiff: endTime.getTime() - startTime.getTime(),
        timeDiffSeconds: Math.floor((endTime.getTime() - startTime.getTime()) / 1000),
        isAfterEnd: now > endTime
      });
      
      // First check if quiz has ended
      if (now > endTime) {
        console.log('Quiz has ended - current time is after end time');
        setQuizEnded(true);
        setTimeRemaining(0);
        return;
      }
      
      // Check if quiz has started
      if (now < startTime) {
        // Quiz hasn't started yet - show countdown to start
        const timeUntilStart = Math.floor((startTime - now) / 1000);
        setTimeRemaining(timeUntilStart);
        console.log('Quiz not started yet, time until start:', timeUntilStart);
      } else if (now >= startTime && now < endTime) {
        // Quiz is active - show remaining time
        const remainingTime = Math.floor((endTime - now) / 1000);
        setTimeRemaining(Math.max(0, remainingTime));
        console.log('Quiz active, remaining time:', remainingTime);
      }
    }
  }, [quizData, quizEnded]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && !quizEnded && !isSubmitted) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isSubmitted && !quizEnded) {
      // Show error message and end quiz when time runs out
      toast.error("تم انتهاء مدة هذا الامتحان");
      setQuizEnded(true);
    }
  }, [timeRemaining, isSubmitted, quizEnded]);

  // Additional timer calculation as fallback
  useEffect(() => {
    if (quizData?.start_time && quizData?.end_time && !quizEnded && !isSubmitted) {
      const calculateRemainingTime = () => {
        const now = new Date();
        const startTime = new Date(quizData.start_time);
        const endTime = new Date(quizData.end_time);
        
        // First check if quiz has ended
        if (now > endTime) {
          console.log('Fallback: Quiz has ended');
          setQuizEnded(true);
          return 0;
        }
        
        if (now < startTime) {
          return Math.floor((startTime - now) / 1000);
        } else if (now >= startTime && now < endTime) {
          return Math.floor((endTime - now) / 1000);
        } else {
          return 0;
        }
      };
      
      // Update timer every second as a fallback
      const interval = setInterval(() => {
        const remaining = calculateRemainingTime();
        if (remaining !== timeRemaining) {
          setTimeRemaining(remaining);
        }
        if (remaining === 0 && new Date() > new Date(quizData.end_time)) {
          setQuizEnded(true);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [quizData, quizEnded, isSubmitted, timeRemaining]);

  // Show quiz ended message and redirect
  useEffect(() => {
    if (quizEnded && !isSubmitted) {
      // Show error message that exam time has ended
      toast.error("تم انتهاء مدة هذا الامتحان");
      
      // Redirect to class-specific-lesson after 2 seconds
      const timer = setTimeout(() => {
        navigate('/class-specific-lesson');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [quizEnded, isSubmitted, navigate]);

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
        toast.error('فشل في تحميل بيانات الامتحان');
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
    if (seconds < 0) return '00:00';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
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

  // Quiz ended view
  if (quizEnded && !isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="text-center py-12">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">انتهت مدة الامتحان</h1>
          <p className="text-gray-600 mb-6">
            تم انتهاء مدة هذا الامتحان. سيتم توجيهك إلى صفحة الدروس.
          </p>
          <div className="animate-pulse">
            <div className="text-sm text-gray-500">
              جاري التوجيه خلال ثانيتين...
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            onClick={() => navigate('/class-specific-lesson')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
          {loading ? <div className='flex justify-center items-center min-h-screen'>
          <div className='text-center'>
            <div className='text-6xl mb-4'>⏳</div>
            <p className='text-lg text-gray-700 mb-4'>جاري تحميل بيانات الامتحان...</p>
          </div>
        </div> : quizDetail.error? <div className='flex justify-center items-center min-h-screen'>
          <div className='text-center'>
            <div className='text-6xl mb-4'>⚠️</div>
            <p className='text-lg text-gray-700 mb-4'>{quizDetail.error}</p>
            <button 
              onClick={() => navigate(-1)}
              className='px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors'
            >
              العودة للصفحة السابقة
            </button>
          </div>
        </div> : !quizData ? <div className='flex justify-center items-center min-h-screen'>
          <div className='text-center'>
            <div className='text-6xl mb-4'>❌</div>
            <p className='text-lg text-gray-700 mb-4'>لا توجد بيانات للامتحان</p>
            <button 
              onClick={() => navigate(-1)}
              className='px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors'
            >
              العودة للصفحة السابقة
            </button>
          </div>
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
            <div className={`flex items-center px-3 py-2 rounded-lg ${
              new Date() < new Date(quizData.start_time) 
                ? 'bg-blue-50' 
                : timeRemaining < 300 
                  ? 'bg-red-50' 
                  : 'bg-green-50'
            }`}>
              <Clock className={`w-5 h-5 mr-2 ${
                new Date() < new Date(quizData.start_time) 
                  ? 'text-blue-600' 
                  : timeRemaining < 300 
                    ? 'text-red-600' 
                    : 'text-green-600'
              }`} />
              <div className="flex flex-col">
                <span className={`font-mono font-bold ${
                  new Date() < new Date(quizData.start_time) 
                    ? 'text-blue-600' 
                    : timeRemaining < 300 
                      ? 'text-red-600' 
                      : 'text-gray-700'
                }`}>
                  {formatTime(timeRemaining)}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date() < new Date(quizData.start_time) ? 'Until Start' : 'Remaining'}
                </span>
              </div>
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
                {/* <button
                  onClick={() => setViewMode('all')}
                  className={`px-4 py-2 rounded-lg transition duration-200 ${
                    viewMode === 'all' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All Questions
                </button> */}
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
                    السابق
                  </button>

                  <div className="flex space-x-3">
                    {currentQuestion === quizData.questions.length - 1 ? (
                      <button
                        onClick={() => setShowConfirmSubmit(true)}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                      >
                        إرسال الامتحان
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