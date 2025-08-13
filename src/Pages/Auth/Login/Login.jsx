import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";





export default function LoginPage() {

    const {i18n , t} = useTranslation()
  return (
    <div className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
        <div className='border border-gray-300 px-4 sm:px-6 lg:px-8 rounded-lg py-6 sm:py-8 bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-sm'>
            <h2 className={`text-xl sm:text-2xl mb-4 sm:mb-6   ${i18n.language=="ar"? " text-right":"text-left"} font-medium`}>{t("auth.login.loginForm")}</h2>

            <div className="flex flex-col space-y-4">
                <input 
                    type="text" 
                    placeholder={t("auth.login.email")}
                    className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent' 
                />
                
                <input 
                    type="password" 
                    placeholder={t("auth.login.password")}
                    className='border border-gray-200 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent' 
                />

                <div>
                  
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 py-2'>

                    <div className='flex items-center order-1 sm:order-2'>
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                        />
                        <label htmlFor="remember" className='text-yellow-500 mx-2 text-xs sm:text-sm cursor-pointer'>
                            {t("auth.login.rememberme")}
                        </label>
                    </div>

                    <p className='text-yellow-500 text-xs sm:text-sm hover:underline cursor-pointer order-2 sm:order-3'>
                        {t("auth.login.forget")}
                    </p>
                </div>

                      <button 
                        className='bg-yellow-500 w-full hover:bg-yellow-600 p-2 px-6 text-white rounded font-medium transition-colors order-3 sm:order-1'
                    > 
                       {t("auth.login.login")}
                    </button>
                    <p className="text-center mt-3">{t("auth.login.account")} <Link to={"/register"} className="underline text-yellow-400">{t("auth.login.register")}</Link> </p>
                </div>
            </div>
        </div>
    </div>
  )
}