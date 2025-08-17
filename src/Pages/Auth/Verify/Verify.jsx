import { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, RefreshCw, Shield } from 'lucide-react';
import { apiRequest } from '../../../Redux/Apis/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const verifyEmail = ({onEmailSent}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
let dispatch = useDispatch();
let navigate = useNavigate()
  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

 

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) setEmailError(''); // Clear error when user types
  };

  const handleSendOTP = async () => {
    // Validation
    if (!email) {
      setEmailError('Email address is required');
      return;
    }
    
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsSending(true);
    setEmailError('');
    setSendSuccess(false);
    
    try {
      let response = await dispatch( apiRequest({
        entity: "sendOTP",
        url: "api/otp",
        method: "POST",
        data: { email },
         headers: {
             "Accept-Language": localStorage.getItem('language') || 'en',
              
            }
      }))
      
      //console.log({'✅ Send OTP Response:': response.payload.success});
      if(response.payload.success ==true){

          navigate("/send-otp")
          setSendSuccess(true);
      }
      
      // Call parent component callback if provided
      if (onEmailSent) {
        setTimeout(() => {
          onEmailSent(email);
        }, 1500);
      }
      
    } catch (error) {
      //console.log('❌ Send OTP Error:', error);
      if (error.response?.data?.message) {
        setEmailError(error.response.data.message);
      } else {
        setEmailError("Failed to send OTP. Please try again.");
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendOTP();
    }
  };

  const handleTryAgain = () => {
    setSendSuccess(false);
    setEmail('');
    setEmailError('');
  };

  if (sendSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Success State */}
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">OTP Sent Successfully!</h2>
              <p className="text-gray-600 text-sm mb-4">
                We've sent a 4-digit verification code to
              </p>
              <div className="flex items-center justify-center mb-6 p-2 bg-gray-50 rounded-lg">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700">{email}</span>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    Please check your email inbox and enter the verification code to complete your account setup.
                  </p>
                </div>
                
                <button
                  onClick={handleTryAgain}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                >
                  Send to Different Email
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              The verification code will expire in 10 minutes for security.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
            <p className="text-gray-600 text-sm">
              Enter your email address to receive a verification code and secure your account.
            </p>
          </div>

          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onKeyPress={handleKeyPress}
                  placeholder="your.email@example.com"
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors ${
                    emailError
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  }`}
                />
                {emailError && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                )}
              </div>
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>

            {/* Send OTP Button */}
            <button
              onClick={handleSendOTP}
              disabled={isSending || !email}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSending ? (
                <>
                  <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Sending OTP...
                </>
              ) : (
                <>
                  <Send className="-ml-1 mr-2 h-4 w-4" />
                  Send Verification Code
                </>
              )}
            </button>

            {/* Security Notice */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800 mb-1">Secure Verification</h4>
                  <p className="text-xs text-blue-600">
                    We'll send a 4-digit code to verify your email address. This helps keep your account secure.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>

        {/* Demo Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Demo:</strong> Enter any valid email format to simulate sending OTP.
          </p>
        </div>
      </div>
    </div>
  );
};

export default verifyEmail;