// import { useState } from 'react'

// import './App.css'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import AuthLayout from './Layouts/AuthLayout'
//  import LoginPage from './Pages/Auth/Login/Login'

// import RegisterPage from './Pages/Auth/Register/Register'
// import { useTranslation } from 'react-i18next'
// import Home from './Pages/Home/Home'
// import MainLayout from './Layouts/MainLayout'
// import CoursesPage from './Pages/Courses/Courses'
// import CourseDetailPage from './Pages/Courses/SingleCourse'

// import ContactUs from './Pages/ContactUs/ContactUs'
// import NotFound from './Pages/NotFound/NotFound'
// import Subscriptions from './Pages/Subscriptions/Subscriptions'
// import AssignmentDetails from './Pages/AssignmentDetails/AssignmentDetails'
// import ProfilePage from './Pages/Profile/Profile'
// import QuizComponent from './Quiz/Quiz'


// function App() {
//  let {i18n} =useTranslation()
//   return (
//     <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
//     <BrowserRouter >
//         <Routes>
//           <Route element={<AuthLayout />}>
//       {/* Child routes */}
     
//       <Route path="/" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />
    

//     </Route>
//           <Route  element={<MainLayout />}>
//       <Route path="/home" element={<Home />} />
//       <Route path="/courses" element={<CoursesPage />} />
//       <Route path="/courses/:id" element={<CourseDetailPage />} />
      
      
//       <Route path="/contact" element={<ContactUs />} />
//       <Route path="/subscriptions" element={<Subscriptions />} />
//       <Route path="/assignmentDetails/:id" element={<AssignmentDetails />} />
//       <Route path="/QuizDetails/:id" element={<QuizComponent />} />
//       <Route path="/profile" element={<ProfilePage />} />

//     </Route>
       
//         <Route path='*' element={<NotFound/>}/>
//         </Routes>
//       </BrowserRouter>

     
//     </div>
//   )
// }

// export default App





import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import AuthLayout from './Layouts/AuthLayout'
import LoginPage from './Pages/Auth/Login/Login'
import RegisterPage from './Pages/Auth/Register/Register'
import { useTranslation } from 'react-i18next'
import Home from './Pages/Home/Home'
import MainLayout from './Layouts/MainLayout'
import CoursesPage from './Pages/Courses/Courses'
import CourseDetailPage from './Pages/Courses/SingleCourse'
import ContactUs from './Pages/ContactUs/ContactUs'
import NotFound from './Pages/NotFound/NotFound'
import Subscriptions from './Pages/Subscriptions/Subscriptions'
import AssignmentDetails from './Pages/AssignmentDetails/AssignmentDetails'
import ProfilePage from './Pages/Profile/Profile'
import QuizComponent from './Quiz/Quiz'

// Security Modal Component
const SecurityModal = ({ isVisible, onClose, message, countdown }) => {
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999999,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '40px',
        borderRadius: '15px',
        textAlign: 'center',
        maxWidth: '500px',
        border: '2px solid #ff4444',
        boxShadow: '0 20px 40px rgba(255, 68, 68, 0.3)'
      }}>
        <div style={{
          fontSize: '60px',
          marginBottom: '20px'
        }}>🚫</div>
        
        <h2 style={{
          color: '#ff4444',
          marginBottom: '20px',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Security Violation Detected!
        </h2>
        
        <p style={{
          color: '#ffffff',
          marginBottom: '30px',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          {message}
        </p>
        
        <div style={{
          backgroundColor: '#ff4444',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          Redirecting to login in: {countdown}s
        </div>
        
        <p style={{
          color: '#cccccc',
          fontSize: '14px',
          fontStyle: 'italic'
        }}>
          All session data will be cleared for security purposes.
        </p>
      </div>
    </div>
  );
};

// Black Screen Overlay Component
const BlackScreenOverlay = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      zIndex: 999998,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        color: '#ffffff',
        fontSize: '24px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔒</div>
        <h2>Content Protected</h2>
        <p>Screen capture attempt detected</p>
      </div>
    </div>
  );
};

// Enhanced Screen Protection Hook
const useAdvancedScreenProtection = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [countdown, setCountdown] = useState(5);

  const triggerSecurityViolation = (violationType) => {
    console.error(`🚫 Security violation: ${violationType}`);
    
    // Show black screen immediately
    setShowBlackScreen(true);
    
    // Set appropriate message based on violation type
    let message = '';
    switch (violationType) {
      case 'screenshot':
        message = 'Screenshot attempt detected! Taking screenshots of this content is strictly prohibited.';
        break;
      case 'screen_recording':
        message = 'Screen recording attempt detected! Recording this content is not allowed.';
        break;
      case 'print':
        message = 'Print attempt detected! Printing this content is not permitted.';
        break;
      case 'snipping_tool':
        message = 'Snipping tool detected! Using screenshot tools is prohibited.';
        break;
      default:
        message = 'Unauthorized screen capture attempt detected!';
    }
    
    setModalMessage(message);
    setShowModal(true);
    
    // Start countdown
    let timeLeft = 5;
    setCountdown(timeLeft);
    
    const countdownInterval = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);
      
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        redirectToLogin();
      }
    }, 1000);
  };

  const redirectToLogin = () => {
    // Clear all storage
    try {
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear cookies
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      });
      
      // Clear any cached data
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
    
    // Force redirect to login
    window.location.href = '/';
    window.location.reload();
  };

  useEffect(() => {
    // Enhanced keyboard protection
    const handleKeyDown = (e) => {
      // =================
      // PRIMARY SCREENSHOT TARGETS
      // =================
      
      // 1. Print Screen (All variations)
      if (e.key === 'PrintScreen' || e.key === 'Print' || e.keyCode === 44) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        triggerSecurityViolation('screenshot');
        return false;
      }
      
      // 2. Windows + Shift + S (Snipping Tool)
      if (e.metaKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityViolation('snipping_tool');
        return false;
      }
      
      // 3. Alt + Print Screen (Active window screenshot)
      if (e.altKey && (e.key === 'PrintScreen' || e.keyCode === 44)) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityViolation('screenshot');
        return false;
      }
      
      // 4. Windows + Print Screen (Auto-save screenshot)
      if (e.metaKey && (e.key === 'PrintScreen' || e.keyCode === 44)) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityViolation('screenshot');
        return false;
      }
      
      // 5. Ctrl + P (Print)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityViolation('print');
        return false;
      }
      
      // 6. Mac Screenshots
      // Cmd + Shift + 3 (Full screenshot)
      if (e.metaKey && e.shiftKey && e.key === '3') {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityViolation('screenshot');
        return false;
      }
      
      // Cmd + Shift + 4 (Partial screenshot)
      if (e.metaKey && e.shiftKey && e.key === '4') {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityViolation('screenshot');
        return false;
      }
      
      // Cmd + Shift + 5 (Screenshot options)
      if (e.metaKey && e.shiftKey && e.key === '5') {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityViolation('screenshot');
        return false;
      }
      
      // =================
      // DEVELOPER TOOLS BLOCKING
      // =================
      
      // F12 (Dev Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+I (Dev Tools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }
      
      // =================
      // OTHER PROTECTIONS
      // =================
      
      // S key outside input fields
      if (e.key === 's' || e.key === 'S') {
        const inputElements = ['INPUT', 'TEXTAREA', 'SELECT'];
        const isInputField = inputElements.includes(e.target.tagName) || 
                            e.target.contentEditable === 'true';
        
        if (!isInputField && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          return false;
        }
      }
      
      // Ctrl+S (Save) outside input fields
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        const inputElements = ['INPUT', 'TEXTAREA', 'SELECT'];
        const isInputField = inputElements.includes(e.target.tagName) || 
                            e.target.contentEditable === 'true';
        
        if (!isInputField) {
          e.preventDefault();
          return false;
        }
      }
      
      // Disable copy/cut/paste/select all
      if (e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        return false;
      }
    };

    // Key up detection for additional security
    const handleKeyUp = (e) => {
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        triggerSecurityViolation('screenshot');
      }
    };

    // Right-click protection
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Screen recording detection
    const detectScreenRecording = () => {
      // Override getDisplayMedia
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia;
        navigator.mediaDevices.getDisplayMedia = function(...args) {
          triggerSecurityViolation('screen_recording');
          return Promise.reject(new Error('Screen recording not allowed'));
        };
      }
      
      // Override MediaRecorder
      if (window.MediaRecorder) {
        const originalMediaRecorder = window.MediaRecorder;
        window.MediaRecorder = function(...args) {
          triggerSecurityViolation('screen_recording');
          throw new Error('Media recording not allowed');
        };
      }
      
      // Monitor getUserMedia for screen capture
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const originalGetUserMedia = navigator.mediaDevices.getUserMedia;
        navigator.mediaDevices.getUserMedia = function(constraints) {
          if (constraints && constraints.video && 
              (constraints.video.mediaSource === 'screen' || 
               constraints.video.chromeMediaSource === 'screen' ||
               constraints.video.mozMediaSource === 'screen')) {
            triggerSecurityViolation('screen_recording');
            return Promise.reject(new Error('Screen capture not allowed'));
          }
          return originalGetUserMedia.call(this, constraints);
        };
      }
    };

    // Disable text selection
    const disableSelection = () => {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      document.body.style.mozUserSelect = 'none';
      document.body.style.msUserSelect = 'none';
    };

    // Disable drag and drop
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Blur content when window loses focus
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setShowBlackScreen(true);
        setTimeout(() => {
          if (!document.hidden) {
            setShowBlackScreen(false);
          }
        }, 1000);
      } else {
        setShowBlackScreen(false);
      }
    };

    // Console protection
    const consoleWarning = () => {
      console.clear();
      console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
      console.log('%cThis is a protected application. Unauthorized access attempts are logged.', 'color: red; font-size: 16px;');
    };

    // Apply all protections
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keyup', handleKeyUp, true);
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    disableSelection();
    detectScreenRecording();
    consoleWarning();

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keyup', handleKeyUp, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Reset styles
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.mozUserSelect = '';
      document.body.style.msUserSelect = '';
    };
  }, []);

  return { showModal, showBlackScreen, modalMessage, countdown, setShowModal };
};

function App() {
  const { i18n } = useTranslation();
  const { showModal, showBlackScreen, modalMessage, countdown, setShowModal } = useAdvancedScreenProtection();

  return (
    <div 
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      style={{
        userSelect: 'none',
        webkitUserSelect: 'none',
        mozUserSelect: 'none',
        msUserSelect: 'none',
        webkitTouchCallout: 'none',
        webkitUserDrag: 'none',
        webkitTapHighlightColor: 'transparent'
      }}
    >
      {/* Black Screen Overlay */}
      <BlackScreenOverlay isActive={showBlackScreen} />
      
      {/* Security Modal */}
      <SecurityModal 
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
        countdown={countdown}
      />
      
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/assignmentDetails/:id" element={<AssignmentDetails />} />
            <Route path="/QuizDetails/:id" element={<QuizComponent />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



