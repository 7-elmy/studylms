import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { apiRequest } from '../../Redux/Apis/apiRequest';

export default function Privacy() {
    let dispatch = useDispatch();
    let { t, i18n } = useTranslation();
    let { privacy } = useSelector((state) => state.api);
        console.log({privacy});
        
    useEffect(()=>{
        dispatch(apiRequest({
            entity: "privacy",
            url: "api/privacy_policy",
            method: "GET"
        }))
    },[])
   

  return (
    <div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>

<h1 className='text-3xl font-bold mb-6'>{t('Privacy.title')}</h1>
<p className='mb-4'>{t('Privacy.intro')}</p>
<ul className='list-disc pl-5'>
  <li>{t('Privacy.points.consent')}</li>
  <li>{t('Privacy.points.sharing')}</li>
  <li>{t('Privacy.points.security')}</li>
</ul>
<p className='mt-4'>{t('Privacy.details')}</p>
 <p>{privacy?.data?.data?.content}</p>
            </div>
    </div>
  )
}
