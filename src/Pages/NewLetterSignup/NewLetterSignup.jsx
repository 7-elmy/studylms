// import { useState } from 'react';
// import { Mail, MailOpen } from 'lucide-react';

// export default function NewsletterSignup() {
//   const [email, setEmail] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = () => {
//     if (email && email.includes('@')) {
//       // Handle newsletter signup logic here
//       console.log('Newsletter signup:', email);
//       setIsSubmitted(true);
//       setTimeout(() => {
//         setIsSubmitted(false);
//         setEmail('');
//       }, 3000);
//     }
//   };

//   return (
//     <section className="bg-yellow-400 py-8 sm:py-12 lg:py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
//           {/* Left Side - Newsletter Info */}
//           <div className="flex items-center gap-4 sm:gap-6 text-center lg:text-left">
//             {/* Mail Icon */}
//             <div className="flex-shrink-0">
//               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black/30 bg-opacity-20 rounded-full flex items-center justify-center">
//                 {/* <Mail /> */}
//                 <MailOpen  className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
//               </div>
//             </div>
            
//             {/* Text Content */}
//             <div>
//               <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
//                 Signup for Newsletter
//               </h2>
//               <p className="text-white text-sm sm:text-base lg:text-lg opacity-90">
//                 Subscribe now and receive weekly newsletter with new updates.
//               </p>
//             </div>
//           </div>

//           {/* Right Side - Email Form */}
//           <div className="w-full lg:w-auto lg:flex-shrink-0">
//             <div className="flex w-full lg:w-96">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email..."
//                 className="flex-1 px-4 py-3 sm:px-6 sm:py-4 text-gray-700 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 placeholder-gray-500 text-sm sm:text-base"
//               />
//               <button
//                 onClick={handleSubmit}
//                 disabled={isSubmitted}
//                 className="px-6 py-3 sm:px-8 sm:py-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold text-sm sm:text-base transition-colors duration-200 disabled:opacity-75"
//               >
//                 {isSubmitted ? 'SUBMITTED!' : 'SUBMIT'}
//               </button>
//             </div>
            
//             {/* Success Message */}
//             {isSubmitted && (
//               <div className="mt-3 text-center lg:text-left">
//                 <p className="text-white text-sm font-medium">
//                   ✅ Thank you for subscribing!
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useState } from 'react';
import { Mail, MailOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t, i18n } = useTranslation();

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      // Handle newsletter signup logic here
      console.log('Newsletter signup:', email);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="bg-yellow-400 py-8 sm:py-12 lg:py-16" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Left Side - Newsletter Info */}
          <div className={`flex items-center gap-4 sm:gap-6 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
            {/* Mail Icon */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black/30 bg-opacity-20 rounded-full flex items-center justify-center">
                <MailOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            
            {/* Text Content */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                {t("newsletter.title")}
              </h2>
              <p className="text-white text-sm sm:text-base lg:text-lg opacity-90">
                {t("newsletter.cta")}
              </p>
            </div>
          </div>

          {/* Right Side - Email Form */}
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <div className="flex w-full lg:w-96">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletter.emailPlaceholder")}
                className={`flex-1 px-4 py-3 sm:px-6 sm:py-4 text-gray-700 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 placeholder-gray-500 text-sm sm:text-base ${
                  i18n.language === 'ar' ? 'rounded-r-md' : 'rounded-l-md'
                }`}
              />
              <button
                onClick={handleSubmit}
                disabled={isSubmitted}
                className={`px-6 py-3 sm:px-8 sm:py-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold text-sm sm:text-base transition-colors duration-200 disabled:opacity-75 ${
                  i18n.language === 'ar' ? 'rounded-l-md' : 'rounded-r-md'
                }`}
              >
                {isSubmitted ? t("newsletter.submitted") : t("newsletter.submit")}
              </button>
            </div>
            
            {/* Success Message */}
            {isSubmitted && (
              <div className={`mt-3 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                <p className="text-white text-sm font-medium">
                  ✅ {t("newsletter.successMessage")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}