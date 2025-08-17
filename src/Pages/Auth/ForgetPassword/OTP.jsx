// import  { useState, useEffect } from 'react';
// import { Mail, Shield, Clock, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { apiRequest } from '../../../Redux/Apis/apiRequest';

// const SendotpForgetPassword = () => {
//       const [searchParams] = useSearchParams();
//   const email = searchParams.get('email');
//   const [otp, setOtp] = useState('');
//   const [otpError, setOtpError] = useState('');
//   const [countdown, setCountdown] = useState(0);
//   const [isResending, setIsResending] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [resendSuccess, setResendSuccess] = useState(false);
// let dispatch = useDispatch();
// let navigate = useNavigate()
//   // Countdown timer for resend button
//   useEffect(() => {
//     let timer;
//     if (countdown > 0) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     }
//     return () => clearTimeout(timer);
//   }, [countdown]);

 

//   const handleOTPChange = (e) => {
//     const value = e.target.value.replace(/\D/g, ''); // Only allow digits
//     if (value.length <= 4) {
//       setOtp(value);
//       if (otpError) setOtpError(''); // Clear error when user types
//     }
//   };

//   const handleVerify = async () => {
//     if (!otp) {
//       setOtpError('OTP is required');
//       return;
//     }
    
//     if (otp.length !== 4) {
//       setOtpError('OTP must be exactly 4 digits');
//       return;
//     }

//     setIsVerifying(true);
//     setOtpError('');
    
//     try {
//       let response = await dispatch(apiRequest({
//         entity: "verifycodeforgetpassword",
//         url: "api/verifyOtp",
//         method: "POST",
//         data: { email, otp }
//       }));

//       console.log('✅ Verification Response:', response);
//       if( response?.payload?.success == true){

        
//           navigate(`/reset-password?email=${encodeURIComponent(email)}`);

//       }
//       // Handle successful verification
     
      
//     } catch (error) {
//       console.log('❌ Verification Error:', error);
//       if (error.response?.data?.message) {
//         setOtpError(error.response.data.message);
//       } else {
//         setOtpError("Verification failed. Please try again.");
//       }
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   const handleResendOTP = async () => {
    
//     setIsResending(true);
//     setResendSuccess(false);
//     setOtpError('');
    
//     try {
//       let response = await dispatch(apiRequest({
//         entity: "resendotpforgetpassword",
//         url: "api/otp",
//         method: "POST",
//         data: { email }
//       }))

//       if(response.payload.success == true){

//           console.log('✅ Resend Response:', response);
//           setResendSuccess(true);
//           setCountdown(60); // 60 second cooldown
//           setTimeout(() => setResendSuccess(false), 3000);
//       }
      
      
//       // Auto-hide success message after 3 seconds
      
//     } catch (error) {
//       console.log('❌ Resend Error:', error);
//       if (error.response?.data?.message) {
//         setOtpError(error.response.data.message);
//       } else {
//         setOtpError("Failed to resend OTP. Please try again.");
//       }
//     } finally {
//       setIsResending(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleVerify();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-purple-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full space-y-8">
//         <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="mx-auto h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
//               <Shield className="h-8 w-8 text-yellow-600" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Account</h2>
//             <p className="text-gray-600 text-sm">
//               We've sent a 4-digit verification code to
//             </p>
//             <div className="flex items-center justify-center mt-2 p-2 bg-gray-50 rounded-lg">
//               <Mail className="h-4 w-4 text-gray-400 mr-2" />
//               <span className="text-sm font-medium text-gray-700">{email}</span>
//             </div>
//           </div>

//           {/* Success Message */}
//           {resendSuccess && (
//             <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
//               <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//               <span className="text-sm text-green-700">New OTP sent successfully!</span>
//             </div>
//           )}

//           <div className="space-y-6">
//             {/* OTP Input */}
//             <div>
//               <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
//                 Enter Verification Code
//               </label>
//               <div className="relative">
//                 <input
//                   id="otp"
//                   name="otp"
//                   type="text"
//                   value={otp}
//                   onChange={handleOTPChange}
//                   onKeyPress={handleKeyPress}
//                   placeholder="0000"
//                   className={`w-full px-4 py-3 text-center text-2xl font-mono tracking-widest border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors ${
//                     otpError
//                       ? 'border-red-300 bg-red-50'
//                       : 'border-gray-300'
//                   }`}
//                   maxLength="4"
//                 />
//                 {otpError && (
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                     <AlertCircle className="h-5 w-5 text-red-400" />
//                   </div>
//                 )}
//               </div>
//               {otpError && (
//                 <p className="mt-1 text-sm text-red-600">{otpError}</p>
//               )}
//             </div>

//             {/* Verify Button */}
//             <button
//               onClick={handleVerify}
//               disabled={isVerifying || !otp}
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               {isVerifying ? (
//                 <>
//                   <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
//                   Verifying...
//                 </>
//               ) : (
//                 <>
//                   <CheckCircle className="-ml-1 mr-2 h-4 w-4" />
//                   Verify Account
//                 </>
//               )}
//             </button>

//             {/* Resend Section */}
//             <div className="text-center pt-4 border-t border-gray-100">
//               <p className="text-sm text-gray-600 mb-3">
//                 Didn't receive the code?
//               </p>
              
//               {countdown > 0 ? (
//                 <div className="flex items-center justify-center text-sm text-gray-500">
//                   <Clock className="h-4 w-4 mr-1" />
//                   Resend in {countdown} seconds
//                 </div>
//               ) : (
//                 <button
//                   onClick={handleResendOTP}
//                   disabled={isResending}
//                   className="inline-flex items-center px-4 py-2 text-sm font-medium text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   {isResending ? (
//                     <>
//                       <RefreshCw className="animate-spin -ml-1 mr-2 h-3 w-3" />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <RefreshCw className="-ml-1 mr-2 h-3 w-3" />
//                       Resend Code
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="mt-6 text-center">
//             <p className="text-xs text-gray-500">
//               Having trouble? Contact our support team for assistance.
//             </p>
//           </div>
//         </div>

//         {/* Additional Info */}
//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             The verification code will expire in 10 minutes for security.
//           </p>
//         </div>

       
//       </div>
//     </div>
//   );
// };

// export default SendotpForgetPassword;

import { useState, useEffect } from 'react';
import { Mail, Shield, Clock, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { apiRequest } from '../../../Redux/Apis/apiRequest';
import { useTranslation } from 'react-i18next';

const SendotpForgetPassword = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setOtp(value);
      if (otpError) setOtpError('');
    }
  };

  const handleVerify = async () => {
    if (!otp) {
      setOtpError(t('otpVerification.errors.otpRequired'));
      return;
    }
    
    if (otp.length !== 4) {
      setOtpError(t('otpVerification.errors.invalidOtpLength'));
      return;
    }

    setIsVerifying(true);
    setOtpError('');
    
    try {
      let response = await dispatch(apiRequest({
        entity: "verifycodeforgetpassword",
        url: "api/verifyOtp",
        method: "POST",
        data: { email, otp }
      }));

      if (response?.payload?.success) {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      setOtpError(error.response?.data?.message || t('otpVerification.errors.verificationFailed'));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setResendSuccess(false);
    setOtpError('');
    
    try {
      let response = await dispatch(apiRequest({
        entity: "resendotpforgetpassword",
        url: "api/otp",
        method: "POST",
        data: { email }
      }));

      if (response.payload.success) {
        setResendSuccess(true);
        setCountdown(60);
        setTimeout(() => setResendSuccess(false), 3000);
      }
    } catch (error) {
      setOtpError(error.response?.data?.message || t('otpVerification.errors.resendFailed'));
    } finally {
      setIsResending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-purple-50 flex items-center justify-center p-4 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('otpVerification.title')}</h2>
            <p className="text-gray-600 text-sm">
              {t('otpVerification.subtitle')}
            </p>
            <div className="flex items-center justify-center mt-2 p-2 bg-gray-50 rounded-lg">
              <Mail className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700">{email}</span>
            </div>
          </div>

          {resendSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm text-green-700">{t('otpVerification.resendSuccess')}</span>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                {t('otpVerification.otpLabel')}
              </label>
              <div className="relative">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={handleOTPChange}
                  onKeyPress={handleKeyPress}
                  placeholder={t('otpVerification.otpPlaceholder')}
                  className={`w-full px-4 py-3 text-center text-2xl font-mono tracking-widest border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors ${
                    otpError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  maxLength="4"
                />
                {otpError && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                )}
              </div>
              {otpError && (
                <p className="mt-1 text-sm text-red-600">{otpError}</p>
              )}
            </div>

            <button
              onClick={handleVerify}
              disabled={isVerifying || !otp}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="animate-spin  mx-2 h-4 w-4" />
                  {t('otpVerification.verifyingButton')}
                </>
              ) : (
                <>
                  <CheckCircle className=" mx-2 h-4 w-4" />
                  {t('otpVerification.verifyButton')}
                </>
              )}
            </button>

            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-3">
                {t('otpVerification.didNotReceive')}
              </p>
              
              {countdown > 0 ? (
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mx-2" />
                  {t('otpVerification.resendCountdown', { count: countdown })}
                </div>
              ) : (
                <button
                  onClick={handleResendOTP}
                  disabled={isResending}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="animate-spin mx-2 h-3 w-3" />
                      {t('otpVerification.resendingButton')}
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mx-2 h-3 w-3" />
                      {t('otpVerification.resendButton')}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              {t('otpVerification.supportText')}
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {t('otpVerification.expiryNotice')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SendotpForgetPassword;