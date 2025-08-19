// hooks/useSubscription.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../Redux/Apis/apiRequest';
// import { apiRequest } from '../../Redux/Apis/apiRequest';

export function useSubscription() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { Packages } = useSelector((state) => state.api);
  
  // State
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch packages on mount and when language changes
  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true);
      try {
        await dispatch(
          apiRequest({
            entity: "Packages",
            url: "api/packages",
            method: "GET",
            headers: {
              "Accept-Language": localStorage.getItem('language') || 'en',
            }
          })
        );
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPackages();
  }, [dispatch, localStorage.getItem('language')]);

  // Package selection handler
  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
  };

  // Package duration icon getter
  const getDurationIcon = (duration) => {
    switch (duration) {
      case t('packages.session'):
        return <SessionIcon />;
      case t('packages.monthly'):
        return <MonthlyIcon />;
      case t('packages.yearly'):
        return <YearlyIcon />;
      default:
        return null;
    }
  };

  // Package styling helpers
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

  // Package recommendation flags
  const isRecommended = (duration) => duration === t('packages.monthly');
  const isBestValue = (duration) => duration === t('packages.yearly');

  // Package features getter
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

  return {
    // State
    packages: Packages?.data?.data || [],
    selectedPackage,
    isLoading,
    language: i18n.language,
    
    // Handlers
    handleSelectPackage,
    
    // Helpers
    getDurationIcon,
    getPackageGradient,
    getBadgeColor,
    isRecommended,
    isBestValue,
    getFeatures,
    
    // Translation
    t
  };
}

// Icon components (could be moved to separate file)
const SessionIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const MonthlyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const YearlyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);