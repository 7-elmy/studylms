


import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../../Redux/Apis/apiRequest';

export default function SubscriptionModal({course}) {
  const {t, i18n}=useTranslation()
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    term: '',
    section: '',
    month: ''
  });
let dispatch = useDispatch();
  let {Packages}= useSelector((state) => state.api);
  
    const [packageId, setPackageId] = useState(null);
  
    console.log({packageId});
    
    let {subscription} = useSelector((state) => state.api);
  
    const handleSubscriptionApi = async () => {
      if (!packageId) {
        console.error("Package ID is required");
        return;
      }
      
      // Create form data
      const formData = new FormData();
      formData.append('package_id', packageId);
      formData.append('sessions', course.id); // Using course.id as sessions value
      
      let response = await dispatch(apiRequest({
        entity: "subscription",
        url: `api/sub_scriptions/subscriptions`,
        method: "POST",
        data: formData,
        headers: {
          "Accept-Language": localStorage.getItem('language') || 'en',
          "Authorization": `${sessionStorage.getItem("token") || localStorage.getItem("token")}`,
        },
      }));
      console.log({reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:response});
      
    }

  useEffect(()=>{
    dispatch(apiRequest({
      entity: "Packages",
      url: "api/packages",
      method: "GET",
      headers: {
        "Accept-Language": localStorage.getItem('language') || 'en',}
        }))
  },[dispatch , localStorage.getItem('language')]);



  const handleOptionChange = (value) => {
    setPackageId(value);
    setSelectedOption(prev => ({
      ...prev,
      term: value // Simplified since we only have one group now
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('Selected subscription:', selectedOption);
    setIsOpen(false);
    // Add your submission logic here
  };

  return (
    <>
      {/* Subscription Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 w-full text-sm font-medium bg-amber-400 hover:bg-amber-500 text-gray-900 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
      >
        {t("course.subscriptions")}
        {/* Subscription */}
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">Subscription Options</h2>
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

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="px-6 py-4">
              <div className="space-y-4">
                {/* Subscription Options */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Select your subscription plan</h3>
                  <div className="space-y-3">
                    {Packages?.data?.data?.map(option => (<div key={option.id} >
                    
                    
                      {option.duration_label=="الحصة"  || option.duration_label=="Section"? <label 
                        key={option.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          selectedOption.term === option.id 
                            ? 'border-amber-300 bg-amber-50' 
                            : 'border-gray-200 hover:border-amber-200'
                        } transition-colors duration-200 cursor-pointer`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="subscription"
                            value={option.id}
                            checked={selectedOption.term === option.id}
                            onChange={() => handleOptionChange(option?.id)}
                            className="h-4 w-4 text-amber-500 focus:!ring-amber-500  border-yellow-300"
                          />
                          <span className="mx-3 text-gray-700 font-medium">{option?.duration_label}</span>
                        </div>
                        <span className="text-gray-600 font-medium">{option?.price}</span>
                      </label>:""}
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
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  
                  {t("course.cancel")}
                </button>
                <button
                  type="submit"
                  onClick={handleSubscriptionApi}
                  disabled={!selectedOption.term}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                    selectedOption.term 
                      ? 'bg-amber-500 hover:bg-amber-600' 
                      : 'bg-amber-300 cursor-not-allowed'
                  } transition-colors duration-200`}
                >
                  {/* Confirm Subscription */}
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