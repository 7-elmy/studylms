



// import { useTranslation } from "react-i18next";
// import { Link, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { apiRequest } from "../../../Redux/Apis/apiRequest";
// import { Mail, Lock, Eye, EyeOff } from "lucide-react"; // 👈 أيقونات Lucide

// import { useState } from "react";

// export default function LoginPage() {
//   const { i18n, t } = useTranslation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   // Validation schema
//   const validationSchema = Yup.object().shape({
//     login: Yup.string()
//       .required(t("auth.validation.required"))
//       .test("valid-email-or-phone", t("auth.validation.invalidLogin"), function (value) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (emailRegex.test(value)) return true;
//         const egyptPhoneRegex = /^01[0-2|5]{1}[0-9]{8}$/;
//         if (egyptPhoneRegex.test(value)) return true;
//         return false;
//       }),
//     password: Yup.string()
//       .min(6, t("auth.validation.passwordMinLength", { min: 6 }))
//       .required(t("auth.validation.required")),
//     rememberMe: Yup.boolean(),
//   });

//   const formik = useFormik({
//     initialValues: { login: "", password: "", rememberMe: false },
//     validationSchema,
//     onSubmit: async (values) => {

//       console.log("Submitting values:", values);
      
//       try {
//         let response = await dispatch(
//           apiRequest({
//             entity: "login",
//             url: "api/login",
//             method: "POST",
//             data: values,
//             headers: { "Accept-Language": localStorage.getItem("language") || "en" },
//           })
//         ).unwrap();
        
//         if(values.rememberMe == true){
//          localStorage.setItem("token", response.data.data.token);
//          localStorage.setItem("name", response.data.data.name);
//         }
//         navigate("/courses");
//         sessionStorage.setItem("token", response.data.data.token);
//         sessionStorage.setItem("name", response.data.data.name);
//       } catch (error) {
//         console.error(error);
//       }
//     },
//   });

//   return (
//     <div className="min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8">
//       <div className="border border-gray-300 px-4 sm:px-6 lg:px-8 rounded-lg py-6 sm:py-8 bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-sm">
//         <h2
//           className={`text-xl sm:text-2xl mb-4 sm:mb-6 ${
//             i18n.language === "ar" ? "text-right" : "text-left"
//           } font-medium`}
//         >
//           {t("auth.login.loginForm")}
//         </h2>

//         <form onSubmit={formik.handleSubmit} className="space-y-4">
//           {/* Login (Email / Phone) */}
//           <div className="relative">
//             <div
//               className={`absolute inset-y-0 ${
//                 i18n.language === "ar" ? "right-0 pr-3" : "left-0 pl-3"
//               } flex items-center pointer-events-none`}
//             >
//               <Mail className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               name="login"
//               placeholder={t("auth.login.email")}
//               className={`w-full ${
//                 i18n.language === "ar" ? "pr-10" : "pl-10"
//               } px-3 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors ${
//                 formik.touched.login && formik.errors.login
//                   ? "border-red-300 bg-red-50"
//                   : "border-gray-300"
//               }`}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.login}
//               dir={i18n.language === "ar" ? "rtl" : "ltr"}
//             />
//           </div>
//             {formik.touched.login && formik.errors.login && (
//               <div className="text-red-500 text-xs mt-1">{formik.errors.login}</div>
//             )}

//           {/* Password */}
//           <div className="relative">
//             <div
//               className={`absolute inset-y-0 ${
//                 i18n.language === "ar" ? "right-0 pr-3" : "left-0 pl-3"
//               } flex items-center pointer-events-none`}
//             >
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder={t("auth.login.password")}
//               className={`w-full ${
//                 i18n.language === "ar" ? "pr-10" : "pl-10"
//               } px-3 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors ${
//                 formik.touched.password && formik.errors.password
//                   ? "border-red-300 bg-red-50"
//                   : "border-gray-300"
//               }`}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.password}
//               dir={i18n.language === "ar" ? "rtl" : "ltr"}
//             />
//             {/* 👁 Eye Icon */}
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className={`absolute inset-y-0 ${
//                 i18n.language === "ar" ? "left-0 pl-3" : "right-0 pr-3"
//               } flex items-center text-gray-400`}
//             >
//               {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//             </button>
//           </div>
//             {formik.touched.password && formik.errors.password && (
//               <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
//             )}

//           {/* Remember Me + Forgot Password */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 py-2">
//             <div className="flex items-center order-1 sm:order-2">
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 name="rememberMe"
//                 className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 checked={formik.values.rememberMe}
//               />
//               <label
//                 htmlFor="rememberMe"
//                 className="text-yellow-500 mx-2 text-xs sm:text-sm cursor-pointer"
//               >
//                 {t("auth.login.rememberme")}
//               </label>
//             </div>
//             <Link
//               to={"/lost-password"}
//               className="text-yellow-500 text-xs sm:text-sm hover:underline cursor-pointer order-2 sm:order-3"
//             >
//               {t("auth.login.forget")}
//             </Link>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             // className="bg-yellow-500 w-full hover:bg-yellow-600 p-2 px-6 text-white rounded font-medium transition-colors order-3 sm:order-1"
//             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             disabled={formik.isSubmitting}
//           >
//             {formik.isSubmitting ? t("auth.login.loggingIn") : t("auth.login.login")}
//           </button>

//           <p className="text-center mt-3">
//             {t("auth.login.account")}
//             <Link to={"/register"} className="underline text-yellow-400">
//               {t("auth.login.register")}
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }


import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useLoginForm } from '../../../hooks/UseLoginFormHook';


export default function LoginPage() {
  const {
    formik,
    showPassword,
    togglePasswordVisibility,
    isSubmitting,
    language,
    t
  } = useLoginForm();

  return (
    <div className="min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8">
      <div className="border border-gray-300 px-4 sm:px-6 lg:px-8 rounded-lg py-6 sm:py-8 bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-sm">
        <h2
          className={`text-xl sm:text-2xl mb-4 sm:mb-6 ${
            language === 'ar' ? 'text-right' : 'text-left'
          } font-medium`}
        >
          {t('auth.login.loginForm')}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Login (Email / Phone) */}
          <div className="relative">
            <div
              className={`absolute inset-y-0 ${
                language === 'ar' ? 'right-0 pr-3' : 'left-0 pl-3'
              } flex items-center pointer-events-none`}
            >
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="login"
              placeholder={t('auth.login.email')}
              className={`w-full ${
                language === 'ar' ? 'pr-10' : 'pl-10'
              } px-3 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors ${
                formik.touched.login && formik.errors.login
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.login}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            />
            {formik.touched.login && formik.errors.login && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.login}</div>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <div
              className={`absolute inset-y-0 ${
                language === 'ar' ? 'right-0 pr-3' : 'left-0 pl-3'
              } flex items-center pointer-events-none`}
            >
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder={t('auth.login.password')}
              className={`w-full ${
                language === 'ar' ? 'pr-10' : 'pl-10'
              } px-3 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors ${
                formik.touched.password && formik.errors.password
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={`absolute inset-y-0 ${
                language === 'ar' ? 'left-0 pl-3' : 'right-0 pr-3'
              } flex items-center text-gray-400`}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
            )}
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 py-2">
            <div className="flex items-center order-1 sm:order-2">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.rememberMe}
              />
              <label
                htmlFor="rememberMe"
                className="text-yellow-500 mx-2 text-xs sm:text-sm cursor-pointer"
              >
                {t('auth.login.rememberme')}
              </label>
            </div>
            <Link
              to="/lost-password"
              className="text-yellow-500 text-xs sm:text-sm hover:underline cursor-pointer order-2 sm:order-3"
            >
              {t('auth.login.forget')}
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('auth.login.loggingIn') : t('auth.login.login')}
          </button>

          <p className="text-center mt-3">
            {t('auth.login.account')}
            <Link to="/register" className="underline text-yellow-400">
              {t('auth.login.register')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}