


import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../../Redux/Apis/apiRequest';
import toast from 'react-hot-toast';

// import { useTranslation } from "react-i18next";
import { AuthenticationWarning } from "./AuthenticationWarning";

// export default function SubscriptionModal({course }) {
//   const {t, i18n}=useTranslation()
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState({
//     term: '',
//     section: '',
//     month: ''
//   });
// let dispatch = useDispatch();
//   let {Packages}= useSelector((state) => state.api);
  
//     const [packageId, setPackageId] = useState(null);
  
//     console.log({packageId});
    
//     let {subscription} = useSelector((state) => state.api);
  
//     const handleSubscriptionApi = async () => {
//       if (!packageId) {
//         toast.error("Package ID is required");
//         return;
//       }
//       if (!course?.id) {
//         toast.error("course ID is required");
//         return;
//       }
      
//       // Create form data
//       const formData = new FormData();
//       formData.append('package_id', packageId);
   
      
//        await dispatch(apiRequest({
//         entity: "subscription",
//         url: `api/sub_scriptions/subscriptions/${course?.id}`,
//         method: "POST",
//         data: formData,
//         headers: {
//           "Accept-Language": localStorage.getItem('language') || 'en',
//           "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
//         },
//       }));
      
      
//     }

//   useEffect(()=>{
//     dispatch(apiRequest({
//       entity: "Packages",
//       url: "api/packages",
//       method: "GET",
//       headers: {
//         "Accept-Language": localStorage.getItem('language') || 'en',}
//         }))
//   },[dispatch , localStorage.getItem('language')]);



//   const handleOptionChange = (value) => {
//     setPackageId(value);
//     setSelectedOption(prev => ({
//       ...prev,
//       term: value // Simplified since we only have one group now
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     //console.log('Selected subscription:', selectedOption);
//     setIsOpen(false);
//     // Add your submission logic here
//   };

//   return (
//     <>
//       {/* Subscription Button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="px-4 py-2 w-full text-sm font-medium bg-amber-400 hover:bg-amber-500 text-gray-900 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
//       >
//         {t("course.subscriptions")}
//         {/* Subscription */}
//       </button>

//       {/* Modal Overlay */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
//             {/* Modal Header */}
//             <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
//               <h2 className="text-xl font-semibold text-gray-800">Subscription Options</h2>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-400 hover:text-gray-500 focus:outline-none"
//                 aria-label="Close modal"
//               >
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {/* Modal Body */}
//             <form onSubmit={handleSubmit} className="px-6 py-4">
//               <div className="space-y-4">
//                 {/* Subscription Options */}
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-700 mb-3">Select your subscription plan</h3>
//                   <div className="space-y-3">
//                     {Packages?.data?.data?.map(option => (<div key={option.id} >
                    
                    
//                       {option.duration_label=="الحصة"  || option.duration_label=="Section"? <label 
//                         key={option.id}
//                         className={`flex items-center justify-between p-3 rounded-lg border ${
//                           selectedOption.term === option.id 
//                             ? 'border-amber-300 bg-amber-50' 
//                             : 'border-gray-200 hover:border-amber-200'
//                         } transition-colors duration-200 cursor-pointer`}
//                       >
//                         <div className="flex items-center">
//                           <input
//                             type="radio"
//                             name="subscription"
//                             value={option.id}
//                             checked={selectedOption.term === option.id}
//                             onChange={() => handleOptionChange(option?.id)}
//                             className="h-4 w-4 text-amber-500 focus:!ring-amber-500  border-yellow-300"
//                           />
//                           <span className="mx-3 text-gray-700 font-medium">{option?.duration_label}</span>
//                         </div>
//                         <span className="text-gray-600 font-medium">{option?.price}</span>
//                       </label>:""}
//                     </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
//                 >
                  
//                   {t("course.cancel")}
//                 </button>
//                 <button
//                   type="submit"
//                   onClick={handleSubscriptionApi}
//                   disabled={!selectedOption.term}
//                   className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
//                     selectedOption.term 
//                       ? 'bg-amber-500 hover:bg-amber-600' 
//                       : 'bg-amber-300 cursor-not-allowed'
//                   } transition-colors duration-200`}
//                 >
//                   {/* Confirm Subscription */}
//                   {t("course.confirm")}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }





export default function SubscriptionModal({ course }) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    term: '',
    section: '',
    month: ''
  });
  
  let dispatch = useDispatch();
  let { Packages } = useSelector((state) => state.api);
  
  const [packageId, setPackageId] = useState(null);
  
  
  
  let { subscription } = useSelector((state) => state.api);

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    return !!token;
  };



  const handleSubscriptionApi = async () => {
  // Check authentication first
  if (!isAuthenticated()) {
    setShowAuthWarning(true);
    return;
  }

  if (!packageId) {
    toast.error("Package ID is required");
    return;
  }
  if (!course?.id) {
    toast.error("Course ID is required");
    return;
  }
  
  // Create JSON data instead of FormData
  const jsonData = {
    package_id: packageId,
    lesson_id: course.id
  };
 
  let x = await dispatch(apiRequest({
    entity: "subscription",
    url: `api/sub_scriptions/subscriptions`,
    method: "POST",
    data: jsonData, // Send JSON data instead of FormData
    headers: {
      "Accept-Language": localStorage.getItem('language') || 'en',
      "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Add JSON content type
    },
  }));
  
  // console.log({response: x});
};
  
  const handleLogin = () => {
    // Navigate to login page - adjust the route according to your routing setup
    window.location.href = '/login';
    // Or if using React Router: navigate('/login');
  };

  const handleRegister = () => {
    // Navigate to register page - adjust the route according to your routing setup
    window.location.href = '/register';
    // Or if using React Router: navigate('/register');
  };

  const handleOpenModal = () => {
    // Check authentication when opening subscription modal
    if (!isAuthenticated()) {
      setShowAuthWarning(true);
      return;
    }
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(apiRequest({
      entity: "Packages",
      url: "api/packages",
      method: "GET",
      headers: {
        "Accept-Language": localStorage.getItem('language') || 'en',
        "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token") }`,

      }
    }));
  }, [dispatch, localStorage.getItem('language')]);
console.log({Packages});

  const handleOptionChange = (value) => {
    setPackageId(value);
    setSelectedOption(prev => ({
      ...prev,
      term: value // Simplified since we only have one group now
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <>
      {/* Subscription Button */}
      <div className="relative">
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 w-full text-sm font-medium bg-amber-400 hover:bg-amber-500 text-gray-900 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 relative"
        >
          {t("course.subscriptions")}
          {/* {!isAuthenticated() && (
            <div className="absolute -top-1 -right-1">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          )} */}
        </button>
        
        {/* Authentication Warning Badge */}
        {/* {!isAuthenticated() && (
          <div className="absolute -top-5 -right-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full border border-red-200 whitespace-nowrap">
            {t('auth.warning.title')}
            {i18n.language === 'ar' ? "حتي تتمكن من الاشتراك "  : " To be able to subscribe"}
          </div>
        )} */}
      </div>

      {/* Authentication Warning Modal */}
      <AuthenticationWarning
        isVisible={showAuthWarning}
        onClose={() => setShowAuthWarning(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        t={t}
      />

      {/* Subscription Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {t('auth.option')}
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                aria-label="Close modal"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Authentication Success Indicator */}
            <div className="px-6 pt-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-green-700 font-medium">
                    {t('auth.authenticated')}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="px-6 py-4">
              <div className="space-y-4">
                {/* Subscription Options */}
                <div>
                  {/* <h3 className="text-sm font-medium text-gray-700 mb-3">
                    {i18n.language=="ar"?"اختر" :"choose"}
                  </h3> */}
                  <div className="space-y-3">
                    {Packages?.data?.data?.map(option => (
                      <div key={option.id}>
                        {console.log({option})
                        }
                        {(option.duration_label === "الحصة" || option.duration_label === "Section") && (
                          <label 
                            key={option.id}
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              selectedOption.term === option.id 
                                ? 'border-amber-300 bg-amber-50 ring-2 ring-amber-200' 
                                : 'border-gray-200 hover:border-amber-200 hover:bg-amber-25'
                            } transition-all duration-200 cursor-pointer group`}
                          >
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="subscription"
                                value={option.id}
                                checked={selectedOption.term === option.id}
                                onChange={() => handleOptionChange(option?.id)}
                                className="h-4 w-4 text-amber-500 focus:!ring-amber-500 border-yellow-300"
                              />
                              <div className="mx-3">
                                <span className="text-gray-700 font-medium block">
                                  {option?.duration_label}
                                </span>
                                <span className="text-gray-500 text-sm">
                                  {option?.name}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-gray-800 font-bold text-lg">
                                {option?.price}
                              </span>
                              <span className="text-gray-500 text-sm block">
                                {t('packages.currency')}
                              </span>
                            </div>
                            {selectedOption.term === option.id && (
                              <div className="absolute top-2 right-2">
                                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
                >
                  {t("course.cancel")}
                </button>
                <button
                  type="submit"
                  onClick={handleSubscriptionApi}
                  disabled={!selectedOption.term}
                  className={`px-6 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 flex items-center ${
                    selectedOption.term 
                      ? 'bg-amber-500 hover:bg-amber-600 transform hover:scale-105' 
                      : 'bg-amber-300 cursor-not-allowed'
                  } transition-all duration-200`}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  {t("course.confirm")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
















// import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiRequest } from '../../Redux/Apis/apiRequest';
// import toast from 'react-hot-toast';

// // Authentication Warning Component for Modal
// const AuthenticationWarningModal = ({ isVisible, onClose, onLogin, onRegister, t }) => {
//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-black/30 bg-opacity-60 flex items-center justify-center z-[60] p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all duration-300 scale-100">
//         <div className="bg-gradient-to-r from-red-500 to-orange-600 p-6 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold">{t('auth.warning.title')}</h3>
//             </div>
//             <button 
//               onClick={onClose}
//               className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-all"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>
        
//         <div className="p-6">
//           <div className="text-center mb-6">
//             <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
//               <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </div>
//             <p className="text-gray-700 text-lg leading-relaxed">
//               {t('auth.warning.message')}
//             </p>
//           </div>

//           <div className="space-y-3">
//             <button
//               onClick={onLogin}
//               className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//               </svg>
//               {t('auth.login.login')}
//             </button>
            
//             <button
//               onClick={onRegister}
//               className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//               </svg>
//               {t('auth.Register.title')}
//             </button>
            
//             <button
//               onClick={onClose}
//               className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
//             >
//               {t('auth.cancel')}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };





// // export default AuthenticationWarningModal;

// export default function SubscriptionModal({ course }) {
//   const { t, i18n } = useTranslation();
//   const [isOpen, setIsOpen] = useState(false);
//   const [showAuthWarning, setShowAuthWarning] = useState(false);
//   const [selectedOption, setSelectedOption] = useState({
//     term: '',
//     section: '',
//     month: ''
//   });
  
//   let dispatch = useDispatch();
//   let { Packages } = useSelector((state) => state.api);
  
//   const [packageId, setPackageId] = useState(null);
  
//   console.log({ packageId });
  
//   let { subscription } = useSelector((state) => state.api);

//   // Check if user is authenticated
//   const isAuthenticated = () => {
//     const token = sessionStorage.getItem("token") || localStorage.getItem("token");
//     return !!token;
//   };

//   const handleSubscriptionApi = async () => {
//     // Check authentication first
//     if (!isAuthenticated()) {
//       setShowAuthWarning(true);
//       return;
//     }

//     if (!packageId) {
//       toast.error("Package ID is required");
//       return;
//     }
//     if (!course?.id) {
//       toast.error("Course ID is required");
//       return;
//     }
    
//     // Create form data
//     const formData = new FormData();
//     formData.append('package_id', packageId);
 
//     await dispatch(apiRequest({
//       entity: "subscription",
//       url: `api/sub_scriptions/subscriptions/${course?.id}`,
//       method: "POST",
//       data: formData,
//       headers: {
//         "Accept-Language": localStorage.getItem('language') || 'en',
//         "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
//       },
//     }));
//   };

//   const handleLogin = () => {
//     // Navigate to login page - adjust the route according to your routing setup
//     window.location.href = '/login';
//     // Or if using React Router: navigate('/login');
//   };

//   const handleRegister = () => {
//     // Navigate to register page - adjust the route according to your routing setup
//     window.location.href = '/register';
//     // Or if using React Router: navigate('/register');
//   };

//   const handleOpenModal = () => {
//     // Check authentication when opening subscription modal
//     if (!isAuthenticated()) {
//       setShowAuthWarning(true);
//       return;
//     }
//     setIsOpen(true);
//   };

//   useEffect(() => {
//     dispatch(apiRequest({
//       entity: "Packages",
//       url: "api/packages",
//       method: "GET",
//       headers: {
//         "Accept-Language": localStorage.getItem('language') || 'en',
//       }
//     }));
//   }, [dispatch, localStorage.getItem('language')]);

//   const handleOptionChange = (value) => {
//     setPackageId(value);
//     setSelectedOption(prev => ({
//       ...prev,
//       term: value // Simplified since we only have one group now
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {/* Subscription Button */}
//       <div className="relative">
//         <button
//           onClick={handleOpenModal}
//           className="px-4 py-2 w-full text-sm font-medium bg-amber-400 hover:bg-amber-500 text-gray-900 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 relative"
//         >
//           {t("course.subscriptions")}
//           {!isAuthenticated() && (
//             <div className="absolute -top-1 -right-1">
//               <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//             </div>
//           )}
//         </button>
        
//         {/* Authentication Warning Badge */}
//         {!isAuthenticated() && (
//           <div className="absolute -top-2 -right-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full border border-red-200 whitespace-nowrap">
//             {t('auth.loginRequired')}
//           </div>
//         )}
//       </div>

//       {/* Authentication Warning Modal */}
//       <AuthenticationWarningModal
//         isVisible={showAuthWarning}
//         onClose={() => setShowAuthWarning(false)}
//         onLogin={handleLogin}
//         onRegister={handleRegister}
//         t={t}
//       />

//       {/* Subscription Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
//             {/* Modal Header */}
//             <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
//               <div className="flex items-center">
//                 <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
//                   <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   {t('course.subscriptionOptions')}
//                 </h2>
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-400 hover:text-gray-500 focus:outline-none"
//                 aria-label="Close modal"
//               >
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {/* Authentication Success Indicator */}
//             <div className="px-6 pt-4">
//               <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
//                 <div className="flex items-center">
//                   <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <span className="text-sm text-green-700 font-medium">
//                     {t('auth.authenticated')}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Modal Body */}
//             <form onSubmit={handleSubmit} className="px-6 py-4">
//               <div className="space-y-4">
//                 {/* Subscription Options */}
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-700 mb-3">
//                     {t('course.selectPlan')}
//                   </h3>
//                   <div className="space-y-3">
//                     {Packages?.data?.data?.map(option => (
//                       <div key={option.id}>
//                         {(option.duration_label === "الحصة" || option.duration_label === "Section") && (
//                           <label 
//                             key={option.id}
//                             className={`flex items-center justify-between p-3 rounded-lg border ${
//                               selectedOption.term === option.id 
//                                 ? 'border-amber-300 bg-amber-50 ring-2 ring-amber-200' 
//                                 : 'border-gray-200 hover:border-amber-200 hover:bg-amber-25'
//                             } transition-all duration-200 cursor-pointer group`}
//                           >
//                             <div className="flex items-center">
//                               <input
//                                 type="radio"
//                                 name="subscription"
//                                 value={option.id}
//                                 checked={selectedOption.term === option.id}
//                                 onChange={() => handleOptionChange(option?.id)}
//                                 className="h-4 w-4 text-amber-500 focus:!ring-amber-500 border-yellow-300"
//                               />
//                               <div className="mx-3">
//                                 <span className="text-gray-700 font-medium block">
//                                   {option?.duration_label}
//                                 </span>
//                                 <span className="text-gray-500 text-sm">
//                                   {option?.name}
//                                 </span>
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <span className="text-gray-800 font-bold text-lg">
//                                 {option?.price}
//                               </span>
//                               <span className="text-gray-500 text-sm block">
//                                 {t('packages.currency')}
//                               </span>
//                             </div>
//                             {selectedOption.term === option.id && (
//                               <div className="absolute top-2 right-2">
//                                 <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
//                                   <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
//                                   </svg>
//                                 </div>
//                               </div>
//                             )}
//                           </label>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
//                 >
//                   {t("course.cancel")}
//                 </button>
//                 <button
//                   type="submit"
//                   onClick={handleSubscriptionApi}
//                   disabled={!selectedOption.term}
//                   className={`px-6 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 flex items-center ${
//                     selectedOption.term 
//                       ? 'bg-amber-500 hover:bg-amber-600 transform hover:scale-105' 
//                       : 'bg-amber-300 cursor-not-allowed'
//                   } transition-all duration-200`}
//                 >
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//                   </svg>
//                   {t("course.confirm")}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }