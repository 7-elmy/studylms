// import React, { useEffect } from 'react'
// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux'
// import { apiRequest } from '../../Redux/Apis/apiRequest';

// export default function Terms() {
//     let dispatch = useDispatch();
//     let { t, i18n } = useTranslation();
//     let { terms } = useSelector((state) => state.api);
        
//     useEffect(()=>{
//         dispatch(apiRequest({
//             entity: "terms",
//             url: "api/terms_and_conditions",
//             method: "GET"
//         }))
//     },[])
   
//   return (
//     <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
//       <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
//             <h1 className='text-3xl font-bold mb-6'>{t('Terms.title')}</h1>
//             <p className='mb-4'>{t('Terms.welcome')}</p>
//             <ul className='list-disc pl-5'>
//                 <li>{t('Terms.termsList.risk')}</li>
//                 <li>{t('Terms.termsList.modify')}</li>
//                 <li>{t('Terms.termsList.content')}</li>
//             </ul>
//             <p className='mt-4'>{t('Terms.details')}</p>
//         </div>
//     </div>
//   )
// }

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { apiRequest } from '../../Redux/Apis/apiRequest';

export default function Terms() {
    let dispatch = useDispatch();
    let { t, i18n } = useTranslation();
    let { terms } = useSelector((state) => state.api);
        
    useEffect(()=>{
        dispatch(apiRequest({
            entity: "terms",
            url: "api/terms_and_conditions",
            method: "GET"
        }))
    },[])
   
  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <h1 className='text-3xl font-bold mb-6'>{t('Terms.title')}</h1>
            <p className='mb-4'>{t('Terms.welcome')}</p>
            <ul className='list-disc pl-5'>
                <li>{t('Terms.termsList.risk')}</li>
                <li>{t('Terms.termsList.modify')}</li>
                <li>{t('Terms.termsList.content')}</li>
            </ul>
            <p className='mt-4'>{t('Terms.details')}</p>

            <p>{terms?.data?.data?.content}</p>
        </div>
    </div>
  )
}