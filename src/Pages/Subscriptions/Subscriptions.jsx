

import React, { useEffect, useState } from 'react'
import DynamicBreadcrumb from '../../Components/Ui/DynamicBreadcrumb';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../../Redux/Apis/apiRequest';
import FallingIconsBackground from '../../Components/Ui/FallingIconsBackground';
import SubscriptionModal from '../../Components/Ui/SubscriptionModal';
import { AuthenticationWarning } from '../../Components/Ui/AuthenticationWarning';
import { Link } from 'react-router-dom';



export default function Subscriptions() {
  const { t, i18n } = useTranslation();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const { Packages } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  
  console.log({packages: Packages});
  console.log({selectedPackage: selectedPackage});

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    return !!token;
  };

  const handleSubscriptionApi = async (packageId) => {
    // Check authentication first
    if (!isAuthenticated()) {
      setShowAuthWarning(true);
      return;
    }

    if (!packageId) {
      console.error("Package ID is required");
      return;
    }
    
    // Create form data
    const formData = new FormData();
    formData.append('package_id', packageId);
  
    await dispatch(apiRequest({
      entity: "subscription",
      url: `api/sub_scriptions/subscriptions`,
      method: "POST",
      data: formData,
      headers: {
        "Accept-Language": localStorage.getItem('language') || 'en',
        "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
      },
    }));
  };

  useEffect(() => {
    dispatch(apiRequest({
      entity: "Packages",
      url: "api/packages",
      method: "GET",
      headers: {
        "Accept-Language": localStorage.getItem('language') || 'en',
      }
    }));
  }, [dispatch, localStorage.getItem('language')]);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
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

  const getDurationIcon = (duration) => {
    switch (duration) {
      case t('packages.session'):
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case t('packages.monthly'):
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case t('packages.yearly'):
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getPackageGradient = (index) => {
    const gradients = [
      'from-amber-400 to-orange-600',
      'from-emerald-400 to-teal-600',
      'from-purple-400 to-indigo-600'
    ];
    return gradients[index % gradients.length];
  };

  const getBadgeColor = (duration) => {
    switch (duration) {
      case t('packages.session'):
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case t('packages.monthly'):
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case t('packages.yearly'):
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isRecommended = (duration) => duration === t('packages.monthly');
  const isBestValue = (duration) => duration === t('packages.yearly');

  const getFeatures = (duration) => {
    const baseFeatures = [
      t('packages.features.interactive'),
      t('packages.features.exercises'),
      t('packages.features.spelling'),
      t('packages.features.texts')
    ];

    const additionalFeatures = {
      [t('packages.session')]: [
        t('packages.features.session.one'),
        t('packages.features.session.two'),
        t('packages.features.session.three')
      ],
      [t('packages.monthly')]: [
        ...baseFeatures,
        t('packages.features.monthly.one'),
        t('packages.features.monthly.two'),
        t('packages.features.monthly.three'),
        t('packages.features.monthly.four')
      ],
      [t('packages.yearly')]: [
        ...baseFeatures,
        t('packages.features.yearly.one'),
        t('packages.features.yearly.two'),
        t('packages.features.yearly.three'),
        t('packages.features.yearly.four'),
        t('packages.features.yearly.five'),
        t('packages.features.yearly.six')
      ]
    };

    return additionalFeatures[duration] || baseFeatures;
  };

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <DynamicBreadcrumb 
        MainTitle={t('subscriptions.title')} 
        BreadCrumbs={[
          {label: t('breadcrumbssub.home'), href:"/"},
          {label: t('breadcrumbssub.subscriptions')}
        ]}
      />
      
      {/* Authentication Warning Modal */}
      <AuthenticationWarning
        isVisible={showAuthWarning}
        onClose={() => setShowAuthWarning(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        t={t}
      />

      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-8">
          <div className="min-h-screen bg-gradient-to-br rounded-lg from-amber-50 via-orange-50 to-red-50 py-12 px-4" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <FallingIconsBackground opacity={0.2} count={35} zIndex={0} />
            
            <div className="max-w-7xl mx-auto mt-12 rounded-md px-2">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  {t('packages.title')}
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {t('packages.subtitle')}
                </p>
              </div>

              {/* Authentication Status Banner */}
              {!isAuthenticated() && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-yellow-800">{t('auth.banner.title')}</h3>
                  </div>
                  <p className="text-yellow-700 mb-4">{t('auth.banner.message')}</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button 
                      onClick={handleLogin}
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-2 rounded-lg font-semibold  transition-all duration-300"
                    >
                      {t('auth.login.login')}
                    </button>
                    <button 
                      onClick={handleRegister}
                      className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold  transition-all duration-300"
                    >
                      {t('auth.Register.title')}
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {Packages?.data?.data?.map((pkg, index) => (
                  <div key={pkg.id} className={`relative group transition-all duration-500 hover:scale-105 ${selectedPackage?.id === pkg.id ? 'scale-105' : ''}`}>
                    {isRecommended(pkg.duration_label) && (
                      <div className="absolute -top-4 right-1/2 transform translate-x-1/2 z-10">
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          {t('packages.mostPopular')}
                        </span>
                      </div>
                    )}

                    {isBestValue(pkg.duration_label) && (
                      <div className="absolute -top-4 right-1/2 transform translate-x-1/2 z-10">
                        <span className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          {t('packages.bestValue')}
                        </span>
                      </div>
                    )}

                    <div className={`relative h-full bg-white rounded-2xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedPackage?.id === pkg.id 
                        ? 'border-amber-500 shadow-2xl' 
                        : 'border-transparent hover:shadow-2xl'
                    }`}>
                      <div className={`bg-gradient-to-r ${getPackageGradient(index)} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                          <div className="absolute -top-4 -left-4 w-24 h-24 bg-white rounded-full"></div>
                          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-full"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-20">
                            ع
                          </div>
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold">{pkg.name}</h3>
                            {getDurationIcon(pkg.duration_label)}
                          </div>
                          
                          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getBadgeColor(pkg.duration_label)} bg-white/20 border-white/30`}>
                            {pkg.duration_label}
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="text-center mb-6">
                          <div className="flex items-baseline justify-center">
                            <span className="text-4xl md:text-5xl font-bold text-gray-800">
                              {pkg.price}
                            </span>
                            <span className="text-lg text-gray-600 mr-2">{t('packages.currency')}</span>
                          </div>
                          <p className="text-gray-500 mt-2">/{pkg.duration_label}</p>
                        </div>

                        <div className="space-y-3 mb-8">
                          {getFeatures(pkg.duration_label).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start text-gray-700">
                              <svg className="w-5 h-5 text-green-500 ml-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => handleSelectPackage(pkg)}
                          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                            selectedPackage?.id === pkg.id
                              ? 'bg-amber-600 text-white shadow-lg'
                              : `bg-gradient-to-r ${getPackageGradient(index)} text-white hover:shadow-lg`
                          }`}
                        >
                          {selectedPackage?.id === pkg.id ? t('packages.selected') : t('packages.startLearning')}
                        </button>
                      </div>

                      {selectedPackage?.id === pkg.id && (
                        <div className="absolute top-4 left-4">
                          <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Package Summary Section */}
              {selectedPackage && (
                <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 mt-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {t('packages.selectedPackage', { name: selectedPackage.name })}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {t('packages.packageType', { type: selectedPackage.duration_label })}
                    </p>
                    
                    <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-4xl font-bold text-amber-600 mb-2">
                            {selectedPackage.price} {t('packages.currency')}
                          </p>
                          <p className="text-gray-600">/{selectedPackage.duration_label}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      {selectedPackage.duration_label =="الحصة" || selectedPackage.duration_label == "Section" ?
                      
                    
                     
                    <Link to={"/courses"}
                        // onClick={() => handleSubscriptionApi(selectedPackage.id)}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                      >
                      {i18n.language === 'ar' ? 'اختر الدرس' : 'Choose Lesson'}
                       
                      </Link>
                    
                    :
                     <button 
                        onClick={() => handleSubscriptionApi(selectedPackage.id)}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        {t('packages.completePayment')}
                      </button>
                    }
                      <button 
                        onClick={() => setSelectedPackage(null)}
                        className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
                      >
                        {t('packages.changeSelection')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from 'react'
// import DynamicBreadcrumb from '../../Components/Ui/DynamicBreadcrumb';
// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiRequest } from '../../Redux/Apis/apiRequest';
// import FallingIconsBackground from '../../Components/Ui/FallingIconsBackground';
// import SubscriptionModal from '../../Components/Ui/SubscriptionModal';

// export default function Subscriptions() {
//   const { t, i18n } = useTranslation();
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const { Packages } = useSelector((state) => state.api);
//   const dispatch = useDispatch();
  
//   console.log({packages: Packages});
//   console.log({selectedPackage: selectedPackage});

//   const handleSubscriptionApi = async (packageId) => {
//     if (!packageId) {
//       console.error("Package ID is required");
//       return;
//     }
    
//     // Create form data
//     const formData = new FormData();
//     formData.append('package_id', packageId);
  
    
//     await dispatch(apiRequest({
//       entity: "subscription",
//       url: `api/sub_scriptions/subscriptions`,
//       method: "POST",
//       data: formData,
//       headers: {
//         "Accept-Language": localStorage.getItem('language') || 'en',
//         "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
//       },
//     }));
//   }

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

//   const handleSelectPackage = (pkg) => {
//     setSelectedPackage(pkg);
//   };

//   const getDurationIcon = (duration) => {
//     switch (duration) {
//       case t('packages.session'):
//         return (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//           </svg>
//         );
//       case t('packages.monthly'):
//         return (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//         );
//       case t('packages.yearly'):
//         return (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//           </svg>
//         );
//       default:
//         return null;
//     }
//   };

//   const getPackageGradient = (index) => {
//     const gradients = [
//       'from-amber-400 to-orange-600',
//       'from-emerald-400 to-teal-600',
//       'from-purple-400 to-indigo-600'
//     ];
//     return gradients[index % gradients.length];
//   };

//   const getBadgeColor = (duration) => {
//     switch (duration) {
//       case t('packages.session'):
//         return 'bg-amber-100 text-amber-800 border-amber-200';
//       case t('packages.monthly'):
//         return 'bg-emerald-100 text-emerald-800 border-emerald-200';
//       case t('packages.yearly'):
//         return 'bg-purple-100 text-purple-800 border-purple-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const isRecommended = (duration) => duration === t('packages.monthly');
//   const isBestValue = (duration) => duration === t('packages.yearly');

//   const getFeatures = (duration) => {
//     const baseFeatures = [
//       t('packages.features.interactive'),
//       t('packages.features.exercises'),
//       t('packages.features.spelling'),
//       t('packages.features.texts')
//     ];

//     const additionalFeatures = {
//       [t('packages.session')]: [
//         t('packages.features.session.one'),
//         t('packages.features.session.two'),
//         t('packages.features.session.three')
//       ],
//       [t('packages.monthly')]: [
//         ...baseFeatures,
//         t('packages.features.monthly.one'),
//         t('packages.features.monthly.two'),
//         t('packages.features.monthly.three'),
//         t('packages.features.monthly.four')
//       ],
//       [t('packages.yearly')]: [
//         ...baseFeatures,
//         t('packages.features.yearly.one'),
//         t('packages.features.yearly.two'),
//         t('packages.features.yearly.three'),
//         t('packages.features.yearly.four'),
//         t('packages.features.yearly.five'),
//         t('packages.features.yearly.six')
//       ]
//     };

//     return additionalFeatures[duration] || baseFeatures;
//   };

//   return (
//     <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
//       <DynamicBreadcrumb 
//         MainTitle={t('subscriptions.title')} 
//         BreadCrumbs={[
//           {label: t('breadcrumbssub.home'), href:"/"},
//           {label: t('breadcrumbssub.subscriptions')}
//         ]}
//       />
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="space-y-8">
//           <div className="min-h-screen bg-gradient-to-br rounded-lg from-amber-50 via-orange-50 to-red-50 py-12 px-4" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
//             <FallingIconsBackground opacity={0.2} count={35} zIndex={0} />
            
//             <div className="max-w-7xl mx-auto mt-12 rounded-md px-2">
//               <div className="text-center mb-16">
//                 <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6">
//                   <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                   </svg>
//                 </div>
//                 <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//                   {t('packages.title')}
//                 </h1>
//                 <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//                   {t('packages.subtitle')}
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//                 {Packages?.data?.data?.map((pkg, index) => (
//                   <div key={pkg.id} className={`relative group transition-all duration-500 hover:scale-105 ${selectedPackage?.id === pkg.id ? 'scale-105' : ''}`}>
//                     {isRecommended(pkg.duration_label) && (
//                       <div className="absolute -top-4 right-1/2 transform translate-x-1/2 z-10">
//                         <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
//                           <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                           </svg>
//                           {t('packages.mostPopular')}
//                         </span>
//                       </div>
//                     )}

//                     {isBestValue(pkg.duration_label) && (
//                       <div className="absolute -top-4 right-1/2 transform translate-x-1/2 z-10">
//                         <span className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
//                           <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//                           </svg>
//                           {t('packages.bestValue')}
//                         </span>
//                       </div>
//                     )}

//                     <div className={`relative h-full bg-white rounded-2xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${
//                       selectedPackage?.id === pkg.id 
//                         ? 'border-amber-500 shadow-2xl' 
//                         : 'border-transparent hover:shadow-2xl'
//                     }`}>
//                       <div className={`bg-gradient-to-r ${getPackageGradient(index)} p-6 text-white relative overflow-hidden`}>
//                         <div className="absolute top-0 left-0 w-full h-full opacity-10">
//                           <div className="absolute -top-4 -left-4 w-24 h-24 bg-white rounded-full"></div>
//                           <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-full"></div>
//                           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-20">
//                             ع
//                           </div>
//                         </div>
                        
//                         <div className="relative z-10">
//                           <div className="flex items-center justify-between mb-4">
//                             <h3 className="text-2xl font-bold">{pkg.name}</h3>
//                             {getDurationIcon(pkg.duration_label)}
//                           </div>
                          
//                           <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getBadgeColor(pkg.duration_label)} bg-white/20 border-white/30`}>
//                             {pkg.duration_label}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="p-6">
//                         <div className="text-center mb-6">
//                           <div className="flex items-baseline justify-center">
//                             <span className="text-4xl md:text-5xl font-bold text-gray-800">
//                               {pkg.price}
//                             </span>
//                             <span className="text-lg text-gray-600 mr-2">{t('packages.currency')}</span>
//                           </div>
//                           <p className="text-gray-500 mt-2">/{pkg.duration_label}</p>
//                         </div>

//                         <div className="space-y-3 mb-8">
//                           {getFeatures(pkg.duration_label).map((feature, featureIndex) => (
//                             <div key={featureIndex} className="flex items-start text-gray-700">
//                               <svg className="w-5 h-5 text-green-500 ml-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                               </svg>
//                               <span className="text-sm leading-relaxed">{feature}</span>
//                             </div>
//                           ))}
//                         </div>

//                         <button
//                           onClick={() => handleSelectPackage(pkg)}
//                           className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
//                             selectedPackage?.id === pkg.id
//                               ? 'bg-amber-600 text-white shadow-lg'
//                               : `bg-gradient-to-r ${getPackageGradient(index)} text-white hover:shadow-lg`
//                           }`}
//                         >
//                           {selectedPackage?.id === pkg.id ? t('packages.selected') : t('packages.startLearning')}
//                         </button>
//                       </div>

//                       {selectedPackage?.id === pkg.id && (
//                         <div className="absolute top-4 left-4">
//                           <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center shadow-lg">
//                             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
//                             </svg>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Selected Package Summary Section */}
//               {selectedPackage && (
//                 <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 mt-8">
//                   <div className="text-center">
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-4">
//                       <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
                    
//                     <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                       {t('packages.selectedPackage', { name: selectedPackage.name })}
//                     </h3>
//                     <p className="text-gray-600 mb-6">
//                       {t('packages.packageType', { type: selectedPackage.duration_label })}
                    
//                     </p>
                    
//                     <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
//                       <div className="flex items-center justify-center">
//                         <div className="text-center">
//                           <p className="text-4xl font-bold text-amber-600 mb-2">
//                             {selectedPackage.price} {t('packages.currency')}
//                           </p>
//                           <p className="text-gray-600">/{selectedPackage.duration_label}</p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="flex flex-col sm:flex-row justify-center gap-4">
//                       <button 
//                         onClick={() => handleSubscriptionApi(selectedPackage.id)}
//                         className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
//                       >
//                         <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//                         </svg>
//                         {t('packages.completePayment')}
//                       </button>
//                       <button 
//                         onClick={() => setSelectedPackage(null)}
//                         className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
//                       >
//                         {t('packages.changeSelection')}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react'
// import DynamicBreadcrumb from '../../Components/Ui/DynamicBreadcrumb';
// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiRequest } from '../../Redux/Apis/apiRequest';
// import FallingIconsBackground from '../../Components/Ui/FallingIconsBackground';
// import SubscriptionModal from '../../Components/Ui/SubscriptionModal';

// export default function Subscriptions() {
//    const { t, i18n } = useTranslation();
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const { Packages } = useSelector((state) => state.api);
//   const dispatch = useDispatch();
//  console.log({packages: Packages});
//  console.log({selectedPackage: selectedPackage});


//      const handleSubscriptionApi = async (packageId) => {
//       if (!packageId) {
//         console.error("Package ID is required");
//         return;
//       }
      
//       // Create form data
//       const formData = new FormData();
//       formData.append('package_id', packageId);
    
      
//        await dispatch(apiRequest({
//         entity: "subscription",
//         url: `api/sub_scriptions/subscriptions`,
//         method: "POST",
//         data: formData,
//         headers: {
//           "Accept-Language": localStorage.getItem('language') || 'en',
//           "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
//         },
//       }));
      
      
//     }

 
//   useEffect(() => {
//     dispatch(apiRequest({
//       entity: "Packages",
//       url: "api/packages",
//       method: "GET",
//       headers: {
//         "Accept-Language": localStorage.getItem('language') || 'en',
//       }
//     }));
//   }, [dispatch , localStorage.getItem('language')]);

//   const handleSelectPackage = (pkg) => {
//     setSelectedPackage(pkg);
//   };

//   const getDurationIcon = (duration) => {
//     switch (duration) {
//       case t('packages.session'):
//         return (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//           </svg>
//         );
//       case t('packages.monthly'):
//         return (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//         );
//       case t('packages.yearly'):
//         return (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//           </svg>
//         );
//       default:
//         return null;
//     }
//   };

//   const getPackageGradient = (index) => {
//     const gradients = [
//       'from-amber-400 to-orange-600',
//       'from-emerald-400 to-teal-600',
//       'from-purple-400 to-indigo-600'
//     ];
//     return gradients[index % gradients.length];
//   };

//   const getBadgeColor = (duration) => {
//     switch (duration) {
//       case t('packages.session'):
//         return 'bg-amber-100 text-amber-800 border-amber-200';
//       case t('packages.monthly'):
//         return 'bg-emerald-100 text-emerald-800 border-emerald-200';
//       case t('packages.yearly'):
//         return 'bg-purple-100 text-purple-800 border-purple-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const isRecommended = (duration) => duration === t('packages.monthly');
//   const isBestValue = (duration) => duration === t('packages.yearly');

//   const getFeatures = (duration) => {
//     const baseFeatures = [
//       t('packages.features.interactive'),
//       t('packages.features.exercises'),
//       t('packages.features.spelling'),
//       t('packages.features.texts')
//     ];

//     const additionalFeatures = {
//       [t('packages.session')]: [
//         t('packages.features.session.one'),
//         t('packages.features.session.two'),
//         t('packages.features.session.three')
//       ],
//       [t('packages.monthly')]: [
//         ...baseFeatures,
//         t('packages.features.monthly.one'),
//         t('packages.features.monthly.two'),
//         t('packages.features.monthly.three'),
//         t('packages.features.monthly.four')
//       ],
//       [t('packages.yearly')]: [
//         ...baseFeatures,
//         t('packages.features.yearly.one'),
//         t('packages.features.yearly.two'),
//         t('packages.features.yearly.three'),
//         t('packages.features.yearly.four'),
//         t('packages.features.yearly.five'),
//         t('packages.features.yearly.six')
//       ]
//     };

//     return additionalFeatures[duration] || baseFeatures;
//   };
//   return (
//     <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
//       <DynamicBreadcrumb 
//         MainTitle={t('subscriptions.title')} 
//         BreadCrumbs={[
//           {label: t('breadcrumbssub.home'), href:"/"},
//           {label: t('breadcrumbssub.subscriptions')}
//         ]}
//       />
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="space-y-8">
//            <div className="min-h-screen bg-gradient-to-br rounded-lg from-amber-50 via-orange-50 to-red-50 py-12 px-4" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
//       <FallingIconsBackground opacity={0.2} count={35} zIndex={0} />
      



//        <div className="max-w-7xl mx-auto mt-12 rounded-md px-2">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6">
//             <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//             </svg>
//           </div>
//           <h1 className="text-4xl  md:text-5xl font-bold text-gray-800 mb-4">
//             {t('packages.title')}
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             {t('packages.subtitle')}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//           {Packages?.data?.data?.map((pkg, index) => (
//             <div key={pkg.id} className={`relative group transition-all duration-500 hover:scale-105 ${selectedPackage?.id === pkg.id ? 'scale-105' : ''}`}>
//               {isRecommended(pkg.duration_label) && (
//                 <div className="absolute -top-4 right-1/2 transform translate-x-1/2 z-10">
//                   <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
//                     <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                     </svg>
//                     {t('packages.mostPopular')}
//                   </span>
//                 </div>
//               )}

//               {isBestValue(pkg.duration_label) && (
//                 <div className="absolute -top-4 right-1/2 transform translate-x-1/2 z-10">
//                   <span className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
//                     <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//                     </svg>
//                     {t('packages.bestValue')}
//                   </span>
//                 </div>
//               )}

//               <div className={`relative h-full bg-white rounded-2xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${
//                 selectedPackage?.id === pkg.id 
//                   ? 'border-amber-500 shadow-2xl' 
//                   : 'border-transparent hover:shadow-2xl'
//               }`}>
//                 <div className={`bg-gradient-to-r ${getPackageGradient(index)} p-6 text-white relative overflow-hidden`}>
//                   <div className="absolute top-0 left-0 w-full h-full opacity-10">
//                     <div className="absolute -top-4 -left-4 w-24 h-24 bg-white rounded-full"></div>
//                     <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-full"></div>
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-20">
//                       ع
//                     </div>
//                   </div>
                  
//                   <div className="relative z-10">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-2xl font-bold">{pkg.name}</h3>
//                       {getDurationIcon(pkg.duration_label)}
//                     </div>
                    
//                     <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getBadgeColor(pkg.duration_label)} bg-white/20 border-white/30`}>
//                       {pkg.duration_label}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <div className="text-center mb-6">
//                     <div className="flex items-baseline justify-center">
//                       <span className="text-4xl md:text-5xl font-bold text-gray-800">
//                         {pkg.price}
//                       </span>
//                       <span className="text-lg text-gray-600 mr-2">{t('packages.currency')}</span>
//                     </div>
//                     <p className="text-gray-500 mt-2">/{pkg.duration_label}</p>
//                   </div>

//                   <div className="space-y-3 mb-8">
//                     {getFeatures(pkg.duration_label).map((feature, featureIndex) => (
//                       <div key={featureIndex} className="flex items-start text-gray-700">
//                         <svg className="w-5 h-5 text-green-500 ml-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span className="text-sm leading-relaxed">{feature}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     onClick={() => handleSelectPackage(pkg)}
//                     className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
//                       selectedPackage?.id === pkg.id
//                         ? 'bg-amber-600 text-white shadow-lg'
//                         : `bg-gradient-to-r ${getPackageGradient(index)} text-white hover:shadow-lg`
//                     }`}
//                   >
//                     {selectedPackage?.id === pkg.id ? t('packages.selected') : t('packages.startLearning')}
//                   </button>
//                 </div>

//                 {selectedPackage?.id === pkg.id && (
//                   <div className="absolute top-4 left-4">
//                     <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center shadow-lg">
//                       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

    
//         {selectedPackage && (
//           <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50">
//             <div className="text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-4">
//                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
              
//               <h3 className="text-2xl font-bold text-gray-800 mb-2 bg-red-500">
//                 {selectedPackage.name ?  t('packages.selectedPackage',   selectedPackage?.name )   :"loading"}
                
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 {t('packages.packageType', { type: selectedPackage.duration_label })}
//               </p>
              
//               <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
//                 <div className="flex items-center justify-center">
//                   <div className="text-center">
//                     <p className="text-4xl font-bold text-amber-600 mb-2">
//                       {selectedPackage.price} {t('packages.currency')}
//                     </p>
//                     <p className="text-gray-600">/{selectedPackage.duration_label}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex flex-col sm:flex-row justify-center gap-4">
//                 <button 
//                 // onClick={handleSubscriptionApi(selectedPackage.id)} 
                
//                 className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
//                   <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//                   </svg>
//                   {t('packages.completePayment')}
                 
//                 </button>
//                 <button 
//                   onClick={() => setSelectedPackage(null)}
//                   className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
//                 >
//                   {t('packages.changeSelection')}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//         </div>
//       </div>
//     </div>

//   );
// }




//  function PricingPackages() {
//   const { t, i18n } = useTranslation();
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const { Packages } = useSelector((state) => state.api);
//   const dispatch = useDispatch();
//  console.log({packages: Packages});
//  console.log({package11111111111111111: selectedPackage});
 
//   useEffect(() => {
//     dispatch(apiRequest({
//       entity: "Packages",
//       url: "api/packages",
//       method: "GET",
//       headers: {
//         "Accept-Language": localStorage.getItem('language') || 'en',
//       }
//     }));
//   }, [dispatch , localStorage.getItem('language')]);

//   const handleSelectPackage = (pkg) => {
//     console.log("Selected Package:", pkg);
    
//     setSelectedPackage(pkg);
//   };

//   const getDurationIcon = (duration) => {
//     switch (duration) {
//       case t('packages.session'):
//         return (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//           </svg>
//         );
//       case t('packages.monthly'):
//         return (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//         );
//       case t('packages.yearly'):
//         return (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//           </svg>
//         );
//       default:
//         return null;
//     }
//   };

//   const getPackageGradient = (index) => {
//     const gradients = [
//       'from-amber-400 to-orange-600',
//       'from-emerald-400 to-teal-600',
//       'from-purple-400 to-indigo-600'
//     ];
//     return gradients[index % gradients.length];
//   };

//   const getBadgeColor = (duration) => {
//     switch (duration) {
//       case t('packages.session'):
//         return 'bg-amber-100 text-amber-800 border-amber-200';
//       case t('packages.monthly'):
//         return 'bg-emerald-100 text-emerald-800 border-emerald-200';
//       case t('packages.yearly'):
//         return 'bg-purple-100 text-purple-800 border-purple-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const isRecommended = (duration) => duration === t('packages.monthly');
//   const isBestValue = (duration) => duration === t('packages.yearly');

//   const getFeatures = (duration) => {
//     const baseFeatures = [
//       t('packages.features.interactive'),
//       t('packages.features.exercises'),
//       t('packages.features.spelling'),
//       t('packages.features.texts')
//     ];

//     const additionalFeatures = {
//       [t('packages.session')]: [
//         t('packages.features.session.one'),
//         t('packages.features.session.two'),
//         t('packages.features.session.three')
//       ],
//       [t('packages.monthly')]: [
//         ...baseFeatures,
//         t('packages.features.monthly.one'),
//         t('packages.features.monthly.two'),
//         t('packages.features.monthly.three'),
//         t('packages.features.monthly.four')
//       ],
//       [t('packages.yearly')]: [
//         ...baseFeatures,
//         t('packages.features.yearly.one'),
//         t('packages.features.yearly.two'),
//         t('packages.features.yearly.three'),
//         t('packages.features.yearly.four'),
//         t('packages.features.yearly.five'),
//         t('packages.features.yearly.six')
//       ]
//     };

//     return additionalFeatures[duration] || baseFeatures;
//   };


//       const handleSubscriptionApi = async (packageId) => {
//       if (!packageId) {
//         console.error("Package ID is required");
//         return;
//       }
      
//       // Create form data
//       const formData = new FormData();
//       formData.append('package_id', packageId);
    
      
//        await dispatch(apiRequest({
//         entity: "subscription",
//         url: `api/sub_scriptions/subscriptions`,
//         method: "POST",
//         data: formData,
//         headers: {
//           "Accept-Language": localStorage.getItem('language') || 'en',
//           "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
//         },
//       }));
      
      
//     }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-12 px-4" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
//       <FallingIconsBackground opacity={0.2} count={35} zIndex={0} />
      
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6">
//             <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//             </svg>
//           </div>
//           <h1 className="text-4xl  md:text-5xl font-bold text-gray-800 mb-4">
//             {t('packages.title')}
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             {t('packages.subtitle')}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//           {Packages?.data?.data?.map((pkg, index) => (
//             <div key={pkg.id} className={`relative group transition-all duration-500 hover:scale-105 ${selectedPackage?.id === pkg.id ? 'scale-105' : ''}`}>
//               {isRecommended(pkg.duration_label) && (
//                 <div className="absolute -top-4 right-1/2 transform translate-x-1/2 z-10">
//                   <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
//                     <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                     </svg>
//                     {t('packages.mostPopular')}
//                   </span>
//                 </div>
//               )}

//               {isBestValue(pkg.duration_label) && (
//                 <div className="absolute -top-4 right-1/2 transform translate-x-1/2 z-10">
//                   <span className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
//                     <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//                     </svg>
//                     {t('packages.bestValue')}
//                   </span>
//                 </div>
//               )}

//               <div className={`relative h-full bg-white rounded-2xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${
//                 selectedPackage?.id === pkg.id 
//                   ? 'border-amber-500 shadow-2xl' 
//                   : 'border-transparent hover:shadow-2xl'
//               }`}>
//                 <div className={`bg-gradient-to-r ${getPackageGradient(index)} p-6 text-white relative overflow-hidden`}>
//                   <div className="absolute top-0 left-0 w-full h-full opacity-10">
//                     <div className="absolute -top-4 -left-4 w-24 h-24 bg-white rounded-full"></div>
//                     <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-full"></div>
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-20">
//                       ع
//                     </div>
//                   </div>
                  
//                   <div className="relative z-10">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-2xl font-bold">{pkg.name}</h3>
//                       {getDurationIcon(pkg.duration_label)}
//                     </div>
                    
//                     <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getBadgeColor(pkg.duration_label)} bg-white/20 border-white/30`}>
//                       {pkg.duration_label}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <div className="text-center mb-6">
//                     <div className="flex items-baseline justify-center">
//                       <span className="text-4xl md:text-5xl font-bold text-gray-800">
//                         {pkg.price}
//                       </span>
//                       <span className="text-lg text-gray-600 mr-2">{t('packages.currency')}</span>
//                     </div>
//                     <p className="text-gray-500 mt-2">/{pkg.duration_label}</p>
//                   </div>

//                   <div className="space-y-3 mb-8">
//                     {getFeatures(pkg.duration_label).map((feature, featureIndex) => (
//                       <div key={featureIndex} className="flex items-start text-gray-700">
//                         <svg className="w-5 h-5 text-green-500 ml-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                         </svg>
//                         <span className="text-sm leading-relaxed">{feature}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     onClick={() => handleSelectPackage(pkg)}
//                     className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
//                       selectedPackage?.id === pkg.id
//                         ? 'bg-amber-600 text-white shadow-lg'
//                         : `bg-gradient-to-r ${getPackageGradient(index)} text-white hover:shadow-lg`
//                     }`}
//                   >
//                     {selectedPackage?.id === pkg.id ? t('packages.selected') : t('packages.startLearning')}
//                   </button>
//                 </div>

//                 {selectedPackage?.id === pkg.id && (
//                   <div className="absolute top-4 left-4">
//                     <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center shadow-lg">
//                       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

    
//         {selectedPackage && (
//           <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50">
//             <div className="text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-4">
//                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
              
//               <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                 {t('packages.selectedPackage', { name: selectedPackage.name })}
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 {t('packages.packageType', { type: selectedPackage.duration_label })}
//               </p>
              
//               <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
//                 <div className="flex items-center justify-center">
//                   <div className="text-center">
//                     <p className="text-4xl font-bold text-amber-600 mb-2">
//                       {selectedPackage.price} {t('packages.currency')}
//                     </p>
//                     <p className="text-gray-600">/{selectedPackage.duration_label}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex flex-col sm:flex-row justify-center gap-4">
//                 <button 
//                 // onClick={handleSubscriptionApi(selectedPackage.id)} 
                
//                 className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
//                   <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//                   </svg>
//                   {t('packages.completePayment')}
//                   {/* <SubscriptionModal/> */}
//                 </button>
//                 <button 
//                   onClick={() => setSelectedPackage(null)}
//                   className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
//                 >
//                   {t('packages.changeSelection')}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

























// import DynamicBreadcrumb from '../../Components/Ui/DynamicBreadcrumb';
// import FallingIconsBackground from '../../Components/Ui/FallingIconsBackground';
// import { useSubscription } from '../../hooks/useSubscription';
// import { PackageCard } from './PackageCard';

// // import PackageCard from './PackageCard';
// import SelectedPackageConfirmation from './SelectedPackageConfirmation';

// export default function Subscriptions() {
//   const {
//     packages,
//     selectedPackage,
//     isLoading,
//     language,
//     t,
//     handleSelectPackage,
//     getDurationIcon,
//     getPackageGradient,
//     getBadgeColor,
//     isRecommended,
//     isBestValue,
//     getFeatures
//   } = useSubscription();

//   return (
//     <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
//       <DynamicBreadcrumb 
//         MainTitle={t('subscriptions.title')} 
//         BreadCrumbs={[
//           {label: t('breadcrumbssub.home'), href:"/"},
//           {label: t('breadcrumbssub.subscriptions')}
//         ]}
//       />
      
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="space-y-8">
//           <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-12 px-4">
//             <FallingIconsBackground opacity={0.2} count={35} zIndex={0} />
            
//             {isLoading ? (
//               <div>Loading packages...</div>
//             ) : (
//               <div className="max-w-6xl mx-auto">
//                 {/* Header */}
//                 <div className="text-center mb-16">
//                   <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6">
//                     <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                     </svg>
//                   </div>
//                   <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//                     {t('packages.title')}
//                   </h1>
//                   <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//                     {t('packages.subtitle')}
//                   </p>
//                 </div>

//                 {/* Packages Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//                   {packages.map((pkg, index) => (
//                     <PackageCard
//                       key={pkg.id}
//                       pkg={pkg}
//                       index={index}
//                       isSelected={selectedPackage?.id === pkg.id}
//                       onSelect={handleSelectPackage}
//                       getDurationIcon={getDurationIcon}
//                       getPackageGradient={getPackageGradient}
//                       getBadgeColor={getBadgeColor}
//                       isRecommended={isRecommended}
//                       isBestValue={isBestValue}
//                       getFeatures={getFeatures}
//                     />
//                   ))}
//                 </div>

//                 {/* Selected Package Confirmation */}
//                 {selectedPackage && (
//                   <SelectedPackageConfirmation 
//                     selectedPackage={selectedPackage}
//                     onDeselect={() => handleSelectPackage(null)}
//                   />
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }