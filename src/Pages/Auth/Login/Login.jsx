
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { apiRequest } from "../../../Redux/Apis/apiRequest";

export default function LoginPage() {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .required(t("auth.validation.required"))
      .test(
        "valid-email-or-phone",
        t("auth.validation.invalidLogin"),
        function (value) {
          // Check if it's a valid email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(value)) return true;
          
          // Check if it's a valid Egyptian phone number
          const egyptPhoneRegex = /^01[0-2|5]{1}[0-9]{8}$/;
          if (egyptPhoneRegex.test(value)) return true;
          
          return false;
        }
      ),
    password: Yup.string()
      .min(6, t("auth.validation.passwordMinLength", { min: 6 }))
      .required(t("auth.validation.required")),
    rememberMe: Yup.boolean(),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let response = await dispatch(
          apiRequest({
            entity: "login",
            url: "api/login",
            method: "POST",
            data: values,
            headers: {
                   "Accept-Language": localStorage.getItem('language') || 'en',}
          })
        ).unwrap();
        
        navigate("/courses");
        sessionStorage.setItem("token", response.data.data.token);
        //console.log('✅ API Response:', response);
      } catch (error) {
        //console.log(error);
       
      }
    },
  });

  return (
    <div className='min-h-[calc(100vh-230px)] flex items-center justify-center px-4 py-8'>
      <div className='border border-gray-300 px-4 sm:px-6 lg:px-8 rounded-lg py-6 sm:py-8 bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-sm'>
        <h2 className={`text-xl sm:text-2xl mb-4 sm:mb-6 ${i18n.language == "ar" ? "text-right" : "text-left"} font-medium`}>
          {t("auth.login.loginForm")}
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div>
              <input
                type="text"
                name="login"
                placeholder={t("auth.login.email")}
                className={`border ${
                  formik.touched.login && formik.errors.login
                    ? "border-red-500"
                    : "border-gray-200"
                } w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                  i18n.language === "ar" ? "text-right" : "text-left"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.login}
                dir={i18n.language === "ar" ? "rtl" : "ltr"}
              />
              {formik.touched.login && formik.errors.login && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.login}
                </div>
              )}
            </div>

            {/* Rest of your form remains the same */}
            <div>
              <input
                type="password"
                name="password"
                placeholder={t("auth.login.password")}
                className={`border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-200"
                } w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                  i18n.language === "ar" ? "text-right" : "text-left"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                dir={i18n.language === "ar" ? "rtl" : "ltr"}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Rest of your form UI remains the same */}
            <div>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 py-2'>
                <div className='flex items-center order-1 sm:order-2'>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.rememberMe}
                  />
                  <label htmlFor="rememberMe" className='text-yellow-500 mx-2 text-xs sm:text-sm cursor-pointer'>
                    {t("auth.login.rememberme")}
                  </label>
                </div>

                <Link to={"/lost-password"} className='text-yellow-500 text-xs sm:text-sm hover:underline cursor-pointer order-2 sm:order-3'>
                  {t("auth.login.forget")}
                </Link>
              </div>

              <button 
                type="submit"
                className='bg-yellow-500 w-full hover:bg-yellow-600 p-2 px-6 text-white rounded font-medium transition-colors order-3 sm:order-1'
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? t("auth.login.loggingIn") : t("auth.login.login")}
              </button>
              <p className="text-center mt-3">
                {t("auth.login.account")} 
                <Link to={"/register"} className="underline text-yellow-400">
                  {t("auth.login.register")}
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}