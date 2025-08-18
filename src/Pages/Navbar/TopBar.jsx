


import { Phone, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { apiRequest } from '../../Redux/Apis/apiRequest';
import toast from 'react-hot-toast';

export default function TopBar() {
  const { t, i18n } = useTranslation();
  let { contactus } = useSelector((state) => state.api);
  let navigate = useNavigate();
let dispatch = useDispatch();
  const handlelogout=async()=>{
    let response  =await  dispatch(apiRequest({
      entity: "logout",
      url: "api/logout",
      method: "POST",
         headers: {
              language: localStorage.getItem('language'),
              "Content-Type": "multipart/form-data",
              "Authorization": `${sessionStorage.getItem("token")}`
            },
    }));
    if(response.payload.success){
      sessionStorage.clear();
   
      navigate("/");
    }
    
  }

  //console.log({contactus});
  

  useEffect(()=>{
    dispatch(apiRequest({
      entity: "contactus",
      url: "api/contact_us",
      method: "GET",
       headers: {
             "Accept-Language": localStorage.getItem('language') || 'en',
              
            },
    }))
  },[dispatch , localStorage.getItem('language')]);

  return (
    <div 
      className="bg-gray-900 text-gray-300 text-sm border-b border-gray-700"
      dir={i18n.language === 'ar' ? 'ltr' : 'ltr'}
    >
      <div dir='' className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row items-center justify-between py-3 md:py-2 ${i18n.language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
          
          {/* Contact Information */}
          {/* <div className={`flex items-center ${i18n.language === 'ar' ? 'space-x-reverse' : ''} space-x-0 mb-3 md:mb-0`}>
           
            <a 
              href="tel:+611234567890" 
              className={`flex items-center px-4 py-2 border-${i18n.language === 'ar' ? 'l' : 'r'} border-gray-600 hover:text-white transition-colors duration-200 group`}
            >
              <Phone className={`w-4 h-4 ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'} text-yellow-500 group-hover:text-white transition-colors md:hidden`} />
              <span className="hidden md:inline mr-2 text-white font-medium">{t('topbar.call')}:</span>
              <span className="text-gray-300 group-hover:text-white transition-colors">+(61) 123 456 7890</span>
            </a>
            
            <a 
              href="mailto:example@domain.com" 
              className="flex items-center px-4 py-2 hover:text-white transition-colors duration-200 group"
            >
              <Mail className={`w-4 h-4 ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'} text-yellow-500 group-hover:text-white transition-colors md:hidden`} />
              <span className="hidden md:inline mr-2 text-white font-medium">{t('topbar.email')}:</span>
              <span className="text-gray-300 group-hover:text-white transition-colors">example@domain.com</span>
            </a>
          </div> */}
<div className={`flex items-center ${i18n.language === 'ar' ? 'flex-row-reverse' : ''} mb-3 md:mb-0`}>
  {/* Phone Link */}
  <div className={`relative flex items-center group ${i18n.language === 'ar' ? 'pl-4' : 'pr-4'}`}>
    <a 
      href={`tel:+2${contactus?.data?.data?.phone}`} 
      className="flex items-center hover:text-white transition-colors duration-200"
    >
      {/* Mobile Icon */}
      <Phone className={`w-4 h-4 ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'} text-yellow-500 group-hover:text-white transition-colors md:hidden`} />
      
      {/* Desktop Text */}
      <div className="hidden md:flex items-center">
        <span className="text-white font-medium mr-2">{t('topbar.call')}:</span>
        <span className="text-gray-300 group-hover:text-white transition-colors">+2{contactus?.data?.data?.phone}</span>
      </div>
    </a>
    
    {/* Separator - Only visible on desktop */}
    <div className={`hidden md:block absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} h-5 w-px bg-gray-600`}></div>
  </div>

  {/* Email Link */}
  <div className="flex items-center group">
    <a 
      href="mailto:example@domain.com" 
      className="flex items-center hover:text-white transition-colors duration-200 pl-4"
    >
      {/* Mobile Icon */}
      <Mail className={`w-4 h-4 ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'} text-yellow-500 group-hover:text-white transition-colors md:hidden`} />
      
      {/* Desktop Text */}
      <div className="hidden md:flex items-center">
        <span className="text-white font-medium mr-2">{t('topbar.email')}:</span>
        <span className="text-gray-300 group-hover:text-white transition-colors">{contactus?.data?.data?.email}</span>
      </div>
    </a>
  </div>
</div>
          {/* Authentication Links */}
          {sessionStorage.getItem("token") || localStorage.getItem("token")? 
          <div className="flex items-center">
            <div className="bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200 px-4 py-1">
              <div className={`flex items-center ${i18n.language === 'ar' ? 'space-x-reverse' : ''} space-x-1 text-gray-500 font-medium`}>
                <button 
                onClick={handlelogout} 
                  className="hover:text-gray-700 cursor-pointer transition-colors text-[12px] duration-200"
                >
                  {t('topbar.logout')}
                </button>
                
              
              </div>
            </div>
          </div>
          : 
          <div className="flex items-center">
            <div className="bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200 px-4 py-1">
              <div className={`flex items-center ${i18n.language === 'ar' ? 'space-x-reverse' : ''} space-x-1 text-gray-500 font-medium`}>
                <Link
                  to="/login" 
                  className="hover:text-gray-700 cursor-pointer  transition-colors text-[12px] duration-200"
                >
                  {t('topbar.login')}
                </Link>
                <span className="text-gray-700 mx-2">|</span>
                <Link
                  to="/register" 
                  className="hover:text-gray-700 cursor-pointer text-[12px] transition-colors duration-200"
                >
                  {t('topbar.register')}
                </Link>
              </div>
            </div>
          </div>
          
          }
        </div>
      </div>
    </div>
  );
}